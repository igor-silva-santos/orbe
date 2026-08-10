import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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

export function findIndexForMonth(items: Midia[], year: number, month: number): number {
  const targetDate = new Date(year, month - 1, 1);
  return items.findIndex((item) => {
    if (!item.data_lancamento_api) return false;
    const releaseDate = new Date(item.data_lancamento_api);
    return !isNaN(releaseDate.getTime()) && releaseDate >= targetDate;
  });
}

export function formatCarouselMonthTitle(date: Date): string {
  const title = format(date, "'Lançamentos de' MMMM 'de' yyyy", { locale: ptBR });
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export function monthTitleFromItem(item: Midia | undefined): string | null {
  if (!item?.data_lancamento_api) return null;
  try {
    const date = new Date(item.data_lancamento_api);
    if (isNaN(date.getTime())) return null;
    return formatCarouselMonthTitle(date);
  } catch {
    return null;
  }
}
