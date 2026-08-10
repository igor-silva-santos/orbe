import { Router } from 'express';
import { prisma } from './clients';
import { Prisma } from '@prisma/client';
import { mapFilmeToMidia, mapSerieToMidia, mapAnimeToMidia, mapJogoToMidia, mapFilmeToCarouselCard, mapSerieToCarouselCard, mapAnimeToCarouselCard, mapJogoToCarouselCard, mapEventToResponse, normalizeSearchText, withPortugueseTranslation, matchesPremiacaoFilters } from './mappers';
import { fetchFilmeDetailsLive, fetchSerieDetailsLive, fetchAnimeDetailsLive, fetchJogoDetailsLive } from './externalDetails';
import {
  filmeQualityFilter,
  filmeCarouselWhereInput,
  filterFilmesForCarousel,
  serieQualityFilter,
  animeQualityFilter,
  animeSeasonQualityFilter,
  jogoQualityFilter,
  getFilmeQualityFilterForYear,
} from './qualityFilters';
import { logger } from './logger';
import cacheMiddleware from './cacheMiddleware';
import adminMiddleware from './adminMiddleware';
import { invalidateMediaCaches } from './cacheInvalidation';
import { translateTmdbStatus, translateAnimeStatusLabel } from './statusLabels';
import { searchRateLimiter, homepageRateLimiter } from './securityMiddleware';



const router = Router();

const TWELVE_HOURS = 43200;
const TWENTY_FOUR_HOURS = 86400;
const CAROUSEL_ITEM_LIMIT = 500;
const HOMEPAGE_ITEM_LIMIT = 200;
const DEFAULT_LIST_LIMIT = 48;
const MAX_LIST_LIMIT = 200;

const parsePagination = (query: { page?: string; limit?: string }) => {
  const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
  const limit = Math.min(MAX_LIST_LIMIT, Math.max(1, parseInt(query.limit ?? String(DEFAULT_LIST_LIMIT), 10) || DEFAULT_LIST_LIMIT));
  return { page, limit, skip: (page - 1) * limit };
};

const parseMonthQuery = (mes: string | undefined, ano: string | undefined): { startDate: Date; endDate: Date } | null => {
  const month = parseInt(mes ?? '', 10);
  if (!month || month < 1 || month > 12) return null;
  const year = ano && ano !== 'todos' ? parseInt(ano, 10) : new Date().getFullYear();
  if (!year) return null;
  return getMonthDateRange(year, month);
};

/** Janela inicial: mês anterior até +4 meses à frente (ago → dez) */
const getHomepageDateWindow = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 5, 0, 23, 59, 59, 999);
  return { start, end };
};

const carouselLiteInclude = {
  genres: { include: { genero: true } },
  streamingProviders: { include: { provider: true }, take: 3 },
};

async function fetchFilmesForCarousel(
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

const animeCarouselInclude = {
  genres: { include: { genero: true } },
  streamingLinks: { take: 3 },
  airingSchedule: {
    where: { airingAt: { gte: new Date() } },
    orderBy: { airingAt: 'asc' as const },
    take: 1,
  },
};

const getCurrentSeason = (): 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL' => {
  const month = new Date().getMonth();
  if (month <= 2) return 'WINTER';
  if (month <= 5) return 'SPRING';
  if (month <= 8) return 'SUMMER';
  return 'FALL';
};

const getMonthDateRange = (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);
  return { startDate, endDate };
};

const parseYearMonthQuery = (query: { year?: string; month?: string }) => {
  const year = parseInt(query.year ?? '', 10);
  const month = parseInt(query.month ?? '', 10);
  if (!year || !month || month < 1 || month > 12) {
    return null;
  }
  return { year, month };
};

