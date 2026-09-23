import { defineConfig, devices } from '@playwright/test';

/** E2E contra produção (sem dev server). */
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'https://orbe-seven.vercel.app';

const artifactRoot = process.env.PLAYWRIGHT_OUTPUT_DIR ?? '.';

export default defineConfig({
  testDir: './e2e',
  outputDir: `${artifactRoot}/test-results`,
  fullyParallel: false,
  retries: 1,
  workers: 1,
  reporter: [['json', { outputFile: process.env.PLAYWRIGHT_JSON_REPORT ?? 'playwright-report.json' }], ['list']],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
