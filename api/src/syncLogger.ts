import { prisma } from './clients';
import { logger } from './logger';

export type SyncLogLevel = 'info' | 'warn' | 'error';
export type SyncLogCategory = 'sync' | 'skip' | 'error' | 'checkpoint' | 'summary';

export type SyncLogFields = {
  phase?: string;
  year?: number | null;
  month?: number | null;
  mediaType?: string;
  itemId?: string | number;
  itemTitle?: string;
  reason?: string;
};

type BufferedEvent = SyncLogFields & {
  level: SyncLogLevel;
  category: SyncLogCategory;
  message: string;
  ts: Date;
};

const FLUSH_INTERVAL_MS = 5_000;
const FLUSH_BATCH_SIZE = 300;

let currentRunId: number | null = null;
let buffer: BufferedEvent[] = [];
let flushTimer: NodeJS.Timeout | null = null;
let flushing = false;
let totalEvents = 0;
let errorCount = 0;
let skipCount = 0;

function normalizeId(id: string | number | undefined): string | undefined {
  if (id === undefined || id === null) return undefined;
  return String(id);
}

/** Grava eventos bufferizados em lote — nunca 1 INSERT por linha (inviável num sync de horas). */
async function flush(): Promise<void> {
  if (flushing || buffer.length === 0 || currentRunId === null) return;
  flushing = true;
  const runId = currentRunId;
  const toWrite = buffer;
  buffer = [];
  try {
    await prisma.syncLogEvent.createMany({
      data: toWrite.map((event) => ({
        runId,
        ts: event.ts,
        level: event.level,
        category: event.category,
        phase: event.phase ?? null,
        year: event.year ?? null,
        month: event.month ?? null,
        mediaType: event.mediaType ?? null,
        itemId: normalizeId(event.itemId) ?? null,
        itemTitle: event.itemTitle ?? null,
        reason: event.reason ?? null,
        message: event.message,
      })),
    });
  } catch (error) {
    logger.error(`[syncLogger] Falha ao gravar ${toWrite.length} eventos de log estruturado: ${error}`);
    // não devolve pro buffer — preferimos perder um lote a travar o sync por causa de log
  } finally {
    flushing = false;
  }
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setInterval(() => {
    void flush();
  }, FLUSH_INTERVAL_MS);
  flushTimer.unref?.();
}

function stopScheduledFlush(): void {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
}

/** Fecha runs deixados "running" por um crash/restart do processo anterior (cold start no Render). */
export async function closeDanglingSyncLogRuns(): Promise<void> {
  try {
    const dangling = await prisma.syncLogRun.updateMany({
      where: { status: 'running' },
      data: { status: 'interrupted', finishedAt: new Date() },
    });
    if (dangling.count > 0) {
      logger.warn(`[syncLogger] ${dangling.count} run(s) de log estruturado marcados como interrompidos (restart do processo).`);
    }
  } catch (error) {
    logger.error(`[syncLogger] Erro ao fechar runs pendentes: ${error}`);
  }
}

export async function startSyncLogRun(meta: {
  trigger: string;
  startDate?: string;
  endDate?: string;
}): Promise<number | null> {
  try {
    const run = await prisma.syncLogRun.create({
      data: {
        trigger: meta.trigger,
        startDate: meta.startDate,
        endDate: meta.endDate,
        status: 'running',
      },
      select: { id: true },
    });
    currentRunId = run.id;
    buffer = [];
    totalEvents = 0;
    errorCount = 0;
    skipCount = 0;
    scheduleFlush();
    return run.id;
  } catch (error) {
    logger.error(`[syncLogger] Erro ao criar SyncLogRun (log estruturado desabilitado para este run): ${error}`);
    currentRunId = null;
    return null;
  }
}

type Rollup = { sync: number; skip: number; error: number; checkpoint: number; summary: number };
function emptyRollup(): Rollup {
  return { sync: 0, skip: 0, error: 0, checkpoint: 0, summary: 0 };
}

