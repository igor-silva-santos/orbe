import { Router } from 'express';
import { prisma } from '../clients';
import { Prisma } from '@prisma/client';
import {
  mapFilmeToMidia,
  mapSerieToMidia,
  mapAnimeToMidia,
  mapJogoToMidia,
  mapFilmeToCarouselCard,
  mapSerieToCarouselCard,
  sortSeriesByCarouselDate,
  mapAnimeToCarouselCard,
  mapJogoToCarouselCard,
  normalizeSearchText,
} from '../mappers';
import {
  filmeQualityFilter,
  filmeCarouselQualityFilter,
  filmeCarouselLocalizationFilter,
  serieQualityFilter,
  animeQualityFilter,
  jogoQualityFilter,
} from '../qualityFilters';
import { logger } from '../logger';
import cacheMiddleware from '../cacheMiddleware';
import { searchRateLimiter, homepageRateLimiter } from '../securityMiddleware';
import {
  TWELVE_HOURS,
  getCurrentSeason,
  fetchFilmesForCarousel,
  carouselLiteInclude,
  serieCarouselLiteInclude,
  animeCarouselInclude,
  cardListInclude,
} from './mediaRoutesHelpers';

const router = Router();

/**
 * Cap por tipo na homepage. O carrossel do cliente já pré-carrega os meses
 * adjacentes automaticamente no mount (MediaCarousel/AnimeCarousel, via
 * rotas by-month) e só precisa de um punhado de itens antes disso terminar —
 * um valor bem menor que o antigo (200) já cobre isso sem inflar o payload
 * inicial do /homepage à toa (filmes é o único tipo que de fato batia no
 * limite antigo; séries/animes/jogos já retornavam bem menos que isso).
 */
const HOMEPAGE_ITEM_LIMIT = 80;

/** Janela inicial SSR: mês atual (meses adjacentes carregam no cliente ao rolar) */
const getHomepageDateWindow = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return { start, end };
};

/** Lançamentos recentes no bootstrap do carrossel (análogo a em cartaz nos filmes) */
const getRecentCarouselPastStart = (days = 90): Date => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Filmes: mês atual + próximo + passado recente (igual jogos/séries) */
const carouselFilmeRecentPastAndNextMonth = (
  windowStart: Date,
  windowEnd: Date,
  recentPastStart: Date,
): Prisma.FilmeWhereInput => {
  const nextMonthEnd = new Date(windowEnd.getFullYear(), windowEnd.getMonth() + 2, 0, 23, 59, 59, 999);
  return {
    OR: [
      { releaseDate: { gte: windowStart, lte: nextMonthEnd } },
      { releaseDate: { gte: recentPastStart, lt: windowStart } },
      {
        AND: [{ emCartaz: true }, { releaseDate: { lte: nextMonthEnd } }],
      },
    ],
  };
};

/** Inclui o mês seguinte no bootstrap — evita carrossel preso no mês atual sem lançamentos futuros */
const carouselDateRecentPastAndNextMonth = (
  windowStart: Date,
  windowEnd: Date,
  recentPastStart: Date,
): Prisma.JogoWhereInput => {
  const nextMonthEnd = new Date(windowEnd.getFullYear(), windowEnd.getMonth() + 2, 0, 23, 59, 59, 999);
  return {
    OR: [
      { firstReleaseDate: { gte: windowStart, lte: nextMonthEnd } },
      { firstReleaseDate: { gte: recentPastStart, lt: windowStart } },
    ],
  };
};

const carouselFirstAirOrRecentPast = (
  windowStart: Date,
  windowEnd: Date,
  recentPastStart: Date,
): Prisma.SerieWhereInput => {
  const nextMonthEnd = new Date(windowEnd.getFullYear(), windowEnd.getMonth() + 2, 0, 23, 59, 59, 999);
  return {
    OR: [
      { firstAirDate: { gte: windowStart, lte: nextMonthEnd } },
      { firstAirDate: { gte: recentPastStart, lt: windowStart } },
      {
        seasons: {
          some: {
            seasonNumber: { gt: 0 },
            airDate: { gte: windowStart, lte: nextMonthEnd },
          },
        },
      },
      {
        seasons: {
          some: {
            seasonNumber: { gt: 0 },
            airDate: { gte: recentPastStart, lt: windowStart },
          },
        },
      },
    ],
  };
};

