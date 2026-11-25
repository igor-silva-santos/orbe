# QA — Console do navegador (triagem)

**Produção:** https://orbe-seven.vercel.app  
**Obrigatório:** supervisor IA / QA sênior **abre DevTools → Console** em todo teste de carrossel, `/filmes` e modais.

---

## 1. O que **não** é bug de carrossel

| Sintoma no console | Causa | Ação QA |
| --- | --- | --- |
| `WebSocket connection to 'wss://orbe-7bu0.onrender.com/api/ws' failed` | WS opcional; API no Render dorme; front usa **poll** `/api/sync/status` | **Ignorar** se UI ok; não confundir com filme faltando |
| `login.microsoftonline.com` bloqueado por **CSP** `img-src` | Extensão corporativa / SSO tentando carregar pixel SAML | **Ignorar** no Orbe; não é regressão do produto |
| `FetchEvent ... network error` genérico offline | Rede do tester | Repetir em 4G/sem extensão adblock |

---

## 2. O que **é** bug ou dívida técnica (registrar FAIL)

| Sintoma | Impacto | Evidência |
| --- | --- | --- |
| `sw.js` → `no-response` + `image.tmdb.org` **ERR_FAILED** | Posters quebrados em `/filmes` e carrossel; título “some” visualmente | Corrigido: SW **GracefulNetwork** em CDN + **NetworkOnly** em todo `GET /api/*` (sem cache 24h). Após deploy: hard refresh ou limpar SW. |
| `Application error` / `Erro 500` no body | Página inutilizável | FAIL + rede (status HTTP) |
| `/api/filmes/...` 4xx/5xx na aba Network | Dado não carrega | FAIL API |

**Regra:** filme visível em **lista** `/filmes` mas ausente no **carrossel** → antes de FAIL, comparar:

```bash
# IDs no carrossel da home (amostra)
curl -sS "https://orbe-seven.vercel.app/api/homepage" | jq '[.filmes[].id] | length'

# Futuros na listagem (filtro API)
curl -sS "https://orbe-seven.vercel.app/api/filmes?filtro=futuros&limit=100" | jq 'length'
```

Se o título está em `/filmes` mas não em `/api/homepage` → **curadoria/janela** (ver `CARROSSEL-LANCAMENTO-FILMES-AUDIT.md`), não poster quebrado.

Se o poster não carrega mas a API tem o título → **FAIL UI/CDN/SW**.

---

## 3. Sync 2025–2030 (GitHub Actions)

Workflow: **Sync catálogo por ano (filmes)** (`.github/workflows/sync-catalog-year.yml`).

1. Actions → workflow → **Run workflow** → `year=2025`
2. Aguardar keep-alive terminar (ou `GET /api/sync/status` → `syncActive: false`)
3. QA valida: `/filmes`, carrossel, `by-year` / `by-month` para o ano
4. Rodar **Invalidar Cache API** se necessário
5. Repetir `2026` … `2030`

Não rodar 6 anos num único clique até validarmos um ano — PO pediu **ir testando**.

---

## 4. Checklist rápido (colar na planilha humana)

- [ ] Console sem `no-response` em posters TMDB (após deploy SW)
- [ ] Network: `homepage` e `by-month` 200
- [ ] Título comparado lista vs carrossel documentado (PASS/FAIL/BLOQUEADO)
- [ ] Screenshot + nota se houve ruído WS/CSP ignorável

Ver também: [`QA-SUPERVISOR-IA.md`](./QA-SUPERVISOR-IA.md).
