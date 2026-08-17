'use client';

import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { CAROUSEL_VIEWPORT_TOUCH_ACTION } from '@/lib/carousel-touch';
import { useCtrlWheelCarousel } from '@/hooks/useCtrlWheelCarousel';
import { useCarouselDragClickGuard } from '@/hooks/useCarouselDragClickGuard';
import { useCarouselVirtualRange } from '@/hooks/useCarouselVirtualRange';
import { useCarouselMonthLoader } from '@/hooks/useCarouselMonthLoader';
import {
  formatYearTbdTitle,
  useCarouselYearTbd,
  type YearTbdSlide,
} from '@/hooks/useCarouselYearTbd';
import YearTbdSeparatorCard from '../media/YearTbdSeparatorCard';
import { ChevronLeft, ChevronRight, Filter, Zap, TrendingUp, Clapperboard, Tv, Blend } from 'lucide-react';
import { useOrbeCarousel, FAST_CAROUSEL_DURATION } from '@/hooks/useOrbeCarousel';
import { useCarouselInfiniteLoop } from '@/hooks/useCarouselInfiniteLoop';
import { useCarouselInitialPosterReveal } from '@/hooks/useCarouselInitialPosterReveal';
import { getMediaCarouselLoopBounds, getCarouselNavWrapIndex } from '@/lib/carousel-loop';
import { useFanCarouselSlides } from '@/hooks/useFanCarouselSlides';
import CarouselPosterRevealOverlay from '@/components/ui/CarouselPosterRevealOverlay';
import CarouselScrollbar from '@/components/ui/CarouselScrollbar';
import CarouselSectionHeading from '@/components/ui/CarouselSectionHeading';
import {
  addMonths,
  findIndexForMonth,
  formatCarouselMonthTitle,
  formatCarouselMonthTitleShort,
  filterMidiaForCarouselTimeline,
  mergeMediaByDate,
  monthKeyFromDate,
  monthKeyFromItem,
  monthTitleFromItem,
  parseMonthKey,
  resolveCarouselOpenIndex,
  resolveDatedIndexForNavigation,
  clampCarouselOpenIndex,
  isCarouselBootstrapReady,
  currentMonthCarouselTitle,
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
  /** When false, defers by-month/year-tbd bootstrap until section is near viewport */
  bootstrapEnabled?: boolean;
}

const SLIDE_CLASS = 'relative flex-[0_0_170px] sm:flex-[0_0_190px] md:flex-[0_0_210px] min-w-0 pl-3 sm:pl-4 carousel-slide';
/** Slides de placeholder durante posicionamento inicial — snap central para align:center do Embla */
const SKELETON_SLIDE_COUNT = 10;
const SKELETON_CENTER_INDEX = Math.floor(SKELETON_SLIDE_COUNT / 2);
const CONTROL_BTN = 'p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors';
/** Quantos slides antes da borda do mês disparam prefetch extra ao rolar rápido */
const MONTH_EDGE_BUFFER = 4;
const EMPTY_MONTH_NAV_LIMIT = 8;

type FilmeDisponibilidade = 'cinema' | 'streaming' | 'ambos';

