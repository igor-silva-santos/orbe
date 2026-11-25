# Auditoria de código — Orbe Nerd (FASE 1)

| Campo | Valor |
|--------|--------|
| **Data** | 24/11/2026 |
| **Método** | Análise estática (leitura de código e configs). **Nenhum** comando de terminal, teste, build, servidor ou git foi executado. |
| **Execução em runtime** | **Não verificada** — classificações abaixo refletem só o que o código/config mostram. |
| **Cobertura** | ~320 arquivos-fonte relevantes inventariados (`api/src` 124 TS, `frontend/src` 201 TS/TSX, `extension/` 18, ops/CI/docs). Leitura **integral** do núcleo da API, schema/migrations, configs, sessão/API do frontend, extensão, ops. **Parcial** em ~150 componentes/páginas do frontend (amostragem por busca + leitura de módulos críticos). Clientes HTTP de `deals/`, `ingresso*`, `scrapeAwards`, `steamClient` e corpo de todos os testes: majoritariamente por busca/contagem, não linha a linha. |
| **Excluídos** | `node_modules`, artefatos `.next`/`dist`, `frontend/public/sw.js` (gerado), SVGs/previews HTML, lockfiles (versões **resolvidas** não verificadas). |

## Resumo executivo

O Orbe Nerd é um **monorepo** maduro em escopo: API Express + Prisma + PostgreSQL, frontend Next.js 14 (PWA/Serwist), extensão Chrome para Crunchyroll, workers/CI e vários caminhos de deploy. O **catálogo** (filmes, séries, animes, jogos), **auth básica**, **cache de leitura Redis**, **sync** e **Detetive** estão implementados com volume considerável de código.

Há **16+ defeitos demonstráveis por leitura**, concentrados em:

1. **Listas multiusuário** — `WatchlistItem` e `WatchlistAnime` usam `id` global derivado do item (`cr:…` / `cr:catalog:N`), gerando colisão P2002 a partir do segundo usuário.
2. **Cache e tempo real** — invalidação Redis usa padrões `cache:/api/…*` enquanto as chaves reais são `cache:v4:/api/…`; WebSocket rejeita origens porque `resolveCorsOptions().origin` é uma **função**, não lista/string.
3. **Contrato API ↔ frontend** — notificações: API expõe `message`/`type`/`createdAt`; frontend espera `titulo`/`tipo_notificacao`/`data_criacao`. Redirect pós-login: `/extensao` usa `?next=`, login lê `redirect`. Login com senha errada pode cair no redirect global de 401 (`session_expired`).
4. **Ambiente** — `docker-compose` sobe API sem `SYNC_SECRET`/`CORS_ORIGIN` adequados para produção; migration RLS Supabase pode falhar em Postgres “puro”; SSR do frontend ignora `NEXT_PUBLIC_API_URL` em `apiServer.ts`.
5. **Lógica pontual** — filtro `airingAt >= new Date()` em `animeCarouselInclude` é avaliado **no load do módulo**; Service Worker trata `/api/home` em vez de `/api/homepage`.

**Segurança:** não foi encontrado segredo real versionado na busca por padrões (não é garantia). Há fallbacks de JWT, senha Postgres e JWT no compose, JWT em `localStorage`, CSP com `unsafe-inline`, e ponte da extensão que aceita troca de `apiUrl` sem validar remetente.

**Testes:** dezenas de testes unitários na API (funções puras); quase nada de rotas/integração; CI GitLab roda só testes da API. **Execução dos testes: não verificada.**

**App nativo (visão geral):** API separada e reutilizável para **leitura** de catálogo; bloqueios fortes em **conta, listas, notificações, push e WebSocket** antes de um cliente nativo sério.

---

## Legenda de status

| Símbolo | Significado |
|---------|-------------|
| ✅ | Código lido de ponta a ponta (ou teste pertinente existente); sem defeito estático óbvio. Execução **não verificada**. |
| ⚠️ | Implementado com lacunas, dívida ou risco relevante. |
| ❌ | Defeito demonstrável por análise estática. |
| 🧪 | Depende de runtime; indicado o que testar (comandos na seção 10). |

---

## Tabela por módulo

