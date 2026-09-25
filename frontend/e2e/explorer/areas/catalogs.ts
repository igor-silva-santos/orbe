import type { Page } from '@playwright/test';
import { ExplorerCollector } from '../collector';
import { closeSuperModalIfOpen, gotoRoute, openFirstSuperModal, timedStep } from '../helpers';
import type { ExplorerAreaReport } from '../types';

const CATALOGS = ['/filmes', '/series', '/animes', '/jogos'] as const;

export async function exploreAreaCatalogs(page: Page, baseUrl: string): Promise<ExplorerAreaReport> {
  const area = 'CATALOGOS';
  const startedAt = new Date().toISOString();
  const collector = new ExplorerCollector(area, CATALOGS[0]);
  collector.attach(page);

  const routesVisited: string[] = [];
  const steps = [];

  for (const route of CATALOGS) {
    const loadStep = await timedStep(`${route} load`, async () => {
      await gotoRoute(page, collector, route, 'networkidle');
      routesVisited.push(route);
    });
    steps.push(loadStep);
    collector.noteSlow(loadStep.step, loadStep.durationMs, 20_000);

    const modalStep = await timedStep(`${route} supermodal`, async () => {
      const opened = await openFirstSuperModal(page, collector);
      if (opened) {
        const tabs = page.getByRole('tab');
        const tabCount = await tabs.count();
        for (let i = 0; i < Math.min(tabCount, 4); i++) {
          await tabs.nth(i).click().catch(() => {});
          await page.waitForTimeout(400);
        }
        await closeSuperModalIfOpen(page);
      }
    });
    steps.push(modalStep);

    const filterStep = await timedStep(`${route} filtros`, async () => {
      const selects = page.locator('select');
      const n = await selects.count();
      for (let i = 0; i < Math.min(n, 3); i++) {
        const sel = selects.nth(i);
        const options = sel.locator('option');
        if ((await options.count()) > 1) {
          await sel.selectOption({ index: 1 }).catch(() => {});
        }
      }
      const chips = page.getByRole('button').filter({ hasText: /todos|cartaz|breve|popular/i });
      if (await chips.first().isVisible().catch(() => false)) {
        await chips.first().click().catch(() => {});
      }
    });
    steps.push(filterStep);
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
