#!/usr/bin/env bash
# Deploy da API Orbe em VM (Oracle Cloud ou similar) via Docker.
#
# Pré-requisitos na VM: git, Docker, arquivo de env com secrets de produção.
#
# Uso:
#   ORBE_ENV_FILE=/opt/orbe/api.env ./scripts/deploy-oracle.sh
#   ORBE_ENV_FILE=/opt/orbe/api.env ORBE_RUN_MIGRATE=1 ./scripts/deploy-oracle.sh
#
# Variáveis:
#   ORBE_ENV_FILE   — obrigatório; path do --env-file
#   ORBE_IMAGE      — default orbe-api:latest
#   ORBE_CONTAINER  — default orbe-api
#   ORBE_REPO_DIR   — default diretório pai deste script/../ (raiz do clone)
#   ORBE_RUN_MIGRATE — se "1", roda prisma migrate deploy antes do up

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPO_DIR="${ORBE_REPO_DIR:-$ROOT_DIR}"
ENV_FILE="${ORBE_ENV_FILE:-}"
IMAGE="${ORBE_IMAGE:-orbe-api:latest}"
CONTAINER="${ORBE_CONTAINER:-orbe-api}"

if [[ -z "$ENV_FILE" || ! -f "$ENV_FILE" ]]; then
  echo "Defina ORBE_ENV_FILE apontando para um arquivo existente (ex.: /opt/orbe/api.env)." >&2
  exit 1
fi

cd "$REPO_DIR"

echo "==> Build ${IMAGE} (Dockerfile na raiz)..."
docker build -t "$IMAGE" -f Dockerfile .

if [[ "${ORBE_RUN_MIGRATE:-}" == "1" ]]; then
  echo "==> prisma migrate deploy..."
  docker run --rm --env-file "$ENV_FILE" "$IMAGE" npx prisma migrate deploy
fi

if docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  echo "==> Parando container antigo ${CONTAINER}..."
  docker stop "$CONTAINER" >/dev/null 2>&1 || true
  docker rm "$CONTAINER" >/dev/null 2>&1 || true
fi

echo "==> Subindo ${CONTAINER} na porta 3001..."
docker run -d --name "$CONTAINER" --restart unless-stopped \
  --env-file "$ENV_FILE" \
  -p 3001:3001 \
  "$IMAGE"

echo "==> Health local (aguarde alguns segundos)..."
sleep 3
curl -sf "http://127.0.0.1:3001/api/health" | python3 -m json.tool || {
  echo "Health falhou — veja: docker logs ${CONTAINER}" >&2
  exit 1
}

echo "OK. Configure HTTPS (Caddy/Nginx/Cloudflare Tunnel) e aponte Vercel API_PROXY_ORIGIN."
