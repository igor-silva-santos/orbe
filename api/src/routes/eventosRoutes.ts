import { Router } from 'express';
import { prisma } from '../clients';
import { Prisma } from '@prisma/client';
import { mapFilmeToMidia, mapSerieToMidia, mapAnimeToMidia, mapJogoToMidia, mapEventToResponse } from '../mappers';
import {
  filmeQualityFilter,
  serieQualityFilter,
  animeSeasonQualityFilter,
  jogoQualityFilter,
} from '../qualityFilters';
import { getYearBounds } from '../eventHelpers';
import { logger } from '../logger';
import cacheMiddleware from '../cacheMiddleware';
import { TWELVE_HOURS, getCurrentSeason, animeCarouselInclude, cardListInclude, parsePositiveIntId } from './mediaRoutesHelpers';

const router = Router();

const EVENTOS_LIST_LIMIT = 200;
const EVENT_GAMES_PREVIEW = 16;
const EVENT_GAMES_DETAIL = 120;

const gamePreviewInclude = {
  genres: { include: { genero: true } },
  platforms: { include: { plataforma: true }, take: 4 },
};

const eventListInclude = {
  games: {
    include: gamePreviewInclude,
    orderBy: { firstReleaseDate: 'asc' as const },
    take: EVENT_GAMES_PREVIEW,
  },
  _count: { select: { games: true } },
};

const eventDetailInclude = {
  games: {
    include: gamePreviewInclude,
    orderBy: { firstReleaseDate: 'asc' as const },
    take: EVENT_GAMES_DETAIL,
  },
  _count: { select: { games: true } },
};

const getProximosWindow = () => {
  const now = new Date();
  const threeMonthsAhead = new Date(now);
  threeMonthsAhead.setMonth(threeMonthsAhead.getMonth() + 3);
  return { now, threeMonthsAhead };
};

function buildYearEventWhere(year: number): Prisma.EventWhereInput {
  const { start: yearStart, end: yearEnd } = getYearBounds(year);
  return {
    OR: [
      { start_time: { gte: yearStart, lte: yearEnd } },
      { end_time: { gte: yearStart, lte: yearEnd } },
      { AND: [{ start_time: { lte: yearEnd } }, { end_time: { gte: yearStart } }] },
      { AND: [{ start_time: { lte: yearEnd } }, { end_time: null }] },
    ],
  };
}

function parseYearQuery(raw: unknown, fallback: number): number {
  if (typeof raw !== 'string' || !/^\d{4}$/.test(raw)) return fallback;
  const year = parseInt(raw, 10);
  if (year < 2000 || year > 2100) return fallback;
  return year;
}

// Resumo agregado para gavetas da home/jogos (mantém compatibilidade)
router.get('/eventos/resumo', cacheMiddleware(TWELVE_HOURS), async (_req, res) => {
  const now = new Date();
  const { threeMonthsAhead } = getProximosWindow();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const year = now.getFullYear();
  const season = getCurrentSeason();

  const resumoEventInclude = {
    games: {
      include: gamePreviewInclude,
      orderBy: { firstReleaseDate: 'asc' as const },
      take: EVENT_GAMES_PREVIEW,
    },
    _count: { select: { games: true } },
  };

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
        include: resumoEventInclude,
        orderBy: { start_time: 'asc' },
        take: 20,
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
        include: cardListInclude,
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
          platforms: { include: { plataforma: true }, take: 4 },
        },
      }),
      prisma.filme.findMany({
        where: { AND: [filmeQualityFilter, { emCartaz: true }] },
        orderBy: { popularity: 'desc' },
        take: 20,
        include: cardListInclude,
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
        include: resumoEventInclude,
        orderBy: { start_time: 'desc' },
        take: 10,
      }),
    ]);

    res.json({
      eventos_games: eventosGames.map((e) => mapEventToResponse(e, { gamesLimit: EVENT_GAMES_PREVIEW })),
      proximos: {
        filmes: filmesProximos.map((f) => mapFilmeToMidia(f)),
        series: seriesProximas.map((s) => mapSerieToMidia(s)),
        animes: animesProximos.map((a) => mapAnimeToMidia(a)),
        jogos: jogosProximos.map((j) => mapJogoToMidia(j)),
      },
      destaques_recentes: {
        filmes: filmesEmCartaz.map((f) => mapFilmeToMidia(f)),
        eventos: eventosRecentes.map((e) => mapEventToResponse(e, { gamesLimit: EVENT_GAMES_PREVIEW })),
      },
    });
  } catch (error) {
    logger.error(`Erro ao buscar resumo de eventos: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar resumo de eventos.' });
  }
});

// Lista rápida de eventos de um ano (página Eventos — sem filmes/séries/animes extras)
router.get('/eventos/ano', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const year = parseYearQuery(req.query.year, new Date().getFullYear());

  try {
    const events = await prisma.event.findMany({
      where: buildYearEventWhere(year),
      include: eventListInclude,
      orderBy: { start_time: 'asc' },
      take: EVENTOS_LIST_LIMIT,
    });

    res.json({
      ano: year,
      total: events.length,
      fonte: 'IGDB',
      eventos: events.map((event) => mapEventToResponse(event, { gamesLimit: EVENT_GAMES_PREVIEW })),
    });
  } catch (error) {
    logger.error(`Erro ao buscar eventos do ano ${year}: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar eventos do ano.' });
  }
});

// Rota legada — eventos por status (upcoming/ongoing/past)
router.get('/eventos', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const status = typeof req.query.status === 'string' ? req.query.status : 'all';
  const year = req.query.year != null ? parseYearQuery(req.query.year, new Date().getFullYear()) : null;
  const now = new Date();

  try {
    const conditions: Prisma.EventWhereInput[] = [];

    if (year != null) {
      conditions.push(buildYearEventWhere(year));
    }

    if (status === 'upcoming') {
      conditions.push({ start_time: { gte: now } });
    } else if (status === 'ongoing') {
      conditions.push({
        start_time: { lte: now },
        OR: [{ end_time: { gte: now } }, { end_time: null }],
      });
    } else if (status === 'past') {
      conditions.push({ end_time: { lt: now } });
    }

    const where: Prisma.EventWhereInput = conditions.length > 0 ? { AND: conditions } : {};

    const events = await prisma.event.findMany({
      where,
      include: eventListInclude,
      orderBy: { start_time: 'asc' },
      take: EVENTOS_LIST_LIMIT,
    });

    res.json(events.map((event) => mapEventToResponse(event, { gamesLimit: EVENT_GAMES_PREVIEW })));
  } catch (error) {
    logger.error(`Erro ao buscar eventos: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar eventos.' });
  }
});

// Detalhe de um evento com mais jogos anunciados
router.get('/eventos/:id', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const igdbId = parsePositiveIntId(req.params.id);
  if (!igdbId) {
    return res.status(400).json({ error: 'ID de evento inválido.' });
  }

  try {
    const event = await prisma.event.findUnique({
      where: { igdbId },
      include: eventDetailInclude,
    });

    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    res.json(mapEventToResponse(event));
  } catch (error) {
    logger.error(`Erro ao buscar evento ${igdbId}: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar evento.' });
  }
});

export default router;
