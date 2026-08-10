# Sync inicial — catálogo e premiações

Após deploy da API no Render, popule o banco com estes comandos.

Substitua `SUA_API` e `SYNC_SECRET` pelos valores do dashboard Render.

## Windows (PowerShell)

No PowerShell, `export` e `curl` com flags (`-X`, `-H`, `-d`) **não funcionam** — `curl` é alias de `Invoke-WebRequest`. Use `Invoke-RestMethod`:

```powershell
$API_URL = "https://orbe-7bu0.onrender.com"
$SYNC_SECRET = "sua_chave_aqui"

# Catálogo completo
Invoke-RestMethod -Uri "$API_URL/api/run-sync-all" -Method POST `
  -Headers @{
    "Content-Type" = "application/json"
    "x-sync-secret" = $SYNC_SECRET
  } `
  -Body '{"startDate":"2025-01-01","endDate":"2026-12-31","startYear":2025,"endYear":2026}'

# Status (público)
Invoke-RestMethod -Uri "$API_URL/api/sync/status"

# Status detalhado
Invoke-RestMethod -Uri "$API_URL/api/sync/status" -Headers @{ "x-sync-secret" = $SYNC_SECRET }

# Premiações (depois do catálogo)
Invoke-RestMethod -Uri "$API_URL/api/run-sync-awards" -Method POST `
  -Headers @{ "x-sync-secret" = $SYNC_SECRET }

# Retomar após cold start / falha
Invoke-RestMethod -Uri "$API_URL/api/run-sync-resume" -Method POST `
  -Headers @{ "x-sync-secret" = $SYNC_SECRET }
```

Alternativa: abra **Git Bash** ou **WSL** e use os comandos `bash` abaixo.

## 1. Catálogo completo (recomendado)

```bash
export API_URL=https://orbe-7bu0.onrender.com
export SYNC_SECRET=sua_chave_aqui

curl -X POST "$API_URL/api/run-sync-all" \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: $SYNC_SECRET" \
  -d '{"startDate":"2025-01-01","endDate":"2026-12-31","startYear":2025,"endYear":2026}'
```

Resposta esperada: `202` — processo roda em background; monitore os **logs do Render**.

## 2. Por tipo (alternativa)

```bash
# Filmes
curl -X POST "$API_URL/api/run-sync" \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: $SYNC_SECRET" \
  -d '{"mediaType":"movies","startDate":"2025-01-01","endDate":"2026-12-31"}'

# Séries
curl -X POST "$API_URL/api/run-sync" \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: $SYNC_SECRET" \
  -d '{"mediaType":"series","startDate":"2025-01-01","endDate":"2026-12-31"}'

# Animes
curl -X POST "$API_URL/api/run-sync" \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: $SYNC_SECRET" \
  -d '{"mediaType":"animes","startYear":2025,"endYear":2026}'

# Jogos
curl -X POST "$API_URL/api/run-sync" \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: $SYNC_SECRET" \
  -d '{"mediaType":"games","startDate":"2025-01-01","endDate":"2026-12-31"}'
```

## 3. Premiações (após catálogo populado)

O migrate **não** insere premiações — este endpoint faz scrape e associa ao catálogo existente:

```bash
curl -X POST "$API_URL/api/run-sync-awards" \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: $SYNC_SECRET"
```

## 4. Monitorar progresso (cold start / falhas)

### Status público (sem secret)

```bash
curl -s "$API_URL/api/sync/status"
```

Campos importantes:

| Campo | Significado |
|-------|-------------|
| `syncActive` | Sync rodando agora |
| `stale` | Provável crash/cold start — sem progresso há 10+ min |
| `resumeAvailable` | Há checkpoint para retomar |
| `phase` | Fase atual (`filmes`, `series`, `animes`, `jogos`) |
| `progressPercent` | % da fase atual |
| `completedPhases` | Fases já concluídas no checkpoint |

### Detalhes completos (com secret)

```bash
curl -s "$API_URL/api/sync/status" -H "x-sync-secret: $SYNC_SECRET"
```

Inclui `detailed.lastError`, `animesResumeYear`, etc.

### Health com hint de sync

```bash
curl -s "$API_URL/api/health" -H "x-health-token: $HEALTH_CHECK_TOKEN"
```

## 5. Retomar após falha (sem recomeçar do zero)

Se o Render reiniciou (cold start) ou o sync quebrou:

```bash
# 1. Ver status
curl -s "$API_URL/api/sync/status" -H "x-sync-secret: $SYNC_SECRET"

# 2. Se stale=true, liberar lock preso
curl -X POST "$API_URL/api/sync/reset-stale" \
  -H "x-sync-secret: $SYNC_SECRET"

# 3. Retomar — pula fases já em completedPhases
curl -X POST "$API_URL/api/run-sync-resume" \
  -H "x-sync-secret: $SYNC_SECRET"
```

O checkpoint é salvo no Postgres (`AppSetting` / `sync_run`). Fases concluídas: `filmes` → `series` → `animes` (por ano) → `jogos`.

## 6. Validar dados

```bash
curl -s "$API_URL/api/health"
curl -s "$API_URL/api/premios" | head -c 500
curl -s "$API_URL/api/comments/filme/1"
```

## Notas

- Sync pode levar **horas** no plano free do Render; cold start **interrompe** o processo — use `run-sync-resume`.
- Logs no Render mostram ETA a cada ~2 min (`⏱️ [FILMES] ...`).
- Rode premiações **depois** do catálogo — o scraper busca títulos no DB.
- Comentários: tabela criada pela migration `20260810175000_add_comment_watchlist_user_profile`.
