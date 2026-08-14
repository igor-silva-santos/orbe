import { Router } from 'express';
import crypto from 'crypto';
import { logger } from './logger';
import { prisma } from './clients';
import { syncMovies } from './syncMovies';
import { recheckPendingBrSeries, syncSeries } from './syncSeries';
import { syncAnimes } from './syncAnimes';
import { syncGames } from './syncGames';
import { syncSteamData, refreshStaleSteamPrices } from './syncSteam';
import { runAwardScraper } from './scrapeAwards';
import { runDetetive } from './detetive';
import { executeFullSync } from './syncOrchestrator';
import { invalidateCacheByPatterns, invalidateCacheAfterMediaSync, getCacheInvalidationPatterns, type CacheInvalidationScope } from './cacheInvalidation';
import {
  acquireSyncLock,
  failSyncRun,
  getBackfillNextYear,
  getSyncStatus,
  getSyncStatusDetailed,
  markPhaseComplete,
  releaseSyncLock,
  resetStaleSyncLock,
  updateSyncProgress,
} from './syncState';
import { endSyncRunProgress, startSyncRunProgress } from './syncProgress';
import { syncRateLimiter } from './securityMiddleware';
import { broadcast } from './websocket';
import adminMiddleware from './adminMiddleware';
import { getLogBuffer, getLogBufferMeta, getSyncLogBuffer, getDetetiveLogBuffer } from './logger';

const router = Router();

const SYNC_SECRET = process.env.SYNC_SECRET || 'super-secret-sync-key';
const allowInsecureDevSecrets = process.env.ALLOW_INSECURE_DEV_SECRETS === 'true';

if ((!process.env.SYNC_SECRET || SYNC_SECRET === 'super-secret-sync-key') && !allowInsecureDevSecrets) {
  throw new Error(
    'SYNC_SECRET não configurado ou inseguro. Defina uma chave forte, ' +
    'ou ALLOW_INSECURE_DEV_SECRETS=true só em desenvolvimento local.'
  );
}

