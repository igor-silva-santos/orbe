import { Router } from 'express';
import { prisma } from '../clients';
import { Prisma } from '@prisma/client';
import { mapAnimeToMidia, mapAnimeToCarouselCard } from '../mappers';
import { fetchAnimeDetailsLive } from '../externalDetails';
import { animeQualityFilter, animeSeasonQualityFilter } from '../qualityFilters';
import { logger } from '../logger';
import cacheMiddleware from '../cacheMiddleware';
import adminMiddleware from '../adminMiddleware';
import { invalidateMediaCaches } from '../cacheInvalidation';
import { translateAnimeStatusLabel } from '../statusLabels';
import { detailsRateLimiter } from '../securityMiddleware';
import { mapAnimeAdminUpdate } from '../adminUpdateMappers';
import {
  TWELVE_HOURS,
  TWENTY_FOUR_HOURS,
  DETAILS_CACHE_SECONDS,
  CAROUSEL_ITEM_LIMIT,
  parsePagination,
  parsePositiveIntId,
  animeCarouselInclude,
} from './mediaRoutesHelpers';
import { getBrazilCalendarWeekBounds, getWeekdayInBrazil } from '../brazilTimezone';

const router = Router();

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
        include: animeCarouselInclude,
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
router.get('/animes/:id/details', detailsRateLimiter, cacheMiddleware(DETAILS_CACHE_SECONDS), async (req, res) => {
  const anilistId = parsePositiveIntId(req.params.id);
  if (!anilistId) {
    return res.status(400).json({ error: 'ID de anime inválido.' });
  }
  try {
    const anime = await fetchAnimeDetailsLive(anilistId);
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
  const anilistId = parsePositiveIntId(req.params.id);
  if (!anilistId) {
    return res.status(400).json({ error: 'ID de anime inválido.' });
  }

  const data = mapAnimeAdminUpdate(req.body as Record<string, unknown>);
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'Nenhum campo editável fornecido.' });
  }

  try {
    const updatedAnime = await prisma.anime.update({
      where: { anilistId },
      data,
    });

    await invalidateMediaCaches('animes', String(anilistId));
    res.json(mapAnimeToMidia(updatedAnime));
  } catch (error) {
    logger.error(`Erro ao editar o anime ID ${anilistId}: ${error}`);
    res.status(500).json({ error: 'Erro ao editar o anime.' });
  }
});

// Rota para buscar opções de filtros de Animes
// Nota F-07: aqui `seasonYear` ja e o ano em si (coluna Int), nao uma data —
// diferente de filme/serie/jogo, o distinct abaixo ja retorna uma linha por ano
// (nao uma por data), entao nao ha necessidade de EXTRACT(YEAR FROM ...) via SQL raw.
router.get('/animes/filtros', cacheMiddleware(TWENTY_FOUR_HOURS), async (req, res) => {
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
  const anilistId = parsePositiveIntId(id);
  if (!anilistId) {
    return res.status(400).json({ error: 'ID de anime inválido.' });
  }
  try {
    const nextAiring = await prisma.airingSchedule.findFirst({
      where: {
        anime: { anilistId },
        airingAt: { gte: new Date() },
      },
      // F-13: ordenar por `episode` pega o menor numero de episodio entre os
      // futuros, nao o mais proximo no tempo — com reexibicao/episodio especial
      // fora de ordem isso mostra o episodio errado. `airingAt` e o campo certo
      // pra "proximo episodio" de fato.
      orderBy: {
        airingAt: 'asc',
      },
    });
    res.json(nextAiring);
  } catch (error) {
    logger.error(`Erro ao buscar próximo episódio para o anime ID ${id}: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar informações do próximo episódio.' });
  }
});

// Rota para Animes da Semana
router.get('/animes/weekly-schedule', async (req, res) => {
  try {
    const { start: startDate, end: endDate } = getBrazilCalendarWeekBounds(new Date());

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
      const day = getWeekdayInBrazil(item.airingAt);
      const mapped = {
        ...mapAnimeToMidia(item.anime),
        nextAiringEpisode: {
          episode: item.episode,
          airingAt: item.airingAt.toISOString(),
        },
      };
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(mapped);
      return acc;
    }, {} as Record<number, ReturnType<typeof mapAnimeToMidia>[]>);

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
        streamingLinks: { take: 5 },
        externalLinks: { take: 12 },
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

export default router;
