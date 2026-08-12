-- IGDB `follows` (quantos usuários seguem o jogo) — sinal de popularidade real,
-- diferente de `rating` (nota de qualidade) e `hypes` (expectativa pré-lançamento).
ALTER TABLE "Jogo" ADD COLUMN "follows" INTEGER;
