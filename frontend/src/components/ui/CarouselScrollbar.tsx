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
  const [isDragging, setIsDragging] = useState(false);
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

  const beginDrag = useCallback(
    (clientX: number) => {
      draggingRef.current = true;
      setIsDragging(true);
      seekFromClientX(clientX);
    },
    [seekFromClientX],
  );

  const moveDrag = useCallback(
    (clientX: number) => {
      if (!draggingRef.current) return;
      seekFromClientX(clientX);
    },
    [seekFromClientX],
  );

  const endDrag = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (event: PointerEvent) => {
      event.preventDefault();
      moveDrag(event.clientX);
    };

    const onPointerUp = () => {
      endDrag();
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!draggingRef.current || event.touches.length === 0) return;
      event.preventDefault();
      moveDrag(event.touches[0].clientX);
    };

    const onTouchEnd = () => {
      endDrag();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [isDragging, moveDrag, endDrag]);

  if (!visible) return null;

  return (
    <div
      ref={trackRef}
      className={`mt-2 px-2 sm:px-4 select-none touch-none ${className}`}
      style={{ touchAction: 'none' }}
      role="scrollbar"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(thumbOffset * 100)}
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        event.preventDefault();
        beginDrag(event.clientX);
        trackRef.current?.setPointerCapture(event.pointerId);
      }}
      onTouchStart={(event) => {
        if (event.touches.length === 0) return;
        event.preventDefault();
        beginDrag(event.touches[0].clientX);
      }}
      onPointerUp={(event) => {
        endDrag();
        try {
          trackRef.current?.releasePointerCapture(event.pointerId);
        } catch {
          // ignore
        }
      }}
      onPointerCancel={(event) => {
        endDrag();
        try {
          trackRef.current?.releasePointerCapture(event.pointerId);
        } catch {
          // ignore
        }
      }}
    >
      <div
        className={`relative h-2 w-full rounded-full bg-muted ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}`}
      >
        <div
          className={`absolute top-0 h-full rounded-full bg-primary/80 transition-colors ${isDragging ? 'bg-primary cursor-grabbing' : 'hover:bg-primary cursor-grab'}`}
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
