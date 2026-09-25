import type { Page, APIRequestContext } from '@playwright/test';
import { ExplorerCollector } from '../collector';
import { timedStep } from '../helpers';
import type { ExplorerAreaReport } from '../types';
import {
  AUTH_EXPECTED_ROUTES,
  DYNAMIC_UI_ROUTES,
  PUBLIC_API_GET_ROUTES,
  STATIC_UI_ROUTES,
  type RouteSamples,
} from '../route-manifest';
import { discoverRouteSamples, resolveAllUiRoutes } from '../discover-samples';

export type RouteValidationRow = {
  path: string;
  kind: string;
  httpStatus: number | null;
  ok: boolean;
  finalUrl?: string;
  note?: string;
};

export async function exploreAllUiRoutes(
  page: Page,
  request: APIRequestContext,
  baseUrl: string,
): Promise<{ area: ExplorerAreaReport; routes: RouteValidationRow[]; samples: RouteSamples }> {
  const area = 'TODAS-ROTAS-UI';
  const startedAt = new Date().toISOString();
  const collector = new ExplorerCollector(area, 'ui');
  collector.attach(page);

  const samples = await discoverRouteSamples(request);
  const routes = resolveAllUiRoutes(samples);
  const rows: RouteValidationRow[] = [];
  const steps = [];

  for (const route of routes) {
    const step = await timedStep(`UI ${route.path}`, async () => {
      const response = await page.goto(route.path, {
        waitUntil: 'domcontentloaded',
        timeout: 90_000,
      });
      const status = response?.status() ?? null;
      const finalUrl = page.url();
      const authRule = AUTH_EXPECTED_ROUTES.find((a) => route.path.startsWith(a.path.split('?')[0]!));
      let ok = status !== null && status < 500;
      let note: string | undefined;

      if (status !== null && status >= 300 && status < 400) {
        ok = true;
        note = `redirect ${status}`;
      }

      if (authRule?.expectRedirectLogin && finalUrl.includes('/login')) {
        ok = true;
        note = 'redirect login (esperado sem sessão)';
      } else if (status === 404) {
        ok = false;
        collector.noteMissing('route', `404 em ${route.path}`);
      } else if (status && status >= 500) {
        ok = false;
        collector.noteInteraction('route', `HTTP ${status} em ${route.path}`);
      }

      if (ok && !route.path.includes('robots') && !route.path.includes('sitemap') && !route.path.includes('manifest')) {
        const main = page.locator('main, body');
        await main.first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {
          collector.noteMissing('route', `Sem conteúdo visível em ${route.path}`);
        });
      }

      rows.push({
        path: route.path,
        kind: route.kind,
        httpStatus: status,
        ok,
        finalUrl,
        note,
      });
    });
    steps.push(step);
    collector.noteSlow(step.step, step.durationMs, 25_000);
  }

  return {
    area: {
      area,
      baseUrl,
      startedAt,
      finishedAt: new Date().toISOString(),
      routesVisited: routes.map((r) => r.path),
      steps,
      issues: collector.issues,
      discoveredLinks: [...collector.discoveredLinks],
    },
    routes: rows,
    samples,
  };
}