function verifySyncSecret(provided: string | undefined): boolean {
  if (!provided) return false;
  const expected = SYNC_SECRET;
  if (provided.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
}

const protectSync = (req: any, res: any, next: any) => {
  const secret = req.headers['x-sync-secret'] as string | undefined;
  if (!verifySyncSecret(secret)) {
    logger.warn('Tentativa de sincronização não autorizada.');
    return res.status(403).json({ error: 'Não autorizado.' });
  }
  next();
};

/** Status público — detecta cold start / sync travado */
router.get('/sync/status', async (req, res) => {
  const status = await getSyncStatus(prisma);
  const backfillNextYear = await getBackfillNextYear(prisma);
  const secret = req.headers['x-sync-secret'] as string | undefined;
  if (verifySyncSecret(secret)) {
    const detailed = await getSyncStatusDetailed(prisma);
    return res.json({ ...status, backfillNextYear, detailed });
  }
  res.json({ ...status, backfillNextYear });
});

/** Tamanho atual do banco — útil pra acompanhar o limite de 500MB do Supabase free */
router.get('/sync/db-size', protectSync, async (_req, res) => {
  try {
    const result = await prisma.$queryRaw<{ bytes: bigint }[]>`SELECT pg_database_size(current_database()) AS bytes`;
    const bytes = Number(result[0]?.bytes ?? 0);
    const megabytes = Math.round((bytes / (1024 * 1024)) * 100) / 100;
    const supabaseFreeLimitMb = 500;
    res.json({
      bytes,
      megabytes,
      supabaseFreeLimitMb,
      percentOfFreeLimit: Math.round((megabytes / supabaseFreeLimitMb) * 1000) / 10,
    });
  } catch (error) {
    logger.error('Erro ao consultar tamanho do banco:', error);
    res.status(500).json({ error: 'Erro ao consultar tamanho do banco.' });
  }
});

/** Download de logs em memória — admin ou x-sync-secret (investigação temporária) */
router.get(
  '/sync/logs',
  (req, res, next) => {
    const secret = req.headers['x-sync-secret'] as string | undefined;
    if (verifySyncSecret(secret)) {
      return next();
    }
    return adminMiddleware(req, res, next);
  },
  (req, res) => {
    const filter = String(req.query.filter || 'sync');
    const content =
      filter === 'all'
        ? getLogBuffer()
        : filter === 'detetive'
          ? getDetetiveLogBuffer()
          : getSyncLogBuffer();
    const meta = getLogBufferMeta();
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `orbe-${filter === 'all' ? 'app' : filter}-${stamp}.log`;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader(
      'X-Log-Lines',
      String(
        filter === 'all'
          ? meta.totalLines
          : filter === 'detetive'
            ? meta.detetiveLines
            : meta.syncLines,
      ),
    );

    if (!content) {
      const hint =
        filter === 'detetive'
          ? '(nenhum log do Detetive em memória — dispare POST /api/run-detetive e tente novamente)\n'
          : '(nenhum log de sync em memória ainda — inicie uma sincronização e tente novamente)\n';
      return res.send(hint);
    }

    res.send(content);
  }
);

router.post('/sync/reset-stale', syncRateLimiter, protectSync, async (_req, res) => {
  const status = await resetStaleSyncLock(prisma);
  res.json({
    message: 'Lock stale liberado. Use POST /api/run-sync-resume para continuar.',
    status,
  });
});

/** Limpa cache Redis sem rodar sync — útil após deploy/correção de filtros. */
router.post('/sync/invalidate-cache', syncRateLimiter, protectSync, async (req, res) => {
  const rawScope = typeof req.body?.scope === 'string' ? req.body.scope : 'all';
  const allowed: CacheInvalidationScope[] = ['all', 'homepage', 'filmes', 'series', 'animes', 'jogos', 'eventos', 'premios'];
  const scope = allowed.includes(rawScope as CacheInvalidationScope)
    ? (rawScope as CacheInvalidationScope)
    : 'all';
  const patterns = getCacheInvalidationPatterns(scope);

  await invalidateCacheByPatterns(patterns);
  broadcast({ type: 'CACHE_INVALIDATED', scope });

  res.json({
    ok: true,
    scope,
    patterns,
    message: `Cache invalidado (escopo: ${scope}). A homepage e listas serão recarregadas na próxima requisição.`,
  });
});

router.post('/run-sync', syncRateLimiter, protectSync, async (req, res) => {
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
        await recheckPendingBrSeries(prisma);
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
    broadcast({
      type: 'SYNC_COMPLETE',
      mediaType,
      message: `Sincronização de ${mediaType} concluída.`,
    });
  } catch (error) {
    await failSyncRun(prisma, error);
    logger.error(`Erro durante a sincronização manual de ${mediaType}:`, error);
  } finally {
    endSyncRunProgress();
  }
});

router.post('/run-sync-all', syncRateLimiter, protectSync, async (req, res) => {
  const startDate = req.body?.startDate || '2026-01-01';
  const endDate = req.body?.endDate || '2026-12-31';
  const startYear = parseInt(req.body?.startYear || '2026', 10);
  const endYear = parseInt(req.body?.endYear || '2026', 10);
  const force = req.body?.force === true;

  const existing = await getSyncStatusDetailed(prisma);
  if ((existing?.resumeAvailable || existing?.interrupted) && !force) {
    return res.status(409).json({
      error:
        'Há checkpoint para retomar — sync_all apagaria o progresso. ' +
        'Use POST /api/run-sync-resume ou envie force:true para começar do zero.',
      resumeAvailable: true,
      completedPhases: existing?.completedPhases ?? [],
      phase: existing?.phase,
      animesResumeYear: existing?.animesResumeYear,
    });
  }

  const lock = await acquireSyncLock(prisma, { startDate, endDate, startYear, endYear });
  if (!lock.ok) {
    return res.status(lock.status).json({ error: lock.message });
  }

  logger.info(`Sincronização completa iniciada: ${startDate} → ${endDate}`);
  res.status(202).json({
    message:
      'Sincronização completa iniciada (filmes → detetive → séries → animes → jogos → premiações). ' +
      'Logs: GET /api/sync/logs?filter=sync (detetive: ?filter=detetive).',
    statusUrl: '/api/sync/status',
    logsUrl: '/api/sync/logs?filter=sync',
    detetiveLogsUrl: '/api/sync/logs?filter=detetive',
  });

  try {
    await executeFullSync(prisma, { startDate, endDate, startYear, endYear, resume: false });
  } catch (error) {
    logger.error('Erro na sincronização completa (checkpoint salvo):', error);
  }
});

