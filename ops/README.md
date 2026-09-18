# Ops — sync e watch do Render (Cloudflare)

Esta pasta **não** é o deploy da API. O deploy da API Node continua no **Render** (`render.yaml` na raiz).

## O que é cada coisa

| Arquivo | Função |
|---------|--------|
| `render_sync_watch_worker.js` | **Cloudflare Worker** — mantém a API no Render acordada enquanto o sync roda |
| `wrangler.toml` | Config do Worker (cron a cada 5 min, KV `STATE`) |
| `orbe_sync_guard.py` | Script local/GitLab CI para start/stop/status do sync com segurança |
| `package.json` | Dependências do Worker (`wrangler`) |

## Fluxo

1. Sync longo dispara `POST /start` no Worker (header `x-sync-secret`).
2. Worker liga `watching=1` no KV e pinga `/api/health` + `/api/sync/status` a cada 5 min.
3. Quando o sync termina, o Worker desliga o watch — o Render pode hibernar de novo.

## Deploy do Worker

```bash
cd ops
npm install
npx wrangler deploy
```

Variáveis no Cloudflare (secrets):

- `SYNC_SECRET` — mesmo valor da API
- `ORBE_API_URL` — `https://orbe-7bu0.onrender.com` (opcional, já é o default)

## `render.yaml` (raiz do repo)

Blueprint do **Render** para subir a API Express (`api/`). O `startCommand` já roda `prisma migrate deploy`. Isso é independente do sync no Cloudflare.
