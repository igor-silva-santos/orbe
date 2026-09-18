#!/bin/sh
# Opcional: RUN_MIGRATIONS_ON_START=true + DIRECT_URL no Render para rodar migrate no boot.
# Padrão: só sobe a API (deploy estável). Migrate manual no Shell:
#   cd /app && DATABASE_URL="$DIRECT_URL" npx prisma migrate deploy
set -e

if [ "${RUN_MIGRATIONS_ON_START}" = "true" ] && [ -n "${DIRECT_URL}" ]; then
  DATABASE_URL="${DIRECT_URL}" npx prisma migrate deploy
fi

exec node dist/index.js
