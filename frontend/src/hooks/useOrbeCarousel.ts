'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import type { EmblaOptionsType } from 'embla-carousel';

/** Opções padrão — scroll livre com inércia e settle suave */
export const ORBE_CAROUSEL_OPTIONS: EmblaOptionsType = {
  align: 'center',
  dragFree: true,
  containScroll: 'trimSnaps',
  duration: 40,
  skipSnaps: false,
};

const wheelGestures = WheelGesturesPlugin({
  forceWheelAxis: 'y',
  wheelDraggingClass: 'is-wheel-dragging',
});

/**
 * Carrossel Orbe: Embla + wheel gestures (trackpad/mouse fluido).
 * O efeito leque é aplicado via useFanCarouselSlides (GSAP).
 */
export function useOrbeCarousel(options?: EmblaOptionsType) {
  return useEmblaCarousel(
    { ...ORBE_CAROUSEL_OPTIONS, ...options },
    [wheelGestures]
  );
}
