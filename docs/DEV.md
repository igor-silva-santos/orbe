# Orbe Nerd — guia para desenvolvedores e assistentes de código

> Este arquivo é para quem **desenvolve** o projeto. Para descoberta do site por IAs e buscadores, use [`llm.md`](../llm.md) e [`frontend/public/llms.txt`](../frontend/public/llms.txt).

Hub de descoberta e acompanhamento de filmes, séries, animes e jogos.

- **Produção:** https://orbe-seven.vercel.app
- **API:** https://orbe-7bu0.onrender.com
- **Repo:** https://gitlab.com/igordasilvasantos38/orbe.git

## Stack

Next.js 14 + Express/Prisma + PostgreSQL (Supabase) + Redis opcional.

## Estrutura

- `frontend/` — Next.js (UI, carrosséis, modais)
- `api/` — Express, sync, cache, WebSocket
- `ops/` — Cloudflare Worker (keepalive no sync)

## Rodar local

```bash
docker compose up -d postgres redis
cd api && npm install && npx prisma migrate deploy && npm run dev
cd frontend && npm install && npm run dev
```

## Docs

- [`README.md`](../README.md) — visão geral
- [`docs/PRODUCAO.md`](PRODUCAO.md) — deploy
- [`docs/SYNC_INICIAL.md`](SYNC_INICIAL.md) — sync
