-- Disponibilidade derivada do TMDB (cinema vs streaming)
ALTER TABLE "Filme" ADD COLUMN IF NOT EXISTS "estreia_cinema" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Filme" ADD COLUMN IF NOT EXISTS "estreia_streaming" BOOLEAN NOT NULL DEFAULT false;
