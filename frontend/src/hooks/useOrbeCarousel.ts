'use client';

import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';

/** Opções padrão — scroll livre com inércia e settle suave */
export const ORBE_CAROUSEL_OPTIONS: EmblaOptionsType = {
  align: 'center',
  dragFree: true,
  containScroll: 'trimSnaps',
  duration: 40,
  skipSnaps: false,
};

/**
 * Carrossel Orbe: Embla com navegação horizontal via Ctrl+scroll (useCtrlWheelCarousel).
 * O efeito leque é aplicado via useFanCarouselSlides (GSAP).
 */
export function useOrbeCarousel(options?: EmblaOptionsType) {
  return useEmblaCarousel({ ...ORBE_CAROUSEL_OPTIONS, ...options });
}
