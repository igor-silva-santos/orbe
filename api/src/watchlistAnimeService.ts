import type { WatchlistAnime } from '@prisma/client';
import { prisma } from './clients';
import { findExistingWatchlistItem, matchAnimeInCatalog } from './watchlistMatcher';
import {
  isNonNegativeInt,
  isPositiveInt,
  isStringWithMaxLength,
  isValidHttpUrl,
  isValidWatchlistStatus,
  type WatchlistStatus,
} from './validation';

export interface CrunchyrollImportPayload {
  sessionId?: string;
  crunchyrollId: string;
  title: string;
  titleAlt?: string;
  posterUrl?: string;
  crunchyrollUrl?: string;
  season?: number;
  episode?: number;
  totalEpisodes?: number;
  episodeDurationSec?: number;
  remainingTimeSec?: number;
  hasDub?: boolean;
  malId?: number;
  genres?: string[];
  note?: string;
  status?: WatchlistStatus;
  lists?: string[];
}

export interface WatchlistAnimeUpdatePayload {
  title?: string;
  titleAlt?: string;
  posterUrl?: string;
  crunchyrollUrl?: string;
  season?: number;
  episode?: number;
  totalEpisodes?: number;
  episodeDurationSec?: number;
  remainingTimeSec?: number;
  hasDub?: boolean;
  malId?: number;
  animeId?: number;
  genres?: string[];
  note?: string;
  status?: WatchlistStatus;
  lists?: string[];
}

const MAX_TITLE_LENGTH = 500;
const MAX_URL_LENGTH = 500;
const MAX_NOTE_LENGTH = 5000;
const MAX_LISTS = 50;

export function buildWatchlistAnimeId(crunchyrollId: string): string {
  return `cr:${crunchyrollId}`;
}

export function inferStatusFromProgress(
  episode: number,
  remainingTimeSec?: number | null
): WatchlistStatus {
  if (episode <= 0) return 'comecar';
  if (remainingTimeSec != null && remainingTimeSec > 0) return 'continuar';
  if (episode > 0) return 'seguir';
  return 'comecar';
}

export function inferListsFromProgress(episode: number): string[] {
  if (episode > 0) return ['meio'];
  return ['nc'];
}

export function validateCrunchyrollImportPayload(
  payload: unknown
): payload is CrunchyrollImportPayload {
  if (!payload || typeof payload !== 'object') return false;

  const item = payload as Record<string, unknown>;

  if (
    typeof item.crunchyrollId !== 'string' ||
    item.crunchyrollId.length === 0 ||
    item.crunchyrollId.length > 200
  ) {
    return false;
  }

  if (typeof item.title !== 'string' || item.title.trim().length < 1) return false;
  if (!isStringWithMaxLength(item.title, MAX_TITLE_LENGTH)) return false;
  if (item.titleAlt != null && !isStringWithMaxLength(item.titleAlt, MAX_TITLE_LENGTH)) return false;
  if (item.posterUrl != null && !isValidHttpUrl(item.posterUrl)) return false;
  if (item.crunchyrollUrl != null && !isValidHttpUrl(item.crunchyrollUrl)) return false;
  if (item.sessionId != null && !isStringWithMaxLength(item.sessionId, 200)) return false;
  if (item.note != null && !isStringWithMaxLength(item.note, MAX_NOTE_LENGTH)) return false;
  if (item.season != null && !isPositiveInt(item.season)) return false;
  if (item.episode != null && !isNonNegativeInt(item.episode)) return false;
  if (item.totalEpisodes != null && !isPositiveInt(item.totalEpisodes)) return false;
  if (item.episodeDurationSec != null && !isNonNegativeInt(item.episodeDurationSec)) return false;
  if (item.remainingTimeSec != null && !isNonNegativeInt(item.remainingTimeSec)) return false;
  if (item.malId != null && !isPositiveInt(item.malId)) return false;
  if (item.status != null && !isValidWatchlistStatus(item.status)) return false;

  if (item.lists != null) {
    if (!Array.isArray(item.lists) || item.lists.length > MAX_LISTS) return false;
    if (!item.lists.every((entry) => isStringWithMaxLength(entry, 100))) return false;
  }

  if (item.genres != null) {
    if (!Array.isArray(item.genres) || item.genres.length > MAX_LISTS) return false;
    if (!item.genres.every((entry) => isStringWithMaxLength(entry, 100))) return false;
  }

  return true;
}

export function validateWatchlistAnimeUpdatePayload(
  payload: unknown
): payload is WatchlistAnimeUpdatePayload {
  if (!payload || typeof payload !== 'object') return false;

  const item = payload as Record<string, unknown>;

  if (item.title != null && !isStringWithMaxLength(item.title, MAX_TITLE_LENGTH)) return false;
  if (item.titleAlt != null && !isStringWithMaxLength(item.titleAlt, MAX_TITLE_LENGTH)) return false;
  if (item.posterUrl != null && item.posterUrl !== '' && !isValidHttpUrl(item.posterUrl)) return false;
  if (item.crunchyrollUrl != null && item.crunchyrollUrl !== '' && !isValidHttpUrl(item.crunchyrollUrl)) return false;
  if (item.note != null && !isStringWithMaxLength(item.note, MAX_NOTE_LENGTH)) return false;
  if (item.season != null && !isPositiveInt(item.season)) return false;
  if (item.episode != null && !isNonNegativeInt(item.episode)) return false;
  if (item.totalEpisodes != null && !isPositiveInt(item.totalEpisodes)) return false;
  if (item.episodeDurationSec != null && !isNonNegativeInt(item.episodeDurationSec)) return false;
  if (item.remainingTimeSec != null && !isNonNegativeInt(item.remainingTimeSec)) return false;
  if (item.malId != null && !isPositiveInt(item.malId)) return false;
  if (item.animeId != null && !isPositiveInt(item.animeId)) return false;
  if (item.status != null && !isValidWatchlistStatus(item.status)) return false;

  if (item.lists != null) {
    if (!Array.isArray(item.lists) || item.lists.length > MAX_LISTS) return false;
    if (!item.lists.every((entry) => isStringWithMaxLength(entry, 100))) return false;
  }

  if (item.genres != null) {
    if (!Array.isArray(item.genres) || item.genres.length > MAX_LISTS) return false;
    if (!item.genres.every((entry) => isStringWithMaxLength(entry, 100))) return false;
  }

  return true;
}

