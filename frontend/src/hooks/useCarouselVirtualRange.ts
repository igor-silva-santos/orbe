'use client';

import { useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

const DEFAULT_OVERSCAN = 12;
const LOOP_EDGE_PAD = 2;

function addRange(target: Set<number>, center: number, radius: number, itemCount: number) {
  const start = Math.max(0, center - radius);
  const end = Math.min(itemCount - 1, center + radius);
  for (let index = start; index <= end; index += 1) target.add(index);
}

function setsEqual(a: ReadonlySet<number>, b: ReadonlySet<number>) {
  if (a.size !== b.size) return false;
  for (const value of a) {
    if (!b.has(value)) return false;
  }
  return true;
}

/**
 * Slides perto do snap selecionado, mais os que o loop do Embla translada para o
 * viewport. slidesInView só chega depois do IntersectionObserver; os loopPoints
 * já listam esses slides. Sem eles, o fim da lista aparece à esquerda do dia
 * como card roxo vazio.
 */
export function useCarouselVirtualRange(
  emblaApi: EmblaCarouselType | undefined,
  itemCount: number,
  overscan = DEFAULT_OVERSCAN
) {
  const [indexes, setIndexes] = useState<ReadonlySet<number>>(() => {
    const initial = new Set<number>();
    const end = Math.min(Math.max(itemCount - 1, -1), overscan * 2);
    for (let index = 0; index <= end; index += 1) initial.add(index);
    return initial;
  });

  useEffect(() => {
    if (!emblaApi || itemCount === 0) return;

    const update = () => {
      const next = new Set<number>();
      addRange(next, emblaApi.selectedScrollSnap(), overscan, itemCount);
      for (const index of emblaApi.slidesInView()) {
        addRange(next, index, LOOP_EDGE_PAD, itemCount);
      }
      // slidesInView depende do IntersectionObserver e chega tarde. Os pontos
      // de loop já dizem quais slides o Embla encosta no outro lado — sem isso
      // eles ficam no viewport como retângulo vazio.
      const engine = emblaApi.internalEngine();
      if (engine.options.loop) {
        for (const point of engine.slideLooper.loopPoints) {
          addRange(next, point.index, LOOP_EDGE_PAD, itemCount);
        }
      }
      setIndexes((current) => (setsEqual(current, next) ? current : next));
    };

    emblaApi.on('scroll', update);
    emblaApi.on('select', update);
    emblaApi.on('reInit', update);
    emblaApi.on('slidesInView', update);
    update();

    return () => {
      emblaApi.off('scroll', update);
      emblaApi.off('select', update);
      emblaApi.off('reInit', update);
      emblaApi.off('slidesInView', update);
    };
  }, [emblaApi, itemCount, overscan]);

  return indexes;
}