// Homepage — payload leve: janela de ~4 meses centrada no período atual
router.get('/homepage', homepageRateLimiter, cacheMiddleware(TWELVE_HOURS), async (_req, res) => {
  const year = new Date().getFullYear();
  const season = getCurrentSeason();
  const { start: windowStart, end: windowEnd } = getHomepageDateWindow();

  try {
    const [filmesRaw, series, jogos, animes] = await Promise.all([
      fetchFilmesForCarousel(
        {
          OR: [
            { releaseDate: { gte: windowStart, lte: windowEnd } },
            {
              AND: [
                { emCartaz: true },
                { releaseDate: { lte: windowEnd } },
              ],
            },
          ],
        },
        { orderBy: { releaseDate: 'asc' }, take: HOMEPAGE_ITEM_LIMIT },
      ),
      prisma.serie.findMany({
        where: { AND: [serieQualityFilter, { firstAirDate: { gte: windowStart, lte: windowEnd } }] },
        orderBy: { firstAirDate: 'asc' },
        take: HOMEPAGE_ITEM_LIMIT,
        include: carouselLiteInclude,
      }),
      prisma.jogo.findMany({
        where: { AND: [jogoQualityFilter, { firstReleaseDate: { gte: windowStart, lte: windowEnd } }] },
        orderBy: { firstReleaseDate: 'asc' },
        take: HOMEPAGE_ITEM_LIMIT,
        include: {
          genres: { include: { genero: true } },
          platforms: { include: { plataforma: true }, take: 3 },
        },
      }),
      prisma.anime.findMany({
        where: {
          ...animeQualityFilter,
          seasonYear: year,
          season,
          format: { in: ['TV', 'TV_SHORT', 'MOVIE', 'ONA'] },
        },
        orderBy: { startDate: 'asc' },
        take: HOMEPAGE_ITEM_LIMIT,
        include: animeCarouselInclude,
      }),
    ]);

    res.json({
      filmes: filmesRaw.map(mapFilmeToCarouselCard),
      series: series.map(mapSerieToCarouselCard),
      jogos: jogos.map(mapJogoToCarouselCard),
      animes: animes.map(mapAnimeToCarouselCard),
    });
  } catch (error) {
    logger.error(`Erro ao buscar dados da homepage: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar dados da homepage.' });
  }
});

// Hoje — cinema + streaming popular da semana + destaques de jogos
router.get('/hoje', cacheMiddleware(TWELVE_HOURS), async (_req, res) => {
  const now = new Date();

  try {
    const [cinema, streamingFilmes, streamingSeries, destaquesJogos] = await Promise.all([
      fetchFilmesForCarousel({ emCartaz: true }, { orderBy: { popularity: 'desc' }, take: 12 }),
      fetchFilmesForCarousel(
        {
          AND: [
            { streamingProviders: { some: {} } },
            { emCartaz: false },
          ],
        },
        { orderBy: [{ popularity: 'desc' }, { voteCount: 'desc' }], take: 12 },
      ),
      prisma.serie.findMany({
        where: {
          AND: [
            serieQualityFilter,
            { streamingProviders: { some: {} } },
          ],
        },
        orderBy: [{ popularity: 'desc' }, { voteCount: 'desc' }],
        take: 12,
        include: { streamingProviders: { include: { provider: true } } },
      }),
      prisma.jogo.findMany({
        where: jogoQualityFilter,
        orderBy: [{ hypes: 'desc' }, { rating: 'desc' }],
        take: 8,
        include: {
          genres: { include: { genero: true } },
          platforms: { include: { plataforma: true }, take: 3 },
        },
      }),
    ]);

    res.json({
      data: now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      cinema: await Promise.all(cinema.map(async (f) => withPortugueseTranslation(mapFilmeToMidia(f)))),
      streamingFilmes: await Promise.all(streamingFilmes.map(async (f) => withPortugueseTranslation(mapFilmeToMidia(f)))),
      streamingSeries: await Promise.all(streamingSeries.map(async (s) => withPortugueseTranslation(mapSerieToMidia(s)))),
      destaquesJogos: await Promise.all(destaquesJogos.map(async (j) => withPortugueseTranslation(mapJogoToMidia(j)))),
    });
  } catch (error) {
    logger.error(`Erro ao buscar conteúdo de hoje: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar conteúdo de hoje.' });
  }
});

// Rota para Filmes
router.get('/filmes', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { filtro, genero, ano, mes, status, plataforma } = req.query;
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  try {
    const allConditions: Prisma.FilmeWhereInput[] = [];

    const monthRange = typeof mes === 'string' ? parseMonthQuery(mes, ano as string | undefined) : null;

    if (monthRange) {
      allConditions.push({ releaseDate: { gte: monthRange.startDate, lte: monthRange.endDate } });
      if (ano && ano !== 'todos') {
        allConditions.push(getFilmeQualityFilterForYear(parseInt(ano as string, 10)));
      } else {
        allConditions.push(filmeQualityFilter);
      }
    } else if (ano && ano !== 'todos') {
      const year = parseInt(ano as string);
      allConditions.push(getFilmeQualityFilterForYear(year));
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59);
      allConditions.push({ releaseDate: { gte: startDate, lte: endDate } });
    } else {
      allConditions.push(filmeQualityFilter);
    }

    if (genero && genero !== 'todos') {
      allConditions.push({ genres: { some: { genero: { name: genero as string } } } });
    }

    if (status && status !== 'todos') {
      allConditions.push({ status: status as string });
    }

    if (plataforma && plataforma !== 'todos') {
      allConditions.push({
        streamingProviders: { some: { provider: { name: plataforma as string } } },
      });
    }

    const now = new Date();
    if (filtro === 'em_cartaz') {
      allConditions.push({ emCartaz: true });
    } else if (filtro === 'em_breve') {
      allConditions.push({ emBreve: true });
    } else if (filtro === 'lancados') {
      allConditions.push({ releaseDate: { lte: now } });
    } else if (filtro === 'futuros') {
      allConditions.push({ releaseDate: { gte: now } });
    }

    const where: Prisma.FilmeWhereInput = { AND: allConditions };

    const orderBy: Prisma.FilmeOrderByWithRelationInput = filtro === 'populares' ? { popularity: 'desc' } : { title: 'asc' };

    const [filmes, total] = await Promise.all([
      prisma.filme.findMany({
        where,
        include: { streamingProviders: { include: { provider: true } } },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.filme.count({ where }),
    ]);
    res.json({ results: filmes.map(mapFilmeToMidia), total, page, limit });
  } catch (error) {
    logger.error(`Erro ao buscar filmes: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filmes.' });
  }
});

// Rota de Detalhes do Filme (dados ao vivo do TMDB)
router.get('/filmes/:id/details', async (req, res) => {
  const { id } = req.params;
  logger.info(`Buscando detalhes ao vivo para o filme TMDB ID: ${id}`);
  try {
    const filme = await fetchFilmeDetailsLive(Number(id));

    if (!filme) {
      return res.status(404).json({ error: 'Filme não encontrado.' });
    }

    res.json(filme);
  } catch (error) {
    logger.error(`Erro ao buscar detalhes do filme: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar detalhes do filme.' });
  }
});

// Rota de Edição do Filme (Admin)
router.put('/filmes/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedFilme = await prisma.filme.update({
      where: { tmdbId: Number(id) },
      data,
    });

    await invalidateMediaCaches('filmes', id);
    res.json(mapFilmeToMidia(updatedFilme));
  } catch (error) {
    logger.error(`Erro ao editar o filme ID ${id}: ${error}`);
    res.status(500).json({ error: 'Erro ao editar o filme.' });
  }
});

// Rota para buscar opções de filtros de Filmes
router.get('/filmes/filtros', async (req, res) => {
  try {
    const genres = await prisma.genero.findMany({
      where: { filmes: { some: {} } }, // Apenas gêneros que têm filmes
      orderBy: { name: 'asc' },
    });

    const years = await prisma.filme.findMany({
      where: { releaseDate: { not: null } },
      distinct: ['releaseDate'],
      select: { releaseDate: true },
      orderBy: { releaseDate: 'desc' },
    });

    const distinctYears = [...new Set(years.map(y => y.releaseDate!.getFullYear()))];

    const statuses = await prisma.filme.findMany({
        where: { status: { not: null } },
        distinct: ['status'],
        select: { status: true },
    });

    const platforms = await prisma.streamingProvider.findMany({
      where: { filmes: { some: {} } },
      orderBy: { name: 'asc' },
      select: { name: true },
    });

    res.json({
      genres: genres.map(g => g.name),
      years: distinctYears,
      statuses: statuses.map(s => ({
        value: s.status!,
        label: translateTmdbStatus(s.status) ?? s.status!,
      })),
      platforms: platforms.map(p => p.name),
    });

  } catch (error) {
    logger.error('Erro ao buscar filtros de filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar opções de filtros.' });
  }
});

