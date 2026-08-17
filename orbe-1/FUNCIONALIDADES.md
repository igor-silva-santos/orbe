# Funcionalidades do Orbe Nerd

Inventário das funcionalidades do projeto: o que o sistema oferece hoje, onde está no código e qual o status de cada item.

**Última revisão:** agosto de 2026  
**Demo:** https://orbe-seven.vercel.app  
**API (produção):** https://orbe-7bu0.onrender.com

Para comparação com a visão original e lacunas, veja [`ESTADO_DO_PROJETO.md`](./ESTADO_DO_PROJETO.md).

---

## 1. Visão geral

O Orbe Nerd é um **hub de estreiras nerd** que agrega:

- **Filmes** e **séries** (TMDB)
- **Animes** (AniList)
- **Jogos** (IGDB + Steam)

O usuário navega por carrosséis temporais, filtra por categoria, pesquisa títulos, interage com mídias (favoritar, quero assistir, avaliar) e recebe contexto brasileiro de cinema e streaming via **Detetive Digital**.

### Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS, Zustand |
| Backend | Express, TypeScript, Prisma |
| Banco | PostgreSQL (Supabase) |
| Cache | Redis (opcional) |
| Auth | JWT |
| Deploy | Frontend → Vercel; API → Render |

---

## 2. Páginas do frontend

| Rota | Descrição | Status |
|------|-----------|--------|
| `/` | Homepage — hero + 4 carrosséis (filmes, séries, animes, jogos) | ✅ |
| `/filmes` | Listagem com filtros (cartaz, gênero, ano, mês, status, plataforma) | ✅ |
| `/series` | Listagem com filtros | ✅ |
| `/animes` | Listagem (gênero, ano, formato, fonte, status) | ✅ |
| `/jogos` | Listagem (gênero, plataforma, modo, ano, mês) | ✅ |
| `/jogos-em-alta` | Redireciona para `/promocoes?tab=em-alta` | ✅ |
| `/promocoes` | Três abas: grátis, promoções ao vivo (Epic, Steam, GamerPower, CheapShark, Ubisoft) + catálogo Orbe; aba **Em Alta** (ex-jogos-em-alta) | ✅ |
| `/premios` | Vencedores e indicados por prêmio e ano | ✅ |
| `/eventos` | Showcases e eventos de games com jogos anunciados | ✅ |
| `/hoje` | Cinema + streaming + jogos do dia | ✅ |
| `/pessoa/[id]` | Filmografia de ator/diretor (TMDB) | ✅ |
| `/login`, `/register` | Autenticação | ✅ |
| `/perfil` | Perfil do usuário (protegido) | ✅ |
| `/configuracoes` | Edição de perfil e preferências (protegido) | ✅ |
| `/contato` | Formulário → `POST /api/contato` | ✅ |
| `/ajuda` | FAQ estático | ✅ |
| `/sugestoes`, `/bug-report` | Redirecionam para contato | ✅ |
| `/apoie` | Monetização / apoio ao projeto | ⚠️ Stub |
| `/termos`, `/privacidade`, `/cookies`, `/dmca` | Páginas legais | ✅ |

### Componentes globais (modais e overlays)

| Componente | Função |
|------------|--------|
| `Header` | Navegação, tema, busca, notificações, menu usuário |
| `SearchOverlay` | Busca unificada com filtros por tipo |
| `SuperModal` | Detalhes da mídia + edição admin + calendário |
| `NotificationModal` | Lista de notificações do usuário |
| `RatingModal` | Avaliação após assistir/jogar |
| `AdultContentModal` | Consentimento para conteúdo +18 |
| `CalendarModal` | Eventos pessoais de calendário |
| `MidiaCard` | Card de mídia com menu de interações |
| `MediaCarousel` / `AnimeCarousel` | Carrosséis horizontais com navegação temporal |

---

## 3. Funcionalidades por módulo

### 3.1 Descoberta e navegação

| Funcionalidade | Detalhes |
|----------------|----------|
| Carrosséis temporais | Navegação por mês/ano; índice inicial calculado pela data atual |
| Filtros por listagem | Gênero, ano, mês, status, plataforma, cartaz etc. |
| Busca unificada | Debounce, filtros por tipo, resultados agrupados |
| Trending | Endpoint `/api/trending` |
| Homepage agregada | `/api/homepage` — dados dos 4 tipos em uma chamada |
| Refresh pós-sync | WebSocket + hook `useOrbeDataRefresh` |

### 3.2 Filmes (TMDB + Detetive Digital)

