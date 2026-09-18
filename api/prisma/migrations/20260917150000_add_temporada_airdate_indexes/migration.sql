-- CreateIndex
CREATE INDEX "Temporada_airDate_idx" ON "Temporada"("airDate");

-- CreateIndex
CREATE INDEX "Temporada_serieId_airDate_idx" ON "Temporada"("serieId", "airDate");