type DisplaySlide =
  | { kind: 'dated'; item: Midia; datedIndex: number }
  | YearTbdSlide;

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  mediaType,
  initialData,
  startIndex: initialStartIndex,
  className,
  bootstrapEnabled = true,
}) => {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const fastScrollEnabled = useAppStore((s) => s.fastScrollEnabled);
  const toggleFastScroll = useAppStore((s) => s.toggleFastScroll);

  const timelineFromSsr = useMemo(
    () => filterMidiaForCarouselTimeline(initialData),
    [initialData],
  );
  const ssrBootstrapReady = useMemo(
    () => isCarouselBootstrapReady(timelineFromSsr),
    [timelineFromSsr],
  );

  const [mediaItems, setMediaItems] = useState<Midia[]>(() => mergeMediaByDate([], initialData));
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(() => currentMonthCarouselTitle());
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasCompletedInitialLoad, setHasCompletedInitialLoad] = useState(false);
  const [hasInitialPositioning, setHasInitialPositioning] = useState(true);
  const [pendingScrollIndex, setPendingScrollIndex] = useState<number | null>(null);
  const [emAltaMode, setEmAltaMode] = useState(false);
  const [emAltaItems, setEmAltaItems] = useState<Midia[]>([]);
  const [emAltaDisponibilidade, setEmAltaDisponibilidade] = useState<FilmeDisponibilidade>('ambos');

  const emAltaLoadedKeyRef = useRef<string | null>(null);
  const fetchingEmAltaRef = useRef(false);
  const lastVisibleMonthKeyRef = useRef<string>('');

  const previousSelectedIndex = useRef<number>(0);
  const firstItemIdRef = useRef<number | undefined>(undefined);
  const itemsLengthRef = useRef(0);
  const mediaItemsRef = useRef<Midia[]>(mergeMediaByDate([], initialData));
  const lastTitleMonthKey = useRef<string>('');
  const hasInitialPositioningRef = useRef(true);
  const bootstrapRanRef = useRef(false);
  const positioningTitleLockedRef = useRef(true);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [emblaRef, emblaApi] = useOrbeCarousel({
    // Posicionamento real vem via pendingScrollIndex; skeletons usam snap central.
    startIndex: SKELETON_CENTER_INDEX,
    duration: fastScrollEnabled ? FAST_CAROUSEL_DURATION : undefined,
  });
  const monthEdgeBuffer = fastScrollEnabled ? MONTH_EDGE_BUFFER * 2 : MONTH_EDGE_BUFFER;

  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node;
      emblaRef(node);
    },
    [emblaRef]
  );

  const applyTimelineFilters = useCallback(
    (items: Midia[]): Midia[] => {
      const timeline = filterMidiaForCarouselTimeline(items);
      return selectedGenre
        ? timeline.filter((item) => item.generos_api?.includes(selectedGenre))
        : timeline;
    },
    [selectedGenre],
  );

  const {
    adjacentPrefetchCount,
    bootstrapInitialMonths,
    resolveOpenPosition,
    ensureUpcomingMonthsLoaded,
    prefetchMonthEdges,
    loadMonth,
    loadMonthsForNavigation,
  } = useCarouselMonthLoader({
    mediaType,
    mediaItemsRef,
    applyDisplayFilters: applyTimelineFilters,
    onItemsMerged: setMediaItems,
    monthEdgeBuffer,
  });

  const { loadYearTbd, getAppendSlides, slidesByYear } = useCarouselYearTbd({ mediaType });

  const genres = useMemo(
    () => Array.from(new Set(
      (emAltaMode ? emAltaItems : mediaItems).flatMap((item) => item.generos_api || []),
    )).filter(Boolean),
    [emAltaMode, emAltaItems, mediaItems],
  );

  const filteredItems = useMemo(() => {
    if (emAltaMode) {
      return selectedGenre
        ? emAltaItems.filter((item) => item.generos_api?.includes(selectedGenre))
        : emAltaItems;
    }
    return applyTimelineFilters(mediaItems);
  }, [emAltaMode, emAltaItems, mediaItems, selectedGenre, applyTimelineFilters]);

  const displaySlides = useMemo((): DisplaySlide[] => {
    if (emAltaMode) {
      return filteredItems.map((item, datedIndex) => ({ kind: 'dated', item, datedIndex }));
    }
    const dated: DisplaySlide[] = filteredItems.map((item, datedIndex) => ({
      kind: 'dated',
      item,
      datedIndex,
    }));
    const nowYear = new Date().getFullYear();
    const appendYears = Array.from({ length: 6 }, (_, i) => nowYear + i);
    return [...dated, ...getAppendSlides(appendYears)];
  }, [emAltaMode, filteredItems, getAppendSlides, slidesByYear]);

  const filteredItemsRef = useRef(filteredItems);
  const displaySlidesRef = useRef(displaySlides);
  useEffect(() => {
    filteredItemsRef.current = filteredItems;
  }, [filteredItems]);
  useEffect(() => {
    displaySlidesRef.current = displaySlides;
  }, [displaySlides]);

  useEffect(() => {
    mediaItemsRef.current = mediaItems;
  }, [mediaItems]);

  /** Atualiza dados após sync sem remontar o carrossel */
  useEffect(() => {
    if (!initialData.length) return;
    setMediaItems((prev) => {
      const merged = mergeMediaByDate(prev, initialData);
      mediaItemsRef.current = merged;
      return merged;
    });
  }, [initialData]);

  const updateTitleFromIndex = useCallback((index: number, items: Midia[]) => {
    if (positioningTitleLockedRef.current) return;
    const item = items[index];
    const title = monthTitleFromItem(item);
    if (!title) return;

    const monthKey = monthKeyFromItem(item);
    const yearOnlyKey =
      item?.ano_lancamento_api && !item?.data_lancamento_confirmada
        ? `year-tbd-${item.ano_lancamento_api}`
        : null;
    const titleKey = monthKey ?? yearOnlyKey;
    if (!titleKey || titleKey === lastTitleMonthKey.current) return;

    lastTitleMonthKey.current = titleKey;
    setCurrentTitle(title);
  }, []);

  const requestScrollToOpenPosition = useCallback(async () => {
    if (emAltaMode) return;
    const list = applyTimelineFilters(mediaItemsRef.current ?? []);
    const index = await resolveOpenPosition();
    setPendingScrollIndex(clampCarouselOpenIndex(list, index));
  }, [emAltaMode, applyTimelineFilters, resolveOpenPosition]);

  const loadEmAlta = useCallback(async () => {
    const key = mediaType === 'filmes' ? `filmes:${emAltaDisponibilidade}` : mediaType;
    if (fetchingEmAltaRef.current || emAltaLoadedKeyRef.current === key) return;
    fetchingEmAltaRef.current = true;
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
    }
  }, [mediaType, emAltaDisponibilidade]);

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

  const getLoopBounds = useCallback(() => {
    if (emAltaMode) {
      const last = Math.max(0, filteredItemsRef.current.length - 1);
      return { start: 0, end: last };
    }
    const snap = emblaApi?.selectedScrollSnap() ?? 0;
    return getMediaCarouselLoopBounds(
      snap,
      filteredItemsRef.current.length,
      displaySlidesRef.current.length,
    );
  }, [emblaApi, emAltaMode]);

  const loopEnabled =
    !hasInitialPositioning &&
    pendingScrollIndex === null &&
    (emAltaMode ? filteredItems.length > 0 : filteredItems.length > 0);

  const infiniteLoopConfig = useMemo(
    () => ({ enabled: loopEnabled, getBounds: getLoopBounds }),
    [loopEnabled, getLoopBounds],
  );

  const handleLoopWrap = useCallback(
    (targetIndex: number) => {
      previousSelectedIndex.current = targetIndex;
      setSelectedSnap(targetIndex);
      const slide = displaySlidesRef.current[targetIndex];
      if (slide?.kind === 'year-tbd-separator') {
        lastTitleMonthKey.current = `year-tbd-${slide.year}`;
        setCurrentTitle(formatYearTbdTitle(slide.year));
        return;
      }
      if (slide?.kind === 'year-tbd-media') {
        const year = slide.item.ano_lancamento_api;
        if (year) {
          lastTitleMonthKey.current = `year-tbd-${year}`;
          setCurrentTitle(formatYearTbdTitle(year));
        }
        return;
      }
      const items = filteredItemsRef.current;
      const datedIndex = resolveDatedIndexForNavigation(slide, items.length);
      updateTitleFromIndex(datedIndex, items);
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

  /** Bootstrap: garante mês atual antes de posicionar; mês anterior só depois do scroll inicial */
  useEffect(() => {
    if (!bootstrapEnabled || bootstrapRanRef.current) return;
    bootstrapRanRef.current = true;

    void (async () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const prev = addMonths(year, month, -1);
      const next = addMonths(year, month, 1);
      const next2 = addMonths(year, month, 2);

      if (ssrBootstrapReady) {
        await Promise.all([
          loadMonth(year, month, 'visible', true),
          loadMonth(next.year, next.month, 'forward', true),
          loadMonth(next2.year, next2.month, 'forward', true),
        ]);
        setHasCompletedInitialLoad(true);
        await requestScrollToOpenPosition();
        void loadMonth(prev.year, prev.month, 'backward', false);
        return;
      }

      await bootstrapInitialMonths();
      setHasCompletedInitialLoad(true);
      await requestScrollToOpenPosition();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootstrapEnabled]);

  /** Solicita posicionamento quando os dados do mês atual ficam prontos */
  useEffect(() => {
    if (!bootstrapEnabled || emAltaMode || !hasInitialPositioningRef.current) return;
    if (!isCarouselBootstrapReady(filteredItems)) return;
    if (pendingScrollIndex !== null) return;
    void requestScrollToOpenPosition();
  }, [
    bootstrapEnabled,
    emAltaMode,
    filteredItems,
    pendingScrollIndex,
    requestScrollToOpenPosition,
  ]);

  /** Prefetch year-tbd do ano atual; demais anos sob demanda ao rolar */
  useEffect(() => {
    if (!bootstrapEnabled || emAltaMode) return;
    void loadYearTbd(new Date().getFullYear());
  }, [bootstrapEnabled, emAltaMode, loadYearTbd]);

  /** Marca posicionamento inicial concluído quando não há itens para exibir */
  useEffect(() => {
    if (!hasCompletedInitialLoad || emAltaMode || filteredItems.length > 0) return;
    hasInitialPositioningRef.current = false;
    setHasInitialPositioning(false);
  }, [hasCompletedInitialLoad, emAltaMode, filteredItems.length]);

  /** Aplica scroll pendente só com slides reais no DOM (nunca sobre skeletons) */
  useEffect(() => {
    if (pendingScrollIndex === null || !emblaApi || emAltaMode) return;
    if (!isCarouselBootstrapReady(filteredItems)) return;

    const targetIndex = clampCarouselOpenIndex(filteredItems, pendingScrollIndex);
    if (targetIndex < 0 || targetIndex >= displaySlides.length) return;

    emblaApi.reInit();

    const applyScroll = () => {
      emblaApi.scrollTo(targetIndex, false);
      previousSelectedIndex.current = targetIndex;
      setSelectedSnap(targetIndex);

      positioningTitleLockedRef.current = true;
      const targetItem = filteredItems[targetIndex];
      const targetMonthKey = monthKeyFromItem(targetItem);
      if (targetMonthKey) {
        lastTitleMonthKey.current = targetMonthKey;
        setCurrentTitle(formatCarouselMonthTitle(new Date(
          parseMonthKey(targetMonthKey).year,
          parseMonthKey(targetMonthKey).month - 1,
          1,
        )));
      } else {
        updateTitleFromIndex(targetIndex, filteredItems);
      }

      const monthKey = monthKeyFromItem(filteredItems[targetIndex]);
      if (monthKey) {
        lastVisibleMonthKeyRef.current = monthKey;
        ensureUpcomingMonthsLoaded(monthKey);
      }

      setPendingScrollIndex(null);
      hasInitialPositioningRef.current = false;
      setHasInitialPositioning(false);

      window.setTimeout(() => {
        positioningTitleLockedRef.current = false;
      }, 400);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(applyScroll);
    });
  }, [
    pendingScrollIndex,
    filteredItems,
    displaySlides.length,
    emblaApi,
    emAltaMode,
    updateTitleFromIndex,
    ensureUpcomingMonthsLoaded,
  ]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      setSelectedSnap(selectedIndex);
      if (emAltaMode) return;
      if (hasInitialPositioningRef.current || pendingScrollIndex !== null) return;

      const slide = displaySlidesRef.current[selectedIndex];
      if (slide?.kind === 'year-tbd-separator') {
        lastTitleMonthKey.current = `year-tbd-${slide.year}`;
        setCurrentTitle(formatYearTbdTitle(slide.year));
        return;
      }
      if (slide?.kind === 'year-tbd-media') {
        const year = slide.item.ano_lancamento_api;
        if (year) {
          lastTitleMonthKey.current = `year-tbd-${year}`;
          setCurrentTitle(formatYearTbdTitle(year));
        }
        return;
      }

      const items = filteredItemsRef.current;
      const datedIndex = resolveDatedIndexForNavigation(slide, items.length);
      previousSelectedIndex.current = selectedIndex;

      if (!positioningTitleLockedRef.current) {
        updateTitleFromIndex(datedIndex, items);
      }

      const monthKey = monthKeyFromItem(items[datedIndex]);
      if (monthKey && monthKey !== lastVisibleMonthKeyRef.current) {
        lastVisibleMonthKeyRef.current = monthKey;
        ensureUpcomingMonthsLoaded(monthKey);
        const { year } = parseMonthKey(monthKey);
        void loadYearTbd(year + 1);
      }

      if (slide?.kind === 'dated') {
        prefetchMonthEdges(slide.datedIndex, items);
        const lastDated = items[items.length - 1];
        const lastDate = lastDated?.data_lancamento_api;
        if (lastDate && slide.datedIndex >= items.length - monthEdgeBuffer) {
          const lastYear = new Date(String(lastDate).slice(0, 10)).getFullYear();
          void loadYearTbd(lastYear);
          void loadYearTbd(lastYear + 1);
        }
      }
    };

    const onSettle = () => {
      if (emAltaMode) return;
      const selectedIndex = emblaApi.selectedScrollSnap();
      const slide = displaySlidesRef.current[selectedIndex];
      if (!slide) return;
      previousSelectedIndex.current = selectedIndex;

      if (slide.kind === 'year-tbd-separator') {
        lastTitleMonthKey.current = `year-tbd-${slide.year}`;
        setCurrentTitle(formatYearTbdTitle(slide.year));
        return;
      }
      if (slide.kind === 'year-tbd-media') {
        const year = slide.item.ano_lancamento_api;
        if (year) {
          lastTitleMonthKey.current = `year-tbd-${year}`;
          setCurrentTitle(formatYearTbdTitle(year));
        }
        return;
      }
      if (slide.kind !== 'dated') return;

      prefetchMonthEdges(slide.datedIndex, filteredItemsRef.current);
      positioningTitleLockedRef.current = false;
      updateTitleFromIndex(slide.datedIndex, filteredItemsRef.current);
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, prefetchMonthEdges, updateTitleFromIndex, emAltaMode, ensureUpcomingMonthsLoaded, loadYearTbd, pendingScrollIndex, monthEdgeBuffer]);

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
      if (hasInitialPositioningRef.current) {
        setPendingScrollIndex(resolveCarouselOpenIndex(filteredItems));
      } else {
        emblaApi.scrollTo(previousSelectedIndex.current + added, true);
      }
    }
  }, [emblaApi, filteredItems, emAltaMode]);

  const yearTbdSlideCount = displaySlides.length - filteredItems.length;
  useEffect(() => {
    if (!emblaApi || emAltaMode || yearTbdSlideCount === 0) return;
    emblaApi.reInit();
  }, [yearTbdSlideCount, emblaApi, emAltaMode]);

  const scrollToToday = useCallback(async () => {
    if (!emblaApi || isNavigating) return;
    setIsNavigating(true);
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const next = addMonths(year, month, 1);
      await Promise.all([
        loadMonth(year, month, 'visible', true),
        loadMonth(next.year, next.month, 'forward', true),
        loadMonth(addMonths(year, month, 2).year, addMonths(year, month, 2).month, 'forward', true),
      ]);
      await requestScrollToOpenPosition();
    } finally {
      setIsNavigating(false);
    }
  }, [emblaApi, isNavigating, loadMonth, requestScrollToOpenPosition]);

  const prevGenreRef = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (!emblaApi || emAltaMode) return;
    if (prevGenreRef.current === undefined) {
      prevGenreRef.current = selectedGenre;
      return;
    }
    if (prevGenreRef.current === selectedGenre) return;
    prevGenreRef.current = selectedGenre;
    void requestScrollToOpenPosition();
  }, [selectedGenre, emblaApi, emAltaMode, requestScrollToOpenPosition]);

  const wasEmAltaMode = useRef(false);
  useEffect(() => {
    if (!emblaApi) return;
    if (!wasEmAltaMode.current || emAltaMode) {
      wasEmAltaMode.current = emAltaMode;
      return;
    }
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
    const slide = displaySlidesRef.current[selectedIndex];
    const datedIndex = resolveDatedIndexForNavigation(slide, items.length);
    const currentItem = items[datedIndex];
    const monthKey = monthKeyFromItem(currentItem);
    if (!monthKey) return;

    const { year, month } = parseMonthKey(monthKey);

    setIsNavigating(true);
    try {
      const candidates = await loadMonthsForNavigation(year, month, direction, EMPTY_MONTH_NAV_LIMIT);
      const list = applyTimelineFilters(mediaItemsRef.current);

      for (let i = 0; i < candidates.length; i++) {
        const target = candidates[i];
        const targetIndex = findIndexForMonth(list, target.year, target.month);
        if (targetIndex !== -1) {
          const targetDate = new Date(target.year, target.month - 1, 1);
          const targetKey = monthKeyFromDate(targetDate);
          lastTitleMonthKey.current = targetKey;
          lastVisibleMonthKeyRef.current = targetKey;
          setCurrentTitle(formatCarouselMonthTitle(targetDate));
          setPendingScrollIndex(targetIndex);
          ensureUpcomingMonthsLoaded(targetKey);
          return;
        }
      }

      const wrapIndex = getCarouselNavWrapIndex(direction, list.length);
      const wrapItem = list[wrapIndex];
      const wrapKey = monthKeyFromItem(wrapItem);
      if (wrapKey) {
        const { year: wy, month: wm } = parseMonthKey(wrapKey);
        lastTitleMonthKey.current = wrapKey;
        lastVisibleMonthKeyRef.current = wrapKey;
        setCurrentTitle(formatCarouselMonthTitle(new Date(wy, wm - 1, 1)));
        setPendingScrollIndex(wrapIndex);
        ensureUpcomingMonthsLoaded(wrapKey);
      }
    } finally {
      setIsNavigating(false);
    }
  };

  const virtualRange = useCarouselVirtualRange(emblaApi, displaySlides.length);
  const bootstrapReady = isCarouselBootstrapReady(filteredItems);
  const showPositioningSkeleton =
    !emAltaMode &&
    !bootstrapReady &&
    (hasInitialPositioning || filteredItems.length === 0);
  const isPositioningOverlay =
    !emAltaMode && hasInitialPositioning && bootstrapReady && filteredItems.length > 0;
  const showAdjacentPrefetchIndicator =
    !emAltaMode && !hasInitialPositioning && !isNavigating && adjacentPrefetchCount > 0;

  const centerHasPoster = useMemo(() => {
    if (showPositioningSkeleton || filteredItems.length === 0) return false;
    const slide = displaySlides[selectedSnap];
    if (!slide || slide.kind === 'year-tbd-separator') return false;
    const item = slide.kind === 'dated' || slide.kind === 'year-tbd-media' ? slide.item : null;
    return Boolean(item?.poster_url_api);
  }, [displaySlides, selectedSnap, showPositioningSkeleton, filteredItems.length]);

  const { isWaitingForCenterPoster, handleCenterPosterLoad } = useCarouselInitialPosterReveal({
    hasInitialPositioning,
    emAltaMode,
    centerHasPoster,
  });

  const resolvedTitle = emAltaMode
    ? 'Em Alta'
    : isNavigating
      ? 'Carregando conteúdo...'
      : showPositioningSkeleton
        ? currentTitle
        : filteredItems.length === 0
          ? hasCompletedInitialLoad
            ? 'Nenhum conteúdo encontrado'
            : 'Carregando...'
          : currentTitle || 'Carregando...';

  const resolvedShortTitle = useMemo(() => {
    if (emAltaMode) return 'Em Alta';
    const key = lastTitleMonthKey.current;
    if (key && /^\d{4}-\d{2}$/.test(key)) {
      const { year, month } = parseMonthKey(key);
      return formatCarouselMonthTitleShort(new Date(year, month - 1, 1));
    }
    if (key?.startsWith('year-tbd-')) {
      const year = Number(key.replace('year-tbd-', ''));
      return Number.isFinite(year) ? `${year} — sem data` : resolvedTitle;
    }
    return resolvedTitle;
  }, [emAltaMode, resolvedTitle, currentTitle]);

  return (
    <div className={`${className ?? ''} overflow-hidden max-w-full`}>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center mb-4 px-2 sm:px-4">
        <CarouselSectionHeading
          title={resolvedTitle}
          shortTitle={resolvedShortTitle}
          onClick={emAltaMode ? () => emblaApi?.scrollTo(0, true) : scrollToToday}
          hint={emAltaMode ? 'Voltar ao início da lista' : 'Ir para o mês atual'}
        >
          {showAdjacentPrefetchIndicator && (
            <span
              className="inline-block h-3.5 w-3.5 rounded-full border-2 border-primary/20 border-t-primary animate-spin"
              aria-hidden
            />
          )}
        </CarouselSectionHeading>
        <div className="flex justify-end items-center w-full md:w-auto gap-2 shrink-0">
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
          className={`overflow-hidden max-w-full py-2 px-1 sm:px-2 cursor-grab active:cursor-grabbing ${isNavigating || isPositioningOverlay ? 'pointer-events-none' : ''}`}
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
              : filteredItems.length === 0
                ? hasCompletedInitialLoad
                  ? (
                      <div className="w-full py-10 text-center text-muted-foreground">
                        Nenhum conteúdo encontrado{selectedGenre ? ` para o gênero "${selectedGenre}"` : ''}.
                      </div>
                    )
                  : Array.from({ length: SKELETON_SLIDE_COUNT }).map((_, index) => (
                      <div key={`loading-skeleton-${index}`} className={SLIDE_CLASS}>
                        <MidiaCardSkeleton />
                      </div>
                    ))
                : displaySlides.map((slide, index) => {
                  const isRendered = index >= virtualRange.start && index <= virtualRange.end;
                  const isPriority = Math.abs(index - selectedSnap) <= 4;
                  if (slide.kind === 'year-tbd-separator') {
                    return (
                      <div key={`year-tbd-sep-${slide.year}`} className={SLIDE_CLASS}>
                        {isRendered ? <YearTbdSeparatorCard year={slide.year} /> : (
                          <div className="w-full max-w-[210px] mx-auto aspect-[206/290] rounded-lg bg-skeleton orbe-shimmer" aria-hidden />
                        )}
                      </div>
                    );
                  }
                  if (slide.kind === 'year-tbd-media') {
                    return (
                      <div key={`year-tbd-${slide.item.id}-${mediaType}`} className={SLIDE_CLASS}>
                        {isRendered ? (
                          <MidiaCard
                            midia={slide.item as Filme | Serie | Anime | Jogo}
                            type={mediaType.slice(0, -1) as TipoMidia}
                            priority={isPriority}
                            isFocused={index === selectedSnap}
                            userInteractions={userInteractions}
                            onInteraction={handleInteraction}
                            onPosterLoad={index === selectedSnap ? handleCenterPosterLoad : undefined}
                          />
                        ) : (
                          <div className="w-full max-w-[210px] mx-auto aspect-[206/290] rounded-lg bg-skeleton orbe-shimmer" aria-hidden />
                        )}
                      </div>
                    );
                  }
                  const item = slide.item;
                  const isCenter = index === selectedSnap;
                  return (
                    <div key={`${item.id}-${mediaType}`} className={SLIDE_CLASS}>
                      {isRendered ? (
                        <MidiaCard
                          midia={item as Filme | Serie | Anime | Jogo}
                          type={mediaType.slice(0, -1) as TipoMidia}
                          priority={isPriority}
                          isFocused={isCenter}
                          userInteractions={userInteractions}
                          onInteraction={handleInteraction}
                          onPosterLoad={isCenter ? handleCenterPosterLoad : undefined}
                        />
                      ) : (
                        <div className="w-full max-w-[210px] mx-auto aspect-[206/290] rounded-lg bg-skeleton orbe-shimmer" aria-hidden />
                      )}
                    </div>
                  );
                })}
          </div>
        </div>
        <CarouselScrollbar emblaApi={emblaApi} />
        <CarouselPosterRevealOverlay visible={isWaitingForCenterPoster || isPositioningOverlay} />
        </div>
      </TooltipProvider>
    </div>
  );
};

export default MediaCarousel;
