'use client';

import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { CAROUSEL_VIEWPORT_TOUCH_ACTION } from '@/lib/carousel-touch';
import { useCtrlWheelCarousel } from '@/hooks/useCtrlWheelCarousel';
import { useCarouselVirtualRange } from '@/hooks/useCarouselVirtualRange';
import { ChevronLeft, ChevronRight, Filter, Zap, TrendingUp, Clapperboard, Tv, Blend } from 'lucide-react';
import { useOrbeCarousel, FAST_CAROUSEL_DURATION } from '@/hooks/useOrbeCarousel';
import { useFanCarouselSlides } from '@/hooks/useFanCarouselSlides';
import {
  addMonths,
  calculateCarouselStartIndex,
  findIndexForMonth,
  findMonthBounds,
  formatCarouselMonthTitle,
  mergeMediaByDate,
  monthKeyFromDate,
  monthKeyFromItem,
  monthTitleFromItem,
  parseMidiaReleaseDate,
} from '@/lib/carousel-utils';

import MidiaCard from '../media/MidiaCard';
import MidiaCardSkeleton from '../media/MidiaCardSkeleton';
import { LoadingOverlay } from '@/components/ui/LoadingIndicator';
import type { Midia, TipoMidia, Filme, Serie, Anime, Jogo } from '@/types';
import { API_BASE } from '@/lib/apiBase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';

interface MediaCarouselProps {
  mediaType: 'filmes' | 'series' | 'jogos';
  initialData: Midia[];
  startIndex: number;
  className?: string;
}

const SLIDE_CLASS = 'relative flex-[0_0_170px] sm:flex-[0_0_190px] md:flex-[0_0_210px] min-w-0 pl-3 sm:pl-4 carousel-slide';
const CONTROL_BTN = 'p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors';
/** Quantos slides antes da borda do mês disparam o carregamento do mês adjacente */
const MONTH_EDGE_BUFFER = 4;
/** Meses extras pré-carregados ao encostar na borda (carrossel “infinito” sem buscar tudo) */
const MONTH_PREFETCH_DEPTH = 2;
const EMPTY_MONTH_NAV_LIMIT = 8;

type FilmeDisponibilidade = 'cinema' | 'streaming' | 'ambos';