export function mapImportPayloadToData(
  userId: number,
  payload: CrunchyrollImportPayload
) {
  const episode = payload.episode ?? 0;
  const remainingTimeSec = payload.remainingTimeSec ?? null;
  const status =
    payload.status ?? inferStatusFromProgress(episode, remainingTimeSec);
  const lists = payload.lists ?? inferListsFromProgress(episode);
  const now = new Date();

  return {
    id: buildWatchlistAnimeId(payload.crunchyrollId),
    userId,
    crunchyrollId: payload.crunchyrollId,
    crunchyrollUrl: payload.crunchyrollUrl ?? null,
    malId: payload.malId ?? null,
    title: payload.title.trim(),
    titleAlt: payload.titleAlt?.trim() ?? null,
    posterUrl: payload.posterUrl ?? null,
    genres: payload.genres ?? [],
    season: payload.season ?? 1,
    episode,
    totalEpisodes: payload.totalEpisodes ?? null,
    episodeDurationSec: payload.episodeDurationSec ?? null,
    remainingTimeSec,
    status,
    lists,
    hasDub: payload.hasDub ?? false,
    note: payload.note ?? null,
    source: 'crunchyroll_extension',
    importSessionId: payload.sessionId ?? null,
    isRemoved: false,
    lastSyncedAt: now,
    updatedAt: now,
  };
}

export function serializeWatchlistAnime(item: WatchlistAnime) {
  return {
    id: item.id,
    crunchyrollId: item.crunchyrollId,
    crunchyrollUrl: item.crunchyrollUrl,
    malId: item.malId,
    animeId: item.animeId,
    title: item.title,
    titleAlt: item.titleAlt,
    posterUrl: item.posterUrl,
    genres: item.genres,
    season: item.season,
    episode: item.episode,
    totalEpisodes: item.totalEpisodes,
    episodeDurationSec: item.episodeDurationSec,
    remainingTimeSec: item.remainingTimeSec,
    status: item.status,
    lists: item.lists,
    hasDub: item.hasDub,
    note: item.note,
    source: item.source,
    importSessionId: item.importSessionId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    lastSyncedAt: item.lastSyncedAt,
  };
}

export async function upsertWatchlistImport(
  userId: number,
  payload: CrunchyrollImportPayload,
  options?: { animeId?: number | null; source?: string }
) {
  const resolvedAnimeId =
    options?.animeId !== undefined ? options.animeId : await matchAnimeInCatalog(payload.title);

  const mapped = mapImportPayloadToData(userId, payload);
  const { id: _ignoredId, ...dataWithoutId } = mapped;
  const data = {
    ...dataWithoutId,
    animeId: resolvedAnimeId,
    source: options?.source ?? mapped.source,
  };

  const existing = await findExistingWatchlistItem(userId, {
    crunchyrollId: payload.crunchyrollId,
    animeId: resolvedAnimeId,
    title: payload.title,
  });

  if (existing) {
    const duplicateByCr = await prisma.watchlistAnime.findUnique({
      where: {
        userId_crunchyrollId: { userId, crunchyrollId: payload.crunchyrollId },
      },
    });

    if (duplicateByCr && duplicateByCr.id !== existing.id) {
      await prisma.watchlistAnime.update({
        where: { id: duplicateByCr.id },
        data: { isRemoved: true, updatedAt: new Date() },
      });
    }

    const item = await prisma.watchlistAnime.update({
      where: { id: existing.id },
      data: {
        ...data,
        crunchyrollId: payload.crunchyrollId,
        isRemoved: false,
      },
    });

    return { item, action: 'updated' as const };
  }

  const item = await prisma.watchlistAnime.upsert({
    where: {
      userId_crunchyrollId: { userId, crunchyrollId: payload.crunchyrollId },
    },
    update: data,
    create: { ...mapped, animeId: resolvedAnimeId, createdAt: new Date() },
  });

  return { item, action: 'created' as const };
}

export async function replaceCrunchyrollExtensionItems(
  userId: number,
  syncedCrunchyrollIds: string[]
) {
  const validIds = syncedCrunchyrollIds.filter(
    (id): id is string => typeof id === 'string' && id.length > 0
  );

  if (validIds.length === 0) return 0;

  const result = await prisma.watchlistAnime.updateMany({
    where: {
      userId,
      isRemoved: false,
      source: 'crunchyroll_extension',
      crunchyrollId: { notIn: validIds },
    },
    data: { isRemoved: true, updatedAt: new Date() },
  });

  return result.count;
}
