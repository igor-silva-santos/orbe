import { getBrazilCalendarWeekBounds } from './brazilTimezone';

export type CarouselAiring = {
  airingAt: string;
  episode: number;
};

type ScheduleRow = {
  airingAt?: Date | string | null;
  episode?: number | null;
};

function toAiring(at: Date, episode: number): CarouselAiring {
  return { airingAt: at.toISOString(), episode };
}

/**
 * Separa o próximo episódio (ainda no futuro) dos episódios que caem na semana
 * corrente no Brasil — inclusive os que já foram ao ar. O carrossel semanal
 * posiciona o título no dia desse episódio; o countdown continua no próximo.
 */
export function pickCarouselAirings(
  schedules: ScheduleRow[] | null | undefined,
  now: Date = new Date(),
): { nextAiringEpisode: CarouselAiring | null; weekAiringEpisodes: CarouselAiring[] } {
  const sorted = (schedules ?? [])
    .map((row) => {
      if (row?.airingAt == null || row.episode == null) return null;
      const at = new Date(row.airingAt);
      if (Number.isNaN(at.getTime())) return null;
      return { at, episode: row.episode };
    })
    .filter((row): row is { at: Date; episode: number } => row != null)
    .sort((a, b) => a.at.getTime() - b.at.getTime());

  const next = sorted.find((row) => row.at.getTime() > now.getTime());
  const { start, end } = getBrazilCalendarWeekBounds(now);
  const week = sorted.filter((row) => row.at >= start && row.at <= end);

  return {
    nextAiringEpisode: next ? toAiring(next.at, next.episode) : null,
    weekAiringEpisodes: week.map((row) => toAiring(row.at, row.episode)),
  };
}