/** Retoma do último checkpoint — pula fases já concluídas */
router.post('/run-sync-resume', syncRateLimiter, protectSync, async (_req, res) => {
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

/**
 * Avança um passo do backfill histórico (ano a ano, a partir de 2000).
 * Idempotente e seguro pra chamar com frequência (ex.: cron externo a cada ~10-14min):
 * - se já tem sync rodando e não travado, não faz nada (só serve pra manter o serviço acordado);
 * - se tem checkpoint travado/interrompido, retoma o ano em andamento;
 * - senão, inicia o próximo ano pendente do ponteiro de backfill.
 */
router.post('/run-sync-backfill-step', syncRateLimiter, protectSync, async (_req, res) => {
  const status = await getSyncStatus(prisma);

  if (status.syncActive && !status.stale) {
    return res.status(202).json({
      message: 'Sync já em andamento — nenhuma ação necessária agora.',
      statusUrl: '/api/sync/status',
    });
  }

  if (status.resumeAvailable || status.interrupted) {
    const existing = await getSyncStatusDetailed(prisma);
    const lock = await acquireSyncLock(prisma, {
      startDate: existing!.startDate,
      endDate: existing!.endDate,
      startYear: existing!.startYear,
      endYear: existing!.endYear,
      backfill: existing!.backfill,
    }, { resume: true });

    if (!lock.ok) {
      return res.status(lock.status).json({ error: lock.message });
    }

    res.status(202).json({
      message: `Retomando backfill do ano ${existing!.startYear} (checkpoint anterior).`,
      statusUrl: '/api/sync/status',
    });

    try {
      await executeFullSync(prisma, {
        startDate: existing!.startDate,
        endDate: existing!.endDate,
        startYear: existing!.startYear!,
        endYear: existing!.endYear!,
        resume: true,
        backfill: existing!.backfill ?? false,
      });
    } catch (error) {
      logger.error('Erro ao retomar passo do backfill (checkpoint salvo):', error);
    }
    return;
  }

  const currentYear = new Date().getFullYear();
  const nextYear = await getBackfillNextYear(prisma);

  if (nextYear > currentYear) {
    return res.status(200).json({
      message: `Backfill concluído — já alcançou o ano corrente (${currentYear}).`,
      backfillNextYear: nextYear,
    });
  }

  const startDate = `${nextYear}-01-01`;
  const endDate = `${nextYear}-12-31`;

  const lock = await acquireSyncLock(prisma, {
    startDate,
    endDate,
    startYear: nextYear,
    endYear: nextYear,
    backfill: true,
  });

  if (!lock.ok) {
    return res.status(lock.status).json({ error: lock.message });
  }

  logger.info(`📅 Backfill: iniciando ano ${nextYear}.`);
  res.status(202).json({
    message: `Backfill iniciado para o ano ${nextYear}.`,
    statusUrl: '/api/sync/status',
  });

  try {
    await executeFullSync(prisma, {
      startDate,
      endDate,
      startYear: nextYear,
      endYear: nextYear,
      resume: false,
      backfill: true,
    });
  } catch (error) {
    logger.error(`Erro no backfill do ano ${nextYear} (checkpoint salvo):`, error);
  }
});

router.post('/run-sync-steam-prices', syncRateLimiter, protectSync, async (_req, res) => {
  logger.info('Refresh manual de preços Steam iniciado.');
  res.status(202).json({ message: 'Refresh de preços Steam iniciado. Verifique os logs.' });

  try {
    const updated = await refreshStaleSteamPrices(prisma);
    logger.info(`Refresh manual de preços Steam concluído: ${updated} jogos.`);
  } catch (error) {
    logger.error('Erro no refresh de preços Steam:', error);
  }
});

router.post('/run-sync-awards', syncRateLimiter, protectSync, async (_req, res) => {
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

router.post('/run-detetive', syncRateLimiter, protectSync, async (req, res) => {
  const fullScan = req.query.fullScan === 'true';
  logger.info(`Detetive Digital iniciado (manual${fullScan ? ', varredura completa' : ''}).`);
  res.status(202).json({
    message: 'Detetive Digital iniciado. Acompanhe os logs em GET /api/sync/logs?filter=detetive',
    logsUrl: '/api/sync/logs?filter=detetive',
    fullScan,
  });

  try {
    await runDetetive(fullScan);
    await invalidateCacheByPatterns(['cache:/api/homepage*', 'cache:/api/filmes*']);
    logger.info('Detetive Digital (manual) concluído.');
  } catch (error) {
    logger.error('Erro no Detetive Digital (manual):', error);
  }
});

export default router;
