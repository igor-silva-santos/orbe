'use client';

import { useCallback, useRef, useState } from 'react';
import { API_BASE } from '@/lib/apiBase';
import type { Midia } from '@/types';

export type YearTbdSlide =
  | { kind: 'year-tbd-separator'; year: number }
  | { kind: 'year-tbd-media'; item: Midia };

interface UseCarouselYearTbdOptions {
  mediaType: 'filmes' | 'series' | 'jogos';
  enabled?: boolean;
}

/**
 * Carrega lançamentos só com ano (TBA) via rota isolada /year-tbd.
 * Não mescla com a timeline mensal — slides separados para append no carrossel.
 */
export function useCarouselYearTbd({ mediaType, enabled = true }: UseCarouselYearTbdOptions) {
  const [slidesByYear, setSlidesByYear] = useState<Record<number, YearTbdSlide[]>>({});
  const loadedYearsRef = useRef(new Set<number>());
  const fetchingYearsRef = useRef(new Set<number>());

  const buildSlides = useCallback((year: number, items: Midia[]): YearTbdSlide[] => {
    if (!items.length) return [];
    return [
      { kind: 'year-tbd-separator', year },
      ...items.map((item) => ({ kind: 'year-tbd-media' as const, item })),
    ];
  }, []);

  const loadYearTbd = useCallback(
    async (year: number): Promise<YearTbdSlide[]> => {
      if (!enabled) return [];
      if (loadedYearsRef.current.has(year) || fetchingYearsRef.current.has(year)) {
        return slidesByYear[year] ?? [];
      }

      fetchingYearsRef.current.add(year);
      try {
        const response = await fetch(`${API_BASE}/${mediaType}/year-tbd?year=${year}`, {
          cache: 'no-store',
        });
        if (!response.ok) {
          loadedYearsRef.current.add(year);
          return [];
        }
        const data: Midia[] = await response.json();
        const slides = Array.isArray(data) ? buildSlides(year, data) : [];
        loadedYearsRef.current.add(year);
        setSlidesByYear((prev) => ({ ...prev, [year]: slides }));
        return slides;
      } catch (error) {
        console.error(`Error fetching year-tbd ${mediaType} for ${year}:`, error);
        loadedYearsRef.current.add(year);
        return [];
      } finally {
        fetchingYearsRef.current.delete(year);
      }
    },
    [buildSlides, enabled, mediaType, slidesByYear],
  );

  const getAppendSlides = useCallback(
    (years: number[]): YearTbdSlide[] =>
      years.flatMap((year) => slidesByYear[year] ?? []),
    [slidesByYear],
  );

  return { slidesByYear, loadYearTbd, getAppendSlides };
}

export function formatYearTbdTitle(year: number): string {
  return `Lançamentos de ${year} — sem data confirmada`;
}

export function isYearTbdMidia(item: Midia | undefined): boolean {
  return Boolean(item?.ano_lancamento_api && !item?.data_lancamento_confirmada);
}
