'use client';

import { useCallback, useRef, useState } from 'react';

const DRAG_SENSITIVITY = 2.6;

/** Arrastar horizontalmente com mouse/touch em fileiras overflow-x-auto. */
export function useHorizontalDragScroll() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;

    isDownRef.current = true;
    setDragging(true);
    hasDraggedRef.current = false;
    const rect = el.getBoundingClientRect();
    startXRef.current = e.clientX - rect.left;
    startYRef.current = e.clientY - rect.top;
    scrollLeftRef.current = el.scrollLeft;

    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDownRef.current) return;
    const el = scrollRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const deltaX = currentX - startXRef.current;
    const deltaY = currentY - startYRef.current;

    if (!hasDraggedRef.current && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 12) {
      isDownRef.current = false;
      setDragging(false);
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      return;
    }

    if (Math.abs(deltaX) > 4) {
      hasDraggedRef.current = true;
      e.preventDefault();
    }

    el.scrollLeft = scrollLeftRef.current - deltaX * DRAG_SENSITIVITY;
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    setDragging(false);
    try {
      scrollRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  return {
    scrollRef,
    dragging,
    hasDraggedRef,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerLeave: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
