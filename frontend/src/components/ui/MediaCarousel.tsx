'use client';

import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { CAROUSEL_VIEWPORT_TOUCH_ACTION } from '@/lib/carousel-touch';
import { useCtrlWheelCarousel } from '@/hooks/useCtrlWheelCarousel';
import { useCarouselVirtualRange } from '@/hooks/useCarouselVirtualRange';
import { useCarouselMonthLoader } from '@/hooks/useCarouselMonthLoader';
import { ChevronLeft, ChevronRight, Filter, Zap, TrendingUp, Clapperboard, Tv, Blend } from 'lucide-react';
import { useOrbeCarousel, FAST_CAROUSEL_DURATION } from '@/hooks/useOrbeCarousel';
import { useFanCarouselSlides } from '@/hooks/useFanCarouselSlides';
import {
  addMonths,
  findIndexForMonth,
  formatCarouselMonthTitle,
  monthKeyFromDate,
  monthKeyFromItem,
  monthTitleFromItem,
  parseMonthKey,
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
}

const SLIDE_CLASS = 'relative flex-[0_0_170px] sm:flex-[0_0_190px] md:flex-[0_0_210px] min-w-0 pl-3 sm:pl-4 carousel-slide';
const CONTROL_BTN = 'p-2 rounded-lg border border-border bg-card orbe-text-primary hover:bg-muted transition-colors';
/** Quantos slides antes da borda do mês disparam prefetch extra ao rolar rápido */
const MONTH_EDGE_BUFFER = 4;
const EMPTY_MONTH_NAV_LIMIT = 8;

type FilmeDisponibilidade = 'cinema' | 'streaming' | 'ambos';

