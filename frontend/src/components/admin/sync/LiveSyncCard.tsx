import { Activity, RefreshCw } from 'lucide-react';
import {
  formatDateTime,
  liveStatusHeadline,
  liveStatusTone,
  phaseLabel,
  type LiveSyncStatus,
} from '@/lib/admin/syncPresentation';

const toneRing: Record<ReturnType<typeof liveStatusTone>, string> = {
  success: 'border-emerald-500/40 bg-emerald-500/5',
  running: 'border-blue-500/40 bg-blue-500/5',
  danger: 'border-red-500/40 bg-red-500/5',
  warn: 'border-amber-500/40 bg-amber-500/5',
  idle: 'border-border bg-muted/30',
};

const toneDot: Record<ReturnType<typeof liveStatusTone>, string> = {
  success: 'bg-emerald-500',
  running: 'bg-blue-500 animate-pulse',
  danger: 'bg-red-500',
  warn: 'bg-amber-500',
  idle: 'bg-muted-foreground',
};

type LiveSyncCardProps = {
  status: LiveSyncStatus | null;
  loading?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  compact?: boolean;
};

export default function LiveSyncCard({
  status,
  loading,
  onRefresh,
  refreshing,
  compact,
}: LiveSyncCardProps) {
  const tone = liveStatusTone(status);
  const headline = liveStatusHeadline(status);
  const pct = status?.progressPercent;

  return (
    <section className={`rounded-2xl border p-5 sm:p-6 ${toneRing[tone]}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${toneDot[tone]}`} aria-hidden />
          <h3 className="font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            Estado ao vivo
          </h3>
        </div>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        )}
      </div>

      {loading && !status ? (
        <p className="text-sm text-muted-foreground">Consultando API…</p>
      ) : (
        <>
          <p className="text-lg font-bold mb-1">{headline}</p>
          {status?.message && <p className="text-sm text-muted-foreground mb-4">{status.message}</p>}

          {!compact && status?.syncActive && pct != null && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Fase {phaseLabel(status.phase)}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                />
              </div>
            </div>
          )}

          <dl className={`grid gap-3 text-sm ${compact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
            <div>
              <dt className="text-muted-foreground text-xs">Fase atual</dt>
              <dd className="font-medium">{phaseLabel(status?.phase)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs">Último progresso</dt>
              <dd className="font-medium">{formatDateTime(status?.lastProgressAt)}</dd>
            </div>
            {!compact && (
              <div>
                <dt className="text-muted-foreground text-xs">Backfill próximo ano</dt>
                <dd className="font-medium">{status?.backfillNextYear ?? '—'}</dd>
              </div>
            )}
          </dl>
        </>
      )}
    </section>
  );
}
