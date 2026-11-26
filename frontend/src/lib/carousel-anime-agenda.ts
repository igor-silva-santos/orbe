import type { Anime } from '@/types';
import { brazilLocalToUtc, getBrazilCalendarWeekBounds, getWeekdayInBrazil } from '@/lib/brazil-timezone';
import { getWeekBoundsBr, isYmdInRange, ymdInBr } from '@/lib/week-br';

export const ANIME_AGENDA_UNSCHEDULED_LABEL = 'Sem episódio agendado';

export type AnimeAgendaItem =
  | { type: 'media'; data: Anime }
  | { type: 'separator'; dayName: string };

export interface WeekBounds {
  start: Date;
  end: Date;
}

const DAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
/** Folga sobre 7 dias para relógio/fuso, sem tratar quinzena como semanal. */
const WEEKLY_BACKFILL_MAX_GAP_MS = 8 * 24 * 60 * 60 * 1000;

export function getCalendarWeekBounds(reference: Date = new Date()): WeekBounds {
  return getBrazilCalendarWeekBounds(reference);
}

export function isDateWithinWeek(date: Date, week: WeekBounds): boolean {
  return date >= week.start && date <= week.end;
}

type PlacementAiring = { airingAt: string; episode: number };

/**
 * Quando o banco só tem o episódio da semana que vem, o desta semana já foi
 * ao ar 7 dias antes — desde que não seja estreia e o horário caia nesta semana.
 */
function inferAiredEpisodeThisWeek(next: PlacementAiring, reference: Date): PlacementAiring | null {
  if (next.episode <= 1) return null;
  const nextAt = new Date(next.airingAt);
  if (Number.isNaN(nextAt.getTime())) return null;
  const untilNext = nextAt.getTime() - reference.getTime();
  if (untilNext < 0 || untilNext > WEEKLY_BACKFILL_MAX_GAP_MS) return null;

  const previousAt = new Date(nextAt.getTime() - WEEK_MS);
  if (previousAt.getTime() > reference.getTime()) return null;
  const { startYmd, endYmd } = getWeekBoundsBr(reference);
  if (!isYmdInRange(ymdInBr(previousAt), startYmd, endYmd)) return null;

  return { airingAt: previousAt.toISOString(), episode: next.episode - 1 };
}

/** Episódios que posicionam o título na semana. Prefere os da semana corrente, já exibidos ou não. */
export function getWeekPlacementAirings(anime: Anime, reference: Date = new Date()): PlacementAiring[] {
  const fromWeek = (anime.weekAiringEpisodes ?? []).filter((entry) => Boolean(entry?.airingAt));
  if (fromWeek.length > 0) return fromWeek;
  if (anime.weekAiringEpisode?.airingAt) return [anime.weekAiringEpisode];

  const next = anime.nextAiringEpisode;
  if (!next?.airingAt) return [];

  const nextAt = new Date(next.airingAt);
  if (Number.isNaN(nextAt.getTime())) return [];
  const { startYmd, endYmd } = getWeekBoundsBr(reference);
  if (isYmdInRange(ymdInBr(nextAt), startYmd, endYmd)) return [next];

  const inferred = inferAiredEpisodeThisWeek(next, reference);
  return inferred ? [inferred] : [];
}

/**
 * Agrupa cada título no dia brasileiro em que o episódio da semana vai (ou foi) ao ar.
 * Um anime diário pode ocupar mais de um dia; o mesmo dia não repete o título.
 */
