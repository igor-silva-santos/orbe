# Render Docker — build context = repo root (api/ lives in subdirectory)
FROM node:20-alpine AS builder
WORKDIR /app
COPY api/package*.json ./
RUN npm install
COPY api/ .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Puppeteer (Detetive Digital) no Alpine
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
