import { Router } from 'express';
import cacheMiddleware from './cacheMiddleware';
import { logger } from './logger';
import { fetchCheapSharkDeals, fetchCheapSharkStores } from './deals/cheapsharkClient';
import { fetchEpicFreeGames } from './deals/epicClient';
import { fetchGamerPowerGiveaways } from './deals/gamerPowerClient';
import {
  fetchDealsOverview,
  fetchFreeDeals,
  fetchSaleDeals,
} from './deals/dealsService';

const router = Router();
const DEALS_CACHE_SECONDS = 60 * 30;

router.get('/deals', cacheMiddleware(DEALS_CACHE_SECONDS), async (_req, res) => {
  try {
    const overview = await fetchDealsOverview();
    res.json(overview);
  } catch (error) {
    logger.error(`Erro ao buscar deals agregados: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar promoções e jogos grátis.' });
  }
});

router.get('/deals/gratis', cacheMiddleware(DEALS_CACHE_SECONDS), async (_req, res) => {
  try {
    const deals = await fetchFreeDeals();
    res.json({ fetchedAt: new Date().toISOString(), deals });
  } catch (error) {
    logger.error(`Erro ao buscar jogos grátis: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos grátis.' });
  }
});

router.get('/deals/promocoes', cacheMiddleware(DEALS_CACHE_SECONDS), async (_req, res) => {
  try {
    const deals = await fetchSaleDeals();
    res.json({ fetchedAt: new Date().toISOString(), deals });
  } catch (error) {
    logger.error(`Erro ao buscar promoções: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar promoções.' });
  }
});

router.get('/deals/epic', cacheMiddleware(DEALS_CACHE_SECONDS), async (_req, res) => {
  try {
    const deals = await fetchEpicFreeGames();
    res.json({ fetchedAt: new Date().toISOString(), deals });
  } catch (error) {
    logger.error(`Erro ao buscar jogos grátis Epic: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar jogos grátis da Epic.' });
  }
});

router.get('/deals/gamerpower', cacheMiddleware(DEALS_CACHE_SECONDS), async (req, res) => {
  try {
    const platform = typeof req.query.platform === 'string' ? req.query.platform : undefined;
    const type = typeof req.query.type === 'string' ? req.query.type : undefined;
    const deals = await fetchGamerPowerGiveaways({ platform, type });
    res.json({ fetchedAt: new Date().toISOString(), deals });
  } catch (error) {
    logger.error(`Erro ao buscar giveaways GamerPower: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar giveaways do GamerPower.' });
  }
});

router.get('/deals/cheapshark', cacheMiddleware(DEALS_CACHE_SECONDS), async (req, res) => {
  try {
    const storeId = typeof req.query.storeId === 'string' ? req.query.storeId : undefined;
    const freeOnly = req.query.freeOnly === '1' || req.query.freeOnly === 'true';
    const pageSize = Number.parseInt(String(req.query.limit ?? '40'), 10);
    const deals = await fetchCheapSharkDeals({
      storeId,
      freeOnly,
      pageSize: Number.isFinite(pageSize) ? pageSize : 40,
    });
    res.json({ fetchedAt: new Date().toISOString(), deals });
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
