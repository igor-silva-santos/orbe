import type { Page } from '@playwright/test';
import { ExplorerCollector } from '../collector';
import {
  closeSearch,
  closeSuperModalIfOpen,
  gotoRoute,
  openFirstSuperModal,
  openSearch,
  timedStep,
  fillSearchQuery,
  enableAllHojeSections,
} from '../helpers';
import type { ExplorerAreaReport } from '../types';

export async function exploreAreaModalsDeep(page: Page, baseUrl: string): Promise<ExplorerAreaReport> {
  const area = 'MODAIS-BUSCA-GLOBAL';
  const startedAt = new Date().toISOString();
  const collector = new ExplorerCollector(area, 'global');
  collector.attach(page);

  const routesVisited = ['/filmes', '/jogos', '/animes', '/series'];
  const steps = [];

  steps.push(
    await timedStep('busca categorias + query', async () => {
      await gotoRoute(page, collector, '/');
      await openSearch(page);
      await fillSearchQuery(page, 'mario');
      await page
        .waitForResponse((r) => r.url().includes('/api/pesquisa') && r.status() === 200, { timeout: 60_000 })
        .catch(() => {});

      for (const label of [/todos/i, /filmes/i, /jogos/i]) {
        const chip = page.getByRole('button', { name: label }).first();
        if (await chip.isVisible().catch(() => false)) {
          await Promise.all([
            page.waitForResponse((r) => r.url().includes('/api/pesquisa') && r.status() === 200, { timeout: 45_000 }).catch(() => {}),
            chip.click().catch(() => {}),
          ]);
        }
      }

      const firstResult = page.locator('div.rounded-\\[20px\\].cursor-pointer, div.cursor-pointer').filter({ has: page.locator('img') }).first();
      if (await firstResult.isVisible().catch(() => false)) {
        await firstResult.click().catch(() => {});
        await page.waitForTimeout(1500);
        await closeSuperModalIfOpen(page);
      }
      await closeSearch(page);
    }),
  );

  for (const route of routesVisited) {
    steps.push(
      await timedStep(`modal profundo ${route}`, async () => {
        await gotoRoute(page, collector, route, 'networkidle');
        if (!(await openFirstSuperModal(page, collector))) return;

        const calBtn = page.getByRole('button', { name: /calendário|calendar|agenda/i }).first();
        if (await calBtn.isVisible().catch(() => false)) {
          await calBtn.click().catch(() => {});
          await page.waitForTimeout(800);
          await page.keyboard.press('Escape');
        }

        if (route.includes('jogos')) {
          const reqBtn = page.getByRole('button', { name: /requisitos|pc/i }).first();
          if (await reqBtn.isVisible().catch(() => false)) await reqBtn.click().catch(() => {});
        }

        if (route.includes('series')) {
          const seasonBtn = page.getByRole('button', { name: /temporada|season/i }).first();
          if (await seasonBtn.isVisible().catch(() => false)) {
            await seasonBtn.click().catch(() => {});
            await page.waitForTimeout(800);
            await page.keyboard.press('Escape');
          }
        }

        await closeSuperModalIfOpen(page);
      }),
    );
  }

  for (const step of steps) {
    collector.noteSlow(step.step, step.durationMs, 30_000);
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
