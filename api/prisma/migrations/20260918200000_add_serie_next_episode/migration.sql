-- Próximo/último episódio de série (TMDB next_episode_to_air / last_episode_to_air)
ALTER TABLE "Serie" ADD COLUMN IF NOT EXISTS "nextEpisodeAirDate" TIMESTAMP(3);
ALTER TABLE "Serie" ADD COLUMN IF NOT EXISTS "nextEpisodeNumber" INTEGER;
ALTER TABLE "Serie" ADD COLUMN IF NOT EXISTS "nextEpisodeSeason" INTEGER;
ALTER TABLE "Serie" ADD COLUMN IF NOT EXISTS "lastEpisodeNumber" INTEGER;
ALTER TABLE "Serie" ADD COLUMN IF NOT EXISTS "lastEpisodeSeason" INTEGER;

CREATE INDEX IF NOT EXISTS "Serie_lastAirDate_idx" ON "Serie"("lastAirDate");
CREATE INDEX IF NOT EXISTS "Serie_nextEpisodeAirDate_idx" ON "Serie"("nextEpisodeAirDate");
