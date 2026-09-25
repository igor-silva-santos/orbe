# Migrar a API do Orbe **sem cartão de crédito** (sem Oracle)

Guia para quem **não quer** (ou não pode) cadastrar cartão na Oracle Cloud, Fly.io, etc., mas ainda precisa sair do **Render free** (5 GB/mês de egress, suspensão).

O **frontend continua na Vercel**; o **banco continua no Supabase**. Só mudam onde roda o processo Node da API (Express + Puppeteer) e como o sync pesado é agendado.

---

## Resumo rápido

| Pergunta | Resposta |
|----------|----------|
| Precisa Oracle? | **Não.** Oracle Always Free é uma opção com VM 24/7, mas o cadastro **pede cartão** para verificação (sem cobrança no tier free). Se você não confia ou não tem cartão, use este guia. |
| Recomendação **principal** | **API em Docker no seu PC** + **Cloudflare Tunnel** (conta Cloudflare grátis, **sem cartão** na conta básica) → URL pública `https://api.seudominio.com`. |
| Plano **B** | **Sync no GitHub Actions** (roda o código do repo direto no runner, sem passar pelo Render) + mesma API no PC/tunnel **ou** API mínima só quando o PC estiver ligado. |
| Render só com API “leve”? | **Não resolve** egress se o sync continuar na API no Render. O sync precisa rodar **fora** do Render (PC ou GHA). |
| Workers / Vercel serverless? | **Não servem** para Express + sync de horas + Puppeteer (timeout, sem processo longo). |

---

## 1. Stack do Orbe (o que precisa de hospedagem)

| Peça | Onde fica |
|------|-----------|
| Next.js | Vercel (já está) |
| Postgres | Supabase (já está) |
| API Express | Hoje Render → **migrar** |
| Sync TMDB/IGDB + detetive (Puppeteer) | Hoje na API → **PC ou GHA** |
| Crons / `POST /api/run-sync-*` | GHA dispara HTTP **ou** workflow standalone no GHA |

Referência geral (inclui Oracle com cartão): [`MIGRAR-API-FORA-RENDER.md`](MIGRAR-API-FORA-RENDER.md).

---

## 2. Opções avaliadas (2025/2026) — honestidade

### 2.1 Cloudflare Tunnel + máquina sua — **recomendado (sem cartão)**

| Prós | Contras |
|------|---------|
| Conta Cloudflare **free**, tunnel **sem cartão** na prática | **PC (ou mini-PC) ligado** para a API responder 24/7 |
| Mesmo `Dockerfile` do repo (Chromium incluso) | Você cuida de updates, queda de luz, IP do provedor |
| **Sem teto de 5 GB** do Render na API | Supabase: liberar IP ou usar pooler (muitas vezes funciona sem whitelist rígida) |
| HTTPS automático no hostname do tunnel | Se o PC desligar, site fica offline (Vercel mostra erro no `/api/*`) |

**UX:** Melhor que Render suspenso; pior que datacenter 24/7 se o PC dormir. Dica: mini-PC ou notebook velho com **“nunca dormir”** no SO; sync de madrugada via GHA não exige PC ligado **se** você usar o plano B só para sync (mas leitura do app ainda precisa da API).

### 2.2 Híbrido: GitHub Actions (sync) + API no PC

| Prós | Contras |
|------|---------|
| Sync **não gasta egress do Render** | Job GHA free: **máx. 6 h** por execução — sync muito longo pode precisar **retomar** no dia seguinte (`resume`) |
| Runner do GitHub já tem Ubuntu; workflow instala Chromium | Secrets no GitHub: `DATABASE_URL`, `TMDB_API_KEY`, etc. (mesmo nível de cuidado que Render) |
| API no PC só atende usuários (menos CPU durante sync) | Dois lugares para monitorar (tunnel + Actions) |

Workflow no repo: [`.github/workflows/sync-standalone-gha.yml`](../.github/workflows/sync-standalone-gha.yml) — define `SYNC_RUNNER=github-actions`.

### 2.3 Cloudflare Workers / Pages

Bom para edge e assets; **não** rodam o monólito Express nem Puppeteer por horas. Não substituem a API atual.

### 2.4 Glitch, Deno Deploy, “PaaS free” genérico

- **Glitch**: ecossistema encolheu; apps dormem; inviável para API + Chromium.
- **Deno Deploy**: serverless, sem Puppeteer longo.
- **Railway / Fly.io**: free frágil ou **cartão obrigatório** (Fly).
- **Belmo / Velixir / SnapDeploy**: podem ser “sem cartão”, mas **dormem** ou têm RAM mínima — sync + Chromium **não confiáveis** como casa única.

### 2.5 Manter Render só para API read-light

Se o **sync** ainda roda no Render (mesmo disparado pelo GHA via HTTP), o **egress e CPU do sync continuam no Render**. Só faz sentido manter Render temporariamente com **`ORBE_EGRESS_SAVER`** e sync **desligado** na API — não é solução final.

---

## 3. Recomendação única (sem cartão)

**Hospedar a API no seu computador (Docker) e expor com Cloudflare Tunnel.**

1. PC/Linux ou Windows com WSL2 + Docker.
2. Container da API (`docker build` na raiz do repo).
3. `cloudflared` apontando `localhost:3001` → `api.seudominio.com` (domínio no Cloudflare free ou subdomínio `*.cfargotunnel.com` para testes).
4. Vercel: `API_PROXY_ORIGIN=https://api.seudominio.com`.
5. GitHub: `ORBE_API_URL` igual; workflows atuais continuam (ou migre sync para standalone GHA).

