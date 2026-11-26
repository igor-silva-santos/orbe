import type { Page } from '@playwright/test';
import { ExplorerCollector } from '../collector';
import { gotoRoute, timedStep, STATIC_ROUTES, openSearch, closeSearch, fillSearchQuery } from '../helpers';
import type { ExplorerAreaReport } from '../types';

const LEGAL = ['/termos', '/privacidade', '/cookies', '/dmca', '/contato', '/ajuda'];

export async function exploreAreaShell(page: Page, baseUrl: string): Promise<ExplorerAreaReport> {
  const area = 'SHELL-HEADER-FOOTER-ESTATICAS';
  const startedAt = new Date().toISOString();
  const collector = new ExplorerCollector(area, '/');
  collector.attach(page);

  const routesVisited: string[] = [];
  const steps = [];

  for (const route of STATIC_ROUTES.filter((r) => LEGAL.includes(r.split('?')[0]!) || r === '/login' || r === '/register' || r === '/minha-lista')) {
    const step = await timedStep(`goto ${route}`, async () => {
      await gotoRoute(page, collector, route);
      routesVisited.push(route);
    });
    steps.push(step);
    if (step.notes) collector.noteInteraction('navigation', `${route}: ${step.notes}`);
    collector.noteSlow(`load ${route}`, step.durationMs, 12_000);
  }

  const headerStep = await timedStep('header busca + notificações', async () => {
    await gotoRoute(page, collector, '/');
    await openSearch(page);
    await fillSearchQuery(page, 'batman');
    await page
      .waitForResponse((r) => r.url().includes('/api/pesquisa') && r.status() === 200, { timeout: 45_000 })
      .catch(() => {});
    await closeSearch(page);

    const bell = page.getByRole('button', { name: /notificações/i }).first();
    if (await bell.isVisible().catch(() => false)) {
      await bell.click();
      await page.waitForTimeout(800);
      await page.keyboard.press('Escape');
    }

    const theme = page.getByRole('button', { name: /tema|theme|sol|lua/i }).first();
    if (await theme.isVisible().catch(() => false)) await theme.click().catch(() => {});

    const more = page.getByRole('button', { name: /mais/i }).first();
    if (await more.isVisible().catch(() => false)) {
      await more.click();
      await page.waitForTimeout(400);
      await more.click().catch(() => {});
    }
  });
  steps.push(headerStep);

  const finishedAt = new Date().toISOString();
  return {
    area,
    baseUrl,
    startedAt,
    finishedAt,
    routesVisited,
    steps,
    issues: collector.issues,
    discoveredLinks: [...collector.discoveredLinks],
  };
}
