# Render — recuperar após estourar os 5 GB de egress (free)

Este guia é **operacional** (painel Render, sem API key). Complementa [`INFRA-VERCEL-RENDER-REDE.md`](INFRA-VERCEL-RENDER-REDE.md) (Vercel + proxy corporativo).

## O que **não** existe

No Render **não há** botão “limpar banda”, “zerar egress” ou “resetar os 5 GB” manualmente.

**Recuperar** significa:

1. **Aguardar o reset do ciclo de billing** (conta free: cota mensal de egress; quando o novo período começa, o contador volta a zero).
2. No dashboard, confirmar em **Account → Billing / Usage** (ou **Workspace → Usage**) que o período atual já permite tráfego de saída de novo.
3. **Resume** do Web Service que ficou **Suspended** por excesso de egress (ou pagamento).
4. **Evitar repetir o pico** — variáveis `ORBE_EGRESS_SAVER`, workflows GitHub e crons documentados abaixo.

> Vercel Hobby também suspende por 5 GB de banda, mas é **métrica diferente** (CDN do front). Este doc foca no **egress do Web Service no Render** (API).

---

## Onde ver o **ciclo** (reset da banda)

No Render o contador de **Included Bandwidth** é **mensal por calendário**: zera no **dia 1 de cada mês** (horário UTC do painel). Não há botão de reset no meio do mês.

**Caminho no painel (igual à sua tela “Monthly Included Usage”):**

