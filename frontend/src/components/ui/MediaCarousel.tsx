'use client';

import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { CAROUSEL_VIEWPORT_TOUCH_ACTION } from '@/lib/carousel-touch';
import { useCtrlWheelCarousel } from '@/hooks/useCtrlWheelCarousel';
import { useCarouselVirtualRange } from '@/hooks/useCarouselVirtualRange';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { parseISO } from 'date-fns';
import { useOrbeCarousel } from '@/hooks/useOrbeCarousel';
import { useFanCarouselSlides } from '@/hooks/useFanCarouselSlides';
import {
  adjacentMonthKeys,
  calculateCarouselStartIndex,
  findIndexForMonth,
  formatCarouselMonthTitle,
  mergeMediaByDate,
  monthKeyFromDate,
  monthTitleFromItem,
} from '@/lib/carousel-utils';

import MidiaCard from '../media/MidiaCard';
import MidiaCardSkeleton from '../media/MidiaCardSkeleton';
import { LoadingOverlay } from '@/components/ui/LoadingIndicator';
import type { Midia, TipoMidia, Filme, Serie, Anime, Jogo } from '@/types';
import { API_BASE } from '@/lib/apiBase';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TooltipProvider } from '@/components/ui/tooltip';

interface MediaCarouselProps {
  mediaType: 'filmes' | 'series' | 'jogos';
  initialData: Midia[];
  startIndex: number;
  className?: string;
}

const SLIDE_CLASS = 'relative flex-[0_0_170px] sm:flex-[0_0_190px] md:flex-[0_0_210px] min-w-0 pl-3 sm:pl-4 carousel-slide';
const CONTROL_BTN = 'p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors';

