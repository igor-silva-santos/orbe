import type { Page } from '@playwright/test';
import { ExplorerCollector } from '../collector';
import {
  closeSuperModalIfOpen,
  exerciseCarouselSection,
  gotoRoute,
  openFirstSuperModal,
  timedStep,
} from '../helpers';
import type { ExplorerAreaReport } from '../types';

export async function exploreAreaHome(page: Page, baseUrl: string): Promise<ExplorerAreaReport> {
  const area = 'HOME';
  const startedAt = new Date().toISOString();
  const collector = new ExplorerCollector(area, '/');
  collector.attach(page);

  const routesVisited = ['/'];
  const steps = [];

  steps.push(
    await timedStep('home load + scroll faixas', async () => {
      await gotoRoute(page, collector, '/');
      for (const id of ['filmes', 'series', 'animes', 'jogos']) {
        await exerciseCarouselSection(page, id);
      }
      const emAlta = page.getByRole('button', { name: /em alta/i }).first();
      if (await emAlta.isVisible().catch(() => false)) await emAlta.click().catch(() => {});
    }),
  );

  steps.push(
    await timedStep('home supermodal filme', async () => {
      await gotoRoute(page, collector, '/');
      await page.locator('#filmes').scrollIntoViewIfNeeded();
      const opened = await openFirstSuperModal(page, collector, '#filmes');
      if (opened) {
        await page.waitForTimeout(1200);
        await closeSuperModalIfOpen(page);
      }
    }),
  );

  steps.push(
    await timedStep('anime carousel mode toggle', async () => {
      await gotoRoute(page, collector, '/');
      await page.locator('#animes').scrollIntoViewIfNeeded();
      const toggles = page.locator('#animes button').filter({ has: page.locator('svg') });
      const count = await toggles.count();
      if (count >= 2) {
        await toggles.nth(0).click().catch(() => {});
        await toggles.nth(1).click().catch(() => {});
      }
    }),
  );

  for (const step of steps) {
    collector.noteSlow(step.step, step.durationMs, 15_000);
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
