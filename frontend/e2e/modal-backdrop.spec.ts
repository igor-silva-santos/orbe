import { test, expect } from '@playwright/test';

test.describe('SuperModal — clique fora', () => {
  test('clique no backdrop fecha o modal', async ({ page }) => {
    await page.goto('/filmes');

    await expect(page.getByRole('heading', { name: /filmes/i })).toBeVisible({ timeout: 60_000 });

    const firstPoster = page.locator('main img').first();
    await expect(firstPoster).toBeVisible({ timeout: 60_000 });
    await firstPoster.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 30_000 });

    const backdrop = dialog.locator('button[aria-label="Fechar modal"]');
    if ((await backdrop.count()) === 0) {
      test.skip(true, 'Backdrop dedicado ainda não está em produção.');
    }

    await backdrop.click({ position: { x: 12, y: 12 } });
    await expect(dialog).toBeHidden({ timeout: 10_000 });
  });
});
