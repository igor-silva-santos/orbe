'use client';

import { useCallback, useRef, useState, type MutableRefObject, type RefObject } from 'react';
import {
  addMonths,
  findMonthBounds,
  mergeMediaByDate,
  monthKeyFromItem,
  parseMonthKey,
  resolveCarouselOpenIndex,
  calculateCarouselStartIndex,
  calculateLastReleasedIndex,
  isCarouselOpenIndexReady,
} from '@/lib/carousel-utils';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import { API_BASE } from '@/lib/apiBase';
import type { Midia } from '@/types';

export type MonthLoadState = 'idle' | 'loading' | 'loaded' | 'empty';

export type MonthFetchPriority = 'visible' | 'forward' | 'backward';

const PRIORITY_RANK: Record<MonthFetchPriority, number> = {
  visible: 0,
  forward: 1,
  backward: 2,
};

interface QueuedMonthFetch {
  year: number;
  month: number;
  priority: MonthFetchPriority;
  force: boolean;
}

interface UseCarouselMonthLoaderOptions {
  mediaType: 'filmes' | 'series' | 'jogos';
  mediaItemsRef: MutableRefObject<Midia[]> | RefObject<Midia[]>;
  applyDisplayFilters: (items: Midia[]) => Midia[];
  onItemsMerged: (items: Midia[]) => void;
  monthEdgeBuffer?: number;
  /** Itens já vindos do SSR (/homepage) — evita refetch dos mesmos meses no bootstrap */
  initialItems?: Midia[];
}

function monthKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`;
}

export function useCarouselMonthLoader({
  mediaType,
  mediaItemsRef,
  applyDisplayFilters,
  onItemsMerged,
  monthEdgeBuffer = 4,
  initialItems = [],
}: UseCarouselMonthLoaderOptions) {
  const [monthStates, setMonthStates] = useState<Record<string, MonthLoadState>>({});
  const [adjacentPrefetchCount, setAdjacentPrefetchCount] = useState(0);

  const loadedMonthsRef = useRef(new Set<string>());
  const fetchingMonthsRef = useRef(new Set<string>());
  const fetchQueueRef = useRef<QueuedMonthFetch[]>([]);
  const queueProcessingRef = useRef(false);
  const initialBootstrapDoneRef = useRef(false);

  // Marca meses do SSR como já carregados para não disparar by-month redundante no mount
  const initialMonthsSeededRef = useRef(false);
  if (!initialMonthsSeededRef.current && initialItems.length > 0) {
    initialMonthsSeededRef.current = true;
    for (const item of initialItems) {
      const key = monthKeyFromItem(item);
      if (key) {
        loadedMonthsRef.current.add(key);
      }
    }
  }

  const setMonthState = useCallback((key: string, state: MonthLoadState) => {
    setMonthStates((prev) => (prev[key] === state ? prev : { ...prev, [key]: state }));
  }, []);

  const mergeItems = useCallback(
    (incoming: Midia[]): Midia[] => {
      if (!incoming.length) return mediaItemsRef.current ?? [];
      const merged = mergeMediaByDate(mediaItemsRef.current ?? [], incoming);
      // Atualiza o ref antes do paint do React — evita perder meses quando
      // bootstrap/navegação busca vários meses em paralelo (Promise.all).
      (mediaItemsRef as MutableRefObject<Midia[]>).current = merged;
      onItemsMerged(merged);
      return merged;
    },
    [mediaItemsRef, onItemsMerged],
  );

  const fetchMonthData = useCallback(
    async (year: number, month: number, force = false): Promise<Midia[] | null> => {
      const key = monthKey(year, month);
      if (!force && (fetchingMonthsRef.current.has(key) || loadedMonthsRef.current.has(key))) {
        return null;
      }

      fetchingMonthsRef.current.add(key);
      setMonthState(key, 'loading');

      try {
        const response = await fetchWithTimeout(
          `${API_BASE}/${mediaType}/by-month?year=${year}&month=${month}`,
          { cache: 'no-store' },
        );
        if (!response.ok) {
          console.error(`Error fetching ${mediaType} for ${key}: HTTP ${response.status}`);
          setMonthState(key, 'empty');
          loadedMonthsRef.current.add(key);
          return null;
        }

        const data: Midia[] = await response.json();
        if (!Array.isArray(data)) {
          console.error(`Invalid response for ${mediaType} ${key}`);
          setMonthState(key, 'empty');
          loadedMonthsRef.current.add(key);
          return null;
        }

        loadedMonthsRef.current.add(key);
        setMonthState(key, data.length ? 'loaded' : 'empty');
        return data;
      } catch (error) {
        console.error(`Error fetching ${mediaType} for ${key}:`, error);
        setMonthState(key, 'empty');
        loadedMonthsRef.current.add(key);
        return null;
      } finally {
        fetchingMonthsRef.current.delete(key);
      }
    },
    [mediaType, setMonthState],
  );

  const processFetchQueue = useCallback(async () => {
    if (queueProcessingRef.current) return;
    queueProcessingRef.current = true;

    try {
      while (fetchQueueRef.current.length > 0) {
        fetchQueueRef.current.sort(
          (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority],
        );
        const next = fetchQueueRef.current.shift();
        if (!next) break;

        const key = monthKey(next.year, next.month);
        if (!next.force && (loadedMonthsRef.current.has(key) || fetchingMonthsRef.current.has(key))) {
          continue;
        }

        setAdjacentPrefetchCount((count) => count + 1);
        try {
          const data = await fetchMonthData(next.year, next.month, next.force);
          if (data?.length) {
            mergeItems(data);
          }
        } finally {
          setAdjacentPrefetchCount((count) => Math.max(0, count - 1));
        }
      }
    } finally {
      queueProcessingRef.current = false;
      if (fetchQueueRef.current.length > 0) {
        void processFetchQueue();
      }
    }
  }, [fetchMonthData, mergeItems]);

  const enqueueMonthFetch = useCallback(
    (year: number, month: number, priority: MonthFetchPriority, force = false) => {
      const key = monthKey(year, month);
      if (!force && (loadedMonthsRef.current.has(key) || fetchingMonthsRef.current.has(key))) {
        return;
      }

      const exists = fetchQueueRef.current.some(
        (item) => item.year === year && item.month === month && item.force === force,
      );
      if (!exists) {
        fetchQueueRef.current.push({ year, month, priority, force });
      }
      void processFetchQueue();
    },
    [processFetchQueue],
  );

  const loadMonth = useCallback(
    async (
      year: number,
      month: number,
      priority: MonthFetchPriority = 'forward',
      force = false,
    ): Promise<Midia[]> => {
      const data = await fetchMonthData(year, month, force);
      if (!data?.length) return mediaItemsRef.current ?? [];
      return mergeItems(data);
    },
    [fetchMonthData, mergeItems, mediaItemsRef],
  );

  const ensureMonthLoaded = useCallback(
    (year: number, month: number, priority: MonthFetchPriority, force = false) => {
      enqueueMonthFetch(year, month, priority, force);
    },
    [enqueueMonthFetch],
  );

  /** Ao entrar num mês visível, garante M+1 e M+2 */
  const ensureUpcomingMonthsLoaded = useCallback(
    (visibleMonthKey: string) => {
      const { year, month } = parseMonthKey(visibleMonthKey);
      const next = addMonths(year, month, 1);
      const next2 = addMonths(year, month, 2);
      ensureMonthLoaded(next.year, next.month, 'forward');
      ensureMonthLoaded(next2.year, next2.month, 'forward');
    },
    [ensureMonthLoaded],
  );

  const prefetchMonthEdges = useCallback(
    (selectedIndex: number, items: Midia[]) => {
      const selectedItem = items[selectedIndex];
      const visibleMonthKey = monthKeyFromItem(selectedItem);
      if (!visibleMonthKey) return;

      ensureMonthLoaded(
        parseMonthKey(visibleMonthKey).year,
        parseMonthKey(visibleMonthKey).month,
        'visible',
      );

      const bounds = findMonthBounds(items, visibleMonthKey);
      if (!bounds) return;

      const { year, month } = parseMonthKey(visibleMonthKey);

      if (selectedIndex >= bounds.end - monthEdgeBuffer) {
        const next = addMonths(year, month, 1);
        ensureMonthLoaded(next.year, next.month, 'forward');
        const next2 = addMonths(year, month, 2);
        ensureMonthLoaded(next2.year, next2.month, 'forward');
      }

      if (selectedIndex <= bounds.start + monthEdgeBuffer) {
        const prev = addMonths(year, month, -1);
        ensureMonthLoaded(prev.year, prev.month, 'backward');
      }
    },
    [ensureMonthLoaded, monthEdgeBuffer],
  );

  const computeOpenIndex = useCallback(
    (items?: Midia[]) => resolveCarouselOpenIndex(applyDisplayFilters(items ?? mediaItemsRef.current ?? [])),
    [applyDisplayFilters, mediaItemsRef],
  );

  const resolveOpenPosition = useCallback(async (): Promise<number> => {
    let { year, month } = { year: new Date().getFullYear(), month: new Date().getMonth() + 1 };

    await loadMonth(year, month, 'visible');

    let list = applyDisplayFilters(mediaItemsRef.current ?? []);
    const nextIdx = calculateCarouselStartIndex(list);
    if (nextIdx >= 0 && isCarouselOpenIndexReady(list, nextIdx)) {
      return nextIdx;
    }

    for (let attempt = 0; attempt < 6; attempt++) {
      ({ year, month } = addMonths(year, month, 1));
      await loadMonth(year, month, 'forward');
      list = applyDisplayFilters(mediaItemsRef.current ?? []);
      const upcoming = calculateCarouselStartIndex(list);
      if (upcoming >= 0) return upcoming;
    }

    const lastReleased = calculateLastReleasedIndex(list);
    if (lastReleased >= 0) return lastReleased;
    return computeOpenIndex();
  }, [applyDisplayFilters, computeOpenIndex, loadMonth, mediaItemsRef]);

  /** Bootstrap: mês atual + adjacentes; também pré-carrega passado recente para scroll */
  const bootstrapInitialMonths = useCallback(async (): Promise<number> => {
    if (initialBootstrapDoneRef.current) {
      return resolveOpenPosition();
    }
    initialBootstrapDoneRef.current = true;

    // Dados do SSR já cobrem a posição de abertura — evita 3× by-month por carrossel no mount
    const seeded = applyDisplayFilters(mediaItemsRef.current ?? []);
    if (seeded.length > 0) {
      const openIdx = resolveCarouselOpenIndex(seeded);
      if (openIdx >= 0 && isCarouselOpenIndexReady(seeded, openIdx)) {
        return openIdx;
      }
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const next = addMonths(year, month, 1);
    const next2 = addMonths(year, month, 2);

    // Não carrega o mês anterior antes de abrir — senão o índice 0 vira agosto/julho
    // e um scroll pendente velho mostra o começo da timeline em vez do próximo lançamento.
    // Sequencial em vez de paralelo para não saturar a API free no cold start.
    await loadMonth(year, month, 'visible', true);
    await loadMonth(next.year, next.month, 'forward', true);
    await loadMonth(next2.year, next2.month, 'forward', true);

    return resolveOpenPosition();
  }, [applyDisplayFilters, loadMonth, mediaItemsRef, resolveOpenPosition]);

  const loadMonthsForNavigation = useCallback(
    async (year: number, month: number, direction: 'next' | 'prev', limit: number) => {
      const step = direction === 'next' ? 1 : -1;
      const candidates = Array.from({ length: limit }, (_, i) => addMonths(year, month, (i + 1) * step));
      await Promise.all(
        candidates.map((target) => loadMonth(target.year, target.month, 'visible', true)),
      );
      return candidates;
    },
    [loadMonth],
  );

  const isMonthLoaded = useCallback((key: string) => loadedMonthsRef.current.has(key), []);

  return {
    monthStates,
    adjacentPrefetchCount,
    isMonthLoaded,
    bootstrapInitialMonths,
    resolveOpenPosition,
    ensureUpcomingMonthsLoaded,
    prefetchMonthEdges,
    loadMonth,
    loadMonthsForNavigation,
    ensureMonthLoaded,
    mergeItems,
  };
}
