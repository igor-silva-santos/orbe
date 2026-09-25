# Soluções — console, sync e rede

Produção: https://orbe-seven.vercel.app

## 1. `no-response` no `sw.js` (posters TMDB)

**Causa:** Service Worker interceptava CDN e rejeitava a promise quando a rede falhava.

**Correção (código):** `frontend/src/app/sw.ts`

- `GracefulNetwork` para `image.tmdb.org`, Anilist e IGDB CDN.
- `NetworkOnly` para **todo** `GET /api/*` na mesma origem (o default do Serwist cacheava catálogo 24h).

**Depois do deploy na Vercel:**

1. Abra o site em aba anônima **ou**
2. DevTools → Application → Service Workers → **Unregister** → hard refresh (Ctrl+Shift+R).

Sem isso o visitante pode ficar com o `sw.js` antigo.

## 2. CORS / `login.microsoftonline.com` no fetch

**Causa:** Rede corporativa (VPN Movida/JSL) redireciona tráfego para SAML.

**Solução (operacional):** usar Orbe **fora** da VPN/rede corporativa (4G, Wi‑Fi pessoal). Não há patch no app — é interceptação de rede.

## 3. `/api/sync/status` e `/api/auth/me`

**Correção (código):**

- `src/app/api/sync/status/route.ts` — proxy na Vercel (já existia).
- `src/app/api/auth/me/route.ts` — proxy com `Authorization` (novo).
- Poll de sync pausa com aba em background (`SyncRefreshListener`).

## 4. Console vermelho com usuário logado (401)

**Correção:** `AppProvider` não loga `console.error` para 401/403 esperados (`isExpectedAuthError`).

**Se a sessão expirou:** faça login de novo.

## 5. Lentidão / cold start Render

**Causa:** API free no Render dorme após ~15 min sem tráfego.

**Solução (já na infra):** workflows **keep-alive** e sync no GitHub Actions (ver `docs/INFRA-SYNC-QA.md`).

**No uso:** primeira requisição após idle pode levar até ~60s; clique em tentar novamente ou aguarde.

## 6. Validar após deploy

```bash
cd frontend
npm run test:e2e:install
node scripts/smoke-prod-browser.mjs
```

Ou manual: DevTools → Console em `/`, `/filmes`, `/jogos`, `/promocoes` (ver `docs/regras-negocio/cenarios-camadas/execucao/QA-CONSOLE-TRIAGEM.md`).