const MediaCarousel: React.FC<MediaCarouselProps> = ({ mediaType, initialData, startIndex, className }) => {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const fastScrollEnabled = useAppStore((s) => s.fastScrollEnabled);
  const toggleFastScroll = useAppStore((s) => s.toggleFastScroll);
  const [mediaItems, setMediaItems] = useState<Midia[]>(initialData);
  const [selectedSnap, setSelectedSnap] = useState(startIndex);
  const [currentTitle, setCurrentTitle] = useState('');
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

  const previousSelectedIndex = useRef<number>(startIndex);
  const firstItemIdRef = useRef<number | undefined>(initialData[0]?.id);
  const itemsLengthRef = useRef(initialData.length);
  const mediaItemsRef = useRef(mediaItems);
  const lastTitleMonthKey = useRef<string>('');
  const hasInitialPositioningRef = useRef(true);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [emblaRef, emblaApi] = useOrbeCarousel({
    startIndex,
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
    (items: Midia[]): Midia[] =>
      selectedGenre ? items.filter((item) => item.generos_api?.includes(selectedGenre)) : items,
    [selectedGenre]
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
  });

  const activeSourceItems = emAltaMode ? emAltaItems : mediaItems;

  const genres = useMemo(
    () => Array.from(new Set(activeSourceItems.flatMap((item) => item.generos_api || []))).filter(Boolean),
    [activeSourceItems]
  );

  const filteredItems = useMemo(
    () => applyDisplayFilters(activeSourceItems),
    [activeSourceItems, applyDisplayFilters]
  );

  const filteredItemsRef = useRef(filteredItems);
  useEffect(() => {
    filteredItemsRef.current = filteredItems;
  }, [filteredItems]);

  useEffect(() => {
    mediaItemsRef.current = mediaItems;
  }, [mediaItems]);

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
    const index = await resolveOpenPosition();
    lastTitleMonthKey.current = '';
    setPendingScrollIndex(index);
  }, [emAltaMode, resolveOpenPosition]);

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

  useFanCarouselSlides(emblaApi);
  useCtrlWheelCarousel(emblaApi, viewportRef, fastScrollEnabled);

  /** Bootstrap: mês atual + próximo em paralelo, depois reposiciona */
  useEffect(() => {
    void (async () => {
      await bootstrapInitialMonths();
      setHasCompletedInitialLoad(true);
      await requestScrollToOpenPosition();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Marca posicionamento inicial concluído quando não há itens para exibir */
  useEffect(() => {
    if (!hasCompletedInitialLoad || emAltaMode || filteredItems.length > 0) return;
    hasInitialPositioningRef.current = false;
    setHasInitialPositioning(false);
  }, [hasCompletedInitialLoad, emAltaMode, filteredItems.length]);

  /** Aplica scroll pendente só depois que o React renderizou os novos slides */
  useEffect(() => {
    if (pendingScrollIndex === null || !emblaApi || emAltaMode) return;
    if (pendingScrollIndex >= filteredItems.length) {
      setPendingScrollIndex(null);
      hasInitialPositioningRef.current = false;
      setHasInitialPositioning(false);
      return;
    }

    emblaApi.reInit();
    emblaApi.scrollTo(pendingScrollIndex, false);
    previousSelectedIndex.current = pendingScrollIndex;
    setSelectedSnap(pendingScrollIndex);
    updateTitleFromIndex(pendingScrollIndex, filteredItems);

    const monthKey = monthKeyFromItem(filteredItems[pendingScrollIndex]);
    if (monthKey) {
      lastVisibleMonthKeyRef.current = monthKey;
      ensureUpcomingMonthsLoaded(monthKey);
    }

    setPendingScrollIndex(null);
    hasInitialPositioningRef.current = false;
    setHasInitialPositioning(false);
  }, [pendingScrollIndex, filteredItems, emblaApi, emAltaMode, updateTitleFromIndex, ensureUpcomingMonthsLoaded]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      setSelectedSnap(selectedIndex);
      if (emAltaMode) return;
      if (hasInitialPositioningRef.current) return;

      const items = filteredItemsRef.current;
      previousSelectedIndex.current = selectedIndex;
      updateTitleFromIndex(selectedIndex, items);

      const monthKey = monthKeyFromItem(items[selectedIndex]);
      if (monthKey && monthKey !== lastVisibleMonthKeyRef.current) {
        lastVisibleMonthKeyRef.current = monthKey;
        ensureUpcomingMonthsLoaded(monthKey);
      }

      prefetchMonthEdges(selectedIndex, items);
    };

    const onSettle = () => {
      if (emAltaMode) return;
      const items = filteredItemsRef.current;
      const selectedIndex = emblaApi.selectedScrollSnap();
      previousSelectedIndex.current = selectedIndex;
      prefetchMonthEdges(selectedIndex, items);
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, prefetchMonthEdges, updateTitleFromIndex, emAltaMode, ensureUpcomingMonthsLoaded]);

  useEffect(() => {
    if (!emblaApi || emAltaMode || pendingScrollIndex !== null) return;

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
  }, [emblaApi, filteredItems, emAltaMode, pendingScrollIndex]);

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
    const currentItem = items[selectedIndex];
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
      setCurrentTitle(formatCarouselMonthTitle(new Date(lastTarget.year, lastTarget.month - 1, 1)));
    } finally {
      setIsNavigating(false);
    }
  };

  const virtualRange = useCarouselVirtualRange(emblaApi, filteredItems.length);
  const showPositioningSkeleton = !emAltaMode && hasInitialPositioning;
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
            ? 'Em Alta'
            : isNavigating
              ? 'Carregando conteúdo...'
              : showPositioningSkeleton
                ? 'Carregando...'
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
          className={`overflow-hidden max-w-full py-2 px-1 sm:px-2 ${isNavigating ? 'pointer-events-none' : ''}`}
          ref={setViewportRef}
          style={{ touchAction: CAROUSEL_VIEWPORT_TOUCH_ACTION }}
        >
          <div className="flex">
            {showPositioningSkeleton
              ? Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className={SLIDE_CLASS}>
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