async function buildSummary(runId: number) {
  const byPhaseCategory = await prisma.syncLogEvent.groupBy({
    by: ['phase', 'category'],
    where: { runId },
    _count: { _all: true },
  });

  const byYearMonth = await prisma.syncLogEvent.groupBy({
    by: ['phase', 'year', 'month', 'category'],
    where: { runId, year: { not: null } },
    _count: { _all: true },
  });

  const topErrors = await prisma.syncLogEvent.groupBy({
    by: ['reason'],
    where: { runId, category: 'error', reason: { not: null } },
    _count: { _all: true },
    orderBy: { _count: { reason: 'desc' } },
    take: 10,
  });

  const topSkipReasons = await prisma.syncLogEvent.groupBy({
    by: ['reason'],
    where: { runId, category: 'skip', reason: { not: null } },
    _count: { _all: true },
    orderBy: { _count: { reason: 'desc' } },
    take: 10,
  });

  const byPhase: Record<string, Rollup> = {};
  for (const row of byPhaseCategory) {
    const phase = row.phase ?? 'geral';
    byPhase[phase] ??= emptyRollup();
    byPhase[phase][row.category as keyof Rollup] += row._count._all;
  }

  const byPhaseYearMonth: Record<string, Record<string, Rollup>> = {};
  for (const row of byYearMonth) {
    const phase = row.phase ?? 'geral';
    const ym = row.month ? `${row.year}-${String(row.month).padStart(2, '0')}` : String(row.year);
    byPhaseYearMonth[phase] ??= {};
    byPhaseYearMonth[phase][ym] ??= emptyRollup();
    byPhaseYearMonth[phase][ym][row.category as keyof Rollup] += row._count._all;
  }

  const totalEventsCount = byPhaseCategory.reduce((sum, row) => sum + row._count._all, 0);
  const totalErrors = byPhaseCategory.filter((r) => r.category === 'error').reduce((sum, r) => sum + r._count._all, 0);
  const totalSkips = byPhaseCategory.filter((r) => r.category === 'skip').reduce((sum, r) => sum + r._count._all, 0);

  return {
    summary: {
      byPhase,
      byPhaseYearMonth,
      topErrors: topErrors.map((r) => ({ reason: r.reason, count: r._count._all })),
      topSkipReasons: topSkipReasons.map((r) => ({ reason: r.reason, count: r._count._all })),
    },
    totalEventsCount,
    totalErrors,
    totalSkips,
  };
}

export async function finishSyncLogRun(status: 'completed' | 'failed' | 'interrupted'): Promise<void> {
  const runId = currentRunId;
  if (runId === null) return;

  stopScheduledFlush();
  await flush();

  try {
    const { summary, totalEventsCount, totalErrors, totalSkips } = await buildSummary(runId);
    await prisma.syncLogRun.update({
      where: { id: runId },
      data: {
        status,
        finishedAt: new Date(),
        totalEvents: totalEventsCount,
        errorCount: totalErrors,
        skipCount: totalSkips,
        summary,
      },
    });
  } catch (error) {
    logger.error(`[syncLogger] Erro ao finalizar SyncLogRun ${runId}: ${error}`);
  } finally {
    currentRunId = null;
    buffer = [];
  }
}

function push(level: SyncLogLevel, category: SyncLogCategory, fields: SyncLogFields, message: string): void {
  if (currentRunId === null) return;
  buffer.push({ ...fields, level, category, message, ts: new Date() });
  totalEvents++;
  if (category === 'error') errorCount++;
  if (category === 'skip') skipCount++;
  if (buffer.length >= FLUSH_BATCH_SIZE) {
    void flush();
  }
}

export function logSync(fields: SyncLogFields, message: string): void {
  push('info', 'sync', fields, message);
}

export function logSkip(fields: SyncLogFields, message: string): void {
  push('info', 'skip', fields, message);
}

export function logSyncError(fields: SyncLogFields, message: string): void {
  push('error', 'error', fields, message);
}

export function logCheckpoint(fields: SyncLogFields, message: string): void {
  push('info', 'checkpoint', fields, message);
}

export function getActiveSyncLogRunId(): number | null {
  return currentRunId;
}
