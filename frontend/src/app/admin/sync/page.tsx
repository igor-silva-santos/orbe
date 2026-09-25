'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import AdminSyncNav from '@/components/admin/AdminSyncNav';
import { useRequireAdmin } from '@/lib/hooks/useRequireAdmin';
import { API_BASE } from '@/lib/apiBase';

type SyncStatus = {
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

function statusTone(status: SyncStatus | null): 'ok' | 'warn' | 'danger' | 'idle' {
  if (!status) return 'idle';
  if (status.stale || status.interrupted) return 'danger';
  if (status.syncActive) return 'warn';
  if (status.resumeAvailable) return 'warn';
  return 'ok';
}

const toneClass: Record<ReturnType<typeof statusTone>, string> = {
  ok: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200',
  warn: 'border-amber-500/50 bg-amber-500/10 text-amber-900 dark:text-amber-100',
  danger: 'border-red-500/50 bg-red-500/10 text-red-900 dark:text-red-100',
  idle: 'border-border bg-muted/40 text-muted-foreground',
};

function formatTs(value?: string) {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleString('pt-BR');
  } catch {
    return value;
  }
}

export default function AdminSyncLivePage() {
  const { loading: authLoading } = useRequireAdmin();
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);

  const load = useCallback(async () => {
    setPolling(true);
    setFetchError(null);
    try {
      const res = await fetch(`${API_BASE}/sync/status`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as SyncStatus;
      setStatus(data);
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : 'Falha ao consultar status');
    } finally {
      setPolling(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, [authLoading, load]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Verificando acesso…
      </div>
    );
  }

  const tone = statusTone(status);
  const label =
    tone === 'danger'
      ? 'Atenção'
      : status?.syncActive
        ? 'Sincronizando'
        : status?.resumeAvailable
          ? 'Retomada pendente'
          : 'Ocioso';

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 max-w-3xl mx-auto">
      <Link
        href="/perfil"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar ao perfil
      </Link>

      <h1 className="text-2xl font-bold mb-1">Monitor de sync (ao vivo)</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Poll em <code className="text-xs">/api/sync/status</code> a cada 10s — estado no Render/Supabase agora.
      </p>

      <AdminSyncNav />

      <div className={`rounded-xl border p-5 mb-6 ${toneClass[tone]}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide opacity-80">Estado</p>
            <p className="text-2xl font-bold">{label}</p>
            {status?.message && <p className="text-sm mt-2 opacity-90">{status.message}</p>}
          </div>
          <button
            type="button"
            onClick={() => load()}
            disabled={polling}
            className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-current/30 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${polling ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>
      </div>

      {fetchError && (
        <p className="text-sm text-red-600 dark:text-red-400 mb-4">Erro: {fetchError}</p>
      )}

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="border border-border rounded-lg p-3">
          <dt className="text-muted-foreground">syncActive</dt>
          <dd className="font-mono font-semibold">{String(status?.syncActive ?? '—')}</dd>
        </div>
        <div className="border border-border rounded-lg p-3">
          <dt className="text-muted-foreground">stale</dt>
          <dd className="font-mono font-semibold">{String(status?.stale ?? '—')}</dd>
        </div>
        <div className="border border-border rounded-lg p-3">
          <dt className="text-muted-foreground">Fase</dt>
          <dd className="font-semibold">{status?.phase ?? '—'}</dd>
        </div>
        <div className="border border-border rounded-lg p-3">
          <dt className="text-muted-foreground">Progresso</dt>
          <dd className="font-semibold">
            {status?.progressPercent != null ? `${status.progressPercent}%` : '—'}
          </dd>
        </div>
        <div className="border border-border rounded-lg p-3 sm:col-span-2">
          <dt className="text-muted-foreground">Último progresso</dt>
          <dd>{formatTs(status?.lastProgressAt)}</dd>
        </div>
        <div className="border border-border rounded-lg p-3 sm:col-span-2">
          <dt className="text-muted-foreground">Início do run</dt>
          <dd>{formatTs(status?.startedAt)}</dd>
        </div>
        <div className="border border-border rounded-lg p-3 sm:col-span-2">
          <dt className="text-muted-foreground">Fases concluídas</dt>
          <dd>{status?.completedPhases?.length ? status.completedPhases.join(', ') : '—'}</dd>
        </div>
        <div className="border border-border rounded-lg p-3">
          <dt className="text-muted-foreground">Backfill próximo ano</dt>
          <dd className="font-semibold">{status?.backfillNextYear ?? '—'}</dd>
        </div>
      </dl>

      <p className="text-xs text-muted-foreground mt-8 border-t border-border pt-4">
        Jobs agendados no GitHub Actions ficam em <strong>Jobs GitHub</strong>. Histórico detalhado de eventos
        fica em <strong>Logs no banco</strong>.
      </p>
    </div>
  );
}
