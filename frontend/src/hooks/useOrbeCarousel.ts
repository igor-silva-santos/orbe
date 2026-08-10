'use client';

import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

/** Opções padrão — scroll livre com inércia e settle suave */
export const ORBE_CAROUSEL_OPTIONS: EmblaOptionsType = {
  align: 'center',
  dragFree: true,
  containScroll: 'trimSnaps',
  duration: 40,
  skipSnaps: false,
};

/**
 * Carrossel Orbe: Embla com scroll horizontal (touchpad, Ctrl+scroll) e efeito leque (GSAP).
 */
export function useOrbeCarousel(options?: EmblaOptionsType) {
  return useEmblaCarousel(
    { ...ORBE_CAROUSEL_OPTIONS, ...options },
    [WheelGesturesPlugin({ forceWheelAxis: 'x' })]
  );
}
