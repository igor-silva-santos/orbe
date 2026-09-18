const statusEl = document.getElementById('status');

const apiUrlEl = document.getElementById('apiUrl');

const tokenEl = document.getElementById('token');

const syncBtn = document.getElementById('syncBtn');

const saveBtn = document.getElementById('saveBtn');

const progressWrap = document.getElementById('progressWrap');

const progressLabel = document.getElementById('progressLabel');

const progressFill = document.getElementById('progressFill');

const failedWrap = document.getElementById('failedWrap');

const failedList = document.getElementById('failedList');

const authStatus = document.getElementById('authStatus');
const confirmReplaceEl = document.getElementById('confirmReplace');



let syncing = false;



function setStatus(text) {

  statusEl.textContent = text;

}



function setSyncing(active) {

  syncing = active;

  syncBtn.disabled = active;

  saveBtn.disabled = active;

}



function resetProgress() {

  progressWrap.classList.remove('active');

  progressFill.style.width = '0%';

  progressLabel.textContent = 'Sincronizando...';

  failedWrap.classList.remove('active');

  failedList.innerHTML = '';

}



function updateProgress({ phase, current, total, title }) {

  progressWrap.classList.add('active');



  if (phase === 'parsing') {

    progressLabel.textContent = 'Analisando fila da Crunchyroll...';

    progressFill.style.width = '10%';

    return;

  }



  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  progressFill.style.width = `${pct}%`;

  progressLabel.textContent = `Sincronizando ${current}/${total}${title ? `: ${title}` : ''}`;

}



function showFailedItems(items) {

  if (!items?.length) return;

  failedWrap.classList.add('active');

  failedList.innerHTML = '';

  for (const item of items) {

    const li = document.createElement('li');

    li.textContent = `${item.title} ÔÇö ${item.error || 'Erro desconhecido'}`;

    failedList.appendChild(li);

  }

}



async function loadSettings() {

  const data = await chrome.storage.sync.get(['apiUrl', 'token']);

  if (data.apiUrl) apiUrlEl.value = data.apiUrl;

  if (data.token) {

    tokenEl.value = data.token;

    authStatus.hidden = false;

  }

}



saveBtn.addEventListener('click', async () => {

  await chrome.storage.sync.set({

    apiUrl: apiUrlEl.value.trim(),

    token: tokenEl.value.trim(),

  });

  authStatus.hidden = !tokenEl.value.trim();

  setStatus('Configura├º├Áes salvas.');

});



syncBtn.addEventListener('click', async () => {
  const apiUrl = apiUrlEl.value.trim();
  const token = tokenEl.value.trim();

  if (!apiUrl || !token) {
    setStatus('Conecte pelo Orbe (/extensao) ou informe API URL e token JWT.');
    return;
  }

  if (confirmReplaceEl && !confirmReplaceEl.checked) {
    setStatus('Marque a confirma├º├úo sobre espelhamento da fila antes de sincronizar.');
    return;
  }



  await chrome.storage.sync.set({ apiUrl, token });

  resetProgress();

  setSyncing(true);

  setStatus('');



  chrome.runtime.sendMessage({ type: 'SYNC_QUEUE' }, (response) => {

    setSyncing(false);



    if (chrome.runtime.lastError) {

      setStatus(`Erro: ${chrome.runtime.lastError.message}`);

      return;

    }

    if (!response?.ok) {

      setStatus(`Erro: ${response?.error || 'Falha desconhecida'}`);

      return;

    }



    progressFill.style.width = '100%';

    progressLabel.textContent = `Conclu├¡do: ${response.total} animes`;

    showFailedItems(response.failedItems);



    setStatus(
      `Importados: ${response.imported}\nAtualizados: ${response.updated}\nErros: ${response.errors}${
        response.replaced === false ? '\nModo seguro: lista n├úo espelhada (houve falhas).' : ''
      }`
    );

  });

});



chrome.runtime.onMessage.addListener((message) => {

  if (message?.type === 'SYNC_PROGRESS' && syncing) {

    updateProgress(message);

  }



  if (message?.type === 'ORBE_TOKEN_RECEIVED') {

    if (message.apiUrl) apiUrlEl.value = message.apiUrl;

    if (message.token) {

      tokenEl.value = message.token;

      authStatus.hidden = false;

      setStatus('Conectado ao Orbe.');

    }

  }

});



loadSettings();


