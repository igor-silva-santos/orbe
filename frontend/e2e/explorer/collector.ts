import type { Page, Request, Response } from '@playwright/test';
import type { ExplorerIssue, IssueSeverity } from './types';

let issueCounter = 0;

function nextId(): string {
  issueCounter += 1;
  return `ISS-${issueCounter.toString().padStart(4, '0')}`;
}

const IGNORE_CONSOLE = [
  'favicon',
  'Failed to load resource',
  'Content Security Policy',
  'ResizeObserver loop',
  'Download the React DevTools',
  'Unrecognized feature',
  'No available adapters',
];

const IGNORE_URL_FRAGMENTS = ['/_next/', 'google-analytics', 'vercel-insights', 'hotjar'];

function shouldIgnoreUrl(url: string): boolean {
  return IGNORE_URL_FRAGMENTS.some((frag) => url.includes(frag));
}

function severityForHttp(status: number): IssueSeverity {
  if (status >= 500) return 'critical';
  if (status === 404) return 'medium';
  if (status >= 400) return 'high';
  return 'low';
}

export class ExplorerCollector {
  readonly issues: ExplorerIssue[] = [];
  readonly discoveredLinks = new Set<string>();

  constructor(
    private readonly area: string,
    private readonly routeLabel: string,
  ) {}

  attach(page: Page): void {
    page.on('console', (msg) => {
      if (msg.type() !== 'error' && msg.type() !== 'warning') return;
      const text = msg.text();
      if (IGNORE_CONSOLE.some((part) => text.includes(part))) return;
      this.push({
        kind: msg.type() === 'error' ? 'console.error' : 'observation',
        severity: msg.type() === 'error' ? 'high' : 'low',
        step: 'runtime',
        message: text,
      });
    });

    page.on('pageerror', (err) => {
      this.push({
        kind: 'pageerror',
        severity: 'critical',
        step: 'runtime',
        message: err.message,
      });
    });

    page.on('requestfailed', (request: Request) => {
      const url = request.url();
      if (shouldIgnoreUrl(url)) return;
      const failure = request.failure()?.errorText ?? '';
      if (failure.includes('ERR_ABORTED')) return;
      if (url.includes('_rsc=')) return;
      if (!url.includes('/api/') && !url.includes('orbe')) return;
      this.push({
        kind: 'request.failed',
        severity: 'high',
        step: 'network',
        message: `${request.failure()?.errorText ?? 'failed'} — ${url}`,
        url,
      });
    });

    page.on('response', (response: Response) => {
      const url = response.url();
      if (shouldIgnoreUrl(url)) return;
      if (!url.includes('/api/')) return;
      const status = response.status();
      if (status < 400) return;
      this.push({
        kind: 'request.http_error',
        severity: severityForHttp(status),
        step: 'network',
        message: `HTTP ${status} — ${url}`,
        url,
      });
    });
  }

  noteInteraction(step: string, message: string, severity: IssueSeverity = 'medium'): void {
    this.push({ kind: 'interaction', severity, step, message });
  }

  noteMissing(step: string, message: string): void {
    this.push({ kind: 'missing_ui', severity: 'high', step, message });
  }

  noteSlow(step: string, durationMs: number, thresholdMs: number): void {
    if (durationMs < thresholdMs) return;
    this.push({
      kind: 'slow',
      severity: durationMs > thresholdMs * 2 ? 'high' : 'medium',
      step,
      message: `Ação levou ${Math.round(durationMs)}ms (limite ${thresholdMs}ms)`,
      durationMs,
    });
  }

  collectInternalLinks(page: Page): void {
    void this.collectInternalLinksAsync(page);
  }

  private async collectInternalLinksAsync(page: Page): Promise<void> {
    try {
      if (page.isClosed()) return;
      const list = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
        anchors.map((a) => (a as HTMLAnchorElement).getAttribute('href')).filter(Boolean),
      );
      for (const href of list) {
        if (href && !href.startsWith('//')) this.discoveredLinks.add(href.split('?')[0] ?? href);
      }
    } catch {
      // navegação em andamento — ignorar
    }
  }

  private push(partial: Omit<ExplorerIssue, 'id' | 'area' | 'route' | 'timestamp'>): void {
    this.issues.push({
      id: nextId(),
      area: this.area,
      route: this.routeLabel,
      timestamp: new Date().toISOString(),
      ...partial,
    });
  }
}
