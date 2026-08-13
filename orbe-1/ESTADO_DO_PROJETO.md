# Estado do Projeto Orbe Nerd

Documento de referência que compara a **visão original** do produto com o **estado atual** do repositório. Útil para retomar o desenvolvimento, priorizar backlog e entender o que já foi descartado.

**Última revisão:** agosto de 2026  
**Base:** código, README, `DESIGN.md`, `docs/PRODUCAO.md`, `docs/SYNC_INICIAL.md`, protótipos em `design-preview/` e fragmentos de documentação local (spec técnica, `FuncionalidadesDoProjeto.md`, `contexto-projeto.md`, `watchlist_spec.md` — estes últimos não versionados no Git).

---

## 1. Visão original

### Proposta de valor

> **Hub de descoberta e acompanhamento de filmes, séries, animes e jogos** — “todo o universo nerd num só lugar”.

O usuário deveria poder:

1. **Descobrir** lançamentos e destaques nos quatro tipos de mídia.
2. **Acompanhar** títulos de interesse (watchlist, interações, notificações).
3. **Não perder estreias** — calendário, alertas e visão “o que tem pra hoje”.
4. **Ter contexto brasileiro** — cinema (ingresso.com), streaming BR, dublagem PT-BR em animes.

### Pilares planejados (spec + docs locais)

| Pilar | Intenção original |
|-------|-------------------|
| Catálogo unificado | Filmes, séries, animes e jogos numa única interface |
| Carrosséis temporais | Navegação por mês/ano/estação, não só “populares” |
| Watchlist sincronizada | Lista pessoal entre dispositivos, com sync em nuvem |
| Interações | Favoritar, quero assistir, acompanhando, assistido, ocultar, avaliar |
| Notificações | Alertas de lançamento (7 dias e 1 dia antes) e estreia em streaming |
| Detetive Digital | Scraping ingresso.com + TMDB para cinema BR |
| Premiações | Oscar, Globo de Ouro, Emmy, Game Awards etc. |
| Eventos de games | E3, State of Play, showcases com jogos anunciados |
| Jogos em alta | Steam trending, promoções, categorias e plataformas |
| Busca unificada | Um overlay para todos os tipos de mídia |
| Perfil e preferências | Conta, tema, consentimento +18 |
| Comunidade | Comentários em mídias (planejado cedo, depois removido) |
| Monetização | Página “Apoie” com PIX e tiers de apoio |
| PWA / offline | Uso básico sem conexão (mencionado no FAQ) |

### Stack original vs. atual

| Camada | Planejado (spec antiga) | Implementado hoje |
|--------|-------------------------|-------------------|
| Frontend | Next.js + dados mockados | Next.js 14/15 + API real |
| Backend | Python (mencionado no README antigo do frontend) | **Express + TypeScript + Prisma** |
| Banco | — | PostgreSQL (Supabase) |
| Cache | — | Redis (opcional) |
| Auth | Mockada | JWT (bcrypt + cookie httpOnly + localStorage) |
| Deploy | Vercel | Vercel (frontend) + Render (API) |

---

## 2. O que existe hoje (por área)

### 2.1 Catálogo e descoberta — **muito avançado**

| Item | Status | Notas |
|------|--------|-------|
| Homepage com 4 carrosséis | ✅ | Filmes, séries, animes, jogos |
| Páginas `/filmes`, `/series`, `/animes`, `/jogos` | ✅ | Filtros avançados por categoria |
| Carrosséis temporais (mês/ano) | ✅ | `MediaCarousel`, `AnimeCarousel` |
| Busca unificada | ✅ | `SearchOverlay` + `/api/pesquisa` |
| “O que tem pra hoje” (`/hoje`) | ✅ | Cinema + streaming + jogos do dia |
| Jogos em alta (`/jogos-em-alta`) | ✅ | Steam trending, sales, categorias |
| Premiações (`/premios`) | ✅ | Filtros por prêmio e ano |
| Eventos de games (`/eventos`) | ✅ | Resumo + listagem com jogos |
| Filmografia (`/pessoa/[id]`) | ✅ | Créditos TMDB |
| SuperModal (detalhes) | ✅ | Por tipo de mídia + edição admin |
| Onde assistir / ingresso | ✅ | `IngressoButton`, providers TMDB |

### 2.2 Sync e dados — **robusto**

