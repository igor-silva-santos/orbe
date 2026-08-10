import { logger } from './logger';

const ETA_LOG_INTERVAL_MS = 2 * 60 * 1000;

function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return '—';
  const totalMinutes = Math.ceil(ms / 60_000);
  if (totalMinutes < 60) return `~${totalMinutes}min`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes > 0 ? `~${hours}h ${minutes}min` : `~${hours}h`;
}

class PhaseTracker {
  private phaseStartedAt = Date.now();
  private lastEtaLogAt = 0;
  private processed = 0;
  private total = 0;

  constructor(
    private readonly phaseName: string,
    private readonly runStartedAt: number,
  ) {}

  setTotal(total: number) {
    this.total = Math.max(0, total);
    this.processed = 0;
    this.phaseStartedAt = Date.now();
    this.lastEtaLogAt = 0;
    if (total > 0) {
      logger.info(`📊 [${this.phaseName}] ${total} itens estimados nesta fase.`);
    }
  }

  addToTotal(count: number) {
    if (count <= 0) return;
    this.total += count;
    if (this.processed === 0) {
      logger.info(`📊 [${this.phaseName}] total estimado atualizado: ${this.total} itens.`);
    }
  }

  advance(count: number) {
    this.processed += count;
    this.maybeLogEta();
  }

  maybeLogEta(force = false) {
    if (this.total <= 0 || this.processed <= 0) return;

    const now = Date.now();
    if (!force && now - this.lastEtaLogAt < ETA_LOG_INTERVAL_MS) return;

    const elapsed = now - this.phaseStartedAt;
    const avgPerItem = elapsed / this.processed;
    const remaining = Math.max(0, this.total - this.processed);
    const etaPhase = formatDuration(remaining * avgPerItem);
    const pct = Math.min(100, Math.round((this.processed / this.total) * 100));

    logger.info(
      `⏱️ [${this.phaseName}] ${this.processed}/${this.total} (${pct}%) | ETA fase: ${etaPhase}`,
    );

    this.lastEtaLogAt = now;
  }

  finish() {
    if (this.total > 0) {
      this.maybeLogEta(true);
      const elapsed = formatDuration(Date.now() - this.phaseStartedAt);
      logger.info(`✅ [${this.phaseName}] fase concluída em ${elapsed}.`);
    }
  }

  getStats() {
    return { processed: this.processed, total: this.total };
  }
}

class SyncRunProgress {
  private readonly runStartedAt = Date.now();
  private currentPhase: PhaseTracker | null = null;

  startPhase(name: string): PhaseTracker {
    this.currentPhase?.finish();
    this.currentPhase = new PhaseTracker(name, this.runStartedAt);
    logger.info(`--- ${name.toUpperCase()} ---`);
    return this.currentPhase;
  }

  finish() {
    this.currentPhase?.finish();
    this.currentPhase = null;
    logger.info(
      `✅ Sincronização completa finalizada em ${formatDuration(Date.now() - this.runStartedAt)}.`,
    );
  }
}

let activeRun: SyncRunProgress | null = null;

export function startSyncRunProgress(): SyncRunProgress {
  activeRun = new SyncRunProgress();
  return activeRun;
}

export function getSyncRunProgress(): SyncRunProgress | null {
  return activeRun;
}

export function endSyncRunProgress(): void {
  activeRun?.finish();
  activeRun = null;
}

export function trackSyncPhase(name: string, total: number): PhaseTracker | null {
  const run = getSyncRunProgress();
  if (!run) return null;
  const phase = run.startPhase(name);
  phase.setTotal(total);
  return phase;
}
