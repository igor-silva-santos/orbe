/* Parser (espelha api/src/crunchyrollStatus.ts) */
const LINE_PATTERNS = [
  { kind: 'comecar', re: /^começar a assistir:\s*(?:t(\d+)\s*)?e(\d+)/i },
  { kind: 'continuar', re: /^continuar:\s*(?:t(\d+)\s*)?e(\d+)/i },
  { kind: 'a_seguir', re: /^a seguir:\s*(?:t(\d+)\s*)?e(\d+)/i },
  { kind: 'assistir_de_novo', re: /^assistir de novo:\s*(?:t(\d+)\s*)?e(\d+)/i },
];

function normalizeStatusLine(raw) {
  return String(raw || '').replace(/\s+/g, ' ').trim();
}

function parseStatusLine(raw) {
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

function extractSeriesIdFromHref(href) {
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

function cardIndicatesPtBrDub(root) {
  const text = (root?.innerText || '').toLowerCase();
  if (text.includes('português (brasil)')) return true;
  if (text.includes('portugues (brasil)')) return true;
  if (text.includes('português do brasil')) return true;
  return false;
}

function looksLikeProgressLine(line) {
  return Boolean(parseStatusLine(line));
}

const WATCHLIST_PATH = '/watchlist';

function isWatchlistPage() {
  return location.pathname.includes(WATCHLIST_PATH);
}

function scrapeWatchlistItems() {
  const byId = new Map();
  const anchors = document.querySelectorAll('a[href*="/series/"], a[href*="/watch/"]');

  anchors.forEach((anchor) => {
    const href = anchor.getAttribute('href') || '';
    const seriesId = extractSeriesIdFromHref(href);
    if (!seriesId) return;

    const card =
      anchor.closest('[class*="card"]') ||
      anchor.closest('li') ||
      anchor.closest('article') ||
      anchor.parentElement?.parentElement;

    const title =
      anchor.getAttribute('title') ||
      anchor.textContent?.trim() ||
      card?.querySelector('h3, h4, [class*="title"]')?.textContent?.trim();

    if (!title || title.length < 2) return;

    let statusLine = '';
    const lines = (card?.innerText || '').split('\n').map((l) => normalizeStatusLine(l));
    for (const line of lines) {
      if (looksLikeProgressLine(line)) {
        statusLine = line;
        break;
      }
    }
    if (!statusLine || !parseStatusLine(statusLine)) return;

    byId.set(seriesId, {
      crunchyrollId: seriesId,
      title: title.replace(/\s+/g, ' ').trim(),
      statusLine,
      href: href.startsWith('http') ? href : `https://www.crunchyroll.com${href}`,
      isPtBrDub: card ? cardIndicatesPtBrDub(card) : false,
    });
  });

  return Array.from(byId.values());
}

function injectSyncButton() {
  if (document.getElementById('orbe-cr-sync-btn')) return;
  const btn = document.createElement('button');
  btn.id = 'orbe-cr-sync-btn';
  btn.type = 'button';
  btn.textContent = 'Sync Orbe';
  btn.style.cssText =
    'position:fixed;bottom:20px;right:20px;z-index:99999;padding:10px 14px;border-radius:8px;background:#f47521;color:#fff;font-weight:700;border:none;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.35)';
  btn.addEventListener('click', () => {
    const items = scrapeWatchlistItems();
    chrome.runtime.sendMessage({ type: 'ORBE_CRUNCHYROLL_SCRAPE', items }, (resp) => {
      if (resp?.ok) {
        btn.textContent = `Sync OK (${resp.result?.count ?? 0})`;
        setTimeout(() => {
          btn.textContent = 'Sync Orbe';
        }, 2500);
      } else {
        alert(resp?.error || 'Falha ao sincronizar com o Orbe.');
      }
    });
  });
  document.body.appendChild(btn);
}

function boot() {
  if (!isWatchlistPage()) return;
  injectSyncButton();
}

boot();

const observer = new MutationObserver(() => {
  if (isWatchlistPage()) injectSyncButton();
});
observer.observe(document.documentElement, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === 'ORBE_CRUNCHYROLL_GET_ITEMS') {
    sendResponse({ items: scrapeWatchlistItems() });
  }
});
