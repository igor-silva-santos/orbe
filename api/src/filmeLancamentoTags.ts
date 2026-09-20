import { prisma } from './clients';
import { calendarDateKeyFromValue, getCalendarDateKeyInBr } from './calendarBr';
import {
  ANTECIPACAO_HORIZON_DAYS,
  sortFilmesByAntecipacaoScore,
  type FilmeAntecipacaoCandidate,
} from './filmeAntecipacao';
import { filmeCarouselLocalizationFilter, filmeCarouselQualityFilter } from './qualityFilters';
import { fetchFilmesForCarousel, CAROUSEL_ITEM_LIMIT, cardListInclude } from './routes/mediaRoutesHelpers';

export type FilmeDestaquePill = 'estreia_semana' | 'mais_esperado';

export type FilmeDestaqueFields = {
  estreia_semana: boolean;
  mais_esperado: boolean;
  destaque_pill: FilmeDestaquePill | null;
};

type FilmeDestaqueInput = {
  tmdbId: number;
  releaseDate?: Date | string | null;
};

/** Semana de calendário BR (domingo → sábado), em chaves YYYY-MM-DD. */
export function getBrWeekRangeKeys(now: Date = new Date()): { start: string; end: string } {
  const todayKey = getCalendarDateKeyInBr(now);
  const [year, month, day] = todayKey.split('-').map(Number);
  const anchor = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = anchor.getUTCDay();
  const start = new Date(anchor);
  start.setUTCDate(anchor.getUTCDate() - dayOfWeek);
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);

  const toKey = (d: Date) =>
    `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;

  return { start: toKey(start), end: toKey(end) };
}

export function calendarKeyToUtcDate(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0));
}

export function isFilmeEstreiaSemanaBr(
  releaseDate: Date | string | null | undefined,
  now: Date = new Date(),
): boolean {
  const releaseKey = calendarDateKeyFromValue(releaseDate);
  if (!releaseKey) return false;
  const { start, end } = getBrWeekRangeKeys(now);
  return releaseKey >= start && releaseKey <= end;
}

export function buildMaisEsperadoTmdbIdSet<T extends FilmeAntecipacaoCandidate & { tmdbId: number }>(
  filmes: T[],
  now: Date = new Date(),
  limit = 40,
): Set<number> {
  const ranked = sortFilmesByAntecipacaoScore(filmes, now).slice(0, limit);
  return new Set(ranked.map((f) => f.tmdbId));
}

export async function loadMaisEsperadoTmdbIds(
  now: Date = new Date(),
  limit = 40,
): Promise<Set<number>> {
  const horizon = new Date(now);
  horizon.setDate(horizon.getDate() + ANTECIPACAO_HORIZON_DAYS);
  const filmes = await fetchFilmesForCarousel(
    { releaseDate: { gte: now, lte: horizon } },
    { take: CAROUSEL_ITEM_LIMIT, homeLaunch: true },
  );
  return buildMaisEsperadoTmdbIdSet(filmes, now, limit);
}

export function resolveFilmeDestaqueFields(
  filme: FilmeDestaqueInput,
  options: {
    maisEsperadoIds: Set<number>;
    allowEstreiaSemana: boolean;
    now?: Date;
  },
): FilmeDestaqueFields {
  const now = options.now ?? new Date();
  const estreia_semana =
    options.allowEstreiaSemana && isFilmeEstreiaSemanaBr(filme.releaseDate, now);
  const mais_esperado = options.maisEsperadoIds.has(filme.tmdbId);
  const destaque_pill: FilmeDestaquePill | null = estreia_semana
    ? 'estreia_semana'
    : mais_esperado
      ? 'mais_esperado'
      : null;

  return { estreia_semana, mais_esperado, destaque_pill };
}

export async function loadEstreiasSemanaFilmes(now: Date = new Date()) {
  const { start, end } = getBrWeekRangeKeys(now);
  const startDate = calendarKeyToUtcDate(start);
  const endDate = calendarKeyToUtcDate(end);
  endDate.setUTCHours(23, 59, 59, 999);

  return prisma.filme.findMany({
    where: {
      AND: [
        filmeCarouselQualityFilter,
        filmeCarouselLocalizationFilter,
        { releaseDate: { gte: startDate, lte: endDate } },
      ],
    },
    orderBy: { releaseDate: 'asc' },
    take: 24,
    include: cardListInclude,
  });
}
