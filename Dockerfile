# Render Docker — monorepo (contexto = raiz, código em api/)
# Baseado no deploy estável do GitLab: sem migrate no boot (evita P3009/pooler).
# Cache bust: 2026-09-18-stable-boot
FROM node:20-bookworm-slim AS builder
WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY api/package*.json ./
RUN npm ci

COPY api/prisma ./prisma
RUN npx prisma generate

COPY api/tsconfig.json ./
COPY api/src ./src
RUN npm run build

FROM node:20-bookworm-slim
WORKDIR /app

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PRISMA_CLI_BINARY_TARGETS=debian-openssl-3.0.x

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    chromium \
    fonts-liberation \
    libnss3 \
    libfreetype6 \
    libharfbuzz0b \
    && rm -rf /var/lib/apt/lists/*

COPY api/package*.json ./
RUN npm ci --omit=dev

COPY api/prisma ./prisma
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 3001
# Migrations: Render Shell → DATABASE_URL="$DIRECT_URL" npx prisma migrate deploy
CMD ["node", "dist/index.js"]
