const DEFAULT_API = 'http://localhost:3001/api';

async function getSettings() {
  const data = await chrome.storage.sync.get(['apiBase', 'token', 'trackPtBrDub']);
  return {
    apiBase: data.apiBase || DEFAULT_API,
    token: data.token || '',
    trackPtBrDub: Boolean(data.trackPtBrDub),
  };
}

async function syncCrunchyrollItems(items) {
  const { apiBase, token, trackPtBrDub } = await getSettings();
  if (!token) {
    throw new Error('Cole o token JWT do Orbe no popup da extensão.');
  }
  const response = await fetch(`${apiBase.replace(/\/$/, '')}/watchlist/crunchyroll/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items, trackPtBrDub }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || `HTTP ${response.status}`);
  }
  return body;
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'ORBE_CRUNCHYROLL_SCRAPE') {
    syncCrunchyrollItems(message.items || [])
      .then((result) => sendResponse({ ok: true, result }))
      .catch((err) => sendResponse({ ok: false, error: String(err.message || err) }));
    return true;
  }
  if (message?.type === 'ORBE_CRUNCHYROLL_SYNC_TAB') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) {
        sendResponse({ ok: false, error: 'Nenhuma aba ativa.' });
        return;
      }
      chrome.tabs.sendMessage(tab.id, { type: 'ORBE_CRUNCHYROLL_GET_ITEMS' }, async (resp) => {
        if (chrome.runtime.lastError) {
          sendResponse({ ok: false, error: 'Abra a fila da Crunchyroll (watchlist) nesta aba.' });
          return;
        }
        try {
          const result = await syncCrunchyrollItems(resp?.items || []);
          sendResponse({ ok: true, result });
        } catch (err) {
          sendResponse({ ok: false, error: String(err.message || err) });
        }
      });
    });
    return true;
  }
});
