import Link from 'next/link';
import { CalendarRange, Clock, Hash, Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';
import SyncRunStatusBadge from '@/components/admin/sync/SyncRunStatusBadge';
import {
  formatDateTime,
  formatPeriod,
  runDuration,
  type SyncLogRunListItem,
} from '@/lib/admin/syncPresentation';

type LastSyncHeroProps = {
  run: SyncLogRunListItem | null;
  loading?: boolean;
};

function Stat({ label, value, warn }: { label: string; value: string | number; warn?: boolean }) {
  return (
    <div className="rounded-xl bg-background/60 border border-border/60 px-4 py-3">
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className={`text-lg font-semibold tabular-nums ${warn ? 'text-red-600 dark:text-red-400' : ''}`}>
        {value}
      </p>
    </div>
  );
}

export default function LastSyncHero({ run, loading }: LastSyncHeroProps) {
  if (loading) {
    return (
      <section className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8 animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <div className="h-4 w-full max-w-md bg-muted rounded" />
      </section>
    );
  }

  if (!run) {
    return (
      <section className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
        <Layers className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
        <h2 className="text-lg font-semibold">Nenhuma execução registrada</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
          Quando o sync gravar runs no banco, o último aparecerá aqui. Enquanto isso, use a aba Ao vivo.
        </p>
      </section>
    );
  }

  const endedLabel = run.finishedAt ? formatDateTime(run.finishedAt) : 'Ainda em execução';
  const isOk = run.status === 'completed' && run.errorCount === 0;

  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary/30" />
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Última execução no banco
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold">Sync #{run.id}</h2>
              <SyncRunStatusBadge status={run.status} />
            </div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
              {isOk ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              ) : run.errorCount > 0 ? (
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              ) : null}
              {run.status === 'completed'
                ? `Finalizado em ${endedLabel}`
                : run.status === 'running'
                  ? `Iniciado em ${formatDateTime(run.startedAt)}`
                  : endedLabel}
            </p>
          </div>
          <Link
            href={`/admin/sync-logs?run=${run.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver detalhes →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Stat label="Duração" value={runDuration(run.startedAt, run.finishedAt)} />
          <div className="rounded-xl bg-background/60 border border-border/60 px-4 py-3 col-span-2 sm:col-span-1">
            <p className="text-xs text-muted-foreground mb-0.5">Período</p>
            <p className="text-sm font-semibold leading-snug">{formatPeriod(run.startDate, run.endDate)}</p>
          </div>
          <Stat label="Eventos" value={run.totalEvents.toLocaleString('pt-BR')} />
          <Stat label="Erros" value={run.errorCount} warn={run.errorCount > 0} />
          <Stat label="Pulados" value={run.skipCount} />
          <Stat label="Gatilho" value={run.trigger?.trim() || '—'} />
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Início {formatDateTime(run.startedAt)}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarRange className="h-3.5 w-3.5" />
            {formatPeriod(run.startDate, run.endDate)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Hash className="h-3.5 w-3.5" />
            Run {run.id}
          </span>
        </div>
      </div>
    </section>
  );
}