// Rota para o Carrossel da Homepage de Filmes
router.get('/filmes/homepage-carousel', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;

    const startDate = new Date(startYear, 0, 1);
    const endDate = new Date(endYear, 11, 31, 23, 59, 59);

    const filmes = await fetchFilmesForCarousel(
      { releaseDate: { gte: startDate, lte: endDate } },
      { orderBy: { releaseDate: 'asc' }, take: CAROUSEL_ITEM_LIMIT },
    );
    res.json(filmes.map(mapFilmeToMidia));
  } catch (error) {
    logger.error(`Erro ao buscar filmes para o carrossel da homepage: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filmes para o carrossel da homepage.' });
  }
});

// Rota para Filmes por Ano
router.get('/filmes/by-year', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { year } = req.query;
  if (!year || isNaN(parseInt(year as string))) {
    return res.status(400).json({ error: 'Ano inválido fornecido.' });
  }
  const parsedYear = parseInt(year as string);
  const startDate = new Date(parsedYear, 0, 1);
  const endDate = new Date(parsedYear, 11, 31, 23, 59, 59);

  try {
    const filmes = await fetchFilmesForCarousel(
      { releaseDate: { gte: startDate, lte: endDate } },
      { orderBy: { releaseDate: 'asc' }, take: CAROUSEL_ITEM_LIMIT },
    );
    res.json(filmes.map(mapFilmeToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar filmes por ano: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filmes por ano.' });
  }
});

router.get('/filmes/by-month', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const parsed = parseYearMonthQuery(req.query as { year?: string; month?: string });
  if (!parsed) {
    return res.status(400).json({ error: 'Ano ou mês inválido.' });
  }

  const { startDate, endDate } = getMonthDateRange(parsed.year, parsed.month);

  try {
    const filmes = await fetchFilmesForCarousel(
      { releaseDate: { gte: startDate, lte: endDate } },
      { orderBy: { releaseDate: 'asc' }, take: CAROUSEL_ITEM_LIMIT },
    );
    res.json(filmes.map(mapFilmeToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar filmes por mês: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filmes por mês.' });
  }
});

// Rota para Séries
router.get('/series', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { filtro, genero, ano, mes, status, plataforma } = req.query;
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  try {
    const allConditions: Prisma.SerieWhereInput[] = [];

    const monthRange = typeof mes === 'string' ? parseMonthQuery(mes, ano as string | undefined) : null;

    if (monthRange) {
      allConditions.push({ firstAirDate: { gte: monthRange.startDate, lte: monthRange.endDate } });
    } else if (ano && ano !== 'todos') {
      const year = parseInt(ano as string);
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59);
      allConditions.push({ firstAirDate: { gte: startDate, lte: endDate } });
    }

    if (genero && genero !== 'todos') {
      allConditions.push({
        genres: { some: { genero: { name: genero as string } } },
      });
    }

    if (status && status !== 'todos') {
      allConditions.push({ status: status as string });
    }

    if (plataforma && plataforma !== 'todos') {
      allConditions.push({
        streamingProviders: { some: { provider: { name: plataforma as string } } },
      });
    }

    const where: Prisma.SerieWhereInput = allConditions.length > 0 ? { AND: allConditions } : {};

    const orderBy: Prisma.SerieOrderByWithRelationInput = filtro === 'populares' ? { popularity: 'desc' } : { name: 'asc' };

    const [series, total] = await Promise.all([
      prisma.serie.findMany({
        where,
        include: {
          genres: { include: { genero: true } },
          streamingProviders: { include: { provider: true } },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.serie.count({ where }),
    ]);
    res.json({ results: series.map(mapSerieToMidia), total, page, limit });
  } catch (error) {
    logger.error(`Erro ao buscar séries: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar séries.' });
  }
});

