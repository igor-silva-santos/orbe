# Render Docker — build context = repo root (api/ lives in subdirectory)
# Debian slim (not Alpine) — Prisma needs OpenSSL 3.x; Puppeteer uses system Chromium.
# Cache bust: 2026-08-10-render-openssl-v3 — force Render to rebuild (not use stale layers)
FROM node:20-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    libssl3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY api/package*.json ./
RUN npm install
COPY api/ .
RUN npx prisma generate
RUN npm run build

FROM node:20-slim
WORKDIR /app

# ARG before apt-get invalidates Docker layer cache when bumped
ARG RENDER_CACHE_BUST=2026-08-10-openssl-v3
RUN echo "Render cache bust: ${RENDER_CACHE_BUST}" \
    && apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    libssl3 \
    ca-certificates \
    chromium \
    fonts-liberation \
    libnss3 \
    libfreetype6 \
    libharfbuzz0b \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PRISMA_CLI_BINARY_TARGETS=debian-openssl-3.0.x

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Regenerate Prisma client with runtime OpenSSL present (fixes engine detection)
RUN npx prisma generate

EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