| Funcionalidade | Detalhes |
|----------------|----------|
| Catálogo e detalhes | Sync TMDB; detalhes enriquecidos sob demanda |
| Em cartaz / em breve | Flags `emCartaz`, `emBreve` |
| Onde assistir (streaming BR) | Providers TMDB; `estreia_streaming` |
| Ingresso.com | Link de sessões, pré-venda; scraping via Detetive |
| Premiações | JSON `premiacoes` no modelo |
| Edição admin | `PUT /api/filmes/:id` |
| Localização PT-BR | Flag `localizacaoPtBr` no sync |

### 3.3 Séries (TMDB)

| Funcionalidade | Detalhes |
|----------------|----------|
| Catálogo, temporadas, episódios | Sync TMDB completo |
| Networks e streaming | Providers por região |
| Carrosséis e filtros | Equivalentes aos de filmes |
| Edição admin | `PUT /api/series/:id` |

### 3.4 Animes (AniList)

| Funcionalidade | Detalhes |
|----------------|----------|
| Catálogo e detalhes | Títulos romaji/inglês/nativo |
| Dublagem PT-BR | Flag `dublagemPtBr` |
| Cronograma semanal | `/api/animes/weekly-schedule` |
| Próximo episódio | `/api/animes/:id/next-episode` |
| Por temporada/ano | `/api/animes/by-season`, `by-year` |
| Personagens e relações | Dados AniList no sync |
| Edição admin | `PUT /api/animes/:id` |

### 3.5 Jogos (IGDB + Steam)

| Funcionalidade | Detalhes |
|----------------|----------|
| Catálogo e detalhes | IGDB; screenshots, requisitos PC |
| Eventos de lançamento | Relação M:N com `Event` |
| Steam trending / sales | `/api/jogos/steam/trending`, `/sales` |
| Jogos em alta | `/api/jogos/em-alta` — página dedicada |
| Preços Steam | Sync periódico; label no card |
| Webhooks IGDB | Opcional (`IGDB_WEBHOOKS_ENABLED`) |
| Edição admin | `PUT /api/jogos/:id` |

### 3.6 Premiações e eventos

| Funcionalidade | Detalhes |
|----------------|----------|
| Premiações | Oscar, Globo de Ouro, Emmy, Game Awards etc.; scrape `run-sync-awards` |
| Filtros de prêmio | `/api/premios/filtros` |
| Eventos de games | E3, State of Play etc.; jogos anunciados por evento |
| Resumo de eventos | `/api/eventos/resumo` |

### 3.6.1 Promoções de jogos (`/promocoes`)

Agrega grátis e promoções de várias fontes com cache Redis (`api/src/deals/`).

| Fonte | Grátis | Promoções pagas | Notas |
|-------|--------|-----------------|-------|
| **Epic Games** | `freeGamesPromotions` (REST, preços BRL) | Mesmo feed — só jogos no carrossel promocional (~poucos títulos) | GraphQL e `store.epicgames.com/browse` bloqueados por Cloudflare no servidor |
| **CheapShark store 25** | Sim | **Fonte principal Epic pagas** — paginação (`EPIC_SALE_MAX_PAGES`, padrão 5 páginas × 60) | USD; dedupe com Epic REST por `steamAppId` ou título |
| **CheapShark geral** | Sim | Steam, GOG, Ubisoft etc. | `CHEAPSHARK` páginas configuráveis no serviço |
| **Steam API** | Sim | Sim | Trending + sales |
| **GamerPower** | Sim (giveaways) | — | Multi-plataforma |
| **itch.io** | RSS oficial (`price-free.xml`) + fallback JSON | RSS (`on-sale.xml`) + fallback JSON | Preços USD; conversão via câmbio |
| **IsThereAnyDeal** | — | **Epic (shop 16) + EA (shop 52)** em BRL | Requer `ITAD_API_KEY`; paginação `ITAD_MAX_PAGES` |
| **Catálogo Orbe** | — | Steam com capa IGDB e link interno | `catalogoSteam` na API |

Dedupe (`dedupeDeals`): cruza fontes por `steamAppId`, slug Epic (`store.epicgames.com/p/...`) e título normalizado — evita perder ofertas CheapShark quando Epic REST repete o mesmo jogo.

### 3.7 “O que tem pra hoje”

Agrega em `/api/hoje` e exibe em `/hoje`:

- Filmes em cartaz e estreias do dia
- Séries/animes com episódios relevantes
- Jogos com lançamento ou destaque no dia

### 3.8 Conta e autenticação

