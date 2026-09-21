function normalizeLocale(value) {
  return String(value ?? '').toLowerCase().replace('_', '-');
}

function episodeHasPtBrDubAudio(ep) {
  const versions = ep.versions ?? ep.episode_versions;
  if (Array.isArray(versions)) {
    return versions.some((v) => {
      const loc = normalizeLocale(v?.audio_locale ?? v?.locale ?? v?.audio_lang);
      return loc === 'pt-br' || loc === 'pt' || loc.startsWith('pt-') || loc.includes('por');
    });
  }
  const direct = normalizeLocale(ep.audio_locale);
  return direct === 'pt-br' || direct.startsWith('pt-');
}

function seasonNumberFromRow(season, fallback) {
  const n = season.season_number ?? season.number ?? fallback;
  const parsed = typeof n === 'number' ? n : parseInt(String(n), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function episodeNumberFromRow(ep) {
  const n = ep.episode_number ?? ep.episode ?? ep.sequence_number;
  const parsed = typeof n === 'number' ? n : parseInt(String(n), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function maxSeasonEpisode(a, b) {
  if (a.season !== b.season) return a.season > b.season ? a : b;
  return a.episode >= b.episode ? a : b;
}

export function buildCatalogFromSeasonEpisodes(seasonBlocks) {
  let subFrontier = null;
  let dubPtBrFrontier = null;
  let episodesSubCount = 0;
  let episodesDubPtBrCount = 0;

  seasonBlocks.forEach((block, index) => {
    const seasonNumber = seasonNumberFromRow(block.season, index + 1);
    for (const ep of block.episodes) {
      const episode = episodeNumberFromRow(ep);
      if (!episode) continue;
      const pos = { season: seasonNumber, episode };
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

const CMS_BASE = 'https://www.crunchyroll.com/content/v2/cms';

export async function fetchSeriesCatalog(seriesId) {
  try {
    const seasonsRes = await fetch(`${CMS_BASE}/series/${seriesId}/seasons?locale=pt-BR`, {
      credentials: 'include',
    });
    if (!seasonsRes.ok) return null;
    const seasonsJson = await seasonsRes.json();
    const seasons = seasonsJson.data ?? seasonsJson.items ?? [];
    const blocks = [];

    for (let i = 0; i < seasons.length; i++) {
      const season = seasons[i];
      const seasonId = season.id;
      if (!seasonId) continue;
      const epRes = await fetch(`${CMS_BASE}/seasons/${seasonId}/episodes?locale=pt-BR`, {
        credentials: 'include',
      });
      if (!epRes.ok) continue;
      const epJson = await epRes.json();
      blocks.push({
        season,
        episodes: epJson.data ?? epJson.items ?? [],
      });
    }

    return buildCatalogFromSeasonEpisodes(blocks);
  } catch {
    return null;
  }
}

export async function enrichItemsWithCatalog(items, { concurrency = 3 } = {}) {
  const out = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      const item = items[i];
      const catalog = await fetchSeriesCatalog(item.crunchyrollId);
      out[i] = { ...item, catalog };
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return out;
}
