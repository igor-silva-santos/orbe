-- Corrige P3009: migration falha do branch GitLab antigo (20260917180000_notifications_push).
-- Rodar no Supabase → SQL Editor (conexão direta, não pooler).
-- Depois: Render Shell → cd /app && DATABASE_URL="$DIRECT_URL" npx prisma migrate deploy

-- 1) Estado atual
SELECT migration_name, started_at, finished_at, rolled_back_at, LEFT(logs, 200) AS logs_preview
FROM "_prisma_migrations"
WHERE migration_name = '20260917180000_notifications_push'
   OR finished_at IS NULL;

-- 2) Aplicar objetos de forma idempotente (se a migration morreu no meio)
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

-- 3) Remover registro de migration falha (não existe mais no repo atual)
DELETE FROM "_prisma_migrations"
WHERE migration_name = '20260917180000_notifications_push'
  AND finished_at IS NULL;

-- 4) Confirmar
SELECT migration_name, started_at, finished_at
FROM "_prisma_migrations"
WHERE migration_name LIKE '%push%' OR migration_name LIKE '%notification%'
ORDER BY started_at DESC;