| Funcionalidade | Endpoint / local |
|----------------|------------------|
| Registro | `POST /api/auth/register` |
| Login | `POST /api/auth/login` |
| Usuário atual | `GET /api/auth/me` |
| Perfil | `GET/PATCH /api/users/me` |
| Sessão Next.js | Cookie httpOnly em `/api/auth/session` |
| Middleware | Protege `/perfil` e `/configuracoes` |

### 3.9 Interações do usuário

Persistidas em `preferencias_usuario_midia`:

| Interação | Descrição |
|-----------|-----------|
| Favorito | Marca título como favorito |
| Quero assistir / jogar | Lista de intenção |
| Acompanhando | Em progresso |
| Assistido / jogado | Concluído; pode abrir modal de avaliação |
| Oculto | Remove da visão pessoal |
| Avaliação | Nota e comentário pessoal (não público) |

Endpoints: `GET/POST /api/me/interactions`

### 3.10 Watchlist

| Item | Status |
|------|--------|
| Modelo `WatchlistItem` | ✅ |
| `GET /api/watchlist` | ✅ |
| `POST /api/watchlist/sync` | ✅ (bulk, até 500 itens) |
| UI dedicada no frontend | ❌ Não implementada |
| Integração no hero/marketing | Mencionada (“monte sua watchlist”) |

### 3.11 Notificações

| Item | Status |
|------|--------|
| Modelo `Notification` | ✅ |
| CRUD + marcar lidas | ✅ `/api/notifications/*` |
| Geração automática | ✅ `scheduleChecker` (7 e 1 dia antes); Detetive (streaming) |
| Modal no header | ✅ |
| Push em tempo real (WebSocket dedicado) | ❌ WS usado apenas para sync/cache |

### 3.12 Calendário pessoal

| Funcionalidade | Detalhes |
|----------------|----------|
| Eventos do usuário | Modelo `UserCalendarEvent` |
| API | `GET/POST/DELETE /api/calendar-events` |
| UI | `CalendarModal` no SuperModal |

### 3.13 Conteúdo adulto

- Modal de consentimento (`AdultContentModal`)
- Preferência persistida; títulos `adult` filtrados sem consentimento

### 3.14 Admin

| Funcionalidade | Detalhes |
|----------------|----------|
| Role `admin` no usuário | Edição via SuperModal |
| PUT em filmes/séries/animes/jogos | Rotas protegidas por `adminMiddleware` |
| Logs de sync | `GET /api/sync/logs` (admin ou `x-sync-secret`) |
| Botão temporário em `/perfil` | Download de logs (admin) |

### 3.15 Contato e suporte

| Funcionalidade | Detalhes |
|----------------|----------|
| Formulário de contato | `POST /api/contato` → `ContactMessage` |
| FAQ | `/ajuda` — estático |
| Guia / chat ao vivo | Botões placeholder sem implementação |

### 3.16 Monetização

| Funcionalidade | Status |
|----------------|--------|
| `/apoie` — PIX, tiers, assinatura | Código comentado; página exibe “Em Desenvolvimento” |

---

## 4. API — referência por grupo

Prefixo base: `/api` (exceto aliases legados de auth na raiz).

### Saúde e auth

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Health check (`ok`, `db`) |
| POST | `/auth/register`, `/register` | Cadastro |
| POST | `/auth/login`, `/login` | Login |
| GET | `/auth/me`, `/profile` | Usuário autenticado |

### Mídia

| Grupo | Rotas principais |
|-------|------------------|
| Agregados | `GET /homepage`, `/hoje`, `/trending` |
| Filmes | `GET /filmes`, `/filmes/:id/details`, `/filmes/filtros`, `/filmes/homepage-carousel`, `/filmes/by-year`, `/filmes/by-month`, `PUT /filmes/:id` |
| Séries | Equivalentes em `/series/*` |
| Animes | `/animes/*`, `/animes/:id/next-episode`, `/animes/weekly-schedule`, `/animes/by-season`, `/animes/by-year` |
| Jogos | `/jogos/*`, `/jogos/steam/trending`, `/jogos/steam/sales`, `/jogos/em-alta` |
| Promoções | `GET /deals`, `/deals/gratis`, `/deals/promocoes?page=&limit=`, `/deals/epic`, `/deals/gamerpower`, `/deals/cheapshark` |
| Busca | `GET /pesquisa`, `/search` |
| Prêmios | `GET /premios`, `/premios/filtros` |
| Eventos | `GET /eventos`, `/eventos/resumo` |
| Pessoas | `GET /pessoas/:id/creditos` |

### Usuário

