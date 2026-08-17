'use client';

import { useEffect, useRef, type RefObject } from 'react';

const DRAG_THRESHOLD_PX = 8;

/**
 * Evita que um arraste curto no Embla dispare o onClick do card (abertura do modal).
 */
export function useCarouselDragClickGuard(viewportRef: RefObject<HTMLElement | null>) {
  const blockClickRef = useRef(false);
  const pointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pointerDownRef.current = true;
      blockClickRef.current = false;
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerDownRef.current || blockClickRef.current) return;
      const dx = Math.abs(e.clientX - startXRef.current);
      const dy = Math.abs(e.clientY - startYRef.current);
      if (dx > DRAG_THRESHOLD_PX || dy > DRAG_THRESHOLD_PX) {
        blockClickRef.current = true;
      }
    };

    const onPointerUp = () => {
      pointerDownRef.current = false;
      if (blockClickRef.current) {
        window.setTimeout(() => {
          blockClickRef.current = false;
        }, 0);
      }
    };

    const onClickCapture = (e: MouseEvent) => {
      if (!blockClickRef.current) return;
      e.preventDefault();
      e.stopPropagation();
    };

    node.addEventListener('pointerdown', onPointerDown);
    node.addEventListener('pointermove', onPointerMove);
    node.addEventListener('pointerup', onPointerUp);
    node.addEventListener('click', onClickCapture, true);

    return () => {
      node.removeEventListener('pointerdown', onPointerDown);
      node.removeEventListener('pointermove', onPointerMove);
      node.removeEventListener('pointerup', onPointerUp);
      node.removeEventListener('click', onClickCapture, true);
    };
  }, [viewportRef]);
}
