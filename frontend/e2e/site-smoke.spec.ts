import { test, expect } from '@playwright/test';

const PAGES = [
  '/',
  '/promocoes?tab=promocoes',
  '/promocoes?tab=gratis',
  '/promocoes?tab=em-alta',
  '/jogos',
  '/animes',
  '/filmes',
  '/series',
  '/hoje',
];

test.describe('Smoke — páginas principais', () => {
  for (const path of PAGES) {
    test(`carrega ${path} sem erro fatal`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => consoleErrors.push(err.message));

      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(response?.ok()).toBeTruthy();

      await expect(page.locator('body')).toBeVisible();

      const critical = consoleErrors.filter(
        (line) =>
          !line.includes('favicon') &&
          !line.includes('404') &&
          !line.includes('Failed to load resource') &&
          !line.includes('Content Security Policy'),
      );
      expect(critical, critical.join('\n')).toEqual([]);
    });
  }
});

test.describe('Promoções — UI pedida', () => {
  test('aba promoções mostra blocos Steam / outras lojas / até R$ 30', async ({ page }) => {
    test.skip(
      process.env.ORBE_E2E_NEW_PROMOS !== '1',
      'Ative ORBE_E2E_NEW_PROMOS=1 após deploy (Vercel + Render).',
    );

    await page.goto('/promocoes?tab=promocoes', { waitUntil: 'networkidle' });

    await expect(page.getByRole('tab', { name: /Promoções/i })).toBeVisible();
    await page.getByRole('tab', { name: /Promoções/i }).click();

    await expect(page.getByText(/Até R\$ 30/i).first()).toBeVisible({ timeout: 60_000 });
    await expect(page.getByText(/Ofertas ao vivo — Steam/i)).toBeVisible();
    await expect(page.getByText(/Ofertas ao vivo — outras lojas/i)).toBeVisible();

    const sort = page.locator('select').filter({ has: page.locator('option') }).last();
    await expect(sort).toHaveValue('price_asc');
  });
});
