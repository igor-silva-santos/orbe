'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { CAROUSEL_VIEWPORT_TOUCH_ACTION } from '@/lib/carousel-touch';
import { useCtrlWheelCarousel } from '@/hooks/useCtrlWheelCarousel';
import { useCarouselDragClickGuard } from '@/hooks/useCarouselDragClickGuard';
import { useCarouselVirtualRange } from '@/hooks/useCarouselVirtualRange';
import { ChevronLeft, ChevronRight, CalendarDays, ListOrdered, Filter, Zap, TrendingUp } from 'lucide-react';
import { useOrbeCarousel, FAST_CAROUSEL_DURATION } from '@/hooks/useOrbeCarousel';
import { useCarouselInfiniteLoop } from '@/hooks/useCarouselInfiniteLoop';
import { useCarouselInitialPosterReveal } from '@/hooks/useCarouselInitialPosterReveal';
import { getCarouselNavWrapIndex } from '@/lib/carousel-loop';
import {
  ANIME_AGENDA_UNSCHEDULED_LABEL,
  buildWeeklyItemsFromSchedule,
  filterWeeklyAgendaByGenre,
  getAnimeAgendaDate,
  resolveWeeklyAgendaStartIndex,
  type AnimeAgendaItem,
} from '@/lib/carousel-anime-agenda';
import { getWeekdayInBrazil } from '@/lib/brazil-timezone';
import { useFanCarouselSlides } from '@/hooks/useFanCarouselSlides';
import CarouselPosterRevealOverlay from '@/components/ui/CarouselPosterRevealOverlay';
import CarouselScrollbar from '@/components/ui/CarouselScrollbar';
import CarouselSectionHeading from '@/components/ui/CarouselSectionHeading';

import MidiaCard from './MidiaCard';
import MidiaCardSkeleton from './MidiaCardSkeleton';
import { LoadingOverlay } from '@/components/ui/LoadingIndicator';
import DaySeparatorCard from './DaySeparatorCard';
import { Anime } from '@/types';
import { API_BASE } from '@/lib/apiBase';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TooltipProvider } from '@/components/ui/tooltip';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';

type CarouselItem = AnimeAgendaItem;

type Season = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
type ViewMode = 'launch' | 'weekly';

interface AnimeCarouselProps {
    initialData: Anime[];
    /** When false, defers season bootstrap/prefetch until section is near viewport */
    bootstrapEnabled?: boolean;
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
/** Slides de placeholder durante posicionamento inicial — snap central para align:center do Embla */
const SKELETON_SLIDE_COUNT = 10;
const SKELETON_CENTER_INDEX = Math.floor(SKELETON_SLIDE_COUNT / 2);

const RELEVANT_ANIME_FORMATS = ['TV', 'TV_SHORT', 'MOVIE', 'ONA'];

const mergeAnimesByStartDate = (existing: Anime[], incoming: Anime[]): Anime[] => {
  const byId = new Map(existing.map((anime) => [anime.id, anime]));
  for (const anime of incoming) {
    byId.set(anime.id, anime);
  }
  return Array.from(byId.values()).sort((a, b) => {
    const dateA = a.startDate
      ? new Date(a.startDate.year, a.startDate.month - 1, a.startDate.day).getTime()
      : 0;
    const dateB = b.startDate
      ? new Date(b.startDate.year, b.startDate.month - 1, b.startDate.day).getTime()
      : 0;
    return dateA - dateB;
  });
};

const filterRelevantAnimes = (animes: Anime[]): Anime[] =>
  animes.filter(
    (anime) => anime.format && RELEVANT_ANIME_FORMATS.includes(anime.format) && !anime.isAdult,
  );

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

const findSeasonStartIndex = (
  items: CarouselItem[],
  year: number,
  season: Season,
): number =>
  items.findIndex(
    (item) =>
      item.type === 'media' &&
      item.data.startDate &&
      item.data.startDate.year === year &&
      getSeason(
        new Date(item.data.startDate.year, item.data.startDate.month - 1, item.data.startDate.day),
      ) === season,
  );

const AnimeCarousel: React.FC<AnimeCarouselProps> = ({ initialData, bootstrapEnabled = true }) => {
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
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('launch');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasSettledInitialView, setHasSettledInitialView] = useState(false);
  const [hasInitialPositioning, setHasInitialPositioning] = useState(initialData.length === 0);
  const [pendingScrollIndex, setPendingScrollIndex] = useState<number | null>(null);
  const [emAltaMode, setEmAltaMode] = useState(false);
  const [emAltaAnimes, setEmAltaAnimes] = useState<Anime[]>([]);
  const [weeklyLoading, setWeeklyLoading] = useState(false);
  const activeFetchesRef = useRef(0);
  const emAltaLoadedRef = useRef(false);
  const fetchingEmAltaRef = useRef(false);

