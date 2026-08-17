'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

type CarouselScrollbarProps = {
  emblaApi: EmblaCarouselType | undefined;
  className?: string;
};

/** Barra de progresso horizontal abaixo do carrossel Embla — indica posição e permite arrastar. */
export function CarouselScrollbar({ emblaApi, className = '' }: CarouselScrollbarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumbRatio, setThumbRatio] = useState(1);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [visible, setVisible] = useState(false);
  const draggingRef = useRef(false);

  const update = useCallback(() => {
    if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();
    const snaps = emblaApi.scrollSnapList();
    const canScroll = snaps.length > 1 && (emblaApi.canScrollNext() || emblaApi.canScrollPrev());
    setVisible(canScroll);
    if (!canScroll) return;

    const ratio = Math.max(0.12, 1 / snaps.length);
    setThumbRatio(ratio);
    const maxOffset = 1 - ratio;
    setThumbOffset(progress * maxOffset);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('scroll', update);
    emblaApi.on('reInit', update);
    emblaApi.on('select', update);
    update();
    return () => {
      emblaApi.off('scroll', update);
      emblaApi.off('reInit', update);
      emblaApi.off('select', update);
    };
  }, [emblaApi, update]);

  const seekFromClientX = useCallback(
    (clientX: number) => {
      if (!emblaApi || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const snaps = emblaApi.scrollSnapList();
      if (snaps.length === 0) return;
      const target = Math.round(ratio * (snaps.length - 1));
      emblaApi.scrollTo(target);
    },
    [emblaApi],
  );

  if (!visible) return null;

  return (
    <div
      ref={trackRef}
      className={`mt-2 px-2 sm:px-4 select-none ${className}`}
      role="scrollbar"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(thumbOffset * 100)}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        draggingRef.current = true;
        trackRef.current?.setPointerCapture(e.pointerId);
        seekFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!draggingRef.current) return;
        seekFromClientX(e.clientX);
      }}
      onPointerUp={(e) => {
        draggingRef.current = false;
        try {
          trackRef.current?.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }}
      onPointerCancel={(e) => {
        draggingRef.current = false;
        try {
          trackRef.current?.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }}
    >
      <div className="relative h-1.5 w-full rounded-full bg-muted cursor-pointer">
        <div
          className="absolute top-0 h-full rounded-full bg-primary/80 hover:bg-primary transition-colors cursor-grab active:cursor-grabbing"
          style={{
            width: `${thumbRatio * 100}%`,
            left: `${thumbOffset * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export default CarouselScrollbar;
