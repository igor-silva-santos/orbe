import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { WatchlistAnime } from '@/types';

import orbeNerdApi, { type WatchlistSyncResponse } from '@/lib/api';
import { type WatchlistListFilter } from '@/lib/watchlist-queue';

export { filterWatchlistItems } from '@/lib/watchlist-queue';

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

interface WatchlistState {
  items: WatchlistAnime[];
  lastSyncedAt: string | null;
  isLoading: boolean;
  error: string | null;
  syncFeedback: WatchlistSyncFeedback | null;
  filter: WatchlistListFilter;
  fetchItems: () => Promise<void>;
  setFilter: (filter: WatchlistListFilter) => void;
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
          const result = await orbeNerdApi.syncWatchlistAnimes(rawItems);
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