  const beginBackgroundFetch = () => {
    activeFetchesRef.current += 1;
  };

  const endBackgroundFetch = () => {
    activeFetchesRef.current = Math.max(0, activeFetchesRef.current - 1);
  };

  const loadedSeasons = useRef<Set<string>>(
    initialData.length > 0 ? new Set([`${initialYear}-${initialSeason}`]) : new Set(),
  );
  const fetchingSeasons = useRef(new Set<string>());
  const previousSelectedIndex = useRef<number>(0);
  const itemsLengthRef = useRef(initialData.length);
  const carouselItemsRef = useRef<CarouselItem[]>([]);
  const fetchedAnimesRef = useRef<Anime[]>(initialData);
  const viewModeRef = useRef<ViewMode>('launch');
  const initialViewModeApplied = useRef(false);
  const lastTitleKeyRef = useRef('');
  const hasInitialPositioningRef = useRef(initialData.length === 0);
  const initialScrollDoneRef = useRef(false);
  const prevStartIndexRef = useRef(0);
  const firstMediaIdRef = useRef<number | undefined>(initialData[0]?.id);
  const seasonBootstrapRanRef = useRef(false);
  const seasonNavDirectionRef = useRef<'next' | 'prev'>('next');

  const buildLaunchTitle = useCallback((season: Season, year: number) => {
    const today = new Date();
    const currentSeasonObj = getSeason(today);
    const currentYearObj = today.getFullYear();
    if (season === currentSeasonObj && year === currentYearObj) {
      return `Estreias de ${SEASON_NAMES[season]} ${year}`;
    }
    return `Temporada de ${SEASON_NAMES[season]} ${year}`;
  }, []);

