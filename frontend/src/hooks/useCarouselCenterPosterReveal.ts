'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const CENTER_POSTER_REVEAL_TIMEOUT_MS = 800;

export function useCarouselCenterPosterReveal() {
  const [isWaitingForCenterPoster, setIsWaitingForCenterPoster] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasRevealedRef = useRef(false);

  const clearRevealTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const revealCarousel = useCallback(() => {
    if (hasRevealedRef.current) return;
    hasRevealedRef.current = true;
    clearRevealTimeout();
    setIsWaitingForCenterPoster(false);
  }, [clearRevealTimeout]);

  const beginWaitingForCenterPoster = useCallback(
    (shouldWait: boolean) => {
      clearRevealTimeout();
      hasRevealedRef.current = false;

      if (!shouldWait) {
        setIsWaitingForCenterPoster(false);
        return;
      }

      setIsWaitingForCenterPoster(true);
      timeoutRef.current = setTimeout(revealCarousel, CENTER_POSTER_REVEAL_TIMEOUT_MS);
    },
    [clearRevealTimeout, revealCarousel],
  );

  const handleCenterPosterLoad = useCallback(() => {
    if (!hasRevealedRef.current) {
      revealCarousel();
    }
  }, [revealCarousel]);

  useEffect(() => () => clearRevealTimeout(), [clearRevealTimeout]);

  return {
    isWaitingForCenterPoster,
    beginWaitingForCenterPoster,
    handleCenterPosterLoad,
  };
}