| Método | Rota | Descrição |
|--------|------|-----------|
| GET/POST | `/me/interactions` | Interações com mídias |
| GET/PATCH | `/users/me` | Perfil |
| GET | `/watchlist` | Itens da watchlist |
| POST | `/watchlist/sync` | Sync em lote |
| GET/PUT/DELETE | `/notifications/*` | Notificações |
| GET/POST/DELETE | `/calendar-events` | Calendário pessoal |
| POST | `/contato` | Mensagem de contato |

### Sync e manutenção

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/sync/status` | Status público ou detalhado (com secret) |
| GET | `/sync/db-size` | Tamanho do banco |
| GET | `/sync/logs` | Logs de sync |
| POST | `/run-sync` | Sync por tipo |
| POST | `/run-sync-all` | Sync completo |
| POST | `/run-sync-resume` | Retomar checkpoint |
| POST | `/run-sync-backfill-step` | Backfill ano a ano |
| POST | `/run-sync-awards` | Scrape de premiações |
| POST | `/run-sync-steam-prices` | Atualizar preços Steam |
| POST | `/run-detetive` | Detetive Digital manual |
| POST | `/sync/reset-stale` | Liberar lock preso |
| POST | `/sync/invalidate-cache` | Invalidar cache Redis |

Proteção: rotas de escrita exigem header `x-sync-secret` (`SYNC_SECRET`).

### Webhooks

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/webhooks/igdb/:endpoint` | Webhooks IGDB (opcional) |

### WebSocket

- Path: `/api/ws`
- Eventos: `SYNC_COMPLETE`, `CACHE_INVALIDATED` — frontend atualiza dados após sync

---

## 5. Modelos de dados (Prisma)

Principais entidades em `api/prisma/schema.prisma`:

| Modelo | Identificador externo | Uso |
|--------|----------------------|-----|
| `Filme` | `tmdbId` | Cinema, streaming, Detetive, premiações |
| `Serie` | `tmdbId` | Séries e temporadas |
| `Anime` | `anilistId` | Animes, dublagem, cronograma |
| `Jogo` | `igdbId` | Jogos, Steam, eventos |
| `Event` | `igdbId` | Eventos de games |
| `User` | — | Auth, perfil, role |
| `preferencias_usuario_midia` | — | Interações por usuário/mídia |
| `WatchlistItem` | — | Watchlist (sync) |
| `Notification` | — | Alertas |
| `UserCalendarEvent` | — | Calendário pessoal |
| `ContactMessage` | — | Formulário de contato |
| `AppSetting` | — | Checkpoint de sync, backfill |

---

## 6. Jobs agendados e integrações

### Cron (API — fuso America/Sao_Paulo)

| Horário | Job |
|---------|-----|
| 03:00 | Detetive Digital (`runDetetive`) |
| 04:00 | Refresh preços Steam |
| 05:00 | Renovação webhooks IGDB (se habilitado) |

### APIs externas

| Serviço | Uso |
|---------|-----|
| TMDB | Filmes, séries, pessoas, providers BR |
| AniList | Animes |
| IGDB | Jogos e eventos |
| Steam | Trending, sales, preços |
| ingresso.com | Sessões de cinema (Detetive) |

### GitHub Actions

- `.github/workflows/sync-backfill.yml` — backfill noturno via `run-sync-backfill-step`

---

## 7. Design e temas

| Item | Local |
|------|-------|
| Direção escolhida | Pulp Gráfico — [`DESIGN.md`](../DESIGN.md) |
| Protótipos | `design-preview/orbe-redesign-*.html` (10 estilos) |
| Tokens CSS | `frontend/src/app/globals.css` |
| Temas | Claro / escuro / sistema (`useTheme`) |

---

## 8. Roadmap (não implementado)

Itens explícitos no [`README.md`](../README.md):

- [ ] Deploy de produção estável (Vercel + API + Supabase)
- [ ] Watchlist sincronizada (UI)
- [ ] Notificações em tempo real
- [ ] PWA

---

## 9. Legenda de status

| Símbolo | Significado |
|---------|-------------|
| ✅ | Implementado e utilizável |
| ⚠️ | Parcial, stub ou bloqueado em produção |
| ❌ | Não implementado ou removido |

---

## Documentos relacionados

| Arquivo | Conteúdo |
|---------|----------|
| [`ESTADO_DO_PROJETO.md`](./ESTADO_DO_PROJETO.md) | O que existe vs. o que era planejado |
| [`../docs/PRODUCAO.md`](../docs/PRODUCAO.md) | Deploy e variáveis de ambiente |
| [`../docs/SYNC_INICIAL.md`](../docs/SYNC_INICIAL.md) | Popular catálogo e premiações |
| [`../DESIGN.md`](../DESIGN.md) | Identidade visual |
| [`../README.md`](../README.md) | Como rodar o projeto |
