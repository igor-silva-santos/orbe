'use client';

import { useEffect, type RefObject } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import { wrapCarouselIndex, type CarouselLoopBounds } from '@/lib/carousel-loop';

const HORIZONTAL_THRESHOLD = 48;

export interface CarouselInfiniteScrollOptions {
  enabled: boolean;
  getBounds: () => CarouselLoopBounds;
}

/**
 * Scroll horizontal no carrossel: touchpad (deltaX acumulado) ou Ctrl/Cmd + scroll vertical.
 *
 * Modo normal: acumula delta e avança exatamente 1 slide por gesto, sem limiar reduzido —
 * sensação de rolar uma página com o mouse, sem parecer travado nem pular vários de vez.
 *
 * Modo rápido: sem espera por limiar — cada evento de wheel já move o alvo proporcionalmente
 * ao delta acumulado (em unidades de largura de slide). Um puxão forte no touchpad dispara uma
 * rajada de eventos wheel com magnitude decrescente (a própria inércia do sistema operacional
 * simulando momentum); respondendo a cada evento da rajada, o carrossel continua avançando ao
 * longo dela inteira — como um scroll contínuo/infinito — em vez de um slide de cada vez.
 */
export function useCtrlWheelCarousel(
  emblaApi: EmblaCarouselType | undefined,
  viewportRef: RefObject<HTMLElement | null>,
  fast = false,
  infiniteLoop?: CarouselInfiniteScrollOptions,
) {
  useEffect(() => {
    const node = viewportRef.current;
    if (!node || !emblaApi) return;

    let accumulatedX = 0;
    let cachedSlideWidth = 0;

    const getSlideWidth = () => {
      if (cachedSlideWidth > 0) return cachedSlideWidth;
      const slide = emblaApi.slideNodes()[0];
      cachedSlideWidth = (slide?.getBoundingClientRect().width || 190) + 16;
      return cachedSlideWidth;
    };

    const scrollForward = () => {
      if (infiniteLoop?.enabled) {
        const bounds = infiniteLoop.getBounds();
        const snap = emblaApi.selectedScrollSnap();
        if (snap >= bounds.end) {
          emblaApi.scrollTo(bounds.start, false);
          return;
        }
      }
      emblaApi.scrollNext();
    };

    const scrollBackward = () => {
      if (infiniteLoop?.enabled) {
        const bounds = infiniteLoop.getBounds();
        const snap = emblaApi.selectedScrollSnap();
        if (snap <= bounds.start) {
          emblaApi.scrollTo(bounds.end, false);
          return;
        }
      }
      emblaApi.scrollPrev();
    };

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      if (e.ctrlKey || e.metaKey) {
        if (absY < 1) return;
        e.preventDefault();
        if (e.deltaY > 0) scrollForward();
        else scrollBackward();
        return;
      }

      const isHorizontalGesture = absX > absY && absX > 1;
      if (!isHorizontalGesture) return;

      e.preventDefault();
      accumulatedX += e.deltaX;

      if (fast) {
        const slideWidth = getSlideWidth();
        const slidesToMove = Math.trunc(accumulatedX / slideWidth);
        if (slidesToMove === 0) return;

        const snap = emblaApi.selectedScrollSnap();
        let target = snap + slidesToMove;

        if (infiniteLoop?.enabled) {
          target = wrapCarouselIndex(target, infiniteLoop.getBounds());
        } else {
          const lastIndex = emblaApi.scrollSnapList().length - 1;
          target = Math.min(Math.max(target, 0), lastIndex);
        }

        emblaApi.scrollTo(target, false);
        accumulatedX -= slidesToMove * slideWidth;
        return;
      }

      if (Math.abs(accumulatedX) < HORIZONTAL_THRESHOLD) return;

      if (accumulatedX > 0) scrollForward();
      else scrollBackward();
      accumulatedX = 0;
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [emblaApi, viewportRef, fast, infiniteLoop]);
}
