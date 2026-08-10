# Sync inicial — catálogo e premiações

Após deploy da API no Render, popule o banco com estes comandos.

Substitua `SUA_API` e `SYNC_SECRET` pelos valores do dashboard Render.

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

## 4. Validar

```bash
curl -s "$API_URL/api/health"
curl -s "$API_URL/api/premios" | head -c 500
curl -s "$API_URL/api/comments/filme/1"
```

## Notas

- Sync pode levar **horas** no plano free do Render.
- Rode premiações **depois** do catálogo — o scraper busca títulos no DB.
- Comentários: tabela criada pela migration `20260810175000_add_comment_watchlist_user_profile`.
