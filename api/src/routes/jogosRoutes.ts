import { Router } from 'express';
import { prisma } from '../clients';
import { Prisma } from '@prisma/client';
import { mapJogoToMidia, mapJogoToCarouselCard } from '../mappers';
import { fetchJogoDetailsLive } from '../externalDetails';
import { fetchSteamAppDetails, isPlausibleBrlSteamPriceCents, isPlausibleSteamDiscountPercent } from '../steamClient';
import { jogoQualityFilter } from '../qualityFilters';
import { logger } from '../logger';
import cacheMiddleware from '../cacheMiddleware';
import adminMiddleware from '../adminMiddleware';
import { invalidateMediaCaches } from '../cacheInvalidation';
import { detailsRateLimiter } from '../securityMiddleware';
import { mapJogoAdminUpdate } from '../adminUpdateMappers';
import { yearOnlyJogoWhere } from '../yearOnlyRelease';
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
} from './mediaRoutesHelpers';

const router = Router();

// Rota para Jogos
router.get('/jogos', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { filtro, genero, plataforma, modo, ano, mes } = req.query;
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  try {
    const allConditions: Prisma.JogoWhereInput[] = [];

    const monthRange = typeof mes === 'string' ? parseMonthQuery(mes, ano as string | undefined) : null;

    if (monthRange) {
      allConditions.push({ firstReleaseDate: { gte: monthRange.startDate, lte: monthRange.endDate } });
    } else if (ano && ano !== 'todos') {
      const year = parseInt(ano as string, 10);
      if (!Number.isNaN(year)) {
        allConditions.push({
          firstReleaseDate: {
            gte: new Date(year, 0, 1),
            lte: new Date(year, 11, 31, 23, 59, 59, 999),
          },
        });
      }
    }

    if (genero && genero !== 'todos') {
      allConditions.push({ genres: { some: { genero: { name: genero as string } } } });
    }
    if (plataforma && plataforma !== 'todos') {
      allConditions.push({ platforms: { some: { plataforma: { name: plataforma as string } } } });
    }
    if (modo && modo !== 'todos') {
      allConditions.push({ gameModes: { some: { gameMode: { name: modo as string } } } });
    }

    const where: Prisma.JogoWhereInput = allConditions.length > 0 ? { AND: allConditions } : {};

    // `follows` (quantos usuários seguem o jogo no IGDB) é o sinal de popularidade real;
    // `rating` é nota de qualidade, não indica se o jogo está "em alta" agora.
    const orderBy: Prisma.JogoOrderByWithRelationInput[] | Prisma.JogoOrderByWithRelationInput =
      filtro === 'populares'
        ? [{ follows: { sort: 'desc', nulls: 'last' } }, { rating: 'desc' }]
        : { name: 'asc' };

    const [jogos, total] = await Promise.all([
      prisma.jogo.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          genres: { include: { genero: true } },
          platforms: { include: { plataforma: true }, take: 4 },
        },
      }),
      prisma.jogo.count({ where }),
    ]);
    res.json({ results: jogos.map(mapJogoToMidia), total, page, limit });
  } catch (error) {
    logger.error(`Erro ao buscar jogos: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos.' });
  }
});

// Preço Steam ao vivo (cards/modal quando o banco ainda não tem o valor)
router.get('/jogos/:id/steam-price', cacheMiddleware(60 * 15), async (req, res) => {
  const igdbId = parsePositiveIntId(req.params.id);
  if (!igdbId) {
    return res.status(400).json({ error: 'ID de jogo inválido.' });
  }

  try {
    const jogo = await prisma.jogo.findUnique({
      where: { igdbId },
      select: {
        id: true,
        steamAppId: true,
        steamPriceCents: true,
        steamDiscountPercent: true,
        steamSyncedAt: true,
      },
    });

    if (!jogo?.steamAppId) {
      return res.json({ steam_price_cents: null, steam_discount_percent: null });
    }

    const stale =
      !jogo.steamSyncedAt ||
      Date.now() - jogo.steamSyncedAt.getTime() > 6 * 60 * 60 * 1000;
    const cachedPriceInvalid =
      jogo.steamPriceCents != null && !isPlausibleBrlSteamPriceCents(jogo.steamPriceCents);
    const cachedDiscountInvalid =
      jogo.steamDiscountPercent != null && !isPlausibleSteamDiscountPercent(jogo.steamDiscountPercent);

    if (jogo.steamPriceCents != null && !stale && !cachedPriceInvalid && !cachedDiscountInvalid) {
      return res.json({
        steam_price_cents: jogo.steamPriceCents,
        steam_discount_percent: jogo.steamDiscountPercent,
      });
    }

    const steamDetails = await fetchSteamAppDetails(jogo.steamAppId);
    if (!steamDetails || steamDetails.priceCents == null) {
      return res.json({
        steam_price_cents: jogo.steamPriceCents,
        steam_discount_percent: jogo.steamDiscountPercent,
      });
    }

    await prisma.jogo.update({
      where: { id: jogo.id },
      data: {
        steamPriceCents: steamDetails.priceCents,
        steamDiscountPercent: steamDetails.discountPercent ?? null,
        steamSyncedAt: new Date(),
      },
    });

    res.json({
      steam_price_cents: steamDetails.priceCents,
      steam_discount_percent: steamDetails.discountPercent ?? null,
    });
  } catch (error) {
    logger.error(`Erro ao buscar preço Steam do jogo ${igdbId}: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar preço na Steam.' });
  }
});

