'use client';

import { useEffect } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

/** Efeito leque via DOM — sem re-render React durante o scroll */
export function useFanCarouselSlides(emblaApi: EmblaCarouselType | undefined) {
  useEffect(() => {
    if (!emblaApi) return;

    const updateSlides = () => {
      const slides = emblaApi.slideNodes();
      const selected = emblaApi.selectedScrollSnap();

      slides.forEach((slide, i) => {
        const dist = Math.abs(i - selected);
        const scale = dist === 0 ? 1 : dist === 1 ? 0.93 : 0.86;
        slide.style.transform = `scale(${scale})`;
        slide.style.zIndex = String(dist === 0 ? 10 : dist === 1 ? 5 : 1);
        slide.style.opacity = dist > 3 ? '0.65' : '1';
        slide.style.transition = emblaApi.scrollProgress() === 0 || emblaApi.scrollProgress() === 1
          ? 'transform 0.2s ease, opacity 0.2s ease'
          : 'none';
      });
    };

    emblaApi.on('scroll', updateSlides);
    emblaApi.on('select', updateSlides);
    emblaApi.on('reInit', updateSlides);
    emblaApi.on('settle', updateSlides);
    updateSlides();

    return () => {
      emblaApi.off('scroll', updateSlides);
      emblaApi.off('select', updateSlides);
      emblaApi.off('reInit', updateSlides);
      emblaApi.off('settle', updateSlides);
    };
  }, [emblaApi]);
}
