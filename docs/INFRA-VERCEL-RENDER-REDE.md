# Infra — Vercel, Render e rede corporativa

## O que está acontecendo (2026-09-25)

| Sintoma | Causa real | O que **não** é |
|--------|------------|------------------|
| Deploy Vercel falha / site estranho | **Workspace Hobby suspenso** — 5 GB de banda do mês esgotados | Bug do código do Orbe |
| `/api/*` retorna HTML “Service Suspended” | Vercel **ou** Render devolvem página de suspensão; o browser mostra erro no console | Só “sync” ou SW |
| Console com `microsoftonline.com` / CORS | **Proxy/VPN corporativa** redireciona HTTPS para SAML | Bug do Orbe em rede aberta |
| Render “deploy OK” no painel | Build passou; o serviço pode estar **Live** mas a **URL** que o front usa pode ser outra ou também suspensa | Deploy ≠ tráfego funcionando |

**Ordem para voltar a funcionar:** destravar **Vercel** → confirmar **Render** respondendo JSON → depois validar console no browser (SW novo).

---

## 1. Vercel — banda esgotada (prioridade 1)

Mensagem: *You’ve used the 5 GB of free bandwidth… Workspace suspended.*

### Opção A — Mais rápido (manter Vercel)

1. [Vercel Dashboard](https://vercel.com) → **Billing** → adicionar cartão.
2. Pagar uso extra (~**US$ 0,15/GB** acima de 5 GB) **ou** subir para **Pro** (25 GB inclusos).
3. Aguardar workspace **unsuspend** (minutos).
4. **Redeploy** do projeto `orbe` na branch `master` (Deployments → último → Redeploy).

### Opção B — Evitar estourar de novo (código já alinhado)

- `next.config.mjs`: **`images.unoptimized: true`** — posters TMDB/IGDB vão direto do CDN, sem pipeline `/_next/image` (principal vilão de banda no Hobby).
- Service worker: não cachear catálogo 24h (já na `master`).

### Opção C — Sair da Vercel no front (se não quiser cartão)

Hospedar só o **Next** em outro lugar e manter API no Render:

| Host | Banda free (ordem de grandeza) | Nota |
|------|-------------------------------|------|
| **Cloudflare Pages** + adapter | Generosa | Bom para projeto pessoal |
| **Render** Web Service (Docker `standalone`) | Incluído no plano do serviço | API + front no mesmo lugar |
| **Fly.io / Railway** | Ver plano | Mais ops |

Variáveis obrigatórias em qualquer host de front:

- `API_PROXY_ORIGIN=https://SEU-SERVICO.onrender.com` (sem `/api` no final)
- Ou `NEXT_PUBLIC_API_URL=https://SEU-SERVICO.onrender.com/api`

---

## 2. Render — API (e front opcional)

**Importante:** o repo usa `render.yaml` com serviço **`orbe-api`**. A URL antiga `orbe-7bu0.onrender.com` pode estar **suspensa** enquanto um serviço novo (`orbe-api.onrender.com`) responde outra coisa. No dashboard, copie o **hostname real** do Web Service **Live** e atualize:

- Vercel: `API_PROXY_ORIGIN`
- GitHub secret: `ORBE_API_URL`
- Extensão / docs se ainda apontarem para `orbe-7bu0`

**Cloud Agent:** para o agente operar o Render (deploy, env, logs), adicione o secret **`RENDER_API_KEY`** no Environment do Cursor (Render → Account Settings → API Keys). Sem isso o agente só testa URLs públicas.

Blueprint atualizado: serviço **`orbe-web`** (Docker do `frontend/`) na mesma conta — use quando a Vercel estiver suspensa.

1. Dashboard → serviço da API → status **Live** (não Suspended).
2. Teste **fora do browser** (terminal):

```bash
curl -sS "https://SEU-SERVICO.onrender.com/api/health"
```

Esperado: JSON `{"ok":true,...}`.  
Se vier HTML *Service Suspended*: conta Render suspensa (pagamento/plano) — reativar no painel.

3. Na **Vercel** (ou novo host do front), conferir que `API_PROXY_ORIGIN` aponta para **esse** hostname (ex.: `orbe-7bu0.onrender.com`).

4. **Keep-alive:** workflow `.github/workflows/keep-alive.yml` deve estar verde (evita cold start; não substitui serviço suspenso).

---

## 3. Rede corporativa (você sempre na VPN)

O Orbe **não deve** depender da rede Movida/JSL, mas **você** acessa de lá. Efeitos comuns:

| Console | O que fazer |
|---------|-------------|
| Redirect / CORS `login.microsoftonline.com` | Proxy corporativo. **Não há correção 100% no código** se o proxy intercepta `*.vercel.app`. Mitigações: (1) domínio próprio no front (ex. `orbe.seudominio.com`) às vezes não passa pelo mesmo filtro; (2) **split tunnel** na VPN só para o host do Orbe, se a política permitir; (3) tratar como **ruído** se `GET /api/homepage` na aba Network retorna **200 JSON** (ver `QA-CONSOLE-TRIAGEM.md`). |
| `WebSocket` falhou | Normal em produção (WS desligado). Ignorar se a UI carrega. |
| `sw.js` `no-response` TMDB | Após deploy + **Unregister** SW ou aba anônima. |

Regra prática: olhe **Network** → requisição para **mesma origem** `/api/...`. Se status **200** e JSON, o produto está ok; vermelho no console por SAML é **ambiente**.

---

## 4. Checklist “voltei a usar o Orbe”

- [ ] Vercel workspace ativo (ou front migrado e deploy verde)
- [ ] `curl …/api/health` no Render → JSON 200
- [ ] `curl https://orbe-seven.vercel.app/api/homepage` → JSON 200 (não HTML suspended)
- [ ] Browser: unregister SW ou anônimo
- [ ] `cd frontend && npm run smoke:prod` (opcional)
- [ ] Admin: `ORBE_ADMIN_EMAILS` no Render + login → `/admin`

---

## 5. Por que “console” e “lentidão” somem só depois disso

- Com Vercel suspensa, **rewrite `/api/*` quebra** → telas vazias, timeouts, muitos erros — parece lentidão.
- Com API no Render suspensa, mesmo efeito.
- Com infra ok, o código na `master` (SW, proxy `auth/me`, poll de sync) trata o restante; rede corporativa pode deixar **alguns** avisos que não impedem uso.

Ver também: `docs/SOLUCAO-CONSOLE-E-SYNC.md`, `docs/INFRA-SYNC-QA.md`.
