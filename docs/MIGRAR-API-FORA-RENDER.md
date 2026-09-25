# Migrar a API do Orbe para fora do Render (zero custo)

Guia operacional para hospedar a **API Express** (Prisma/Supabase, sync TMDB/IGDB, Puppeteer/detetive) **sem depender do free tier do Render** (5 GB/mês de egress, suspensão sem “reset manual”). O **frontend continua na Vercel**; só mudam o host da API e as variáveis que apontam para ela.

> **Sem cartão de crédito?** A Oracle Cloud pede cartão na verificação (sem cobrança no Always Free). Se você **não quer ou não confia** nisso, use **[`MIGRAR-API-SEM-CARTAO.md`](MIGRAR-API-SEM-CARTAO.md)** (PC + Cloudflare Tunnel + opcional sync no GitHub Actions).

> **Não precisa recriar o Render** para “limpar banda”. O caminho recomendado é **sair do Render** para a API e manter o Render suspenso ou apagado depois da migração. O PR [#170](https://github.com/igor-silva-santos/orbe/pull/170) reduz egress *enquanto* você ainda estiver no Render; **esta migração substitui** essa dependência do limite mensal.

---

## 1. Como o Orbe usa o Render hoje

| Artefato | Função |
|----------|--------|
| [`render.yaml`](../render.yaml) | Blueprint: serviço `orbe-api` (Node em `api/`, plano free), opcional `orbe-web` |
| [`api/Dockerfile`](../api/Dockerfile) / [`Dockerfile`](../Dockerfile) (raiz) | Imagem com **Chromium** para Puppeteer (detetive/ingresso) |
| [`api/railway.toml`](../api/railway.toml) | Alternativa Railway (não é o deploy atual principal) |
| **Vercel** `API_PROXY_ORIGIN` ou `NEXT_PUBLIC_API_URL` | [`frontend/next.config.mjs`](../frontend/next.config.mjs) faz rewrite `/api/*` → API Express |
| **GitHub** secret `ORBE_API_URL` | Workflows [`sync-daily.yml`](../.github/workflows/sync-daily.yml), backfill, keep-alive chamam a API via [`.github/scripts/orbe-render-api.sh`](../.github/scripts/orbe-render-api.sh) |
| **Supabase** | `DATABASE_URL` (pooler 6543) + `DIRECT_URL` (5432) — DB já está lá; só liberar IP da nova API |

Variáveis típicas da API: ver [`api/.env.example`](../api/.env.example) e tabela em [`PRODUCAO.md`](PRODUCAO.md).

---

## 2. Comparativo de opções **sem pagar** (API Node long-running)

### 2.1 Oracle Cloud — Always Free (VM + Docker) — **recomendado se aceitar verificação com cartão**

| Prós | Contras |
|------|---------|
| VM **sempre ligada** (within Always Free shapes: ex. Ampere A1 ou AMD Micro) | Cadastro Oracle; **cartão pedido para verificação** (sem cobrança no tier free); às vezes fila de capacity na região |
| **Sem teto de 5 GB/mês** como o Render free para egress da API | Você opera OS, updates, firewall |
| RAM/CPU suficientes para Chromium + sync longo | HTTPS: IP público + **Let's Encrypt** ou **Cloudflare Tunnel** (grátis) |
| Mesmo `Dockerfile` do repo (Chromium já incluso) | Supabase: adicionar IP público da VM nas restrições de rede |

**Impacto UX:** igual ou melhor que Render estável — sem cold start de 30–60 s do free tier, pode reativar detetive/crons sem `ORBE_EGRESS_SAVER`.

### 2.2 Fly.io / Railway (free ou trial)

| Prós | Contras |
|------|---------|
| Deploy simples (CLI) | **Free tier frágil**: créditos limitados, sleep, ou exige cartão |
| Docker nativo | Puppeteer + sync horas → fácil estourar quota ou ser desligado |
| | Railway free praticamente descontinuado para uso contínuo |

**Impacto UX:** imprevisível para sync domingo + checkpoint; não recomendado como única casa da API.

### 2.3 Só Vercel serverless para a API

O front já é Next na Vercel; a API é **Express monolítico** (`api/src/index.ts`): crons in-process, WebSocket, sync que roda **horas**, Puppeteer.

| Limitação Vercel | Efeito no Orbe |
|------------------|----------------|
| Timeout (10 s Hobby / 60 s Pro em serverless) | `run-sync-all` / detetive **morrem** no meio |
| Sem processo persistente | Crons internos e estado de sync em memória não confiáveis |
| Puppeteer | Tamanho e tempo inviáveis em função serverless padrão |

**Conclusão:** manter **um processo Node contínuo** fora da Vercel; o front só faz proxy.

### 2.4 Híbrido: API “leve” + sync só no GitHub Actions

| Prós | Contras |
|------|---------|
| API pequena em VM barata; GHA dispara `POST /api/run-sync-*` | O sync **ainda executa na API** (GHA só acorda e dispara); não elimina CPU/RAM na API |
| Egress do sync sai da VM, não do Render | Se a API estiver no Render, egress do sync **continua** contando no Render |

Útil como **complemento** (agendar sync no GHA — já existe), não como substituto de host. Com Oracle VM, GHA + API no mesmo host é o padrão atual do repo.

---

## 3. Recomendação única

**Sem cartão:** [`MIGRAR-API-SEM-CARTAO.md`](MIGRAR-API-SEM-CARTAO.md) — **PC + Cloudflare Tunnel** (plano B: sync no GitHub Actions).

**Com cartão só para verificação Oracle:** hospedar a API em uma **VM Oracle Cloud Always Free**, rodando o container do [`Dockerfile`](../Dockerfile) (raiz) ou [`api/Dockerfile`](../api/Dockerfile), com **systemd** ou **docker compose** para restart automático.

- Front: **Vercel** inalterado (só `API_PROXY_ORIGIN`).
- DB: **Supabase** inalterado.
- GitHub Actions: atualizar `ORBE_API_URL` para `https://sua-api.seudominio.com` (ou IP, se aceitar sem TLS nos testes internos).
- Render: após validar, **Suspend** ou **Delete** o Web Service `orbe-api` para não haver duas APIs nem surpresa de egress.

Opcional depois da migração: desligar modo conservador (`ORBE_EGRESS_SAVER`, `SYNC_SKIP_DETETIVE_PHASE`, etc.) se quiser detetive automático de novo.

---

## 4. Pré-requisitos (você, na UI)

1. Conta [Oracle Cloud](https://www.oracle.com/cloud/free/) (Always Free; **cartão pedido para verificação**, sem cobrança no tier free — se recusar, use [`MIGRAR-API-SEM-CARTAO.md`](MIGRAR-API-SEM-CARTAO.md)).
2. Acesso ao [Vercel](https://vercel.com) projeto `orbe` e ao [GitHub](https://github.com) repo `igor-silva-santos/orbe` (secrets).
3. [Supabase](https://supabase.com) → projeto Orbe → URLs e senha do Postgres (copiar do dashboard).
4. Domínio opcional mas recomendado (ex. `api.orbenerd.com`) — pode usar **Cloudflare Tunnel** sem abrir porta 443 na VM.

---

## 5. Passo a passo — Oracle VM

### 5.1 Criar a VM

1. Oracle Console → **Compute** → **Instances** → **Create instance**.
2. Nome: `orbe-api`.
3. **Image:** Ubuntu 22.04 ou 24.04.
4. **Shape:** Always Free eligible (ex. `VM.Standard.A1.Flex` 1 OCPU / 6 GB RAM, ou `VM.Standard.E2.1.Micro` se A1 indisponível).
5. **Networking:** VCN pública, assign **public IPv4**.
6. **SSH key:** gere e baixe a chave privada.
7. Create → anote o **IP público**.

### 5.2 Firewall (Oracle + SO)

**Security List (VCN):** ingress TCP **22** (seu IP), **80**, **443** (ou só 22 se usar Cloudflare Tunnel).

Na VM (após SSH):

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
# Persistir conforme documentação Ubuntu/oracle (iptables-persistent ou firewalld)
```

### 5.3 Instalar Docker na VM

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"
# logout/login e depois:
docker version
```

### 5.4 Clonar o repo e build

```bash
git clone https://github.com/igor-silva-santos/orbe.git
cd orbe
git checkout master
docker build -t orbe-api:latest -f Dockerfile .
```

### 5.5 Arquivo de ambiente na VM

Crie `/opt/orbe/api.env` (permissões `chmod 600`) com o mesmo conteúdo que você tinha no Render, ajustando:

| Variável | Valor na Oracle |
|----------|-----------------|
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `DATABASE_URL` / `DIRECT_URL` | Supabase (pooler + direto) |
| `JWT_SECRET` / `SYNC_SECRET` | **Copie do Render** ou gere novos (se gerar JWT novo, usuários precisam logar de novo) |
| `TMDB_API_KEY`, `IGDB_*` | Iguais ao Render |
| `CORS_ORIGIN` | `https://orbe-seven.vercel.app,https://orbenerd.com,http://localhost:3000` |
| `PUBLIC_API_URL` | URL pública final da API (HTTPS) — para webhooks IGDB se habilitar |
| `REDIS_URL` | Opcional (Upstash free) |
| `ORBE_EGRESS_SAVER` | **omitir ou `false`** — não precisa mais no Oracle |

**Migrations (uma vez), na VM:**

```bash
docker run --rm --env-file /opt/orbe/api.env orbe-api:latest \
  sh -c 'npx prisma migrate deploy'
# Use DIRECT_URL no env para migrate; se falhar via pooler, rode só com DIRECT_URL exportado.
```

### 5.6 Subir o container (produção)

```bash
docker run -d --name orbe-api --restart unless-stopped \
  --env-file /opt/orbe/api.env \
  -p 3001:3001 \
  orbe-api:latest
```

Ou use o script do repo (na VM, após clone):

```bash
chmod +x scripts/deploy-oracle.sh
sudo ORBE_ENV_FILE=/opt/orbe/api.env ./scripts/deploy-oracle.sh
```

### 5.7 HTTPS na frente da API

Escolha **uma**:

**A — Caddy ou Nginx + Let's Encrypt** (porta 443 na VM, DNS `A` apontando para o IP).

**B — Cloudflare Tunnel** (sem expor 443; grátis): instale `cloudflared`, tunnel para `localhost:3001`, hostname `api.seudominio.com`.

Teste:

```bash
curl -sS "https://SUA-URL-PUBLICA/api/health"
# Esperado: {"ok":true,...}
```

### 5.8 Supabase — liberar a API

Supabase Dashboard → **Project Settings** → **Database** → **Network restrictions** (ou Connection pooling):

- Adicione o **IP público** da VM Oracle (ou temporariamente `0.0.0.0/0` só para teste, depois restrinja).

---

## 6. Apontar Vercel e GitHub

### 6.1 Vercel

Settings → Environment Variables (Production):

```
API_PROXY_ORIGIN=https://SUA-URL-PUBLICA-DA-API
```

(Sem `/api` no final.)

Opcional, se algo no client usar URL absoluta:

```
NEXT_PUBLIC_API_URL=https://SUA-URL-PUBLICA-DA-API/api
NEXT_PUBLIC_WS_URL=wss://SUA-URL-PUBLICA-DA-API
```

**Deployments** → último deploy em `master` → **Redeploy**.

### 6.2 GitHub Actions

Settings → Secrets and variables → Actions:

| Secret | Valor |
|--------|--------|
| `ORBE_API_URL` | `https://SUA-URL-PUBLICA-DA-API` (sem barra final) |
| `SYNC_SECRET` | Igual ao da API |

O script `orbe-render-api.sh` continua válido; a detecção de suspensão Render simplesmente não dispara em host Oracle.

---

## 7. Desligar o Render

1. Confirme tráfego na nova API (logs Docker, `curl` health).
2. Render Dashboard → serviço `orbe-api` (ou hostname antigo) → **Suspend** ou **Delete**.
3. Não mantenha dois `ORBE_API_URL` / `API_PROXY_ORIGIN` apontando para hosts diferentes.

---

## 8. Checklist de validação

- [ ] `curl -sS "https://SUA-API/api/health"` → JSON `ok: true`, `db: true`
- [ ] `curl -sS "https://orbe-seven.vercel.app/api/homepage"` → JSON 200 (não HTML suspended)
- [ ] Login / perfil / admin (`ORBE_ADMIN_EMAILS` na env da API)
- [ ] GitHub Actions: workflow **Sync Diário** manual (`workflow_dispatch`) → passo health ok
- [ ] Browser: aba anônima ou unregister service worker se cache antigo
- [ ] Opcional: `cd frontend && npm run smoke:prod`

---

## 9. Operação contínua

| Tarefa | Como |
|--------|------|
| Atualizar código | `git pull` na VM → `docker build` → `scripts/deploy-oracle.sh` |
| Logs | `docker logs -f orbe-api` |
| Sync manual | `POST /api/run-sync-all` com header `x-sync-secret` (admin ou GHA) |
| Detetive | Com egress saver off: cron ou `POST /api/run-detetive` |
| Backup DB | Supabase (não na VM) |

---

## 10. Referências no repo

- Infra geral: [`INFRA-VERCEL-RENDER-REDE.md`](INFRA-VERCEL-RENDER-REDE.md)
- Egress Render (legado): [`RENDER-RECUPERAR-BANDA.md`](RENDER-RECUPERAR-BANDA.md)
- Produção / lista de envs: [`PRODUCAO.md`](PRODUCAO.md)
- Compose local (Postgres local): [`docker-compose.yml`](../docker-compose.yml) — **não** use em produção; use Supabase + script Oracle acima.

---

## Resumo executivo

| Pergunta | Resposta |
|----------|----------|
| Recriar Render para banda? | **Não.** Migre a API e desligue o serviço Render. |
| Onde hospedar de graça? | **Oracle VM** (com cartão na verificação) **ou** [**sem cartão**](MIGRAR-API-SEM-CARTAO.md): PC + Cloudflare Tunnel. |
| Front? | **Vercel** — só mudar `API_PROXY_ORIGIN` + redeploy. |
| Sync / Puppeteer? | Rodam na VM; GHA só dispara endpoints (como hoje). |
| PR #170? | Mitigação no Render; **migração remove** o problema de egress do Render. |