// Rota de Detalhes do Jogo (dados ao vivo do IGDB)
router.get('/jogos/:id/details', detailsRateLimiter, cacheMiddleware(DETAILS_CACHE_SECONDS), async (req, res) => {
  const igdbId = parsePositiveIntId(req.params.id);
  if (!igdbId) {
    return res.status(400).json({ error: 'ID de jogo inválido.' });
  }
  try {
    const jogo = await fetchJogoDetailsLive(igdbId);
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
  const igdbId = parsePositiveIntId(req.params.id);
  if (!igdbId) {
    return res.status(400).json({ error: 'ID de jogo inválido.' });
  }

  const data = mapJogoAdminUpdate(req.body as Record<string, unknown>);
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'Nenhum campo editável fornecido.' });
  }

  try {
    const updatedJogo = await prisma.jogo.update({
      where: { igdbId },
      data,
    });

    await invalidateMediaCaches('jogos', String(igdbId));
    res.json(mapJogoToMidia(updatedJogo));
  } catch (error) {
    logger.error(`Erro ao editar o jogo ID ${igdbId}: ${error}`);
    res.status(500).json({ error: 'Erro ao editar o jogo.' });
  }
});

// Rota para buscar opções de filtros de Jogos
router.get('/jogos/filtros', cacheMiddleware(TWENTY_FOUR_HOURS), async (req, res) => {
  try {
    const genres = await prisma.jogoGenero.findMany({ orderBy: { name: 'asc' } });
    const platforms = await prisma.jogoPlataforma.findMany({ orderBy: { name: 'asc' } });
    const gameModes = await prisma.gameMode.findMany({ orderBy: { name: 'asc' } });
    const gameEngines = await prisma.gameEngine.findMany({ orderBy: { name: 'asc' } });
    const distinctYears = await getDistinctYears('Jogo', 'firstReleaseDate');

    res.json({
      genres: genres.map(g => g.name),
      platforms: platforms.map(p => p.name),
      gameModes: gameModes.map(gm => gm.name),
      gameEngines: gameEngines.map(ge => ge.name),
      years: distinctYears,
    });

  } catch (error) {
    logger.error('Erro ao buscar filtros de jogos:', error);
    res.status(500).json({ error: 'Erro ao buscar opções de filtros.' });
  }
});

