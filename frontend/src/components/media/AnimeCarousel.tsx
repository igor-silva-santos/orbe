'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { CAROUSEL_VIEWPORT_TOUCH_ACTION } from '@/lib/carousel-touch';
import { useCtrlWheelCarousel } from '@/hooks/useCtrlWheelCarousel';
import { useCarouselVirtualRange } from '@/hooks/useCarouselVirtualRange';
import { ChevronLeft, ChevronRight, CalendarDays, ListOrdered, Filter, Zap } from 'lucide-react';
import { useOrbeCarousel, FAST_CAROUSEL_DURATION } from '@/hooks/useOrbeCarousel';
import { useFanCarouselSlides } from '@/hooks/useFanCarouselSlides';

import MidiaCard from './MidiaCard';
import MidiaCardSkeleton from './MidiaCardSkeleton';
import { LoadingOverlay } from '@/components/ui/LoadingIndicator';
import DaySeparatorCard from './DaySeparatorCard';
import { Anime } from '@/types';
import { API_BASE } from '@/lib/apiBase';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TooltipProvider } from '@/components/ui/tooltip';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';

type CarouselItem = 
  | { type: 'media'; data: Anime }
  | { type: 'separator'; dayName: string };

type Season = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
type ViewMode = 'launch' | 'weekly';

interface AnimeCarouselProps {
    initialData: Anime[];
}

const SEASONS: Season[] = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
const SEASON_NAMES: Record<Season, string> = {
  WINTER: 'Inverno',
  SPRING: 'Primavera',
  SUMMER: 'Verão',
  FALL: 'Outono',
};
const DAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const SLIDE_CLASS = 'relative flex-[0_0_170px] sm:flex-[0_0_190px] md:flex-[0_0_210px] min-w-0 pl-3 sm:pl-4 carousel-slide';

const getSeason = (date: Date): Season => {
  const month = date.getMonth();
  if (month >= 0 && month <= 2) return 'WINTER';
  if (month >= 3 && month <= 5) return 'SPRING';
  if (month >= 6 && month <= 8) return 'SUMMER';
  return 'FALL';
};

const getSeasonDateRange = (year: number, season: Season): { startDate: Date, endDate: Date } => {
    let startDate: Date, endDate: Date;
    switch (season) {
        case 'WINTER': [startDate, endDate] = [new Date(year, 0, 1), new Date(year, 2, 31)]; break;
        case 'SPRING': [startDate, endDate] = [new Date(year, 3, 1), new Date(year, 5, 30)]; break;
        case 'SUMMER': [startDate, endDate] = [new Date(year, 6, 1), new Date(year, 8, 30)]; break;
        case 'FALL':   [startDate, endDate] = [new Date(year, 9, 1), new Date(year, 11, 31)]; break;
    }
    return { startDate, endDate };
};

