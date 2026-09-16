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
  resolveSerieCarouselReleaseDate,
  mapAnimeToCarouselCard,
  mapJogoToCarouselCard,
  normalizeSearchText,
  toCalendarDateParts,
} from '../mappers';
import {
  filmeQualityFilter,
  filmeCarouselQualityFilter,
  filmeCarouselLocalizationFilter,
  serieQualityFilter,
  serieCarouselQualityFilter,
  animeQualityFilter,
  jogoQualityFilter,
} from '../qualityFilters';
import { logger } from '../logger';
import cacheMiddleware from '../cacheMiddleware';
import { searchRateLimiter, homepageRateLimiter } from '../securityMiddleware';
import {
  TWELVE_HOURS,
  CAROUSEL_ITEM_LIMIT,
  getCurrentSeason,
  fetchFilmesForCarousel,
  serieCarouselLiteInclude,
  animeCarouselInclude,
  cardListInclude,
  pickAroundToday,
} from './mediaRoutesHelpers';

const router = Router();

/**
 * Homepage do carrossel: ~40 títulos antes de hoje + ~40 a partir de hoje.
 * Evita `take` nos mais antigos da janela de 90 dias, que escondia o mês atual.
 */
const HOMEPAGE_AROUND_PAST = 40;
const HOMEPAGE_AROUND_FUTURE = 40;

/** Lançamentos recentes no bootstrap do carrossel (análogo a em cartaz nos filmes) */
const getRecentCarouselPastStart = (days = 90): Date => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
};

const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const endOfNextMonth = (from: Date) =>
  new Date(from.getFullYear(), from.getMonth() + 2, 0, 23, 59, 59, 999);

const carouselSeriePriorityWindow = (
  windowStart: Date,
  nextMonthEnd: Date,
): Prisma.SerieWhereInput => ({
  OR: [
    { firstAirDate: { gte: windowStart, lte: nextMonthEnd } },
    { lastAirDate: { gte: windowStart, lte: nextMonthEnd } },
    { nextEpisodeAirDate: { gte: windowStart, lte: nextMonthEnd } },
    {
      seasons: {
        some: {
          seasonNumber: { gt: 0 },
          airDate: { gte: windowStart, lte: nextMonthEnd },
        },
      },
    },
  ],
});

const carouselSerieRecentPastWindow = (
  windowStart: Date,
  recentPastStart: Date,
): Prisma.SerieWhereInput => ({
  OR: [
    { firstAirDate: { gte: recentPastStart, lt: windowStart } },
    { lastAirDate: { gte: recentPastStart, lt: windowStart } },
    { nextEpisodeAirDate: { gte: recentPastStart, lt: windowStart } },
    {
      seasons: {
        some: {
          seasonNumber: { gt: 0 },
          airDate: { gte: recentPastStart, lt: windowStart },
        },
      },
    },
  ],
});

// Homepage — em torno de hoje (passado recente + próximo), não os 80 mais antigos da janela
router.get('/homepage', homepageRateLimiter, cacheMiddleware(TWELVE_HOURS), async (_req, res) => {
  const year = new Date().getFullYear();
  const season = getCurrentSeason();
  const today = startOfToday();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const nextMonthEnd = endOfNextMonth(today);
  const recentPastStart = getRecentCarouselPastStart();
  const airingHorizon = new Date(today);
  airingHorizon.setDate(airingHorizon.getDate() + 21);

  try {
    const [
      filmePast,
      filmeFuture,
      seriePriority,
      seriePast,
      jogoPast,
      jogoFuture,
      animes,
    ] = await Promise.all([
      fetchFilmesForCarousel(
        { releaseDate: { gte: recentPastStart, lt: today } },
        { orderBy: { releaseDate: 'desc' }, take: HOMEPAGE_AROUND_PAST, year },
      ),
      fetchFilmesForCarousel(
        { releaseDate: { gte: today, lte: nextMonthEnd } },
        { orderBy: { releaseDate: 'asc' }, take: HOMEPAGE_AROUND_FUTURE, year },
      ),
      prisma.serie.findMany({
        where: {
          AND: [serieCarouselQualityFilter, carouselSeriePriorityWindow(monthStart, nextMonthEnd)],
        },
        orderBy: { firstAirDate: 'asc' },
        take: CAROUSEL_ITEM_LIMIT,
        include: serieCarouselLiteInclude,
      }),
      prisma.serie.findMany({
        where: {
          AND: [serieCarouselQualityFilter, carouselSerieRecentPastWindow(monthStart, recentPastStart)],
        },
        orderBy: { firstAirDate: 'asc' },
        take: CAROUSEL_ITEM_LIMIT,
        include: serieCarouselLiteInclude,
      }),
      prisma.jogo.findMany({
        where: {
          AND: [jogoQualityFilter, { firstReleaseDate: { gte: recentPastStart, lt: today } }],
        },
        orderBy: { firstReleaseDate: 'desc' },
        take: HOMEPAGE_AROUND_PAST,
        include: {
          genres: { include: { genero: true } },
          platforms: { include: { plataforma: true }, take: 4 },
        },
      }),
      prisma.jogo.findMany({
        where: {
          AND: [jogoQualityFilter, { firstReleaseDate: { gte: today, lte: nextMonthEnd } }],
        },
        orderBy: { firstReleaseDate: 'asc' },
        take: HOMEPAGE_AROUND_FUTURE,
        include: {
          genres: { include: { genero: true } },
          platforms: { include: { plataforma: true }, take: 4 },
        },
      }),
      prisma.anime.findMany({
        where: {
          ...animeQualityFilter,
          format: { in: ['TV', 'TV_SHORT', 'MOVIE', 'ONA'] },
          OR: [
            { seasonYear: year, season },
            { startDate: { gte: monthStart, lte: nextMonthEnd } },
            { airingSchedule: { some: { airingAt: { gte: today, lte: airingHorizon } } } },
          ],
        },
        orderBy: { startDate: 'asc' },
        take: CAROUSEL_ITEM_LIMIT,
        include: animeCarouselInclude,
      }),
    ]);

    const filmesRaw = [...filmePast].reverse().concat(filmeFuture);
    const seriesById = new Map<number, (typeof seriePriority)[number]>();
    for (const item of [...seriePriority, ...seriePast]) {
      seriesById.set(item.tmdbId, item);
    }
    const series = pickAroundToday(
      sortSeriesByCarouselDate(Array.from(seriesById.values())),
      (serie) => resolveSerieCarouselReleaseDate(serie),
      HOMEPAGE_AROUND_PAST,
      HOMEPAGE_AROUND_FUTURE,
      today,
    );
    const jogos = [...jogoPast].reverse().concat(jogoFuture);
    const animesAround = pickAroundToday(
      animes,
      (anime) => {
        const next = anime.airingSchedule?.[0]?.airingAt;
        if (next) {
          const date = new Date(next);
          date.setHours(0, 0, 0, 0);
          return date;
        }
        const parts = toCalendarDateParts(anime.startDate);
        return parts ? new Date(parts.year, parts.month - 1, parts.day) : null;
      },
      HOMEPAGE_AROUND_PAST,
      HOMEPAGE_AROUND_FUTURE,
      today,
    );

    res.json({
      filmes: filmesRaw.map(mapFilmeToCarouselCard),
      series: series.map(mapSerieToCarouselCard),
      jogos: jogos.map(mapJogoToCarouselCard),
      animes: animesAround.map(mapAnimeToCarouselCard),
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
