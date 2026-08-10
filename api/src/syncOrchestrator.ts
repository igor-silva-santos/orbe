import type { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import { syncMovies } from './syncMovies';
import { syncSeries } from './syncSeries';
import { syncAnimes } from './syncAnimes';
import { syncGames } from './syncGames';
import {
  markPhaseComplete,
  releaseSyncLock,
  failSyncRun,
  readSyncRunState,
  setAnimesResumeYear,
  updateSyncProgress,
  type SyncPhase,
} from './syncState';
import { endSyncRunProgress, startSyncRunProgress } from './syncProgress';
import { invalidateCacheByPatterns } from './cacheInvalidation';

export type FullSyncParams = {
  startDate: string;
  endDate: string;
  startYear: number;
  endYear: number;
  resume?: boolean;
};

function phaseDone(completed: SyncPhase[] | undefined, phase: SyncPhase): boolean {
  return completed?.includes(phase) ?? false;
}

/**
 * Orquestra sync completo com checkpoint por fase.
 * Em resume, pula fases já em completedPhases e retoma animes do animesResumeYear.
 */
export async function executeFullSync(prisma: PrismaClient, params: FullSyncParams): Promise<void> {
  const { startDate, endDate, startYear, endYear, resume } = params;
  const existing = resume ? await readSyncRunState(prisma) : null;
  const completed = existing?.completedPhases ?? [];

  const runProgress = startSyncRunProgress();

  try {
    if (!phaseDone(completed, 'filmes')) {
      logger.info('--- Fase FILMES ---');
      await syncMovies(prisma, startDate, endDate);
      await markPhaseComplete(prisma, 'filmes');
    } else {
      logger.info('⏭️ Fase filmes já concluída (checkpoint). Pulando.');
    }

    if (!phaseDone(completed, 'series')) {
      logger.info('--- Fase SÉRIES ---');
      await syncSeries(prisma, startDate, endDate);
      await markPhaseComplete(prisma, 'series');
    } else {
      logger.info('⏭️ Fase séries já concluída (checkpoint). Pulando.');
    }

    if (!phaseDone(completed, 'animes')) {
      const animeStartYear = existing?.animesResumeYear ?? startYear;
      await updateSyncProgress(prisma, { phase: 'animes' });
      const animePhase = runProgress.startPhase('ANIMES');
      const yearsTotal = (endYear - animeStartYear + 1) * 4;
      animePhase.setTotal(Math.max(0, yearsTotal));

      for (let year = animeStartYear; year <= endYear; year++) {
        logger.info(`--- Animes: ano ${year} ---`);
        await syncAnimes(year, ['WINTER', 'SPRING', 'SUMMER', 'FALL']);
        animePhase.advance(4);
        await setAnimesResumeYear(prisma, year + 1);
      }
      await markPhaseComplete(prisma, 'animes');
    } else {
      logger.info('⏭️ Fase animes já concluída (checkpoint). Pulando.');
    }

    if (!phaseDone(completed, 'jogos')) {
      logger.info('--- Fase JOGOS ---');
      await updateSyncProgress(prisma, { phase: 'jogos' });
      runProgress.startPhase('JOGOS');
      await syncGames(prisma, startDate, endDate);
      await markPhaseComplete(prisma, 'jogos');
    } else {
      logger.info('⏭️ Fase jogos já concluída (checkpoint). Pulando.');
    }

    logger.info('✅ Sincronização completa concluída.');
    await invalidateCacheByPatterns([
      'cache:/api/homepage*',
      'cache:/api/filmes/by-month*',
    ]);
    await releaseSyncLock(prisma);
  } catch (error) {
    await failSyncRun(prisma, error);
    throw error;
  } finally {
    endSyncRunProgress();
  }
}
