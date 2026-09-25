/**
 * Orquestrador: roda todas as áreas em sequência e grava relatório consolidado.
 * Uso: PLAYWRIGHT_BASE_URL=https://orbe-seven.vercel.app npm run test:e2e:explore
 */
import { test } from '@playwright/test';
import { exploreAreaShell } from './areas/shell';
import { exploreAreaHome } from './areas/home';
import { exploreAreaCatalogs } from './areas/catalogs';
import { exploreAreaPromocoes } from './areas/promocoes';
import { exploreAreaHojeOutras } from './areas/hoje-outras';
import { exploreAreaModalsDeep } from './areas/modals-deep';
import { mergeReports, writeReport } from './report';
import type { ExplorerAreaReport } from './types';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'https://orbe-seven.vercel.app';

test.describe.configure({ mode: 'serial', timeout: 600_000 });

test('exploração completa Orbe → docs/qa/exploracao-orbe-latest', async ({ page }) => {
  test.setTimeout(600_000);
  const areas: ExplorerAreaReport[] = [];

  areas.push(await exploreAreaShell(page, baseURL));
  areas.push(await exploreAreaHome(page, baseURL));
  areas.push(await exploreAreaCatalogs(page, baseURL));
  areas.push(await exploreAreaPromocoes(page, baseURL));
  areas.push(await exploreAreaHojeOutras(page, baseURL));
  areas.push(await exploreAreaModalsDeep(page, baseURL));

  const report = mergeReports(areas, baseURL);
  const { jsonPath, mdPath } = writeReport(report);

  console.log(`\n[orbe-explorer] JSON: ${jsonPath}`);
  console.log(`[orbe-explorer] MD: ${mdPath}`);
  console.log(`[orbe-explorer] Total issues: ${report.summary.totalIssues}`);

  if (report.summary.bySeverity.critical > 0) {
    test.info().annotations.push({
      type: 'critical-issues',
      description: String(report.summary.bySeverity.critical),
    });
  }
});
