const apiUrlEl = document.getElementById('apiUrl');
const tokenEl = document.getElementById('token');
const msgEl = document.getElementById('msg');

chrome.storage.sync.get(['apiUrl', 'token'], (data) => {
  apiUrlEl.value = data.apiUrl || 'http://localhost:5000/api';
  tokenEl.value = data.token || '';
});

document.getElementById('save').addEventListener('click', () => {
  chrome.storage.sync.set(
    { apiUrl: apiUrlEl.value.trim(), token: tokenEl.value.trim() },
    () => {
      msgEl.textContent = 'Salvo com sucesso.';
    }
  );
});
