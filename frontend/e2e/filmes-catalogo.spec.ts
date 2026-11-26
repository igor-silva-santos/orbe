import { test, expect } from '@playwright/test';

test.describe('Filmes — listagem e carrossel home', () => {
  test('página /filmes carrega título e grade', async ({ page }) => {
    await page.goto('/filmes');
    await expect(page.getByRole('heading', { name: 'Filmes', exact: true })).toBeVisible();
    const posters = page.locator('[class*="aspect-"] img, img[alt*="Filme"], img[alt*="filme"]');
    await expect(posters.first()).toBeVisible({ timeout: 45_000 });
    expect(await posters.count()).toBeGreaterThan(3);
  });

  test('clique em poster em /filmes abre SuperModal', async ({ page }) => {
    await page.goto('/filmes');
    const card = page.locator('div.cursor-pointer').filter({ has: page.locator('img') }).first();
    await expect(card).toBeVisible({ timeout: 45_000 });
    await card.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('.super-modal-content')).toBeVisible();
  });

  test('carrossel #filmes na home tem cards clicáveis', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#filmes');
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    const cards = section.locator('img[alt]');
    await expect(cards.first()).toBeVisible({ timeout: 45_000 });
    expect(await cards.count()).toBeGreaterThan(2);
  });
});
