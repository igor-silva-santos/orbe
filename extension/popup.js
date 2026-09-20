const statusEl = document.getElementById('status');
const apiBaseEl = document.getElementById('apiBase');
const tokenEl = document.getElementById('token');
const trackPtBrDubEl = document.getElementById('trackPtBrDub');
const saveBtn = document.getElementById('save');
const syncBtn = document.getElementById('sync');

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.style.color = isError ? '#b91c1c' : '#444';
}

chrome.storage.sync.get(['apiBase', 'token', 'trackPtBrDub'], (data) => {
  apiBaseEl.value = data.apiBase || 'http://localhost:3001/api';
  tokenEl.value = data.token || '';
  trackPtBrDubEl.checked = Boolean(data.trackPtBrDub);
});

saveBtn.addEventListener('click', () => {
  chrome.storage.sync.set(
    {
      apiBase: apiBaseEl.value.trim(),
      token: tokenEl.value.trim(),
      trackPtBrDub: trackPtBrDubEl.checked,
    },
    () => setStatus('Configurações salvas.'),
  );
});

syncBtn.addEventListener('click', () => {
  setStatus('Sincronizando...');
  chrome.runtime.sendMessage({ type: 'ORBE_CRUNCHYROLL_SYNC_TAB' }, (resp) => {
    if (!resp?.ok) {
      setStatus(resp?.error || 'Falha ao sincronizar.', true);
      return;
    }
    const { count, skipped } = resp.result || {};
    setStatus(`OK — ${count ?? 0} itens (${skipped ?? 0} ignorados).`);
  });
});
