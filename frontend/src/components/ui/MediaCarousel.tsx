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
/** Quantos slides antes da borda do mês disparam o carregamento do mês adjacente */
const MONTH_EDGE_BUFFER = 4;

const MediaCarousel: React.FC<MediaCarouselProps> = ({ mediaType, initialData, startIndex, className }) => {
  const [mediaItems, setMediaItems] = useState<Midia[]>(initialData);
  const [currentTitle, setCurrentTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

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

      if (selectedIndex >= bounds.end - MONTH_EDGE_BUFFER) {
        const next = addMonths(year, month, 1);
        await loadMonth(next.year, next.month);
      }

      if (selectedIndex <= bounds.start + MONTH_EDGE_BUFFER) {
        const prev = addMonths(year, month, -1);
        await loadMonth(prev.year, prev.month);
      }
    },
    [loadMonth]
  );

  useEffect(() => {
    const now = new Date();
    void loadMonth(now.getFullYear(), now.getMonth() + 1);
  }, [loadMonth]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const items = filteredItemsRef.current;
      const selectedIndex = emblaApi.selectedScrollSnap();
      previousSelectedIndex.current = selectedIndex;
      updateTitleFromIndex(selectedIndex, items);
    };

    const onSettle = () => {
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
  }, [emblaApi, prefetchAdjacentMonthsForIndex, updateTitleFromIndex]);

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
    if (!emblaApi) return;

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
    if (!emblaApi) return;
    const now = new Date();
    const merged = await loadMonth(now.getFullYear(), now.getMonth() + 1);
    const list = selectedGenre
      ? merged.filter((item) => item.generos_api?.includes(selectedGenre))
      : merged;
    const todayIndex = calculateCarouselStartIndex(list);
    lastTitleMonthKey.current = '';
    emblaApi.scrollTo(todayIndex, false);
    updateTitleFromIndex(todayIndex, list);
  }, [emblaApi, loadMonth, selectedGenre, updateTitleFromIndex]);

  const navigateByMonth = async (direction: 'next' | 'prev') => {
    if (!emblaApi) return;

    const items = filteredItemsRef.current;
    if (items.length === 0) return;

    const selectedIndex = emblaApi.selectedScrollSnap();
    const currentItem = items[selectedIndex];
    const monthKey = monthKeyFromItem(currentItem);
    if (!monthKey) return;

    const [year, month] = monthKey.split('-').map(Number);
    const target = addMonths(year, month, direction === 'next' ? 1 : -1);

    const merged = await loadMonth(target.year, target.month);
    const list = selectedGenre
      ? merged.filter((item) => item.generos_api?.includes(selectedGenre))
      : merged;

    const targetIndex = findIndexForMonth(list, target.year, target.month);
    if (targetIndex !== -1) {
      lastTitleMonthKey.current = '';
      emblaApi.scrollTo(targetIndex, true);
      updateTitleFromIndex(targetIndex, list);
    } else {
      setCurrentTitle(formatCarouselMonthTitle(new Date(target.year, target.month - 1, 1)));
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
          {currentTitle || 'Carregando...'}
        </h3>
        <div className="flex justify-end items-center w-full md:w-auto mt-2 md:mt-0 gap-2">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={CONTROL_BTN}>
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
            <button onClick={() => navigateByMonth('prev')} className={CONTROL_BTN}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => navigateByMonth('next')} className={CONTROL_BTN}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <TooltipProvider delayDuration={300}>
        <div
          className="overflow-hidden max-w-full py-2 px-1 sm:px-2"
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
      </TooltipProvider>
    </div>
  );
};

export default MediaCarousel;
