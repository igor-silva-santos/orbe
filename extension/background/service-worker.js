const DEFAULT_API_URL = 'https://orbe-7bu0.onrender.com/api';



async function getSettings() {

  const data = await chrome.storage.sync.get(['apiUrl', 'token']);

  return {

    apiUrl: data.apiUrl || DEFAULT_API_URL,

    token: data.token || '',

  };

}



async function saveAuthSettings({ token, apiUrl }) {

  const settings = {};

  if (token) settings.token = token;

  if (apiUrl) settings.apiUrl = apiUrl;

  if (Object.keys(settings).length > 0) {

    await chrome.storage.sync.set(settings);

  }

}



async function apiFetch(path, options = {}, attempt = 0) {
  const { apiUrl, token } = await getSettings();
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (response.status === 429 && attempt < 4) {
    const delayMs = Math.min(8000, 500 * 2 ** attempt);
    await new Promise((r) => setTimeout(r, delayMs));
    return apiFetch(path, options, attempt + 1);
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${response.status}`);
  }

  return response.json();
}



function broadcastProgress(payload) {

  chrome.runtime.sendMessage({ type: 'SYNC_PROGRESS', ...payload }).catch(() => {});

}



async function parseQueueFromTab(tabId) {

  return new Promise((resolve, reject) => {

    chrome.tabs.sendMessage(tabId, { action: 'parseQueue' }, (response) => {

      if (chrome.runtime.lastError) {

        reject(new Error(chrome.runtime.lastError.message));

        return;

      }

      if (!response?.ok) {

        reject(new Error(response?.error || 'Falha ao analisar fila.'));

        return;

      }

      resolve(response.items || []);

    });

  });

}



function handleExternalToken(message, sendResponse) {

  if (message?.type !== 'ORBE_EXTENSION_TOKEN') return false;



  (async () => {

    try {

      await saveAuthSettings({

        token: message.token,

        apiUrl: message.apiUrl,

      });

      sendResponse({ ok: true });

    } catch (error) {

      sendResponse({ ok: false, error: error.message });

    }

  })();



  return true;

}



chrome.runtime.onMessageExternal.addListener((message, _sender, sendResponse) => {

  return handleExternalToken(message, sendResponse);

});



chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {

  if (message.type === 'ORBE_TOKEN_RECEIVED') {

    saveAuthSettings({ token: message.token, apiUrl: message.apiUrl })

      .then(() => sendResponse({ ok: true }))

      .catch((error) => sendResponse({ ok: false, error: error.message }));

    return true;

  }



  if (message.type !== 'SYNC_QUEUE') return;



  (async () => {

    try {

      const { token } = await getSettings();

      if (!token) throw new Error('Conecte a extens├úo pelo Orbe (/extensao) ou cole o token JWT.');



      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab?.id) throw new Error('Nenhuma aba ativa.');

      if (!tab.url?.includes('crunchyroll.com')) {

        throw new Error('Abra a fila/watchlist da Crunchyroll antes de sincronizar.');

      }



      broadcastProgress({ phase: 'parsing', current: 0, total: 0 });



      const items = await parseQueueFromTab(tab.id);

      if (items.length === 0) {

        throw new Error('Nenhum anime encontrado na p├ígina.');

      }



      const session = await apiFetch('/minha-lista/animes/import/session', {

        method: 'POST',

        body: JSON.stringify({ totalExpected: items.length }),

      });



      let imported = 0;
      let updated = 0;
      const failedItems = [];
      const syncedCrunchyrollIds = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        broadcastProgress({
          phase: 'syncing',
          current: i + 1,
          total: items.length,
          title: item.title,
        });

        try {
          const response = await apiFetch('/minha-lista/animes/import', {
            method: 'POST',
            body: JSON.stringify({ ...item, sessionId: session.sessionId }),
          });
          syncedCrunchyrollIds.push(item.crunchyrollId);
          if (response.action === 'updated') updated += 1;
          else imported += 1;
          await new Promise((r) => setTimeout(r, 300));
        } catch (error) {
          failedItems.push({
            title: item.title,
            crunchyrollId: item.crunchyrollId,
            error: error.message,
          });
        }
      }

      const finishStatus =
        syncedCrunchyrollIds.length === 0 ? 'failed' : 'completed';

      const canReplace =
        failedItems.length === 0 && syncedCrunchyrollIds.length === items.length;

      await apiFetch(`/minha-lista/animes/import/session/${session.sessionId}/finish`, {
        method: 'POST',
        body: JSON.stringify({
          status: finishStatus,
          mode: canReplace ? 'replace' : 'merge',
          crunchyrollIds: canReplace ? syncedCrunchyrollIds : undefined,
          errorMessage:
            failedItems.length > 0
              ? `${failedItems.length} item(ns) falharam ÔÇö lista n├úo foi espelhada (modo seguro).`
              : undefined,
        }),
      });



      sendResponse({

        ok: true,

        imported,

        updated,

        errors: failedItems.length,

        total: items.length,

        failedItems,

        replaced: canReplace,

      });

    } catch (error) {

      sendResponse({ ok: false, error: error.message });

    }

  })();



  return true;

});


