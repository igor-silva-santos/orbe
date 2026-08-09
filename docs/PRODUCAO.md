# Setup produção — passos manuais restantes

O projeto Vercel `orbe` já existia com vars Supabase antigas.
O host `yajxqpwtrruuyhhusewg.supabase.co` **não resolve mais** (projeto removido/pausado).
Por isso `prisma migrate deploy` falhou com `tenant/user ... not found`.

## 1. Criar projeto Supabase `orbe`

1. https://supabase.com/dashboard → New project → nome `orbe`
2. Settings → Database → Connection string:
   - **URI (Transaction / pooler 6543)** → `DATABASE_URL` (adicione `?pgbouncer=true` se ainda não tiver)
   - **URI (Session / Direct 5432)** → `DIRECT_URL`
3. Atualize no Vercel (só projeto **orbe**):

```bash
cd orbe
npx vercel env rm DATABASE_URL production --yes
npx vercel env add DATABASE_URL production
# cole a URL do pooler

npx vercel env rm DIRECT_URL production --yes
npx vercel env add DIRECT_URL production
# cole a URL direct

# Repita para Preview/Development se quiser
```

4. Local:

```bash
npx vercel env pull api/.env --environment=production --yes
cd api && npx prisma migrate deploy
```

## 2. Hospedar API (contínua)

Sem CLI Railway/Fly/Render nesta máquina. Escolha uma:

### Render (Blueprint já no repo)

1. https://dashboard.render.com → New → Blueprint
2. Conecte o repo `igor-silva-santos/orbe` e use `render.yaml`
3. Preencha `DATABASE_URL`, `DIRECT_URL`, `TMDB_API_KEY`, `IGDB_CLIENT_ID`, `IGDB_CLIENT_SECRET`, `CORS_ORIGIN`
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

## 3. Apontar frontend

```bash
# No projeto Vercel orbe apenas:
echo https://SUA-API/api | npx vercel env add NEXT_PUBLIC_API_URL production
echo wss://SUA-API | npx vercel env add NEXT_PUBLIC_WS_URL production
npx vercel --prod
```

## 4. Sync inicial

```bash
curl -X POST https://SUA-API/api/run-sync \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: $SYNC_SECRET" \
  -d '{"mediaType":"movies","startDate":"2025-01-01","endDate":"2025-12-31"}'
```

Repita para `series`, `animes` (`startYear`/`endYear`) e `games`.
