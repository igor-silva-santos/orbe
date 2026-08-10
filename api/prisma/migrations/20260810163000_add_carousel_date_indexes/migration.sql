-- Índices para consultas de carrossel por data/temporada
CREATE INDEX IF NOT EXISTS "Filme_releaseDate_idx" ON "Filme"("releaseDate");
CREATE INDEX IF NOT EXISTS "Serie_firstAirDate_idx" ON "Serie"("firstAirDate");
CREATE INDEX IF NOT EXISTS "Anime_seasonYear_season_idx" ON "Anime"("seasonYear", "season");
CREATE INDEX IF NOT EXISTS "Anime_startDate_idx" ON "Anime"("startDate");
CREATE INDEX IF NOT EXISTS "Jogo_firstReleaseDate_idx" ON "Jogo"("firstReleaseDate");
