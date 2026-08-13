import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Midia } from '@/types';

export function parseReleaseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  // Datas só com dia (YYYY-MM-DD) usam calendário local — evita setembro virar agosto no fuso BR
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  const date = parseISO(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

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

export function parseMonthKey(key: string): { year: number; month: number } {
  const [year, month] = key.split('-').map(Number);
  return { year, month };
}

export function addMonths(year: number, month: number, delta: number): { year: number; month: number } {
  const date = new Date(year, month - 1 + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

export function monthKeyFromItem(item: Midia | undefined): string | null {
  const date = parseReleaseDate(item?.data_lancamento_api);
  if (!date) return null;
  return monthKeyFromDate(date);
}

/** Índices do primeiro e último item de um mês na lista ordenada */
export function findMonthBounds(
  items: Midia[],
  monthKey: string
): { start: number; end: number } | null {
  let start = -1;
  let end = -1;
  for (let index = 0; index < items.length; index++) {
    const key = monthKeyFromItem(items[index]);
    if (key !== monthKey) continue;
    if (start === -1) start = index;
    end = index;
  }
  if (start === -1) return null;
  return { start, end };
}

export function calculateCarouselStartIndex(data: Midia[]): number {
  if (!data || data.length === 0) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const index = data.findIndex((item) => {
    const releaseDate = parseReleaseDate(item.data_lancamento_api);
    return releaseDate !== null && releaseDate >= today;
  });

  return index > -1 ? index : data.length - 1;
}

export function findIndexForMonth(items: Midia[], year: number, month: number): number {
  const targetKey = monthKeyFromDate(new Date(year, month - 1, 1));
  const exact = items.findIndex((item) => monthKeyFromItem(item) === targetKey);
  if (exact !== -1) return exact;

  const targetDate = new Date(year, month - 1, 1);
  return items.findIndex((item) => {
    const releaseDate = parseReleaseDate(item.data_lancamento_api);
    return releaseDate !== null && releaseDate >= targetDate;
  });
}

export function formatCarouselMonthTitle(date: Date): string {
  const title = format(date, "'Lançamentos de' MMMM 'de' yyyy", { locale: ptBR });
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export function monthTitleFromItem(item: Midia | undefined): string | null {
  const date = parseReleaseDate(item?.data_lancamento_api);
  if (!date) return null;
  try {
    return formatCarouselMonthTitle(date);
  } catch {
    return null;
  }
}
