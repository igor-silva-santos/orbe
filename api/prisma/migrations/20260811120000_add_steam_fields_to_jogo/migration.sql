-- Steam enrichment fields for PC games (trending, sales, specs)
ALTER TABLE "Jogo" ADD COLUMN IF NOT EXISTS "steamAppId" INTEGER;
ALTER TABLE "Jogo" ADD COLUMN IF NOT EXISTS "steamPlayerCount" INTEGER;
ALTER TABLE "Jogo" ADD COLUMN IF NOT EXISTS "steamPriceCents" INTEGER;
ALTER TABLE "Jogo" ADD COLUMN IF NOT EXISTS "steamDiscountPercent" INTEGER;
ALTER TABLE "Jogo" ADD COLUMN IF NOT EXISTS "pcRequirements" JSONB;
ALTER TABLE "Jogo" ADD COLUMN IF NOT EXISTS "steamSyncedAt" TIMESTAMP(3);

CREATE UNIQUE INDEX IF NOT EXISTS "Jogo_steamAppId_key" ON "Jogo"("steamAppId");
