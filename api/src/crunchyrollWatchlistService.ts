import { prisma } from './clients';
import {
  mapCrunchyrollToQueueStatus,
  parseCrunchyrollStatusLine,
  type WatchlistQueueStatus,
} from './crunchyrollStatus';

export type CrunchyrollScrapedItem = {
  crunchyrollId: string;
  title: string;
  statusLine: string;
  href: string;
  isPtBrDub?: boolean;
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
  updatedAt?: number;
  _rm?: boolean;
};

async function resolveAnimeByTitle(title: string) {
  const trimmed = title.trim();
  if (!trimmed) return null;
  return prisma.anime.findFirst({
    where: {
      OR: [
        { titleRomaji: { equals: trimmed, mode: 'insensitive' } },
        { titleEnglish: { equals: trimmed, mode: 'insensitive' } },
        { titleNative: { equals: trimmed, mode: 'insensitive' } },
        { titleRomaji: { contains: trimmed, mode: 'insensitive' } },
        { titleEnglish: { contains: trimmed, mode: 'insensitive' } },
      ],
    },
    select: { anilistId: true, malId: true, episodes: true, titleRomaji: true },
    orderBy: { popularity: 'desc' },
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

    if (options.trackPtBrDub && !row.isPtBrDub) continue;

    const parsed = parseCrunchyrollStatusLine(row.statusLine);
    if (!parsed) continue;

    const anime = await resolveAnimeByTitle(row.title);
    const queueStatus: WatchlistQueueStatus = mapCrunchyrollToQueueStatus({
      kind: parsed.kind,
      episode: parsed.episode,
      season: parsed.season,
      catalogEpisodes: anime?.episodes ?? null,
      trackPtBrDub: options.trackPtBrDub,
      dubbedEpisodesAvailable: null,
    });

    out.push({
      id: `cr:${row.crunchyrollId}`,
      title: row.title,
      st: queueStatus,
      ep: parsed.episode,
      season: parsed.season,
      dub: options.trackPtBrDub || row.isPtBrDub ? 1 : 0,
      lists: ['crunchyroll', ...(options.trackPtBrDub ? ['dub-pt-br'] : [])],
      badgeLabel: parsed.label,
      malId: anime?.malId ?? null,
      anilistId: anime?.anilistId ?? null,
      crunchyrollId: row.crunchyrollId,
      note: anime ? `match:${anime.titleRomaji}` : 'match:pending',
      updatedAt: Date.now(),
    });
  }

  return out;
}