| Módulo | Status | Evidência | Observações |
|--------|--------|-----------|-------------|
| **API — servidor** (`index.ts`, shutdown, crons) | ✅ | `api/src/index.ts` | Crons no processo web; múltiplas instâncias podem duplicar jobs. Execução não verificada. |
| **API — guardas de segredo** | ⚠️ | `securityMiddleware.ts:94-134` | Bloqueia boot sem secrets em produção; literais de dev ainda no repo. |
| **API — CORS, helmet, rate limit** | ⚠️ | `securityMiddleware.ts:141-179` | Qualquer `chrome-extension://` permitido; rate limit em memória por instância. |
| **API — cadastro/login** | ✅ | `index.ts` (auth routes) | bcrypt, anti-enumeração. Execução não verificada. |
| **API — ciclo de vida de conta** | ⚠️ | `index.ts` | Sem refresh, revogação, reset de senha, verificação de e-mail, exclusão. |
| **API — auth/admin middleware** | ⚠️ | `authMiddleware.ts`, `adminMiddleware.ts` | Papel admin no JWT (7d), sem reconsulta ao banco. |
| **API — perfil `/users/me`** | ⚠️ | `profileRoutes.ts` | `preferencias` sem validação forte; `perfil_publico` sem consumidor claro. |
| **API — interações** | ⚠️ | `userRoutes.ts` | Sem DELETE explícito; upsert pode impedir limpar avaliação. |
| **API — lista enriquecida** | ✅ | `listaService.ts`, `userRoutes.ts` | Teste `listaService.test.ts` duplica lógica local — não exercita o módulo real. |
| **API — catálogo (rotas)** | ⚠️ | `routes/*.ts` | Params inválidos podem 500; rotas `debug-*` em não-produção. |
| **API — carrossel anime (data congelada)** | ❌ | `mediaRoutesHelpers.ts:267-276` | `new Date()` no objeto exportado no load do módulo. |
| **API — cache leitura Redis** | ✅ | `cacheMiddleware.ts` | Prefixo `cache:v4:`; lock anti-thundering herd. |
| **API — invalidação cache** | ❌ | `cacheMiddleware.ts:30,45` × `cacheInvalidation.ts:43-130` | Padrões sem `v4:` → delete não encontra chaves. |
| **API — WebSocket `/api/ws`** | ❌ | `websocket.ts:17-24` × `securityMiddleware.ts:167-172` | `allowedOrigin` é função → sempre rejeita (1008). |
| **API — sync / `run-sync`** | ❌ | `syncRoutes.ts` (validação) | Entradas inválidas podem 202 sem trabalho; erro com Redis possível. |
| **API — sync filmes/séries/animes/jogos** | ⚠️ / 🧪 | `syncMovies.ts`, etc. | Curadoria admin nas mesmas colunas que sync sobrescreve; updates não atômicos; padrão `deleteMany`+`create`. |
| **API — Detetive** | ⚠️ | `detetive.ts` | Chromium `--no-sandbox`; notificações DB sem push automático. |
| **API — tradução, webhooks IGDB** | ✅ | `translation.ts`, `webhookRoutes.ts` | Webhooks off por padrão. |
| **API — promoções (deals)** | ⚠️ | `dealsService.ts`, cron `index.ts` | Clientes externos não lidos linha a linha; cron frequente. |
| **API — notificações (rotas)** | ✅ | `notificationRoutes.ts:19-29` | DTO: `message`, `type`, `createdAt`. |
| **API — push web (VAPID)** | ⚠️ | `notificationService.ts` | Só parte dos fluxos disparam push; `VAPID_*` em produção não verificado. |
| **API — `scheduleChecker`** | ⚠️ | `scheduleChecker.ts` | Não importado no servidor — código morto funcional. |
| **API — watchlist legada** | ❌ | `schema.prisma:863-885`, `watchlistRoutes.ts` | `id` global tipo `cr:…`. |
| **API — Minha Lista animes** | ❌ | `schema.prisma:902-931`, `watchlistAnimeService.ts:57-59`, `minhaListaAnimesRoutes.ts:156-158` | `buildWatchlistAnimeId` → `cr:catalog:{animeId}` igual para todos os usuários. |
| **API — mojibake em respostas** | ❌ | `minhaListaAnimesRoutes.ts:114,122,177` | Ex.: `inv├ílido`, `cat├ílogo`. |
| **Banco — schema/migrations** | ⚠️ | `schema.prisma`, `prisma/migrations` | Dois modelos de watchlist; histórico com scripts de correção manual. |
| **Banco — migration RLS Supabase** | ❌ / 🧪 | `20260918180000_enable_rls_supabase_api/migration.sql` | `REVOKE … FROM anon, authenticated` falha sem esses roles. |
| **Ops — docker-compose API** | ❌ | `docker-compose.yml:30-34` | `JWT_SECRET` default, sem `SYNC_SECRET`/`CORS_ORIGIN` para boot strict. |
| **Ops — docker-compose frontend** | 🧪 | `docker-compose.yml:47-48`, `frontend/Dockerfile` | Rewrites podem depender de build-time env. |
| **Ops — CI/CD** | ⚠️ | `.gitlab-ci.yml`, `.github/workflows` | CI parcial; workflows GitHub legados. |
| **Frontend — Next config, proxy** | ✅ | `next.config.mjs` | Rewrites para API. |
| **Frontend — SSR servidor** | ❌ | `apiServer.ts:78-84` | Não usa `NEXT_PUBLIC_API_URL`; Opção A documentada pode SSR vazio. |
| **Frontend — sessão JWT** | ⚠️ | `lib/api.ts`, `lib/jwt.ts` | Token em `localStorage`; `JWT_SECRET` no frontend (gate de formato). |
| **Frontend — login 401** | ❌ | `lib/api.ts:122-128`, `auth/session.ts:36-39` | POST login com 401 redireciona como sessão expirada. |
| **Frontend — notificações UI** | ❌ | `lib/notifications.ts` × `notificationRoutes.ts` | Campos incompatíveis → texto vazio / data inválida. |
| **Frontend — `/extensao` redirect** | ❌ | `extensao/page.tsx:35` × `login/page.tsx:31` | `next` vs `redirect`. |
| **Frontend — Service Worker** | ❌ | `sw.ts:15-18` | Matcher `/api/home` vs rota real `/api/homepage`. |
| **Frontend — sync refresh** | ⚠️ | `SyncRefreshListener.tsx`, `useSyncSocket.ts` | Polling ok; WS não conecta. |
| **Frontend — PWA push** | 🧪 | `usePushNotifications.ts`, `sw.ts` push handler | Fluxo E2E não verificado. |
| **Frontend — UI catálogo/modais** | ⚠️ | Amostra `components/`, páginas `app/` | Grande superfície não lida arquivo a arquivo; sem achado estrutural único além dos acima. |
| **Extensão Crunchyroll** | ⚠️ / 🧪 | `extension/background/service-worker.js` | Troca de `apiUrl` sem validar origin; 6 arquivos legados fora do manifest. |
| **Documentação** | ⚠️ | `README.md`, `docs/`, `orbe-1/` | Roadmap aberto (watchlist, notificações, PWA); `orbe-1` pode divergir do código. |

