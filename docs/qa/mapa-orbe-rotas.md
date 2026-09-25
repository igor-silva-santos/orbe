# Mapa Orbe — rotas, telas e validação

Documento de referência para **saber onde testar**. O Orbe não tem “100 páginas Next” — tem **dezenas de telas** + **dezenas de URLs com query** + **padrões dinâmicos** + **~85 endpoints GET na API** (121 handlers HTTP no total).

## Como validar tudo automaticamente

```bash
cd frontend
npm run test:e2e:explore    # jornadas (modais, carrosséis, promoções)
npm run test:e2e:routes     # cada rota UI catalogada + smoke API pública
```

Saídas:

| Arquivo | Conteúdo |
|---------|----------|
| `docs/qa/validacao-rotas-latest.json` | HTTP status por rota UI + API |
| `docs/qa/exploracao-orbe-latest.json` | console, rede, interações |
| `docs/qa/mapa-orbe-rotas.md` | este mapa |

Catálogo machine-readable: `frontend/e2e/explorer/route-manifest.ts`.

---

## 1. Frontend — App Router (33 `page.tsx`)

| Rota | Arquivo | Auth | Notas |
|------|---------|------|-------|
| `/` | `app/page.tsx` | — | Home, carrosséis, continuar assistindo |
| `/filmes` | `app/filmes/page.tsx` | — | SuperModal via card |
| `/series` | `app/series/page.tsx` | — | |
| `/animes` | `app/animes/page.tsx` | — | |
| `/jogos` | `app/jogos/page.tsx` | — | |
| `/premios` | `app/premios/page.tsx` | — | |
| `/hoje` | `app/hoje/page.tsx` | — | Seções toggláveis (localStorage) |
| `/eventos` | `app/eventos/page.tsx` | — | |
| `/continuacoes` | `app/continuacoes/page.tsx` | — | `?saga=` / `?universo=` |
| `/promocoes` | `app/promocoes/page.tsx` | — | Abas via `?tab=` |
| `/jogos-em-alta` | `app/jogos-em-alta/page.tsx` | — | **Redirect** → `/promocoes?tab=em-alta` |
| `/pessoa/[id]` | `app/pessoa/[id]/page.tsx` | — | Volta ao modal / busca |
| `/dublador/[id]` | `app/dublador/[id]/page.tsx` | — | |
| `/desenvolvedora/[id]` | `app/desenvolvedora/[id]/page.tsx` | — | |
| `/login` | `app/login/page.tsx` | — | |
| `/register` | `app/register/page.tsx` | — | |
| `/perfil` | `app/perfil/page.tsx` | **Sim** | Middleware JWT |
| `/configuracoes` | `app/configuracoes/page.tsx` | **Sim** | |
| `/minha-lista` | `app/minha-lista/page.tsx` | Parcial | Hub; subrotas protegidas |
| `/minha-lista/animes` | `app/minha-lista/animes/page.tsx` | **Sim** | Watchlist |
| `/minha-lista/fila` | `app/minha-lista/fila/page.tsx` | **Sim** | Fila anime |
| `/admin/sync-logs` | `app/admin/sync-logs/page.tsx` | Admin | Sync logs |
| `/extensao` | `app/extensao/page.tsx` | — | |
| `/extensao/crunchyroll` | `app/extensao/crunchyroll/page.tsx` | — | |
| `/ajuda` | `app/ajuda/page.tsx` | — | FAQ estático |
| `/apoie` | `app/apoie/page.tsx` | — | |
| `/sugestoes` | `app/sugestoes/page.tsx` | — | |
| `/bug-report` | `app/bug-report/page.tsx` | — | |
| `/contato` | `app/contato/page.tsx` | — | |
| `/termos` | `app/termos/page.tsx` | — | |
| `/privacidade` | `app/privacidade/page.tsx` | — | |
| `/cookies` | `app/cookies/page.tsx` | — | |
| `/dmca` | `app/dmca/page.tsx` | — | |

### Variantes de query (contam como URLs de teste)

- `/promocoes?tab=gratis|promocoes|em-alta|recomendacoes`
- `/login?redirect=/perfil` (implícito ao bater rota protegida)

### Rotas Next internas

- `/api/auth/session` — `app/api/auth/session/route.ts`
- `/api/sync/status` — proxy status
- `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`

**Total UI catalogado no Playwright:** ~40 estáticas + amostras dinâmicas (pessoa, dublador, dev, saga, universo).

---

## 2. UI global (não são `page.tsx`)

Montadas em `app/layout.tsx`:

| Superfície | Componente | Store |
|------------|------------|-------|
| Busca | `SearchOverlay.tsx` | `openSearch` |
| Detalhe | `SuperModal.tsx` | `openSuperModal` |
| Notificações | `NotificationModal.tsx` | `openNotificationModal` |
| Avaliação | `RatingModal.tsx` | `openRatingModal` |
| Calendário | `CalendarModal.tsx` | nested |

Header: `Header.tsx` — nav, tema, Mais, mobile.

---

## 3. API Express (`/api/*`) — ~85 GET públicos + resto auth/sync

Agregador: `api/src/mediaRoutes.ts`, `dealsRoutes.ts`, `syncRoutes.ts`, etc.

### Smoke automatizado (`route-manifest.ts` → `PUBLIC_API_GET_ROUTES`)

Home, hoje, trending, pesquisa, catálogos (filmes/séries/animes/jogos), filtros, carrosséis, deals, premios, eventos, continuações, jogos em alta/recomendações, sync status, auth session.

### Requer autenticação (validar manualmente ou com credenciais E2E)

- `/api/users/me`, `/api/minha-lista/animes/*`, `/api/notifications/*`, POST sync, etc.

### Detalhes por ID (validação amostral via explorer de jornadas)

- `/api/filmes/:id/details`, `/api/series/:id/details`, `/api/animes/:id/details`, `/api/jogos/:id/details`

---

## 4. Regras de negócio (511 cenários)

`docs/regras-negocio/cenarios-teste.md` — **não** cobertos 100% pelo robô; o explorador cobre **regressão técnica** (rota viva, sem 5xx, console limpo).

---

## 5. O que falta para “garantir tudo” como QA humano

1. **Credenciais E2E** — minha-lista, perfil, admin, notificações push  
2. **Detalhes `:id` em massa** — amostra 1 por tipo hoje; expandir para N IDs  
3. **511 cenários** — planilha / execução humana ou runner dedicado  

Com `test:e2e:routes` + `test:e2e:explore` você tem **mapa + evidência** de que cada rota catalogada responde e as jornadas principais não quebram silenciosamente.
