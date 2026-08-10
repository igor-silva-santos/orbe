'use client';

import { useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

const DEFAULT_OVERSCAN = 12;

/**
 * Renderiza apenas slides próximos ao viewport — reduz DOM e trabalho de layout em listas grandes.
 */
export function useCarouselVirtualRange(
  emblaApi: EmblaCarouselType | undefined,
  itemCount: number,
  overscan = DEFAULT_OVERSCAN
) {
  const [range, setRange] = useState({
    start: 0,
    end: Math.min(itemCount - 1, overscan * 2),
  });

  useEffect(() => {
    if (!emblaApi || itemCount === 0) return;

    const update = () => {
      const selected = emblaApi.selectedScrollSnap();
      setRange({
        start: Math.max(0, selected - overscan),
        end: Math.min(itemCount - 1, selected + overscan),
      });
    };

    emblaApi.on('scroll', update);
    emblaApi.on('select', update);
    emblaApi.on('reInit', update);
    update();

    return () => {
      emblaApi.off('scroll', update);
      emblaApi.off('select', update);
      emblaApi.off('reInit', update);
    };
  }, [emblaApi, itemCount, overscan]);

  return range;
}
