import type { Page } from '@playwright/test';
import type { ExplorerCollector } from './collector';
import type { ExplorerStepResult } from './types';

export async function timedStep(
  name: string,
  fn: () => Promise<void>,
  slowThresholdMs = 8000,
): Promise<ExplorerStepResult> {
  const start = Date.now();
  try {
    await fn();
    const durationMs = Date.now() - start;
    return { step: name, ok: true, durationMs };
  } catch (err) {
    const durationMs = Date.now() - start;
    return {
      step: name,
      ok: false,
      durationMs,
      notes: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function gotoRoute(
  page: Page,
  collector: ExplorerCollector,
  path: string,
  waitUntil: 'domcontentloaded' | 'networkidle' = 'domcontentloaded',
): Promise<void> {
  await page.goto(path, { waitUntil, timeout: 90_000 });
  collector.collectInternalLinks(page);
}

export async function closeSuperModalIfOpen(page: Page): Promise<void> {
  const dialog = page.getByRole('dialog');
  if (!(await dialog.isVisible().catch(() => false))) return;
  const backdrop = dialog.locator('button[aria-label="Fechar modal"]');
  if (await backdrop.count()) {
    await backdrop.first().click({ timeout: 5000 }).catch(() => {});
  } else {
    await page.keyboard.press('Escape').catch(() => {});
  }
  await dialog.waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
}

export async function openSearch(page: Page): Promise<void> {
  const searchBtn = page.getByRole('button', { name: /abrir busca|busca|pesquisar|search/i }).first();
  if (await searchBtn.isVisible().catch(() => false)) {
    await searchBtn.click();
    return;
  }
  await page.locator('header button').filter({ has: page.locator('svg') }).first().click({ timeout: 5000 }).catch(() => {});
}

export async function closeSearch(page: Page): Promise<void> {
  await page.keyboard.press('Escape').catch(() => {});
  const close = page.getByRole('button', { name: /fechar busca|fechar|close/i });
  if (await close.isVisible().catch(() => false)) await close.first().click();
}

export async function fillSearchQuery(page: Page, query: string): Promise<void> {
  const input = page.getByPlaceholder(/filme, série|buscar/i);
  if (await input.isVisible().catch(() => false)) {
    await input.fill(query);
    return;
  }
  await page.locator('input[type="search"], input[type="text"]').first().fill(query).catch(() => {});
}

export async function enableAllHojeSections(page: Page): Promise<void> {
  await page
    .waitForResponse((r) => r.url().includes('/api/hoje') && r.status() === 200, { timeout: 90_000 })
    .catch(() => {});
  for (const option of [
    'Cinema',
    'Estreias',
    'Filmes no streaming',
    'Séries no streaming',
    'Animes em exibição',
    'Jogos em destaque',
  ]) {
    const btn = page.getByRole('button', { name: new RegExp(option, 'i') }).first();
    if (!(await btn.isVisible().catch(() => false))) continue;
    const pressed = await btn.getAttribute('aria-pressed');
    if (pressed === 'false') await btn.click().catch(() => {});
  }
  await page.locator('div.rounded-\\[20px\\].cursor-pointer').first().waitFor({ state: 'visible', timeout: 45_000 }).catch(() => {});
}

export async function openFirstSuperModal(page: Page, collector: ExplorerCollector, scope?: string): Promise<boolean> {
  await closeSuperModalIfOpen(page);
  const root = scope ? page.locator(scope) : page.locator('main');
  const card = root
    .locator('div.rounded-\\[20px\\].cursor-pointer')
    .filter({ has: page.locator('img') })
    .first();
  const fallback = root.locator('div.cursor-pointer').filter({ has: page.locator('img') }).first();

  const target = (await card.isVisible({ timeout: 8_000 }).catch(() => false)) ? card : fallback;

  if (!(await target.isVisible({ timeout: 45_000 }).catch(() => false))) {
    collector.noteMissing('supermodal', 'Nenhum card clicável com poster encontrado');
    return false;
  }

  const dialog = page.getByRole('dialog');

  for (let attempt = 0; attempt < 3; attempt++) {
    await target.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(250);
    const hit = target.locator('div[class*="aspect-"]').first();
    const clickTarget = (await hit.isVisible().catch(() => false)) ? hit : target;
    try {
      await clickTarget.click({ timeout: 15_000 });
    } catch {
      await target.click({ timeout: 10_000, force: true });
    }
    if (await dialog.isVisible({ timeout: 30_000 }).catch(() => false)) {
      return true;
    }
    await closeSuperModalIfOpen(page);
  }

  collector.noteInteraction('supermodal', 'Clique no card não abriu SuperModal');
  return false;
}

export async function exerciseCarouselSection(page: Page, sectionId: string): Promise<void> {
  const section = page.locator(`#${sectionId}`);
  if (!(await section.isVisible().catch(() => false))) return;
  await section.scrollIntoViewIfNeeded();
  const next = section.getByRole('button', { name: /próximo|next|avançar/i }).first();
  if (await next.isVisible().catch(() => false)) {
    await next.click({ timeout: 5000 }).catch(() => {});
  }
}

export const STATIC_ROUTES = [
  '/',
  '/filmes',
  '/series',
  '/animes',
  '/jogos',
  '/promocoes',
  '/promocoes?tab=gratis',
  '/promocoes?tab=promocoes',
  '/promocoes?tab=em-alta',
  '/hoje',
  '/continuacoes',
  '/premios',
  '/eventos',
  '/minha-lista',
  '/minha-lista/animes',
  '/minha-lista/fila',
  '/login',
  '/register',
  '/ajuda',
  '/apoie',
  '/sugestoes',
  '/bug-report',
  '/contato',
  '/termos',
  '/privacidade',
  '/cookies',
  '/dmca',
  '/extensao',
  '/extensao/crunchyroll',
] as const;
