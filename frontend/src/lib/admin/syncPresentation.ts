export type SyncRunStatus = 'running' | 'completed' | 'failed' | 'interrupted' | string;

export type SyncLogRunListItem = {
  id: number;
  startedAt: string;
  finishedAt: string | null;
  status: SyncRunStatus;
  trigger: string | null;
  startDate: string | null;
  endDate: string | null;
  totalEvents: number;
  errorCount: number;
  skipCount: number;
};

export type LiveSyncStatus = {
  syncActive?: boolean;
  stale?: boolean;
  resumeAvailable?: boolean;
  interrupted?: boolean;
  phase?: string;
  progressPercent?: number;
  lastProgressAt?: string;
  startedAt?: string;
  completedPhases?: string[];
  message?: string;
  backfillNextYear?: number | null;
};

const PHASE_PT: Record<string, string> = {
  filmes: 'Filmes',
  detetive: 'Detetive digital',
  series: 'Séries',
  animes: 'Animes',
  jogos: 'Jogos',
  undated: 'Sem data',
  premios: 'Prêmios',
};

export function phaseLabel(phase?: string | null): string {
  if (!phase) return '—';
  return PHASE_PT[phase] ?? phase;
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return value;
  }
}

export function formatPeriod(startDate: string | null, endDate: string | null): string {
  if (!startDate && !endDate) return 'Período não informado';
  if (startDate && endDate && startDate !== endDate) return `${startDate} → ${endDate}`;
  return startDate || endDate || '—';
}

export function formatDurationMs(ms: number): string {
  if (ms < 0 || !Number.isFinite(ms)) return '—';
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}h ${m}min`;
  if (m > 0) return `${m}min ${s}s`;
  return `${s}s`;
}

export function runDuration(startedAt: string, finishedAt: string | null): string {
  if (!finishedAt) return 'Em andamento';
  return formatDurationMs(new Date(finishedAt).getTime() - new Date(startedAt).getTime());
}

export function runStatusLabel(status: SyncRunStatus): string {
  switch (status) {
    case 'completed':
      return 'Concluído';
    case 'running':
      return 'Em execução';
    case 'failed':
      return 'Falhou';
    case 'interrupted':
      return 'Interrompido';
    default:
      return String(status);
  }
}

export function runStatusTone(status: SyncRunStatus): 'success' | 'running' | 'danger' | 'warn' | 'muted' {
  switch (status) {
    case 'completed':
      return 'success';
    case 'running':
      return 'running';
    case 'failed':
      return 'danger';
    case 'interrupted':
      return 'warn';
    default:
      return 'muted';
  }
}

export function liveStatusTone(status: LiveSyncStatus | null): 'success' | 'running' | 'danger' | 'warn' | 'idle' {
  if (!status) return 'idle';
  if (status.stale || status.interrupted) return 'danger';
  if (status.syncActive) return 'running';
  if (status.resumeAvailable) return 'warn';
  return 'success';
}

export function liveStatusHeadline(status: LiveSyncStatus | null): string {
  const tone = liveStatusTone(status);
  if (tone === 'danger') return 'Precisa de atenção';
  if (tone === 'running') return 'Sincronizando agora';
  if (tone === 'warn') return 'Retomada pendente';
  if (tone === 'success') return 'API ociosa';
  return 'Carregando…';
}
