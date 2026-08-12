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
import { logger } from '../logger';
import cacheMiddleware from '../cacheMiddleware';
import { TWELVE_HOURS, getCurrentSeason, animeCarouselInclude } from './mediaRoutesHelpers';

const router = Router();

// F-11: teto de /eventos — cada evento inclui ate 40 jogos (eventInclude), entao um
// teto fixo evita carregar a tabela Event inteira de uma vez.
const EVENTOS_LIST_LIMIT = 100;

const eventInclude = {
  games: {
    include: {
      genres: { include: { genero: true } },
      platforms: { include: { plataforma: true }, take: 4 },
    },
    orderBy: { firstReleaseDate: 'asc' as const },
    take: 80,
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
          platforms: { include: { plataforma: true }, take: 4 },
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

    // Sinopse ja vem traduzida do banco (preenchida pelo sync via translateSynopsisForStorage) —
    // nao precisa de traducao ao vivo aqui, mesmo padrao das rotas /filmes, /series, /animes, /jogos.
    res.json({
      eventos_games: eventosGames.map(mapEventToResponse),
      proximos: {
        filmes: filmesProximos.map((f) => mapFilmeToMidia(f)),
        series: seriesProximas.map((s) => mapSerieToMidia(s)),
        animes: animesProximos.map((a) => mapAnimeToMidia(a)),
        jogos: jogosProximos.map((j) => mapJogoToMidia(j)),
      },
      destaques_recentes: {
        filmes: filmesEmCartaz.map((f) => mapFilmeToMidia(f)),
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
      // F-11: sem isso a rota trazia a tabela Event inteira, cada evento com ate 40
      // jogos incluidos (eventInclude). Nenhum consumidor atual pagina essa rota, entao
      // um teto fixo (em vez de page/limit) evita a varredura sem quebrar o contrato
      // de resposta (array simples) esperado por quem chama /eventos hoje.
      take: EVENTOS_LIST_LIMIT,
    });

    res.json(events.map(mapEventToResponse));
  } catch (error) {
    logger.error(`Erro ao buscar eventos: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar eventos.' });
  }
});

export default router;
