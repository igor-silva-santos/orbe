import { prisma } from './clients';
import type { CrunchyrollImportPayload } from './watchlistAnimeService';
import {
  isPositiveInt,
  isValidHttpUrl,
  isValidWatchlistStatus,
  type WatchlistStatus,
} from './validation';

function safePositiveInt(value: unknown): number | undefined {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : undefined;
}

function safeNonNegativeInt(value: unknown): number | undefined {
  const n = Number(value);
  return Number.isInteger(n) && n >= 0 ? n : undefined;
}

function safePosterUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value) return undefined;
  return isValidHttpUrl(value) ? value : undefined;
}

function safeStatus(value: unknown): WatchlistStatus | undefined {
  return isValidWatchlistStatus(value) ? value : undefined;
}

export function extractCrunchyrollId(url: unknown): string | null {
  if (typeof url !== 'string' || !url) return null;
  const match = url.match(/crunchyroll\.com\/(?:[a-z]{2}\/)?(?:series|watch)\/([A-Z0-9]+)/i);
  return match?.[1]?.toUpperCase() ?? null;
}

export function normalizeTitle(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, ' ');
}

export async function findExistingWatchlistItem(
  userId: number,
  criteria: { crunchyrollId?: string; animeId?: number | null; title?: string }
) {
  if (criteria.crunchyrollId) {
    const byCrId = await prisma.watchlistAnime.findUnique({
      where: { userId_crunchyrollId: { userId, crunchyrollId: criteria.crunchyrollId } },
    });
    if (byCrId && !byCrId.isRemoved) return byCrId;
  }

  if (criteria.animeId) {
    const byAnime = await prisma.watchlistAnime.findFirst({
      where: { userId, animeId: criteria.animeId, isRemoved: false },
    });
    if (byAnime) return byAnime;
  }

  if (criteria.title) {
    const normalized = normalizeTitle(criteria.title);
    const candidates = await prisma.watchlistAnime.findMany({
      where: { userId, isRemoved: false },
      take: 200,
      orderBy: { updatedAt: 'desc' },
    });
    const match = candidates.find((item) => normalizeTitle(item.title) === normalized);
    if (match) return match;
  }

  return null;
}

export async function matchAnimeInCatalog(title: string): Promise<number | null> {
  const trimmed = title.trim();
  if (!trimmed) return null;

  const anime = await prisma.anime.findFirst({
    where: {
      OR: [
        { titleRomaji: { contains: trimmed, mode: 'insensitive' } },
        { titleEnglish: { contains: trimmed, mode: 'insensitive' } },
        { titleNative: { contains: trimmed, mode: 'insensitive' } },
      ],
    },
    select: { id: true },
  });

  return anime?.id ?? null;
}

/**
 * Converte item do app watchlist standalone para o formato da API.
 * Campos legados: malId, title/q, ep, s, tot, dub, st, lists, note, cr.
 */
export function mapLegacyWatchlistItem(
  raw: Record<string, unknown>
): CrunchyrollImportPayload | null {
  const title =
    typeof raw.title === 'string'
      ? raw.title
      : typeof raw.q === 'string'
        ? raw.q
        : null;
  if (!title?.trim()) return null;

  const crunchyrollUrl =
    typeof raw.cr === 'string'
      ? raw.cr
      : typeof raw.crunchyrollUrl === 'string'
        ? raw.crunchyrollUrl
        : undefined;

  const crunchyrollId =
    (typeof raw.crunchyrollId === 'string' && raw.crunchyrollId.trim()
      ? raw.crunchyrollId.trim()
      : undefined) ||
    extractCrunchyrollId(crunchyrollUrl) ||
    (raw.malId != null && isPositiveInt(Number(raw.malId))
      ? `mal:${raw.malId}`
      : raw.id != null
        ? String(raw.id)
        : undefined);

  if (!crunchyrollId) return null;

  const payload: CrunchyrollImportPayload = {
    crunchyrollId,
    title: title.trim(),
    crunchyrollUrl,
    posterUrl: safePosterUrl(raw.img ?? raw.posterUrl),
    season: safePositiveInt(raw.s ?? raw.season) ?? 1,
    episode: safeNonNegativeInt(raw.ep ?? raw.episode) ?? 0,
    totalEpisodes: safePositiveInt(raw.tot ?? raw.totalEpisodes),
    hasDub: Boolean(raw.dub),
    status: safeStatus(raw.st ?? raw.status),
    lists: Array.isArray(raw.lists)
      ? raw.lists.filter((entry): entry is string => typeof entry === 'string')
      : undefined,
    note: typeof raw.note === 'string' ? raw.note : undefined,
    malId:
      raw.malId != null && isPositiveInt(Number(raw.malId)) ? Number(raw.malId) : undefined,
  };

  if (typeof raw.titleAlt === 'string') {
    payload.titleAlt = raw.titleAlt;
  }

  return payload;
}

export function enrichCrunchyrollId(
  payload: CrunchyrollImportPayload
): CrunchyrollImportPayload {
  if (payload.crunchyrollId?.trim()) return payload;

  const fromUrl = extractCrunchyrollId(payload.crunchyrollUrl);
  if (!fromUrl) return payload;

  return { ...payload, crunchyrollId: fromUrl };
}