// Homepage — payload leve: mês atual; carrossel carrega adjacentes sob demanda
router.get('/homepage', homepageRateLimiter, cacheMiddleware(TWELVE_HOURS), async (_req, res) => {
  const year = new Date().getFullYear();
  const season = getCurrentSeason();
  const { start: windowStart, end: windowEnd } = getHomepageDateWindow();
  const recentPastStart = getRecentCarouselPastStart();

  try {
    const [filmesRaw, series, jogos, animes] = await Promise.all([
      fetchFilmesForCarousel(carouselFilmeRecentPastAndNextMonth(windowStart, windowEnd, recentPastStart), {
        orderBy: { releaseDate: 'asc' },
        take: HOMEPAGE_ITEM_LIMIT,
        year,
      }),
      prisma.serie.findMany({
        where: {
          AND: [
            serieQualityFilter,
            carouselFirstAirOrRecentPast(windowStart, windowEnd, recentPastStart),
          ],
        },
        orderBy: { firstAirDate: 'asc' },
        take: HOMEPAGE_ITEM_LIMIT,
        include: serieCarouselLiteInclude,
      }).then(sortSeriesByCarouselDate),
      prisma.jogo.findMany({
        where: {
          AND: [
            jogoQualityFilter,
            carouselDateRecentPastAndNextMonth(windowStart, windowEnd, recentPastStart),
          ],
        },
        orderBy: { firstReleaseDate: 'asc' },
        take: HOMEPAGE_ITEM_LIMIT,
        include: {
          genres: { include: { genero: true } },
          platforms: { include: { plataforma: true }, take: 4 },
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
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const streamingFilmeFilters = [
    filmeCarouselQualityFilter,
    filmeCarouselLocalizationFilter,
    { streamingProviders: { some: {} } },
    { emCartaz: false },
  ];

  try {
    const [cinema, streamingFilmesWeek, streamingFilmesFallback, streamingSeriesWeek, streamingSeriesFallback, destaquesJogos] =
      await Promise.all([
      prisma.filme.findMany({
        where: { AND: [filmeCarouselQualityFilter, filmeCarouselLocalizationFilter, { emCartaz: true }] },
        orderBy: { popularity: 'desc' },
        take: 12,
        include: cardListInclude,
      }),
      prisma.filme.findMany({
        where: {
          AND: [...streamingFilmeFilters, { releaseDate: { gte: weekAgo, lte: now } }],
        },
        orderBy: [{ popularity: 'desc' }, { voteCount: 'desc' }],
        take: 12,
        include: cardListInclude,
      }),
      prisma.filme.findMany({
        where: { AND: streamingFilmeFilters },
        orderBy: [{ popularity: 'desc' }, { voteCount: 'desc' }],
        take: 12,
        include: cardListInclude,
      }),
      prisma.serie.findMany({
        where: {
          AND: [
            serieQualityFilter,
            { streamingProviders: { some: {} } },
            {
              OR: [
                { lastAirDate: { gte: weekAgo, lte: now } },
                { firstAirDate: { gte: weekAgo, lte: now } },
              ],
            },
          ],
        },
        orderBy: [{ popularity: 'desc' }, { voteCount: 'desc' }],
        take: 12,
        include: { streamingProviders: { include: { provider: true } } },
      }),
      prisma.serie.findMany({
        where: {
          AND: [serieQualityFilter, { streamingProviders: { some: {} } }],
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
          platforms: { include: { plataforma: true }, take: 4 },
        },
      }),
    ]);

    const dedupeFilmes = <T extends { tmdbId: number }>(items: T[]) => {
      const seen = new Set<number>();
      return items.filter((item) => {
        if (seen.has(item.tmdbId)) return false;
        seen.add(item.tmdbId);
        return true;
      });
    };

    const streamingFilmes = dedupeFilmes([...streamingFilmesWeek, ...streamingFilmesFallback]).slice(0, 12);
    const streamingSeries = dedupeFilmes([...streamingSeriesWeek, ...streamingSeriesFallback]).slice(0, 12);

    res.json({
      data: now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      // Sinopse ja vem traduzida do banco (preenchida pelo sync via translateSynopsisForStorage) —
      // nao precisa de traducao ao vivo aqui, mesmo padrao das rotas /filmes, /series, /animes, /jogos.
      cinema: cinema.map((f) => mapFilmeToMidia(f)),
      streamingFilmes: streamingFilmes.map((f) => mapFilmeToMidia(f)),
      streamingSeries: streamingSeries.map((s) => mapSerieToMidia(s)),
      destaquesJogos: destaquesJogos.map((j) => mapJogoToMidia(j)),
    });
  } catch (error) {
    logger.error(`Erro ao buscar conteúdo de hoje: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar conteúdo de hoje.' });
  }
});

// Rota para Conteúdo em Alta (Trending)
router.get('/trending', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { type, limit = 10 } = req.query;
  const take = parseInt(limit as string, 10);

  try {
    let results: any[] = [];

    // Sinopse ja vem traduzida do banco (preenchida pelo sync via translateSynopsisForStorage) —
    // nao precisa de traducao ao vivo aqui, mesmo padrao das rotas /filmes, /series, /animes, /jogos.
    if (type === 'filmes') {
      const popularFilmes = await prisma.filme.findMany({
        where: filmeQualityFilter,
        orderBy: { popularity: 'desc' },
        take,
      });
      results = popularFilmes.map((f) => mapFilmeToMidia(f));
    } else if (type === 'series') {
      const popularSeries = await prisma.serie.findMany({
        where: serieQualityFilter,
        orderBy: { popularity: 'desc' },
        take,
      });
      results = popularSeries.map((s) => mapSerieToMidia(s));
    } else if (type === 'animes') {
      const popularAnimes = await prisma.anime.findMany({
        where: animeQualityFilter,
        orderBy: { popularity: 'desc' },
        take,
      });
      results = popularAnimes.map((a) => mapAnimeToMidia(a));
    } else if (type === 'jogos') {
      const popularJogos = await prisma.jogo.findMany({
        where: jogoQualityFilter,
        orderBy: { rating: 'desc' },
        take,
      });
      results = popularJogos.map((j) => mapJogoToMidia(j));
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
        ...filmes.map((f) => mapFilmeToMidia(f)),
        ...series.map((s) => mapSerieToMidia(s)),
        ...animes.map((a) => mapAnimeToMidia(a)),
        ...jogos.map((j) => mapJogoToMidia(j)),
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
const SEARCH_RESULT_LIMIT = 50;

const searchHandler = async (req: import('express').Request, res: import('express').Response) => {
  const { q, category } = req.query;

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: "O parâmetro de pesquisa 'q' é obrigatório." });
  }

  try {
    const normalizedQ = normalizeSearchText(q);
    const categoryFilter = category && category !== 'todos' ? (category as string) : null;
    const qTrim = q.trim();

    const matchesQuery = (text: string | null | undefined) =>
      !!text && normalizeSearchText(text).includes(normalizedQ);

    const accentFilter = <T>(
      items: T[],
      fields: ((item: T) => string | null | undefined)[],
    ): T[] => items.filter((item) => fields.some((f) => matchesQuery(f(item))));

    const promises = [];

    if (!categoryFilter || categoryFilter === 'filmes') {
      promises.push(
        prisma.filme.findMany({
          take: SEARCH_RESULT_LIMIT,
          where: {
            OR: [
              { title: { contains: qTrim, mode: 'insensitive' } },
              { originalTitle: { contains: qTrim, mode: 'insensitive' } },
            ],
          },
          orderBy: { popularity: 'desc' },
          include: { streamingProviders: { include: { provider: true } } },
        }).then((items) => accentFilter(items, [(f) => f.title, (f) => f.originalTitle]))
      );
    } else {
      promises.push(Promise.resolve([]));
    }

    if (!categoryFilter || categoryFilter === 'series') {
      promises.push(
        prisma.serie.findMany({
          take: SEARCH_RESULT_LIMIT,
          where: {
            OR: [
              { name: { contains: qTrim, mode: 'insensitive' } },
              { originalName: { contains: qTrim, mode: 'insensitive' } },
            ],
          },
          orderBy: { popularity: 'desc' },
          include: { streamingProviders: { include: { provider: true } } },
        }).then((items) => accentFilter(items, [(s) => s.name, (s) => s.originalName]))
      );
    } else {
      promises.push(Promise.resolve([]));
    }

    if (!categoryFilter || categoryFilter === 'animes') {
      promises.push(
        prisma.anime.findMany({
          take: SEARCH_RESULT_LIMIT,
          where: {
            OR: [
              { titleRomaji: { contains: qTrim, mode: 'insensitive' } },
              { titleEnglish: { contains: qTrim, mode: 'insensitive' } },
              { titleNative: { contains: qTrim, mode: 'insensitive' } },
            ],
          },
          orderBy: { popularity: 'desc' },
        }).then((items) =>
          accentFilter(items, [(a) => a.titleRomaji, (a) => a.titleEnglish, (a) => a.titleNative])
        )
      );
    } else {
      promises.push(Promise.resolve([]));
    }

    if (!categoryFilter || categoryFilter === 'jogos') {
      promises.push(
        prisma.jogo.findMany({
          take: SEARCH_RESULT_LIMIT,
          where: { name: { contains: qTrim, mode: 'insensitive' } },
          orderBy: { rating: 'desc' },
        }).then((items) => accentFilter(items, [(j) => j.name]))
      );
    } else {
      promises.push(Promise.resolve([]));
    }

    const [filmes, series, animes, jogos] = await Promise.all(promises);

    res.json({
      filmes: filmes.map((f) => mapFilmeToMidia(f)),
      series: series.map((s) => mapSerieToMidia(s)),
      animes: animes.map((a) => mapAnimeToMidia(a)),
      jogos: jogos.map((j) => mapJogoToMidia(j)),
    });

  } catch (error) {
    logger.error(`Erro ao realizar pesquisa: ${error}`);
    res.status(500).json({ error: 'Erro interno ao realizar pesquisa.' });
  }
};

router.get('/pesquisa', searchRateLimiter, searchHandler);
router.get('/search', searchRateLimiter, searchHandler);

export default router;
