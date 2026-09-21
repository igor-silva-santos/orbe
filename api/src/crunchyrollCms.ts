import { maxSeasonEpisode, type SeasonEpisode } from './animeFrontier';

export type CrunchyrollCatalogSnapshot = {
  subFrontier: SeasonEpisode | null;
  dubPtBrFrontier: SeasonEpisode | null;
  episodesSubCount: number;
  episodesDubPtBrCount: number;
};

function normalizeLocale(value: unknown): string {
  return String(value ?? '').toLowerCase().replace('_', '-');
}

export function episodeHasPtBrDubAudio(ep: Record<string, unknown>): boolean {
  const versions = (ep.versions ?? ep.episode_versions) as unknown;
  if (Array.isArray(versions)) {
    return versions.some((v) => {
      if (!v || typeof v !== 'object') return false;
      const row = v as Record<string, unknown>;
      const loc = normalizeLocale(row.audio_locale ?? row.locale ?? row.audio_lang);
      return loc === 'pt-br' || loc === 'pt' || loc.startsWith('pt-') || loc.includes('por');
    });
  }
  const direct = normalizeLocale(ep.audio_locale);
  return direct === 'pt-br' || direct.startsWith('pt-');
}

function seasonNumberFromRow(season: Record<string, unknown>, fallback: number): number {
  const n = season.season_number ?? season.number ?? fallback;
  const parsed = typeof n === 'number' ? n : parseInt(String(n), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function episodeNumberFromRow(ep: Record<string, unknown>): number | null {
  const n = ep.episode_number ?? ep.episode ?? ep.sequence_number;
  const parsed = typeof n === 'number' ? n : parseInt(String(n), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

/**
 * Agrega episódios de todas as temporadas retornadas pela CMS API da Crunchyroll.
 */
export function buildCatalogFromSeasonEpisodes(
  seasons: { season: Record<string, unknown>; episodes: Record<string, unknown>[] }[],
): CrunchyrollCatalogSnapshot {
  let subFrontier: SeasonEpisode | null = null;
  let dubPtBrFrontier: SeasonEpisode | null = null;
  let episodesSubCount = 0;
  let episodesDubPtBrCount = 0;

  seasons.forEach((block, index) => {
    const seasonNumber = seasonNumberFromRow(block.season, index + 1);
    for (const ep of block.episodes) {
      const episode = episodeNumberFromRow(ep);
      if (!episode) continue;
      const pos: SeasonEpisode = { season: seasonNumber, episode };
      episodesSubCount += 1;
      subFrontier = subFrontier ? maxSeasonEpisode(subFrontier, pos) : pos;
      if (episodeHasPtBrDubAudio(ep)) {
        episodesDubPtBrCount += 1;
        dubPtBrFrontier = dubPtBrFrontier ? maxSeasonEpisode(dubPtBrFrontier, pos) : pos;
      }
    }
  });

  return {
    subFrontier,
    dubPtBrFrontier,
    episodesSubCount,
    episodesDubPtBrCount,
  };
}
