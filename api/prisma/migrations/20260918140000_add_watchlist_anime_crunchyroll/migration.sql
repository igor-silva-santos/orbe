-- Watchlist pessoal de animes + sessões de importação (extensão Crunchyroll)

CREATE TABLE IF NOT EXISTS "WatchlistImportSession" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "source" VARCHAR(50) NOT NULL DEFAULT 'crunchyroll_extension',
    "status" VARCHAR(50) NOT NULL DEFAULT 'running',
    "totalExpected" INTEGER,
    "importedCount" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "WatchlistImportSession_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "WatchlistImportSession_userId_status_idx"
    ON "WatchlistImportSession"("userId", "status");

ALTER TABLE "WatchlistImportSession"
    ADD CONSTRAINT "WatchlistImportSession_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "WatchlistAnime" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "crunchyrollId" TEXT,
    "crunchyrollUrl" VARCHAR(500),
    "malId" INTEGER,
    "animeId" INTEGER,
    "title" VARCHAR(500) NOT NULL,
    "titleAlt" VARCHAR(500),
    "posterUrl" VARCHAR(500),
    "genres" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "season" INTEGER NOT NULL DEFAULT 1,
    "episode" INTEGER NOT NULL DEFAULT 0,
    "totalEpisodes" INTEGER,
    "episodeDurationSec" INTEGER,
    "remainingTimeSec" INTEGER,
    "status" VARCHAR(50) NOT NULL DEFAULT 'comecar',
    "lists" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "hasDub" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "source" VARCHAR(50) NOT NULL DEFAULT 'manual',
    "importSessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WatchlistAnime_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "WatchlistAnime_userId_crunchyrollId_key"
    ON "WatchlistAnime"("userId", "crunchyrollId");

CREATE INDEX IF NOT EXISTS "WatchlistAnime_userId_isRemoved_idx"
    ON "WatchlistAnime"("userId", "isRemoved");

CREATE INDEX IF NOT EXISTS "WatchlistAnime_userId_updatedAt_idx"
    ON "WatchlistAnime"("userId", "updatedAt");

ALTER TABLE "WatchlistAnime"
    ADD CONSTRAINT "WatchlistAnime_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WatchlistAnime"
    ADD CONSTRAINT "WatchlistAnime_animeId_fkey"
    FOREIGN KEY ("animeId") REFERENCES "Anime"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
