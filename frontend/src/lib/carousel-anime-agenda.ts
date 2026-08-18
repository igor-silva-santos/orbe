import type { Anime } from '@/types';
import { brazilLocalToUtc, getBrazilCalendarWeekBounds, getWeekdayInBrazil } from '@/lib/brazil-timezone';

export const ANIME_AGENDA_UNSCHEDULED_LABEL = 'Sem episódio agendado';

export type AnimeAgendaItem =
  | { type: 'media'; data: Anime }
  | { type: 'separator'; dayName: string };

export interface WeekBounds {
  start: Date;
  end: Date;
}

const DAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const;

export function getCalendarWeekBounds(reference: Date = new Date()): WeekBounds {
  return getBrazilCalendarWeekBounds(reference);
}

export function isDateWithinWeek(date: Date, week: WeekBounds): boolean {
  return date >= week.start && date <= week.end;
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

export function mergeAnimesById(primary: Anime[], extra: Anime[]): Anime[] {
  const byId = new Map<number, Anime>();
  for (const anime of primary) byId.set(anime.id, anime);
  for (const anime of extra) {
    if (!byId.has(anime.id)) byId.set(anime.id, anime);
  }
  return Array.from(byId.values());
}

export function flattenGroupedSchedule(grouped: Record<string | number, Anime[]>): Anime[] {
  const merged: Anime[] = [];
  const seen = new Set<number>();
  for (const key of Object.keys(grouped)) {
    for (const anime of grouped[key] ?? []) {
      if (!seen.has(anime.id)) {
        seen.add(anime.id);
        merged.push(anime);
      }
    }
  }
  return merged;
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
