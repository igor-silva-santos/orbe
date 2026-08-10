# Deploy da API no Render

## Opção A — Docker (configuração atual do serviço)

O serviço usa o `Dockerfile` na **raiz** do repositório (contexto = raiz).

| Campo | Valor |
|-------|-------|
| Environment | Docker |
| Root Directory | *(vazio — raiz do repo)* |
| Dockerfile Path | `Dockerfile` |

O Dockerfile instala `openssl` + `libssl3` no **builder e no runtime**, roda `npx prisma generate` em ambos os estágios e inicia com:

```bash
npx prisma migrate deploy && node dist/index.js
```

### Se o deploy ainda usar camadas antigas (CACHED)

1. No dashboard Render → serviço → **Manual Deploy** → **Clear build cache & deploy**
2. Ou altere `RENDER_CACHE_BUST` no Dockerfile e faça push

### Variáveis obrigatórias

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | Pooler Supabase (6543 + `?pgbouncer=true`) |
| `DIRECT_URL` | Conexão direta Supabase (5432) |
| `JWT_SECRET` | Segredo JWT |
| `SYNC_SECRET` | Segredo para `/api/run-sync` |
| `TMDB_API_KEY` | Chave TMDB |
| `IGDB_CLIENT_ID` / `IGDB_CLIENT_SECRET` | Credenciais IGDB |
| `CORS_ORIGIN` | Origens permitidas (ex.: URL do Vercel) |
| `PORT` | `3001` (Render também injeta `PORT`) |

Health check: `GET /api/health`

---

## Opção B — Native Node (alternativa sem Docker)

Se o Docker continuar problemático, troque o runtime no Render:

| Campo | Valor |
|-------|-------|
| Environment | **Node** |
| Root Directory | `api` |
| Build Command | `npm install && npx prisma generate && npm run build` |
| Start Command | `npx prisma migrate deploy && npm start` |

Ou use o Blueprint `render.yaml` na raiz (já configurado para Node + `rootDir: api`).

### Passos no dashboard

1. Settings → Environment → mude de **Docker** para **Node**
2. Root Directory: `api`
3. Build / Start conforme tabela acima
4. Salve e faça **Clear build cache & deploy**

---

## Supabase

Libere os IPs do Render no Supabase: `74.220.50.0/24`, `74.220.58.0/24`

URL pública atual: `https://orbe-7bu0.onrender.com`
