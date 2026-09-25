'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import LastSyncHero from '@/components/admin/sync/LastSyncHero';
import LiveSyncCard from '@/components/admin/sync/LiveSyncCard';
import SyncRunStatusBadge from '@/components/admin/sync/SyncRunStatusBadge';
import { adminAuthFetch } from '@/lib/adminAuth';
import { API_BASE } from '@/lib/apiBase';
import {
  formatDateTime,
  type LiveSyncStatus,
  type SyncLogRunListItem,
} from '@/lib/admin/syncPresentation';

type GhRun = {
  id: number;
  name: string;
  conclusion: string | null;
  status: string;
  createdAt: string;
  htmlUrl: string;
};

export default function AdminDashboardPage() {
  const [live, setLive] = useState<LiveSyncStatus | null>(null);
  const [lastRun, setLastRun] = useState<SyncLogRunListItem | null>(null);
  const [recentRuns, setRecentRuns] = useState<SyncLogRunListItem[]>([]);
  const [lastGhRun, setLastGhRun] = useState<GhRun | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const [statusRes, runsRes, ghRes] = await Promise.all([
        fetch(`${API_BASE}/sync/status`, { cache: 'no-store' }),
        adminAuthFetch('/sync/log-runs?limit=5'),
        adminAuthFetch('/admin/github-workflow-runs').catch(() => null),
      ]);

      if (statusRes.ok) {
        setLive((await statusRes.json()) as LiveSyncStatus);
      }

      const runsBody = (await runsRes.json()) as { runs?: SyncLogRunListItem[] };
      const runs = runsBody.runs ?? [];
      setRecentRuns(runs);
      setLastRun(runs[0] ?? null);

      if (ghRes?.ok) {
        const gh = (await ghRes.json()) as { runs?: GhRun[] };
        setLastGhRun(gh.runs?.[0] ?? null);
      }
    } catch {
      // mantém último estado visível
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 20000);
    return () => clearInterval(id);
  }, [load]);

  return (
    <AdminShell
      title="Painel de sincronização"
      description="Visão geral do último sync gravado, estado atual da API e atalhos para histórico e GitHub Actions."
      actions={
        <button
          type="button"
          onClick={() => load()}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Atualizar painel
        </button>
      }
    >
      <div className="space-y-6">
        <LastSyncHero run={lastRun} loading={loading && !lastRun} />

        <div className="grid lg:grid-cols-2 gap-6">
          <LiveSyncCard
            status={live}
            loading={loading && !live}
            onRefresh={load}
            refreshing={refreshing}
            compact
          />

          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h3 className="font-semibold mb-1">Último job no GitHub</h3>
            <p className="text-xs text-muted-foreground mb-4">Orquestração (cron / dispatch) — separado do run no banco.</p>
            {lastGhRun ? (
              <div className="space-y-2">
                <p className="font-medium">{lastGhRun.name}</p>
                <p className="text-sm text-muted-foreground">{formatDateTime(lastGhRun.createdAt)}</p>
                <p className="text-sm">
                  Estado:{' '}
                  <span className="font-medium">
                    {lastGhRun.status === 'completed' ? lastGhRun.conclusion ?? 'concluído' : lastGhRun.status}
                  </span>
                </p>
                <Link href="/admin/jobs" className="text-sm text-primary font-medium hover:underline">
                  Ver todos os jobs →
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Não foi possível carregar Actions agora. Confira a aba GitHub ou o token no Render.
              </p>
            )}
          </section>
        </div>

        {recentRuns.length > 1 && (
          <section className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">Execuções recentes</h3>
              <Link href="/admin/sync-logs" className="text-sm text-primary hover:underline">
                Histórico completo
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {recentRuns.slice(1, 5).map((run) => (
                <li key={run.id}>
                  <Link
                    href={`/admin/sync-logs?run=${run.id}`}
                    className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 hover:bg-muted/40 transition-colors"
                  >
                    <div>
                      <span className="font-medium">Sync #{run.id}</span>
                      <span className="text-muted-foreground text-sm ml-2">{formatDateTime(run.finishedAt ?? run.startedAt)}</span>
                    </div>
                    <SyncRunStatusBadge status={run.status} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </AdminShell>
  );
}
