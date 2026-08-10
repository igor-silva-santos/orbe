'use client';

import { useEffect, type RefObject } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

const HORIZONTAL_THRESHOLD = 48;

/**
 * Scroll horizontal no carrossel: touchpad (deltaX acumulado) ou Ctrl/Cmd + scroll vertical.
 * Acumula delta para evitar pular vários slides num único gesto do touchpad.
 */
export function useCtrlWheelCarousel(
  emblaApi: EmblaCarouselType | undefined,
  viewportRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const node = viewportRef.current;
    if (!node || !emblaApi) return;

    let accumulatedX = 0;

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      if (e.ctrlKey || e.metaKey) {
        if (absY < 1) return;
        e.preventDefault();
        if (e.deltaY > 0) emblaApi.scrollNext();
        else emblaApi.scrollPrev();
        return;
      }

      const isHorizontalGesture = absX > absY && absX > 1;
      if (!isHorizontalGesture) return;

      e.preventDefault();
      accumulatedX += e.deltaX;

      if (Math.abs(accumulatedX) < HORIZONTAL_THRESHOLD) return;

      if (accumulatedX > 0) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
      accumulatedX = 0;
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [emblaApi, viewportRef]);
}
