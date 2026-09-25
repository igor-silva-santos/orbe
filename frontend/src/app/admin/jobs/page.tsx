'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import AdminSyncNav from '@/components/admin/AdminSyncNav';
import { adminAuthFetch } from '@/lib/adminAuth';
import { useRequireAdmin } from '@/lib/hooks/useRequireAdmin';

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

function conclusionLabel(run: WorkflowRun) {
  if (run.status !== 'completed') return run.status;
  return run.conclusion ?? 'completed';
}

function conclusionClass(run: WorkflowRun) {
  const c = conclusionLabel(run);
  if (c === 'success') return 'text-emerald-600 dark:text-emerald-400';
  if (c === 'failure' || c === 'cancelled') return 'text-red-600 dark:text-red-400';
  if (c === 'in_progress' || run.status === 'in_progress' || run.status === 'queued')
    return 'text-amber-600 dark:text-amber-400';
  return 'text-muted-foreground';
}

export default function AdminGithubJobsPage() {
  const { loading: authLoading } = useRequireAdmin();
  const [data, setData] = useState<JobsResponse | null>(null);
  const [loading, setLoading] = useState(false);
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
    if (authLoading) return;
    load();
  }, [authLoading, load]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Verificando acesso…
      </div>
    );
  }

  const runs = data?.runs ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 max-w-4xl mx-auto">
      <Link
        href="/perfil"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar ao perfil
      </Link>

      <h1 className="text-2xl font-bold mb-1">Jobs GitHub (sync / keep-alive)</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Últimas execuções dos workflows de catálogo — separado do estado ao vivo no Render.
      </p>

      <AdminSyncNav />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => load()}
          disabled={loading}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
        {data?.actionsUrl && (
          <a
            href={data.actionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Abrir Actions no GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {data?.configured === false && (
        <p className="text-sm text-amber-800 dark:text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
          Defina <code className="text-xs">GITHUB_ACTIONS_READ_TOKEN</code> no Render se o repositório for
          privado ou a API retornar 403. Repositório público costuma funcionar sem token (com limite de taxa).
        </p>
      )}

      {error && <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>}

      {runs.length === 0 && !loading ? (
        <p className="text-sm text-muted-foreground">Nenhum run listado.</p>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-3 py-2 font-semibold">Workflow</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
                <th className="px-3 py-2 font-semibold hidden sm:table-cell">Evento</th>
                <th className="px-3 py-2 font-semibold hidden md:table-cell">Quando</th>
                <th className="px-3 py-2 font-semibold">Link</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id} className="border-t border-border">
                  <td className="px-3 py-2">
                    <div className="font-medium">{run.name}</div>
                    <div className="text-xs text-muted-foreground">{run.workflowPath}</div>
                  </td>
                  <td className={`px-3 py-2 font-medium ${conclusionClass(run)}`}>
                    {conclusionLabel(run)}
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell text-muted-foreground">{run.event}</td>
                  <td className="px-3 py-2 hidden md:table-cell text-muted-foreground">
                    {new Date(run.createdAt).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-3 py-2">
                    <a
                      href={run.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      #{run.id}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