export async function explorePublicApiRoutes(
  request: APIRequestContext,
  baseUrl: string,
  samples?: RouteSamples,
): Promise<{ area: ExplorerAreaReport; routes: RouteValidationRow[] }> {
  const area = 'TODAS-ROTAS-API-PUBLICAS';
  const startedAt = new Date().toISOString();
  const issues: ExplorerAreaReport['issues'] = [];
  const rows: RouteValidationRow[] = [];
  const steps = [];

  const extra: string[] = [];
  if (samples?.filmeId) extra.push(`/api/filmes/${samples.filmeId}/details`);
  if (samples?.serieId) extra.push(`/api/series/${samples.serieId}/details`);
  if (samples?.animeId) extra.push(`/api/animes/${samples.animeId}/details`);
  if (samples?.jogoId) {
    extra.push(`/api/jogos/${samples.jogoId}/details`);
    extra.push(`/api/jogos/${samples.jogoId}/steam-price`);
  }
  if (samples?.pessoaId) extra.push(`/api/pessoas/${samples.pessoaId}/creditos`);
  if (samples?.sagaId) extra.push(`/api/continuacoes/sagas/${samples.sagaId}`);

  const paths = [...PUBLIC_API_GET_ROUTES, ...extra];
  for (const path of paths) {
    const step = await timedStep(`API ${path}`, async () => {
      const res = await request.get(path, { timeout: 90_000 });
      const status = res.status();
      const ok = status >= 200 && status < 400;
      if (!ok) {
        issues.push({
          id: `API-${path.replace(/\//g, '_')}`,
          area,
          route: path,
          step: 'http',
          kind: status >= 500 ? 'request.http_error' : 'request.failed',
          severity: status >= 500 ? 'critical' : 'high',
          message: `HTTP ${status} — ${path}`,
          url: path,
          timestamp: new Date().toISOString(),
        });
      }
      rows.push({ path, kind: 'api', httpStatus: status, ok });
    });
    steps.push(step);
  }

  return {
    area: {
      area,
      baseUrl,
      startedAt,
      finishedAt: new Date().toISOString(),
      routesVisited: paths,
      steps,
      issues,
      discoveredLinks: [],
    },
    routes: rows,
  };
}

export function writeRouteValidationArtifact(
  uiRows: RouteValidationRow[],
  apiRows: RouteValidationRow[],
  samples: RouteSamples,
): void {
  const fs = require('node:fs') as typeof import('node:fs');
  const path = require('node:path') as typeof import('node:path');
  const outDir = path.resolve(__dirname, '../../../../docs/qa');
  fs.mkdirSync(outDir, { recursive: true });

  const uiFail = uiRows.filter((r) => !r.ok);
  const apiFail = apiRows.filter((r) => !r.ok);

  const payload = {
    generatedAt: new Date().toISOString(),
    totals: {
      uiRoutes: uiRows.length,
      uiFailed: uiFail.length,
      apiRoutes: apiRows.length,
      apiFailed: apiFail.length,
      staticUiCatalog: STATIC_UI_ROUTES.length,
      dynamicPatterns: DYNAMIC_UI_ROUTES.length,
      publicApiCatalog: PUBLIC_API_GET_ROUTES.length,
    },
    samples,
    ui: uiRows,
    api: apiRows,
    failed: [...uiFail, ...apiFail],
  };

  fs.writeFileSync(path.join(outDir, 'validacao-rotas-latest.json'), JSON.stringify(payload, null, 2));

  const md = [
    '# Validação de rotas Orbe',
    '',
    `Gerado: ${payload.generatedAt}`,
    '',
    '## Totais',
    '',
    `- **UI testadas:** ${uiRows.length} (${STATIC_UI_ROUTES.length} estáticas + ${uiRows.length - STATIC_UI_ROUTES.length} dinâmicas amostradas)`,
    `- **UI com falha:** ${uiFail.length}`,
    `- **API GET públicas testadas:** ${apiRows.length}`,
    `- **API com falha:** ${apiFail.length}`,
    '',
    '## Inventário completo no código',
    '',
    '- `frontend/e2e/explorer/route-manifest.ts` — catálogo canônico',
    '- `docs/qa/mapa-orbe-rotas.md` — mapa humano (UI + API + modais)',
    '',
  ];

  if (uiFail.length + apiFail.length > 0) {
    md.push('## Falhas', '', '| Rota | HTTP | Nota |', '| --- | --- | --- |');
    for (const f of [...uiFail, ...apiFail].slice(0, 100)) {
      md.push(`| ${f.path} | ${f.httpStatus ?? '—'} | ${f.note ?? ''} |`);
    }
  } else {
    md.push('_Nenhuma falha HTTP ≥400 / 404 / 5xx nesta rodada._');
  }

  fs.writeFileSync(path.join(outDir, 'validacao-rotas-latest.md'), md.join('\n'));
}
