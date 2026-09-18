# Render Docker — build context = repo root (api/ lives in subdirectory)
# Debian slim (not Alpine) — Prisma needs OpenSSL 3.x; Puppeteer uses system Chromium.
# Cache bust: 2026-09-18-puppeteer-skip — force Render to rebuild (not use stale layers)
FROM node:20-slim AS builder
WORKDIR /app

# Evita download do Chromium no npm ci (detetive usa o do sistema no estágio final)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    libssl3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY api/package*.json ./
RUN npm ci
COPY api/ .
RUN npx prisma generate
RUN npm run build

# Stage separada so pra instalar as dependencies de producao (sem
# devDependencies como typescript, ts-node, nodemon e os @types/*).
# Usa o mesmo package.json/package-lock.json do builder pra gerar um
# node_modules enxuto que vai pro estagio final.
FROM node:20-slim AS prod-deps
WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY api/package*.json ./
RUN npm ci --omit=dev

FROM node:20-slim
WORKDIR /app

# ARG before apt-get invalidates Docker layer cache when bumped
ARG RENDER_CACHE_BUST=2026-09-18-puppeteer-skip
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
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Regenerate Prisma client with runtime OpenSSL present (fixes engine detection)
RUN npx prisma generate

EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
