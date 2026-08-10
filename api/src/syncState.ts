import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const SYNC_STATE_KEY = 'sync_run';

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

/** Verifica no boot se um sync anterior foi interrompido por restart */
export async function checkInterruptedSyncOnStartup(prisma: PrismaClient): Promise<void> {
  try {
    const state = await readState(prisma);
    if (!state?.running) return;

    logger.warn(
      '⚠️ Sincronização interrompida por restart do servidor. ' +
      `Iniciada em ${state.startedAt}, período ${state.startDate} → ${state.endDate}` +
      (state.phase ? `, fase: ${state.phase}` : '') +
      (state.processedInPhase != null && state.totalInPhase
        ? `, progresso: ${state.processedInPhase}/${state.totalInPhase}`
        : '') +
      '. Rode run-sync-all novamente para continuar.',
    );

    await writeState(prisma, { ...state, running: false });
  } catch (error) {
    logger.error('Erro ao verificar estado de sync interrompido:', error);
  }
}

export type AcquireSyncResult =
  | { ok: true }
  | { ok: false; status: 409; message: string };

/** Bloqueia sync concorrente (memória + banco) */
export async function acquireSyncLock(
  prisma: PrismaClient,
  meta: Pick<SyncRunState, 'startDate' | 'endDate' | 'startYear' | 'endYear'>,
): Promise<AcquireSyncResult> {
  if (memoryLocked) {
    return {
      ok: false,
      status: 409,
      message: 'Já existe uma sincronização em andamento neste processo.',
    };
  }

  const existing = await readState(prisma);
  if (existing?.running) {
    return {
      ok: false,
      status: 409,
      message:
        `Sincronização já em andamento desde ${existing.startedAt}` +
        (existing.phase ? ` (fase: ${existing.phase})` : '') +
        '. Aguarde a conclusão ou reinicie após deploy.',
    };
  }

  memoryLocked = true;
  await writeState(prisma, {
    running: true,
    startedAt: new Date().toISOString(),
    startDate: meta.startDate,
    endDate: meta.endDate,
    startYear: meta.startYear,
    endYear: meta.endYear,
    phase: 'iniciando',
    processedInPhase: 0,
    totalInPhase: 0,
  });

  return { ok: true };
}

export async function releaseSyncLock(prisma: PrismaClient): Promise<void> {
  memoryLocked = false;
  try {
    await writeState(prisma, null);
  } catch (error) {
    logger.error('Erro ao liberar lock de sync:', error);
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

export function isSyncMemoryLocked(): boolean {
  return memoryLocked;
}
