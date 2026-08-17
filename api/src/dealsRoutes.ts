import { Router, Request, Response, NextFunction } from 'express';
import cacheMiddleware from './cacheMiddleware';
import { logger } from './logger';
import { fetchCheapSharkStores } from './deals/cheapsharkClient';
import {
  DEALS_SOFT_TTL_SECONDS,
  getDealsOverview,
  paginateDeals,
  sourcesHealth,
} from './deals/dealsService';
import type { DealsOverview, UnifiedDeal } from './deals/types';

const router = Router();

/** Cache HTTP curto no edge — o cache real (Redis + fingerprint) fica no dealsService. */
const DEALS_HTTP_CACHE_SECONDS = DEALS_SOFT_TTL_SECONDS;

function stripMeta(overview: DealsOverview & { _meta?: unknown }): DealsOverview {
  const { _meta, ...rest } = overview;
  void _meta;
  return rest;
}

function setDealsCacheHeaders(res: Response, fetchedAt?: string): void {
  res.setHeader(
    'Cache-Control',
    `public, max-age=60, s-maxage=${DEALS_HTTP_CACHE_SECONDS}, stale-while-revalidate=${DEALS_HTTP_CACHE_SECONDS}`,
  );
  if (fetchedAt) {
    res.setHeader('X-Deals-Fetched-At', fetchedAt);
  }
}

/** Evita que _meta vaze na resposta JSON das rotas públicas. */
function dealsJsonMiddleware(_req: Request, res: Response, next: NextFunction): void {
  const originalJson = res.json.bind(res);
  res.json = (body: unknown) => {
    if (body && typeof body === 'object' && '_meta' in (body as object)) {
      const { _meta, ...rest } = body as DealsOverview & { _meta?: unknown };
      void _meta;
      return originalJson(rest);
    }
    return originalJson(body);
  };
  next();
}

router.use(dealsJsonMiddleware);

