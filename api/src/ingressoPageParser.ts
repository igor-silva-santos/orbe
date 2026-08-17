export type IngressoPageContent = {
  pageExists: boolean;
  hasCinemaSessions: boolean;
  isPreSale: boolean;
};

type IngressoPageSignals = {
  inPreSale?: boolean;
  isPlaying?: boolean;
  countIsPlaying?: number;
};

export function isIngressoNotFound(html: string): boolean {
  return html.includes('NEXT_HTTP_ERROR_FALLBACK') || /Ocorreu um erro/i.test(html);
}

function signalScore(signals: IngressoPageSignals): number {
  let score = 0;
  if (signals.inPreSale !== undefined) score++;
  if (signals.isPlaying !== undefined) score++;
  if (signals.countIsPlaying !== undefined) score++;
  return score;
}

function extractSignalsFromJson(root: unknown): IngressoPageSignals | null {
  let best: IngressoPageSignals | null = null;
  let bestScore = 0;

  function walk(node: unknown): void {
    if (!node || typeof node !== 'object') return;

    if (Array.isArray(node)) {
      for (const item of node) walk(item);
      return;
    }

    const obj = node as Record<string, unknown>;
    const signals: IngressoPageSignals = {};

    if (typeof obj.inPreSale === 'boolean') signals.inPreSale = obj.inPreSale;
    if (typeof obj.isPlaying === 'boolean') signals.isPlaying = obj.isPlaying;
    if (typeof obj.countIsPlaying === 'number') signals.countIsPlaying = obj.countIsPlaying;

    const score = signalScore(signals);
    if (score > bestScore) {
      best = signals;
      bestScore = score;
    }

    for (const value of Object.values(obj)) walk(value);
  }

  walk(root);
  return best;
}

function extractNextDataJson(html: string): unknown | null {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) return null;

  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function extractSignalsFromHtmlRegex(html: string): IngressoPageSignals | null {
  const signals: IngressoPageSignals = {};

  const inPreSaleMatch = html.match(/"inPreSale"\s*:\s*(true|false)/i);
  if (inPreSaleMatch) signals.inPreSale = inPreSaleMatch[1].toLowerCase() === 'true';

  const isPlayingMatch = html.match(/"isPlaying"\s*:\s*(true|false)/i);
  if (isPlayingMatch) signals.isPlaying = isPlayingMatch[1].toLowerCase() === 'true';

  const countMatch = html.match(/"countIsPlaying"\s*:\s*(\d+)/);
  if (countMatch) signals.countIsPlaying = Number.parseInt(countMatch[1], 10);

  return signalScore(signals) > 0 ? signals : null;
}

export function extractIngressoSignalsFromHtml(html: string): IngressoPageSignals | null {
  const nextData = extractNextDataJson(html);
  if (nextData) {
    const fromNextData = extractSignalsFromJson(nextData);
    if (fromNextData) return fromNextData;
  }

  return extractSignalsFromHtmlRegex(html);
}

function deriveHasCinemaSessions(signals: IngressoPageSignals | null, html: string): boolean {
  if (signals) {
    if (signals.isPlaying !== undefined && signals.countIsPlaying !== undefined) {
      return Boolean(signals.isPlaying && signals.countIsPlaying > 0);
    }
    if (signals.isPlaying !== undefined) return signals.isPlaying;
    if (signals.countIsPlaying !== undefined) return signals.countIsPlaying > 0;
  }

  return !html.includes('Não há sessões disponíveis no momento.');
}

function deriveIsPreSale(signals: IngressoPageSignals | null, html: string): boolean {
  if (signals?.inPreSale !== undefined) return signals.inPreSale;

  return /pré-?venda/i.test(html) || /pre-?sale/i.test(html);
}

export function parseIngressoPageContent(html: string): IngressoPageContent {
  if (isIngressoNotFound(html)) {
    return { pageExists: false, hasCinemaSessions: false, isPreSale: false };
  }

  const signals = extractIngressoSignalsFromHtml(html);

  return {
    pageExists: true,
    hasCinemaSessions: deriveHasCinemaSessions(signals, html),
    isPreSale: deriveIsPreSale(signals, html),
  };
}
