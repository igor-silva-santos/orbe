'use client';

import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { CAROUSEL_VIEWPORT_TOUCH_ACTION } from '@/lib/carousel-touch';
import { useCtrlWheelCarousel } from '@/hooks/useCtrlWheelCarousel';
import { useCarouselVirtualRange } from '@/hooks/useCarouselVirtualRange';
import { ChevronLeft, ChevronRight, Filter, Zap, TrendingUp, Clapperboard, Tv, Blend } from 'lucide-react';
import { parseISO } from 'date-fns';
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
} from '@/lib/carousel-utils';

import MidiaCard from '../media/MidiaCard';
import MidiaCardSkeleton from '../media/MidiaCardSkeleton';
import { LoadingOverlay } from '@/components/ui/LoadingIndicator';
import type { Midia, TipoMidia, Filme, Serie, Anime, Jogo } from '@/types';
import { API_BASE } from '@/lib/apiBase';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

/** Filme em cinema (cartaz/sessões/pré-venda) ou com streaming. */
const hasFilmeDisponibilidade = (item: Midia): boolean => {
  const filme = item as Filme;
  return (
    Boolean(filme.em_cartaz) ||
    Boolean(filme.tem_sessoes) ||
    Boolean(filme.em_prevenda) ||
    (item.plataformas_api?.length ?? 0) > 0
  );
};

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
  const [isFetching, setIsFetching] = useState(false);
  const [hasCompletedInitialLoad, setHasCompletedInitialLoad] = useState(initialData.length > 0);
  const [emAltaMode, setEmAltaMode] = useState(false);
  const [emAltaItems, setEmAltaItems] = useState<Midia[]>([]);
  // Sub-filtro do "Em Alta" — só se aplica a filmes (cinema tem conceito próprio de "em cartaz"
  // que séries/jogos não têm da mesma forma). Padrão ao ativar Em Alta: cinema.
  const [emAltaDisponibilidade, setEmAltaDisponibilidade] = useState<FilmeDisponibilidade>('ambos');
  // Filtro padrão do carrossel de lançamentos (modo normal, não Em Alta): esconde filmes
  // sem nenhuma disponibilidade (sem cinema e sem streaming). Só se aplica a filmes.
  const [showAllFilmes, setShowAllFilmes] = useState(false);
  const activeFetchesRef = useRef(0);
  const emAltaLoadedKeyRef = useRef<string | null>(null);
  const fetchingEmAltaRef = useRef(false);

  const beginFetch = () => {
    activeFetchesRef.current += 1;
    setIsFetching(true);
  };

  const endFetch = () => {
    activeFetchesRef.current = Math.max(0, activeFetchesRef.current - 1);
    if (activeFetchesRef.current === 0) {
      setIsFetching(false);
    }
  };

  const loadedMonths = useRef<Set<string>>(
    new Set(initialData.map((item) => monthKeyFromDate(new Date(item.data_lancamento_api))))
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
    (items: Midia[]): Midia[] => {
      let result = selectedGenre ? items.filter((item) => item.generos_api?.includes(selectedGenre)) : items;
      // Lançamentos (modo normal, não Em Alta) de filmes: por padrão esconde quem não tem
      // nem cinema nem streaming. O modo Em Alta já resolve disponibilidade no servidor.
      if (mediaType === 'filmes' && !emAltaMode && !showAllFilmes) {
        result = result.filter(hasFilmeDisponibilidade);
      }
      return result;
    },
    [selectedGenre, mediaType, emAltaMode, showAllFilmes]
  );

  const filteredItems = useMemo(
    () => applyDisplayFilters(activeSourceItems),
    [activeSourceItems, applyDisplayFilters]
  );

  const loadEmAlta = useCallback(async () => {
    const key = mediaType === 'filmes' ? `filmes:${emAltaDisponibilidade}` : mediaType;
    if (fetchingEmAltaRef.current || emAltaLoadedKeyRef.current === key) return;
    fetchingEmAltaRef.current = true;
    beginFetch();
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
      endFetch();
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

    const date = parseISO(item.data_lancamento_api);
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
      beginFetch();
      try {
        const response = await fetch(`${API_BASE}/${mediaType}/by-month?year=${year}&month=${month}`);
        const data: Midia[] = await response.json();
        loadedMonths.current.add(key);
        return data;
      } catch (error) {
        console.error(`Error fetching ${mediaType} for ${key}:`, error);
        return null;
      } finally {
        fetchingMonths.current.delete(key);
        endFetch();
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
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    void (async () => {
      await loadMonth(year, month);
      await loadMonthsInDirection(year, month, -1);
      await loadMonthsInDirection(year, month, 1);
      setHasCompletedInitialLoad(true);
    })();
  }, [loadMonth, loadMonthsInDirection]);

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
    if (!emblaApi || emAltaMode) return;

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
  }, [emblaApi, filteredItems]);

  const scrollToToday = useCallback(async () => {
    if (!emblaApi || isFetching) return;
    const now = new Date();
    const merged = await loadMonth(now.getFullYear(), now.getMonth() + 1);
    const list = applyDisplayFilters(merged);
    const todayIndex = calculateCarouselStartIndex(list);
    lastTitleMonthKey.current = '';
    emblaApi.scrollTo(todayIndex, false);
    updateTitleFromIndex(todayIndex, list);
  }, [emblaApi, isFetching, loadMonth, applyDisplayFilters, updateTitleFromIndex]);

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
    if (!emblaApi || isFetching) return;

    const items = filteredItemsRef.current;
    if (items.length === 0) return;

    const selectedIndex = emblaApi.selectedScrollSnap();
    const currentItem = items[selectedIndex];
    const monthKey = monthKeyFromItem(currentItem);
    if (!monthKey) return;

    const [year, month] = monthKey.split('-').map(Number);
    const step = direction === 'next' ? 1 : -1;

    // Busca todos os candidatos (até EMPTY_MONTH_NAV_LIMIT meses na direção escolhida) em
    // PARALELO, em vez de esperar cada mês por vez procurando o primeiro não-vazio — isso
    // podia encadear até 8 requests sequenciais com os botões desabilitados o tempo todo.
    // Ainda respeitamos a ordem: com todos os resultados já resolvidos, percorremos os
    // candidatos na ordem certa e paramos no primeiro mês não-vazio.
    const candidates = Array.from({ length: EMPTY_MONTH_NAV_LIMIT }, (_, i) => addMonths(year, month, (i + 1) * step));
    const results = await Promise.all(candidates.map((target) => loadMonth(target.year, target.month)));

    for (let i = 0; i < candidates.length; i++) {
      const target = candidates[i];
      const list = applyDisplayFilters(results[i]);

      const targetIndex = findIndexForMonth(list, target.year, target.month);
      if (targetIndex !== -1) {
        lastTitleMonthKey.current = '';
        emblaApi.scrollTo(targetIndex, true);
        updateTitleFromIndex(targetIndex, list);
        await loadMonthsInDirection(target.year, target.month, step);
        return;
      }
    }

    const lastTarget = candidates[candidates.length - 1];
    setCurrentTitle(formatCarouselMonthTitle(new Date(lastTarget.year, lastTarget.month - 1, 1)));
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
            : isFetching
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
                <button className={CONTROL_BTN} disabled={isFetching} aria-disabled={isFetching}>
                  <Filter className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {mediaType === 'filmes' && !emAltaMode && (
                  <>
                    <DropdownMenuCheckboxItem
                      checked={showAllFilmes}
                      onCheckedChange={setShowAllFilmes}
                      onSelect={(event) => event.preventDefault()}
                    >
                      Mostrar todos (inclusive sem disponibilidade)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                  </>
                )}
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
                  disabled={isFetching}
                  aria-busy={isFetching}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigateByMonth('next')}
                  className={`${CONTROL_BTN} disabled:opacity-50 disabled:pointer-events-none`}
                  disabled={isFetching}
                  aria-busy={isFetching}
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
          {isFetching && (
            <LoadingOverlay message="Carregando novos títulos..." className="rounded-lg" />
          )}
        <div
          className={`overflow-hidden max-w-full py-2 px-1 sm:px-2 ${isFetching ? 'pointer-events-none' : ''}`}
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
