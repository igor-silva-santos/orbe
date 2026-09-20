ALTER TABLE "WatchlistItem" ADD COLUMN IF NOT EXISTS "anilistId" INTEGER;
ALTER TABLE "WatchlistItem" ADD COLUMN IF NOT EXISTS "crunchyrollId" TEXT;

CREATE INDEX IF NOT EXISTS "WatchlistItem_userId_crunchyrollId_idx"
  ON "WatchlistItem"("userId", "crunchyrollId");
