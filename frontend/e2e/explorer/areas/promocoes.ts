import type { Page } from '@playwright/test';
import { ExplorerCollector } from '../collector';
import { gotoRoute, timedStep } from '../helpers';
import type { ExplorerAreaReport } from '../types';

const TABS = [
  '/promocoes?tab=gratis',
  '/promocoes?tab=promocoes',
  '/promocoes?tab=em-alta',
] as const;

export async function exploreAreaPromocoes(page: Page, baseUrl: string): Promise<ExplorerAreaReport> {
  const area = 'PROMOCOES';
  const startedAt = new Date().toISOString();
  const collector = new ExplorerCollector(area, '/promocoes');
  collector.attach(page);

  const routesVisited: string[] = [];
  const steps = [];

  for (const route of TABS) {
    steps.push(
      await timedStep(route, async () => {
        await gotoRoute(page, collector, route, 'networkidle');
        routesVisited.push(route);

        const tabTriggers = page.getByRole('tab');
        const count = await tabTriggers.count();
        for (let i = 0; i < count; i++) {
          await tabTriggers.nth(i).click().catch(() => {});
          await page.waitForTimeout(600);
        }

        const sort = page.locator('select').last();
        if (await sort.isVisible().catch(() => false)) {
          const options = sort.locator('option');
          const optCount = await options.count();
          for (let j = 0; j < Math.min(optCount, 4); j++) {
            await sort.selectOption({ index: j }).catch(() => {});
          }
        }

        const platformButtons = page
          .getByRole('button')
          .filter({ hasText: /steam|epic|gog|todas|itch/i });
        const pb = await platformButtons.count();
        for (let k = 0; k < Math.min(pb, 4); k++) {
          await platformButtons.nth(k).click().catch(() => {});
        }

        const loadMore = page.getByRole('button', { name: /carregar mais/i });
        if (await loadMore.isVisible().catch(() => false)) {
          await loadMore.click().catch(() => {});
          await page.waitForTimeout(2000);
        }
      }),
    );
  }

  for (const step of steps) {
    collector.noteSlow(step.step, step.durationMs, 25_000);
    if (step.notes) collector.noteInteraction(step.step, step.notes);
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
