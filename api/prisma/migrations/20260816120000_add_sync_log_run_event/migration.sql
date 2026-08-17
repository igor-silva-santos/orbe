-- Log estruturado de sincronização: uma linha por execução (SyncLogRun, com summary
-- agregado por fase/ano/mês) e uma linha por evento granular (SyncLogEvent), pra permitir
-- navegar/filtrar por fase/ano/mês/categoria sem precisar ler um log de texto corrido.

CREATE TABLE IF NOT EXISTS "SyncLogRun" (
    "id" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'running',
    "trigger" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "totalEvents" INTEGER NOT NULL DEFAULT 0,
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "skipCount" INTEGER NOT NULL DEFAULT 0,
    "summary" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncLogRun_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "SyncLogRun_status_idx" ON "SyncLogRun"("status");
CREATE INDEX IF NOT EXISTS "SyncLogRun_startedAt_idx" ON "SyncLogRun"("startedAt");

CREATE TABLE IF NOT EXISTS "SyncLogEvent" (
    "id" BIGSERIAL NOT NULL,
    "runId" INTEGER NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "phase" TEXT,
    "year" INTEGER,
    "month" INTEGER,
    "mediaType" TEXT,
    "itemId" TEXT,
    "itemTitle" TEXT,
    "reason" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "SyncLogEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "SyncLogEvent_runId_category_idx" ON "SyncLogEvent"("runId", "category");
CREATE INDEX IF NOT EXISTS "SyncLogEvent_runId_phase_year_month_idx" ON "SyncLogEvent"("runId", "phase", "year", "month");
CREATE INDEX IF NOT EXISTS "SyncLogEvent_runId_level_idx" ON "SyncLogEvent"("runId", "level");

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'SyncLogEvent_runId_fkey'
  ) THEN
    ALTER TABLE "SyncLogEvent"
      ADD CONSTRAINT "SyncLogEvent_runId_fkey"
      FOREIGN KEY ("runId") REFERENCES "SyncLogRun"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
