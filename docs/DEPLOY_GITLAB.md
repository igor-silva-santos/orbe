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
5. O job **mirror:github** publica essa `master` em `github.com/igor-silva-santos/orbe`. Se o GitHub já tiver commits que o GitLab não tem, o job faz um merge e **não** reescreve a master de lá. Sem a variável `GITHUB_MIRROR_TOKEN`, o job falha e o GitHub fica para trás.

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
| `GITHUB_MIRROR_TOKEN` | Token do GitHub com escrita no repo `igor-silva-santos/orbe`. O job `mirror:github` usa isso para publicar a `master` no GitHub depois do merge. |

Com os dois hooks configurados, cada push na `master` roda `.gitlab-ci.yml` → testes da API → curl nos hooks.

**Integração Git nativa (sem hooks):** se Vercel e Render já estão conectados **apenas** ao GitLab e o GitHub não dispara deploy, defina no GitLab CI/CD a variável `ORBE_NATIVE_GITLAB_DEPLOY` = `true`. O job `deploy:production` só valida o pipeline; o build roda nos painéis dos hosts.

## 3. Pipeline (`.gitlab-ci.yml`)

| Job | Quando roda |
|-----|-------------|
| `test:api` | Push na `master`, merge requests |
| `deploy:production` | Push na `master` (após testes) |
| `mirror:github` | Push na `master` (após testes) e pipeline manual na `master`. Copia a `master` para o GitHub. Não faz deploy. |
| `orbe-sync-guard` | Schedule ou pipeline manual (`ORBE_OPS_ACTION`) |

**CI falhou com `libssl.so.1.1` / Prisma:** a imagem `node:20-bookworm-slim` precisa de `openssl` instalado antes de `prisma generate` (já está no `before_script` do `test:api`). Erro típico: 4 testes passam suites internas mas o job morre com `PrismaClientInitializationError`.

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

## 5. Espelho no GitHub

Cada push na `master` do GitLab roda `ops/mirror-github-master.sh`.

1. GitHub → token fine-grained só no repo `igor-silva-santos/orbe`, com **Contents** e **Workflows** em Read and write.
2. GitLab → **Settings** → **CI/CD** → **Variables** → `GITHUB_MIRROR_TOKEN` (Masked, Environment All).
   - Master protegida: marque **Protect variable**.
   - Master sem proteção: deixe **Protect variable** desmarcado. Ligado, o job recebe o token vazio.
3. Não cole o token no chat. Depois de salvar, rode de novo o pipeline da `master` (Run pipeline). O log do `mirror:github` termina com `OK: https://github.com/igor-silva-santos/orbe/commit/...`.

O deploy de produção continua no GitLab. O espelho só atualiza o GitHub.

## 6. Checklist rápido

- [ ] `master` no GitLab está à frente do que está em produção
- [ ] Vercel **não** faz deploy em push do GitHub
- [ ] Render **não** faz deploy em push do GitHub
- [ ] `RENDER_DEPLOY_HOOK` e `VERCEL_DEPLOY_HOOK` no GitLab **ou** GitLab conectado nos dois dashboards
- [ ] `GITHUB_MIRROR_TOKEN` definido no GitLab
- [ ] Pipeline verde após o merge na `master`, inclusive o job `mirror:github`
