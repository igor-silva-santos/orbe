/**
 * Ponte de autentica├º├úo Orbe Ôåö extens├úo.
 * L├¬ token da p├ígina /extensao e salva no chrome.storage.
 */

(function () {
  const ORBE_TOKEN_EVENT = 'orbe-extension-token';
  const ORBE_ACK_EVENT = 'ORBE_EXTENSION_ACK';
  const ORBE_PONG_EVENT = 'ORBE_EXTENSION_PONG';

  function normalizeApiUrl(apiUrl) {
    if (!apiUrl || typeof apiUrl !== 'string') return null;
    const trimmed = apiUrl.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('/')) return null;
    return trimmed.endsWith('/api') ? trimmed : `${trimmed.replace(/\/$/, '')}/api`;
  }

  function saveToken(token, apiUrl, requestId) {
    if (!token || typeof token !== 'string') return false;

    const normalizedApiUrl = normalizeApiUrl(apiUrl);
    if (!normalizedApiUrl) return false;

    const payload = { token: token.trim(), apiUrl: normalizedApiUrl };
    chrome.storage.sync.set(payload, () => {
      chrome.runtime.sendMessage({
        type: 'ORBE_TOKEN_RECEIVED',
        token: payload.token,
        apiUrl: payload.apiUrl,
      });
    });

    window.postMessage(
      {
        type: ORBE_ACK_EVENT,
        ok: true,
        requestId: requestId || null,
      },
      window.location.origin
    );

    return true;
  }

  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    const type = event.data?.type;

    if (type === 'ORBE_EXTENSION_PING') {
      window.postMessage({ type: ORBE_PONG_EVENT, ok: true }, window.location.origin);
      return;
    }

    if (
      type !== ORBE_TOKEN_EVENT &&
      type !== 'ORBE_EXTENSION_TOKEN' &&
      type !== 'ORBE_EXTENSION_CONNECT'
    ) {
      return;
    }

    const ok = saveToken(event.data.token, event.data.apiUrl, event.data.requestId);
    if (!ok) {
      window.postMessage(
        {
          type: ORBE_ACK_EVENT,
          ok: false,
          requestId: event.data.requestId || null,
          error: 'URL da API inv├ílida. Use uma URL absoluta (ex: http://localhost:5000/api).',
        },
        window.location.origin
      );
    }
  });

  document.addEventListener('orbe-extension-connect', (event) => {
    const detail = event.detail || {};
    const ok = saveToken(detail.token, detail.apiUrl, detail.requestId);
    if (!ok) {
      window.postMessage(
        {
          type: ORBE_ACK_EVENT,
          ok: false,
          requestId: detail.requestId || null,
          error: 'URL da API inv├ílida.',
        },
        window.location.origin
      );
    }
  });

  window.postMessage({ type: ORBE_PONG_EVENT, ok: true }, window.location.origin);
})();
