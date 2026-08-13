import type { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import { syncMovies } from './syncMovies';
import { recheckPendingBrSeries, syncSeries } from './syncSeries';
import { syncAnimes } from './syncAnimes';
import { syncGames } from './syncGames';
import { syncSteamData } from './syncSteam';
import { runAwardScraper } from './scrapeAwards';
import {
  markPhaseComplete,
  releaseSyncLock,
  failSyncRun,
  readSyncRunState,
  setAnimesResumeYear,
  setBackfillNextYear,
  updateSyncProgress,
  type SyncPhase,
} from './syncState';
import { endSyncRunProgress, startSyncRunProgress } from './syncProgress';
import { invalidateCacheByPatterns } from './cacheInvalidation';
import { broadcast } from './websocket';

export type FullSyncParams = {
  startDate: string;
  endDate: string;
  startYear: number;
  endYear: number;
  resume?: boolean;
  /** Quando true, ao concluir avança o ponteiro do backfill histórico pra endYear + 1. */
  backfill?: boolean;
};

function phaseDone(completed: SyncPhase[] | undefined, phase: SyncPhase): boolean {
  return completed?.includes(phase) ?? false;
}

/**
 * Orquestra sync completo com checkpoint por fase.
 * Em resume, pula fases já em completedPhases e retoma animes do animesResumeYear.
 */
export async function executeFullSync(prisma: PrismaClient, params: FullSyncParams): Promise<void> {
  const { startDate, endDate, startYear, endYear, resume, backfill } = params;
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
      await recheckPendingBrSeries(prisma);
      await markPhaseComplete(prisma, 'series');
    } else {
      logger.info('⏭️ Fase séries já concluída (checkpoint). Pulando.');
    }

    if (!phaseDone(completed, 'animes')) {
      const animeStartYear = existing?.animesResumeYear ?? startYear;
      const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'] as const;
      const totalSeasons = (endYear - startYear + 1) * seasons.length;
      let completedSeasons = (animeStartYear - startYear) * seasons.length;

      await updateSyncProgress(prisma, {
        phase: 'animes',
        processedInPhase: completedSeasons,
        totalInPhase: totalSeasons,
      });
      const animePhase = runProgress.startPhase('ANIMES');
      animePhase.setTotal(totalSeasons);

      for (let year = animeStartYear; year <= endYear; year++) {
        for (const season of seasons) {
          logger.info(`--- Animes: ${season} ${year} ---`);
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
          animePhase.advance(1);
          await updateSyncProgress(prisma, {
            phase: 'animes',
            processedInPhase: completedSeasons,
            totalInPhase: totalSeasons,
          });
        }
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
      await syncSteamData(prisma);
      await markPhaseComplete(prisma, 'jogos');
    } else {
      logger.info('⏭️ Fase jogos já concluída (checkpoint). Pulando.');
    }

    if (!phaseDone(completed, 'premios')) {
      logger.info('--- Fase PREMIAÇÕES ---');
      await updateSyncProgress(prisma, { phase: 'premios' });
      await runAwardScraper();
      await markPhaseComplete(prisma, 'premios');
    } else {
      logger.info('⏭️ Fase premiações já concluída (checkpoint). Pulando.');
    }

    logger.info('✅ Sincronização completa concluída.');
    if (backfill) {
      await setBackfillNextYear(prisma, endYear + 1);
      logger.info(`📅 Backfill: ano ${endYear} concluído, próximo passo sincronizará ${endYear + 1}.`);
    }
    await invalidateCacheByPatterns([
      'cache:/api/homepage*',
      'cache:/api/filmes*',
      'cache:/api/series*',
      'cache:/api/animes*',
      'cache:/api/jogos*',
      'cache:/api/filmes/by-month*',
      'cache:/api/filmes/by-year*',
      'cache:/api/series/by-month*',
      'cache:/api/series/by-year*',
      'cache:/api/animes/by-season*',
      'cache:/api/jogos/by-month*',
      'cache:/api/jogos/by-year*',
      'cache:/api/jogos/em-alta*',
      'cache:/api/jogos/steam*',
      'cache:/api/pesquisa*',
      'cache:/api/search*',
      'cache:/api/trending*',
      'cache:/api/hoje*',
      'cache:/api/premios*',
      'cache:/api/eventos*',
    ]);
    await releaseSyncLock(prisma);
    broadcast({
      type: 'SYNC_COMPLETE',
      mediaType: 'all',
      message: 'Sincronização completa concluída.',
    });
  } catch (error) {
    await failSyncRun(prisma, error);
    throw error;
  } finally {
    endSyncRunProgress();
  }
}