const MediaCarousel: React.FC<MediaCarouselProps> = ({ mediaType, initialData, startIndex, className }) => {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const fastScrollEnabled = useAppStore((s) => s.fastScrollEnabled);
  const toggleFastScroll = useAppStore((s) => s.toggleFastScroll);
  const [mediaItems, setMediaItems] = useState<Midia[]>(initialData);
  // Espelha `emblaApi.selectedScrollSnap()` em estado reativo (atualizado no handler
  // `onSelect` do embla abaixo) — ler `selectedScrollSnap()` direto durante o render não
  // é reativo: rolar o carrossel não disparava re-render, então `isPriority` (que decide
  // `loading="eager"` vs `"lazy"` nas imagens) ficava congelado na posição de alguma
  // renderização anterior.
  const [selectedSnap, setSelectedSnap] = useState(startIndex);
  const [currentTitle, setCurrentTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasCompletedInitialLoad, setHasCompletedInitialLoad] = useState(false);
  const [emAltaMode, setEmAltaMode] = useState(false);
  const [emAltaItems, setEmAltaItems] = useState<Midia[]>([]);
  // Sub-filtro do "Em Alta" — só se aplica a filmes (cinema tem conceito próprio de "em cartaz"
  // que séries/jogos não têm da mesma forma). Padrão ao ativar Em Alta: cinema.
  const [emAltaDisponibilidade, setEmAltaDisponibilidade] = useState<FilmeDisponibilidade>('ambos');
  const activeFetchesRef = useRef(0);
  const emAltaLoadedKeyRef = useRef<string | null>(null);
  const fetchingEmAltaRef = useRef(false);
  const isRepositioningRef = useRef(false);
  const initialBootstrapDoneRef = useRef(false);

  const beginBackgroundFetch = () => {
    activeFetchesRef.current += 1;
  };

  const endBackgroundFetch = () => {
    activeFetchesRef.current = Math.max(0, activeFetchesRef.current - 1);
  };

  const waitForDomPaint = () =>
    new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

  const loadedMonths = useRef<Set<string>>(
    new Set(
      initialData
        .map((item) => monthKeyFromItem(item))
        .filter((key): key is string => Boolean(key))
    )
  );
  const fetchingMonths = useRef(new Set<string>());
  const previousSelectedIndex = useRef<number>(startIndex);
  const firstItemIdRef = useRef<number | undefined>(initialData[0]?.id);
  const itemsLengthRef = useRef(initialData.length);
  const mediaItemsRef = useRef(mediaItems);
  const lastTitleMonthKey = useRef<string>('');
  const initialPrefetchDone = useRef(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [emblaRef, emblaApi] = useOrbeCarousel({
    startIndex,
    duration: fastScrollEnabled ? FAST_CAROUSEL_DURATION : undefined,
  });
  /** Com rolagem rápida, pré-carrega mais meses e com mais antecedência para o carrossel não "estourar" o buffer */
  const monthEdgeBuffer = fastScrollEnabled ? MONTH_EDGE_BUFFER * 2 : MONTH_EDGE_BUFFER;
  const monthPrefetchDepth = fastScrollEnabled ? MONTH_PREFETCH_DEPTH + 1 : MONTH_PREFETCH_DEPTH;

  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node;
      emblaRef(node);
    },
    [emblaRef]
  );

  const mergeItems = useCallback((incoming: Midia[]): Midia[] => {
    if (!incoming.length) return mediaItemsRef.current;
    const merged = mergeMediaByDate(mediaItemsRef.current, incoming);
    mediaItemsRef.current = merged;
    setMediaItems(merged);
    return merged;
  }, []);

  const activeSourceItems = emAltaMode ? emAltaItems : mediaItems;

  const genres = useMemo(
    () => Array.from(new Set(activeSourceItems.flatMap((item) => item.generos_api || []))).filter(Boolean),
    [activeSourceItems]
  );

  // Compartilhado entre a lista renderizada (filteredItems) e a navegação por mês
  // (scrollToToday/navigateByMonth), que precisam calcular índices sobre a MESMA lista
  // que está de fato nos slides do embla — senão o índice-alvo calculado não bate com o
  // slide renderizado e o carrossel pula pro lugar errado.
  const applyDisplayFilters = useCallback(
    (items: Midia[]): Midia[] =>
      selectedGenre ? items.filter((item) => item.generos_api?.includes(selectedGenre)) : items,
    [selectedGenre]
  );

  const filteredItems = useMemo(
    () => applyDisplayFilters(activeSourceItems),
    [activeSourceItems, applyDisplayFilters]
  );

  const loadEmAlta = useCallback(async () => {
    const key = mediaType === 'filmes' ? `filmes:${emAltaDisponibilidade}` : mediaType;
    if (fetchingEmAltaRef.current || emAltaLoadedKeyRef.current === key) return;
    fetchingEmAltaRef.current = true;
    beginBackgroundFetch();
    try {
      const params = new URLSearchParams({ filtro: 'populares', limit: '40' });
      if (mediaType === 'filmes' && emAltaDisponibilidade !== 'ambos') {
        params.set('disponibilidade', emAltaDisponibilidade);
      }
      const response = await fetch(`${API_BASE}/${mediaType}?${params.toString()}`);
      const data = await response.json();
      setEmAltaItems(Array.isArray(data?.results) ? data.results : []);
      emAltaLoadedKeyRef.current = key;
    } catch (error) {
      console.error(`Error fetching "em alta" ${mediaType}:`, error);
    } finally {
      fetchingEmAltaRef.current = false;
      endBackgroundFetch();
    }
  }, [mediaType, emAltaDisponibilidade]);

  // Recarrega o "Em Alta" ao entrar no modo ou ao trocar a sub-opção de disponibilidade
  // (o guard em loadEmAlta evita refetch se a combinação já foi carregada).
  useEffect(() => {
    if (!emAltaMode) return;
    void loadEmAlta();
  }, [emAltaMode, loadEmAlta]);

  const toggleEmAlta = () => {
    setEmAltaMode((prev) => !prev);
  };

  useEffect(() => {
    if (!emblaApi || !emAltaMode) return;
    itemsLengthRef.current = filteredItems.length;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi, emAltaMode, emAltaItems]);

  const filteredItemsRef = useRef(filteredItems);
  useEffect(() => {
    filteredItemsRef.current = filteredItems;
  }, [filteredItems]);

  useEffect(() => {
    mediaItemsRef.current = mediaItems;
  }, [mediaItems]);

  useFanCarouselSlides(emblaApi);
  useCtrlWheelCarousel(emblaApi, viewportRef, fastScrollEnabled);

  const updateTitleFromIndex = useCallback((index: number, items: Midia[]) => {
    const item = items[index];
    const title = monthTitleFromItem(item);
    if (!title || !item?.data_lancamento_api) return;

    const date = parseMidiaReleaseDate(item);
    if (!date) return;
    const monthKey = monthKeyFromDate(date);
    if (monthKey === lastTitleMonthKey.current) return;

    lastTitleMonthKey.current = monthKey;
    setCurrentTitle(title);
  }, []);

  const fetchMediaByMonth = useCallback(
    async (year: number, month: number) => {
      const key = `${year}-${String(month).padStart(2, '0')}`;
      if (fetchingMonths.current.has(key) || loadedMonths.current.has(key)) {
        return null;
      }
      fetchingMonths.current.add(key);
      beginBackgroundFetch();
      try {
        const response = await fetch(
          `${API_BASE}/${mediaType}/by-month?year=${year}&month=${month}`,
          { cache: 'no-store' },
        );
        if (!response.ok) {
          console.error(`Error fetching ${mediaType} for ${key}: HTTP ${response.status}`);
          return null;
        }
        const data: Midia[] = await response.json();
        if (!Array.isArray(data)) {
          console.error(`Invalid response for ${mediaType} ${key}`);
          return null;
        }
        // Marca como carregado mesmo vazio — requests usam cache: 'no-store'
        loadedMonths.current.add(key);
        return data;
      } catch (error) {
        console.error(`Error fetching ${mediaType} for ${key}:`, error);
        return null;
      } finally {
        fetchingMonths.current.delete(key);
        endBackgroundFetch();
      }
    },
    [mediaType]
  );

  const loadMonth = useCallback(
    async (year: number, month: number): Promise<Midia[]> => {
      const data = await fetchMediaByMonth(year, month);
      if (!data?.length) return mediaItemsRef.current;
      return mergeItems(data);
    },
    [fetchMediaByMonth, mergeItems]
  );

  const loadMonthsInDirection = useCallback(
    async (year: number, month: number, direction: 1 | -1, depth = monthPrefetchDepth) => {
      // Busca todos os meses em PARALELO (em vez de um `await` por mês dentro de um for),
      // e mescla os resultados de uma vez só no final. `mergeMediaByDate` já dedupe por id
      // e reordena por data de lançamento, então a ordem de chegada dos fetches não importa.
      const targets = Array.from({ length: depth }, (_, step) => addMonths(year, month, (step + 1) * direction));
      const results = await Promise.all(targets.map((target) => fetchMediaByMonth(target.year, target.month)));
      const combined = results.filter((data): data is Midia[] => Array.isArray(data) && data.length > 0).flat();
      if (combined.length) mergeItems(combined);
    },
    [fetchMediaByMonth, mergeItems, monthPrefetchDepth]
  );

  const prefetchAdjacentMonthsForIndex = useCallback(
    async (selectedIndex: number, items: Midia[]) => {
      const selectedItem = items[selectedIndex];
      const monthKey = monthKeyFromItem(selectedItem);
      if (!monthKey) return;

      const bounds = findMonthBounds(items, monthKey);
      if (!bounds) return;

      const { year, month } = addMonths(
        parseInt(monthKey.split('-')[0], 10),
        parseInt(monthKey.split('-')[1], 10),
        0
      );

      if (selectedIndex >= bounds.end - monthEdgeBuffer) {
        await loadMonthsInDirection(year, month, 1);
      }

      if (selectedIndex <= bounds.start + monthEdgeBuffer) {
        await loadMonthsInDirection(year, month, -1);
      }
    },
    [loadMonthsInDirection, monthEdgeBuffer]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      // Atualizado sempre (mesmo em modo Em Alta) — é o que mantém `isPriority` correto
      // nas imagens enquanto o usuário rola, independente do modo do carrossel.
      setSelectedSnap(selectedIndex);
      if (emAltaMode) return;
      const items = filteredItemsRef.current;
      previousSelectedIndex.current = selectedIndex;
      updateTitleFromIndex(selectedIndex, items);
      // Dispara o prefetch já durante o arraste (não só ao soltar) — em rolagens rápidas
      // o 'settle' chega tarde demais e o mês seguinte ainda não teve tempo de carregar.
      void prefetchAdjacentMonthsForIndex(selectedIndex, items);
    };

    const onSettle = () => {
      if (emAltaMode) return;
      const items = filteredItemsRef.current;
      const selectedIndex = emblaApi.selectedScrollSnap();
      previousSelectedIndex.current = selectedIndex;
      void prefetchAdjacentMonthsForIndex(selectedIndex, items);
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, prefetchAdjacentMonthsForIndex, updateTitleFromIndex, emAltaMode]);

  useEffect(() => {
    if (!emblaApi || !filteredItems[startIndex]) return;
    updateTitleFromIndex(startIndex, filteredItems);
  }, [emblaApi, filteredItems, startIndex, updateTitleFromIndex]);

  useEffect(() => {
    if (!emblaApi || initialPrefetchDone.current || filteredItems.length === 0) return;
    initialPrefetchDone.current = true;
    const index = emblaApi.selectedScrollSnap();
    void prefetchAdjacentMonthsForIndex(index, filteredItems);
  }, [emblaApi, filteredItems, prefetchAdjacentMonthsForIndex]);

  useEffect(() => {
    if (!emblaApi || emAltaMode || isRepositioningRef.current) return;

    const prevLength = itemsLengthRef.current;
    const newLength = filteredItems.length;
    if (prevLength === newLength) return;

    const added = newLength - prevLength;
    const wasPrepend = added > 0 && filteredItems[0]?.id !== firstItemIdRef.current;

    itemsLengthRef.current = newLength;
    firstItemIdRef.current = filteredItems[0]?.id;
    emblaApi.reInit();

    if (wasPrepend) {
      emblaApi.scrollTo(previousSelectedIndex.current + added, true);
    }
  }, [emblaApi, filteredItems, emAltaMode]);

  const scrollToNextFilteredRelease = useCallback(async () => {
    if (!emblaApi || emAltaMode) return;

    isRepositioningRef.current = true;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const resolveTarget = (items: Midia[]) => {
        const list = applyDisplayFilters(items);
        if (list.length === 0) return null;
        const index = calculateCarouselStartIndex(list);
        if (index < 0) return null;
        return { list, index };
      };

      let target = resolveTarget(mediaItemsRef.current);
      const now = new Date();
      let { year, month } = { year: now.getFullYear(), month: now.getMonth() + 1 };

      if (!target || (() => {
        const centeredDate = parseMidiaReleaseDate(target!.list[target!.index]);
        return centeredDate !== null && centeredDate < today;
      })()) {
        for (let attempt = 0; attempt < 12; attempt++) {
          const merged = await loadMonth(year, month);
          const candidate = resolveTarget(merged);
          if (candidate) {
            const release = parseMidiaReleaseDate(candidate.list[candidate.index]);
            if (release && release >= today) {
              target = candidate;
              break;
            }
          }
          const next = addMonths(year, month, 1);
          year = next.year;
          month = next.month;
        }
      }

      if (!target) return;

      await waitForDomPaint();

      lastTitleMonthKey.current = '';
      emblaApi.reInit();
      emblaApi.scrollTo(target.index, false);
      previousSelectedIndex.current = target.index;
      setSelectedSnap(target.index);
      updateTitleFromIndex(target.index, target.list);
      void prefetchAdjacentMonthsForIndex(target.index, target.list);
    } finally {
      isRepositioningRef.current = false;
    }
  }, [emblaApi, emAltaMode, applyDisplayFilters, loadMonth, updateTitleFromIndex, prefetchAdjacentMonthsForIndex]);

  useEffect(() => {
    if (initialBootstrapDoneRef.current) return;
    initialBootstrapDoneRef.current = true;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const next = addMonths(year, month, 1);

    void (async () => {
      await Promise.all([
        loadMonth(year, month),
        loadMonth(next.year, next.month),
      ]);
      setHasCompletedInitialLoad(true);
      await scrollToNextFilteredRelease();
      void loadMonthsInDirection(year, month, -1);
      void loadMonthsInDirection(next.year, next.month, 1);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMonth, loadMonthsInDirection, scrollToNextFilteredRelease]);

  const scrollToToday = useCallback(async () => {
    if (!emblaApi || isNavigating) return;
    setIsNavigating(true);
    try {
      const now = new Date();
      await loadMonth(now.getFullYear(), now.getMonth() + 1);
      const next = addMonths(now.getFullYear(), now.getMonth() + 1, 1);
      await loadMonth(next.year, next.month);
      await scrollToNextFilteredRelease();
    } finally {
      setIsNavigating(false);
    }
  }, [emblaApi, isNavigating, loadMonth, scrollToNextFilteredRelease]);

  const prevGenreRef = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (!emblaApi || emAltaMode) return;
    if (prevGenreRef.current === undefined) {
      prevGenreRef.current = selectedGenre;
      return;
    }
    if (prevGenreRef.current === selectedGenre) return;
    prevGenreRef.current = selectedGenre;
    void scrollToNextFilteredRelease();
  }, [selectedGenre, emblaApi, emAltaMode, scrollToNextFilteredRelease]);

  const wasEmAltaMode = useRef(false);
  useEffect(() => {
    if (!emblaApi) return;
    if (!wasEmAltaMode.current || emAltaMode) {
      wasEmAltaMode.current = emAltaMode;
      return;
    }
    // Voltando do modo "Em Alta" pro modo mês: os slides trocaram de conteúdo por completo,
    // reinicializa o embla e usa a navegação existente pra reposicionar no mês atual.
    wasEmAltaMode.current = emAltaMode;
    itemsLengthRef.current = filteredItems.length;
    emblaApi.reInit();
    void scrollToToday();
  }, [emAltaMode, emblaApi, filteredItems.length, scrollToToday]);

  const navigateByMonth = async (direction: 'next' | 'prev') => {
    if (!emblaApi || isNavigating) return;

    const items = filteredItemsRef.current;
    if (items.length === 0) return;

    const selectedIndex = emblaApi.selectedScrollSnap();
    const currentItem = items[selectedIndex];
    const monthKey = monthKeyFromItem(currentItem);
    if (!monthKey) return;

    const [year, month] = monthKey.split('-').map(Number);
    const step = direction === 'next' ? 1 : -1;

    setIsNavigating(true);
    try {
      const candidates = Array.from({ length: EMPTY_MONTH_NAV_LIMIT }, (_, i) => addMonths(year, month, (i + 1) * step));
      await Promise.all(candidates.map((target) => loadMonth(target.year, target.month)));
      const list = applyDisplayFilters(mediaItemsRef.current);

      for (let i = 0; i < candidates.length; i++) {
        const target = candidates[i];
        const targetIndex = findIndexForMonth(list, target.year, target.month);
        if (targetIndex !== -1) {
          const targetDate = new Date(target.year, target.month - 1, 1);
          const targetKey = monthKeyFromDate(targetDate);
          lastTitleMonthKey.current = targetKey;
          setCurrentTitle(formatCarouselMonthTitle(targetDate));
          await waitForDomPaint();
          emblaApi.reInit();
          emblaApi.scrollTo(targetIndex, true);
          previousSelectedIndex.current = targetIndex;
          setSelectedSnap(targetIndex);
          await loadMonthsInDirection(target.year, target.month, step);
          return;
        }
      }

      const lastTarget = candidates[candidates.length - 1];
      setCurrentTitle(formatCarouselMonthTitle(new Date(lastTarget.year, lastTarget.month - 1, 1)));
    } finally {
      setIsNavigating(false);
    }
  };

  const virtualRange = useCarouselVirtualRange(emblaApi, filteredItems.length);

  return (
    <div className={`${className ?? ''} overflow-hidden max-w-full`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 px-2 sm:px-4">
        <h3
          className="text-xl font-bold h-8 cursor-pointer font-display orbe-text-primary hover:text-primary transition-colors"
          onClick={emAltaMode ? undefined : scrollToToday}
          title={emAltaMode ? undefined : 'Ir para o mês atual'}
        >
          {emAltaMode
            ? 'Em Alta'
            : isNavigating
              ? 'Carregando conteúdo...'
              : filteredItems.length === 0
                ? hasCompletedInitialLoad
                  ? 'Nenhum conteúdo encontrado'
                  : 'Carregando...'
                : currentTitle || 'Carregando...'}
        </h3>
        <div className="flex justify-end items-center w-full md:w-auto mt-2 md:mt-0 gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleEmAlta}
              className={`${CONTROL_BTN} ${emAltaMode ? 'bg-primary text-primary-foreground border-primary' : ''}`}
              title={emAltaMode ? 'Ver por data de lançamento' : 'Ver o que está em alta agora'}
              aria-pressed={emAltaMode}
            >
              <TrendingUp className="h-4 w-4" />
            </button>
            {emAltaMode && mediaType === 'filmes' && (
              <div
                className="flex items-center rounded-lg border border-border bg-card overflow-hidden"
                role="group"
                aria-label="Filtrar Em Alta por disponibilidade"
              >
                <button
                  onClick={() => setEmAltaDisponibilidade('cinema')}
                  className={`p-2 orbe-text-primary hover:bg-muted transition-colors ${emAltaDisponibilidade === 'cinema' ? 'bg-primary text-primary-foreground' : ''}`}
                  title="Em cartaz no cinema"
                  aria-pressed={emAltaDisponibilidade === 'cinema'}
                >
                  <Clapperboard className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setEmAltaDisponibilidade('streaming')}
                  className={`p-2 orbe-text-primary hover:bg-muted transition-colors border-l border-border ${emAltaDisponibilidade === 'streaming' ? 'bg-primary text-primary-foreground' : ''}`}
                  title="Disponível em streaming"
                  aria-pressed={emAltaDisponibilidade === 'streaming'}
                >
                  <Tv className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setEmAltaDisponibilidade('ambos')}
                  className={`p-2 orbe-text-primary hover:bg-muted transition-colors border-l border-border ${emAltaDisponibilidade === 'ambos' ? 'bg-primary text-primary-foreground' : ''}`}
                  title="Cinema e streaming"
                  aria-pressed={emAltaDisponibilidade === 'ambos'}
                >
                  <Blend className="h-4 w-4" />
                </button>
              </div>
            )}
            <button
              onClick={toggleFastScroll}
              className={`${CONTROL_BTN} ${fastScrollEnabled ? 'bg-primary text-primary-foreground border-primary' : ''}`}
              title={fastScrollEnabled ? 'Desativar rolagem rápida' : 'Ativar rolagem rápida'}
              aria-pressed={fastScrollEnabled}
            >
              <Zap className="h-4 w-4" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={CONTROL_BTN} aria-disabled={isNavigating}>
                  <Filter className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setSelectedGenre(null)}>Todos os Gêneros</DropdownMenuItem>
                {genres.map((genre) => (
                  <DropdownMenuItem key={genre} onSelect={() => setSelectedGenre(genre)}>
                    {genre}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {!emAltaMode && (
              <>
                <button
                  onClick={() => navigateByMonth('prev')}
                  className={`${CONTROL_BTN} disabled:opacity-50 disabled:pointer-events-none`}
                  disabled={isNavigating}
                  aria-busy={isNavigating}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigateByMonth('next')}
                  className={`${CONTROL_BTN} disabled:opacity-50 disabled:pointer-events-none`}
                  disabled={isNavigating}
                  aria-busy={isNavigating}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <TooltipProvider delayDuration={300}>
        <div className="relative">
          {isNavigating && (
            <LoadingOverlay message="Carregando novos títulos..." className="rounded-lg" />
          )}
        <div
          className={`overflow-hidden max-w-full py-2 px-1 sm:px-2 ${isNavigating ? 'pointer-events-none' : ''}`}
          ref={setViewportRef}
          style={{ touchAction: CAROUSEL_VIEWPORT_TOUCH_ACTION }}
        >
          <div className="flex">
            {filteredItems.length === 0
              ? hasCompletedInitialLoad
                ? (
                    <div className="w-full py-10 text-center text-muted-foreground">
                      Nenhum conteúdo encontrado{selectedGenre ? ` para o gênero "${selectedGenre}"` : ''}.
                    </div>
                  )
                : Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className={SLIDE_CLASS}>
                      <MidiaCardSkeleton />
                    </div>
                  ))
              : filteredItems.map((item, index) => {
                  const isRendered = index >= virtualRange.start && index <= virtualRange.end;
                  const isPriority = Math.abs(index - selectedSnap) <= 4;
                  return (
                    <div key={`${item.id}-${mediaType}`} className={SLIDE_CLASS}>
                      {isRendered ? (
                        <MidiaCard
                          midia={item as Filme | Serie | Anime | Jogo}
                          type={mediaType.slice(0, -1) as TipoMidia}
                          priority={isPriority}
                          userInteractions={userInteractions}
                          onInteraction={handleInteraction}
                        />
                      ) : (
                        <div className="w-full max-w-[210px] mx-auto aspect-[206/290] rounded-lg bg-skeleton orbe-shimmer" aria-hidden />
                      )}
                    </div>
                  );
                })}
          </div>
        </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default MediaCarousel;
