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

function optionalNonNegativeInt(value: unknown): number | undefined {
  if (value == null || value === '') return undefined;
  return safeNonNegativeInt(value);
}

function readHasDub(raw: Record<string, unknown>): boolean {
  if (typeof raw.hasDub === 'boolean') return raw.hasDub;
  if (raw.dub === true || raw.dub === 1) return true;
  if (typeof raw.dub === 'string') {
    const normalized = raw.dub.trim().toLowerCase();
    return normalized === '1' || normalized === 'true' || normalized === 'dub';
  }
  return false;
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
  const match = url.match(
    /crunchyroll\.com\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?(?:series|watch)\/([A-Z0-9]+)/i
  );
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

  const crunchyrollUrlRaw =
    typeof raw.cr === 'string'
      ? raw.cr
      : typeof raw.crunchyrollUrl === 'string'
        ? raw.crunchyrollUrl
        : undefined;
  const crunchyrollUrl =
    crunchyrollUrlRaw && isValidHttpUrl(crunchyrollUrlRaw) ? crunchyrollUrlRaw : undefined;

  const explicitId =
    typeof raw.crunchyrollId === 'string' && raw.crunchyrollId.trim()
      ? raw.crunchyrollId.trim()
      : undefined;
  const crunchyrollId =
    explicitId ||
    extractCrunchyrollId(crunchyrollUrlRaw) ||
    (raw.malId != null && isPositiveInt(Number(raw.malId))
      ? `mal:${raw.malId}`
      : raw.id != null && String(raw.id).trim()
        ? String(raw.id).trim()
        : undefined);

  if (!crunchyrollId) return null;

  const lists = Array.isArray(raw.lists)
    ? raw.lists
        .filter((entry): entry is string => typeof entry === 'string' && entry.length <= 100)
        .slice(0, 50)
    : undefined;
  const genres = Array.isArray(raw.genres)
    ? raw.genres
        .filter((entry): entry is string => typeof entry === 'string' && entry.length <= 100)
        .slice(0, 50)
    : undefined;

  const payload: CrunchyrollImportPayload = {
    crunchyrollId,
    title: title.trim(),
    crunchyrollUrl,
    posterUrl: safePosterUrl(raw.img ?? raw.posterUrl),
    season: safePositiveInt(raw.s ?? raw.season) ?? 1,
    episode: optionalNonNegativeInt(raw.ep ?? raw.episode) ?? 0,
    totalEpisodes: safePositiveInt(raw.tot ?? raw.totalEpisodes),
    episodeDurationSec: optionalNonNegativeInt(raw.episodeDurationSec),
    remainingTimeSec: optionalNonNegativeInt(raw.remainingTimeSec),
    hasDub: readHasDub(raw),
    status: safeStatus(raw.st ?? raw.status),
    lists: lists && lists.length > 0 ? lists : undefined,
    note: typeof raw.note === 'string' ? raw.note : undefined,
    malId:
      raw.malId != null && isPositiveInt(Number(raw.malId)) ? Number(raw.malId) : undefined,
  };

  if (typeof raw.titleAlt === 'string' && raw.titleAlt.trim()) {
    payload.titleAlt = raw.titleAlt.trim();
  }
  if (genres && genres.length > 0) {
    payload.genres = genres;
  }
  if (typeof raw.sessionId === 'string' && raw.sessionId.trim()) {
    payload.sessionId = raw.sessionId.trim();
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
