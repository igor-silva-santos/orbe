'use client';

import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';

/** Opções padrão — scroll livre com inércia e settle suave */
export const ORBE_CAROUSEL_OPTIONS: EmblaOptionsType = {
  align: 'center',
  dragFree: true,
  // false keeps center alignment at edges; infinite wrap is handled in useCarouselInfiniteLoop.
  containScroll: false,
  duration: 40,
  skipSnaps: false,
};

/** Duração do snap com a rolagem rápida ativada — menor valor = transição mais ágil e fluida. */
export const FAST_CAROUSEL_DURATION = 12;

/**
 * Carrossel Orbe: Embla com scroll horizontal via useCtrlWheelCarousel (touchpad / Ctrl+scroll).
 * WheelGesturesPlugin removido — conflitava com o handler manual e fazia o carrossel pular tudo de uma vez.
 */
export function useOrbeCarousel(options?: EmblaOptionsType) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...ORBE_CAROUSEL_OPTIONS, ...options });

  // `duration` pode mudar em tempo real (toggle de rolagem rápida) — Embla só aplica via reInit.
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit({ duration: options?.duration ?? ORBE_CAROUSEL_OPTIONS.duration });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi, options?.duration]);

  return [emblaRef, emblaApi] as const;
}
