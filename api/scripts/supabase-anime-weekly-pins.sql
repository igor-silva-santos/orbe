-- Rodar no SQL Editor do Supabase (produção) se migrate deploy local não for possível.
CREATE TABLE IF NOT EXISTS "AnimeWeeklyPin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "anilistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AnimeWeeklyPin_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "AnimeWeeklyPin_userId_idx" ON "AnimeWeeklyPin"("userId");

CREATE UNIQUE INDEX IF NOT EXISTS "AnimeWeeklyPin_userId_anilistId_key" ON "AnimeWeeklyPin"("userId", "anilistId");

DO $$ BEGIN
  ALTER TABLE "AnimeWeeklyPin" ADD CONSTRAINT "AnimeWeeklyPin_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
