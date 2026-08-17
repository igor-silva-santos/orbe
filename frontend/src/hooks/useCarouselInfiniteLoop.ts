'use client';

import { useEffect, useRef } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import type { CarouselLoopBounds } from '@/lib/carousel-loop';

export interface UseCarouselInfiniteLoopOptions {
  emblaApi: EmblaCarouselType | undefined;
  viewportRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  getBounds: () => CarouselLoopBounds;
  onWrap?: (targetIndex: number) => void;
}

/**
 * Custom infinite loop for dynamic launch carousels.
 *
 * Native Embla `loop: true` clones slides and conflicts with prepend compensation,
 * virtual range, and year-tbd append zones — so we wrap on edge gestures instead.
 */
export function useCarouselInfiniteLoop({
  emblaApi,
  viewportRef,
  enabled,
  getBounds,
  onWrap,
}: UseCarouselInfiniteLoopOptions) {
  const getBoundsRef = useRef(getBounds);
  const onWrapRef = useRef(onWrap);
  const directionRef = useRef<'forward' | 'backward' | null>(null);
  const prevSnapRef = useRef(0);
  const edgeAtGestureStartRef = useRef<{ atStart: boolean; atEnd: boolean }>({
    atStart: false,
    atEnd: false,
  });

  useEffect(() => {
    getBoundsRef.current = getBounds;
  }, [getBounds]);

  useEffect(() => {
    onWrapRef.current = onWrap;
  }, [onWrap]);

  useEffect(() => {
    if (!emblaApi || !enabled) return;

    const wrapTo = (targetIndex: number) => {
      emblaApi.scrollTo(targetIndex, false);
      prevSnapRef.current = targetIndex;
      directionRef.current = null;
      onWrapRef.current?.(targetIndex);
    };

    const onSelect = () => {
      const snap = emblaApi.selectedScrollSnap();
      if (snap > prevSnapRef.current) directionRef.current = 'forward';
      else if (snap < prevSnapRef.current) directionRef.current = 'backward';
      prevSnapRef.current = snap;
    };

    const onSettle = () => {
      const direction = directionRef.current;
      if (!direction) return;

      const bounds = getBoundsRef.current();
      const snap = emblaApi.selectedScrollSnap();
      const { atStart, atEnd } = edgeAtGestureStartRef.current;

      if (
        direction === 'forward' &&
        atEnd &&
        snap >= bounds.end &&
        !emblaApi.canScrollNext()
      ) {
        wrapTo(bounds.start);
        return;
      }

      if (
        direction === 'backward' &&
        atStart &&
        snap <= bounds.start &&
        !emblaApi.canScrollPrev()
      ) {
        wrapTo(bounds.end);
      }
    };

    const node = viewportRef.current;
    const onPointerDown = () => {
      const bounds = getBoundsRef.current();
      const snap = emblaApi.selectedScrollSnap();
      edgeAtGestureStartRef.current = {
        atStart: snap <= bounds.start,
        atEnd: snap >= bounds.end,
      };
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);
    node?.addEventListener('pointerdown', onPointerDown);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
      node?.removeEventListener('pointerdown', onPointerDown);
    };
  }, [emblaApi, enabled, viewportRef]);
}