const MediaCarousel: React.FC<MediaCarouselProps> = ({ mediaType, initialData, startIndex, className }) => {
  const [mediaItems, setMediaItems] = useState<Midia[]>(initialData);
  const [currentTitle, setCurrentTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const activeFetchesRef = useRef(0);

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

  const loadedYears = useRef<Set<number>>(
    new Set(initialData.map((item) => new Date(item.data_lancamento_api).getFullYear()).filter(Boolean))
  );
  const loadedMonths = useRef<Set<string>>(
    new Set(initialData.map((item) => monthKeyFromDate(new Date(item.data_lancamento_api))))
  );
  const fetchingYears = useRef(new Set<number>());
  const fetchingMonths = useRef(new Set<string>());
  const previousSelectedIndex = useRef<number>(startIndex);
  const itemsLengthRef = useRef(initialData.length);
  const mediaItemsRef = useRef(mediaItems);
  const lastTitleMonthKey = useRef<string>('');

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [emblaRef, emblaApi] = useOrbeCarousel({ startIndex });

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

  const genres = useMemo(
    () => Array.from(new Set(mediaItems.flatMap((item) => item.generos_api || []))).filter(Boolean),
    [mediaItems]
  );

  const filteredItems = useMemo(
    () => (selectedGenre ? mediaItems.filter((item) => item.generos_api?.includes(selectedGenre)) : mediaItems),
    [mediaItems, selectedGenre]
  );

  const filteredItemsRef = useRef(filteredItems);
  useEffect(() => {
    filteredItemsRef.current = filteredItems;
  }, [filteredItems]);

  useEffect(() => {
    mediaItemsRef.current = mediaItems;
  }, [mediaItems]);

  useFanCarouselSlides(emblaApi);
  useCtrlWheelCarousel(emblaApi, viewportRef);

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

  const prefetchMonths = useCallback(
    async (year: number, month: number): Promise<Midia[]> => {
      const keys = adjacentMonthKeys(year, month);
      const toFetch = keys.filter((key) => !loadedMonths.current.has(key));
      const results = await Promise.all(
        toFetch.map((key) => {
          const [y, m] = key.split('-').map(Number);
          return fetchMediaByMonth(y, m);
        })
      );
      return mergeItems(results.flatMap((r) => r ?? []));
    },
    [fetchMediaByMonth, mergeItems]
  );

  useEffect(() => {
    const now = new Date();
    void prefetchMonths(now.getFullYear(), now.getMonth() + 1);
    void prefetchMonths(now.getFullYear(), now.getMonth() + 2);
    void prefetchMonths(now.getFullYear(), now.getMonth() + 3);
  }, [prefetchMonths]);

  const fetchMediaByYear = useCallback(
    async (year: number) => {
      if (fetchingYears.current.has(year) || loadedYears.current.has(year)) {
        return null;
      }
      fetchingYears.current.add(year);
      beginFetch();
      try {
        const response = await fetch(`${API_BASE}/${mediaType}/by-year?year=${year}`);
        const data: Midia[] = await response.json();
        loadedYears.current.add(year);
        return data.sort(
          (a, b) => new Date(a.data_lancamento_api).getTime() - new Date(b.data_lancamento_api).getTime()
        );
      } catch (error) {
        console.error(`Error fetching ${mediaType} for year ${year}:`, error);
        return null;
      } finally {
        fetchingYears.current.delete(year);
        endFetch();
      }
    },
    [mediaType]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const items = filteredItemsRef.current;
      const selectedIndex = emblaApi.selectedScrollSnap();
      previousSelectedIndex.current = selectedIndex;
      updateTitleFromIndex(selectedIndex, items);
    };

    const onSettle = async () => {
      const items = filteredItemsRef.current;
      const selectedIndex = emblaApi.selectedScrollSnap();
      previousSelectedIndex.current = selectedIndex;
      const selectedItem = items[selectedIndex];

      if (selectedItem?.data_lancamento_api) {
        try {
          const date = parseISO(selectedItem.data_lancamento_api);
          void prefetchMonths(date.getFullYear(), date.getMonth() + 1);
        } catch {
          /* ignore */
        }
      }

      const buffer = 15;
      if (selectedIndex >= items.length - buffer) {
        const lastItem = items[items.length - 1];
        if (lastItem?.data_lancamento_api) {
          try {
            const lastDate = parseISO(lastItem.data_lancamento_api);
            void prefetchMonths(lastDate.getFullYear(), lastDate.getMonth() + 1);
            void prefetchMonths(lastDate.getFullYear(), lastDate.getMonth() + 2);
          } catch {
            /* ignore */
          }
        }

        const maxLoadedYear = Math.max(...Array.from(loadedYears.current));
        const isFetchingFuture = Array.from(fetchingYears.current).some((y) => y > maxLoadedYear);
        if (!isFetchingFuture) {
          const newData = await fetchMediaByYear(maxLoadedYear + 1);
          if (newData) mergeItems(newData);
        }
      }

      if (selectedIndex < buffer) {
        const minLoadedYear = Math.min(...Array.from(loadedYears.current));
        const isFetchingPast = Array.from(fetchingYears.current).some((y) => y < minLoadedYear);
        if (!isFetchingPast) {
          const newData = await fetchMediaByYear(minLoadedYear - 1);
          if (newData) mergeItems(newData);
        }
      }
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, fetchMediaByYear, mergeItems, prefetchMonths, updateTitleFromIndex]);

  useEffect(() => {
    if (!emblaApi || !filteredItems[startIndex]) return;
    updateTitleFromIndex(startIndex, filteredItems);
  }, [emblaApi, filteredItems, startIndex, updateTitleFromIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    const prevLength = itemsLengthRef.current;
    const newLength = filteredItems.length;
    if (prevLength === newLength) return;

    const added = newLength - prevLength;
    const wasPrepend = added > 0 && previousSelectedIndex.current < 15;

    itemsLengthRef.current = newLength;
    emblaApi.reInit();

    if (wasPrepend) {
      emblaApi.scrollTo(previousSelectedIndex.current + added, true);
    }
  }, [emblaApi, filteredItems.length]);

  const scrollToToday = useCallback(async () => {
    if (!emblaApi || isFetching) return;
    const now = new Date();
    const merged = await prefetchMonths(now.getFullYear(), now.getMonth() + 1);
    const list = selectedGenre
      ? merged.filter((item) => item.generos_api?.includes(selectedGenre))
      : merged;
    const todayIndex = calculateCarouselStartIndex(list);
    lastTitleMonthKey.current = '';
    emblaApi.scrollTo(todayIndex, false);
    updateTitleFromIndex(todayIndex, list);
  }, [emblaApi, isFetching, prefetchMonths, selectedGenre, updateTitleFromIndex]);

  const navigateByMonth = async (direction: 'next' | 'prev') => {
    if (!emblaApi || isFetching) return;

    const items = filteredItemsRef.current;
    if (items.length === 0) return;

    const selectedIndex = emblaApi.selectedScrollSnap();
    const currentItem = items[selectedIndex];
    if (!currentItem?.data_lancamento_api) return;

    const currentItemDate = parseISO(currentItem.data_lancamento_api);
    const targetDate =
      direction === 'next'
        ? new Date(currentItemDate.getFullYear(), currentItemDate.getMonth() + 1, 1)
        : new Date(currentItemDate.getFullYear(), currentItemDate.getMonth() - 1, 1);

    const merged = await prefetchMonths(targetDate.getFullYear(), targetDate.getMonth() + 1);
    const list = selectedGenre
      ? merged.filter((item) => item.generos_api?.includes(selectedGenre))
      : merged;

    const targetIndex = findIndexForMonth(list, targetDate.getFullYear(), targetDate.getMonth() + 1);
    if (targetIndex !== -1) {
      lastTitleMonthKey.current = '';
      emblaApi.scrollTo(targetIndex, true);
      updateTitleFromIndex(targetIndex, list);
    } else {
      setCurrentTitle(formatCarouselMonthTitle(targetDate));
    }
  };

  const virtualRange = useCarouselVirtualRange(emblaApi, filteredItems.length);
  const selectedSnap = emblaApi?.selectedScrollSnap() ?? startIndex;

  return (
    <div className={`${className ?? ''} overflow-hidden max-w-full`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 px-2 sm:px-4">
        <h3
          className="text-xl font-bold h-8 cursor-pointer font-display orbe-text-primary hover:text-primary transition-colors"
          onClick={scrollToToday}
          title="Ir para o mês atual"
        >
          {isFetching ? 'Carregando conteúdo...' : currentTitle || 'Carregando...'}
        </h3>
        <div className="flex justify-end items-center w-full md:w-auto mt-2 md:mt-0 gap-2">
          <div className="flex items-center gap-2">
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
