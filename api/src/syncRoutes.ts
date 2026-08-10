import { Router } from 'express';
import { logger } from './logger';
import { prisma } from './clients';
import { syncMovies } from './syncMovies';
import { syncSeries } from './syncSeries';
import { syncAnimes } from './syncAnimes';
import { syncGames } from './syncGames';
import { runAwardScraper } from './scrapeAwards';
import {
  acquireSyncLock,
  releaseSyncLock,
  updateSyncProgress,
} from './syncState';
import { endSyncRunProgress, startSyncRunProgress } from './syncProgress';

const router = Router();

const isProduction = process.env.NODE_ENV === 'production';
const SYNC_SECRET = process.env.SYNC_SECRET || 'super-secret-sync-key';

if (isProduction && (!process.env.SYNC_SECRET || SYNC_SECRET === 'super-secret-sync-key')) {
  throw new Error('SYNC_SECRET não configurado ou inseguro em produção.');
}

const protectSync = (req: any, res: any, next: any) => {
  const secret = req.headers['x-sync-secret'] || (req.body && req.body.secret);
  if (secret !== SYNC_SECRET) {
    logger.warn('Tentativa de sincronização não autorizada.');
    return res.status(403).json({ error: 'Não autorizado.' });
  }
  next();
};

router.use('/run-sync', protectSync);
router.use('/run-sync-all', protectSync);
router.use('/run-sync-awards', protectSync);

router.post('/run-sync', async (req, res) => {
  const { mediaType, startDate, endDate, startYear, endYear } = req.body;

  if (!mediaType || !((startDate && endDate) || (startYear && endYear))) {
    return res.status(400).json({ error: 'Parâmetros inválidos. Forneça mediaType e (startDate/endDate ou startYear/endYear).' });
  }

  const lock = await acquireSyncLock(prisma, {
    startDate: startDate || `${startYear}-01-01`,
    endDate: endDate || `${endYear}-12-31`,
    startYear: startYear ? parseInt(startYear, 10) : undefined,
    endYear: endYear ? parseInt(endYear, 10) : undefined,
  });

  if (!lock.ok) {
    return res.status(lock.status).json({ error: lock.message });
  }

  logger.info(`Sincronização manual iniciada para ${mediaType} de ${startDate || startYear} a ${endDate || endYear}`);
  const runProgress = startSyncRunProgress();

  res.status(202).json({ message: `Sincronização para ${mediaType} iniciada. Verifique os logs para o progresso.` });

  try {
    switch (mediaType) {
      case 'movies':
        await syncMovies(prisma, startDate, endDate);
        break;
      case 'series':
        await syncSeries(prisma, startDate, endDate);
        break;
      case 'animes': {
        const start = parseInt(startYear);
        const end = parseInt(endYear);
        await updateSyncProgress(prisma, { phase: 'animes' });
        const phase = runProgress.startPhase('ANIMES');
        phase.setTotal((end - start + 1) * 4);
        for (let year = start; year <= end; year++) {
          await syncAnimes(year, ['WINTER', 'SPRING', 'SUMMER', 'FALL']);
          phase.advance(4);
        }
        break;
      }
      case 'games':
        await updateSyncProgress(prisma, { phase: 'games' });
        await syncGames(prisma, startDate, endDate);
        break;
      default:
        logger.warn(`Tipo de mídia desconhecido para sincronização: ${mediaType}`);
    }
    logger.info(`Sincronização manual para ${mediaType} concluída.`);
  } catch (error) {
    logger.error(`Erro durante a sincronização manual de ${mediaType}:`, error);
  } finally {
    endSyncRunProgress();
    await releaseSyncLock(prisma);
  }
});

/** Sincroniza filmes, séries, animes e jogos em sequência */
router.post('/run-sync-all', async (req, res) => {
  const startDate = req.body?.startDate || '2026-01-01';
  const endDate = req.body?.endDate || '2026-12-31';
  const startYear = parseInt(req.body?.startYear || '2026', 10);
  const endYear = parseInt(req.body?.endYear || '2026', 10);

  const lock = await acquireSyncLock(prisma, { startDate, endDate, startYear, endYear });
  if (!lock.ok) {
    return res.status(lock.status).json({ error: lock.message });
  }

  logger.info(`Sincronização completa iniciada: ${startDate} → ${endDate}`);
  const runProgress = startSyncRunProgress();

  res.status(202).json({
    message: `Sincronização completa de ${startYear} iniciada. Verifique os logs para ETA a cada ~2min.`,
  });

  try {
    await syncMovies(prisma, startDate, endDate);
    await syncSeries(prisma, startDate, endDate);

    await updateSyncProgress(prisma, { phase: 'animes' });
    const animePhase = runProgress.startPhase('ANIMES');
    animePhase.setTotal((endYear - startYear + 1) * 4);
    for (let year = startYear; year <= endYear; year++) {
      await syncAnimes(year, ['WINTER', 'SPRING', 'SUMMER', 'FALL']);
      animePhase.advance(4);
    }

    await updateSyncProgress(prisma, { phase: 'games' });
    runProgress.startPhase('JOGOS');
    await syncGames(prisma, startDate, endDate);

    logger.info('✅ Sincronização completa concluída.');
  } catch (error) {
    logger.error('Erro na sincronização completa:', error);
  } finally {
    endSyncRunProgress();
    await releaseSyncLock(prisma);
  }
});

router.post('/run-sync-awards', async (_req, res) => {
  logger.info('Scrape de premiações iniciado (manual).');
  res.status(202).json({ message: 'Scrape de premiações iniciado. Verifique os logs.' });

  try {
    await runAwardScraper();
    logger.info('Scrape de premiações concluído.');
  } catch (error) {
    logger.error('Erro no scrape de premiações:', error);
  }
});

export default router;
