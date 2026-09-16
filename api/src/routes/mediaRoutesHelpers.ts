// Helpers e constantes compartilhados entre 2+ arquivos de rota de midia
// (filmes, series, animes, jogos, eventos, premios, home). Extraido de
// mediaRoutes.ts durante a divisao por tipo de midia — comportamento
// identico ao original, apenas movido de lugar.
import { prisma } from '../clients';
import { Prisma } from '@prisma/client';
import {
  filmeCarouselBalancedWhereInput,
  filterFilmesForCarouselBalanced,
} from '../qualityFilters';

export const TWELVE_HOURS = 43200;
export const TWENTY_FOUR_HOURS = 86400;
export const CAROUSEL_ITEM_LIMIT = 500;
export const DEFAULT_LIST_LIMIT = 48;
export const MAX_LIST_LIMIT = 200;

export const DETAILS_CACHE_SECONDS = 300;

export const parsePagination = (query: { page?: string; limit?: string }) => {
  const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
  const limit = Math.min(MAX_LIST_LIMIT, Math.max(1, parseInt(query.limit ?? String(DEFAULT_LIST_LIMIT), 10) || DEFAULT_LIST_LIMIT));
  return { page, limit, skip: (page - 1) * limit };
};

export const parsePositiveIntId = (raw: string): number | null => {
  if (!/^\d+$/.test(raw)) return null;
  const id = parseInt(raw, 10);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
};

// F-07: extrai os anos distintos direto no Postgres com EXTRACT(YEAR FROM ...) em vez
// de trazer uma linha por data distinta (potencialmente dezenas de milhares) so pra
// pegar getFullYear() em JS depois. `table` e `column` sao sempre literais internos
// (nunca entrada do usuario), entao interpolar via Prisma.raw aqui e seguro.
export const getDistinctYears = async (table: 'Filme' | 'Serie' | 'Jogo', column: string): Promise<number[]> => {
  const col = Prisma.raw(`"${column}"`);
  const tbl = Prisma.raw(`"${table}"`);
  const rows = await prisma.$queryRaw<{ year: number }[]>(Prisma.sql`
    SELECT DISTINCT EXTRACT(YEAR FROM ${col})::int as year
    FROM ${tbl}
    WHERE ${col} IS NOT NULL
    ORDER BY year DESC
  `);
  return rows.map((r) => r.year);
};

/** Limites do mês em UTC — alinha com datas YYYY-MM-DD armazenadas sem deslocar o mês no servidor */
export const getMonthDateRange = (year: number, month: number) => {
  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
  return { startDate, endDate };
};

export const parseMonthQuery = (mes: string | undefined, ano: string | undefined): { startDate: Date; endDate: Date } | null => {
  const month = parseInt(mes ?? '', 10);
  if (!month || month < 1 || month > 12) return null;
  const year = ano && ano !== 'todos' ? parseInt(ano, 10) : new Date().getFullYear();
  if (!year) return null;
  return getMonthDateRange(year, month);
};

export const parseYearMonthQuery = (query: { year?: string; month?: string }) => {
  const year = parseInt(query.year ?? '', 10);
  const month = parseInt(query.month ?? '', 10);
  if (!year || !month || month < 1 || month > 12) {
    return null;
  }
  return { year, month };
};

/** Ano isolado para rotas year-tbd (lançamentos só com ano) */
export const parseCarouselYearQuery = (query: { year?: string }): number | null => {
  const year = parseInt(query.year ?? '', 10);
  if (!year || year < 1900 || year > 2100) return null;
  return year;
};

export const getCurrentSeason = (): 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL' => {
  const month = new Date().getMonth();
  if (month <= 2) return 'WINTER';
  if (month <= 5) return 'SPRING';
  if (month <= 8) return 'SUMMER';
  return 'FALL';
};

const carouselMediaBaseInclude = {
  genres: { include: { genero: true } },
  streamingProviders: { include: { provider: true }, take: 3 },
} as const;

/** Include de carrossel para filmes (inclui saga/coleção TMDB) */
export const filmeCarouselLiteInclude = {
  ...carouselMediaBaseInclude,
  collection: { select: { id: true, name: true } },
};

/** Include de carrossel para séries — temporadas recentes para data de próxima estreia */
export const serieCarouselLiteInclude = {
  ...carouselMediaBaseInclude,
  seasons: {
    where: { seasonNumber: { gt: 0 }, airDate: { not: null } },
    orderBy: { airDate: 'desc' as const },
    take: 6,
    select: { airDate: true, seasonNumber: true },
  },
};

