'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Download,
  ExternalLink,
  Loader2,
  RefreshCw,
  Tag,
} from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE } from '@/lib/apiBase';

type DealsUrlRejectReason = 'empty' | 'invalid_url' | 'blocked_aggregator' | 'unofficial_host';

type DealsRejectedSample = {
  id: string;
  title: string;
  source: string;
  storeUrl: string;
  reason: DealsUrlRejectReason;
  hostname: string | null;
  section: 'gratis' | 'promocoes';
};

type DealsFilterSummary = {
  rawBySource: Record<string, number>;
  afterDedupe: { gratis: number; promocoes: number };
  accepted: { gratis: number; promocoes: number };
  rejected: {
    total: number;
    byReason: Record<DealsUrlRejectReason, number>;
    bySource: Record<string, number>;
    samples: DealsRejectedSample[];
  };
  finalCounts: {
    gratis: number;
    gratisTemporarios: number;
    gratisPermanentes: number;
    promocoes: number;
    catalogoSteam: number;
  };
  usdBrlRate?: number | null;
  errorMessage?: string | null;
};

type DealsLogRun = {
  id: number;
  startedAt: string;
  finishedAt: string | null;
  status: string;
  trigger: string | null;
  fingerprint: string | null;
  summary: DealsFilterSummary | null;
};

const REASON_LABELS: Record<DealsUrlRejectReason, string> = {
  empty: 'URL vazia',
  invalid_url: 'URL inválida',
  blocked_aggregator: 'Agregador bloqueado',
  unofficial_host: 'Host não oficial',
};

function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