---

## Dívidas técnicas e código morto

- **Modelagem:** dois modelos de watchlist; IDs globais incompatíveis com multi-tenant.
- **Contratos:** DTOs mistos (PT/EN, snake/camel); notificações sem tipo compartilhado API↔web.
- **Operação:** crons + Chromium + sync no mesmo processo Node; cache invalidation “fantasma”.
- **Config:** três histórias de deploy (Render, Railway, Docker); URLs de produção hardcoded em vários pontos (não listados exaustivamente).
- **Código morto provável:** `scheduleChecker.ts`, `clearDb.ts`, `test-db.ts`, arquivos legados em `extension/`, `package-lock.json` na raiz (órfão).
- **TODO/FIXME:** busca por marcadores típicos praticamente vazia; há `@deprecated` e comentários de dívida em sync/cache.

---

## Segurança (sem expor valores)

| Item | Risco | Evidência / nota |
|------|--------|------------------|
| Senha Postgres + JWT no `docker-compose.yml` | Médio se reutilizado | `docker-compose.yml:8,33` |
| Fallbacks `JWT_SECRET` / webhook | Alto se `ALLOW_INSECURE_DEV_SECRETS` em rede | `securityMiddleware.ts`, `index.ts` |
| JWT 7d em `localStorage` + CSP inline | XSS → conta comprometida | `lib/api.ts`, layouts |
| Extensão: mensagem troca `apiUrl` | Exfiltração de token | `service-worker.js` (relatório anterior) |
| Chromium root, `--no-sandbox` | Container escape / abuse | `detetive.ts`, Dockerfiles |
| Dados pessoais em docs/scripts | Privacidade | `DEPLOY_GITLAB.md`, scripts — não verificado linha a linha |

**CVEs / `npm audit`:** não executados (proibido sem sua autorização).

---

## Dependências (declaradas; versões “latest” não verificadas)

