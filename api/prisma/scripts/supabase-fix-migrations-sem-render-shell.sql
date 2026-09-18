-- =============================================================================
-- Orbe: corrigir migrations SEM Render Shell (plano Free)
-- Rode no Supabase → SQL Editor → Run (uma vez)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1) Limpar TODAS as tentativas falhas de notifications_push (P3009)
-- -----------------------------------------------------------------------------
DELETE FROM "_prisma_migrations"
WHERE migration_name = '20260917180000_notifications_push'
  AND finished_at IS NULL;

-- -----------------------------------------------------------------------------
-- 2) Aplicar conteúdo da migration falha (idempotente)
-- -----------------------------------------------------------------------------
DELETE FROM "Notificacao" WHERE "usuario_id" IS NULL;

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Notificacao' AND column_name = 'usuario_id'
  ) THEN
    ALTER TABLE "Notificacao" ALTER COLUMN "usuario_id" SET NOT NULL;
  END IF;
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Notificacao.usuario_id SET NOT NULL ignorado: %', SQLERRM;
END $$;

ALTER TABLE "Notificacao" DROP CONSTRAINT IF EXISTS "Notificacao_usuario_id_fkey";

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Notificacao_usuario_id_fkey'
  ) THEN
    ALTER TABLE "Notificacao"
      ADD CONSTRAINT "Notificacao_usuario_id_fkey"
      FOREIGN KEY ("usuario_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "Notificacao_usuario_id_foi_visualizada_idx"
  ON "Notificacao"("usuario_id", "foi_visualizada");

CREATE TABLE IF NOT EXISTS "PushSubscription" (
  "id" SERIAL NOT NULL,
  "userId" INTEGER NOT NULL,
  "endpoint" VARCHAR(500) NOT NULL,
  "p256dh" VARCHAR(255) NOT NULL,
  "auth" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PushSubscription_endpoint_key" ON "PushSubscription"("endpoint");
CREATE INDEX IF NOT EXISTS "PushSubscription_userId_idx" ON "PushSubscription"("userId");

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'PushSubscription_userId_fkey'
  ) THEN
    ALTER TABLE "PushSubscription"
      ADD CONSTRAINT "PushSubscription_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 3) Watchlist Crunchyroll (repo: 20260918140000) — idempotente
-- -----------------------------------------------------------------------------
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

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'WatchlistImportSession_userId_fkey'
  ) THEN
    ALTER TABLE "WatchlistImportSession"
      ADD CONSTRAINT "WatchlistImportSession_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'WatchlistAnime_userId_fkey'
  ) THEN
    ALTER TABLE "WatchlistAnime"
      ADD CONSTRAINT "WatchlistAnime_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'WatchlistAnime_animeId_fkey'
  ) THEN
    ALTER TABLE "WatchlistAnime"
      ADD CONSTRAINT "WatchlistAnime_animeId_fkey"
      FOREIGN KEY ("animeId") REFERENCES "Anime"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 4) RLS em todas as tabelas public (Security Advisor)
-- -----------------------------------------------------------------------------
DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon, authenticated', tbl);
  END LOOP;
END $$;

-- -----------------------------------------------------------------------------
-- 5) Registrar migrations do repo como aplicadas (para Prisma não reclamar depois)
-- -----------------------------------------------------------------------------
INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
SELECT gen_random_uuid()::text, 'manual-supabase', NOW(), m.name, NULL, NULL, NOW(), 1
FROM (VALUES
  ('20260918140000_add_watchlist_anime_crunchyroll'),
  ('20260918150000_add_push_subscription'),
  ('20260918180000_enable_rls_supabase_api')
) AS m(name)
WHERE NOT EXISTS (
  SELECT 1 FROM "_prisma_migrations" pm
  WHERE pm.migration_name = m.name AND pm.finished_at IS NOT NULL
);

-- -----------------------------------------------------------------------------
-- 6) Conferência final
-- -----------------------------------------------------------------------------
SELECT migration_name, started_at, finished_at
FROM "_prisma_migrations"
WHERE finished_at IS NULL
ORDER BY started_at DESC;

SELECT migration_name, finished_at
FROM "_prisma_migrations"
WHERE migration_name LIKE '%watchlist%' OR migration_name LIKE '%push%' OR migration_name LIKE '%rls%'
ORDER BY started_at DESC;
