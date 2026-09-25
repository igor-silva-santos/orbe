import type { Page } from '@playwright/test';
import { ExplorerCollector } from '../collector';
import { gotoRoute, openFirstSuperModal, closeSuperModalIfOpen, timedStep } from '../helpers';
import type { ExplorerAreaReport } from '../types';

const ROUTES = [
  '/hoje',
  '/continuacoes',
  '/premios',
  '/eventos',
  '/minha-lista/animes',
  '/minha-lista/fila',
  '/extensao',
  '/extensao/crunchyroll',
  '/sugestoes',
  '/bug-report',
  '/apoie',
] as const;

export async function exploreAreaHojeOutras(page: Page, baseUrl: string): Promise<ExplorerAreaReport> {
  const area = 'HOJE-CONTINUACOES-OUTRAS';
  const startedAt = new Date().toISOString();
  const collector = new ExplorerCollector(area, ROUTES[0]);
  collector.attach(page);

  const routesVisited: string[] = [];
  const steps = [];

  for (const route of ROUTES) {
    steps.push(
      await timedStep(route, async () => {
        await gotoRoute(page, collector, route, 'networkidle');
        routesVisited.push(route);

        if (route === '/hoje') {
          const toggles = page.getByRole('button').filter({ hasText: /filmes|séries|animes|jogos|cinema|streaming/i });
          const n = await toggles.count();
          for (let i = 0; i < n; i++) {
            const btn = toggles.nth(i);
            const pressed = await btn.getAttribute('aria-pressed');
            if (pressed === 'false') await btn.click().catch(() => {});
          }
          await page.waitForTimeout(1500);
          await openFirstSuperModal(page, collector, 'main').catch(() => {});
          await closeSuperModalIfOpen(page);
        }

        if (route === '/continuacoes') {
          const sagaTab = page.getByRole('button', { name: /sagas/i }).first();
          const uniTab = page.getByRole('button', { name: /universos/i }).first();
          if (await sagaTab.isVisible().catch(() => false)) await sagaTab.click();
          if (await uniTab.isVisible().catch(() => false)) await uniTab.click();
          await openFirstSuperModal(page, collector).catch(() => {});
          await closeSuperModalIfOpen(page);
        }

        if (route === '/premios') {
          const sel = page.locator('select').first();
          if (await sel.isVisible().catch(() => false)) await sel.selectOption({ index: 1 }).catch(() => {});
        }

        if (route === '/eventos') {
          const yearSel = page.locator('select').first();
          if (await yearSel.isVisible().catch(() => false)) await yearSel.selectOption({ index: 1 }).catch(() => {});
        }
      }),
    );
  }

  for (const step of steps) {
    collector.noteSlow(step.step, step.durationMs, 20_000);
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