  const updateTitleFromIndex = useCallback((index: number, items: CarouselItem[]) => {
    if (emAltaMode) return;

    const item = items[index];
    if (!item) return;

    let title: string | null = null;
    let titleKey: string | null = null;

    if (viewModeRef.current === 'weekly') {
      if (item.type === 'separator') {
        titleKey = `day-${item.dayName}`;
        title = item.dayName === ANIME_AGENDA_UNSCHEDULED_LABEL
          ? 'Agenda: Sem episódio agendado'
          : `Agenda: ${item.dayName}`;
      } else if (item.type === 'media') {
        const agendaDate = getAnimeAgendaDate(item.data);
        if (agendaDate) {
          const dayName = DAY_NAMES[getWeekdayInBrazil(agendaDate)];
          titleKey = `day-${dayName}`;
          title = `Agenda: ${dayName}`;
        }
      }
    } else if (item.type === 'media' && item.data.startDate) {
      const itemDate = new Date(
        item.data.startDate.year,
        item.data.startDate.month - 1,
        item.data.startDate.day,
      );
      const season = getSeason(itemDate);
      const year = itemDate.getFullYear();
      titleKey = `season-${year}-${season}`;
      title = buildLaunchTitle(season, year);
    }

    if (!title || !titleKey || titleKey === lastTitleKeyRef.current) return;
    lastTitleKeyRef.current = titleKey;
    setCurrentTitle(title);
  }, [emAltaMode, buildLaunchTitle]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [emblaRef, emblaApi] = useOrbeCarousel({
    // Posicionamento real vem via pendingScrollIndex; skeletons usam snap central.
    startIndex: SKELETON_CENTER_INDEX,
    duration: fastScrollEnabled ? FAST_CAROUSEL_DURATION : undefined,
  });

  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node;
      emblaRef(node);
    },
    [emblaRef]
  );

  const getLoopBounds = useCallback(() => {
    const last = Math.max(0, carouselItemsRef.current.length - 1);
    return { start: 0, end: last };
  }, []);

  const loopEnabled =
    viewMode === 'weekly' &&
    !emAltaMode &&
    !hasInitialPositioning &&
    pendingScrollIndex === null &&
    carouselItems.length > 0;

  const infiniteLoopConfig = useMemo(
    () => ({ enabled: loopEnabled, getBounds: getLoopBounds }),
    [loopEnabled, getLoopBounds],
  );

  const handleLoopWrap = useCallback(
    (targetIndex: number) => {
      previousSelectedIndex.current = targetIndex;
      setSelectedSnap(targetIndex);
      updateTitleFromIndex(targetIndex, carouselItemsRef.current);
    },
    [updateTitleFromIndex],
  );

  useCarouselInfiniteLoop({
    emblaApi,
    enabled: loopEnabled,
    getBounds: getLoopBounds,
    onWrap: handleLoopWrap,
  });

  useFanCarouselSlides(emblaApi);
  useCtrlWheelCarousel(emblaApi, viewportRef, fastScrollEnabled, infiniteLoopConfig);
  useCarouselDragClickGuard(viewportRef);

  /** Mantém skeletons centralizados no viewport (align:center) até o scroll real */
  useEffect(() => {
    if (!emblaApi || emAltaMode || !hasInitialPositioningRef.current) return;
    emblaApi.reInit();
    emblaApi.scrollTo(SKELETON_CENTER_INDEX, false);
  }, [emblaApi, emAltaMode, hasInitialPositioning]);

  useEffect(() => {
    carouselItemsRef.current = carouselItems;
  }, [carouselItems]);

  useEffect(() => {
    fetchedAnimesRef.current = fetchedAnimes;
  }, [fetchedAnimes]);

  /** Atualiza dados após sync sem remontar o carrossel */
  useEffect(() => {
    if (!initialData.length) return;
    setFetchedAnimes((prev) => {
      const merged = mergeAnimesByStartDate(prev, initialData);
      fetchedAnimesRef.current = merged;
      return merged;
    });
  }, [initialData]);

  const fetchSeasonData = useCallback(async (year: number, season: Season, direction: 'next' | 'prev' | 'current' = 'current') => {
    const seasonId = `${year}-${season}`;
    if (fetchingSeasons.current.has(seasonId) || loadedSeasons.current.has(seasonId)) {
      return null;
    }
    fetchingSeasons.current.add(seasonId);
    beginBackgroundFetch();

    try {
      const response = await fetchWithTimeout(
        `${API_BASE}/animes/by-season?year=${year}&season=${season}`,
        { cache: 'no-store' },
      );
      if (!response.ok) {
        console.error(`Error fetching animes for season ${seasonId}: HTTP ${response.status}`);
        return null;
      }
      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.includes('application/json')) {
        console.error(`Error fetching animes for season ${seasonId}: resposta não é JSON`);
        return null;
      }
      const animes: Anime[] = await response.json();
      const newAnimes = filterRelevantAnimes(animes);

      if (newAnimes.length > 0) {
        loadedSeasons.current.add(seasonId);
      }

      if (direction === 'next') {
        setFetchedAnimes((prev) => {
          const merged = mergeAnimesByStartDate(prev, newAnimes);
          fetchedAnimesRef.current = merged;
          return merged;
        });
      } else if (direction === 'prev') {
        setFetchedAnimes((prev) => {
          const merged = mergeAnimesByStartDate(newAnimes, prev);
          fetchedAnimesRef.current = merged;
          return merged;
        });
      } else {
        const merged = mergeAnimesByStartDate([], newAnimes);
        fetchedAnimesRef.current = merged;
        setFetchedAnimes(merged);
      }
      
      return newAnimes;
    } catch (error) {
      console.error(`Error fetching animes for season ${seasonId}:`, error);
      return null;
    } finally {
      fetchingSeasons.current.delete(seasonId);
      endBackgroundFetch();
    }
  }, []);

  const loadEmAlta = useCallback(async () => {
    if (fetchingEmAltaRef.current || emAltaLoadedRef.current) return;
    fetchingEmAltaRef.current = true;
    beginBackgroundFetch();
    try {
      const response = await fetchWithTimeout(`${API_BASE}/animes?filtro=populares&limit=40`, {
        cache: 'no-store',
      });
      if (!response.ok) {
        console.error('Error fetching "em alta" animes: HTTP', response.status);
        return;
      }
      const data = await response.json();
      const RELEVANT_FORMATS = ['TV', 'TV_SHORT', 'MOVIE', 'ONA'];
      const results: Anime[] = Array.isArray(data?.results) ? data.results : [];
      setEmAltaAnimes(filterRelevantAnimes(results));
      emAltaLoadedRef.current = true;
    } catch (error) {
      console.error('Error fetching "em alta" animes:', error);
    } finally {
      fetchingEmAltaRef.current = false;
      endBackgroundFetch();
    }
  }, []);

  const toggleEmAlta = () => {
    setEmAltaMode((prev) => {
      const next = !prev;
      if (next) void loadEmAlta();
      return next;
    });
  };

  useEffect(() => {
    if (!emblaApi || !emAltaMode) return;
    itemsLengthRef.current = carouselItems.length;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi, emAltaMode, emAltaAnimes]);

  // Busca temporada atual se o SSR não trouxe dados; prefetch adjacentes quando visível
  useEffect(() => {
    if (!bootstrapEnabled || seasonBootstrapRanRef.current) return;
    seasonBootstrapRanRef.current = true;

    if (initialData.length === 0) {
      void fetchSeasonData(initialYear, initialSeason, 'current');
    }

    const seasonIdx = SEASONS.indexOf(initialSeason);
    const prevSeason = SEASONS[(seasonIdx - 1 + 4) % 4];
    const prevYear = seasonIdx === 0 ? initialYear - 1 : initialYear;
    const nextSeason = SEASONS[(seasonIdx + 1) % 4];
    const nextYear = seasonIdx === 3 ? initialYear + 1 : initialYear;
    void fetchSeasonData(prevYear, prevSeason, 'prev');
    void fetchSeasonData(nextYear, nextSeason, 'next');
  }, [bootstrapEnabled, fetchSeasonData, initialData.length, initialSeason, initialYear]);

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  // Define modo inicial apenas uma vez — não sobrescreve escolha do usuário ao rolar
  useEffect(() => {
    if (initialViewModeApplied.current) return;
    initialViewModeApplied.current = true;

    const today = new Date();
    const season = getSeason(today);
    const { startDate } = getSeasonDateRange(today.getFullYear(), season);
    const diffInMs = today.getTime() - startDate.getTime();
    const diffInWeeks = Math.ceil(diffInMs / (7 * 24 * 60 * 60 * 1000));

    if (diffInWeeks >= 4) {
      setViewMode('weekly');
    } else {
      setViewMode('launch');
    }
    setHasSettledInitialView(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const prefetchSeasonEdges = async (selectedIndex: number) => {
      if (emAltaMode) return;
      if (fetchingSeasons.current.size > 0) return;

      const items = carouselItemsRef.current;
      const animes = fetchedAnimesRef.current;

      const buffer = fastScrollEnabled ? 25 : 15;
      if (items.length > 0 && selectedIndex >= items.length - buffer) {
        const lastAnime = animes[animes.length - 1];
        if (!lastAnime?.startDate) return;
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
        if (!firstAnime?.startDate) return;
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

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      setSelectedSnap(selectedIndex);
      if (emAltaMode || hasInitialPositioningRef.current) return;

      const items = carouselItemsRef.current;
      previousSelectedIndex.current = selectedIndex;
      updateTitleFromIndex(selectedIndex, items);
    };

    const onSettle = () => {
      if (emAltaMode) return;
      const selectedIndex = emblaApi.selectedScrollSnap();
      previousSelectedIndex.current = selectedIndex;
      void prefetchSeasonEdges(selectedIndex);
    };

    emblaApi.on('settle', onSettle);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('settle', onSettle);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, fetchSeasonData, fastScrollEnabled, emAltaMode, updateTitleFromIndex]);

  const emAltaSourceAnimes = emAltaMode ? emAltaAnimes : fetchedAnimes;
  const genres = Array.from(new Set(emAltaSourceAnimes.flatMap(anime => anime.generos_api || []))).filter(Boolean);

  const filteredAnimes = selectedGenre
    ? emAltaSourceAnimes.filter(anime => anime.generos_api?.includes(selectedGenre))
    : emAltaSourceAnimes;

  useEffect(() => {
    let newCarouselItems: CarouselItem[] = [];
    let newStartIndex = 0;

    if (emAltaMode) {
        newCarouselItems = filteredAnimes.map(anime => ({ type: 'media', data: anime }));
    } else if (viewMode === 'launch') {
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
            const seasonStartCandidate = newCarouselItems.findIndex(item =>
                item.type === 'media' &&
                item.data.startDate &&
                item.data.startDate.year === currentYearObj &&
                getSeason(new Date(item.data.startDate.year, item.data.startDate.month - 1, item.data.startDate.day)) === currentSeasonObj
            );
            newStartIndex = startIndexCandidate > -1
              ? startIndexCandidate
              : (seasonStartCandidate > -1 ? seasonStartCandidate : 0);
        } else {
            const searchYear = currentYear;
            const searchSeason = currentSeason;
            const startIndexCandidate = newCarouselItems.findIndex(item => 
                item.type === 'media' && 
                item.data.startDate &&
                item.data.startDate.year === searchYear &&
                getSeason(new Date(item.data.startDate.year, item.data.startDate.month - 1, item.data.startDate.day)) === searchSeason
            );
            if (startIndexCandidate > -1) {
              newStartIndex = startIndexCandidate;
            } else {
              const mediaItems = newCarouselItems.filter((item): item is { type: 'media'; data: Anime } => item.type === 'media');
              if (mediaItems.length > 0) {
                const wrapMediaIndex = getCarouselNavWrapIndex(seasonNavDirectionRef.current, mediaItems.length);
                const wrapItem = mediaItems[wrapMediaIndex];
                newStartIndex = newCarouselItems.findIndex(
                  (item) => item.type === 'media' && item.data.id === wrapItem.data.id,
                );
              }
            }
        }

    } else {
        return;
    }
    
    setCarouselItems(newCarouselItems);
    setStartIndex(newStartIndex);

    const startIndexChanged = newStartIndex !== prevStartIndexRef.current;
    prevStartIndexRef.current = newStartIndex;
    const firstMedia = newCarouselItems.find((item) => item.type === 'media');
    firstMediaIdRef.current = firstMedia?.type === 'media' ? firstMedia.data.id : undefined;

    if (emAltaMode) return;
    if (!initialScrollDoneRef.current && newCarouselItems.length > 0) {
      initialScrollDoneRef.current = true;
      setPendingScrollIndex(newStartIndex);
    } else if (startIndexChanged) {
      lastTitleKeyRef.current = '';
      setPendingScrollIndex(newStartIndex);
    }

  }, [fetchedAnimes, selectedGenre, viewMode, currentYear, currentSeason, emAltaMode, emAltaAnimes]);

  /** Agenda semanal: dados do cronograma real (airingSchedule) via API */
  useEffect(() => {
    if (emAltaMode || viewMode !== 'weekly') return;

    let cancelled = false;
    setWeeklyLoading(true);

    void (async () => {
      try {
        const response = await fetchWithTimeout(`${API_BASE}/animes/weekly-schedule`, {
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('weekly-schedule failed');
        const grouped = (await response.json()) as Record<string | number, Anime[]>;
        if (cancelled) return;

        let items = buildWeeklyItemsFromSchedule(grouped, DAY_NAMES);
        if (selectedGenre) {
          items = filterWeeklyAgendaByGenre(items, selectedGenre);
        }

        const startIndex = resolveWeeklyAgendaStartIndex(items, DAY_NAMES);
        setCarouselItems(items);
        setStartIndex(startIndex);
        prevStartIndexRef.current = startIndex;
        lastTitleKeyRef.current = '';
        setPendingScrollIndex(items.length > 0 ? startIndex : null);
        if (items.length === 0) {
          hasInitialPositioningRef.current = false;
          setHasInitialPositioning(false);
        }
      } catch (error) {
        console.error('Erro ao carregar agenda semanal:', error);
        if (!cancelled) {
          setCarouselItems([]);
          setPendingScrollIndex(null);
        }
      } finally {
        if (!cancelled) setWeeklyLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [viewMode, emAltaMode, selectedGenre]);

  /** Marca posicionamento inicial concluído quando não há itens para exibir */
  useEffect(() => {
    if (!hasSettledInitialView || emAltaMode || carouselItems.length > 0) return;
    hasInitialPositioningRef.current = false;
    setHasInitialPositioning(false);
  }, [hasSettledInitialView, emAltaMode, carouselItems.length]);

  /** Aplica scroll pendente só com slides reais no DOM (nunca sobre skeletons) */
  useEffect(() => {
    if (pendingScrollIndex === null || !emblaApi || emAltaMode) return;
    if (carouselItems.length === 0) {
      setPendingScrollIndex(null);
      hasInitialPositioningRef.current = false;
      setHasInitialPositioning(false);
      return;
    }

    const targetIndex = Math.min(Math.max(0, pendingScrollIndex), carouselItems.length - 1);
    emblaApi.reInit();

    const applyScroll = () => {
      emblaApi.scrollTo(targetIndex, false);
      previousSelectedIndex.current = targetIndex;
      setSelectedSnap(targetIndex);
      updateTitleFromIndex(targetIndex, carouselItems);

      setPendingScrollIndex(null);
      hasInitialPositioningRef.current = false;
      setHasInitialPositioning(false);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(applyScroll);
    });
  }, [pendingScrollIndex, carouselItems, emblaApi, emAltaMode, updateTitleFromIndex]);

  useEffect(() => {
    if (!emblaApi || emAltaMode) return;

    const prevLength = itemsLengthRef.current;
    const newLength = carouselItems.length;
    if (prevLength === newLength) return;

    const added = newLength - prevLength;
    const firstMedia = carouselItems.find((item) => item.type === 'media');
    const wasPrepend =
      added > 0 && firstMedia?.type === 'media' && firstMedia.data.id !== firstMediaIdRef.current;

    itemsLengthRef.current = newLength;
    if (firstMedia?.type === 'media') {
      firstMediaIdRef.current = firstMedia.data.id;
    }

    emblaApi.reInit();

    if (wasPrepend) {
      const shiftedIndex = previousSelectedIndex.current + added;
      if (hasInitialPositioningRef.current) {
        setPendingScrollIndex(shiftedIndex);
      } else {
        emblaApi.scrollTo(shiftedIndex, true);
      }
    }
  }, [emblaApi, carouselItems, emAltaMode]);

  const navigateSeason = async (direction: 'next' | 'prev') => {
    if (isNavigating) return;
    seasonNavDirectionRef.current = direction;
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

    setIsNavigating(true);
    try {
      const seasonKey = `${newYear}-${newSeason}`;
      if (!loadedSeasons.current.has(seasonKey)) {
        await fetchSeasonData(newYear, newSeason, direction);
      }

      const sortedAnimes = [...fetchedAnimesRef.current].sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate.year, a.startDate.month - 1, a.startDate.day).getTime() : 0;
        const dateB = b.startDate ? new Date(b.startDate.year, b.startDate.month - 1, b.startDate.day).getTime() : 0;
        return dateA - dateB;
      });
      const launchItems: CarouselItem[] = sortedAnimes.map((anime) => ({ type: 'media', data: anime }));
      let targetYear = newYear;
      let targetSeason = newSeason;

      if (findSeasonStartIndex(launchItems, targetYear, targetSeason) === -1 && launchItems.length > 0) {
        const mediaItems = launchItems.filter((item): item is { type: 'media'; data: Anime } => item.type === 'media');
        const wrapMediaIndex = getCarouselNavWrapIndex(direction, mediaItems.length);
        const wrapAnime = mediaItems[wrapMediaIndex].data;
        if (wrapAnime.startDate) {
          const wrapDate = new Date(
            wrapAnime.startDate.year,
            wrapAnime.startDate.month - 1,
            wrapAnime.startDate.day,
          );
          targetYear = wrapDate.getFullYear();
          targetSeason = getSeason(wrapDate);
        }
      }

      setCurrentSeason(targetSeason);
      setCurrentYear(targetYear);
      lastTitleKeyRef.current = '';
    } finally {
      setIsNavigating(false);
    }
  };

  const scrollToToday = useCallback(async () => {
    if (!emblaApi || isNavigating) return;

    if (emAltaMode) {
      emblaApi.scrollTo(0, true);
      return;
    }

    setIsNavigating(true);
    try {
      if (viewModeRef.current === 'weekly') {
        setPendingScrollIndex(resolveWeeklyAgendaStartIndex(carouselItemsRef.current, DAY_NAMES));
        return;
      }

      const today = new Date();
      setCurrentSeason(getSeason(today));
      setCurrentYear(today.getFullYear());
      lastTitleKeyRef.current = '';
    } finally {
      setIsNavigating(false);
    }
  }, [emblaApi, emAltaMode, isNavigating]);

  const wasEmAltaMode = useRef(false);
  useEffect(() => {
    if (!emblaApi) return;
    if (!wasEmAltaMode.current || emAltaMode) {
      wasEmAltaMode.current = emAltaMode;
      return;
    }
    wasEmAltaMode.current = emAltaMode;
    itemsLengthRef.current = carouselItems.length;
    emblaApi.reInit();
    void scrollToToday();
  }, [emAltaMode, emblaApi, carouselItems.length, scrollToToday]);

  const virtualRange = useCarouselVirtualRange(emblaApi, carouselItems.length);
  const showPositioningSkeleton = !emAltaMode && hasInitialPositioning && carouselItems.length === 0;
  const isPositioningOverlay = !emAltaMode && hasInitialPositioning && carouselItems.length > 0;

  const centerHasPoster = useMemo(() => {
    if (showPositioningSkeleton || carouselItems.length === 0) return false;
    const item = carouselItems[selectedSnap];
    return item?.type === 'media' ? Boolean(item.data.poster_url_api) : false;
  }, [carouselItems, selectedSnap, showPositioningSkeleton]);

  const { isWaitingForCenterPoster, handleCenterPosterLoad } = useCarouselInitialPosterReveal({
    hasInitialPositioning,
    emAltaMode,
    centerHasPoster,
  });

  const resolvedTitle = emAltaMode
    ? 'Em Alta'
    : isNavigating || weeklyLoading
      ? 'Carregando animes...'
      : showPositioningSkeleton
        ? 'Carregando...'
        : currentTitle || 'Carregando...';

  const resolvedShortTitle = useMemo(() => {
    if (emAltaMode) return 'Em Alta';
    if (viewMode === 'weekly') {
      if (resolvedTitle.startsWith('Agenda: ')) {
        return resolvedTitle.replace('Agenda: ', '');
      }
      return resolvedTitle;
    }
    if (resolvedTitle.startsWith('Temporada de ')) {
      return resolvedTitle.replace('Temporada de ', '');
    }
    return resolvedTitle;
  }, [emAltaMode, viewMode, resolvedTitle]);

  return (
    <div className="overflow-hidden max-w-full">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center mb-4 px-2 sm:px-4">
        <CarouselSectionHeading
          title={resolvedTitle}
          shortTitle={resolvedShortTitle}
          onClick={() => void scrollToToday()}
          hint={emAltaMode ? 'Voltar ao início da lista' : viewMode === 'weekly' ? 'Ir para o dia de hoje' : 'Ir para a temporada atual'}
        />
        <div className="flex justify-between items-center w-full md:mt-0 md:w-auto md:gap-4 shrink-0">
            <div className="flex items-center gap-2">
                <button
                  onClick={toggleEmAlta}
                  className={`p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors ${emAltaMode ? 'bg-primary text-primary-foreground border-primary' : ''}`}
                  title={emAltaMode ? 'Ver por temporada' : 'Ver o que está em alta agora'}
                  aria-pressed={emAltaMode}
                >
                  <TrendingUp className="h-4 w-4" />
                </button>
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
                      disabled={isNavigating}
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
                {!emAltaMode && viewMode === 'launch' && (
                  <>
                    <button
                      onClick={() => navigateSeason('prev')}
                      className="p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      disabled={isNavigating}
                    >
                      <ChevronLeft className="h-4 w-4"/>
                    </button>
                    <button
                      onClick={() => navigateSeason('next')}
                      className="p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      disabled={isNavigating}
                    >
                      <ChevronRight className="h-4 w-4"/>
                    </button>
                  </>
                )}
            </div>
            {!emAltaMode && fetchedAnimes.length > 0 && (
              <button
                  onClick={() => {
                    setViewMode((prev) => (prev === 'launch' ? 'weekly' : 'launch'));
                    lastTitleKeyRef.current = '';
                    setPendingScrollIndex(null);
                    hasInitialPositioningRef.current = true;
                    setHasInitialPositioning(true);
                  }}
                  className="flex items-center gap-2 bg-primary text-primary-foreground font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                  title={viewMode === 'launch' ? 'Lançamento Semanal' : 'Lançamento Mensal'}
              >
                  {viewMode === 'launch' ? <CalendarDays size={20} /> : <ListOrdered size={20} />}
                  <span className="hidden sm:inline">{viewMode === 'launch' ? 'Lançamento Semanal' : 'Lançamento Mensal'}</span>
              </button>
            )}
        </div>
      </div>
      
      <TooltipProvider delayDuration={300}>
      <div className="relative">
        {isNavigating && (
          <LoadingOverlay message={viewMode === 'weekly' ? 'Carregando agenda...' : 'Carregando temporada...'} className="rounded-lg" />
        )}
      <div
        className={`overflow-hidden max-w-full py-2 px-1 sm:px-2 cursor-grab active:cursor-grabbing ${isNavigating || weeklyLoading || isPositioningOverlay ? 'pointer-events-none' : ''}`}
        ref={setViewportRef}
        style={{ touchAction: CAROUSEL_VIEWPORT_TOUCH_ACTION }}
      >
        <div className="flex">
          {showPositioningSkeleton
            ? Array.from({ length: SKELETON_SLIDE_COUNT }).map((_, index) => (
                <div key={`positioning-skeleton-${index}`} className={SLIDE_CLASS}>
                  <MidiaCardSkeleton />
                </div>
              ))
            : carouselItems.length === 0
              ? hasSettledInitialView && !isNavigating
                ? (
                    <div className="w-full py-10 text-center text-muted-foreground px-4">
                      {viewMode === 'weekly'
                        ? 'Nenhum episódio agendado para esta semana.'
                        : 'Nenhum anime encontrado para esta temporada.'}
                      {selectedGenre ? ` (gênero: ${selectedGenre})` : ''}
                    </div>
                  )
                : Array.from({ length: SKELETON_SLIDE_COUNT }).map((_, index) => (
                    <div key={`loading-skeleton-${index}`} className={SLIDE_CLASS}>
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
                    <div className="w-full max-w-[210px] mx-auto aspect-[206/290] rounded-lg bg-skeleton orbe-shimmer" aria-hidden />
                  ) : item.type === 'separator' ? (
                    <DaySeparatorCard dayName={item.dayName} />
                  ) : (
                    <MidiaCard
                      midia={item.data}
                      type="anime"
                      priority={isPriority}
                      isFocused={index === selectedSnap}
                      userInteractions={userInteractions}
                      onInteraction={handleInteraction}
                      onPosterLoad={index === selectedSnap ? handleCenterPosterLoad : undefined}
                    />
                  )}
                </div>
              );})}
        </div>
      </div>
      <CarouselScrollbar emblaApi={emblaApi} />
      <CarouselPosterRevealOverlay visible={isWaitingForCenterPoster || isPositioningOverlay} />
      </div>
      </TooltipProvider>
    </div>
  );
};

export default AnimeCarousel;
