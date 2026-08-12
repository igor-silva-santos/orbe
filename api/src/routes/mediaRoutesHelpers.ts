// Helpers e constantes compartilhados entre 2+ arquivos de rota de midia
// (filmes, series, animes, jogos, eventos, premios, home). Extraido de
// mediaRoutes.ts durante a divisao por tipo de midia — comportamento
// identico ao original, apenas movido de lugar.
import { prisma } from '../clients';
import { Prisma } from '@prisma/client';
import { filmeCarouselWhereInput, filterFilmesForCarousel } from '../qualityFilters';

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

export const getMonthDateRange = (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);
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

export const getCurrentSeason = (): 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL' => {
  const month = new Date().getMonth();
  if (month <= 2) return 'WINTER';
  if (month <= 5) return 'SPRING';
  if (month <= 8) return 'SUMMER';
  return 'FALL';
};

export const carouselLiteInclude = {
  genres: { include: { genero: true } },
  streamingProviders: { include: { provider: true }, take: 3 },
};

export async function fetchFilmesForCarousel(
  extraWhere: Prisma.FilmeWhereInput,
  options: {
    orderBy?: Prisma.FilmeOrderByWithRelationInput | Prisma.FilmeOrderByWithRelationInput[];
    take?: number;
  } = {},
) {
  const filmes = await prisma.filme.findMany({
    where: { AND: [filmeCarouselWhereInput, extraWhere] },
    orderBy: options.orderBy ?? { releaseDate: 'asc' },
    take: options.take,
    include: carouselLiteInclude,
  });
  return filterFilmesForCarousel(filmes);
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
