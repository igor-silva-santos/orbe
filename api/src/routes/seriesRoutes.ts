import { Router } from 'express';
import { prisma } from '../clients';
import { Prisma } from '@prisma/client';
import { mapSerieToMidia, mapSerieToCarouselCard, sortSeriesByCarouselDate } from '../mappers';
import { fetchSerieDetailsLive, fetchSerieSeasonEpisodes } from '../externalDetails';
import { serieQualityFilter, serieCarouselQualityFilter } from '../qualityFilters';
import { logger } from '../logger';
import cacheMiddleware from '../cacheMiddleware';
import adminMiddleware from '../adminMiddleware';
import { invalidateMediaCaches } from '../cacheInvalidation';
import { translateTmdbStatus } from '../statusLabels';
import { detailsRateLimiter } from '../securityMiddleware';
import { mapSerieAdminUpdate } from '../adminUpdateMappers';
import { yearOnlySerieWhere } from '../yearOnlyRelease';
import {
  TWELVE_HOURS,
  TWENTY_FOUR_HOURS,
  DETAILS_CACHE_SECONDS,
  CAROUSEL_ITEM_LIMIT,
  parsePagination,
  parsePositiveIntId,
  getDistinctYears,
  parseMonthQuery,
  getMonthDateRange,
  parseYearMonthQuery,
  parseCarouselYearQuery,
  serieCarouselLiteInclude,
  serieCarouselDateInRange,
} from './mediaRoutesHelpers';

const router = Router();

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
router.get('/series/:id/details', detailsRateLimiter, cacheMiddleware(DETAILS_CACHE_SECONDS), async (req, res) => {
  const tmdbId = parsePositiveIntId(req.params.id);
  if (!tmdbId) {
    return res.status(400).json({ error: 'ID de série inválido.' });
  }
  try {
    const serie = await fetchSerieDetailsLive(tmdbId);
    if (!serie) {
      return res.status(404).json({ error: 'Série não encontrada.' });
    }
    res.json(serie);
  } catch (error) {
    logger.error(`Erro ao buscar detalhes da série: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar detalhes da série.' });
  }
});

router.get(
  '/series/:id/season/:seasonNumber/episodes',
  detailsRateLimiter,
  cacheMiddleware(DETAILS_CACHE_SECONDS),
  async (req, res) => {
    const tmdbId = parsePositiveIntId(req.params.id);
    const seasonNumber = parseInt(req.params.seasonNumber, 10);
    if (!tmdbId || !Number.isFinite(seasonNumber) || seasonNumber < 0) {
      return res.status(400).json({ error: 'Parâmetros inválidos.' });
    }
    try {
      const episodes = await fetchSerieSeasonEpisodes(tmdbId, seasonNumber);
      res.json({ episodes });
    } catch (error) {
      logger.error(`Erro ao buscar episódios da temporada: ${error}`);
      res.status(500).json({ error: 'Erro ao buscar episódios da temporada.' });
    }
  },
);

// Rota de Edição da Série (Admin)
router.put('/series/:id', adminMiddleware, async (req, res) => {
  const tmdbId = parsePositiveIntId(req.params.id);
  if (!tmdbId) {
    return res.status(400).json({ error: 'ID de série inválido.' });
  }

  const data = mapSerieAdminUpdate(req.body as Record<string, unknown>);
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'Nenhum campo editável fornecido.' });
  }

  try {
    const updatedSerie = await prisma.serie.update({
      where: { tmdbId },
      data,
    });

    await invalidateMediaCaches('series', String(tmdbId));
    res.json(mapSerieToMidia(updatedSerie));
  } catch (error) {
    logger.error(`Erro ao editar a série ID ${tmdbId}: ${error}`);
    res.status(500).json({ error: 'Erro ao editar a série.' });
  }
});

// Rota para buscar opções de filtros de Séries
router.get('/series/filtros', cacheMiddleware(TWENTY_FOUR_HOURS), async (req, res) => {
  try {
    const genres = await prisma.genero.findMany({
      where: { series: { some: {} } },
      orderBy: { name: 'asc' },
    });

    const distinctYears = await getDistinctYears('Serie', 'firstAirDate');

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
router.get('/series/homepage-carousel', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
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
      include: serieCarouselLiteInclude,
    });
    res.json(series.map(mapSerieToCarouselCard));
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
      include: serieCarouselLiteInclude,
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
    const series = sortSeriesByCarouselDate(
      await prisma.serie.findMany({
        where: {
          AND: [serieCarouselQualityFilter, serieCarouselDateInRange(startDate, endDate)],
        },
        orderBy: { firstAirDate: 'asc' },
        take: CAROUSEL_ITEM_LIMIT,
        include: serieCarouselLiteInclude,
      }),
    );
    res.json(series.map(mapSerieToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar séries por mês: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar séries por mês.' });
  }
});

/** Lançamentos só com ano (TBA) — isolado da timeline mensal */
router.get('/series/year-tbd', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const parsedYear = parseCarouselYearQuery(req.query as { year?: string });
  if (!parsedYear) {
    return res.status(400).json({ error: 'Ano inválido.' });
  }

  try {
    const series = sortSeriesByCarouselDate(
      await prisma.serie.findMany({
        where: { AND: [serieCarouselQualityFilter, yearOnlySerieWhere(parsedYear)] },
        orderBy: { releaseYear: 'asc' },
        take: CAROUSEL_ITEM_LIMIT,
        include: serieCarouselLiteInclude,
      }),
    );
    res.json(series.map(mapSerieToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar séries year-tbd: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar lançamentos com data a confirmar.' });
  }
});

export default router;
