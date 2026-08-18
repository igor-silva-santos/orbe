'use client';

import { useCallback, useEffect, useRef, useState, type RefCallback } from 'react';

/** Movimento 1:1 com o mouse — sensibilidade alta quebrava o controle. */
const DRAG_SCROLL_RATIO = 1;
/** Início do arraste horizontal após este deslocamento (px). */
const DRAG_START_PX = 5;
/** Gestos predominantemente verticais liberam scroll da página. */
const VERTICAL_GESTURE_PX = 14;
/** Amortecimento do wheel/touchpad horizontal. */
const WHEEL_DAMPING = 0.85;

/**
 * Arrastar horizontalmente com mouse/pointer em fileiras overflow-x-auto.
 * Inclui wheel suave e bloqueio de clique após arraste (evita abrir modal ao soltar).
 */
export function useHorizontalDragScroll() {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const blockClickRef = useRef(false);
  const listenersCleanupRef = useRef<(() => void) | null>(null);
  const [dragging, setDragging] = useState(false);

  const detachListeners = useCallback(() => {
    if (listenersCleanupRef.current) {
      listenersCleanupRef.current();
      listenersCleanupRef.current = null;
    }
  }, []);

  const attachListeners = useCallback((el: HTMLDivElement) => {
    detachListeners();

    const onClickCapture = (e: MouseEvent) => {
      if (!blockClickRef.current) return;
      e.preventDefault();
      e.stopPropagation();
    };

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      const isHorizontalGesture = absX > absY && absX > 0.5;
      const ctrlWheel = e.ctrlKey || e.metaKey;

      if (!isHorizontalGesture && !ctrlWheel) return;

      e.preventDefault();
      const delta = ctrlWheel ? e.deltaY : e.deltaX;
      el.scrollLeft += delta * WHEEL_DAMPING;
    };

    el.addEventListener('click', onClickCapture, true);
    el.addEventListener('wheel', onWheel, { passive: false });

    listenersCleanupRef.current = () => {
      el.removeEventListener('click', onClickCapture, true);
      el.removeEventListener('wheel', onWheel);
    };
  }, [detachListeners]);

  const scrollRef: RefCallback<HTMLDivElement> = useCallback(
    (node) => {
      nodeRef.current = node;
      if (node) attachListeners(node);
      else detachListeners();
    },
    [attachListeners, detachListeners],
  );

  useEffect(() => () => detachListeners(), [detachListeners]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const el = nodeRef.current;
    if (!el) return;

    isDownRef.current = true;
    blockClickRef.current = false;
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
    const el = nodeRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const deltaX = currentX - startXRef.current;
    const deltaY = currentY - startYRef.current;

    if (
      !hasDraggedRef.current &&
      Math.abs(deltaY) > Math.abs(deltaX) &&
      Math.abs(deltaY) > VERTICAL_GESTURE_PX
    ) {
      isDownRef.current = false;
      setDragging(false);
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      return;
    }

    if (Math.abs(deltaX) >= DRAG_START_PX) {
      hasDraggedRef.current = true;
      e.preventDefault();
      el.scrollLeft = scrollLeftRef.current - deltaX * DRAG_SCROLL_RATIO;
    }
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDownRef.current) return;

    const wasDrag = hasDraggedRef.current;
    isDownRef.current = false;
    setDragging(false);
    hasDraggedRef.current = false;

    if (wasDrag) {
      blockClickRef.current = true;
      window.setTimeout(() => {
        blockClickRef.current = false;
      }, 0);
      e.preventDefault();
    }

    try {
      nodeRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  return {
    scrollRef,
    dragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerLeave: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
