import { getBrazilCalendarWeekBounds, getWeekdayInBrazil } from './brazilTimezone';

export type CarouselAiring = {
  airingAt: string;
  episode: number;
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
/** Folga sobre 7 dias para relógio/fuso, sem tratar quinzena como semanal. */
const WEEKLY_BACKFILL_MAX_GAP_MS = 8 * 24 * 60 * 60 * 1000;

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

  // O sync antigo guardava só o que ainda não tinha ido ao ar. Segunda–quarta
  // somem do carrossel porque o único horário no banco é o da semana que vem.
  // Se esse próximo episódio é daqui a até 8 dias, o desta semana já passou
  // no mesmo dia e horário.
  if (
    next &&
    next.episode > 1 &&
    next.at.getTime() - now.getTime() <= WEEKLY_BACKFILL_MAX_GAP_MS
  ) {
    const previousAt = new Date(next.at.getTime() - WEEK_MS);
    const previousDay = getWeekdayInBrazil(previousAt);
    const alreadyHaveDay = week.some((row) => getWeekdayInBrazil(row.at) === previousDay);
    if (
      !alreadyHaveDay &&
      previousAt.getTime() <= now.getTime() &&
      previousAt >= start &&
      previousAt <= end
    ) {
      week.push({ at: previousAt, episode: next.episode - 1 });
      week.sort((a, b) => a.at.getTime() - b.at.getTime());
    }
  }

  return {
    nextAiringEpisode: next ? toAiring(next.at, next.episode) : null,
    weekAiringEpisodes: week.map((row) => toAiring(row.at, row.episode)),
  };
}
