import { Router } from 'express';
import adminMiddleware from './adminMiddleware';
import { logger } from './logger';

const router = Router();

const SYNC_WORKFLOW_PATH_HINTS = [
  'sync-daily.yml',
  'sync-all.yml',
  'sync-catalog-year.yml',
  'sync-catalog-range.yml',
  'sync-backfill.yml',
  'keep-alive.yml',
];

type GhWorkflowRun = {
  id: number;
  name: string;
  workflowId: number;
  workflowPath: string;
  status: string;
  conclusion: string | null;
  htmlUrl: string;
  createdAt: string;
  updatedAt: string;
  event: string;
  headBranch: string;
};

function resolveGithubRepo(): { owner: string; repo: string } {
  const full = process.env.GITHUB_REPOSITORY?.trim();
  if (full && full.includes('/')) {
    const [owner, repo] = full.split('/');
    return { owner, repo: repo ?? 'orbe' };
  }
  return {
    owner: process.env.GITHUB_REPO_OWNER?.trim() || 'igor-silva-santos',
    repo: process.env.GITHUB_REPO_NAME?.trim() || 'orbe',
  };
}

async function githubFetch(path: string): Promise<globalThis.Response> {
  const token = process.env.GITHUB_ACTIONS_READ_TOKEN?.trim();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return fetch(`https://api.github.com${path}`, { headers });
}

/** Últimas execuções dos workflows de sync no GitHub (somente admin). */
router.get('/admin/github-workflow-runs', adminMiddleware, async (_req, res) => {
  const { owner, repo } = resolveGithubRepo();
  const actionsUrl = `https://github.com/${owner}/${repo}/actions`;
  const tokenConfigured = Boolean(process.env.GITHUB_ACTIONS_READ_TOKEN?.trim());

  try {
    const wfRes = await githubFetch(`/repos/${owner}/${repo}/actions/workflows?per_page=100`);
    if (!wfRes.ok) {
      const text = await wfRes.text();
      logger.warn(`GitHub workflows ${wfRes.status}: ${text.slice(0, 200)}`);
      return res.status(wfRes.status === 404 ? 404 : 502).json({
        configured: tokenConfigured,
        actionsUrl,
        error:
          wfRes.status === 404
            ? 'Repositório ou Actions não encontrados.'
            : 'Não foi possível listar workflows no GitHub.',
        runs: [] as GhWorkflowRun[],
      });
    }

    const wfBody = (await wfRes.json()) as {
      workflows?: { id: number; name: string; path: string; state: string }[];
    };
    const workflows = (wfBody.workflows ?? []).filter((w) =>
      SYNC_WORKFLOW_PATH_HINTS.some((hint) => w.path.endsWith(hint)),
    );

    const runs: GhWorkflowRun[] = [];
    for (const wf of workflows.slice(0, 8)) {
      const runRes = await githubFetch(
        `/repos/${owner}/${repo}/actions/workflows/${wf.id}/runs?per_page=3`,
      );
      if (!runRes.ok) continue;
      const runBody = (await runRes.json()) as {
        workflow_runs?: {
          id: number;
          name: string;
          workflow_id: number;
          status: string;
          conclusion: string | null;
          html_url: string;
          created_at: string;
          updated_at: string;
          event: string;
          head_branch: string;
        }[];
      };
      for (const r of runBody.workflow_runs ?? []) {
        runs.push({
          id: r.id,
          name: r.name || wf.name,
          workflowId: r.workflow_id,
          workflowPath: wf.path,
          status: r.status,
          conclusion: r.conclusion,
          htmlUrl: r.html_url,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
          event: r.event,
          headBranch: r.head_branch,
        });
      }
    }

    runs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      configured: tokenConfigured,
      actionsUrl,
      owner,
      repo,
      runs: runs.slice(0, 30),
    });
  } catch (error) {
    logger.error('Erro ao buscar workflow runs no GitHub:', error);
    res.status(500).json({
      configured: tokenConfigured,
      actionsUrl,
      error: 'Erro interno ao consultar GitHub Actions.',
      runs: [] as GhWorkflowRun[],
    });
  }
});

export default router;
