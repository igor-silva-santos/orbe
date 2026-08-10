import { useEffect } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

/**
 * Habilita scroll horizontal no Embla via Ctrl+scroll, trackpad e gestos horizontais.
 */
export function useEmblaWheelScroll(emblaApi: EmblaCarouselType | undefined) {
  useEffect(() => {
    if (!emblaApi) return;

    const node = emblaApi.rootNode();
    let accumulated = 0;
    const threshold = 40;

    const onWheel = (e: WheelEvent) => {
      const isHorizontalGesture = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const shouldHandle = e.ctrlKey || e.metaKey || isHorizontalGesture;

      if (!shouldHandle) return;

      e.preventDefault();
      const delta = e.deltaX + (e.ctrlKey || e.metaKey ? e.deltaY : 0);
      accumulated += delta;

      if (accumulated >= threshold) {
        emblaApi.scrollNext();
        accumulated = 0;
      } else if (accumulated <= -threshold) {
        emblaApi.scrollPrev();
        accumulated = 0;
      }
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [emblaApi]);
}
