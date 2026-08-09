# Setup produção — passos manuais restantes

## Status automático (2026-08-09)

| Item | Status |
|------|--------|
| Código auth FE↔BE (`/api/auth/*`) | Feito |
| Proxy `/api` em produção (`next.config.mjs`) | **Feito** — rewrites usam `NEXT_PUBLIC_API_URL` ou `API_PROXY_ORIGIN` |
| `apiBase.ts` centralizado no frontend | **Feito** |
| `.env.example` + README Express/Prisma | Feito |
| `render.yaml` + `api/railway.toml` | Feito |
| Projeto Vercel `orbe` linkado | Feito (`portifolio-igor-silva-santos/orbe`) |
| Secrets no Vercel (TMDB/IGDB/Supabase vars) | Presentes — **apontam ao Supabase antigo morto** |
| Supabase antigo `yajxqpwtrruuyhhusewg` | **Morto** (DNS não resolve) |
| Supabase novo `prvzdcwohdvhgpfwsznl` | Configurado em `api/.env.local` (local) |
| `prisma migrate deploy` | **Blocked** até novo DB no Vercel/API host |
| `vercel --prod` (projeto orbe raiz) | **Blocked**: `BUILD_ERROR: Resource provisioning failed` |
| API Railway/Fly/Render | Em deploy — `Dockerfile` na raiz + `render.yaml` corrigidos |
| `NEXT_PUBLIC_API_URL` no Vercel | **Falta** — usar `https://orbe-7bu0.onrender.com/api` |

## 1. Desbloquear deploy Vercel (obrigatório)

No dashboard: [Vercel → orbe → Storage / Integrations](https://vercel.com/portifolio-igor-silva-santos/orbe)

1. **Desconecte** o store Supabase/Postgres antigo (ref `yajxqpwtrruuyhhusewg`).
2. Crie um **novo** projeto Supabase chamado `orbe`.
3. Reconecte **ou** cole manualmente:
   - `DATABASE_URL` = pooler (porta 6543 + `?pgbouncer=true`)
   - `DIRECT_URL` = conexão direta (5432)
4. Redeploy:

```bash
cd frontend
npx vercel --prod --yes
```

URL esperada: `https://orbe-portifolio-igor-silva-santos.vercel.app` (alias estável do projeto).

## 2. Migrar schema

```bash
cd orbe
npx vercel env pull api/.env --environment=production --yes
cd api
npx prisma migrate deploy
```

## 3. Hospedar API (contínua)

Sem CLI Railway/Fly/Render nesta máquina. Escolha uma:

### Render (Blueprint já no repo)

1. https://dashboard.render.com → New → Blueprint **ou** Web Service conectado ao repo
2. Conecte o repo `igor-silva-santos/orbe`
3. **Runtime recomendado:** Node (usa `render.yaml` com `rootDir: api`)
4. **Se o serviço estiver em Docker:** use o `Dockerfile` na **raiz** do repo (contexto = raiz) **ou** defina Root Directory = `api` e Dockerfile = `api/Dockerfile`
5. Preencha as variáveis abaixo no dashboard
6. No Supabase, libere os IPs do Render: `74.220.50.0/24`, `74.220.58.0/24`
7. URL pública atual: `https://orbe-7bu0.onrender.com`

#### Variáveis de ambiente (Render)

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NODE_ENV` | sim | `production` |
| `PORT` | sim | `3001` (Render injeta `PORT` automaticamente — manter compatível) |
| `DATABASE_URL` | sim | Pooler Supabase (6543 + `?pgbouncer=true`) |
| `DIRECT_URL` | sim | Conexão direta Supabase (5432) |
| `JWT_SECRET` | sim | String longa e aleatória |
| `SYNC_SECRET` | sim | Segredo para `/api/run-sync` |
| `TMDB_API_KEY` | sim | Chave TMDB |
| `IGDB_CLIENT_ID` | sim | Client ID IGDB |
| `IGDB_CLIENT_SECRET` | sim | Client secret IGDB |
| `CORS_ORIGIN` | sim | `https://orbe-seven.vercel.app,http://localhost:3000` |
| `REDIS_URL` | não | Deixe vazio se não usar cache Redis |
| `IGDB_WEBHOOK_SECRET` | não | Só se webhooks IGDB estiverem ativos |

Health check: `GET /api/health` → `{ "ok": true, "db": true }`

### Railway

```bash
npm i -g @railway/cli
railway login
cd api
railway init
railway variables set DATABASE_URL=... DIRECT_URL=... JWT_SECRET=... SYNC_SECRET=... TMDB_API_KEY=... IGDB_CLIENT_ID=... IGDB_CLIENT_SECRET=...
railway up
```

## 4. Apontar frontend

No dashboard Vercel (projeto com `orbe-seven.vercel.app` — Root Directory = `frontend`):

```
NEXT_PUBLIC_API_URL = https://orbe-7bu0.onrender.com/api
NEXT_PUBLIC_WS_URL = wss://orbe-7bu0.onrender.com
NEXT_PUBLIC_APP_URL = https://orbe-seven.vercel.app
```

Ou use `API_PROXY_ORIGIN=https://SUA-API` (sem `/api`).

O `next.config.mjs` faz proxy de `/api/*` → API Express em produção (evita CORS).

```bash
cd frontend
npx vercel --prod --yes
```

## 5. Sync inicial

```bash
curl -X POST https://SUA-API/api/run-sync \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: $SYNC_SECRET" \
  -d '{"mediaType":"movies","startDate":"2025-01-01","endDate":"2025-12-31"}'
```

Repita para `series`, `animes` (`startYear`/`endYear`) e `games`.

## Keys confirmadas no Vercel (sem valores)

`DATABASE_URL`, `DIRECT_URL`, `TMDB_API_KEY`, `IGDB_CLIENT_ID`, `IGDB_CLIENT_SECRET`, `SECRET_KEY`, vars `POSTGRES_*` / `SUPABASE_*`, `NEXT_PUBLIC_WS_URL`, `NEXT_PUBLIC_SUPABASE_*`.

Falta no Vercel (frontend): `NEXT_PUBLIC_API_URL` (depois da API up).
