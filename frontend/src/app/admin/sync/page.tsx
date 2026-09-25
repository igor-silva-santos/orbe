'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import LiveSyncCard from '@/components/admin/sync/LiveSyncCard';
import { API_BASE } from '@/lib/apiBase';
import { formatDateTime, phaseLabel, type LiveSyncStatus } from '@/lib/admin/syncPresentation';

export default function AdminSyncLivePage() {
  const [status, setStatus] = useState<LiveSyncStatus | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    setFetchError(null);
    try {
      const res = await fetch(`${API_BASE}/sync/status`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus((await res.json()) as LiveSyncStatus);
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : 'Falha ao consultar status');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, [load]);

  const phases = status?.completedPhases ?? [];

  return (
    <AdminShell
      title="Monitor ao vivo"
      description="Atualização automática a cada 10 segundos — reflete o lock de sync no Render e no Supabase."
    >
      <div className="max-w-3xl space-y-6">
        <LiveSyncCard status={status} loading={loading} onRefresh={load} refreshing={refreshing} />

        {fetchError && (
          <p className="text-sm text-red-600 dark:text-red-400 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
            {fetchError}
          </p>
        )}

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h3 className="font-semibold mb-4">Detalhes técnicos</h3>
          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-muted/40 px-3 py-2">
              <dt className="text-muted-foreground text-xs">Sync ativo</dt>
              <dd className="font-medium">{status?.syncActive ? 'Sim' : 'Não'}</dd>
            </div>
            <div className="rounded-lg bg-muted/40 px-3 py-2">
              <dt className="text-muted-foreground text-xs">Sem progresso (stale)</dt>
              <dd className="font-medium">{status?.stale ? 'Sim — investigar' : 'Não'}</dd>
            </div>
            <div className="rounded-lg bg-muted/40 px-3 py-2">
              <dt className="text-muted-foreground text-xs">Retomada disponível</dt>
              <dd className="font-medium">{status?.resumeAvailable ? 'Sim' : 'Não'}</dd>
            </div>
            <div className="rounded-lg bg-muted/40 px-3 py-2">
              <dt className="text-muted-foreground text-xs">Início do run</dt>
              <dd className="font-medium">{formatDateTime(status?.startedAt)}</dd>
            </div>
          </dl>

          {phases.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Fases já concluídas neste run
              </p>
              <div className="flex flex-wrap gap-2">
                {phases.map((p) => (
                  <span
                    key={p}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {phaseLabel(p)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
