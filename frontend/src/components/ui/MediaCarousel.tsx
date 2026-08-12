'use client';

import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { CAROUSEL_VIEWPORT_TOUCH_ACTION } from '@/lib/carousel-touch';
import { useCtrlWheelCarousel } from '@/hooks/useCtrlWheelCarousel';
import { useCarouselVirtualRange } from '@/hooks/useCarouselVirtualRange';
import { ChevronLeft, ChevronRight, Filter, Zap, TrendingUp } from 'lucide-react';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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

const MediaCarousel: React.FC<MediaCarouselProps> = ({ mediaType, initialData, startIndex, className }) => {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const fastScrollEnabled = useAppStore((s) => s.fastScrollEnabled);
  const toggleFastScroll = useAppStore((s) => s.toggleFastScroll);
  const [mediaItems, setMediaItems] = useState<Midia[]>(initialData);
  const [currentTitle, setCurrentTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [emAltaMode, setEmAltaMode] = useState(false);
  const [emAltaItems, setEmAltaItems] = useState<Midia[]>([]);
  const activeFetchesRef = useRef(0);
  const emAltaLoadedRef = useRef(false);
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

  const filteredItems = useMemo(
    () =>
      selectedGenre
        ? activeSourceItems.filter((item) => item.generos_api?.includes(selectedGenre))
        : activeSourceItems,
    [activeSourceItems, selectedGenre]
  );

  const loadEmAlta = useCallback(async () => {
    if (fetchingEmAltaRef.current || emAltaLoadedRef.current) return;
    fetchingEmAltaRef.current = true;
    beginFetch();
    try {
      const response = await fetch(`${API_BASE}/${mediaType}?filtro=populares&limit=40`);
      const data = await response.json();
      setEmAltaItems(Array.isArray(data?.results) ? data.results : []);
      emAltaLoadedRef.current = true;
    } catch (error) {
      console.error(`Error fetching "em alta" ${mediaType}:`, error);
    } finally {
      fetchingEmAltaRef.current = false;
      endFetch();
    }
  }, [mediaType]);

  const toggleEmAlta = () => {
    setEmAltaMode((prev) => {
      const next = !prev;
      if (next) void loadEmAlta();
      return next;
    });
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
      for (let step = 1; step <= depth; step++) {
        const target = addMonths(year, month, step * direction);
        await loadMonth(target.year, target.month);
      }
    },
    [loadMonth, monthPrefetchDepth]
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
    })();
  }, [loadMonth, loadMonthsInDirection]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      if (emAltaMode) return;
      const items = filteredItemsRef.current;
      const selectedIndex = emblaApi.selectedScrollSnap();
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
    const list = selectedGenre
      ? merged.filter((item) => item.generos_api?.includes(selectedGenre))
      : merged;
    const todayIndex = calculateCarouselStartIndex(list);
    lastTitleMonthKey.current = '';
    emblaApi.scrollTo(todayIndex, false);
    updateTitleFromIndex(todayIndex, list);
  }, [emblaApi, isFetching, loadMonth, selectedGenre, updateTitleFromIndex]);

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
    let target = addMonths(year, month, direction === 'next' ? 1 : -1);

    for (let attempt = 0; attempt < EMPTY_MONTH_NAV_LIMIT; attempt++) {
      const merged = await loadMonth(target.year, target.month);
      const list = selectedGenre
        ? merged.filter((item) => item.generos_api?.includes(selectedGenre))
        : merged;

      const targetIndex = findIndexForMonth(list, target.year, target.month);
      if (targetIndex !== -1) {
        lastTitleMonthKey.current = '';
        emblaApi.scrollTo(targetIndex, true);
        updateTitleFromIndex(targetIndex, list);
        await loadMonthsInDirection(target.year, target.month, direction === 'next' ? 1 : -1);
        return;
      }

      target = addMonths(target.year, target.month, direction === 'next' ? 1 : -1);
    }

    setCurrentTitle(formatCarouselMonthTitle(new Date(target.year, target.month - 1, 1)));
  };

  const virtualRange = useCarouselVirtualRange(emblaApi, filteredItems.length);
  const selectedSnap = emblaApi?.selectedScrollSnap() ?? startIndex;

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
              ? Array.from({ length: 10 }).map((_, index) => (
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
                        <div className="w-full max-w-[210px] mx-auto aspect-[206/290] rounded-lg bg-muted" aria-hidden />
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
