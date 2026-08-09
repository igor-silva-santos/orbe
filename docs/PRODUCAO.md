# Setup produção — passos manuais restantes

## Status automático (2026-08-09)

| Item | Status |
|------|--------|
| Código auth FE↔BE (`/api/auth/*`) | Feito (commits locais) |
| `.env.example` + README Express/Prisma | Feito |
| `render.yaml` + `api/railway.toml` | Feito |
| Projeto Vercel `orbe` linkado | Feito (`portifolio-igor-silva-santos/orbe`) |
| Secrets no Vercel (TMDB/IGDB/Supabase vars) | Presentes (nomes confirmados) |
| Supabase antigo `yajxqpwtrruuyhhusewg` | **Morto** (DNS não resolve; migrate falhou) |
| `prisma migrate deploy` | **Blocked** até novo DB |
| `vercel --prod` | **Blocked**: `BUILD_ERROR: Resource provisioning failed` (2 tentativas). Provável integração Storage/Supabase quebrada no projeto |
| API Railway/Fly/Render | **Blocked**: sem CLI/token instalados |
| Outros projetos Vercel | **Não alterados** |

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

1. https://dashboard.render.com → New → Blueprint
2. Conecte o repo `igor-silva-santos/orbe` e use `render.yaml`
3. Preencha `DATABASE_URL`, `DIRECT_URL`, `TMDB_API_KEY`, `IGDB_CLIENT_ID`, `IGDB_CLIENT_SECRET`, `CORS_ORIGIN`, `JWT_SECRET`, `SYNC_SECRET`
4. Anote a URL pública, ex.: `https://orbe-api.onrender.com`

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

```bash
# Só no projeto Vercel orbe:
npx vercel env add NEXT_PUBLIC_API_URL production
# cole: https://SUA-API/api

npx vercel env add NEXT_PUBLIC_WS_URL production
# cole: wss://SUA-API

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
