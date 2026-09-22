'use client';

import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { CAROUSEL_VIEWPORT_TOUCH_ACTION } from '@/lib/carousel-touch';
import { useCtrlWheelCarousel } from '@/hooks/useCtrlWheelCarousel';
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
import { useFanCarouselSlides } from '@/hooks/useFanCarouselSlides';
import {
  addMonths,
  findIndexForMonth,
  formatCarouselMonthTitle,
  filterMidiaForCarouselTimeline,
  monthKeyFromDate,
  monthKeyFromItem,
  monthTitleFromItem,
  parseMonthKey,
  resolveCarouselOpenMonthKey,
  resolveCarouselOpenIndex,
  isCarouselOpenIndexReady,
  currentMonthCarouselTitle,
  getCarouselAppendYears,
  indexOfYearTbdSeparator,
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
  /** Quando false, adia fetch de meses até a seção ficar visível (home). */
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
  initialData = [],
  className,
  bootstrapEnabled = true,
}) => {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const fastScrollEnabled = useAppStore((s) => s.fastScrollEnabled);
  const toggleFastScroll = useAppStore((s) => s.toggleFastScroll);
  const seededItems = useMemo(() => filterMidiaForCarouselTimeline(initialData), [initialData]);
  const [mediaItems, setMediaItems] = useState<Midia[]>(seededItems);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(
    monthTitleFromItem(seededItems[seededItems.length ? resolveCarouselOpenIndex(seededItems) : -1]) ?? currentMonthCarouselTitle(),
  );
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasCompletedInitialLoad, setHasCompletedInitialLoad] = useState(seededItems.length > 0);
  const [hasInitialPositioning, setHasInitialPositioning] = useState(true);
  const [pendingScrollIndex, setPendingScrollIndex] = useState<number | null>(null);
  const [pendingOpenPosition, setPendingOpenPosition] = useState(true);
  const [emAltaMode, setEmAltaMode] = useState(false);
  const [emAltaItems, setEmAltaItems] = useState<Midia[]>([]);
  const [emAltaDisponibilidade, setEmAltaDisponibilidade] = useState<FilmeDisponibilidade>('ambos');

  const emAltaLoadedKeyRef = useRef<string | null>(null);
  const fetchingEmAltaRef = useRef(false);
  const lastVisibleMonthKeyRef = useRef<string>('');

  const previousSelectedIndex = useRef<number>(0);
  const firstItemIdRef = useRef<number | undefined>(seededItems[0]?.id);
  const itemsLengthRef = useRef(seededItems.length);
  const mediaItemsRef = useRef(seededItems);
  const lastTitleMonthKey = useRef<string>('');
  const hasInitialPositioningRef = useRef(true);

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

  const applyDisplayFilters = useCallback(
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
    applyDisplayFilters,
    onItemsMerged: setMediaItems,
    monthEdgeBuffer,
    initialItems: seededItems,
  });

  const { loadYearTbd, getAppendSlides, slidesByYear } = useCarouselYearTbd({ mediaType });

  const activeSourceItems = emAltaMode ? emAltaItems : mediaItems;

  const genres = useMemo(
    () => Array.from(new Set(activeSourceItems.flatMap((item) => item.generos_api || []))).filter(Boolean),
    [activeSourceItems]
  );

  const filteredItems = useMemo(
    () => applyDisplayFilters(activeSourceItems),
    [activeSourceItems, applyDisplayFilters]
  );

  const displaySlides = useMemo((): DisplaySlide[] => {
    if (emAltaMode) {
      return filteredItems.map((item, datedIndex) => ({ kind: 'dated', item, datedIndex }));
    }
    const dated: DisplaySlide[] = filteredItems.map((item, datedIndex) => ({
      kind: 'dated',
      item,
      datedIndex,
    }));
    return [...dated, ...getAppendSlides(getCarouselAppendYears())];
  }, [emAltaMode, filteredItems, getAppendSlides, slidesByYear]);

  const filteredItemsRef = useRef(filteredItems);
  const displaySlidesRef = useRef(displaySlides);
  useEffect(() => {
    filteredItemsRef.current = filteredItems;
  }, [filteredItems]);
  useEffect(() => {
    displaySlidesRef.current = displaySlides;
  }, [displaySlides]);

  const updateTitleFromIndex = useCallback((index: number, items: Midia[]) => {
    const item = items[index];
    const title = monthTitleFromItem(item);
    if (!title || !item?.data_lancamento_api) return;

    const monthKey = monthKeyFromItem(item);
    if (!monthKey || monthKey === lastTitleMonthKey.current) return;

    lastTitleMonthKey.current = monthKey;
    setCurrentTitle(title);
  }, []);

  const requestScrollToOpenPosition = useCallback(async () => {
    if (emAltaMode) return;
    const list = applyDisplayFilters(mediaItemsRef.current ?? []);
    const targetMonthKey = resolveCarouselOpenMonthKey(list);
    const { year, month } = parseMonthKey(targetMonthKey);
    lastTitleMonthKey.current = targetMonthKey;
    setCurrentTitle(formatCarouselMonthTitle(new Date(year, month - 1, 1)));

    await resolveOpenPosition();
    setPendingOpenPosition(true);
  }, [emAltaMode, applyDisplayFilters, resolveOpenPosition]);

  const loadEmAlta = useCallback(async () => {
    const key = mediaType === 'filmes' ? `filmes:${emAltaDisponibilidade}` : mediaType;
    if (fetchingEmAltaRef.current || emAltaLoadedKeyRef.current === key) return;
    fetchingEmAltaRef.current = true;
    try {
      const url =
        mediaType === 'filmes'
          ? `${API_BASE}/filmes/mais-esperados?limit=40`
          : `${API_BASE}/trending?type=${mediaType === 'series' ? 'series' : mediaType}&limit=40`;
      const response = await fetch(url);
      const data = await response.json();
      const items = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
      setEmAltaItems(items);
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

  useFanCarouselSlides(emblaApi);
  useCtrlWheelCarousel(emblaApi, viewportRef, fastScrollEnabled);

  /** Mantém skeletons centralizados no viewport (align:center) até o scroll real */
  useEffect(() => {
    if (!emblaApi || emAltaMode || !hasInitialPositioningRef.current) return;
    if (filteredItems.length > 0) return;
    emblaApi.reInit();
    emblaApi.scrollTo(SKELETON_CENTER_INDEX, false);
  }, [emblaApi, emAltaMode, hasInitialPositioning, filteredItems.length]);

  /** Bootstrap: mês atual + próximo em paralelo, depois reposiciona */
  useEffect(() => {
    if (!bootstrapEnabled) return;
    void (async () => {
      await bootstrapInitialMonths();
      setHasCompletedInitialLoad(true);
      await requestScrollToOpenPosition();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootstrapEnabled]);

  /** Prefetch só do ano corrente no mount — demais anos carregam ao rolar (onSelect) */
  useEffect(() => {
    if (emAltaMode) return;
    for (const y of getCarouselAppendYears()) {
      void loadYearTbd(y);
    }
  }, [emAltaMode, loadYearTbd]);

  /** Marca posicionamento inicial concluído quando não há itens para exibir */
  useEffect(() => {
    if (!hasCompletedInitialLoad || emAltaMode || filteredItems.length > 0) return;
    hasInitialPositioningRef.current = false;
    setHasInitialPositioning(false);
  }, [hasCompletedInitialLoad, emAltaMode, filteredItems.length]);

  /** Aplica scroll no próximo lançamento (recalculado na lista atual, não num índice velho) */
  useEffect(() => {
    if (!emblaApi || emAltaMode) return;

    let target: number | null = null;
    if (pendingScrollIndex !== null) {
      if (pendingScrollIndex >= filteredItems.length) return;
      target = pendingScrollIndex;
    } else if (pendingOpenPosition) {
      if (filteredItems.length === 0) return;
      const openIndex = resolveCarouselOpenIndex(filteredItems);
      if (!isCarouselOpenIndexReady(filteredItems, openIndex)) return;
      target = openIndex;
    } else {
      return;
    }

    emblaApi.reInit();

    const scrollTarget = target;
    let cancelled = false;
    const applyScroll = () => {
      if (cancelled) return;
      emblaApi.scrollTo(scrollTarget, false);
      previousSelectedIndex.current = scrollTarget;
      setSelectedSnap(scrollTarget);
      updateTitleFromIndex(scrollTarget, filteredItems);

      const monthKey = monthKeyFromItem(filteredItems[scrollTarget]);
      if (monthKey) {
        lastVisibleMonthKeyRef.current = monthKey;
        ensureUpcomingMonthsLoaded(monthKey);
        const { year, month } = parseMonthKey(monthKey);
        const prev = addMonths(year, month, -1);
        void loadMonth(prev.year, prev.month, 'backward');
      }

      setPendingScrollIndex(null);
      setPendingOpenPosition(false);
      hasInitialPositioningRef.current = false;
      setHasInitialPositioning(false);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(applyScroll);
    });
    return () => {
      cancelled = true;
    };
  }, [
    pendingScrollIndex,
    pendingOpenPosition,
    filteredItems,
    emblaApi,
    emAltaMode,
    updateTitleFromIndex,
    ensureUpcomingMonthsLoaded,
    loadMonth,
  ]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      setSelectedSnap(selectedIndex);
      if (emAltaMode) return;
      if (hasInitialPositioningRef.current || pendingScrollIndex !== null || pendingOpenPosition) return;

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
      const datedIndex = slide?.kind === 'dated' ? slide.datedIndex : selectedIndex;
      previousSelectedIndex.current = selectedIndex;
      updateTitleFromIndex(datedIndex, items);

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
      if (slide?.kind !== 'dated') return;
      previousSelectedIndex.current = selectedIndex;
      prefetchMonthEdges(slide.datedIndex, filteredItemsRef.current);
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, prefetchMonthEdges, updateTitleFromIndex, emAltaMode, ensureUpcomingMonthsLoaded, loadYearTbd, pendingScrollIndex, pendingOpenPosition, monthEdgeBuffer]);

  useEffect(() => {
    if (!emblaApi || emAltaMode || pendingScrollIndex !== null || pendingOpenPosition) return;

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
  }, [emblaApi, filteredItems, emAltaMode, pendingScrollIndex, pendingOpenPosition]);

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
    const datedIndex = slide?.kind === 'dated' ? slide.datedIndex : selectedIndex;
    const currentItem = items[datedIndex];
    const monthKey = monthKeyFromItem(currentItem);
    if (!monthKey) return;

    const { year, month } = parseMonthKey(monthKey);

    setIsNavigating(true);
    try {
      const candidates = await loadMonthsForNavigation(year, month, direction, EMPTY_MONTH_NAV_LIMIT);
      const list = applyDisplayFilters(mediaItemsRef.current);

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

      const lastTarget = candidates[candidates.length - 1];
      const tbdSlides = await loadYearTbd(lastTarget.year);
      const listAfter = applyDisplayFilters(mediaItemsRef.current);
      const sepIndex = indexOfYearTbdSeparator(
        lastTarget.year,
        listAfter.length,
        { ...slidesByYear, [lastTarget.year]: tbdSlides },
      );
      if (sepIndex >= 0) {
        lastTitleMonthKey.current = `year-tbd-${lastTarget.year}`;
        lastVisibleMonthKeyRef.current = lastTitleMonthKey.current;
        setCurrentTitle(formatYearTbdTitle(lastTarget.year));
        setPendingScrollIndex(sepIndex);
        return;
      }
      setCurrentTitle(formatCarouselMonthTitle(new Date(lastTarget.year, lastTarget.month - 1, 1)));
    } finally {
      setIsNavigating(false);
    }
  };

  const virtualRange = useCarouselVirtualRange(emblaApi, displaySlides.length);
  const showPositioningSkeleton = !emAltaMode && hasInitialPositioning && filteredItems.length === 0;
  const showAdjacentPrefetchIndicator =
    !emAltaMode && !hasInitialPositioning && !isNavigating && adjacentPrefetchCount > 0;

  return (
    <div className={`${className ?? ''} overflow-hidden max-w-full`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 px-2 sm:px-4">
        <h3
          className="text-xl font-bold h-8 cursor-pointer font-display orbe-text-primary hover:text-primary transition-colors flex items-center gap-2"
          onClick={emAltaMode ? undefined : scrollToToday}
          title={emAltaMode ? undefined : 'Ir para o mês atual'}
        >
          {emAltaMode
            ? 'Em alta'
            : isNavigating
              ? 'Carregando conteúdo...'
              : showPositioningSkeleton
                ? currentTitle
                : filteredItems.length === 0
                  ? hasCompletedInitialLoad
                    ? 'Nenhum conteúdo encontrado'
                    : 'Carregando...'
                  : currentTitle || 'Carregando...'}
          {showAdjacentPrefetchIndicator && (
            <span
              className="inline-block h-3.5 w-3.5 rounded-full border-2 border-primary/20 border-t-primary animate-spin"
              aria-hidden
            />
          )}
        </h3>
        <div className="flex justify-end items-center w-full md:w-auto mt-2 md:mt-0 gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleEmAlta}
              className={`${CONTROL_BTN} ${emAltaMode ? 'bg-primary text-primary-foreground border-primary' : ''}`}
              title={emAltaMode ? 'Ver por data de lançamento' : 'Ver o que está em alta agora'}
              aria-label={emAltaMode ? 'Ver por data de lançamento' : 'Ver o que está em alta agora'}
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
          {(isNavigating || (!emAltaMode && hasInitialPositioning && filteredItems.length > 0)) && (
            <LoadingOverlay message="Carregando novos títulos..." className="rounded-lg" />
          )}
        <div
          className={`overflow-hidden max-w-full py-2 px-1 sm:px-2 select-none ${isNavigating ? 'pointer-events-none' : ''}`}
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
                            userInteractions={userInteractions}
                            onInteraction={handleInteraction}
                          />
                        ) : (
                          <div className="w-full max-w-[210px] mx-auto aspect-[206/290] rounded-lg bg-skeleton orbe-shimmer" aria-hidden />
                        )}
                      </div>
                    );
                  }
                  const item = slide.item;
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
