'use client';

import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

export function useFanCarouselSlides(emblaApi: EmblaCarouselType | undefined) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const getSlideStyle = useCallback(
    (index: number): React.CSSProperties => {
      const distance = Math.abs(index - selectedIndex);
      const scale = distance === 0 ? 1 : distance === 1 ? 0.9 : 0.78;
      const zIndex = distance === 0 ? 20 : distance === 1 ? 10 : 1;
      const opacity = distance > 2 ? 0.65 : 1;

      return {
        transform: `scale(${scale})`,
        zIndex,
        opacity,
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
      };
    },
    [selectedIndex]
  );

  return { selectedIndex, getSlideStyle };
}