export function groupAnimesByBrazilWeekDay(
  animes: Anime[],
  reference: Date = new Date(),
): Record<number, Anime[]> {
  const { startYmd, endYmd } = getWeekBoundsBr(reference);
  const animesByDay: Record<number, Anime[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

  for (const anime of animes) {
    const seenDays = new Set<number>();
    for (const placement of getWeekPlacementAirings(anime, reference)) {
      const at = new Date(placement.airingAt);
      if (Number.isNaN(at.getTime())) continue;
      if (!isYmdInRange(ymdInBr(at), startYmd, endYmd)) continue;
      const dayIndex = getWeekdayInBrazil(at);
      if (seenDays.has(dayIndex)) continue;
      seenDays.add(dayIndex);
      animesByDay[dayIndex].push({
        ...anime,
        nextAiringEpisode: placement,
      });
    }
  }

  return animesByDay;
}

export function getAnimeAgendaDate(anime: Anime): Date | null {
  if (anime.nextAiringEpisode) {
    return new Date(anime.nextAiringEpisode.airingAt);
  }
  if (anime.startDate) {
    return brazilLocalToUtc(
      anime.startDate.year,
      anime.startDate.month,
      anime.startDate.day,
      12,
      0,
      0,
    );
  }
  return null;
}

export function getAnimeSortTime(anime: Anime): number {
  return getAnimeAgendaDate(anime)?.getTime() ?? 0;
}

export function buildWeeklyItemsFromSchedule(
  grouped: Record<string | number, import('@/types').Anime[]>,
  dayNames: readonly string[] = DAY_NAMES,
): AnimeAgendaItem[] {
  const items: AnimeAgendaItem[] = [];

  for (let dayIndex = 0; dayIndex <= 6; dayIndex += 1) {
    const animes = grouped[dayIndex] ?? grouped[String(dayIndex)] ?? [];
    if (animes.length === 0) continue;

    items.push({ type: 'separator', dayName: dayNames[dayIndex] });
    const sorted = [...animes].sort((a, b) => getAnimeSortTime(a) - getAnimeSortTime(b));
    for (const anime of sorted) {
      items.push({ type: 'media', data: anime });
    }
  }

  return items;
}

export function filterWeeklyAgendaByGenre(items: AnimeAgendaItem[], genre: string): AnimeAgendaItem[] {
  const filtered: AnimeAgendaItem[] = [];
  let index = 0;

  while (index < items.length) {
    const item = items[index];
    if (item.type !== 'separator') {
      index += 1;
      continue;
    }

    const dayName = item.dayName;
    index += 1;
    const sectionMedia: AnimeAgendaItem[] = [];
    while (index < items.length && items[index].type !== 'separator') {
      const media = items[index];
      if (media.type === 'media' && media.data.generos_api?.includes(genre)) {
        sectionMedia.push(media);
      }
      index += 1;
    }

    if (sectionMedia.length > 0) {
      filtered.push({ type: 'separator', dayName });
      filtered.push(...sectionMedia);
    }
  }

  return filtered;
}

export function buildWeeklyAnimeAgendaItems(
  animes: Anime[],
  dayNames: readonly string[] = DAY_NAMES,
  week: WeekBounds = getCalendarWeekBounds(),
): AnimeAgendaItem[] {
  const animesByDay: Record<number, Anime[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  const unscheduled: Anime[] = [];

  for (const anime of animes) {
    const agendaDate = getAnimeAgendaDate(anime);
    if (!agendaDate) {
      unscheduled.push(anime);
      continue;
    }

    if (!isDateWithinWeek(agendaDate, week)) {
      if (!anime.nextAiringEpisode) {
        unscheduled.push(anime);
      }
      continue;
    }

    animesByDay[getWeekdayInBrazil(agendaDate)].push(anime);
  }

  const items: AnimeAgendaItem[] = [];

  for (let dayIndex = 0; dayIndex <= 6; dayIndex += 1) {
    const animesForDay = animesByDay[dayIndex];
    if (animesForDay.length === 0) continue;

    items.push({ type: 'separator', dayName: dayNames[dayIndex] });
    animesForDay.sort((a, b) => getAnimeSortTime(a) - getAnimeSortTime(b));
    for (const anime of animesForDay) {
      items.push({ type: 'media', data: anime });
    }
  }

  if (unscheduled.length > 0) {
    items.push({ type: 'separator', dayName: ANIME_AGENDA_UNSCHEDULED_LABEL });
    unscheduled.sort((a, b) => getAnimeSortTime(a) - getAnimeSortTime(b));
    for (const anime of unscheduled) {
      items.push({ type: 'media', data: anime });
    }
  }

  return items;
}

export function resolveWeeklyAgendaStartIndex(
  items: AnimeAgendaItem[],
  dayNames: readonly string[] = DAY_NAMES,
  reference: Date = new Date(),
): number {
  const currentDay = getWeekdayInBrazil(reference);

  for (let offset = 0; offset <= 6; offset += 1) {
    const dayIndex = (currentDay + offset) % 7;
    const dayName = dayNames[dayIndex];
    const idx = items.findIndex(
      (item) => item.type === 'separator' && item.dayName === dayName,
    );
    if (idx > -1) return idx;
  }

  for (let offset = 1; offset <= currentDay; offset += 1) {
    const dayIndex = currentDay - offset;
    const dayName = dayNames[dayIndex];
    const idx = items.findIndex(
      (item) => item.type === 'separator' && item.dayName === dayName,
    );
    if (idx > -1) return idx;
  }

  const unscheduledIndex = items.findIndex(
    (item) => item.type === 'separator' && item.dayName === ANIME_AGENDA_UNSCHEDULED_LABEL,
  );
  return unscheduledIndex > -1 ? unscheduledIndex : 0;
}
