/** @typedef {'comecar'|'continuar'|'a_seguir'|'assistir_de_novo'} CrunchyrollLineKind */

const LINE_PATTERNS = [
  { kind: 'comecar', re: /^começar a assistir:\s*(?:t(\d+)\s*)?e(\d+)/i },
  { kind: 'continuar', re: /^continuar:\s*(?:t(\d+)\s*)?e(\d+)/i },
  { kind: 'a_seguir', re: /^a seguir:\s*(?:t(\d+)\s*)?e(\d+)/i },
  { kind: 'assistir_de_novo', re: /^assistir de novo:\s*(?:t(\d+)\s*)?e(\d+)/i },
];

export function normalizeStatusLine(raw) {
  return String(raw || '').replace(/\s+/g, ' ').trim();
}

export function parseStatusLine(raw) {
  const label = normalizeStatusLine(raw);
  if (!label) return null;
  for (const { kind, re } of LINE_PATTERNS) {
    const match = label.match(re);
    if (!match) continue;
    const season = match[1] ? parseInt(match[1], 10) : 1;
    const episode = parseInt(match[2], 10);
    if (!Number.isFinite(episode) || episode < 1) return null;
    return {
      kind,
      season: Number.isFinite(season) && season > 0 ? season : 1,
      episode,
      label,
    };
  }
  return null;
}

export function extractSeriesIdFromHref(href) {
  if (!href) return null;
  try {
    const url = new URL(href, 'https://www.crunchyroll.com');
    const parts = url.pathname.split('/').filter(Boolean);
    const idx = parts.findIndex((p) => p === 'series' || p === 'watch');
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  } catch {
    return null;
  }
  return null;
}

/** Só PT-BR — não basta o badge genérico “Dublado”. */
export function cardIndicatesPtBrDub(root) {
  const text = (root?.innerText || '').toLowerCase();
  if (text.includes('português (brasil)')) return true;
  if (text.includes('portugues (brasil)')) return true;
  if (text.includes('português do brasil')) return true;
  return false;
}

export function looksLikeProgressLine(line) {
  return Boolean(parseStatusLine(line));
}
