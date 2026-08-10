-- Perfil de usuário (colunas usadas por profileRoutes e comentários)
ALTER TABLE "public"."User" ADD COLUMN IF NOT EXISTS "nome" TEXT;
ALTER TABLE "public"."User" ADD COLUMN IF NOT EXISTS "bio" TEXT;
ALTER TABLE "public"."User" ADD COLUMN IF NOT EXISTS "avatar" TEXT;
ALTER TABLE "public"."User" ADD COLUMN IF NOT EXISTS "preferencias" JSONB;
ALTER TABLE "public"."User" ADD COLUMN IF NOT EXISTS "perfil_publico" BOOLEAN NOT NULL DEFAULT true;

-- Comentários em mídias
CREATE TABLE IF NOT EXISTS "public"."Comment" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "midia_id" INTEGER NOT NULL,
    "tipo_midia" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "spoiler" BOOLEAN NOT NULL DEFAULT false,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Comment_midia_id_tipo_midia_idx"
    ON "public"."Comment"("midia_id", "tipo_midia");

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Comment_usuario_id_fkey'
  ) THEN
    ALTER TABLE "public"."Comment"
      ADD CONSTRAINT "Comment_usuario_id_fkey"
      FOREIGN KEY ("usuario_id") REFERENCES "public"."User"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

-- Watchlist sincronizada
CREATE TABLE IF NOT EXISTS "public"."WatchlistItem" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "malId" INTEGER,
    "tmdbId" INTEGER,
    "title" TEXT,
    "ep" INTEGER,
    "season" INTEGER,
    "dub" INTEGER DEFAULT 0,
    "st" TEXT NOT NULL,
    "lists" TEXT[],
    "note" TEXT,
    "badge" TEXT,
    "badgeLabel" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WatchlistItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "WatchlistItem_userId_id_key"
    ON "public"."WatchlistItem"("userId", "id");

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'WatchlistItem_userId_fkey'
  ) THEN
    ALTER TABLE "public"."WatchlistItem"
      ADD CONSTRAINT "WatchlistItem_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "public"."User"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;
