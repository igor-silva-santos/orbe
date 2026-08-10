'use client';

import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { useCtrlWheelCarousel } from '@/hooks/useCtrlWheelCarousel';
import { useCarouselVirtualRange } from '@/hooks/useCarouselVirtualRange';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useOrbeCarousel } from '@/hooks/useOrbeCarousel';
import { useFanCarouselSlides } from '@/hooks/useFanCarouselSlides';
import { mergeMediaByDate } from '@/lib/carousel-utils';

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

const MediaCarousel: React.FC<MediaCarouselProps> = ({ mediaType, initialData, startIndex, className }) => {
  const [mediaItems, setMediaItems] = useState<Midia[]>(initialData);
  const [currentTitle, setCurrentTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const loadedYears = useRef<Set<number>>(
    new Set(initialData.map((item) => new Date(item.data_lancamento_api).getFullYear()).filter(Boolean))
  );
  const fetchingYears = useRef(new Set<number>());
  const previousSelectedIndex = useRef<number>(startIndex);
  const itemsLengthRef = useRef(initialData.length);
  const mediaItemsRef = useRef(mediaItems);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [emblaRef, emblaApi] = useOrbeCarousel({ startIndex });

  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node;
      emblaRef(node);
    },
    [emblaRef]
  );

  useEffect(() => {
    mediaItemsRef.current = mediaItems;
  }, [mediaItems]);

  useFanCarouselSlides(emblaApi);
  useCtrlWheelCarousel(emblaApi, viewportRef);

  const fetchMediaByYear = useCallback(
    async (year: number) => {
      if (fetchingYears.current.has(year) || loadedYears.current.has(year)) {
        return null;
      }
      fetchingYears.current.add(year);
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
      }
    },
    [mediaType]
  );

  const mergeYearData = useCallback((newData: Midia[]) => {
    setMediaItems((prev) => mergeMediaByDate(prev, newData));
  }, []);

  // Prefetch ano atual e adjacentes em paralelo após montar
  useEffect(() => {
    const year = new Date().getFullYear();
    const years = [year - 1, year, year + 1].filter((y) => !loadedYears.current.has(y));

    Promise.all(years.map((y) => fetchMediaByYear(y))).then((results) => {
      const merged = results.flatMap((r) => r ?? []);
      if (merged.length > 0) mergeYearData(merged);
    });
  }, [fetchMediaByYear, mergeYearData]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSettle = async () => {
      const items = mediaItemsRef.current;
      const selectedIndex = emblaApi.selectedScrollSnap();
      previousSelectedIndex.current = selectedIndex;
      const selectedItem = items[selectedIndex];

      if (selectedItem?.data_lancamento_api) {
        try {
          const date = parseISO(selectedItem.data_lancamento_api);
          const title = format(date, "'Lançamentos de' MMMM 'de' yyyy", { locale: ptBR });
          setCurrentTitle(title.charAt(0).toUpperCase() + title.slice(1));
        } catch {
          setCurrentTitle('Lançamentos');
        }
      }

      const buffer = 15;
      if (selectedIndex >= items.length - buffer) {
        const maxLoadedYear = Math.max(...Array.from(loadedYears.current));
        const isFetchingFuture = Array.from(fetchingYears.current).some((y) => y > maxLoadedYear);
        if (!isFetchingFuture) {
          const newData = await fetchMediaByYear(maxLoadedYear + 1);
          if (newData) mergeYearData(newData);
        }
      }

      if (selectedIndex < buffer) {
        const minLoadedYear = Math.min(...Array.from(loadedYears.current));
        const isFetchingPast = Array.from(fetchingYears.current).some((y) => y < minLoadedYear);
        if (!isFetchingPast) {
          const newData = await fetchMediaByYear(minLoadedYear - 1);
          if (newData) mergeYearData(newData);
        }
      }
    };

    emblaApi.on('settle', onSettle);
    return () => {
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, fetchMediaByYear, mergeYearData]);

  useEffect(() => {
    if (!emblaApi || !initialData[startIndex]) return;

    const initialItem = initialData[startIndex];
    if (initialItem?.data_lancamento_api) {
      try {
        const date = parseISO(initialItem.data_lancamento_api);
        const title = format(date, "'Lançamentos de' MMMM 'de' yyyy", { locale: ptBR });
        setCurrentTitle(title.charAt(0).toUpperCase() + title.slice(1));
      } catch {
        setCurrentTitle('Lançamentos');
      }
    }
  }, [emblaApi, initialData, startIndex]);

  useEffect(() => {
    if (!emblaApi || itemsLengthRef.current === mediaItems.length) return;

    const prevLength = itemsLengthRef.current;
    const added = mediaItems.length - prevLength;
    const wasPrepend = added > 0 && previousSelectedIndex.current < 15;

    itemsLengthRef.current = mediaItems.length;
    emblaApi.reInit();

    if (wasPrepend) {
      emblaApi.scrollTo(previousSelectedIndex.current + added, true);
    }
  }, [emblaApi, mediaItems.length]);

  const navigateByMonth = (direction: 'next' | 'prev') => {
    if (!emblaApi || mediaItems.length === 0) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    const currentItem = mediaItems[selectedIndex];
    if (!currentItem) return;

    const currentItemDate = parseISO(currentItem.data_lancamento_api);
    const targetDate =
      direction === 'next'
        ? new Date(currentItemDate.getFullYear(), currentItemDate.getMonth() + 1, 1)
        : new Date(currentItemDate.getFullYear(), currentItemDate.getMonth() - 1, 1);

    const targetIndex = mediaItems.findIndex((item) => new Date(item.data_lancamento_api) >= targetDate);
    if (targetIndex !== -1) emblaApi.scrollTo(targetIndex);
  };

  const genres = useMemo(
    () => Array.from(new Set(mediaItems.flatMap((item) => item.generos_api || []))).filter(Boolean),
    [mediaItems]
  );

  const filteredItems = useMemo(
    () => (selectedGenre ? mediaItems.filter((item) => item.generos_api?.includes(selectedGenre)) : mediaItems),
    [mediaItems, selectedGenre]
  );

  const virtualRange = useCarouselVirtualRange(emblaApi, filteredItems.length);
  const selectedSnap = emblaApi?.selectedScrollSnap() ?? startIndex;

  return (
    <div className={`${className ?? ''} overflow-hidden max-w-full`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 px-2 sm:px-4">
        <h3
          className="text-xl font-bold h-8 cursor-pointer font-display orbe-text-primary"
          onClick={() => emblaApi?.scrollTo(startIndex)}
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
          <p className="text-xs text-muted-foreground hidden sm:block ml-2">Ctrl + scroll para navegar</p>
        </div>
      </div>
      <TooltipProvider delayDuration={300}>
        <div
          className="overflow-hidden max-w-full py-2 px-1 sm:px-2"
          ref={setViewportRef}
          style={{ touchAction: 'pan-x pinch-zoom' }}
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
