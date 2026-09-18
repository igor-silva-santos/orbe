import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { WatchlistAnime } from '@/types';

import orbeNerdApi, { type WatchlistSyncResponse } from '@/lib/api';

export interface WatchlistSyncFeedback {
  type: 'success' | 'error';
  message: string;
  result?: WatchlistSyncResponse;
}

function computeLastSyncedAt(items: WatchlistAnime[]): string | null {
  let latest: string | null = null;

  for (const item of items) {
    for (const value of [item.lastSyncedAt, item.updatedAt]) {
      if (!value) continue;
      if (!latest || new Date(value).getTime() > new Date(latest).getTime()) {
        latest = value;
      }
    }
  }

  return latest;
}

function mapLegacyBackupItem(raw: Record<string, unknown>): Record<string, unknown> {
  return {
    crunchyrollId: raw.crunchyrollId || raw.malId?.toString() || raw.id,
    title: raw.title || raw.q,
    posterUrl: raw.img || raw.posterUrl,
    crunchyrollUrl: raw.cr,
    season: raw.s || raw.season || 1,
    episode: raw.ep || raw.episode || 0,
    totalEpisodes: raw.tot || raw.totalEpisodes,
    hasDub: Boolean(raw.dub),
    status: raw.st || raw.status || 'comecar',
    lists: raw.lists || [],
    note: raw.note,
    malId: raw.malId,
  };
}

interface WatchlistState {
  items: WatchlistAnime[];
  lastSyncedAt: string | null;
  isLoading: boolean;
  error: string | null;
  syncFeedback: WatchlistSyncFeedback | null;
  filter: 'all' | 'andamento' | 'comecar' | 'terminado' | 'dub';
  fetchItems: () => Promise<void>;
  setFilter: (filter: WatchlistState['filter']) => void;
  removeItem: (id: string) => Promise<void>;
  updateItem: (id: string, data: Partial<WatchlistAnime>) => Promise<void>;
  syncItems: (rawItems: Record<string, unknown>[]) => Promise<WatchlistSyncResponse>;
  clearSyncFeedback: () => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      lastSyncedAt: null,
      isLoading: false,
      error: null,
      syncFeedback: null,
      filter: 'all',
      fetchItems: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await orbeNerdApi.getWatchlistAnimes();
          const items = data.results;
          set({ items, lastSyncedAt: computeLastSyncedAt(items), isLoading: false });
        } catch (error) {
          if (typeof navigator !== 'undefined' && !navigator.onLine && get().items.length > 0) {
            set({ isLoading: false, error: null });
            return;
          }

          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Erro ao carregar lista',
          });
        }
      },
      setFilter: (filter) => set({ filter }),
      removeItem: async (id) => {
        const previousItems = get().items;
        try {
          await orbeNerdApi.deleteWatchlistAnime(id);
          const items = previousItems.filter((item) => item.id !== id);
          set({ items, lastSyncedAt: computeLastSyncedAt(items), error: null });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Erro ao remover anime';
          set({
            error: message,
            syncFeedback: { type: 'error', message },
          });
          throw error;
        }
      },
      updateItem: async (id, data) => {
        const updated = (await orbeNerdApi.updateWatchlistAnime(id, data)) as WatchlistAnime;
        const items = get().items.map((item) => (item.id === id ? { ...item, ...updated } : item));
        set({ items, lastSyncedAt: computeLastSyncedAt(items) });
      },
      syncItems: async (rawItems) => {
        set({ syncFeedback: null, error: null });
        try {
          const itemsPayload = rawItems.map((raw) => mapLegacyBackupItem(raw));
          const result = await orbeNerdApi.syncWatchlistAnimes(itemsPayload);
          await get().fetchItems();
          set({
            syncFeedback: {
              type: 'success',
              message: `Backup importado: ${result.imported} novos, ${result.updated} atualizados, ${result.skipped} ignorados.`,
              result,
            },
          });
          return result;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Erro ao importar backup';
          set({
            syncFeedback: { type: 'error', message },
            error: message,
          });
          throw error;
        }
      },
      clearSyncFeedback: () => set({ syncFeedback: null }),
    }),
    {
      name: 'orbe-watchlist-cache',
      partialize: (state) => ({
        items: state.items,
        lastSyncedAt: state.lastSyncedAt,
      }),
    }
  )
);

export function filterWatchlistItems(
  items: WatchlistAnime[],
  filter: WatchlistState['filter']
): WatchlistAnime[] {
  switch (filter) {
    case 'andamento':
      return items.filter((item) => ['continuar', 'seguir'].includes(item.status));
    case 'comecar':
      return items.filter((item) => item.status === 'comecar');
    case 'terminado':
      return items.filter((item) => item.status === 'terminado');
    case 'dub':
      return items.filter((item) => item.hasDub);
    default:
      return items;
  }
}
