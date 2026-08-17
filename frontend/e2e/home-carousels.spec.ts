import { test, expect } from '@playwright/test';

test.describe('Homepage carrosséis', () => {
  test('renderiza seções e controles principais', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Filmes', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Séries', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Animes', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jogos', exact: true })).toBeVisible();

    await expect(page.locator('#filmes')).toBeVisible();
    await expect(page.locator('#series')).toBeVisible();
    await expect(page.locator('#animes')).toBeVisible();
    await expect(page.locator('#jogos')).toBeVisible();

    const emAltaButtons = page.getByRole('button', { name: 'Ver o que está em alta agora' });
    await expect(emAltaButtons).toHaveCount(4);
  });

  test('links das seções levam às páginas dedicadas', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#filmes').getByRole('link', { name: 'Filmes', exact: true })).toHaveAttribute('href', '/filmes');
    await expect(page.locator('#animes').getByRole('link', { name: 'Animes', exact: true })).toHaveAttribute('href', '/animes');
  });
});
