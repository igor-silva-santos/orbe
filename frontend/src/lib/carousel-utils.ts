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

export function monthKeyFromDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function adjacentMonthKeys(year: number, month: number): string[] {
  const prev = new Date(year, month - 2, 1);
  const current = new Date(year, month - 1, 1);
  const next = new Date(year, month, 1);
  return [monthKeyFromDate(prev), monthKeyFromDate(current), monthKeyFromDate(next)];
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