**O que você precisa ter:** conta **GitHub** (já tem), conta **Cloudflare** (email, sem cartão), **um PC** que pode ficar ligado a maior parte do tempo, secrets copiados do Render/Supabase.

---

## 4. Plano B (sem cartão): sync no GitHub Actions

Use quando o PC **não** aguenta sync + API ao mesmo tempo, ou para **não depender** do Render para o trabalho pesado.

1. Configure secrets no GitHub (ver workflow): `DATABASE_URL`, `DIRECT_URL`, `TMDB_API_KEY`, `IGDB_*`, etc.
2. Rode manualmente **Actions → Sync standalone (GitHub Actions)** ou deixe o cron (domingo/madrugada).
3. API no PC/tunnel continua servindo o app; durante o sync no GHA, evite disparar outro sync pela API ao mesmo tempo (lock no Postgres).

Se o job passar de **6 horas**, o workflow falha mas o **checkpoint no banco** permite `resume` na próxima execução.

---

## 5. Passo a passo — Cloudflare Tunnel + Docker (UI simples)

> **Cursor + MCP:** para configurar os servidores MCP oficiais da Cloudflare no Cursor (OAuth no seu navegador) e alinhar com o [prompt de agent setup](https://developers.cloudflare.com/agent-setup/prompt.md), veja [`CLOUDFLARE-AGENT-SETUP.md`](CLOUDFLARE-AGENT-SETUP.md). Isso **complementa** o tunnel abaixo; o `cloudflared` continua rodando no **seu PC**, não na VM do Cloud Agent.

### 5.1 Cloudflare (sem cartão)

1. Crie conta em [dash.cloudflare.com](https://dash.cloudflare.com/sign-up).
2. Adicione seu domínio **ou** use o hostname que o wizard do tunnel oferece.
3. **Zero Trust** (menu lateral) → **Networks** → **Tunnels** → **Create a tunnel**.
4. Nome: `orbe-api` → instale **cloudflared** no PC (o painel mostra o comando/token).
5. **Public Hostname**: `api.seudominio.com` → **Service** `http://localhost:3001`.
6. Salve. Anote a URL pública.

### 5.2 Docker no PC

```bash
git clone https://github.com/igor-silva-santos/orbe.git
cd orbe
docker build -t orbe-api:latest -f Dockerfile .
```

Crie `api.env` (não commitar) com as mesmas variáveis do Render — ver [`api/.env.example`](../api/.env.example) e [`PRODUCAO.md`](PRODUCAO.md). **Não** use `ORBE_EGRESS_SAVER` em casa.

```bash
docker run -d --name orbe-api --restart unless-stopped \
  --env-file ./api.env \
  -p 3001:3001 \
  orbe-api:latest
```

Migrations (uma vez), com `DIRECT_URL`:

```bash
docker run --rm --env-file ./api.env orbe-api:latest npx prisma migrate deploy
```

### 5.3 Vercel

Settings → Environment Variables (Production):

```
API_PROXY_ORIGIN=https://api.seudominio.com
```

Redeploy.

### 5.4 GitHub Actions

| Secret | Valor |
|--------|--------|
| `ORBE_API_URL` | `https://api.seudominio.com` |
| `SYNC_SECRET` | Igual ao da API |

Para sync standalone, adicione também os secrets listados no workflow `sync-standalone-gha.yml`.

### 5.5 Desligar Render

Depois de validar health e homepage na Vercel: Render → **Suspend** ou **Delete** `orbe-api`.

---

## 6. Checklist

- [ ] `curl -sS "https://api.seudominio.com/api/health"` → `ok: true`, `db: true`
- [ ] `https://orbe-seven.vercel.app/api/homepage` → JSON (não HTML suspended)
- [ ] Login / admin
- [ ] Sync: workflow **Sync Diário** ou **Sync standalone (GHA)** com sucesso
- [ ] PC configurado para não hibernar (ou aceitar offline à noite)

---

## 7. Comparação com Oracle

| | Oracle VM | PC + Cloudflare Tunnel |
|--|-----------|-------------------------|
| Cartão | Quase sempre pedido | **Não** (Cloudflare básico) |
| 24/7 | Sim (datacenter) | Depende do seu PC |
| Puppeteer / sync longo | Sim | Sim |
| Operação | SSH, firewall, updates | Docker + cloudflared |

Se no futuro você aceitar verificação com cartão na Oracle, o guia [`MIGRAR-API-FORA-RENDER.md`](MIGRAR-API-FORA-RENDER.md) e [`scripts/deploy-oracle.sh`](../scripts/deploy-oracle.sh) continuam válidos.

---

## 8. Referências

- Agent setup Cloudflare (MCP + skills): [`CLOUDFLARE-AGENT-SETUP.md`](CLOUDFLARE-AGENT-SETUP.md) · [prompt oficial](https://developers.cloudflare.com/agent-setup/prompt.md)
- Infra Vercel ↔ API: [`INFRA-VERCEL-RENDER-REDE.md`](INFRA-VERCEL-RENDER-REDE.md)
- Egress Render (legado): [`RENDER-RECUPERAR-BANDA.md`](RENDER-RECUPERAR-BANDA.md)
- Env produção: [`PRODUCAO.md`](PRODUCAO.md)
