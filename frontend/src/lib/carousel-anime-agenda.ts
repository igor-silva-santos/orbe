import type { Anime } from '@/types';

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
  const start = new Date(reference);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function isDateWithinWeek(date: Date, week: WeekBounds): boolean {
  return date >= week.start && date <= week.end;
}

export function getAnimeAgendaDate(anime: Anime): Date | null {
  if (anime.nextAiringEpisode) {
    return new Date(anime.nextAiringEpisode.airingAt);
  }
  if (anime.startDate) {
    return new Date(anime.startDate.year, anime.startDate.month - 1, anime.startDate.day);
  }
  return null;
}

export function getAnimeSortTime(anime: Anime): number {
  return getAnimeAgendaDate(anime)?.getTime() ?? 0;
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

    animesByDay[agendaDate.getDay()].push(anime);
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
  const currentDayName = dayNames[reference.getDay()];
  const todayIndex = items.findIndex(
    (item) => item.type === 'separator' && item.dayName === currentDayName,
  );
  if (todayIndex > -1) return todayIndex;

  const unscheduledIndex = items.findIndex(
    (item) => item.type === 'separator' && item.dayName === ANIME_AGENDA_UNSCHEDULED_LABEL,
  );
  return unscheduledIndex > -1 ? unscheduledIndex : 0;
}
