-- Persiste se o filme tem localização pt-BR no TMDB (entrada BR ou título/sinopse pt-BR).
ALTER TABLE "Filme" ADD COLUMN "localizacaoPtBr" BOOLEAN;

CREATE INDEX "Filme_localizacaoPtBr_idx" ON "Filme"("localizacaoPtBr");
