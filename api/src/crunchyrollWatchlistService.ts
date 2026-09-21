import {
  mapCrunchyrollToQueueStatus,
  parseCrunchyrollStatusLine,
  type PreferredAudio,
  type WatchlistQueueStatus,
} from './crunchyrollStatus';
import type { CrunchyrollCatalogSnapshot } from './crunchyrollCms';
import { resolveAnimeByTitleSmart } from './animeTitleMatch';

export type CrunchyrollScrapedItem = {
  crunchyrollId: string;
  title: string;
  statusLine: string;
  href: string;
  isPtBrDub?: boolean;
  catalog?: CrunchyrollCatalogSnapshot | null;
};

export type WatchlistCrMeta = {
  lineKind: string;
  preferredAudio: PreferredAudio;
  matchScore?: number;
  catalog?: CrunchyrollCatalogSnapshot | null;
};

export type CrunchyrollSyncItemPayload = {
  id: string;
  title: string;
  st: string;
  ep: number;
  season: number;
  dub: number;
  lists: string[];
  badgeLabel: string;
  malId?: number | null;
  anilistId?: number | null;
  crunchyrollId?: string;
  note?: string | null;
  crMeta?: WatchlistCrMeta;
  updatedAt?: number;
  _rm?: boolean;
};

export function recomputeQueueStatusFromRow(row: {
  st: string;
  season: number | null;
  ep: number | null;
  dub: number | null;
  badgeLabel: string | null;
  crMeta: unknown;
  anilistEpisodes?: number | null;
}): WatchlistQueueStatus {
  const meta = (row.crMeta ?? null) as WatchlistCrMeta | null;
  const parsed = row.badgeLabel ? parseCrunchyrollStatusLine(row.badgeLabel) : null;
  const kind = parsed?.kind ?? (meta?.lineKind as WatchlistQueueStatus) ?? 'comecar';
  const season = parsed?.season ?? row.season ?? 1;
  const episode = parsed?.episode ?? row.ep ?? 1;
  const preferredAudio: PreferredAudio =
    meta?.preferredAudio ?? (row.dub ? 'pt-BR' : 'sub');

  return mapCrunchyrollToQueueStatus({
    kind: kind as 'comecar' | 'continuar' | 'a_seguir' | 'assistir_de_novo',
    season,
    episode,
    catalogEpisodes: row.anilistEpisodes ?? null,
    preferredAudio,
    catalog: meta?.catalog ?? null,
  });
}

export async function buildWatchlistPayloadFromCrunchyroll(
  items: CrunchyrollScrapedItem[],
  options: { trackPtBrDub: boolean },
): Promise<CrunchyrollSyncItemPayload[]> {
  const seen = new Set<string>();
  const out: CrunchyrollSyncItemPayload[] = [];

  for (const row of items) {
    if (!row.crunchyrollId || seen.has(row.crunchyrollId)) continue;
    seen.add(row.crunchyrollId);

    const parsed = parseCrunchyrollStatusLine(row.statusLine);
    if (!parsed) continue;

    const preferredAudio: PreferredAudio =
      options.trackPtBrDub || row.isPtBrDub ? 'pt-BR' : 'sub';

    if (options.trackPtBrDub && !row.isPtBrDub && preferredAudio === 'pt-BR') {
      continue;
    }

    const match = await resolveAnimeByTitleSmart(row.title);
    const catalog = row.catalog ?? null;

    const queueStatus: WatchlistQueueStatus = mapCrunchyrollToQueueStatus({
      kind: parsed.kind,
      episode: parsed.episode,
      season: parsed.season,
      catalogEpisodes: match?.episodes ?? null,
      preferredAudio,
      catalog,
    });

    const crMeta: WatchlistCrMeta = {
      lineKind: parsed.kind,
      preferredAudio,
      matchScore: match?.score,
      catalog,
    };

    out.push({
      id: `cr:${row.crunchyrollId}`,
      title: row.title,
      st: queueStatus,
      ep: parsed.episode,
      season: parsed.season,
      dub: preferredAudio === 'pt-BR' ? 1 : 0,
      lists: ['crunchyroll', ...(preferredAudio === 'pt-BR' ? ['dub-pt-br'] : ['sub'])],
      badgeLabel: parsed.label,
      malId: match?.malId ?? null,
      anilistId: match?.anilistId ?? null,
      crunchyrollId: row.crunchyrollId,
      note: match ? `match:${match.titleRomaji}@${match.score.toFixed(2)}` : 'match:pending',
      crMeta,
      updatedAt: Date.now(),
    });
  }

  return out;
}
