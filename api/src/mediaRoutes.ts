import { Router } from 'express';
import { prisma } from './clients';
import { Prisma } from '@prisma/client';
import { mapFilmeToMidia, mapSerieToMidia, mapAnimeToMidia, mapJogoToMidia, normalizeSearchText, withPortugueseTranslation } from './mappers';
import { fetchFilmeDetailsLive, fetchSerieDetailsLive, fetchAnimeDetailsLive, fetchJogoDetailsLive } from './externalDetails';
import {
  filmeQualityFilter,
  serieQualityFilter,
  animeQualityFilter,
  jogoQualityFilter,
} from './qualityFilters';
import { logger } from './logger';
import cacheMiddleware from './cacheMiddleware';
import adminMiddleware from './adminMiddleware';
import redisClient from './redisClient';



const router = Router();

const TWELVE_HOURS = 43200;
const TWENTY_FOUR_HOURS = 86400;
const CAROUSEL_ITEM_LIMIT = 500;

// Rota para Filmes
router.get('/filmes', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { filtro, genero, ano, status } = req.query;
  try {
    const allConditions: Prisma.FilmeWhereInput[] = [filmeQualityFilter];

    if (genero && genero !== 'todos') {
      allConditions.push({ genres: { some: { genero: { name: genero as string } } } });
    }

    if (status && status !== 'todos') {
      allConditions.push({ status: status as string });
    }

    if (ano && ano !== 'todos') {
      const year = parseInt(ano as string);
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59);
      allConditions.push({ releaseDate: { gte: startDate, lte: endDate } });
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

    const filmes = await prisma.filme.findMany({
      where,
      include: { streamingProviders: { include: { provider: true } } },
      orderBy,
    });
    res.json({ results: filmes.map(mapFilmeToMidia), total: filmes.length });
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

    // Invalidar o cache para esta mídia e listagens relacionadas
    if (redisClient) {
      try {
        const keysToInvalidate = [
          `cache:/api/filmes/${id}/details`,
          'cache:/api/filmes', // Limpa a listagem geral
          'cache:/api/trending?type=filmes', // Limpa tendências
          'cache:/api/pesquisa' // Limpa pesquisa (opcional, mas recomendado)
        ];
        
        for (const key of keysToInvalidate) {
          // Usamos um padrão para limpar chaves que podem ter query params
          const keys = await redisClient.keys(`${key}*`);
          if (keys.length > 0) {
            await redisClient.del(...keys);
            logger.info(`Cache invalidado para as chaves: ${keys.join(', ')}`);
          }
        }
      } catch (cacheErr) {
        logger.error(`Erro ao invalidar cache de filme: ${cacheErr}`);
      }
    }
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

    res.json({
      genres: genres.map(g => g.name),
      years: distinctYears,
      statuses: statuses.map(s => s.status),
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

    const filmes = await prisma.filme.findMany({
      where: {
        AND: [
          filmeQualityFilter,
          {
            releaseDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
      orderBy: {
        releaseDate: 'asc',
      },
      take: CAROUSEL_ITEM_LIMIT,
      include: {
        genres: { include: { genero: true } },
        streamingProviders: { include: { provider: true } },
      },
    });
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
    const filmes = await prisma.filme.findMany({
      where: {
        AND: [
          filmeQualityFilter,
          {
            releaseDate: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
      orderBy: {
        releaseDate: 'asc',
      },
      take: CAROUSEL_ITEM_LIMIT,
      include: {
        genres: { include: { genero: true } },
        streamingProviders: { include: { provider: true } },
      },
    });
    res.json(filmes.map(mapFilmeToMidia));
  } catch (error) {
    logger.error(`Erro ao buscar filmes por ano: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filmes por ano.' });
  }
});

// Rota para Séries
router.get('/series', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { filtro, genero, ano, status } = req.query;
  try {
    const where: Prisma.SerieWhereInput = {};

    if (genero && genero !== 'todos') {
      where.genres = {
        some: { genero: { name: genero as string } },
      };
    }

    if (status && status !== 'todos') {
      where.status = status as string;
    }

    if (ano && ano !== 'todos') {
      const year = parseInt(ano as string);
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59);
      where.firstAirDate = {
        gte: startDate,
        lte: endDate,
      };
    }

    const orderBy: Prisma.SerieOrderByWithRelationInput = filtro === 'populares' ? { popularity: 'desc' } : { name: 'asc' };

    const series = await prisma.serie.findMany({
      where,
      include: {
        genres: { include: { genero: true } },
        streamingProviders: { include: { provider: true } },
      },
      orderBy,
    });
    res.json({ results: series.map(mapSerieToMidia), total: series.length });
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

    // Invalidar o cache
    if (redisClient) {
      const cacheKey = `cache:/api/series/${id}/details`;
      await redisClient.del(cacheKey);
      logger.info(`Cache invalidado para a chave: ${cacheKey}`);
    }

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

    res.json({
      genres: genres.map(g => g.name),
      years: distinctYears,
      statuses: statuses.map(s => s.status),
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
      include: {
        genres: { include: { genero: true } },
        streamingProviders: { include: { provider: true } },
      },
    });
    res.json(series.map(mapSerieToMidia));
  } catch (error) {
    logger.error(`Erro ao buscar séries por ano: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar séries por ano.' });
  }
});

const blockedTags = ["Hentai", "Ecchi", "Yaoi", "Yuri", "Adult"];

// Rota para Animes
router.get('/animes', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { filtro, genero, ano, formato, fonte, status, safeSearch } = req.query;
  try {
    const where: Prisma.AnimeWhereInput = {};

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

    if (safeSearch === 'true') {
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

    const animes = await prisma.anime.findMany({
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
    });
    res.json({ results: await Promise.all(animes.map(async (a) => withPortugueseTranslation(mapAnimeToMidia(a)))), total: animes.length });
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

    // Invalidar o cache
    if (redisClient) {
      try {
        const keysToInvalidate = [
          `cache:/api/animes/${id}/details`,
          'cache:/api/animes',
          'cache:/api/trending?type=animes',
          'cache:/api/pesquisa'
        ];
        for (const key of keysToInvalidate) {
          const keys = await redisClient.keys(`${key}*`);
          if (keys.length > 0) {
            await redisClient.del(...keys);
            logger.info(`Cache invalidado para as chaves: ${keys.join(', ')}`);
          }
        }
      } catch (cacheErr) {
        logger.error(`Erro ao invalidar cache de anime: ${cacheErr}`);
      }
    }

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
      statuses: statuses.map(s => s.status).filter(Boolean),
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

    const jogos = await prisma.jogo.findMany({
      where,
      orderBy,
    });
    res.json({ results: await Promise.all(jogos.map(async (j) => withPortugueseTranslation(mapJogoToMidia(j)))), total: jogos.length });
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

    // Invalidar o cache
    if (redisClient) {
      const cacheKey = `cache:/api/jogos/${id}/details`;
      await redisClient.del(cacheKey);
      logger.info(`Cache invalidado para a chave: ${cacheKey}`);
    }

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
        platforms: { include: { plataforma: true } },
        genres: { include: { genero: true } },
      }
    });
    res.json(jogos.map(mapJogoToMidia));
  } catch (error) {
    logger.error(`Erro ao buscar jogos por ano: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos por ano.' });
  }
});

// Jogos em alta da semana — agrupados por categoria, modo e plataforma
router.get('/jogos/em-alta', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const perGroup = 8;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  try {
    const recentJogos = await prisma.jogo.findMany({
      where: {
        AND: [
          jogoQualityFilter,
          {
            OR: [
              { firstReleaseDate: { gte: weekAgo } },
              { rating: { gte: 70 } },
            ],
          },
        ],
      },
      orderBy: [{ hypes: 'desc' }, { rating: 'desc' }],
      take: 120,
      include: {
        platforms: { include: { plataforma: true } },
        genres: { include: { genero: true } },
        gameModes: { include: { gameMode: true } },
      },
    });

    const mapped = recentJogos.map(mapJogoToMidia);

    const porGenero: Record<string, typeof mapped> = {};
    const porPlataforma: Record<string, typeof mapped> = {};
    const porModo: Record<string, typeof mapped> = {};

    for (const jogo of mapped) {
      for (const genero of jogo.generos_api || []) {
        if (!porGenero[genero]) porGenero[genero] = [];
        if (porGenero[genero].length < perGroup) porGenero[genero].push(jogo);
      }
      for (const plataforma of jogo.plataformas_api || []) {
        const nome = plataforma.nome;
        if (!nome) continue;
        if (!porPlataforma[nome]) porPlataforma[nome] = [];
        if (porPlataforma[nome].length < perGroup) porPlataforma[nome].push(jogo);
      }
      for (const modo of jogo.modos_jogo || []) {
        if (!porModo[modo]) porModo[modo] = [];
        if (porModo[modo].length < perGroup) porModo[modo].push(jogo);
      }
    }

    res.json({
      destaques: mapped.slice(0, 12),
      porGenero,
      porPlataforma,
      porModo,
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
      results = popularFilmes.map(mapFilmeToMidia);
    } else if (type === 'series') {
      const popularSeries = await prisma.serie.findMany({
        where: serieQualityFilter,
        orderBy: { popularity: 'desc' },
        take,
      });
      results = popularSeries.map(mapSerieToMidia);
    } else if (type === 'animes') {
      const popularAnimes = await prisma.anime.findMany({
        where: animeQualityFilter,
        orderBy: { popularity: 'desc' },
        take,
      });
      results = popularAnimes.map(mapAnimeToMidia);
    } else if (type === 'jogos') {
      const popularJogos = await prisma.jogo.findMany({
        where: jogoQualityFilter,
        orderBy: { rating: 'desc' },
        take,
      });
      results = popularJogos.map(mapJogoToMidia);
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
        ...filmes.map(mapFilmeToMidia),
        ...series.map(mapSerieToMidia),
        ...animes.map(mapAnimeToMidia),
        ...jogos.map(mapJogoToMidia),
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

// Rota de Pesquisa Global (com suporte a acentuação)
router.get('/pesquisa', async (req, res) => {
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
      filmes: filmes.map(mapFilmeToMidia),
      series: series.map(mapSerieToMidia),
      animes: animes.map(mapAnimeToMidia),
      jogos: jogos.map(mapJogoToMidia),
    });

  } catch (error) {
    logger.error(`Erro ao realizar pesquisa: ${error}`);
    res.status(500).json({ error: 'Erro interno ao realizar pesquisa.' });
  }
});

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
  const { awardName, year } = req.query;
  try {
    const where: any = { premiacoes: { not: Prisma.JsonNull } };

    if (awardName) {
      where.premiacoes = { path: ['nome'], string_contains: awardName as string };
    }
    if (year) {
      where.premiacoes = { path: ['ano'], equals: parseInt(year as string) };
    }

    const filmes = await prisma.filme.findMany({ where, select: { id: true, tmdbId: true, title: true, posterPath: true, premiacoes: true } });
    const series = await prisma.serie.findMany({ where, select: { id: true, tmdbId: true, name: true, posterPath: true, premiacoes: true } });
    const animes = await prisma.anime.findMany({ where, select: { id: true, anilistId: true, titleRomaji: true, coverImage: true, premiacoes: true } });
    const jogos = await prisma.jogo.findMany({ where, select: { id: true, igdbId: true, name: true, cover: true, premiacoes: true } });

    const allAwards = [
      ...filmes.map(f => ({ ...f, type: 'filme' })),
      ...series.map(s => ({ ...s, type: 'serie' })),
      ...animes.map(a => ({ ...a, type: 'anime' })),
      ...jogos.map(j => ({ ...j, type: 'jogo' })),
    ];

    res.json(allAwards);

  } catch (error) {
    logger.error(`Erro ao buscar premiações: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar premiações.' });
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

    const { startDate, endDate } = getSeasonDateRange(parsedYear, season);

    const airingSchedules = await prisma.airingSchedule.findMany({
      where: {
        airingAt: {
          gte: startDate,
          lte: endDate,
        },
        anime: {
          ...animeQualityFilter,
          format: {
            in: ['TV', 'MOVIE', 'ONA', 'SPECIAL'],
          },
        },
      },
      include: {
        anime: {
          include: {
            airingSchedule: true,
            genres: { include: { genero: true } },
            studios: { include: { studio: true } },
            streamingLinks: true, // Adicionado para buscar as plataformas de streaming
            characters: { 
              include: { 
                character: true, 
                voiceActors: { include: { dublador: true } } 
              } 
            }
          }
        }
      },
      orderBy: {
        airingAt: 'asc',
      },
    });

    const animesMap = new Map<number, any>();
    airingSchedules.forEach(schedule => {
      if (schedule.anime && !animesMap.has(schedule.anime.anilistId)) {
        animesMap.set(schedule.anime.anilistId, schedule.anime);
      }
    });

    const uniqueAnimes = Array.from(animesMap.values()).slice(0, CAROUSEL_ITEM_LIMIT);

    const animesWithNextEpisode = uniqueAnimes.map(anime => {
      const now = new Date();
      const nextAiring = anime.airingSchedule
        .filter((s: any) => s.airingAt > now)
        .sort((a: any, b: any) => a.airingAt.getTime() - b.airingAt.getTime())[0];

      return {
        ...mapAnimeToMidia(anime),
        nextAiringEpisode: nextAiring ? { airingAt: nextAiring.airingAt, episode: nextAiring.episode } : null,
      };
    });

    res.status(200).json(animesWithNextEpisode);
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