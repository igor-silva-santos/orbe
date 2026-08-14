import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import { startSyncKeepAlive, stopSyncKeepAlive } from './syncKeepAlive';

const SYNC_STATE_KEY = 'sync_run';
const BACKFILL_STATE_KEY = 'backfill_state';
const BACKFILL_DEFAULT_START_YEAR = 2000;
const STALE_PROGRESS_MS = 10 * 60 * 1000; // 10 min sem progresso = provável crash/cold start
const STALE_ANIMES_PROGRESS_MS = 30 * 60 * 1000; // animes: lotes lentos (700ms/anime + tradução)
const STALE_DETETIVE_PROGRESS_MS = 45 * 60 * 1000; // detetive: Puppeteer + ingresso.com por filme

export type SyncPhase = 'filmes' | 'detetive' | 'series' | 'animes' | 'jogos' | 'undated' | 'premios';

export type SyncRunState = {
  running: boolean;
  startedAt: string;
  startDate: string;
  endDate: string;
  startYear?: number;
  endYear?: number;
  phase?: string;
  processedInPhase?: number;
  totalInPhase?: number;
  lastProgressAt?: string;
  completedPhases?: SyncPhase[];
  /** Próximo ano de animes a processar ao retomar */
  animesResumeYear?: number;
  interrupted?: boolean;
  resumeAvailable?: boolean;
  lastError?: string;
  failedAt?: string;
  /** Contagem de itens pulados por motivo, por fase (observabilidade dos filtros de sync) */
  skipReasons?: Partial<Record<SyncPhase, Record<string, number>>>;
  /** Marca se este run faz parte do backfill histórico ano a ano — controla se o ponteiro avança ao concluir */
  backfill?: boolean;
};

export type SyncStatusPublic = {
  syncActive: boolean;
  stale: boolean;
  resumeAvailable: boolean;
  interrupted: boolean;
  phase?: string;
  progressPercent?: number;
  lastProgressAt?: string;
  startedAt?: string;
  completedPhases?: SyncPhase[];
  message?: string;
};

let memoryLocked = false;

async function readState(prisma: PrismaClient): Promise<SyncRunState | null> {
  const row = await prisma.appSetting.findUnique({ where: { key: SYNC_STATE_KEY } });
  if (!row?.value || typeof row.value !== 'object') return null;
  return row.value as SyncRunState;
}

async function writeState(prisma: PrismaClient, state: SyncRunState | null): Promise<void> {
  if (!state) {
    await prisma.appSetting.deleteMany({ where: { key: SYNC_STATE_KEY } });
    return;
  }
  await prisma.appSetting.upsert({
    where: { key: SYNC_STATE_KEY },
    create: { key: SYNC_STATE_KEY, value: state as object },
    update: { value: state as object },
  });
}

function staleThresholdMs(state: SyncRunState): number {
  if (state.phase === 'animes') return STALE_ANIMES_PROGRESS_MS;
  if (state.phase === 'detetive') return STALE_DETETIVE_PROGRESS_MS;
  return STALE_PROGRESS_MS;
}

function isStale(state: SyncRunState): boolean {
  if (!state.running) return false;
  // Fallback pro startedAt: se o processo cair antes do 1º updateSyncProgress,
  // lastProgressAt nunca é gravado — sem isso o lock ficava preso pra sempre.
  const referenceTime = state.lastProgressAt ?? state.startedAt;
  if (!referenceTime) return false;
  return Date.now() - new Date(referenceTime).getTime() > staleThresholdMs(state);
}

/**
 * Tenta reivindicar o lock de sync de forma atômica no Postgres: um único INSERT ... ON
 * CONFLICT ... DO UPDATE ... WHERE, que só aplica a escrita se a linha não existir ainda,
 * não estiver "running", ou estiver stale — tudo avaliado atomicamente pelo banco. Isso evita
 * a corrida de "check-then-act" que existia antes (ler o estado em JS, decidir, escrever depois),
 * que permitia duas instâncias simultâneas lerem running=false antes de qualquer uma escrever.
 */
async function claimLockRow(prisma: PrismaClient, newState: SyncRunState): Promise<boolean> {
  const affected = await prisma.$executeRaw`
    INSERT INTO "AppSetting" (key, value, "updatedAt")
    VALUES (${SYNC_STATE_KEY}, ${JSON.stringify(newState)}::jsonb, now())
    ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value, "updatedAt" = now()
    WHERE (("AppSetting".value->>'running')::boolean IS NOT TRUE)
       OR (
         COALESCE(
           ("AppSetting".value->>'lastProgressAt')::timestamptz,
           ("AppSetting".value->>'startedAt')::timestamptz
         ) < now() - (CASE WHEN "AppSetting".value->>'phase' = 'animes' THEN interval '30 minutes' ELSE interval '10 minutes' END)
       )
  `;
  return affected > 0;
}

