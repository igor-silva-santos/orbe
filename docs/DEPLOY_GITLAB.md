# Deploy só pelo GitLab

Produção (**Vercel** + **Render**) deve reagir apenas a atualizações em:

`https://gitlab.com/igordasilvasantos38/orbe` → branch **`master`**

O GitHub (`igor-silva-santos/orbe`) pode existir como espelho (sync, Actions de sync), mas **não** deve disparar deploy de app.

## Fluxo recomendado

1. Desenvolver e commitar na `master` (ou MR → merge na `master`).
2. **Commits com sua identidade** (não “Cursor Agent”):

```bash
git config user.name "igordasilvasantos38"
git config user.email "igordasilvasantos38@gmail.com"
# commit pelo terminal, ou: git commit --amend --reset-author
```

3. `git push origin master` (GitLab).
4. Pipeline GitLab: **test:api** → **deploy:production** (hooks) **ou** auto-deploy nativo GitLab nos hosts.
5. Espelhar no GitHub só se precisar: `git push github master` (sem deploy).

## Sync de catálogo (use GitLab, não GitHub Actions)

1. GitLab → **Build** → **Pipelines** → **Run pipeline** (branch `master`).
2. Variáveis:
   - `ORBE_OPS_ACTION` = `resume` (retomar checkpoint) ou `watch` (resume + ping até 50 min)
   - `SYNC_SECRET` = mesmo valor do Render (variável **masked** no GitLab CI/CD).
3. Job **orbe-sync-guard** chama `/api/run-sync-resume` na API.

Não use **Sync All** no GitHub Actions para o fluxo oficial — o GitHub é espelho/sync auxiliar.

## 1. Desligar deploy pelo GitHub

### Vercel

1. [Projeto orbe](https://vercel.com) → **Settings** → **Git**.
2. Se o repositório conectado for o **GitHub**, faça uma das opções:
   - **Preferido:** desconectar GitHub e **conectar o GitLab** (`igordasilvasantos38/orbe`), branch de produção `master`, Root Directory `frontend`.
   - **Alternativa:** manter o link mas desativar **Automatic Deployments** para pushes do GitHub; usar só **Deploy Hook** chamado pelo GitLab CI.
3. Crie um **Deploy Hook** (branch `master`) e copie a URL → variável `VERCEL_DEPLOY_HOOK` no GitLab.

### Render

1. [Dashboard Render](https://dashboard.render.com) → serviço **orbe-api**.
2. **Settings** → **Build & Deploy** → repositório deve ser **GitLab** `igordasilvasantos38/orbe`, branch `master`, root `api` (ou blueprint `render.yaml`).
3. Remova/desconecte deploy automático a partir do **GitHub**, se existir.
4. **Deploy Hook** → copie a URL → variável `RENDER_DEPLOY_HOOK` no GitLab.

## 2. Variáveis no GitLab

**Settings → CI/CD → Variables** (marcar como **Masked**):

| Variável | Uso |
|----------|-----|
| `RENDER_DEPLOY_HOOK` | POST dispara build/deploy da API |
| `VERCEL_DEPLOY_HOOK` | POST dispara build/deploy do frontend |

Com os dois hooks configurados, cada push na `master` roda `.gitlab-ci.yml` → testes da API → curl nos hooks.

**Integração Git nativa (sem hooks):** se Vercel e Render já estão conectados **apenas** ao GitLab e o GitHub não dispara deploy, defina no GitLab CI/CD a variável `ORBE_NATIVE_GITLAB_DEPLOY` = `true`. O job `deploy:production` só valida o pipeline; o build roda nos painéis dos hosts.

## 3. Pipeline (`.gitlab-ci.yml`)

| Job | Quando roda |
|-----|-------------|
| `test:api` | Push na `master`, merge requests |
| `deploy:production` | Push na `master` (após testes) |
| `orbe-sync-guard` | Schedule ou pipeline manual (`ORBE_OPS_ACTION`) |

Sync no GitHub Actions (**Sync All**, keep-alive, etc.) continua independente — não publica frontend/API.

## 4. Identidade Git (este repo)

```bash
git config user.name "igordasilvasantos38"
git config user.email "igordasilvasantos38@gmail.com"
```

Remotes típicos:

```bash
git remote -v
# origin  → gitlab.com/igordasilvasantos38/orbe.git
# github  → github.com/igor-silva-santos/orbe.git (espelho)
```

## 5. Checklist rápido

- [ ] `master` no GitLab está à frente do que está em produção
- [ ] Vercel **não** faz deploy em push do GitHub
- [ ] Render **não** faz deploy em push do GitHub
- [ ] `RENDER_DEPLOY_HOOK` e `VERCEL_DEPLOY_HOOK` no GitLab **ou** GitLab conectado nos dois dashboards
- [ ] Pipeline verde após `git push origin master`
