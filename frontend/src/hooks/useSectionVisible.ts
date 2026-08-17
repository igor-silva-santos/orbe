'use client';

import { useEffect, useState, type RefObject } from 'react';

const DEFAULT_ROOT_MARGIN = '200px';

/**
 * Returns true once the observed element enters (or nears) the viewport.
 * Stays true after first intersection — used to lazy-enable carousel bootstrap.
 */
export function useSectionVisible(
  ref: RefObject<Element | null>,
  options?: { rootMargin?: string },
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: options?.rootMargin ?? DEFAULT_ROOT_MARGIN },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options?.rootMargin, visible]);

  return visible;
}
