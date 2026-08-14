-- Lançamentos com ano conhecido mas sem data de calendário (TBA / data a confirmar).
-- releaseDate/firstAirDate/firstReleaseDate permanecem null; não entram em by-month.

ALTER TABLE "Filme" ADD COLUMN "releaseYear" INTEGER;
ALTER TABLE "Serie" ADD COLUMN "releaseYear" INTEGER;
ALTER TABLE "Jogo" ADD COLUMN "releaseYear" INTEGER;

CREATE INDEX "Filme_releaseYear_idx" ON "Filme"("releaseYear");
CREATE INDEX "Serie_releaseYear_idx" ON "Serie"("releaseYear");
CREATE INDEX "Jogo_releaseYear_idx" ON "Jogo"("releaseYear");
