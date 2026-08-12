#!/usr/bin/env bash
# Invalida o cache Redis da API sem rodar sync.
#
# Uso:
#   SYNC_SECRET=sua-chave API_URL=https://sua-api.onrender.com ./scripts/invalidate-cache.sh
#   SYNC_SECRET=sua-chave API_URL=https://sua-api.onrender.com ./scripts/invalidate-cache.sh homepage
#
# Escopos: all | homepage | filmes | series | animes | jogos | eventos | premios

set -euo pipefail

API_URL="${API_URL:-http://localhost:3001}"
SYNC_SECRET="${SYNC_SECRET:?Defina SYNC_SECRET (mesma variável do Render)}"
SCOPE="${1:-all}"

echo "Invalidando cache (escopo: ${SCOPE}) em ${API_URL} ..."

response="$(curl -sS -w "\n%{http_code}" -X POST "${API_URL}/api/sync/invalidate-cache" \
  -H "x-sync-secret: ${SYNC_SECRET}" \
  -H "Content-Type: application/json" \
  -d "{\"scope\":\"${SCOPE}\"}")"

http_code="$(echo "$response" | tail -n1)"
body="$(echo "$response" | sed '$d')"

echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"

if [[ "$http_code" -lt 200 || "$http_code" -ge 300 ]]; then
  echo "Erro HTTP ${http_code}" >&2
  exit 1
fi

echo "Cache invalidado com sucesso."