// Rota de Detalhes da Série (dados ao vivo do TMDB)
router.get('/series/:id/details', async (req, res) => {
  const { id } = req.params;
  try {
    const serie = await fetchSerieDetailsLive(Number(id));
    if (!serie) {
      return res.status(404).json({ error: 'Série não encontrada.' });
    }
    res.json(serie);
  } catch (error) {
    logger.error(`Erro ao buscar detalhes da série: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar detalhes da série.' });
  }
});

// Rota de Edição da Série (Admin)
router.put('/series/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedSerie = await prisma.serie.update({
      where: { tmdbId: Number(id) },
      data,
    });

    await invalidateMediaCaches('series', id);
    res.json(mapSerieToMidia(updatedSerie));
  } catch (error) {
    logger.error(`Erro ao editar a série ID ${id}: ${error}`);
    res.status(500).json({ error: 'Erro ao editar a série.' });
  }
});

// Rota para buscar opções de filtros de Séries
router.get('/series/filtros', async (req, res) => {
  try {
    const genres = await prisma.genero.findMany({
      where: { series: { some: {} } },
      orderBy: { name: 'asc' },
    });

    const years = await prisma.serie.findMany({
      where: { firstAirDate: { not: null } },
      distinct: ['firstAirDate'],
      select: { firstAirDate: true },
      orderBy: { firstAirDate: 'desc' },
    });

    const distinctYears = [...new Set(years.map(y => y.firstAirDate!.getFullYear()))];

    const statuses = await prisma.serie.findMany({
        where: { status: { not: null } },
        distinct: ['status'],
        select: { status: true },
    });

    const platforms = await prisma.streamingProvider.findMany({
      where: { series: { some: {} } },
      orderBy: { name: 'asc' },
      select: { name: true },
    });

    res.json({
      genres: genres.map(g => g.name),
      years: distinctYears,
      statuses: statuses.map(s => ({
        value: s.status!,
        label: translateTmdbStatus(s.status) ?? s.status!,
      })),
      platforms: platforms.map(p => p.name),
    });

  } catch (error) {
    logger.error('Erro ao buscar filtros de séries:', error);
    res.status(500).json({ error: 'Erro ao buscar opções de filtros.' });
  }
});

// Rota para o Carrossel da Homepage de Séries
router.get('/series/homepage-carousel', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;

    const startDate = new Date(startYear, 0, 1);
    const endDate = new Date(endYear, 11, 31, 23, 59, 59);

    const series = await prisma.serie.findMany({
      where: {
        AND: [
          serieQualityFilter,
          {
            firstAirDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
      orderBy: {
        firstAirDate: 'asc',
      },
      take: CAROUSEL_ITEM_LIMIT,
      include: {
        genres: { include: { genero: true } },
        streamingProviders: { include: { provider: true } },
      },
    });
    res.json(series.map(mapSerieToMidia));
  } catch (error) {
    logger.error(`Erro ao buscar séries para o carrossel da homepage: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar séries para o carrossel da homepage.' });
  }
});

// Rota para Séries por Ano
router.get('/series/by-year', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { year } = req.query;
  if (!year || isNaN(parseInt(year as string))) {
    return res.status(400).json({ error: 'Ano inválido fornecido.' });
  }
  const parsedYear = parseInt(year as string);
  const startDate = new Date(parsedYear, 0, 1);
  const endDate = new Date(parsedYear, 11, 31, 23, 59, 59);

  try {
    const series = await prisma.serie.findMany({
      where: {
        AND: [
          serieQualityFilter,
          {
            firstAirDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
      orderBy: {
        firstAirDate: 'asc',
      },
      take: CAROUSEL_ITEM_LIMIT,
      include: carouselLiteInclude,
    });
    res.json(series.map(mapSerieToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar séries por ano: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar séries por ano.' });
  }
});

router.get('/series/by-month', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const parsed = parseYearMonthQuery(req.query as { year?: string; month?: string });
  if (!parsed) {
    return res.status(400).json({ error: 'Ano ou mês inválido.' });
  }

  const { startDate, endDate } = getMonthDateRange(parsed.year, parsed.month);

  try {
    const series = await prisma.serie.findMany({
      where: {
        AND: [serieQualityFilter, { firstAirDate: { gte: startDate, lte: endDate } }],
      },
      orderBy: { firstAirDate: 'asc' },
      take: CAROUSEL_ITEM_LIMIT,
      include: carouselLiteInclude,
    });
    res.json(series.map(mapSerieToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar séries por mês: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar séries por mês.' });
  }
});

const blockedTags = ["Hentai", "Ecchi", "Yaoi", "Yuri", "Adult"];

// Rota para Animes
router.get('/animes', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { filtro, genero, ano, formato, fonte, status, safeSearch, includeAdult } = req.query;
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  try {
    const where: Prisma.AnimeWhereInput = {};
    const showAdultContent = includeAdult === 'true';

    if (!showAdultContent) {
      where.isAdult = false;
    }

    if (genero && genero !== 'todos') {
      where.genres = {
        some: { genero: { name: genero as string } },
      };
    }
    if (formato && formato !== 'todos') {
      where.format = formato as string;
    }
    if (fonte && fonte !== 'todos') {
      where.source = fonte as string;
    }
    if (status && status !== 'todos') {
      where.status = status as string;
    }
    if (ano && ano !== 'todos') {
      where.seasonYear = parseInt(ano as string);
    }

    if (safeSearch === 'true' || !showAdultContent) {
      where.tags = {
        none: {
          tag: {
            name: {
              in: blockedTags,
            },
          },
        },
      };
    }

    const orderBy: Prisma.AnimeOrderByWithRelationInput = filtro === 'populares' ? { popularity: 'desc' } : { titleRomaji: 'asc' };

    const [animes, total] = await Promise.all([
      prisma.anime.findMany({
        where,
        include: { 
          sourceRelations: { 
            include: { 
              relatedAnime: { select: { anilistId: true, titleRomaji: true } },
              sourceAnime: { select: { anilistId: true, titleRomaji: true } }
            }
          },
          relatedRelations: { 
            include: { 
              relatedAnime: { select: { anilistId: true, titleRomaji: true } },
              sourceAnime: { select: { anilistId: true, titleRomaji: true } }
            }
          },
          tags: { include: { tag: true } }
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.anime.count({ where }),
    ]);
    res.json({ results: animes.map(mapAnimeToMidia), total, page, limit });
  } catch (error) {
    logger.error(`Erro ao buscar animes: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar animes.' });
  }
});

// Rota de Detalhes do Anime (dados ao vivo do AniList)
router.get('/animes/:id/details', async (req, res) => {
  const { id } = req.params;
  try {
    const anime = await fetchAnimeDetailsLive(Number(id));
    if (!anime) {
      return res.status(404).json({ error: 'Anime não encontrado.' });
    }
    res.json(anime);
  } catch (error) {
    logger.error(`Erro ao buscar detalhes do anime: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar detalhes do anime.' });
  }
});

// Rota de Edição do Anime (Admin)
router.put('/animes/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedAnime = await prisma.anime.update({
      where: { anilistId: Number(id) },
      data,
    });

    await invalidateMediaCaches('animes', id);
    res.json(mapAnimeToMidia(updatedAnime));
  } catch (error) {
    logger.error(`Erro ao editar o anime ID ${id}: ${error}`);
    res.status(500).json({ error: 'Erro ao editar o anime.' });
  }
});

// Rota para buscar opções de filtros de Animes
router.get('/animes/filtros', async (req, res) => {
  try {
    const genres = await prisma.animeGenero.findMany({ orderBy: { name: 'asc' } });
    const years = await prisma.anime.findMany({ where: { seasonYear: { not: null } }, distinct: ['seasonYear'], select: { seasonYear: true }, orderBy: { seasonYear: 'desc' } });
    const formats = await prisma.anime.findMany({ where: { format: { not: null } }, distinct: ['format'], select: { format: true } });
    const sources = await prisma.anime.findMany({ where: { source: { not: null } }, distinct: ['source'], select: { source: true } });
    const statuses = await prisma.anime.findMany({ where: { status: { not: null } }, distinct: ['status'], select: { status: true } });

    res.json({
      genres: genres.map(g => g.name),
      years: years.map(y => y.seasonYear).filter(Boolean),
      formats: formats.map(f => f.format).filter(Boolean),
      sources: sources.map(s => s.source).filter(Boolean),
      statuses: statuses.map(s => ({
        value: s.status!,
        label: translateAnimeStatusLabel(s.status) ?? s.status!,
      })),
    });

  } catch (error) {
    logger.error('Erro ao buscar filtros de animes:', error);
    res.status(500).json({ error: 'Erro ao buscar opções de filtros.' });
  }
});

// Rota para o próximo episódio de um anime (não cacheada)
router.get('/animes/:id/next-episode', async (req, res) => {
  const { id } = req.params;
  try {
    const nextAiring = await prisma.airingSchedule.findFirst({
      where: {
        anime: { anilistId: Number(id) },
        airingAt: { gte: new Date() },
      },
      orderBy: {
        episode: 'asc',
      },
    });
    res.json(nextAiring);
  } catch (error) {
    logger.error(`Erro ao buscar próximo episódio para o anime ID ${id}: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar informações do próximo episódio.' });
  }
});

// Rota para Jogos
router.get('/jogos', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { filtro, genero, plataforma, modo } = req.query;
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  try {
    const where: Prisma.JogoWhereInput = {};

    if (genero && genero !== 'todos') {
      where.genres = { some: { genero: { name: genero as string } } };
    }
    if (plataforma && plataforma !== 'todos') {
      where.platforms = { some: { plataforma: { name: plataforma as string } } };
    }
    if (modo && modo !== 'todos') {
      where.gameModes = { some: { gameMode: { name: modo as string } } };
    }

    const orderBy: Prisma.JogoOrderByWithRelationInput = filtro === 'populares' ? { rating: 'desc' } : { name: 'asc' };

    const [jogos, total] = await Promise.all([
      prisma.jogo.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.jogo.count({ where }),
    ]);
    res.json({ results: jogos.map(mapJogoToMidia), total, page, limit });
  } catch (error) {
    logger.error(`Erro ao buscar jogos: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos.' });
  }
});

// Rota de Detalhes do Jogo (dados ao vivo do IGDB)
router.get('/jogos/:id/details', async (req, res) => {
  const { id } = req.params;
  try {
    const jogo = await fetchJogoDetailsLive(Number(id));
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo não encontrado.' });
    }
    res.json(jogo);
  } catch (error) {
    logger.error(`Erro ao buscar detalhes do jogo: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar detalhes do jogo.' });
  }
});

// Rota de Edição do Jogo (Admin)
router.put('/jogos/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedJogo = await prisma.jogo.update({
      where: { igdbId: Number(id) },
      data,
    });

    await invalidateMediaCaches('jogos', id);
    res.json(mapJogoToMidia(updatedJogo));
  } catch (error) {
    logger.error(`Erro ao editar o jogo ID ${id}: ${error}`);
    res.status(500).json({ error: 'Erro ao editar o jogo.' });
  }
});

// Rota para buscar opções de filtros de Jogos
router.get('/jogos/filtros', async (req, res) => {
  try {
    const genres = await prisma.jogoGenero.findMany({ orderBy: { name: 'asc' } });
    const platforms = await prisma.jogoPlataforma.findMany({ orderBy: { name: 'asc' } });
    const gameModes = await prisma.gameMode.findMany({ orderBy: { name: 'asc' } });
    const gameEngines = await prisma.gameEngine.findMany({ orderBy: { name: 'asc' } });

    res.json({
      genres: genres.map(g => g.name),
      platforms: platforms.map(p => p.name),
      gameModes: gameModes.map(gm => gm.name),
      gameEngines: gameEngines.map(ge => ge.name),
    });

  } catch (error) {
    logger.error('Erro ao buscar filtros de jogos:', error);
    res.status(500).json({ error: 'Erro ao buscar opções de filtros.' });
  }
});

// Rota para o Carrossel da Homepage de Jogos
router.get('/jogos/homepage-carousel', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;

    const startDate = new Date(startYear, 0, 1);
    const endDate = new Date(endYear, 11, 31, 23, 59, 59);

    const jogos = await prisma.jogo.findMany({
      where: {
        AND: [
          jogoQualityFilter,
          {
            firstReleaseDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
      orderBy: {
        firstReleaseDate: 'asc',
      },
      take: CAROUSEL_ITEM_LIMIT,
      include: {
        platforms: { include: { plataforma: true } }
      }
    });
    res.json(jogos.map(mapJogoToMidia));
  } catch (error) {
    logger.error(`Erro ao buscar jogos para o carrossel da homepage: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos para o carrossel da homepage.' });
  }
});

// Rota para Jogos por Ano
router.get('/jogos/by-year', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { year } = req.query;
  if (!year || isNaN(parseInt(year as string))) {
    return res.status(400).json({ error: 'Ano inválido fornecido.' });
  }
  const parsedYear = parseInt(year as string);
  const startDate = new Date(parsedYear, 0, 1);
  const endDate = new Date(parsedYear, 11, 31, 23, 59, 59);

  try {
    const jogos = await prisma.jogo.findMany({
      where: {
        AND: [
          jogoQualityFilter,
          {
            firstReleaseDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
      orderBy: {
        firstReleaseDate: 'asc',
      },
      take: CAROUSEL_ITEM_LIMIT,
      include: {
        platforms: { include: { plataforma: true }, take: 3 },
        genres: { include: { genero: true } },
      }
    });
    res.json(jogos.map(mapJogoToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar jogos por ano: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos por ano.' });
  }
});

router.get('/jogos/by-month', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const parsed = parseYearMonthQuery(req.query as { year?: string; month?: string });
  if (!parsed) {
    return res.status(400).json({ error: 'Ano ou mês inválido.' });
  }

  const { startDate, endDate } = getMonthDateRange(parsed.year, parsed.month);

  try {
    const jogos = await prisma.jogo.findMany({
      where: {
        AND: [jogoQualityFilter, { firstReleaseDate: { gte: startDate, lte: endDate } }],
      },
      orderBy: { firstReleaseDate: 'asc' },
      take: CAROUSEL_ITEM_LIMIT,
      include: {
        platforms: { include: { plataforma: true }, take: 3 },
        genres: { include: { genero: true } },
      },
    });
    res.json(jogos.map(mapJogoToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar jogos por mês: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos por mês.' });
  }
});

// Jogos em alta da semana — agrupados por categoria, modo e plataforma
router.get('/jogos/em-alta', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const perGroup = 8;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const buildSections = (
    jogos: ReturnType<typeof mapJogoToMidia>[],
    getKeys: (jogo: ReturnType<typeof mapJogoToMidia>) => string[]
  ) => {
    const keySet = new Set<string>();
    for (const jogo of jogos) {
      getKeys(jogo).forEach((k) => keySet.add(k));
    }

    const sections = Array.from(keySet).map((nome) => {
      const jogosDoGrupo = jogos
        .filter((j) => getKeys(j).includes(nome))
        .slice(0, perGroup);
      return { nome, jogos: jogosDoGrupo, total: jogosDoGrupo.length };
    });

    return sections
      .filter((s) => s.total >= 2)
      .sort((a, b) => b.total - a.total || a.nome.localeCompare(b.nome, 'pt-BR'));
  };

  try {
    const recentJogos = await prisma.jogo.findMany({
      where: {
        AND: [
          jogoQualityFilter,
          {
            OR: [
              { firstReleaseDate: { gte: weekAgo } },
              { hypes: { gte: 5 } },
              { rating: { gte: 75 } },
            ],
          },
        ],
      },
      orderBy: [{ hypes: 'desc' }, { rating: 'desc' }],
      take: 150,
      include: {
        platforms: { include: { plataforma: true } },
        genres: { include: { genero: true } },
        gameModes: { include: { gameMode: true } },
      },
    });

    const mapped = recentJogos.map(mapJogoToMidia);

    const now = new Date();
    const weekLabel = `Semana ${Math.ceil(now.getDate() / 7)} · ${now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;

    res.json({
      semana: weekLabel,
      destaques: mapped.slice(0, 12),
      categorias: buildSections(mapped, (j) => j.generos_api || []),
      modos: buildSections(mapped, (j) => j.modos_jogo || []),
      plataformas: buildSections(mapped, (j) =>
        (j.plataformas_api || []).map((p: { nome?: string }) => p.nome).filter(Boolean) as string[]
      ),
    });
  } catch (error) {
    logger.error(`Erro ao buscar jogos em alta: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos em alta.' });
  }
});

// Rota para Conteúdo em Alta (Trending)
router.get('/trending', async (req, res) => {
  const { type, limit = 10 } = req.query;
  const take = parseInt(limit as string, 10);

  try {
    let results: any[] = [];

    if (type === 'filmes') {
      const popularFilmes = await prisma.filme.findMany({
        where: filmeQualityFilter,
        orderBy: { popularity: 'desc' },
        take,
      });
      results = await Promise.all(popularFilmes.map(async (f) => withPortugueseTranslation(mapFilmeToMidia(f))));
    } else if (type === 'series') {
      const popularSeries = await prisma.serie.findMany({
        where: serieQualityFilter,
        orderBy: { popularity: 'desc' },
        take,
      });
      results = await Promise.all(popularSeries.map(async (s) => withPortugueseTranslation(mapSerieToMidia(s))));
    } else if (type === 'animes') {
      const popularAnimes = await prisma.anime.findMany({
        where: animeQualityFilter,
        orderBy: { popularity: 'desc' },
        take,
      });
      results = await Promise.all(popularAnimes.map(async (a) => withPortugueseTranslation(mapAnimeToMidia(a))));
    } else if (type === 'jogos') {
      const popularJogos = await prisma.jogo.findMany({
        where: jogoQualityFilter,
        orderBy: { rating: 'desc' },
        take,
      });
      results = await Promise.all(popularJogos.map(async (j) => withPortugueseTranslation(mapJogoToMidia(j))));
    } else {
      const takeForEach = Math.ceil(take / 4) + 2;

      const popularFilmes = prisma.filme.findMany({
        where: filmeQualityFilter,
        orderBy: { popularity: 'desc' },
        take: takeForEach,
      });
      const popularSeries = prisma.serie.findMany({
        where: serieQualityFilter,
        orderBy: { popularity: 'desc' },
        take: takeForEach,
      });
      const popularAnimes = prisma.anime.findMany({
        where: animeQualityFilter,
        orderBy: { popularity: 'desc' },
        take: takeForEach,
      });
      const popularJogos = prisma.jogo.findMany({
        where: jogoQualityFilter,
        orderBy: { rating: 'desc' },
        take: takeForEach,
      });

      const [filmes, series, animes, jogos] = await Promise.all([
        popularFilmes,
        popularSeries,
        popularAnimes,
        popularJogos,
      ]);

      const trendingResults = [
        ...(await Promise.all(filmes.map(async (f) => withPortugueseTranslation(mapFilmeToMidia(f))))),
        ...(await Promise.all(series.map(async (s) => withPortugueseTranslation(mapSerieToMidia(s))))),
        ...(await Promise.all(animes.map(async (a) => withPortugueseTranslation(mapAnimeToMidia(a))))),
        ...(await Promise.all(jogos.map(async (j) => withPortugueseTranslation(mapJogoToMidia(j))))),
      ];

      // Apenas pega os primeiros 10 resultados combinados, sem embaralhar
      results = trendingResults.slice(0, take);
    }

    res.json(results);

  } catch (error) {
    logger.error(`Erro ao buscar conteúdo em alta: ${error}`);
    res.status(500).json({ error: 'Erro interno ao buscar conteúdo em alta.' });
  }
});

// Pesquisa global (alias /search para compatibilidade com auditoria e crawlers)
const searchHandler = async (req: import('express').Request, res: import('express').Response) => {
  const { q, category } = req.query;

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: "O parâmetro de pesquisa 'q' é obrigatório." });
  }

  try {
    const normalizedQ = normalizeSearchText(q);
    const categoryFilter = category && category !== 'todos' ? (category as string) : null;

    const matchesQuery = (text: string | null | undefined) =>
      !!text && normalizeSearchText(text).includes(normalizedQ);

    const promises = [];

    if (!categoryFilter || categoryFilter === 'filmes') {
      promises.push(
        prisma.filme.findMany({
          take: 1500,
          orderBy: { popularity: 'desc' },
          include: { streamingProviders: { include: { provider: true } } },
        }).then((items) => items.filter((f) => matchesQuery(f.title) || matchesQuery(f.originalTitle)))
      );
    } else {
      promises.push(Promise.resolve([]));
    }

    if (!categoryFilter || categoryFilter === 'series') {
      promises.push(
        prisma.serie.findMany({
          take: 1500,
          orderBy: { popularity: 'desc' },
          include: { streamingProviders: { include: { provider: true } } },
        }).then((items) => items.filter((s) => matchesQuery(s.name) || matchesQuery(s.originalName)))
      );
    } else {
      promises.push(Promise.resolve([]));
    }

    if (!categoryFilter || categoryFilter === 'animes') {
      promises.push(
        prisma.anime.findMany({
          take: 1500,
          orderBy: { popularity: 'desc' },
        }).then((items) => items.filter((a) =>
          matchesQuery(a.titleRomaji) || matchesQuery(a.titleEnglish) || matchesQuery(a.titleNative)
        ))
      );
    } else {
      promises.push(Promise.resolve([]));
    }

    if (!categoryFilter || categoryFilter === 'jogos') {
      promises.push(
        prisma.jogo.findMany({
          take: 1500,
          orderBy: { rating: 'desc' },
        }).then((items) => items.filter((j) => matchesQuery(j.name)))
      );
    } else {
      promises.push(Promise.resolve([]));
    }

    const [filmes, series, animes, jogos] = await Promise.all(promises);

    res.json({
      filmes: await Promise.all(filmes.map(async (f) => withPortugueseTranslation(mapFilmeToMidia(f)))),
      series: await Promise.all(series.map(async (s) => withPortugueseTranslation(mapSerieToMidia(s)))),
      animes: await Promise.all(animes.map(async (a) => withPortugueseTranslation(mapAnimeToMidia(a)))),
      jogos: await Promise.all(jogos.map(async (j) => withPortugueseTranslation(mapJogoToMidia(j)))),
    });

  } catch (error) {
    logger.error(`Erro ao realizar pesquisa: ${error}`);
    res.status(500).json({ error: 'Erro interno ao realizar pesquisa.' });
  }
};

router.get('/pesquisa', searchRateLimiter, searchHandler);
router.get('/search', searchRateLimiter, searchHandler);

// Rota para Filtros de Premiações
router.get('/premios/filtros', async (req, res) => {
  try {
    // Busca nomes e anos únicos dos campos JSON de todas as tabelas de mídia
    const query = `
      SELECT DISTINCT 
        award->>'nome' as nome,
        (award->>'ano')::int as ano
      FROM (
        SELECT jsonb_array_elements(CASE WHEN jsonb_typeof(premiacoes) = 'array' THEN premiacoes ELSE '[]'::jsonb END) as award FROM "Filme"
        UNION ALL
        SELECT jsonb_array_elements(CASE WHEN jsonb_typeof(premiacoes) = 'array' THEN premiacoes ELSE '[]'::jsonb END) as award FROM "Serie"
        UNION ALL
        SELECT jsonb_array_elements(CASE WHEN jsonb_typeof(premiacoes) = 'array' THEN premiacoes ELSE '[]'::jsonb END) as award FROM "Anime"
        UNION ALL
        SELECT jsonb_array_elements(CASE WHEN jsonb_typeof(premiacoes) = 'array' THEN premiacoes ELSE '[]'::jsonb END) as award FROM "Jogo"
      ) sub
      WHERE award->>'nome' IS NOT NULL
      ORDER BY ano DESC, nome ASC
    `;

    const results: any[] = await prisma.$queryRawUnsafe(query);
    
    const names = [...new Set(results.map(r => r.nome))].sort();
    const years = [...new Set(results.map(r => r.ano))].sort((a, b) => b - a);

    res.json({ names, years });
  } catch (error) {
    logger.error(`Erro ao buscar filtros de premiações: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filtros de premiações.' });
  }
});

// Rota para Premiações
router.get('/premios', cacheMiddleware(TWENTY_FOUR_HOURS), async (req, res) => {
  const awardName = typeof req.query.awardName === 'string' ? req.query.awardName : undefined;
  const yearParam = req.query.year;
  const year = yearParam !== undefined ? parseInt(String(yearParam), 10) : undefined;
  const { page, limit, skip } = parsePagination(req.query);

  const premioInclude = {
    genres: { include: { genero: true } },
    streamingProviders: { include: { provider: true }, take: 3 },
  };

  const jogoPremioInclude = {
    genres: { include: { genero: true } },
    platforms: { include: { plataforma: true }, take: 3 },
  };

  try {
    const [filmes, series, animes, jogos] = await Promise.all([
      prisma.filme.findMany({ where: { NOT: { premiacoes: { equals: Prisma.DbNull } } }, include: premioInclude }),
      prisma.serie.findMany({ where: { NOT: { premiacoes: { equals: Prisma.DbNull } } }, include: premioInclude }),
      prisma.anime.findMany({ where: { NOT: { premiacoes: { equals: Prisma.DbNull } } }, include: { genres: { include: { genero: true } } } }),
      prisma.jogo.findMany({ where: { NOT: { premiacoes: { equals: Prisma.DbNull } } }, include: jogoPremioInclude }),
    ]);

    const filterAndMap = <T extends { premiacoes: unknown }>(
      items: T[],
      mapper: (item: T) => object
    ) =>
      items
        .filter((item) => matchesPremiacaoFilters(item.premiacoes, awardName, year))
        .map(mapper);

    const allAwards = [
      ...filterAndMap(filmes, mapFilmeToMidia as (item: typeof filmes[number]) => object),
      ...filterAndMap(series, mapSerieToMidia as (item: typeof series[number]) => object),
      ...filterAndMap(animes, mapAnimeToMidia as (item: typeof animes[number]) => object),
      ...filterAndMap(jogos, mapJogoToMidia as (item: typeof jogos[number]) => object),
    ];

    const total = allAwards.length;
    const results = allAwards.slice(skip, skip + limit);

    res.json({ results, total, page, limit });
  } catch (error) {
    logger.error(`Erro ao buscar premiações: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar premiações.' });
  }
});

const eventInclude = {
  games: {
    include: {
      genres: { include: { genero: true } },
      platforms: { include: { plataforma: true }, take: 3 },
    },
    orderBy: { rating: 'desc' as const },
    take: 40,
  },
  _count: { select: { games: true } },
};

const getProximosWindow = () => {
  const now = new Date();
  const threeMonthsAhead = new Date(now);
  threeMonthsAhead.setMonth(threeMonthsAhead.getMonth() + 3);
  return { now, threeMonthsAhead };
};

// Resumo agregado para a página de Eventos (relatório)
router.get('/eventos/resumo', cacheMiddleware(TWELVE_HOURS), async (_req, res) => {
  const now = new Date();
  const { threeMonthsAhead } = getProximosWindow();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const year = now.getFullYear();
  const season = getCurrentSeason();

  try {
    const [
      eventosGames,
      filmesProximos,
      seriesProximas,
      animesProximos,
      jogosProximos,
      filmesEmCartaz,
      eventosRecentes,
    ] = await Promise.all([
      prisma.event.findMany({
        where: {
          OR: [
            { start_time: { gte: now } },
            {
              start_time: { lte: now },
              OR: [{ end_time: { gte: now } }, { end_time: null }],
            },
          ],
        },
        include: eventInclude,
        orderBy: { start_time: 'asc' },
      }),
      prisma.filme.findMany({
        where: {
          AND: [
            filmeQualityFilter,
            { emBreve: true },
            { releaseDate: { gte: now, lte: threeMonthsAhead } },
          ],
        },
        orderBy: { releaseDate: 'asc' },
        take: 20,
        include: { streamingProviders: { include: { provider: true } } },
      }),
      prisma.serie.findMany({
        where: {
          AND: [
            serieQualityFilter,
            { firstAirDate: { gte: now, lte: threeMonthsAhead } },
          ],
        },
        orderBy: { firstAirDate: 'asc' },
        take: 20,
        include: {
          genres: { include: { genero: true } },
          streamingProviders: { include: { provider: true } },
        },
      }),
      prisma.anime.findMany({
        where: {
          AND: [
            animeSeasonQualityFilter,
            { seasonYear: year, season },
            { status: { in: ['NOT_YET_RELEASED', 'RELEASING'] } },
            { format: { in: ['TV', 'TV_SHORT', 'MOVIE', 'ONA'] } },
          ],
        },
        orderBy: { startDate: 'asc' },
        take: 20,
        include: animeCarouselInclude,
      }),
      prisma.jogo.findMany({
        where: {
          AND: [
            jogoQualityFilter,
            { firstReleaseDate: { gte: now, lte: threeMonthsAhead } },
          ],
        },
        orderBy: { firstReleaseDate: 'asc' },
        take: 20,
        include: {
          genres: { include: { genero: true } },
          platforms: { include: { plataforma: true }, take: 3 },
        },
      }),
      prisma.filme.findMany({
        where: { AND: [filmeQualityFilter, { emCartaz: true }] },
        orderBy: { popularity: 'desc' },
        take: 20,
        include: { streamingProviders: { include: { provider: true } } },
      }),
      prisma.event.findMany({
        where: {
          OR: [
            { end_time: { gte: thirtyDaysAgo, lt: now } },
            {
              start_time: { gte: thirtyDaysAgo, lt: now },
              OR: [{ end_time: null }, { end_time: { lt: now } }],
            },
          ],
        },
        include: eventInclude,
        orderBy: { start_time: 'desc' },
        take: 10,
      }),
    ]);

    res.json({
      eventos_games: eventosGames.map(mapEventToResponse),
      proximos: {
        filmes: await Promise.all(filmesProximos.map(async (f) => withPortugueseTranslation(mapFilmeToMidia(f)))),
        series: await Promise.all(seriesProximas.map(async (s) => withPortugueseTranslation(mapSerieToMidia(s)))),
        animes: await Promise.all(animesProximos.map(async (a) => withPortugueseTranslation(mapAnimeToMidia(a)))),
        jogos: await Promise.all(jogosProximos.map(async (j) => withPortugueseTranslation(mapJogoToMidia(j)))),
      },
      destaques_recentes: {
        filmes: await Promise.all(filmesEmCartaz.map(async (f) => withPortugueseTranslation(mapFilmeToMidia(f)))),
        eventos: eventosRecentes.map(mapEventToResponse),
      },
    });
  } catch (error) {
    logger.error(`Erro ao buscar resumo de eventos: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar resumo de eventos.' });
  }
});

// Rota para Eventos de games (IGDB — E3, Gamescom, State of Play, etc.)
router.get('/eventos', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const status = typeof req.query.status === 'string' ? req.query.status : 'all';
  const now = new Date();

  try {
    let where: Prisma.EventWhereInput = {};
    if (status === 'upcoming') {
      where = { start_time: { gte: now } };
    } else if (status === 'ongoing') {
      where = {
        start_time: { lte: now },
        OR: [{ end_time: { gte: now } }, { end_time: null }],
      };
    } else if (status === 'past') {
      where = { end_time: { lt: now } };
    }

    const events = await prisma.event.findMany({
      where,
      include: eventInclude,
      orderBy: { start_time: 'asc' },
    });

    res.json(events.map(mapEventToResponse));
  } catch (error) {
    logger.error(`Erro ao buscar eventos: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar eventos.' });
  }
});

// Rota para Animes da Semana
router.get('/animes/weekly-schedule', async (req, res) => {
  try {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Dom) - 6 (Sáb)
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - dayOfWeek);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    const schedule = await prisma.airingSchedule.findMany({
      where: {
        airingAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        anime: true,
      },
      orderBy: {
        airingAt: 'asc',
      },
    });

    const groupedByDay = schedule.reduce((acc, item) => {
      const day = item.airingAt.getDay();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(mapAnimeToMidia(item.anime));
      return acc;
    }, {} as Record<number, any[]>);

    res.json(groupedByDay);
  } catch (error) {
    logger.error(`Erro ao buscar cronograma semanal de animes: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar cronograma semanal de animes.' });
  }
});

// Helper function to get date range for a season
const getSeasonDateRange = (year: number, season: string): { startDate: Date, endDate: Date } => {
  let startDate: Date;
  let endDate: Date;

  switch (season.toUpperCase()) {
    case 'WINTER':
      startDate = new Date(Date.UTC(year, 0, 1)); // Jan 1
      endDate = new Date(Date.UTC(year, 2, 31, 23, 59, 59, 999)); // Mar 31
      break;
    case 'SPRING':
      startDate = new Date(Date.UTC(year, 3, 1)); // Apr 1
      endDate = new Date(Date.UTC(year, 5, 30, 23, 59, 59, 999)); // Jun 30
      break;
    case 'SUMMER':
      startDate = new Date(Date.UTC(year, 6, 1)); // Jul 1
      endDate = new Date(Date.UTC(year, 8, 30, 23, 59, 59, 999)); // Sep 30
      break;
    case 'FALL':
      startDate = new Date(Date.UTC(year, 9, 1)); // Oct 1
      endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)); // Dec 31
      break;
    default:
      // Return a range that will yield no results for invalid seasons
      startDate = new Date(0);
      endDate = new Date(0);
      break;
  }
  return { startDate, endDate };
};

// Rota para Animes por Ano (paridade com filmes/séries/jogos)
router.get('/animes/by-year', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { year } = req.query;
  if (!year || isNaN(parseInt(year as string))) {
    return res.status(400).json({ error: 'Ano inválido fornecido.' });
  }
  const parsedYear = parseInt(year as string);
  const startDate = new Date(parsedYear, 0, 1);
  const endDate = new Date(parsedYear, 11, 31, 23, 59, 59);

  try {
    const animes = await prisma.anime.findMany({
      where: {
        AND: [
          animeQualityFilter,
          {
            startDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
      orderBy: { startDate: 'asc' },
      take: CAROUSEL_ITEM_LIMIT,
      include: animeCarouselInclude,
    });
    res.json(animes.map(mapAnimeToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar animes por ano: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar animes por ano.' });
  }
});

// Rota para Animes por Temporada e Ano
router.get('/animes/by-season', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { year, season } = req.query;

  if (!year || !season || typeof year !== 'string' || typeof season !== 'string') {
    return res.status(400).json({ error: "Os parâmetros 'year' e 'season' são obrigatórios." });
  }

  try {
    const parsedYear = parseInt(year, 10);
    if (isNaN(parsedYear)) {
      return res.status(400).json({ error: "O parâmetro 'year' deve ser um número." });
    }

    const animes = await prisma.anime.findMany({
      where: {
        ...animeSeasonQualityFilter,
        seasonYear: parsedYear,
        season: season as 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL',
        format: { in: ['TV', 'TV_SHORT', 'MOVIE', 'ONA', 'SPECIAL'] },
      },
      orderBy: { startDate: 'asc' },
      take: CAROUSEL_ITEM_LIMIT,
      include: {
        genres: { include: { genero: true } },
        streamingLinks: { take: 3 },
        airingSchedule: {
          where: { airingAt: { gte: new Date() } },
          orderBy: { airingAt: 'asc' },
          take: 1,
        },
      },
    });

    res.status(200).json(animes.map(mapAnimeToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar animes por temporada: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar animes por temporada.' });
  }
});



router.get('/debug-search', async (req, res) => {
  try {
    const searchFilter = { contains: 'tron', mode: 'insensitive' as const };
    const filmes = await prisma.filme.findMany({
      where: { title: searchFilter },
      select: { title: true, popularity: true },
    });
    res.json(filmes);
  } catch (error) {
    logger.error(`Erro no endpoint de debug-search: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar dados de debug-search.' });
  }
});

// Rota de Depuração para Trending
router.get('/debug-trending', async (req, res) => {
  try {
    const filmes = await prisma.filme.findMany({
      take: 20,
      orderBy: { popularity: 'desc' },
      select: { title: true, popularity: true, voteCount: true, releaseDate: true },
    });
    res.json(filmes);
  } catch (error) {
    logger.error(`Erro no endpoint de debug: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar dados de debug.' });
  }
});

export default router;