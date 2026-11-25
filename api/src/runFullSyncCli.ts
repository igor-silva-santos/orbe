/**
 * Sync completo fora da API HTTP (ex.: GitHub Actions).
 * Uso: npm run sync:full -- [--resume] [startDate] [endDate] [startYear] [endYear]
 *
 * Define SYNC_RUNNER=github-actions quando não setado (telemetria/logs).
 */
import './loadEnv';

import { prisma } from './clients';
import { executeFullSync } from './syncOrchestrator';
import { acquireSyncLock, getSyncStatusDetailed } from './syncState';
import { logger } from './logger';

if (!process.env.SYNC_RUNNER) {
  process.env.SYNC_RUNNER = 'github-actions';
}

const args = process.argv.slice(2);
const resume = args.includes('--resume');
const positional = args.filter((a) => a !== '--resume');

const year = new Date().getUTCFullYear();
const startDate = positional[0] ?? `${year}-01-01`;
const endDate = positional[1] ?? `${year}-12-31`;
const startYear = parseInt(positional[2] ?? String(year), 10);
const endYear = parseInt(positional[3] ?? String(year), 10);

async function main(): Promise<void> {
  logger.info(
    `runFullSyncCli (SYNC_RUNNER=${process.env.SYNC_RUNNER}) resume=${resume} ${startDate}→${endDate}`,
  );

  if (resume) {
    const existing = await getSyncStatusDetailed(prisma);
    if (!existing?.resumeAvailable && !existing?.interrupted) {
      logger.error('Não há checkpoint para retomar. Rode sem --resume.');
      process.exit(1);
    }
    const lock = await acquireSyncLock(
      prisma,
      {
        startDate: existing!.startDate,
        endDate: existing!.endDate,
        startYear: existing!.startYear,
        endYear: existing!.endYear,
      },
      { resume: true },
    );
    if (!lock.ok) {
      logger.error(lock.message);
      process.exit(1);
    }
    const sy = existing!.startYear ?? parseInt(existing!.startDate.slice(0, 4), 10);
    const ey = existing!.endYear ?? parseInt(existing!.endDate.slice(0, 4), 10);
    await executeFullSync(prisma, {
      startDate: existing!.startDate,
      endDate: existing!.endDate,
      startYear: sy,
      endYear: ey,
      resume: true,
    });
    return;
  }

  const lock = await acquireSyncLock(prisma, { startDate, endDate, startYear, endYear });
  if (!lock.ok) {
    logger.error(lock.message);
    process.exit(1);
  }
  await executeFullSync(prisma, {
    startDate,
    endDate,
    startYear,
    endYear,
    resume: false,
  });
}

main()
  .then(() => {
    logger.info('runFullSyncCli concluído.');
    process.exit(0);
  })
  .catch((err) => {
    logger.error('runFullSyncCli falhou (checkpoint pode estar salvo):', err);
    process.exit(1);
  });