export async function getSyncStatus(prisma: PrismaClient): Promise<SyncStatusPublic> {
  const state = await readState(prisma);
  if (!state) {
    return {
      syncActive: memoryLocked,
      stale: false,
      resumeAvailable: false,
      interrupted: false,
      message: 'Nenhuma sincronização registrada.',
    };
  }

  const stale = isStale(state) || (state.running && memoryLocked === false);
  const progressPercent =
    state.totalInPhase && state.processedInPhase != null && state.totalInPhase > 0
      ? Math.min(100, Math.round((state.processedInPhase / state.totalInPhase) * 100))
      : undefined;

  let message: string | undefined;
  if (state.running && stale) {
    message =
      'Sync marcado como ativo mas sem progresso recente — provável cold start ou crash. Use POST /api/sync/reset-stale ou POST /api/run-sync-resume.';
  } else if (state.resumeAvailable || state.interrupted) {
    message = 'Há checkpoint para retomar. Use POST /api/run-sync-resume.';
  } else if (state.running) {
    message =
      state.phase === 'animes'
        ? 'Sincronização em andamento (fase animes — pode levar horas; verifique os logs).'
        : 'Sincronização em andamento.';
  }

  return {
    syncActive: state.running || memoryLocked,
    stale,
    resumeAvailable: Boolean(state.resumeAvailable || state.interrupted),
    interrupted: Boolean(state.interrupted),
    phase: state.phase,
    progressPercent,
    lastProgressAt: state.lastProgressAt,
    startedAt: state.startedAt,
    completedPhases: state.completedPhases,
    message,
  };
}

export async function getSyncStatusDetailed(prisma: PrismaClient): Promise<SyncRunState | null> {
  return readState(prisma);
}

/** Verifica no boot se um sync anterior foi interrompido por restart/cold start */
export async function checkInterruptedSyncOnStartup(prisma: PrismaClient): Promise<void> {
  try {
    const state = await readState(prisma);
    if (!state?.running) return;

    logger.warn(
      '⚠️ Sincronização interrompida (restart/cold start). ' +
        `Iniciada em ${state.startedAt}, período ${state.startDate} → ${state.endDate}` +
        (state.phase ? `, fase: ${state.phase}` : '') +
        (state.processedInPhase != null && state.totalInPhase
          ? `, progresso: ${state.processedInPhase}/${state.totalInPhase}`
          : '') +
        '. Checkpoint salvo — use POST /api/run-sync-resume para continuar.',
    );

    await writeState(prisma, {
      ...state,
      running: false,
      interrupted: true,
      resumeAvailable: true,
      lastError: 'Interrompido por restart do servidor (cold start ou deploy).',
      failedAt: new Date().toISOString(),
    });
    memoryLocked = false;
  } catch (error) {
    logger.error('Erro ao verificar estado de sync interrompido:', error);
  }
}

export type AcquireSyncResult =
  | { ok: true }
  | { ok: false; status: 409 | 400; message: string };

export async function acquireSyncLock(
  prisma: PrismaClient,
  meta: Pick<SyncRunState, 'startDate' | 'endDate' | 'startYear' | 'endYear' | 'backfill'>,
  options?: { resume?: boolean },
): Promise<AcquireSyncResult> {
  if (memoryLocked) {
    return {
      ok: false,
      status: 409,
      message: 'Já existe uma sincronização em andamento neste processo.',
    };
  }

  const now = new Date().toISOString();

  if (options?.resume) {
    const existing = await readState(prisma);
    if (!existing?.resumeAvailable && !existing?.interrupted) {
      return {
        ok: false,
        status: 400,
        message: 'Não há checkpoint para retomar. Inicie com POST /api/run-sync-all.',
      };
    }

    const newState: SyncRunState = {
      ...existing!,
      running: true,
      interrupted: false,
      lastError: undefined,
      failedAt: undefined,
      startedAt: now,
      lastProgressAt: now,
    };

    const claimed = await claimLockRow(prisma, newState);
    if (!claimed) {
      return {
        ok: false,
        status: 409,
        message: 'Já existe uma sincronização em andamento (outra instância/processo). Consulte GET /api/sync/status.',
      };
    }
    memoryLocked = true;
    startSyncKeepAlive();
    return { ok: true };
  }

  const newState: SyncRunState = {
    running: true,
    startedAt: now,
    lastProgressAt: now,
    startDate: meta.startDate,
    endDate: meta.endDate,
    startYear: meta.startYear,
    endYear: meta.endYear,
    phase: 'iniciando',
    processedInPhase: 0,
    totalInPhase: 0,
    completedPhases: [],
    animesResumeYear: meta.startYear,
    interrupted: false,
    resumeAvailable: false,
    backfill: meta.backfill ?? false,
  };

  const claimed = await claimLockRow(prisma, newState);
  if (!claimed) {
    return {
      ok: false,
      status: 409,
      message: 'Já existe uma sincronização em andamento (outra instância/processo). Consulte GET /api/sync/status.',
    };
  }

  memoryLocked = true;
  startSyncKeepAlive();
  return { ok: true };
}

