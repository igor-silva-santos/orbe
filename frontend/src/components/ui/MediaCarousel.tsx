'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEmblaWheelScroll } from '@/hooks/useEmblaWheelScroll';
import { useFanCarouselSlides } from '@/hooks/useFanCarouselSlides';

import MidiaCard from '../media/MidiaCard';
import MidiaCardSkeleton from '../media/MidiaCardSkeleton';
import type { Midia, TipoMidia, Filme, Serie, Anime, Jogo } from '@/types';
import { API_BASE } from '@/lib/apiBase';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface MediaCarouselProps {
  mediaType: 'filmes' | 'series' | 'jogos';
  initialData: Midia[];
  startIndex: number;
  className?: string;
}

const SLIDE_CLASS = 'relative flex-[0_0_170px] sm:flex-[0_0_190px] md:flex-[0_0_210px] min-w-0 pl-3 sm:pl-4';

const MediaCarousel: React.FC<MediaCarouselProps> = ({ mediaType, initialData, startIndex, className }) => {
  const [mediaItems, setMediaItems] = useState<Midia[]>(initialData);
  const [currentTitle, setCurrentTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  const loadedYears = useRef<Set<number>>(new Set(initialData.map(item => new Date(item.data_lancamento_api).getFullYear())));
  const fetchingYears = useRef(new Set<number>());
  const previousSelectedIndex = useRef<number>(startIndex);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center', 
    skipSnaps: false,
    startIndex: startIndex,
    dragFree: false,
    containScroll: 'trimSnaps',
  });

  const { getSlideStyle } = useFanCarouselSlides(emblaApi);

  useEmblaWheelScroll(emblaApi);

  const fetchMediaByYear = useCallback(async (year: number) => {
    if (fetchingYears.current.has(year) || loadedYears.current.has(year)) {
      return null;
    }
    fetchingYears.current.add(year);
    try {
      const response = await fetch(`${API_BASE}/${mediaType}/by-year?year=${year}`);
      const data: Midia[] = await response.json();
      loadedYears.current.add(year);
      return data.sort((a, b) => new Date(a.data_lancamento_api).getTime() - new Date(b.data_lancamento_api).getTime());
    } catch (error) {
      console.error(`Error fetching ${mediaType} for year ${year}:`, error);
      return null;
    } finally {
      fetchingYears.current.delete(year);
    }
  }, [mediaType]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSettle = async () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      previousSelectedIndex.current = selectedIndex;
      const selectedItem = mediaItems[selectedIndex];

      if (selectedItem?.data_lancamento_api) {
        try {
          const date = parseISO(selectedItem.data_lancamento_api);
          const title = format(date, "'Lançamentos de' MMMM 'de' yyyy", { locale: ptBR });
          setCurrentTitle(title.charAt(0).toUpperCase() + title.slice(1));
        } catch (e) { setCurrentTitle("Lançamentos"); }
      }

      const buffer = 15;
      if (selectedIndex >= mediaItems.length - buffer) {
        const maxLoadedYear = Math.max(...Array.from(loadedYears.current));
        const isFetchingFuture = Array.from(fetchingYears.current).some(year => year > maxLoadedYear);
        if (!isFetchingFuture) {
            const nextYear = maxLoadedYear + 1;
            const newData = await fetchMediaByYear(nextYear);
            if (newData) setMediaItems(prev => [...prev, ...newData]);
        }
      }

      if (selectedIndex < buffer) {
        const minLoadedYear = Math.min(...Array.from(loadedYears.current));
        const isFetchingPast = Array.from(fetchingYears.current).some(year => year < minLoadedYear);
        if (!isFetchingPast) {
            const prevYear = minLoadedYear - 1;
            const newData = await fetchMediaByYear(prevYear);
            if (newData) {
              setMediaItems(prev => [...newData, ...prev]);
            }
        }
      }
    };

    emblaApi.on('settle', onSettle);

    return () => { emblaApi.off('settle', onSettle); };
  }, [emblaApi, mediaItems, fetchMediaByYear]);

  useEffect(() => {
    if (!emblaApi || !initialData[startIndex]) return;

    const initialItem = initialData[startIndex];
    if (initialItem?.data_lancamento_api) {
      try {
        const date = parseISO(initialItem.data_lancamento_api);
        const title = format(date, "'Lançamentos de' MMMM 'de' yyyy", { locale: ptBR });
        setCurrentTitle(title.charAt(0).toUpperCase() + title.slice(1));
      } catch (e) { 
        setCurrentTitle("Lançamentos"); 
      }
    }
  }, [emblaApi, initialData, startIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    const prevLength = emblaApi.slideNodes().length;
    emblaApi.reInit();
    const newLength = emblaApi.slideNodes().length;
    const itemsAdded = newLength - prevLength;

    if (itemsAdded > 0 && previousSelectedIndex.current < 15) {
      emblaApi.scrollTo(previousSelectedIndex.current + itemsAdded, true);
    }
  }, [emblaApi, mediaItems]);

  const navigateByMonth = (direction: 'next' | 'prev') => {
    if (!emblaApi || mediaItems.length === 0) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    const currentItem = mediaItems[selectedIndex];
    if (!currentItem) return;

    const currentItemDate = parseISO(currentItem.data_lancamento_api);
    let targetDate: Date;

    if (direction === 'next') {
      targetDate = new Date(currentItemDate.getFullYear(), currentItemDate.getMonth() + 1, 1);
    } else {
      targetDate = new Date(currentItemDate.getFullYear(), currentItemDate.getMonth() - 1, 1);
    }

    const targetIndex = mediaItems.findIndex(item => new Date(item.data_lancamento_api) >= targetDate);
    if (targetIndex !== -1) emblaApi.scrollTo(targetIndex);
  };

  const genres = Array.from(new Set(mediaItems.flatMap(item => item.generos_api || []))).filter(Boolean);

  const filteredItems = selectedGenre
    ? mediaItems.filter(item => item.generos_api?.includes(selectedGenre))
    : mediaItems;

  return (
    <div className={`${className ?? ''} overflow-hidden max-w-full`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 px-2 sm:px-4">
        <h3 className="text-xl font-bold h-8 cursor-pointer font-display orbe-text-primary" onClick={() => emblaApi?.scrollTo(startIndex)}>
          {currentTitle || 'Carregando...'}
        </h3>
        <div className="flex justify-end items-center w-full md:w-auto mt-2 md:mt-0">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="orbe-block-sm bg-card orbe-text-primary p-2 rounded-xl transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">
                  <Filter className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setSelectedGenre(null)}>Todos os Gêneros</DropdownMenuItem>
                {genres.map(genre => (
                  <DropdownMenuItem key={genre} onSelect={() => setSelectedGenre(genre)}>
                    {genre}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <button onClick={() => navigateByMonth('prev')} className="orbe-block-sm bg-card orbe-text-primary p-2 rounded-xl transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"><ChevronLeft className="h-4 w-4"/></button>
            <button onClick={() => navigateByMonth('next')} className="orbe-block-sm bg-card orbe-text-primary p-2 rounded-xl transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"><ChevronRight className="h-4 w-4"/></button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden max-w-full py-2 px-1 sm:px-2" ref={emblaRef} style={{ touchAction: 'pan-y pinch-zoom' }}>
        <div className="flex">
          {filteredItems.length === 0
            ? Array.from({ length: 10 }).map((_, index) => 
                <div key={index} className={SLIDE_CLASS}>
                  <MidiaCardSkeleton />
                </div>
              )
            : filteredItems.map((item, index) => (
                <div key={`${item.id}-${mediaType}`} className={SLIDE_CLASS} style={getSlideStyle(index)}>
                  <MidiaCard midia={item as Filme | Serie | Anime | Jogo} type={mediaType.slice(0, -1) as TipoMidia} />
                </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default MediaCarousel;
