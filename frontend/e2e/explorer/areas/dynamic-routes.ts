import type { Page, APIRequestContext } from '@playwright/test';
import { ExplorerCollector } from '../collector';
import { discoverRouteSamples, resolveAllUiRoutes } from '../discover-samples';
import { closeSuperModalIfOpen, gotoRoute, openFirstSuperModal, timedStep } from '../helpers';
import type { ExplorerAreaReport } from '../types';

export async function exploreAreaDynamicRoutes(
  page: Page,
  request: APIRequestContext,
  baseUrl: string,
): Promise<ExplorerAreaReport> {
  const area = 'ROTAS-DINAMICAS';
  const startedAt = new Date().toISOString();
  const collector = new ExplorerCollector(area, '/pessoa');
  collector.attach(page);

  const samples = await discoverRouteSamples(request);
  const dynamicOnly = resolveAllUiRoutes(samples).filter((r) => r.kind === 'dynamic');
  const routesVisited: string[] = [];
  const steps = [];

  for (const route of dynamicOnly) {
    steps.push(
      await timedStep(route.path, async () => {
        await gotoRoute(page, collector, route.path, 'networkidle');
        routesVisited.push(route.path);
        if (route.path.startsWith('/pessoa') || route.path.startsWith('/desenvolvedora')) {
          await openFirstSuperModal(page, collector).catch(() => {});
          await closeSuperModalIfOpen(page);
        }
      }),
    );
  }

  for (const step of steps) {
    collector.noteSlow(step.step, step.durationMs, 25_000);
  }

  return {
    area,
    baseUrl,
    startedAt,
    finishedAt: new Date().toISOString(),
    routesVisited,
    steps,
    issues: collector.issues,
    discoveredLinks: [...collector.discoveredLinks],
  };
}
