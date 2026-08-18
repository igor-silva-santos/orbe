-- Histórico de refresh de promoções — resumo de ofertas aceitas/rejeitadas por URL (persistente no DB).
CREATE TABLE IF NOT EXISTS "DealsLogRun" (
    "id" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'completed',
    "trigger" TEXT,
    "fingerprint" TEXT,
    "summary" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DealsLogRun_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "DealsLogRun_startedAt_idx" ON "DealsLogRun"("startedAt");
