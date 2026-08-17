-- Título pt-BR do TMDB para matching com ingresso.com
ALTER TABLE "Filme" ADD COLUMN IF NOT EXISTS "tituloBr" TEXT;
