/**
 * Validação exaustiva de rotas UI + API pública (produção).
 * npm run test:e2e:routes
 */
import { test } from '@playwright/test';
import { exploreAllUiRoutes, explorePublicApiRoutes, writeRouteValidationArtifact } from './areas/all-routes';

test.describe.configure({ mode: 'serial', timeout: 900_000 });

test('mapa completo — validar UI + API e gravar docs/qa/validacao-rotas-latest', async ({ page, request }) => {
  test.setTimeout(900_000);
  const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'https://orbe-seven.vercel.app';

  const { routes: uiRows, samples } = await exploreAllUiRoutes(page, request, baseURL);
  const { routes: apiRows } = await explorePublicApiRoutes(request, baseURL, samples);

  writeRouteValidationArtifact(uiRows, apiRows, samples);

  const uiFail = uiRows.filter((r) => !r.ok);
  const apiFail = apiRows.filter((r) => !r.ok);

  console.log(`[orbe-routes] UI: ${uiRows.length} tested, ${uiFail.length} failed`);
  console.log(`[orbe-routes] API: ${apiRows.length} tested, ${apiFail.length} failed`);

  if (uiFail.length + apiFail.length > 0) {
    console.log('[orbe-routes] Failures:', [...uiFail, ...apiFail].map((f) => `${f.path} (${f.httpStatus})`).join(', '));
  }

  test.expect(uiFail.length, `UI routes failed: ${uiFail.map((f) => f.path).join(', ')}`).toBe(0);
  test.expect(apiFail.length, `API routes failed: ${apiFail.map((f) => f.path).join(', ')}`).toBe(0);
});
