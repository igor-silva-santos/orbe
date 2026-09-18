-- Próximo/último episódio de série (TMDB next_episode_to_air / last_episode_to_air)
ALTER TABLE "Serie" ADD COLUMN "nextEpisodeAirDate" TIMESTAMP(3);
ALTER TABLE "Serie" ADD COLUMN "nextEpisodeNumber" INTEGER;
ALTER TABLE "Serie" ADD COLUMN "nextEpisodeSeason" INTEGER;
ALTER TABLE "Serie" ADD COLUMN "lastEpisodeNumber" INTEGER;
ALTER TABLE "Serie" ADD COLUMN "lastEpisodeSeason" INTEGER;

CREATE INDEX "Serie_lastAirDate_idx" ON "Serie"("lastAirDate");
CREATE INDEX "Serie_nextEpisodeAirDate_idx" ON "Serie"("nextEpisodeAirDate");