const AnimeCarousel: React.FC<AnimeCarouselProps> = ({ initialData }) => {
    const handleInteraction = useMidiaInteraction();
    const userInteractions = useAppStore((s) => s.userInteractions);
    const fastScrollEnabled = useAppStore((s) => s.fastScrollEnabled);
    const toggleFastScroll = useAppStore((s) => s.toggleFastScroll);
  const [fetchedAnimes, setFetchedAnimes] = useState<Anime[]>(initialData);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  
  const initialSeason = getSeason(new Date());
  const initialYear = new Date().getFullYear();

  const [currentSeason, setCurrentSeason] = useState<Season>(initialSeason);
  const [currentYear, setCurrentYear] = useState(initialYear);
  
  const [currentTitle, setCurrentTitle] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('launch');
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

  const loadedSeasons = useRef<Set<string>>(new Set([`${initialYear}-${initialSeason}`]));
  const fetchingSeasons = useRef(new Set<string>());
  const previousSelectedIndex = useRef<number>(0);
  const itemsLengthRef = useRef(initialData.length);
  const carouselItemsRef = useRef<CarouselItem[]>([]);
  const fetchedAnimesRef = useRef<Anime[]>(initialData);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [emblaRef, emblaApi] = useOrbeCarousel({
    duration: fastScrollEnabled ? FAST_CAROUSEL_DURATION : undefined,
  });

  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node;
      emblaRef(node);
    },
    [emblaRef]
  );

  useFanCarouselSlides(emblaApi);
  useCtrlWheelCarousel(emblaApi, viewportRef, fastScrollEnabled);

  useEffect(() => {
    carouselItemsRef.current = carouselItems;
  }, [carouselItems]);

  useEffect(() => {
    fetchedAnimesRef.current = fetchedAnimes;
  }, [fetchedAnimes]);

  const fetchSeasonData = useCallback(async (year: number, season: Season, direction: 'next' | 'prev' | 'current' = 'current') => {
    const seasonId = `${year}-${season}`;
    if (fetchingSeasons.current.has(seasonId) || loadedSeasons.current.has(seasonId)) {
      return null;
    }
    fetchingSeasons.current.add(seasonId);
    beginFetch();

    try {
      const response = await fetch(`${API_BASE}/animes/by-season?year=${year}&season=${season}`);
      const animes: Anime[] = await response.json();
      const RELEVANT_FORMATS = ['TV', 'TV_SHORT', 'MOVIE', 'ONA'];
      const newAnimes = animes.filter(anime => anime.format && RELEVANT_FORMATS.includes(anime.format) && !anime.isAdult);
      
      loadedSeasons.current.add(seasonId);

      if (direction === 'current') {
        setFetchedAnimes(newAnimes);
      } else if (direction === 'next') {
        setFetchedAnimes(prev => [...prev, ...newAnimes]);
      } else {
        setFetchedAnimes(prev => [...newAnimes, ...prev]);
      }
      
      return newAnimes;
    } catch (error) {
      console.error(`Error fetching animes for season ${seasonId}:`, error);
      return null;
    } finally {
      fetchingSeasons.current.delete(seasonId);
      endFetch();
    }
  }, []);

  // Prefetch temporadas adjacentes em paralelo
  useEffect(() => {
    const seasonIdx = SEASONS.indexOf(initialSeason);
    const prevSeason = SEASONS[(seasonIdx - 1 + 4) % 4];
    const prevYear = seasonIdx === 0 ? initialYear - 1 : initialYear;
    const nextSeason = SEASONS[(seasonIdx + 1) % 4];
    const nextYear = seasonIdx === 3 ? initialYear + 1 : initialYear;
    void fetchSeasonData(prevYear, prevSeason, 'prev');
    void fetchSeasonData(nextYear, nextSeason, 'next');
  }, [fetchSeasonData, initialSeason, initialYear]);

  useEffect(() => {
    const today = new Date();
    const season = getSeason(today);
    const year = today.getFullYear();
    
    if (season === currentSeason && year === currentYear) {
        const { startDate } = getSeasonDateRange(year, season);
        const diffInMs = today.getTime() - startDate.getTime();
        const diffInWeeks = Math.ceil(diffInMs / (7 * 24 * 60 * 60 * 1000));
        
        if (diffInWeeks >= 4) {
          setViewMode('weekly');
          setCurrentTitle(`Agenda: Semana ${diffInWeeks} de ${SEASON_NAMES[season]}`);
        } else {
          setViewMode('launch');
          setCurrentTitle(`Estreias de ${SEASON_NAMES[season]} ${year}`);
        }
    } else {
        setViewMode('launch');
        setCurrentTitle(`Temporada de ${SEASON_NAMES[currentSeason]} ${currentYear}`);
    }
  }, [currentSeason, currentYear]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSettle = async () => {
      if (!emblaApi) return;

      if (fetchingSeasons.current.size > 0) {
          return;
      }

      const selectedIndex = emblaApi.selectedScrollSnap();
      previousSelectedIndex.current = selectedIndex;

      const items = carouselItemsRef.current;
      const animes = fetchedAnimesRef.current;
      const selectedItem = items[selectedIndex];
      if (selectedItem?.type === 'media' && selectedItem.data.startDate) {
          const itemDate = new Date(selectedItem.data.startDate.year, selectedItem.data.startDate.month - 1, selectedItem.data.startDate.day);
          const season = getSeason(itemDate);
          const year = itemDate.getFullYear();
          setCurrentSeason(season);
          setCurrentYear(year);
          setCurrentTitle(`Temporada de ${SEASON_NAMES[season]} ${year}`);
      }

      // Com rolagem rápida, o buffer precisa ser maior — o 'settle' de um arraste rápido
      // pode chegar perto da borda antes da temporada seguinte ter tido tempo de carregar.
      const buffer = fastScrollEnabled ? 25 : 15;
      if (items.length > 0 && selectedIndex >= items.length - buffer) {
        const lastAnime = animes[animes.length - 1];
        if (!lastAnime || !lastAnime.startDate) return;
        const lastItemDate = new Date(lastAnime.startDate.year, lastAnime.startDate.month - 1, lastAnime.startDate.day);
        const lastSeason = getSeason(lastItemDate);
        const lastYear = lastItemDate.getFullYear();
        
        const currentSeasonIndex = SEASONS.indexOf(lastSeason);
        const nextSeasonIndex = (currentSeasonIndex + 1) % 4;
        const nextSeason = SEASONS[nextSeasonIndex];
        const nextYear = nextSeasonIndex === 0 ? lastYear + 1 : lastYear;
        
        await fetchSeasonData(nextYear, nextSeason, 'next');
      }

      if (items.length > 0 && selectedIndex < buffer) {
        const firstAnime = animes[0];
        if (!firstAnime || !firstAnime.startDate) return;
        const firstItemDate = new Date(firstAnime.startDate.year, firstAnime.startDate.month - 1, firstAnime.startDate.day);
        const firstSeason = getSeason(firstItemDate);
        const firstYear = firstItemDate.getFullYear();

        const currentSeasonIndex = SEASONS.indexOf(firstSeason);
        const prevSeasonIndex = (currentSeasonIndex - 1 + 4) % 4;
        const prevSeason = SEASONS[prevSeasonIndex];
        const prevYear = prevSeasonIndex === 3 ? firstYear - 1 : firstYear;

        await fetchSeasonData(prevYear, prevSeason, 'prev');
      }
    };

    emblaApi.on('settle', onSettle);
    // Também dispara no 'select' (durante o arraste, antes de soltar) — em rolagens
    // rápidas o 'settle' sozinho chega tarde demais para a temporada seguinte carregar a tempo.
    emblaApi.on('select', onSettle);

    const selectedIndex = emblaApi.selectedScrollSnap();
    const selectedItem = carouselItems[selectedIndex];
    if (selectedItem?.type === 'media' && selectedItem.data.startDate) {
        const itemDate = new Date(selectedItem.data.startDate.year, selectedItem.data.startDate.month - 1, selectedItem.data.startDate.day);
        const season = getSeason(itemDate);
        const year = itemDate.getFullYear();
        setCurrentTitle(`Temporada de ${SEASON_NAMES[season]} ${year}`);
    }

    return () => {
      emblaApi.off('settle', onSettle);
      emblaApi.off('select', onSettle);
    };
  }, [emblaApi, fetchSeasonData, fastScrollEnabled]);

  useEffect(() => {
    setCurrentTitle(`Temporada de ${SEASON_NAMES[initialSeason]} ${initialYear}`);
  }, [initialSeason, initialYear]);

  const genres = Array.from(new Set(fetchedAnimes.flatMap(anime => anime.generos_api || []))).filter(Boolean);

  const filteredAnimes = selectedGenre
    ? fetchedAnimes.filter(anime => anime.generos_api?.includes(selectedGenre))
    : fetchedAnimes;

  useEffect(() => {
    let newCarouselItems: CarouselItem[] = [];
    let newStartIndex = 0;

    if (viewMode === 'launch') {
        const sortedAnimes = [...filteredAnimes].sort((a, b) => {
            const dateA = a.startDate ? new Date(a.startDate.year, a.startDate.month - 1, a.startDate.day).getTime() : 0;
            const dateB = b.startDate ? new Date(b.startDate.year, b.startDate.month - 1, b.startDate.day).getTime() : 0;
            return dateA - dateB;
        });
        newCarouselItems = sortedAnimes.map(anime => ({ type: 'media', data: anime }));
        
        const today = new Date();
        const currentSeasonObj = getSeason(today);
        const currentYearObj = today.getFullYear();
        if (currentSeason === currentSeasonObj && currentYear === currentYearObj) {
            const startIndexCandidate = newCarouselItems.findIndex(item => 
                item.type === 'media' && 
                item.data.startDate &&
                new Date(item.data.startDate.year, item.data.startDate.month - 1, item.data.startDate.day) >= today
            );
            newStartIndex = startIndexCandidate > -1 ? startIndexCandidate : newCarouselItems.length -1;
        } else {
            const searchYear = currentYear;
            const searchSeason = currentSeason;
            const startIndexCandidate = newCarouselItems.findIndex(item => 
                item.type === 'media' && 
                item.data.startDate &&
                item.data.startDate.year === searchYear &&
                getSeason(new Date(item.data.startDate.year, item.data.startDate.month - 1, item.data.startDate.day)) === searchSeason
            );
            newStartIndex = startIndexCandidate > -1 ? startIndexCandidate : 0;
        }

    } else {
        const animesByDay: Record<number, Anime[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
        filteredAnimes.forEach(anime => {
            if (anime.nextAiringEpisode) {
                const localAiringDate = new Date(anime.nextAiringEpisode.airingAt);
                const dayIndex = localAiringDate.getDay();
                animesByDay[dayIndex].push(anime);
            }
        });

        const processedItems: CarouselItem[] = [];
        for (let dayIndex = 0; dayIndex <= 6; dayIndex++) {
            const animesForDay = animesByDay[dayIndex];
            if (animesForDay.length > 0) {
                processedItems.push({ type: 'separator', dayName: DAY_NAMES[dayIndex] });
                animesForDay.sort((a, b) => new Date(a.nextAiringEpisode!.airingAt).getTime() - new Date(b.nextAiringEpisode!.airingAt).getTime());
                animesForDay.forEach(anime => processedItems.push({ type: 'media', data: anime }));
            }
        }
        
        newCarouselItems = processedItems;
        const currentDayIndex = new Date().getDay();
        const startIndexCandidate = newCarouselItems.findIndex(item => item.type === 'separator' && item.dayName === DAY_NAMES[currentDayIndex]);
        newStartIndex = startIndexCandidate > -1 ? startIndexCandidate : 0;
    }
    
    setCarouselItems(newCarouselItems);
    setStartIndex(newStartIndex);

  }, [fetchedAnimes, selectedGenre, viewMode, currentYear, currentSeason]);

  useEffect(() => {
    if (!emblaApi || itemsLengthRef.current === carouselItems.length) return;

    const prevLength = itemsLengthRef.current;
    const added = carouselItems.length - prevLength;
    const wasPrepend = added > 0 && previousSelectedIndex.current < 15;

    itemsLengthRef.current = carouselItems.length;
    emblaApi.reInit();

    if (wasPrepend) {
      emblaApi.scrollTo(previousSelectedIndex.current + added, true);
    } else if (startIndex !== previousSelectedIndex.current) {
      emblaApi.scrollTo(startIndex, true);
    }
  }, [carouselItems.length, startIndex, emblaApi]);

  const navigateSeason = async (direction: 'next' | 'prev') => {
    if (isFetching) return;
    const seasonIndex = SEASONS.indexOf(currentSeason);
    let newSeason: Season;
    let newYear = currentYear;

    if (direction === 'next') {
      const nextSeasonIndex = (seasonIndex + 1) % 4;
      newSeason = SEASONS[nextSeasonIndex];
      if (nextSeasonIndex === 0) newYear++;
    } else {
      const prevSeasonIndex = (seasonIndex - 1 + 4) % 4;
      newSeason = SEASONS[prevSeasonIndex];
      if (prevSeasonIndex === 3) newYear--;
    }
    
    if (!loadedSeasons.current.has(`${newYear}-${newSeason}`)) {
        await fetchSeasonData(newYear, newSeason, 'current');
    } 
    
    const targetIndex = fetchedAnimes.findIndex(anime => anime.startDate && anime.startDate.year === newYear && getSeason(new Date(anime.startDate.year, anime.startDate.month - 1, anime.startDate.day)) === newSeason);
    if (targetIndex > -1) {
        emblaApi?.scrollTo(targetIndex);
    }
    
    setCurrentSeason(newSeason);
    setCurrentYear(newYear);
  };

  const virtualRange = useCarouselVirtualRange(emblaApi, carouselItems.length);
  const selectedSnap = emblaApi?.selectedScrollSnap() ?? startIndex;

  return (
    <div className="overflow-hidden max-w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 px-2 sm:px-4">
        <h3 
          className="text-xl font-bold h-8 cursor-pointer font-display orbe-text-primary"
          onClick={() => emblaApi?.scrollTo(startIndex)}
        >
          {isFetching ? 'Carregando animes...' : currentTitle || 'Carregando...'}
        </h3>
        <div className="flex justify-between items-center w-full mt-2 md:mt-0 md:w-auto md:gap-4">
            <div className="flex items-center gap-2">
                <button
                  onClick={toggleFastScroll}
                  className={`p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors ${fastScrollEnabled ? 'bg-primary text-primary-foreground border-primary' : ''}`}
                  title={fastScrollEnabled ? 'Desativar rolagem rápida' : 'Ativar rolagem rápida'}
                  aria-pressed={fastScrollEnabled}
                >
                  <Zap className="h-4 w-4" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      disabled={isFetching}
                    >
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
                <button
                  onClick={() => navigateSeason('prev')}
                  className="p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isFetching}
                >
                  <ChevronLeft className="h-4 w-4"/>
                </button>
                <button
                  onClick={() => navigateSeason('next')}
                  className="p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isFetching}
                >
                  <ChevronRight className="h-4 w-4"/>
                </button>
            </div>
            {initialData.length > 0 && (
              <button 
                  onClick={() => setViewMode(prev => prev === 'launch' ? 'weekly' : 'launch')}
                  className="flex items-center gap-2 bg-primary text-primary-foreground font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                  {viewMode === 'launch' ? <CalendarDays size={20} /> : <ListOrdered size={20} />}
                  <span className="hidden sm:inline">{viewMode === 'launch' ? 'Ver Agenda' : 'Ver Lançamentos'}</span>
              </button>
            )}
        </div>
      </div>
      
      <TooltipProvider delayDuration={300}>
      <div className="relative">
        {isFetching && (
          <LoadingOverlay message="Carregando temporada..." className="rounded-lg" />
        )}
      <div
        className={`overflow-hidden max-w-full py-2 px-1 sm:px-2 ${isFetching ? 'pointer-events-none' : ''}`}
        ref={setViewportRef}
        style={{ touchAction: CAROUSEL_VIEWPORT_TOUCH_ACTION }}
      >
        <div className="flex">
          {carouselItems.length === 0
            ? Array.from({ length: 10 }).map((_, index) => (
                <div key={`skeleton-${index}`} className={SLIDE_CLASS}>
                  <MidiaCardSkeleton />
                </div>
              ))
            : carouselItems.map((item, index) => {
                const isRendered = index >= virtualRange.start && index <= virtualRange.end;
                const isPriority = Math.abs(index - selectedSnap) <= 4;
                return (
                <div
                  key={item.type === 'separator' ? `sep-${item.dayName}` : `media-${item.data.id}`}
                  className={SLIDE_CLASS}
                >
                  {!isRendered ? (
                    <div className="w-full max-w-[210px] mx-auto aspect-[206/290] rounded-lg bg-muted" aria-hidden />
                  ) : item.type === 'separator' ? (
                    <DaySeparatorCard dayName={item.dayName} />
                  ) : (
                    <MidiaCard
                      midia={item.data}
                      type="anime"
                      priority={isPriority}
                      userInteractions={userInteractions}
                      onInteraction={handleInteraction}
                    />
                  )}
                </div>
              );})}
        </div>
      </div>
      </div>
      </TooltipProvider>
    </div>
  );
};

export default AnimeCarousel;