| Item | Status | Notas |
|------|--------|-------|
| Sync por tipo (`run-sync`) | ✅ | movies, series, animes, games |
| Sync completo (`run-sync-all`) | ✅ | Background com checkpoint |
| Retomada (`run-sync-resume`) | ✅ | Após cold start do Render |
| Backfill histórico (2000→hoje) | ✅ | `run-sync-backfill-step` + GitHub Actions |
| Premiações (`run-sync-awards`) | ✅ | Scrape após catálogo populado |
| Preços Steam | ✅ | Cron + endpoint manual |
| WebSocket de refresh | ✅ | `SYNC_COMPLETE`, `CACHE_INVALIDATED` |
| Filtros de qualidade | ✅ | Evita lixo de API nos carrosséis |

### 2.3 Detetive Digital — **diferencial implementado**

| Item | Status | Notas |
|------|--------|-------|
| Scraping ingresso.com | ✅ | Puppeteer em `api/src/detetive.ts` |
| Pré-venda / em cartaz / em breve | ✅ | Flags no modelo `Filme` |
| Estreia cinema vs. streaming (BR) | ✅ | TMDB `release_dates` |
| Notificação ao ir para streaming | ✅ | Para usuários com interação no título |
| Cron diário (03:00 SP) | ✅ | `api/src/index.ts` |

### 2.4 Usuário e conta — **parcial**

| Item | Backend | Frontend |
|------|---------|----------|
| Registro / login | ✅ | ✅ |
| Perfil (`/perfil`) | ✅ | ✅ |
| Configurações (`/configuracoes`) | ✅ | ✅ |
| Interações (favorito, quero assistir…) | ✅ | ✅ |
| Avaliação pós-assistir/jogar | ✅ | ✅ |
| Consentimento conteúdo adulto | ✅ | ✅ |
| Calendário pessoal | ✅ | ✅ (`CalendarModal`) |
| Notificações (lista) | ✅ | ⚠️ Modal existe; sem push em tempo real |
| **Watchlist sincronizada** | ✅ API | ❌ **Sem UI nem integração FE** |
| Comentários | ❌ Removido | ❌ |

### 2.5 Design e identidade — **explorado, não unificado**

- **10 protótipos HTML** em `design-preview/` (cinematic, cosmic glass, anime-pop, pulp, terminal retro, etc.).
- **`DESIGN.md`** escolhe **Pulp Gráfico** (protótipo 05).
- **`globals.css`** implementa tokens do **Anime-Pop** (protótipo 03).
- Protótipo 06 propõe híbrido: claro = 03, escuro = 05.

### 2.6 Infraestrutura — **parcialmente bloqueada**

Ver `docs/PRODUCAO.md` para checklist vivo. Resumo:

| Item | Status |
|------|--------|
| API Render (`orbe-7bu0.onrender.com`) | ✅ |
| Demo Vercel (`orbe-seven.vercel.app`) | ⚠️ |
| Supabase antigo | ❌ Morto |
| Supabase novo | ⚠️ Config local; migrate em prod pendente |
| `NEXT_PUBLIC_API_URL` no Vercel | ❌ Falta apontar para API |
| Deploy Vercel estável | ❌ Bloqueado (provisioning / DB) |

---

## 3. O que estava planejado e ainda não está pronto

Prioridade sugerida com base no roadmap (`README.md`) e nas lacunas do código.

| Feature | Planejado em | Situação | Esforço relativo |
|---------|--------------|----------|------------------|
| Watchlist sincronizada | Spec, hero, roadmap | API pronta; FE ausente | Médio |
| Notificações em tempo real | Roadmap, FAQ | Modelo + API; WS só para sync | Médio |
| PWA | Roadmap, FAQ `/ajuda` | Não iniciado | Médio–alto |
| Página `/apoie` | Código comentado em `apoie/page.tsx` | Stub “Em Desenvolvimento” | Baixo–médio |
| Guia do usuário / chat ao vivo | `/ajuda` | Botões sem ação | Baixo |
| Comentários sociais | Migration criada e removida | **Descartado** | — |
| Auth só via cookie httpOnly | Nota em `lib/api.ts` | JWT duplicado (cookie + localStorage) | Médio (arquitetura) |
| Design Pulp Gráfico no CSS | `DESIGN.md` | CSS ainda Anime-Pop | Baixo–médio |
| Deploy produção estável | `docs/PRODUCAO.md` | Bloqueios Supabase/Vercel | Operacional |

