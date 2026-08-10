'use client';

import { useEffect, type RefObject } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

export function useCtrlWheelCarousel(
  emblaApi: EmblaCarouselType | undefined,
  viewportRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const node = viewportRef.current;
    if (!node || !emblaApi) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      if (e.deltaY > 0) {
        emblaApi.scrollNext();
      } else if (e.deltaY < 0) {
        emblaApi.scrollPrev();
      }
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [emblaApi, viewportRef]);
}