- **API:** Node 20 implícito; `typescript ^6` + `ts-node ^10` (compatibilidade 🧪); `prisma ^5.14`; `puppeteer ^24`; tipos possivelmente desalinhados (`@types/node ^25`, `express-rate-limit` types v5 vs lib v8).
- **Frontend:** `next ^14.2.33` (README alinha); `tailwindcss ^4` com `tailwind.config.ts` estilo v3 (🧪); `eslint ^8` + flat config.

---

## Testes (inventário; execução não verificada)

- **API:** ~16 arquivos de teste, foco em parsers/helpers (ingresso, deals, calendário, Crunchyroll CMS, etc.).
- **Frontend:** poucos unitários + Playwright e2e (2 cenários citados na auditoria anterior).
- **Lacuna:** sem supertest/integração; sem teste das colisões de watchlist nem do contrato de notificações.

---

## Prontidão para app nativo (só arquitetura)

| Aspecto | Avaliação |
|---------|-----------|
| API separada do frontend | **Boa** — cliente não-web (extensão) já consome REST. |
| Contrato estável | **Fraca** — sem OpenAPI; bugs de DTO. |
| Auth reaproveitável | **Parcial** — Bearer JWT; falta refresh/revogação. |
| Listas / notificações / realtime | **Bloqueio** — bugs atuais impedem confiar no produto. |
| Push | **Só web VAPID** — FCM/APNs inexistentes. |

---

## Achados críticos (prioridade sugerida para correção — Fase 3+)

1. Corrigir PK/compound unique em `WatchlistAnime` e `WatchlistItem` (não usar id global do item).
2. Alinhar padrões de invalidação Redis com `cache:v${CACHE_KEY_VERSION}:`.
3. Corrigir `isWebSocketOriginAllowed` (lista explícita de origens, não reutilizar callback CORS).
4. Unificar DTO de notificações (ou mapper único no frontend alinhado à API atual).
5. `animeCarouselInclude`: calcular `new Date()` por request.
6. `getApiOrigin()`: incluir `NEXT_PUBLIC_API_URL` onde documentado.
7. Login: não tratar 401 de `/auth/login` como sessão expirada.
8. Unificar `next` vs `redirect` na extensão.

---

## Seção 10 — Comandos para validação manual (aguardam sua autorização para rodar)

Execute a partir da raiz do repositório. Ajuste `api/.env` conforme `docs/DEV.md`.

### Linux/macOS (amostra mínima dos cenários ❌)

```bash
cp api/.env.example api/.env
docker compose up -d postgres redis
cd api && PUPPETEER_SKIP_DOWNLOAD=true npm ci && npx prisma generate && npx prisma migrate deploy && npm run dev
# Em outro terminal:
npx --yes wscat -c ws://localhost:3001/api/ws -H 'Origin: http://localhost:3000'
curl -s http://localhost:3001/api/homepage -o /dev/null && docker compose exec -T redis redis-cli --scan --pattern 'cache:*'
```

### PowerShell (mesmos passos)

```powershell
powershell.exe -ExecutionPolicy Bypass -Command "Copy-Item api/.env.example api/.env"
powershell.exe -ExecutionPolicy Bypass -Command "docker compose up -d postgres redis"
powershell.exe -ExecutionPolicy Bypass -Command "Set-Location api; Set-Item Env:PUPPETEER_SKIP_DOWNLOAD 'true'; npm ci; npx prisma generate; npx prisma migrate deploy"
powershell.exe -ExecutionPolicy Bypass -Command "Set-Location api; npm run dev"
powershell.exe -ExecutionPolicy Bypass -Command "npx --yes wscat -c ws://localhost:3001/api/ws -H 'Origin: http://localhost:3000'"
```

Lista completa de 20+ cenários (colisão de watchlist, notificações JSON, `run-sync` inválido, etc.) está documentada no rascunho da auditoria interna; posso anexar como `docs/auditoria-comandos-qa.md` na Fase 3 se você quiser.

---

## Lacunas residuais desta FASE 1

- Leitura linha a linha de **todos** os componentes React e clientes HTTP de promoções/Steam/Ingresso.
- Comportamento em **produção** (Vercel + API hospedada): variáveis reais, se SSR usa `API_PROXY_ORIGIN`, se push VAPID está ligado.
- **Performance** (latência, N+1 em runtime, bundle size): reservado para Fase 3A com medição.

---

*Relatório gerado na FASE 1. Próximo passo previsto: FASE 2 (`docs/mapa-visao-vs-realidade.md`, `docs/roadmap.md`) após sua aprovação.*