1. [dashboard.render.com](https://dashboard.render.com) → selecione o **workspace** (canto superior esquerdo, ex. Hobby).
2. Menu lateral → **Billing** (ícone de cartão / fatura).
3. Role até **Monthly Included Usage** — é aí que aparecem **Included Bandwidth** (5 GB no Hobby), **Free Instance Hours**, etc.

O Render **não costuma mostrar** uma linha tipo “renova em 03/10/2026” nessa página; a regra oficial é **início do mês**. Se hoje é 25/09 e você está em **5,77 GB / 5 GB**, o contador volta a **0 GB** quando virar **01/10** (e aí você pode **Resume** o serviço, se ainda estiver suspenso).

Uso por serviço (gráfico de egress): abra o Web Service → aba **Metrics** → gráfico **Outbound Bandwidth**.

Documentação: [Outbound bandwidth](https://render.com/docs/outbound-bandwidth), [Free tier](https://render.com/docs/free).

---

## Passo a passo na UI Render (sem API key)

### 1. Confirmar suspensão e uso

1. Acesse [dashboard.render.com](https://dashboard.render.com).
2. Workspace → **Billing** → **Monthly Included Usage** (bandwidth, instance hours).
3. Verifique **Included Bandwidth**: se ≥ 5 GB no ciclo atual, serviços free ficam suspensos até o **próximo dia 1** (sem cartão) ou até pagar o excedente.
4. Próximo reset: **primeiro dia do mês seguinte** (ver seção acima).

### 2. Serviço suspenso → Resume

1. **Dashboard** → serviço da API (ex.: `orbe-api` ou hostname antigo `orbe-7bu0`).
2. Se o status for **Suspended**, clique em **Resume** (ou **Restore service**).
3. Se o Resume falhar ou voltar a suspender em minutos, o ciclo de banda **ainda não resetou** — volte ao passo 1 e aguarde.

### 3. Validar que a API voltou (fora do browser)

No terminal (substitua pelo hostname **Live** do seu serviço):

```bash
curl -sSI "https://SEU-SERVICO.onrender.com/api/health" | rg -i 'HTTP/|x-render-routing'
curl -sS "https://SEU-SERVICO.onrender.com/api/health"
```

| Resultado | Significado |
|-----------|-------------|
| JSON `{"ok":true,...}` | API ok |
| Header `x-render-routing: suspend-by-user` | Ainda suspenso — Resume de novo após reset |
| HTML “Service Suspended” | Conta/serviço ainda bloqueado por banda ou billing |

### 4. Reapontar o front (Vercel)

1. [Vercel Dashboard](https://vercel.com) → projeto `orbe` → **Settings → Environment Variables**.
2. Confirme `API_PROXY_ORIGIN=https://SEU-SERVICO.onrender.com` (sem `/api` no final).
3. **Deployments** → último deploy em `master` → **Redeploy** (se mudou hostname).

### 5. GitHub Actions (não disparar sync em loop)

Enquanto a API estiver suspensa, workflows que chamam `run-sync-all` só geram **mais** tentativas inúteis.

- Workflows usam `.github/scripts/orbe-render-api.sh` para **sair em verde** se detectar suspensão.
- **Não** habilite `ORBE_BACKFILL_CRON_ENABLED` nem `ORBE_KEEP_ALIVE_ENABLED` (repo variables) até a API estar estável.
- Sync diário: retoma checkpoint qualquer dia; **sync completo do ano só domingo (UTC)**.

### 6. Depois do Resume — checklist rápido

- [ ] Usage Render abaixo do limite **ou** novo ciclo iniciado
- [ ] Serviço **Live** + `curl` JSON em `/api/health`
- [ ] Vercel: `API_PROXY_ORIGIN` correto + redeploy se necessário
- [ ] `curl https://orbe-seven.vercel.app/api/homepage` → JSON 200
- [ ] Render env: `ORBE_EGRESS_SAVER=true` (blueprint `render.yaml`) — detetive/backfill conservadores
- [ ] Opcional: rodar detetive manual `POST /api/run-detetive` com `x-sync-secret` quando quiser ícones ingresso

---

## Variáveis no Render (controle de sync / egress)

| Variável | Default no `render.yaml` | Efeito |
|----------|--------------------------|--------|
| `ORBE_EGRESS_SAVER` | `true` | Modo conservador (defaults abaixo) |
| `SYNC_SKIP_DETETIVE_PHASE` | `true` | Pula Puppeteer/ingresso no `run-sync-all` |
| `DISABLE_DETETIVE_CRON` | `true` | Não roda cron 03:00 do detetive |
| `DISABLE_BACKFILL_STEP` | `true` | Ignora backfill automático (GHA) |
| `DEALS_CRON_SCHEDULE` | `*/15 * * * *` | Promoções no Redis (era 1 min) |
| `DISABLE_DEALS_WARMUP_CRON` | (off) | `true` desliga warm-up de deals |
| `DISABLE_STEAM_PRICE_CRON` | (off) | `true` desliga refresh Steam diário |
| `DISABLE_SYNC_KEEPALIVE` | (off) | `true` desliga ping interno durante sync |
| `SYNC_KEEPALIVE_INTERVAL_MS` | — | Intervalo do ping durante sync (ms) |

Para **reativar** detetive no sync automático: `SYNC_SKIP_DETETIVE_PHASE=false` e `DISABLE_DETETIVE_CRON=false` (e avalie egress).

Secrets GitHub (Actions): `ORBE_API_URL`, `SYNC_SECRET` — mesmos do Render.

### Variáveis no GitHub (repo → Settings → Variables)

| Variável | Quando usar |
|----------|-------------|
| `ORBE_KEEP_ALIVE_ENABLED` | `true` só se precisar manter API 24h acordada (custa egress) |
| `ORBE_BACKFILL_CRON_ENABLED` | `true` só para backfill histórico noturno consciente |

---

## O que mais consome egress na API

- Sync TMDB/IGDB longo + respostas JSON grandes para o front via proxy.
- Detetive (Puppeteer) e backfill multi-ano.
- Keep-alive 24/7 (workflow + pings durante sync).
- Crons muito frequentes (ex.: deals a cada minuto).

Mitigações já no repositório: ver PR de egress / `render.yaml` e workflows `sync-daily`, `keep-alive`, `sync-backfill`.
