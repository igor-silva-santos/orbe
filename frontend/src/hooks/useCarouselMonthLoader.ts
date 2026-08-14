'use client';

import { useCallback, useRef, useState, type MutableRefObject, type RefObject } from 'react';
import {
  addMonths,
  findMonthBounds,
  isCarouselOpenIndexReady,
  mergeMediaByDate,
  monthKeyFromDate,
  monthKeyFromItem,
  parseMonthKey,
  resolveCarouselOpenIndex,
  resolveCarouselOpenMonthKey,
  resolveIndexForMonthKey,
} from '@/lib/carousel-utils';
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
}: UseCarouselMonthLoaderOptions) {
  const [monthStates, setMonthStates] = useState<Record<string, MonthLoadState>>({});
  const [adjacentPrefetchCount, setAdjacentPrefetchCount] = useState(0);

  const loadedMonthsRef = useRef(new Set<string>());
  const fetchingMonthsRef = useRef(new Set<string>());
  const fetchQueueRef = useRef<QueuedMonthFetch[]>([]);
  const queueProcessingRef = useRef(false);
  const initialBootstrapDoneRef = useRef(false);

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
        const response = await fetch(
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let { year, month } = { year: today.getFullYear(), month: today.getMonth() + 1 };
    let index = computeOpenIndex();
    const list = applyDisplayFilters(mediaItemsRef.current ?? []);

    if (isCarouselOpenIndexReady(list, index)) {
      return index;
    }

    const targetMonthKey = resolveCarouselOpenMonthKey(list);

    for (let attempt = 0; attempt < 12; attempt++) {
      await loadMonth(year, month, 'visible', true);
      const updated = applyDisplayFilters(mediaItemsRef.current ?? []);
      index = resolveIndexForMonthKey(updated, targetMonthKey);
      if (index >= 0 && isCarouselOpenIndexReady(updated, index)) {
        return index;
      }
      if (index >= 0 && monthKeyFromItem(updated[index]) === targetMonthKey) {
        return index;
      }
      ({ year, month } = addMonths(year, month, 1));
    }

    return computeOpenIndex();
  }, [applyDisplayFilters, computeOpenIndex, loadMonth, mediaItemsRef]);

  /** Bootstrap: mês atual + próximo em paralelo, depois reposiciona */
  const bootstrapInitialMonths = useCallback(async (): Promise<number> => {
    if (initialBootstrapDoneRef.current) {
      return resolveOpenPosition();
    }
    initialBootstrapDoneRef.current = true;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const next = addMonths(year, month, 1);

    await Promise.all([
      loadMonth(year, month, 'visible', true),
      loadMonth(next.year, next.month, 'forward', true),
    ]);

    return resolveOpenPosition();
  }, [loadMonth, resolveOpenPosition]);

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
