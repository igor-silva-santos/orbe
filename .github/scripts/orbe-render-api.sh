#!/usr/bin/env bash
# Utilitário para workflows GitHub — evita loops quando o Render está suspenso (banda/plano).
set -euo pipefail

orbe_api_base() {
  local base="${ORBE_API_URL:-https://orbe-7bu0.onrender.com}"
  echo "${base%/}"
}

# 0 = ok | 78 = suspenso (não retentar) | 1 = falha
orbe_wait_health() {
  local api_base
  api_base="$(orbe_api_base)"
  echo "Aguardando ${api_base}/api/health ..."
  local i head body
  for i in $(seq 1 12); do
    head=$(curl -sSI "${api_base}/api/health" 2>/dev/null | tr -d '\r' || true)
    if echo "$head" | grep -qi 'x-render-routing:.*suspend'; then
      echo "::warning::Render suspenso (egress/plano). Não há botão de limpar banda — aguarde reset do ciclo e Resume no dashboard."
      return 78
    fi
    body=$(curl -sS "${api_base}/api/health" 2>/dev/null || true)
    if echo "$body" | python3 -c "import sys,json; json.load(sys.stdin)" 2>/dev/null; then
      if echo "$body" | grep -qi 'service suspended'; then
        echo "::warning::Resposta HTML de suspensão em /api/health — abortando workflow sem retentativas."
        return 78
      fi
      echo "API online (JSON)."
      return 0
    fi
    echo "Tentativa ${i}/12 — aguardando 10s..."
    sleep 10
  done
  echo "::error::API não respondeu JSON em 2 minutos."
  return 1
}

# Uso: orbe_curl_post PATH [json-body]
orbe_curl_post() {
  local api_base path payload http_code body
  api_base="$(orbe_api_base)"
  path="$1"
  payload="${2:-}"
  if [ -z "${SYNC_SECRET:-}" ]; then
    echo "::error::SYNC_SECRET não configurado."
    return 1
  fi
  if [ -n "$payload" ]; then
    RESPONSE=$(curl -sS -w "\n%{http_code}" -X POST "${api_base}${path}" \
      -H "x-sync-secret: ${SYNC_SECRET}" \
      -H "Content-Type: application/json" \
      -d "$payload")
  else
    RESPONSE=$(curl -sS -w "\n%{http_code}" -X POST "${api_base}${path}" \
      -H "x-sync-secret: ${SYNC_SECRET}" \
      -H "Content-Type: application/json")
  fi
  http_code=$(echo "$RESPONSE" | tail -n1)
  body=$(echo "$RESPONSE" | sed '$d')
  echo "HTTP ${http_code}"
  echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
  if echo "$body" | grep -qi 'service suspended'; then
    echo "::warning::API suspensa — não repetir sync neste ciclo."
    return 78
  fi
  if [ "$http_code" -lt 200 ] || [ "$http_code" -ge 300 ]; then
    return 1
  fi
  return 0
}
