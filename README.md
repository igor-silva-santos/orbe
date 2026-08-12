# Orbe Nerd

Hub de descoberta e acompanhamento de filmes, séries, animes e jogos.

**Demo:** https://orbe-seven.vercel.app  
**UI:** direção visual [Pulp Gráfico](DESIGN.md) (`design-preview/orbe-redesign-05-pulp-dual-theme.html`)

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14, Tailwind CSS |
| Backend | Express (TypeScript) + Prisma |
| Banco | PostgreSQL (Supabase recomendado) |
| Cache | Redis (opcional) |
| APIs | TMDB, AniList, IGDB |
| Auth | JWT |
| Deploy | Frontend → Vercel; API → host contínuo (Railway / Fly / Render) |

> A API usa cron, WebSocket e sync longos — **não** rode como serverless puro na Vercel.

## Como rodar (local)

### 1. Infra

```bash
docker compose up -d postgres redis
```

### 2. Backend

```bash
cd api
cp .env.example .env   # preencha DATABASE_URL, DIRECT_URL, JWT_SECRET, TMDB/IGDB
npm install
npx prisma migrate deploy
npm run prisma:generate
npm run dev            # http://localhost:3001
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev            # http://localhost:3000 (proxy /api → :3001)
```

## Produção

1. **Supabase:** crie o projeto `orbe`, copie pooler → `DATABASE_URL` e direct → `DIRECT_URL`.
2. **API (Railway/Fly/Render):** deploy da pasta `api/`, injete as envs de `api/.env.example`, rode `prisma migrate deploy` no start/release.
3. **Frontend (Vercel):** Root Directory = `frontend` (ou use o `vercel.json` da raiz). Defina:
   - `NEXT_PUBLIC_API_URL` = `https://<sua-api>/api`
   - `NEXT_PUBLIC_WS_URL` = `wss://<sua-api>`
4. Sync inicial (com API + DB up):

```bash
curl -X POST https://<sua-api>/api/run-sync \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: $SYNC_SECRET" \
  -d '{"mediaType":"movies","startDate":"2024-01-01","endDate":"2024-12-31"}'
```

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [`docs/FUNCIONALIDADES.md`](docs/FUNCIONALIDADES.md) | Inventário do que o sistema faz hoje |
| [`docs/ESTADO_DO_PROJETO.md`](docs/ESTADO_DO_PROJETO.md) | Visão original vs. estado atual e lacunas |
| [`docs/PRODUCAO.md`](docs/PRODUCAO.md) | Deploy em produção |
| [`docs/SYNC_INICIAL.md`](docs/SYNC_INICIAL.md) | Sync inicial e backfill |
| [`DESIGN.md`](DESIGN.md) | Direção visual (Pulp Gráfico) |

Os protótipos HTML ficam em `design-preview/`.

## Roadmap

- [ ] Deploy de produção estável (Vercel + API contínua + Supabase) — ver [`docs/PRODUCAO.md`](docs/PRODUCAO.md)
- [ ] Watchlist sincronizada
- [ ] Notificações em tempo real
- [ ] PWA
