import { useEffect, RefObject } from 'react';

/**
 * Habilita scroll horizontal em carrosséis via Ctrl+scroll, touchpad e gestos touch.
 */
export function useHorizontalScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const isHorizontalGesture = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const shouldScrollHorizontally = e.ctrlKey || e.metaKey || isHorizontalGesture;

      if (shouldScrollHorizontally) {
        e.preventDefault();
        el.scrollLeft += e.deltaX + (e.ctrlKey || e.metaKey ? e.deltaY : 0);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [ref]);
}
