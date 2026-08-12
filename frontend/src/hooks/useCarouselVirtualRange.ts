'use client';

import { useEffect, useRef, useState } from 'react';
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
  const rangeRef = useRef(range);

  useEffect(() => {
    if (!emblaApi || itemCount === 0) return;

    const update = () => {
      const selected = emblaApi.selectedScrollSnap();
      const start = Math.max(0, selected - overscan);
      const end = Math.min(itemCount - 1, selected + overscan);
      // Embla dispara 'scroll' continuamente durante o arraste; sem essa checagem,
      // cada tick recria o objeto e re-renderiza o carrossel inteiro mesmo quando
      // a janela de itens renderizados não mudou — é isso que dá a sensação de lag.
      if (rangeRef.current.start === start && rangeRef.current.end === end) return;
      const next = { start, end };
      rangeRef.current = next;
      setRange(next);
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