---

## 4. Evolução e decisões descontinuadas

Registro do que **existiu** e foi substituído ou abandonado — evita retrabalho.

| Versão / ideia | Evidência | Destino |
|----------------|-----------|---------|
| Backend Python | `frontend/README.md` (desatualizado) | Express + TypeScript |
| `mockData.ts` | README frontend antigo | `realApi.ts` + `lib/api.ts` |
| Modelo `Comment` | Migrations create + drop | Feature removida |
| FK única `eventId` em jogos | Migration `20260812020000` | Relação M:N com `Event` |
| Supabase `yajxqpwtrruuyhhusewg` | `docs/PRODUCAO.md` | Projeto morto; migrar para novo |
| Rotas auth legadas | `/register`, `/login`, `/profile` | Mantidas como alias |
| Comentários na doc de sync | `docs/SYNC_INICIAL.md` §7 | Doc desatualizado (endpoint removido) |

---

## 5. Divergências entre documentação e código

| Tópico | Documentação diz | Código faz |
|--------|------------------|------------|
| Direção visual | Pulp Gráfico (`DESIGN.md`) | Tokens Anime-Pop (`globals.css`) |
| Backend | Python (`frontend/README.md`) | Express/Prisma |
| Dados no FE | Mocks (`frontend/README.md`) | API REST real |
| Comentários | Citados em sync inicial | Tabela removida |
| Watchlist | Prometida no hero da home | Sem tela dedicada |
| Offline / PWA | FAQ em `/ajuda` | Não implementado |

**Recomendação:** tratar `frontend/README.md` como legado ou atualizá-lo para apontar para `docs/FUNCIONALIDADES.md`.

---

## 6. Mapa de maturidade (resumo visual)

```
Descoberta / catálogo     ████████████████████  ~95%
Sync / pipeline de dados  ███████████████████░  ~90%
Detetive Digital (BR)     ██████████████████░░  ~85%
Interações de usuário     ███████████████░░░░░  ~75%
Conta / auth              ██████████████░░░░░░  ~70%
Notificações              ██████████░░░░░░░░░░  ~50%
Watchlist (produto)       ████░░░░░░░░░░░░░░░░  ~20% (só API)
Monetização (/apoie)      ██░░░░░░░░░░░░░░░░░░  ~10%
PWA / offline             ░░░░░░░░░░░░░░░░░░░░   0%
Deploy produção estável   ████████░░░░░░░░░░░░  ~40%
```

---

## 7. Conclusão e próximos passos sugeridos

O Orbe Nerd **não é um protótipo vazio**: o núcleo de catálogo, sync, busca, premiações, eventos, Detetive Digital e interações está implementado com profundidade incomum para um projeto pessoal.

As maiores lacunas em relação à **ideia original** são de **produto** (watchlist visível, notificações push, PWA), **polimento** (design unificado, página de apoio) e **operação** (Supabase + Vercel + variáveis de produção).

Ordem sugerida para fechar o gap com a visão original:

1. **Desbloquear produção** — novo Supabase, `prisma migrate deploy`, `NEXT_PUBLIC_API_URL` no Vercel (`docs/PRODUCAO.md`).
2. **Watchlist no frontend** — consumir `GET/POST /api/watchlist` e `/api/watchlist/sync`.
3. **Notificações** — push via WebSocket ou polling; hoje o WS só invalida cache de sync.
4. **Alinhar design** — aplicar Pulp (05) ou híbrido (06) conforme `DESIGN.md`.
5. **Atualizar docs legados** — `frontend/README.md`, remover menção a comentários em `SYNC_INICIAL.md`.
6. **PWA e `/apoie`** — conforme prioridade de produto.

---

## Documentos relacionados

| Arquivo | Conteúdo |
|---------|----------|
| [`FUNCIONALIDADES.md`](./FUNCIONALIDADES.md) | Inventário detalhado do que o sistema faz hoje |
| [`../docs/PRODUCAO.md`](../docs/PRODUCAO.md) | Checklist de deploy |
| [`../docs/SYNC_INICIAL.md`](../docs/SYNC_INICIAL.md) | Comandos de sync e backfill |
| [`../DESIGN.md`](../DESIGN.md) | Direção visual escolhida |
| [`../README.md`](../README.md) | Visão geral e como rodar localmente |