export async function releaseSyncLock(prisma: PrismaClient): Promise<void> {
  memoryLocked = false;
  stopSyncKeepAlive();
  try {
    await writeState(prisma, null);
  } catch (error) {
    logger.error('Erro ao liberar lock de sync:', error);
  }
}

/** Falha recuperável — mantém checkpoint para resume */
export async function failSyncRun(prisma: PrismaClient, error: unknown): Promise<void> {
  memoryLocked = false;
  stopSyncKeepAlive();
  const message = error instanceof Error ? error.message : String(error);
  try {
    const state = await readState(prisma);
    if (!state) return;
    await writeState(prisma, {
      ...state,
      running: false,
      interrupted: true,
      resumeAvailable: true,
      lastError: message,
      failedAt: new Date().toISOString(),
    });
    logger.error(`Sync falhou (checkpoint preservado): ${message}`);
  } catch (e) {
    logger.error('Erro ao salvar falha de sync:', e);
  }
}

export async function markPhaseComplete(prisma: PrismaClient, phase: SyncPhase): Promise<void> {
  try {
    const state = await readState(prisma);
    if (!state) return;
    const completed = new Set(state.completedPhases ?? []);
    completed.add(phase);
    await writeState(prisma, {
      ...state,
      completedPhases: Array.from(completed),
      lastProgressAt: new Date().toISOString(),
    });
    logger.info(`✅ Fase '${phase}' concluída e registrada no checkpoint.`);
  } catch (error) {
    logger.error(`Erro ao marcar fase ${phase} como completa:`, error);
  }
}

export async function setAnimesResumeYear(prisma: PrismaClient, nextYear: number): Promise<void> {
  try {
    const state = await readState(prisma);
    if (!state) return;
    await writeState(prisma, {
      ...state,
      animesResumeYear: nextYear,
      lastProgressAt: new Date().toISOString(),
    });
  } catch {
    /* noop */
  }
}

/** Acumula contagem de itens pulados por motivo numa fase (não bloqueia o sync em caso de falha) */
export async function addSkipReasons(
  prisma: PrismaClient,
  phase: SyncPhase,
  reasons: Record<string, number>,
): Promise<void> {
  if (Object.keys(reasons).length === 0) return;
  try {
    const state = await readState(prisma);
    if (!state?.running) return;

    const currentByPhase = state.skipReasons ?? {};
    const currentForPhase = { ...(currentByPhase[phase] ?? {}) };
    for (const [reason, count] of Object.entries(reasons)) {
      currentForPhase[reason] = (currentForPhase[reason] ?? 0) + count;
    }

    await writeState(prisma, {
      ...state,
      skipReasons: { ...currentByPhase, [phase]: currentForPhase },
    });
  } catch {
    /* não bloquear sync por falha ao registrar estatística */
  }
}

export async function updateSyncProgress(
  prisma: PrismaClient,
  patch: Partial<Pick<SyncRunState, 'phase' | 'processedInPhase' | 'totalInPhase'>>,
): Promise<void> {
  try {
    const state = await readState(prisma);
    if (!state?.running) return;

    await writeState(prisma, {
      ...state,
      ...patch,
      lastProgressAt: new Date().toISOString(),
    });
  } catch {
    /* não bloquear sync por falha de progresso */
  }
}

/** Libera lock preso após crash/cold start */
export async function resetStaleSyncLock(prisma: PrismaClient): Promise<SyncStatusPublic> {
  memoryLocked = false;
  stopSyncKeepAlive();
  const state = await readState(prisma);
  if (state?.running) {
    await writeState(prisma, {
      ...state,
      running: false,
      interrupted: true,
      resumeAvailable: true,
      lastError: state.lastError || 'Lock liberado manualmente (stale reset).',
      failedAt: new Date().toISOString(),
    });
    logger.warn('Lock de sync stale liberado manualmente.');
  }
  return getSyncStatus(prisma);
}

export function isSyncMemoryLocked(): boolean {
  return memoryLocked;
}

export async function readSyncRunState(prisma: PrismaClient): Promise<SyncRunState | null> {
  return readState(prisma);
}

/**
 * Ponteiro do backfill histórico (ano a ano, 2000 → hoje). Guardado à parte do sync_run
 * porque sobrevive a runs individuais — cada passo do backfill sincroniza só um ano.
 */
export async function getBackfillNextYear(prisma: PrismaClient): Promise<number> {
  const row = await prisma.appSetting.findUnique({ where: { key: BACKFILL_STATE_KEY } });
  const value = row?.value as { nextYear?: number } | undefined;
  return value?.nextYear ?? BACKFILL_DEFAULT_START_YEAR;
}

export async function setBackfillNextYear(prisma: PrismaClient, year: number): Promise<void> {
  await prisma.appSetting.upsert({
    where: { key: BACKFILL_STATE_KEY },
    create: { key: BACKFILL_STATE_KEY, value: { nextYear: year } },
    update: { value: { nextYear: year } },
  });
}
