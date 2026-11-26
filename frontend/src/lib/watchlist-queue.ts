export const WATCHLIST_QUEUE_ORDER = [
  'continuar',
  'seguir',
  'novamente',
  'comecar',
  'terminado',
] as const;

export type WatchlistListFilter = 'all' | 'andamento' | 'comecar' | 'terminado' | 'dub';

const IN_PROGRESS = new Set(['continuar', 'seguir', 'novamente']);

export function watchlistStatusRank(status: string): number {
  const index = WATCHLIST_QUEUE_ORDER.indexOf(status as (typeof WATCHLIST_QUEUE_ORDER)[number]);
  return index === -1 ? WATCHLIST_QUEUE_ORDER.length : index;
}

export function filterWatchlistItems<T extends { status: string; hasDub?: boolean }>(
  items: T[],
  filter: WatchlistListFilter
): T[] {
  switch (filter) {
    case 'andamento':
      return items.filter((item) => IN_PROGRESS.has(item.status));
    case 'comecar':
      return items.filter((item) => item.status === 'comecar');
    case 'terminado':
      return items.filter((item) => item.status === 'terminado' || item.status === 'assistido');
    case 'dub':
      return items.filter((item) => item.hasDub);
    default:
      return items;
  }
}

export function sortWatchlistQueue<T extends { status: string; updatedAt?: string | null }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    const byStatus = watchlistStatusRank(a.status) - watchlistStatusRank(b.status);
    if (byStatus !== 0) return byStatus;
    const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return bTime - aTime;
  });
}

export function isInPersonalQueue(status: string): boolean {
  return status === 'continuar' || status === 'seguir' || status === 'novamente' || status === 'comecar';
}

export function episodeProgressPercent(
  episode: number,
  totalEpisodes: number | null | undefined
): number | null {
  if (!totalEpisodes || totalEpisodes <= 0 || episode <= 0) return null;
  return Math.min(100, Math.round((episode / totalEpisodes) * 100));
}
