'use client';

import { useEffect, useRef } from 'react';
import { useCarouselCenterPosterReveal } from '@/hooks/useCarouselCenterPosterReveal';

interface UseCarouselInitialPosterRevealOptions {
  hasInitialPositioning: boolean;
  emAltaMode: boolean;
  centerHasPoster: boolean;
}

/**
 * Aguarda o onLoad do poster central na primeira revelação do carrossel.
 */
export function useCarouselInitialPosterReveal({
  hasInitialPositioning,
  emAltaMode,
  centerHasPoster,
}: UseCarouselInitialPosterRevealOptions) {
  const {
    isWaitingForCenterPoster,
    beginWaitingForCenterPoster,
    handleCenterPosterLoad,
  } = useCarouselCenterPosterReveal();
  const hasStartedWaitRef = useRef(false);

  useEffect(() => {
    if (hasInitialPositioning || emAltaMode || hasStartedWaitRef.current) return;
    hasStartedWaitRef.current = true;
    beginWaitingForCenterPoster(centerHasPoster);
  }, [
    hasInitialPositioning,
    emAltaMode,
    centerHasPoster,
    beginWaitingForCenterPoster,
  ]);

  return {
    isWaitingForCenterPoster,
    handleCenterPosterLoad,
  };
}
