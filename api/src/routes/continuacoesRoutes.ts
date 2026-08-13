import { Router } from 'express';
import cacheMiddleware from '../cacheMiddleware';
import { logger } from '../logger';
import { detailsRateLimiter } from '../securityMiddleware';
import {
  getContinuacoesFilme,
  getContinuacoesSerie,
  getSagaById,
  getUniversoById,
  listSagas,
  listUniversos,
} from '../continuacoesService';
import { parsePositiveIntId } from './mediaRoutesHelpers';
import { parseSagasLimit, parseUniverseId } from '../continuacoesValidation';

const router = Router();
const CACHE = 60 * 60 * 6;

router.get('/continuacoes/universos', cacheMiddleware(CACHE), async (_req, res) => {
  try {
    const universos = await listUniversos();
    res.json({ universos, total: universos.length });
  } catch (error) {
    logger.error(`Erro ao listar universos: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar universos cinematográficos.' });
  }
});

router.get('/continuacoes/universos/:id', detailsRateLimiter, cacheMiddleware(CACHE), async (req, res) => {
  const universeId = parseUniverseId(req.params.id);
  if (!universeId) {
    return res.status(400).json({ error: 'ID de universo inválido.' });
  }
  try {
    const universo = await getUniversoById(universeId);
    if (!universo) {
      return res.status(404).json({ error: 'Universo não encontrado.' });
    }
    res.json(universo);
  } catch (error) {
    logger.error(`Erro ao buscar universo ${universeId}: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar universo cinematográfico.' });
  }
});

router.get('/continuacoes/sagas', cacheMiddleware(CACHE), async (req, res) => {
  try {
    const limit = parseSagasLimit(req.query.limit);
    const sagas = await listSagas(limit);
    res.json({ sagas, total: sagas.length });
  } catch (error) {
    logger.error(`Erro ao listar sagas: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar trilogias e sagas.' });
  }
});

router.get('/continuacoes/sagas/:id', detailsRateLimiter, cacheMiddleware(CACHE), async (req, res) => {
  const collectionId = parsePositiveIntId(req.params.id);
  if (!collectionId) {
    return res.status(400).json({ error: 'ID de saga inválido.' });
  }
  try {
    const saga = await getSagaById(collectionId);
    if (!saga) {
      return res.status(404).json({ error: 'Saga não encontrada.' });
    }
    res.json(saga);
  } catch (error) {
    logger.error(`Erro ao buscar saga ${collectionId}: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar saga.' });
  }
});

router.get('/continuacoes/filmes/:id', detailsRateLimiter, cacheMiddleware(CACHE), async (req, res) => {
  const tmdbId = parsePositiveIntId(req.params.id);
  if (!tmdbId) {
    return res.status(400).json({ error: 'ID de filme inválido.' });
  }
  try {
    const data = await getContinuacoesFilme(tmdbId);
    res.json(data);
  } catch (error) {
    logger.error(`Erro ao buscar continuações do filme ${tmdbId}: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar continuações.' });
  }
});

router.get('/continuacoes/series/:id', detailsRateLimiter, cacheMiddleware(CACHE), async (req, res) => {
  const tmdbId = parsePositiveIntId(req.params.id);
  if (!tmdbId) {
    return res.status(400).json({ error: 'ID de série inválido.' });
  }
  try {
    const data = await getContinuacoesSerie(tmdbId);
    res.json(data);
  } catch (error) {
    logger.error(`Erro ao buscar continuações da série ${tmdbId}: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar continuações.' });
  }
});

export default router;