router.get('/deals', cacheMiddleware(DEALS_HTTP_CACHE_SECONDS), async (req, res) => {
  try {
    const overview = await getDealsOverview();
    setDealsCacheHeaders(res, overview.fetchedAt);

    const sectionsParam = typeof req.query.sections === 'string' ? req.query.sections : 'all';
    const sections = new Set(sectionsParam.split(',').map((s) => s.trim().toLowerCase()));

    if (sectionsParam === 'all' || sections.has('all')) {
      res.json(stripMeta(overview));
      return;
    }

    const partial: Partial<DealsOverview> & { fetchedAt: string; sourcesHealth: string } = {
      fetchedAt: overview.fetchedAt,
      usdBrlRate: overview.usdBrlRate,
      usdBrlRateFetchedAt: overview.usdBrlRateFetchedAt,
      sources: overview.sources,
      sourcesHealth: sourcesHealth(overview),
    };

    if (sections.has('gratis')) {
      partial.gratis = overview.gratis;
      partial.gratisTemporarios = overview.gratisTemporarios;
      partial.gratisPermanentes = overview.gratisPermanentes;
    }
    if (sections.has('promocoes')) {
      partial.promocoes = overview.promocoes;
      partial.catalogoSteam = overview.catalogoSteam;
    }

    res.json(partial);
  } catch (error) {
    logger.error(`Erro ao buscar deals agregados: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar promoções e jogos grátis.' });
  }
});

router.get('/deals/gratis', cacheMiddleware(DEALS_HTTP_CACHE_SECONDS), async (_req, res) => {
  try {
    const overview = await getDealsOverview();
    setDealsCacheHeaders(res, overview.fetchedAt);
    res.json({
      fetchedAt: overview.fetchedAt,
      usdBrlRate: overview.usdBrlRate,
      usdBrlRateFetchedAt: overview.usdBrlRateFetchedAt,
      gratisTemporarios: overview.gratisTemporarios,
      gratisPermanentes: overview.gratisPermanentes,
      deals: overview.gratis,
      sources: overview.sources,
      sourcesHealth: sourcesHealth(overview),
    });
  } catch (error) {
    logger.error(`Erro ao buscar jogos grátis: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos grátis.' });
  }
});

router.get('/deals/promocoes', cacheMiddleware(DEALS_HTTP_CACHE_SECONDS), async (req, res) => {
  try {
    const overview = await getDealsOverview();
    setDealsCacheHeaders(res, overview.fetchedAt);

    const page = Number.parseInt(String(req.query.page ?? '1'), 10);
    const limit = Number.parseInt(String(req.query.limit ?? '48'), 10);

    const pagination = paginateDeals(overview.promocoes, page, limit);

    res.json({
      fetchedAt: overview.fetchedAt,
      usdBrlRate: overview.usdBrlRate,
      usdBrlRateFetchedAt: overview.usdBrlRateFetchedAt,
      deals: pagination.items,
      promocoes: pagination.items,
      catalogoSteam: overview.catalogoSteam ?? [],
      total: pagination.total,
      page: pagination.page,
      limit: pagination.limit,
      hasMore: pagination.hasMore,
      sources: overview.sources,
      sourcesHealth: sourcesHealth(overview),
    });
  } catch (error) {
    logger.error(`Erro ao buscar promoções: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar promoções.' });
  }
});

router.get('/deals/epic', cacheMiddleware(DEALS_HTTP_CACHE_SECONDS), async (_req, res) => {
  try {
    const overview = await getDealsOverview();
    const deals = overview.gratis.filter((d) => d.source === 'epic');
    setDealsCacheHeaders(res, overview.fetchedAt);
    res.json({ fetchedAt: overview.fetchedAt, deals });
  } catch (error) {
    logger.error(`Erro ao buscar jogos grátis Epic: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos grátis da Epic.' });
  }
});

router.get('/deals/gamerpower', cacheMiddleware(DEALS_HTTP_CACHE_SECONDS), async (req, res) => {
  try {
    const platform = typeof req.query.platform === 'string' ? req.query.platform.toLowerCase() : undefined;
    const type = typeof req.query.type === 'string' ? req.query.type.toLowerCase() : undefined;
    const overview = await getDealsOverview();
    let deals: UnifiedDeal[] = overview.gratis.filter((d) => d.source === 'gamerpower');
    if (platform) {
      deals = deals.filter(
        (d) =>
          d.platform === platform ||
          d.platforms.some((p) => p.toLowerCase().includes(platform)),
      );
    }
    if (type) {
      deals = deals.filter((d) => (d.status ?? '').toLowerCase().includes(type));
    }
    setDealsCacheHeaders(res, overview.fetchedAt);
    res.json({ fetchedAt: overview.fetchedAt, deals });
  } catch (error) {
    logger.error(`Erro ao buscar giveaways GamerPower: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar giveaways do GamerPower.' });
  }
});

router.get('/deals/cheapshark', cacheMiddleware(DEALS_HTTP_CACHE_SECONDS), async (req, res) => {
  try {
    const storeId = typeof req.query.storeId === 'string' ? req.query.storeId : undefined;
    const freeOnly = req.query.freeOnly === '1' || req.query.freeOnly === 'true';
    const overview = await getDealsOverview();
    const pool = freeOnly ? overview.gratis : [...overview.gratis, ...overview.promocoes];
    let deals = pool.filter((d) => d.source === 'cheapshark');
    if (storeId) {
      const storeMap: Record<string, string> = {
        '1': 'steam',
        '3': 'other',
        '7': 'gog',
        '11': 'other',
        '13': 'ubisoft',
        '15': 'other',
        '25': 'epic',
      };
      const platform = storeMap[storeId];
      if (platform) {
        deals = deals.filter((d) => d.platform === platform);
      }
    }
    if (freeOnly) {
      deals = deals.filter((d) => d.kind === 'free');
    }
    setDealsCacheHeaders(res, overview.fetchedAt);
    res.json({ fetchedAt: overview.fetchedAt, deals });
  } catch (error) {
    logger.error(`Erro ao buscar deals CheapShark: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar deals do CheapShark.' });
  }
});

router.get('/deals/cheapshark/stores', cacheMiddleware(60 * 60 * 24), async (_req, res) => {
  try {
    const stores = await fetchCheapSharkStores();
    res.json({ stores });
  } catch (error) {
    logger.error(`Erro ao buscar lojas CheapShark: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar lojas do CheapShark.' });
  }
});

export default router;
