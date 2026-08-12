'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { EmblaCarouselType } from 'embla-carousel';

type SlideTweens = {
  scaleX: gsap.QuickToFunc;
  scaleY: gsap.QuickToFunc;
  opacity: gsap.QuickToFunc;
};

function shouldUseFanEffect(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(max-width: 768px)').matches) return false;
  return true;
}

/**
 * Efeito leque — desativado em mobile e com prefers-reduced-motion para performance.
 */
export function useFanCarouselSlides(emblaApi: EmblaCarouselType | undefined) {
  const tweensRef = useRef(new WeakMap<HTMLElement, SlideTweens>());

  useEffect(() => {
    if (!emblaApi || !shouldUseFanEffect()) return;

    const getTweens = (slide: HTMLElement): SlideTweens => {
      let entry = tweensRef.current.get(slide);
      if (!entry) {
        gsap.set(slide, { transformOrigin: 'center center', scaleX: 1, scaleY: 1, opacity: 1 });
        entry = {
          scaleX: gsap.quickTo(slide, 'scaleX', { duration: 0.45, ease: 'power3.out' }),
          scaleY: gsap.quickTo(slide, 'scaleY', { duration: 0.45, ease: 'power3.out' }),
          opacity: gsap.quickTo(slide, 'opacity', { duration: 0.45, ease: 'power3.out' }),
        };
        tweensRef.current.set(slide, entry);
      }
      return entry;
    };

    // Só mede/anima os slides perto do centro — os demais já ficam totalmente esmaecidos
    // bem antes dessa distância, então congelar o resto não é perceptível.
    const FAN_WINDOW = 10;

    const updateSlides = () => {
      const root = emblaApi.rootNode();
      const rootRect = root.getBoundingClientRect();
      const centerX = rootRect.left + rootRect.width / 2;
      const selected = emblaApi.selectedScrollSnap();
      const slideNodes = emblaApi.slideNodes();

      // 1ª passada: só leitura de layout (evita intercalar leitura/escrita — cada
      // getBoundingClientRect() depois de um write do GSAP força um reflow síncrono).
      const measurements: { slide: HTMLElement; t: number }[] = [];
      for (let index = 0; index < slideNodes.length; index++) {
        if (Math.abs(index - selected) > FAN_WINDOW) continue;
        const slide = slideNodes[index];
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const distance = Math.abs(slideCenter - centerX);
        const slideWidth = rect.width || 190;
        measurements.push({ slide, t: Math.min(distance / (slideWidth * 2.1), 1) });
      }

      // 2ª passada: só escrita.
      measurements.forEach(({ slide, t }) => {
        const scale = 1 - t * 0.14;
        const opacity = 1 - Math.min(t * 0.5, 0.35);

        const { scaleX: toScaleX, scaleY: toScaleY, opacity: toOpacity } = getTweens(slide);
        toScaleX(scale);
        toScaleY(scale);
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