// Rota para o Carrossel da Homepage de Jogos
router.get('/jogos/homepage-carousel', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
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
        platforms: { include: { plataforma: true }, take: 4 },
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
        platforms: { include: { plataforma: true }, take: 4 },
        genres: { include: { genero: true } },
      },
    });
    res.json(jogos.map(mapJogoToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar jogos por mês: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos por mês.' });
  }
});

/** Lançamentos só com ano (TBA) — isolado da timeline mensal */
router.get('/jogos/year-tbd', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const parsedYear = parseCarouselYearQuery(req.query as { year?: string });
  if (!parsedYear) {
    return res.status(400).json({ error: 'Ano inválido.' });
  }

  try {
    const jogos = await prisma.jogo.findMany({
      where: { AND: [jogoQualityFilter, yearOnlyJogoWhere(parsedYear)] },
      orderBy: { releaseYear: 'asc' },
      take: CAROUSEL_ITEM_LIMIT,
      include: {
        platforms: { include: { plataforma: true }, take: 4 },
        genres: { include: { genero: true } },
      },
    });
    res.json(jogos.map(mapJogoToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar jogos year-tbd: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar lançamentos com data a confirmar.' });
  }
});

// Steam — mais jogados e promoções (dados sincronizados)
router.get('/jogos/steam/trending', cacheMiddleware(TWELVE_HOURS), async (_req, res) => {
  try {
    const jogos = await prisma.jogo.findMany({
      where: {
        AND: [jogoQualityFilter, { steamPlayerCount: { not: null } }],
      },
      orderBy: { steamPlayerCount: 'desc' },
      take: 25,
      include: {
        platforms: { include: { plataforma: true } },
        genres: { include: { genero: true } },
      },
    });
    res.json({
      fonte: 'steam',
      jogos: jogos.map(mapJogoToMidia),
    });
  } catch (error) {
    logger.error(`Erro ao buscar Steam trending: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos mais jogados na Steam.' });
  }
});

router.get('/jogos/steam/sales', cacheMiddleware(TWELVE_HOURS), async (_req, res) => {
  try {
    const jogos = await prisma.jogo.findMany({
      where: {
        AND: [jogoQualityFilter, { steamDiscountPercent: { gte: 5 } }],
      },
      orderBy: [{ steamDiscountPercent: 'desc' }, { rating: 'desc' }],
      take: 25,
      include: {
        platforms: { include: { plataforma: true } },
        genres: { include: { genero: true } },
      },
    });
    res.json({
      fonte: 'steam',
      jogos: jogos.map(mapJogoToMidia),
    });
  } catch (error) {
    logger.error(`Erro ao buscar Steam sales: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar promoções Steam.' });
  }
});

// Jogos em alta da semana — blocos por plataforma, modo de jogo e Steam
router.get('/jogos/em-alta', cacheMiddleware(TWELVE_HOURS), async (_req, res) => {
  const perGroup = 8;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  type MappedJogo = ReturnType<typeof mapJogoToMidia>;

  const PLATFORM_BLOCKS: { id: string; nome: string; match: (name: string) => boolean }[] = [
    { id: 'pc', nome: 'PC', match: (n) => /\b(pc|windows|steam|mac)\b/i.test(n) },
    { id: 'xbox', nome: 'Xbox', match: (n) => /xbox/i.test(n) },
    { id: 'playstation', nome: 'PlayStation', match: (n) => /playstation|ps4|ps5|ps vita/i.test(n) },
    { id: 'nintendo', nome: 'Nintendo', match: (n) => /nintendo|switch|wii|3ds/i.test(n) },
  ];

  const MODE_BLOCKS: { id: string; nome: string; match: (mode: string) => boolean }[] = [
    { id: 'multiplayer', nome: 'Multijogador', match: (m) => /multijogador|multiplayer|mmo|battle royale/i.test(m) },
    { id: 'coop', nome: 'Cooperativo', match: (m) => /cooperativo|co-op|cooperative/i.test(m) },
    { id: 'single', nome: 'Um jogador', match: (m) => /um jogador|single player/i.test(m) },
  ];

  const pickForBlock = (
    jogos: MappedJogo[],
    matches: (jogo: MappedJogo) => boolean
  ): MappedJogo[] => jogos.filter(matches).slice(0, perGroup);

  try {
    // F-10: as tres consultas nao dependem uma da outra — rodam em paralelo em vez
    // de encadeadas, mesmo padrao ja usado em /hoje e /eventos/resumo neste arquivo.
    const [recentJogos, steamTrending, steamSales] = await Promise.all([
      prisma.jogo.findMany({
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
      }),
      prisma.jogo.findMany({
        where: {
          AND: [
            jogoQualityFilter,
            { steamPlayerCount: { not: null } },
          ],
        },
        orderBy: { steamPlayerCount: 'desc' },
        take: 12,
        include: {
          platforms: { include: { plataforma: true } },
          genres: { include: { genero: true } },
          gameModes: { include: { gameMode: true } },
        },
      }),
      prisma.jogo.findMany({
        where: {
          AND: [
            jogoQualityFilter,
            { steamDiscountPercent: { gte: 10 } },
          ],
        },
        orderBy: [{ steamDiscountPercent: 'desc' }, { rating: 'desc' }],
        take: 12,
        include: {
          platforms: { include: { plataforma: true } },
          genres: { include: { genero: true } },
          gameModes: { include: { gameMode: true } },
        },
      }),
    ]);

    const mapped = recentJogos.map(mapJogoToMidia);

    const hasSteamData = steamTrending.length > 0 || steamSales.length > 0;

    const plataformas = PLATFORM_BLOCKS.map((block) => {
      const jogos = pickForBlock(mapped, (j) =>
        (j.plataformas_api || []).some((p: { nome?: string }) => block.match(p.nome || ''))
      );
      return { id: block.id, nome: block.nome, jogos, total: jogos.length };
    }).filter((s) => s.total > 0);

    const modos = MODE_BLOCKS.map((block) => {
      const jogos = pickForBlock(mapped, (j) =>
        (j.modos_jogo || []).some((m: string) => block.match(m))
      );
      return { id: block.id, nome: block.nome, jogos, total: jogos.length };
    }).filter((s) => s.total > 0);

    const genreMap = new Map<string, MappedJogo[]>();
    for (const jogo of mapped) {
      for (const genero of jogo.generos_api || []) {
        if (!genreMap.has(genero)) genreMap.set(genero, []);
        const list = genreMap.get(genero)!;
        if (list.length < perGroup && !list.some((j) => j.id === jogo.id)) {
          list.push(jogo);
        }
      }
    }

    const categorias = Array.from(genreMap.entries())
      .map(([nome, jogos]) => ({ nome, jogos, total: jogos.length }))
      .filter((s) => s.total >= 2)
      .sort((a, b) => b.total - a.total || a.nome.localeCompare(b.nome, 'pt-BR'))
      .slice(0, 6);

    const now = new Date();
    const weekLabel = `Semana ${Math.ceil(now.getDate() / 7)} · ${now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;

    res.json({
      semana: weekLabel,
      metrica: hasSteamData
        ? 'Ranking combinado: dados Steam (jogadores ativos e promoções) + hype IGDB e nota dos jogadores.'
        : 'Ranking por hype da IGDB (interesse da comunidade) e nota dos jogadores. Configure STEAM_API_KEY para dados de mais jogados na Steam.',
      destaques: mapped.slice(0, 12),
      steam_mais_jogados: steamTrending.map(mapJogoToMidia),
      steam_promocoes: steamSales.map(mapJogoToMidia),
      plataformas,
      modos,
      categorias,
    });
  } catch (error) {
    logger.error(`Erro ao buscar jogos em alta: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos em alta.' });
  }
});

export default router;