async function authFetch(path: string): Promise<Response> {
  const token = getToken();
  const response = await fetch(`${API_BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) {
    let message = `Erro ${response.status}`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  return response;
}

function formatDateTime(value: string | null): string {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return value;
  }
}

export default function DealsLogsPage() {
  const router = useRouter();
  const [runs, setRuns] = useState<DealsLogRun[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const selectedRun = useMemo(
    () => runs.find((run) => run.id === selectedId) ?? runs[0] ?? null,
    [runs, selectedId],
  );

  const loadRuns = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const response = await authFetch('/deals/log-runs?limit=50');
      const data = (await response.json()) as { runs: DealsLogRun[] };
      setRuns(data.runs ?? []);
      if (data.runs?.length && selectedId === null) {
        setSelectedId(data.runs[0].id);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Falha ao carregar logs de promoções');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedId]);

  useEffect(() => {
    void loadRuns();
  }, [loadRuns]);

  const handleDownloadTextLog = async () => {
    setDownloading(true);
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE}/sync/logs?filter=deals`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error(`Erro ${response.status}`);
      const text = await response.text();
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `orbe-deals-${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}.log`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Falha ao baixar log em texto');
    } finally {
      setDownloading(false);
    }
  };

  const summary = selectedRun?.summary;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => router.push('/perfil')}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao perfil
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Tag className="h-6 w-6 text-primary" />
            Logs de promoções
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Histórico persistido no banco de cada refresh do cache de promoções — ofertas aceitas,
            URLs rejeitadas e motivo. Não depende do painel do Render.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void loadRuns(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
          <button
            type="button"
            onClick={() => void handleDownloadTextLog()}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200 rounded-lg hover:bg-amber-500/20 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Log em memória
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/sync-logs')}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted"
          >
            Logs de sync
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          Carregando histórico...
        </div>
      ) : runs.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
          Nenhum refresh registrado ainda. O cron de promoções roda a cada minuto — aguarde ou force
          refresh na página de promoções.
        </div>
      ) : (
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
              Últimos refreshes
            </p>
            <div className="rounded-xl border border-border bg-card overflow-hidden max-h-[70vh] overflow-y-auto">
              {runs.map((run) => {
                const rejected = run.summary?.rejected?.total ?? 0;
                const active = run.id === selectedRun?.id;
                return (
                  <button
                    key={run.id}
                    type="button"
                    onClick={() => setSelectedId(run.id)}
                    className={`w-full text-left px-3 py-3 border-b border-border last:border-0 transition-colors ${
                      active ? 'bg-primary/10' : 'hover:bg-muted/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-muted-foreground">#{run.id}</span>
                      {rejected > 0 ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                          {rejected} rejeit.
                        </span>
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-sm font-medium mt-1">{formatDateTime(run.startedAt)}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{run.trigger ?? '—'}</p>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="space-y-4">
            {selectedRun && (
              <>
                <div className="rounded-xl border border-border bg-card p-4 md:p-5 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 justify-between">
                    <div>
                      <h2 className="font-semibold">Refresh #{selectedRun.id}</h2>
                      <p className="text-sm text-muted-foreground">
                        {formatDateTime(selectedRun.startedAt)} · trigger: {selectedRun.trigger ?? '—'}
                        {selectedRun.fingerprint && (
                          <> · fingerprint: <code className="text-xs">{selectedRun.fingerprint}</code></>
                        )}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        selectedRun.status === 'completed'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                          : 'bg-destructive/15 text-destructive'
                      }`}
                    >
                      {selectedRun.status}
                    </span>
                  </div>

                  {summary && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <StatCard
                        label="Grátis aceitos"
                        value={summary.accepted.gratis}
                        sub={`final: ${summary.finalCounts.gratis}`}
                      />
                      <StatCard
                        label="Promoções aceitas"
                        value={summary.accepted.promocoes}
                        sub={`final: ${summary.finalCounts.promocoes}`}
                      />
                      <StatCard
                        label="URLs rejeitadas"
                        value={summary.rejected.total}
                        sub={summary.rejected.total > 0 ? 'ver motivos abaixo' : 'nenhuma'}
                        warn={summary.rejected.total > 0}
                      />
                      <StatCard
                        label="USD/BRL"
                        value={summary.usdBrlRate != null ? summary.usdBrlRate.toFixed(2) : '—'}
                        sub="taxa usada na conversão"
                      />
                    </div>
                  )}
                </div>

                {summary && (
                  <>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <h3 className="text-sm font-semibold mb-3">Por fonte (bruto da API)</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(summary.rawBySource).map(([source, count]) => (
                          <span
                            key={source}
                            className="text-xs px-2 py-1 rounded-md bg-muted border border-border"
                          >
                            {source}: <strong>{count}</strong>
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        Após dedupe: grátis {summary.afterDedupe.gratis} · promoções{' '}
                        {summary.afterDedupe.promocoes}
                      </p>
                    </div>

                    {summary.rejected.total > 0 && (
                      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-4">
                        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                          <AlertTriangle className="h-4 w-4 shrink-0" />
                          <h3 className="text-sm font-semibold">Motivos de rejeição</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(summary.rejected.byReason)
                            .filter(([, count]) => count > 0)
                            .map(([reason, count]) => (
                              <span
                                key={reason}
                                className="text-xs px-2 py-1 rounded-md bg-background border border-border"
                              >
                                {REASON_LABELS[reason as DealsUrlRejectReason] ?? reason}:{' '}
                                <strong>{count}</strong>
                              </span>
                            ))}
                        </div>
                        {Object.keys(summary.rejected.bySource).length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Por fonte:{' '}
                            {Object.entries(summary.rejected.bySource)
                              .map(([src, n]) => `${src} (${n})`)
                              .join(' · ')}
                          </p>
                        )}

                        {summary.rejected.samples.length > 0 && (
                          <div className="overflow-x-auto rounded-lg border border-border bg-card">
                            <table className="w-full text-sm">
                              <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
                                <tr>
                                  <th className="p-2">Título</th>
                                  <th className="p-2">Fonte</th>
                                  <th className="p-2">Seção</th>
                                  <th className="p-2">Motivo</th>
                                  <th className="p-2">Host</th>
                                  <th className="p-2">URL</th>
                                </tr>
                              </thead>
                              <tbody>
                                {summary.rejected.samples.map((sample) => (
                                  <tr key={`${sample.id}-${sample.section}`} className="border-t border-border">
                                    <td className="p-2 max-w-[180px] truncate" title={sample.title}>
                                      {sample.title}
                                    </td>
                                    <td className="p-2">{sample.source}</td>
                                    <td className="p-2">{sample.section}</td>
                                    <td className="p-2 text-xs">
                                      {REASON_LABELS[sample.reason] ?? sample.reason}
                                    </td>
                                    <td className="p-2 text-xs font-mono">{sample.hostname ?? '—'}</td>
                                    <td className="p-2">
                                      <a
                                        href={sample.storeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-primary hover:underline text-xs max-w-[200px] truncate"
                                      >
                                        <ExternalLink className="h-3 w-3 shrink-0" />
                                        <span className="truncate">{sample.storeUrl}</span>
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  warn = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  warn?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        warn ? 'border-amber-500/40 bg-amber-500/5' : 'border-border bg-muted/30'
      }`}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}
