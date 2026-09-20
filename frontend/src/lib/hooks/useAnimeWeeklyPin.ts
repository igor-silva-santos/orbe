'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import orbeNerdApi from '@/lib/api';
import { useAppStore } from '@/stores/appStore';

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
      if (isPinned) {
        await orbeNerdApi.unpinAnimeWeekly(anilistId);
        setAnimeWeeklyPinIds(pinIds.filter((id) => id !== anilistId));
        toast.success('Removido da sua semana.');
      } else {
        await orbeNerdApi.pinAnimeWeekly(anilistId);
        setAnimeWeeklyPinIds([anilistId, ...pinIds.filter((id) => id !== anilistId)]);
        const refreshed = await orbeNerdApi.getAnimeWeeklyPins();
        setAnimeWeeklyPinIds(refreshed.anilistIds ?? []);
        mergePinnedAnimes(refreshed.animes ?? []);
        toast.success('Adicionado à sua semana.');
      }
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
