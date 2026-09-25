#!/usr/bin/env node
/**
 * Smoke de produção: console + rede nas rotas principais.
 * Uso: node scripts/smoke-prod-browser.mjs
 * Requer: npm install (playwright no package.json do frontend).
 */
import { chromium } from '@playwright/test';

const BASE = process.env.ORBE_BASE_URL || 'https://orbe-seven.vercel.app';
const ROUTES = ['/', '/filmes', '/jogos', '/promocoes'];

const IGNORE_PATTERNS = [
  /WebSocket connection to/i,
  /login\.microsoftonline\.com/i,
  /Content Security Policy/i,
  /favicon/i,
];

function shouldIgnore(text) {
  return IGNORE_PATTERNS.some((re) => re.test(text));
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const failures = [];

  for (const route of ROUTES) {
    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      if (shouldIgnore(text)) return;
      consoleErrors.push(text);
    });

    page.on('requestfailed', (req) => {
      const url = req.url();
      if (url.includes('microsoftonline')) return;
      failedRequests.push({ url, failure: req.failure()?.errorText });
    });

    const response = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 60_000 });
    const status = response?.status() ?? 0;

    if (status >= 400) {
      failures.push({ route, kind: 'http', detail: `HTTP ${status}` });
    }
    if (consoleErrors.length) {
      failures.push({ route, kind: 'console', detail: consoleErrors.slice(0, 5) });
    }
    if (failedRequests.length) {
      failures.push({ route, kind: 'network', detail: failedRequests.slice(0, 5) });
    }

    page.removeAllListeners();
  }

  await browser.close();

  if (failures.length === 0) {
    console.log('OK — smoke passou em', BASE, 'rotas:', ROUTES.join(', '));
    process.exit(0);
  }

  console.error('FAIL — problemas encontrados:');
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
