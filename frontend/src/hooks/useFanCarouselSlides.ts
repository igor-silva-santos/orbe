'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { EmblaCarouselType } from 'embla-carousel';

type SlideTweens = {
  scale: gsap.QuickToFunc;
  opacity: gsap.QuickToFunc;
};

/**
 * Efeito leque contínuo — escala/opacidade interpoladas pela distância
 * ao centro do viewport (não pelo índice de snap). GSAP quickTo dá inércia visual.
 */
export function useFanCarouselSlides(emblaApi: EmblaCarouselType | undefined) {
  const tweensRef = useRef(new WeakMap<HTMLElement, SlideTweens>());

  useEffect(() => {
    if (!emblaApi) return;

    const getTweens = (slide: HTMLElement): SlideTweens => {
      let entry = tweensRef.current.get(slide);
      if (!entry) {
        gsap.set(slide, { transformOrigin: 'center center', scale: 1, opacity: 1 });
        entry = {
          scale: gsap.quickTo(slide, 'scale', { duration: 0.45, ease: 'power3.out' }),
          opacity: gsap.quickTo(slide, 'opacity', { duration: 0.45, ease: 'power3.out' }),
        };
        tweensRef.current.set(slide, entry);
      }
      return entry;
    };

    const updateSlides = () => {
      const root = emblaApi.rootNode();
      const rootRect = root.getBoundingClientRect();
      const centerX = rootRect.left + rootRect.width / 2;

      emblaApi.slideNodes().forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const distance = Math.abs(slideCenter - centerX);
        const slideWidth = rect.width || 190;
        const t = Math.min(distance / (slideWidth * 2.1), 1);

        const scale = 1 - t * 0.14;
        const opacity = 1 - Math.min(t * 0.5, 0.35);

        const { scale: toScale, opacity: toOpacity } = getTweens(slide);
        toScale(scale);
        toOpacity(opacity);
        slide.style.zIndex = String(Math.round(100 - t * 90));
      });
    };

    emblaApi.on('scroll', updateSlides);
    emblaApi.on('reInit', updateSlides);
    emblaApi.on('resize', updateSlides);
    emblaApi.on('settle', updateSlides);
    updateSlides();

    return () => {
      emblaApi.off('scroll', updateSlides);
      emblaApi.off('reInit', updateSlides);
      emblaApi.off('resize', updateSlides);
      emblaApi.off('settle', updateSlides);
    };
  }, [emblaApi]);
}
