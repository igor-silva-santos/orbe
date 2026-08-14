import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Midia } from '@/types';

function releaseDateInput(value: Midia['data_lancamento_api']): string | null {
  if (!value) return null;
  if (typeof value === 'object' && value !== null && 'year' in value) {
    const d = value as { year: number; month: number; day: number };
    return `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
  }
  return String(value);
}

export function parseReleaseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, year, month, day] = match.map(Number);
    return new Date(year, month - 1, day);
  }
  const date = parseISO(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function parseMidiaReleaseDate(midia: Midia | undefined): Date | null {
  if (!midia?.data_lancamento_api) return null;
  return parseReleaseDate(releaseDateInput(midia.data_lancamento_api));
}

export function mergeMediaByDate(existing: Midia[], incoming: Midia[]): Midia[] {
  if (incoming.length === 0) return existing;
  const byId = new Map(existing.map((item) => [item.id, item]));
  for (const item of incoming) {
    byId.set(item.id, item);
  }
  return Array.from(byId.values()).sort((a, b) => {
    const aTime = parseMidiaReleaseDate(a)?.getTime() ?? Number.POSITIVE_INFINITY;
    const bTime = parseMidiaReleaseDate(b)?.getTime() ?? Number.POSITIVE_INFINITY;
    return aTime - bTime;
  });
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
  const date = parseMidiaReleaseDate(item);
  if (!date) return null;
  return monthKeyFromDate(date);
}

/** Ignora reestreias históricas fora da janela do carrossel (alinhado ao passado recente da API) */
export const CAROUSEL_TIMELINE_PAST_DAYS = 90;

export function getCarouselTimelineMinDate(reference = new Date()): Date {
  const min = new Date(reference);
  min.setHours(0, 0, 0, 0);
  min.setDate(min.getDate() - CAROUSEL_TIMELINE_PAST_DAYS);
  return min;
}

export function isCarouselTimelineDate(date: Date, reference = new Date()): boolean {
  return date >= getCarouselTimelineMinDate(reference);
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

export function findIndexForMonth(items: Midia[], year: number, month: number): number {
  const targetKey = monthKeyFromDate(new Date(year, month - 1, 1));
  const exact = items.findIndex((item) => monthKeyFromItem(item) === targetKey);
  if (exact !== -1) return exact;

  const targetDate = new Date(year, month - 1, 1);
  return items.findIndex((item) => {
    const releaseDate = parseMidiaReleaseDate(item);
    return releaseDate !== null && releaseDate >= targetDate;
  });
}

/** Posiciona o carrossel no próximo lançamento (primeiro com data >= hoje). Retorna -1 se não houver. */
export function calculateCarouselStartIndex(data: Midia[]): number {
  if (!data || data.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minTimeline = getCarouselTimelineMinDate(today);

  const nextRelease = data.findIndex((item) => {
    const releaseDate = parseMidiaReleaseDate(item);
    return (
      releaseDate !== null &&
      isCarouselTimelineDate(releaseDate, today) &&
      releaseDate >= today
    );
  });
  if (nextRelease >= 0) return nextRelease;

  return -1;
}

export function resolveCarouselStartIndex(data: Midia[]): number {
  const next = calculateCarouselStartIndex(data);
  return next >= 0 ? next : 0;
}

/** Mês (YYYY-MM) do próximo lançamento >= hoje presente nos dados, ou mês atual se nenhum futuro */
export function resolveCarouselOpenMonthKey(data: Midia[]): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextIdx = calculateCarouselStartIndex(data);
  if (nextIdx >= 0) {
    const monthKey = monthKeyFromItem(data[nextIdx]);
    if (monthKey) return monthKey;
  }

  return monthKeyFromDate(today);
}

/** Índice do primeiro slide do mês-alvo (início do mês na timeline). Retorna -1 se o mês não existir nos dados. */
export function resolveIndexForMonthKey(data: Midia[], monthKey: string): number {
  const { year, month } = parseMonthKey(monthKey);
  return findIndexForMonth(data, year, month);
}

/** Índice de abertura: próximo lançamento >= hoje; senão início do mês atual nos dados */
export function resolveCarouselOpenIndex(data: Midia[]): number {
  if (!data.length) return 0;

  const nextIdx = calculateCarouselStartIndex(data);
  if (nextIdx >= 0) return nextIdx;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonthKey = monthKeyFromDate(today);
  const openMonthKey = resolveCarouselOpenMonthKey(data);
  const monthStartIdx = resolveIndexForMonthKey(data, openMonthKey);
  if (monthStartIdx >= 0) return monthStartIdx;

  for (let i = data.length - 1; i >= 0; i--) {
    const releaseDate = parseMidiaReleaseDate(data[i]);
    if (!releaseDate || !isCarouselTimelineDate(releaseDate, today)) continue;
    if (monthKeyFromItem(data[i]) === currentMonthKey) return i;
  }

  for (let i = data.length - 1; i >= 0; i--) {
    const releaseDate = parseMidiaReleaseDate(data[i]);
    if (releaseDate && isCarouselTimelineDate(releaseDate, today)) return i;
  }

  return data.length - 1;
}

/** Indica se o índice de abertura aponta para lançamento >= hoje (dados suficientes) */
export function isCarouselOpenIndexReady(data: Midia[], index: number): boolean {
  if (!data.length) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextIdx = calculateCarouselStartIndex(data);
  if (nextIdx >= 0) {
    const release = parseMidiaReleaseDate(data[nextIdx]);
    return release !== null && release >= today && index === nextIdx;
  }

  const item = data[index];
  const itemMonth = monthKeyFromItem(item);
  const currentMonthKey = monthKeyFromDate(today);
  if (itemMonth === currentMonthKey) return true;

  const release = parseMidiaReleaseDate(item);
  return release !== null && release >= today;
}

export function formatCarouselMonthTitle(date: Date): string {
  const title = format(date, "'Lançamentos de' MMMM 'de' yyyy", { locale: ptBR });
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export function monthTitleFromItem(item: Midia | undefined): string | null {
  const date = parseMidiaReleaseDate(item);
  if (!date) return null;
  try {
    return formatCarouselMonthTitle(date);
  } catch {
    return null;
  }
}

export function currentMonthCarouselTitle(): string {
  const now = new Date();
  return formatCarouselMonthTitle(new Date(now.getFullYear(), now.getMonth(), 1));
}

/** Remove reestreias históricas fora da janela do carrossel (últimos 90 dias → futuro). */
export function isMidiaInCarouselTimeline(item: Midia | undefined, reference = new Date()): boolean {
  const releaseDate = parseMidiaReleaseDate(item);
  return releaseDate !== null && isCarouselTimelineDate(releaseDate, reference);
}

export function filterMidiaForCarouselTimeline(items: Midia[], reference = new Date()): Midia[] {
  return items.filter((item) => isMidiaInCarouselTimeline(item, reference));
}

export function hasCarouselMonthData(items: Midia[], monthKey: string): boolean {
  return items.some((item) => monthKeyFromItem(item) === monthKey);
}

/** Dados suficientes para revelar o carrossel após o bootstrap do mês atual. */
export function isCarouselBootstrapReady(items: Midia[], reference = new Date()): boolean {
  if (!items.length) return false;

  const today = new Date(reference);
  today.setHours(0, 0, 0, 0);
  const targetMonthKey = monthKeyFromDate(today);

  if (!hasCarouselMonthData(items, targetMonthKey)) return false;

  const index = resolveCarouselOpenIndex(items);
  return isCarouselOpenIndexReady(items, index);
}
