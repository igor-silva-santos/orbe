import { toast } from 'sonner';
import orbeNerdApi from '@/lib/api';
import type { Anime } from '@/types';

type StoreSlice = {
  animeWeeklyPinIds: number[];
  setAnimeWeeklyPinIds: (ids: number[]) => void;
  mergePinnedAnimes: (animes: Anime[]) => void;
};

export async function toggleAnimeWeeklyPin(
  anilistId: number,
  { animeWeeklyPinIds, setAnimeWeeklyPinIds, mergePinnedAnimes }: StoreSlice,
): Promise<void> {
  const isPinned = animeWeeklyPinIds.includes(anilistId);
  if (isPinned) {
    await orbeNerdApi.unpinAnimeWeekly(anilistId);
    setAnimeWeeklyPinIds(animeWeeklyPinIds.filter((id) => id !== anilistId));
    toast.success('Removido da sua semana.');
    return;
  }
  await orbeNerdApi.pinAnimeWeekly(anilistId);
  const refreshed = await orbeNerdApi.getAnimeWeeklyPins();
  setAnimeWeeklyPinIds(refreshed.anilistIds ?? []);
  mergePinnedAnimes((refreshed.animes ?? []) as Anime[]);
  toast.success('Adicionado à sua semana.');
}
