'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAppStore } from '@/stores/appStore';
import { toggleAnimeWeeklyPin } from '@/lib/animeWeeklyPinActions';

export function useAnimeWeeklyPin(anilistId: number) {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const pinIds = useAppStore((s) => s.animeWeeklyPinIds);
  const setAnimeWeeklyPinIds = useAppStore((s) => s.setAnimeWeeklyPinIds);
  const mergePinnedAnimes = useAppStore((s) => s.mergePinnedAnimes);
  const [loading, setLoading] = useState(false);

  const isPinned = pinIds.includes(anilistId);

  const toggle = useCallback(async () => {
    if (!isAuthenticated) {
      toast.message('Entre na sua conta para fixar animes na semana.');
      return;
    }
    setLoading(true);
    try {
      await toggleAnimeWeeklyPin(anilistId, {
        animeWeeklyPinIds: pinIds,
        setAnimeWeeklyPinIds,
        mergePinnedAnimes,
      });
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Não foi possível atualizar sua semana.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [anilistId, isAuthenticated, isPinned, mergePinnedAnimes, pinIds, setAnimeWeeklyPinIds]);

  return { isPinned, toggle, loading, isAuthenticated };
}