/** Filtro por mês no carrossel: estreia, temporada, último ou próximo episódio no intervalo */
export const serieCarouselDateInRange = (
  startDate: Date,
  endDate: Date,
): Prisma.SerieWhereInput => ({
  OR: [
    { firstAirDate: { gte: startDate, lte: endDate } },
    { lastAirDate: { gte: startDate, lte: endDate } },
    { nextEpisodeAirDate: { gte: startDate, lte: endDate } },
    {
      seasons: {
        some: {
          seasonNumber: { gt: 0 },
          airDate: { gte: startDate, lte: endDate },
        },
      },
    },
  ],
});

/** @deprecated Use filmeCarouselLiteInclude ou serieCarouselLiteInclude conforme o tipo */
export const carouselLiteInclude = filmeCarouselLiteInclude;

/** Include mínimo para cards em listagens e resumos (gêneros + até 4 provedores + saga). */
export const cardListInclude = {
  genres: { include: { genero: true } },
  streamingProviders: { include: { provider: true }, take: 4 },
  collection: { select: { id: true, name: true } },
};

export async function fetchFilmesForCarousel(
  extraWhere: Prisma.FilmeWhereInput,
  options: {
    orderBy?: Prisma.FilmeOrderByWithRelationInput | Prisma.FilmeOrderByWithRelationInput[];
    take?: number;
    /** Mantido por compatibilidade — o filtro equilibrado não depende do ano */
    year?: number;
  } = {},
) {
  const filmes = await prisma.filme.findMany({
    where: {
      AND: [filmeCarouselBalancedWhereInput, extraWhere],
    },
    orderBy: options.orderBy ?? { releaseDate: 'asc' },
    take: options.take,
    include: carouselLiteInclude,
  });
  return filterFilmesForCarouselBalanced(filmes);
}

/** Mescla listas de carrossel por data ascendente, deduplicando por tmdbId */
export function mergeCarouselRowsByDateAsc<T extends { tmdbId: number; releaseDate?: Date | string | null }>(
  priority: T[],
  past: T[],
  limit: number,
): T[] {
  const seen = new Set<number>();
  const merged: T[] = [];

  for (const item of priority) {
    if (seen.has(item.tmdbId)) continue;
    seen.add(item.tmdbId);
    merged.push(item);
  }

  for (const item of past) {
    if (merged.length >= limit) break;
    if (seen.has(item.tmdbId)) continue;
    seen.add(item.tmdbId);
    merged.push(item);
  }

  return merged
    .slice(0, limit)
    .sort((a, b) => {
      const aTime = a.releaseDate ? new Date(a.releaseDate).getTime() : Number.POSITIVE_INFINITY;
      const bTime = b.releaseDate ? new Date(b.releaseDate).getTime() : Number.POSITIVE_INFINITY;
      return aTime - bTime;
    });
}

export function mergeCarouselRowsByFirstReleaseDateAsc<T extends { igdbId: number; firstReleaseDate?: Date | string | null }>(
  priority: T[],
  past: T[],
  limit: number,
): T[] {
  const seen = new Set<number>();
  const merged: T[] = [];

  for (const item of priority) {
    if (seen.has(item.igdbId)) continue;
    seen.add(item.igdbId);
    merged.push(item);
  }

  for (const item of past) {
    if (merged.length >= limit) break;
    if (seen.has(item.igdbId)) continue;
    seen.add(item.igdbId);
    merged.push(item);
  }

  return merged
    .slice(0, limit)
    .sort((a, b) => {
      const aTime = a.firstReleaseDate ? new Date(a.firstReleaseDate).getTime() : Number.POSITIVE_INFINITY;
      const bTime = b.firstReleaseDate ? new Date(b.firstReleaseDate).getTime() : Number.POSITIVE_INFINITY;
      return aTime - bTime;
    });
}

/** Recorta a lista ordenada por data: N itens antes de hoje + N a partir de hoje. */
export function pickAroundToday<T>(
  items: T[],
  getDate: (item: T) => Date | null,
  pastTake: number,
  futureTake: number,
  reference = new Date(),
): T[] {
  const today = new Date(reference);
  today.setHours(0, 0, 0, 0);

  const dated = items
    .map((item) => ({ item, date: getDate(item) }))
    .filter((row): row is { item: T; date: Date } => row.date != null)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const past = dated.filter((row) => row.date < today).slice(-pastTake);
  const future = dated.filter((row) => row.date >= today).slice(0, futureTake);
  return [...past, ...future].map((row) => row.item);
}

export const animeCarouselInclude = {
  genres: { include: { genero: true } },
  streamingLinks: { take: 5 },
  externalLinks: { take: 12 },
  airingSchedule: {
    where: { airingAt: { gte: new Date() } },
    orderBy: { airingAt: 'asc' as const },
    take: 1,
  },
};
