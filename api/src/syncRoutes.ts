import { Router } from 'express';
import { logger } from './logger';
import { prisma } from './clients';
import { syncMovies } from './syncMovies';
import { syncSeries } from './syncSeries';
import { syncAnimes } from './syncAnimes';
import { syncGames } from './syncGames';
import { syncSteamData } from './syncSteam';
import { runAwardScraper } from './scrapeAwards';
import { executeFullSync } from './syncOrchestrator';
import { invalidateCacheByPatterns, invalidateCacheAfterMediaSync } from './cacheInvalidation';
import {
  acquireSyncLock,
  failSyncRun,
  getSyncStatus,
  getSyncStatusDetailed,
  markPhaseComplete,
  releaseSyncLock,
  resetStaleSyncLock,
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

/** Status público — detecta cold start / sync travado */
router.get('/sync/status', async (req, res) => {
  const status = await getSyncStatus(prisma);
  const secret = req.headers['x-sync-secret'];
  if (secret === SYNC_SECRET) {
    const detailed = await getSyncStatusDetailed(prisma);
    return res.json({ ...status, detailed });
  }
  res.json(status);
});

router.post('/sync/reset-stale', protectSync, async (_req, res) => {
  const status = await resetStaleSyncLock(prisma);
  res.json({
    message: 'Lock stale liberado. Use POST /api/run-sync-resume para continuar.',
    status,
  });
});

router.post('/run-sync', protectSync, async (req, res) => {
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

  res.status(202).json({
    message: `Sincronização para ${mediaType} iniciada. Monitore GET /api/sync/status ou logs do Render.`,
  });

  try {
    switch (mediaType) {
      case 'movies':
        await syncMovies(prisma, startDate, endDate);
        await markPhaseComplete(prisma, 'filmes');
        break;
      case 'series':
        await syncSeries(prisma, startDate, endDate);
        await markPhaseComplete(prisma, 'series');
        break;
      case 'animes': {
        const start = parseInt(startYear, 10);
        const end = parseInt(endYear, 10);
        const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'] as const;
        const totalSeasons = (end - start + 1) * seasons.length;
        let completedSeasons = 0;
        await updateSyncProgress(prisma, { phase: 'animes', processedInPhase: 0, totalInPhase: totalSeasons });
        const phase = runProgress.startPhase('ANIMES');
        phase.setTotal(totalSeasons);
        for (let year = start; year <= end; year++) {
          for (const season of seasons) {
            await syncAnimes(year, [season], {
              onBatchComplete: async () => {
                await updateSyncProgress(prisma, {
                  phase: 'animes',
                  processedInPhase: completedSeasons,
                  totalInPhase: totalSeasons,
                });
              },
            });
            completedSeasons++;
            phase.advance(1);
            await updateSyncProgress(prisma, {
              phase: 'animes',
              processedInPhase: completedSeasons,
              totalInPhase: totalSeasons,
            });
          }
        }
        await markPhaseComplete(prisma, 'animes');
        break;
      }
      case 'games':
        await updateSyncProgress(prisma, { phase: 'jogos' });
        await syncGames(prisma, startDate, endDate);
        await syncSteamData(prisma);
        await markPhaseComplete(prisma, 'jogos');
        break;
      case 'steam':
        await updateSyncProgress(prisma, { phase: 'jogos' });
        await syncSteamData(prisma);
        break;
      default:
        logger.warn(`Tipo de mídia desconhecido para sincronização: ${mediaType}`);
    }
    logger.info(`Sincronização manual para ${mediaType} concluída.`);
    await invalidateCacheAfterMediaSync(mediaType);
    await releaseSyncLock(prisma);
  } catch (error) {
    await failSyncRun(prisma, error);
    logger.error(`Erro durante a sincronização manual de ${mediaType}:`, error);
  } finally {
    endSyncRunProgress();
  }
});

router.post('/run-sync-all', protectSync, async (req, res) => {
  const startDate = req.body?.startDate || '2026-01-01';
  const endDate = req.body?.endDate || '2026-12-31';
  const startYear = parseInt(req.body?.startYear || '2026', 10);
  const endYear = parseInt(req.body?.endYear || '2026', 10);

  const lock = await acquireSyncLock(prisma, { startDate, endDate, startYear, endYear });
  if (!lock.ok) {
    return res.status(lock.status).json({ error: lock.message });
  }

  logger.info(`Sincronização completa iniciada: ${startDate} → ${endDate}`);
  res.status(202).json({
    message: 'Sincronização completa iniciada. Monitore GET /api/sync/status (progresso ~2min nos logs).',
    statusUrl: '/api/sync/status',
  });

  try {
    await executeFullSync(prisma, { startDate, endDate, startYear, endYear, resume: false });
  } catch (error) {
    logger.error('Erro na sincronização completa (checkpoint salvo):', error);
  }
});

/** Retoma do último checkpoint — pula fases já concluídas */
router.post('/run-sync-resume', protectSync, async (_req, res) => {
  const existing = await getSyncStatusDetailed(prisma);
  if (!existing?.resumeAvailable && !existing?.interrupted) {
    return res.status(400).json({
      error: 'Não há checkpoint para retomar. Use POST /api/run-sync-all.',
    });
  }

  const lock = await acquireSyncLock(prisma, {
    startDate: existing!.startDate,
    endDate: existing!.endDate,
    startYear: existing!.startYear,
    endYear: existing!.endYear,
  }, { resume: true });

  if (!lock.ok) {
    return res.status(lock.status).json({ error: lock.message });
  }

  const startDate = existing!.startDate;
  const endDate = existing!.endDate;
  const startYear = existing!.startYear ?? parseInt(startDate.slice(0, 4), 10);
  const endYear = existing!.endYear ?? parseInt(endDate.slice(0, 4), 10);

  logger.info(
    `Retomando sync — fases já feitas: ${(existing!.completedPhases ?? []).join(', ') || 'nenhuma'}`,
  );

  res.status(202).json({
    message: 'Retomada iniciada. Fases já concluídas serão puladas.',
    completedPhases: existing!.completedPhases ?? [],
    statusUrl: '/api/sync/status',
  });

  try {
    await executeFullSync(prisma, {
      startDate,
      endDate,
      startYear,
      endYear,
      resume: true,
    });
  } catch (error) {
    logger.error('Erro na retomada de sync (checkpoint atualizado):', error);
  }
});

router.post('/run-sync-awards', protectSync, async (_req, res) => {
  logger.info('Scrape de premiações iniciado (manual).');
  res.status(202).json({ message: 'Scrape de premiações iniciado. Verifique os logs.' });

  try {
    const stats = await runAwardScraper();
    await markPhaseComplete(prisma, 'premios');
    await invalidateCacheByPatterns(['cache:/api/premios*']);
    logger.info(
      `Scrape de premiações concluído. scraped=${stats.scraped}, matched=${stats.matched}, updated=${stats.updated}, notFound=${stats.notFound}`
    );
  } catch (error) {
    logger.error('Erro no scrape de premiações:', error);
  }
});

export default router;
