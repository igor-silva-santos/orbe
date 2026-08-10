import type { Midia } from '@/types';

export function mergeMediaByDate(existing: Midia[], incoming: Midia[]): Midia[] {
  if (incoming.length === 0) return existing;
  const byId = new Map(existing.map((item) => [item.id, item]));
  for (const item of incoming) {
    byId.set(item.id, item);
  }
  return Array.from(byId.values()).sort(
    (a, b) =>
      new Date(a.data_lancamento_api).getTime() - new Date(b.data_lancamento_api).getTime()
  );
}

export function calculateCarouselStartIndex(data: Midia[]): number {
  if (!data || data.length === 0) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const index = data.findIndex((item) => {
    if (!item.data_lancamento_api) return false;
    const releaseDate = new Date(item.data_lancamento_api);
    return !isNaN(releaseDate.getTime()) && releaseDate >= today;
  });

  return index > -1 ? index : data.length - 1;
}
