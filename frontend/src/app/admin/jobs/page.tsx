'use client';

import { useCallback, useEffect, useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { adminAuthFetch } from '@/lib/adminAuth';
import { formatDateTime } from '@/lib/admin/syncPresentation';

type WorkflowRun = {
  id: number;
  name: string;
  workflowPath: string;
  status: string;
  conclusion: string | null;
  htmlUrl: string;
  createdAt: string;
  event: string;
  headBranch: string;
};

type JobsResponse = {
  configured?: boolean;
  actionsUrl?: string;
  error?: string;
  runs?: WorkflowRun[];
};

function jobStateLabel(run: WorkflowRun): string {
  if (run.status !== 'completed') return run.status === 'in_progress' ? 'Em execução' : run.status;
  if (run.conclusion === 'success') return 'Sucesso';
  if (run.conclusion === 'failure') return 'Falhou';
  if (run.conclusion === 'cancelled') return 'Cancelado';
  return run.conclusion ?? 'Concluído';
}

function jobStateClass(run: WorkflowRun): string {
  const label = jobStateLabel(run);
  if (label === 'Sucesso') return 'text-emerald-600 dark:text-emerald-400';
  if (label === 'Falhou' || label === 'Cancelado') return 'text-red-600 dark:text-red-400';
  if (label === 'Em execução' || run.status === 'queued') return 'text-blue-600 dark:text-blue-400';
  return 'text-muted-foreground';
}

export default function AdminGithubJobsPage() {
  const [data, setData] = useState<JobsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminAuthFetch('/admin/github-workflow-runs');
      const json = (await res.json()) as JobsResponse;
      setData(json);
      if (json.error) setError(json.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Falha ao carregar jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const runs = data?.runs ?? [];

  return (
    <AdminShell
      title="GitHub Actions"
      description="Últimas execuções dos workflows que disparam sync e keep-alive — complemento ao histórico gravado no banco."
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => load()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
          {data?.actionsUrl && (
            <a
              href={data.actionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
            >
              Abrir no GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      }
    >
      {data?.configured === false && (
        <p className="text-sm text-amber-900 dark:text-amber-100 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
          Repositório privado ou limite da API? Defina <code className="text-xs">GITHUB_ACTIONS_READ_TOKEN</code> no
          Render.
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          {error}
        </p>
      )}

      {loading && runs.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-2xl border border-border bg-card animate-pulse" />
          ))}
        </div>
      ) : runs.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhum run listado.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {runs.map((run) => (
            <article
              key={run.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 transition-colors"
            >
              <p className="text-xs text-muted-foreground truncate mb-1">{run.workflowPath}</p>
              <h3 className="font-semibold leading-snug mb-2">{run.name}</h3>
              <p className={`text-sm font-medium mb-3 ${jobStateClass(run)}`}>{jobStateLabel(run)}</p>
              <dl className="text-xs text-muted-foreground space-y-1 mb-4">
                <div className="flex justify-between gap-2">
                  <dt>Quando</dt>
                  <dd className="text-foreground">{formatDateTime(run.createdAt)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Evento</dt>
                  <dd className="text-foreground">{run.event}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Branch</dt>
                  <dd className="text-foreground truncate">{run.headBranch}</dd>
                </div>
              </dl>
              <a
                href={run.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Run #{run.id}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
