import crypto from 'crypto';
import { randomUUID } from 'crypto';
import { getRedisClient } from '../redisClient';
import { logger } from '../logger';
import { fetchEpicFreeGames, fetchEpicSaleGames } from './epicClient';
import { fetchGamerPowerGiveaways } from './gamerPowerClient';
import { fetchSteamDeals } from './steamDealsClient';
import { fetchCatalogSteamPromotions, enrichDealsWithOrbeLinks } from './catalogDealsClient';
import { fetchItchFreeGames, fetchItchOnSaleGames } from './itchClient';
import { fetchItadShopSales, isItadConfigured } from './itadClient';
import { filterDealsWithUrlReport } from './dealStoreUrl';
import {
  mergeRejectedSamples,
  recordDealsRefreshRun,
  type DealsFilterSummary,
  type DealsRejectedSample,
  type DealsUrlRejectReason,
} from './dealsLogger';
import { splitFreeDeals } from './freeTier';
import { dedupeDeals } from './dedupeDeals';
import { normalizeDealsList } from './normalizeDeals';
import { resolveUsdBrlRate } from './exchangeRate';
import type { DealsOverview, UnifiedDeal } from './types';

/** Tempo máximo servindo cache sem forçar refresh síncrono (fallback se o cron de 1 min falhar). */
export const DEALS_HARD_TTL_SECONDS = 60 * 2;
/** Após este intervalo, requests disparam revalidação em background (usuário não espera). */
export const DEALS_SOFT_TTL_SECONDS = 60;
const DEALS_REDIS_KEY = 'deals:overview:v2';
const DEALS_FINGERPRINT_KEY = 'deals:overview:fingerprint:v2';
const DEALS_FETCHED_AT_KEY = 'deals:overview:fetchedAt:v2';
const DEALS_LOCK_KEY = 'lock:deals:overview:refresh';
const DEALS_LOCK_TTL_SECONDS = 55;

/** Teto de páginas por fonte paginada. */
const DEALS_MAX_PAGES = 8;

/** Evita rebuscar tudo de novo se o cache já foi renovado há poucos segundos. */
const DEALS_MIN_REFRESH_INTERVAL_SECONDS = 45;

function sortTemporaryFree(deals: UnifiedDeal[]): UnifiedDeal[] {
  return [...deals].sort((a, b) => {
    const aEnd = a.endsAt ? Date.parse(a.endsAt) : Number.POSITIVE_INFINITY;
    const bEnd = b.endsAt ? Date.parse(b.endsAt) : Number.POSITIVE_INFINITY;
    if (aEnd !== bEnd) return aEnd - bEnd;
    return (b.dealRating ?? 0) - (a.dealRating ?? 0);
  });
}

function sortPermanentFree(deals: UnifiedDeal[]): UnifiedDeal[] {
  return [...deals].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
}

function sortSales(deals: UnifiedDeal[]): UnifiedDeal[] {
  return [...deals].sort((a, b) => {
    const ratingDiff = (b.dealRating ?? 0) - (a.dealRating ?? 0);
    if (ratingDiff !== 0) return ratingDiff;
    const discountDiff = (b.discountPercent ?? 0) - (a.discountPercent ?? 0);
    if (discountDiff !== 0) return discountDiff;
    return a.title.localeCompare(b.title, 'pt-BR');
  });
}

async function safeFetch<T>(fn: () => Promise<T[]>): Promise<{ items: T[]; error?: string }> {
  try {
    const items = await fn();
    return { items };
  } catch (error: any) {
    return { items: [], error: error?.message ?? 'Erro desconhecido' };
  }
}

function aggregateRejected(rejected: DealsRejectedSample[]) {
  const byReason: Record<DealsUrlRejectReason, number> = {
    empty: 0,
    invalid_url: 0,
    blocked_aggregator: 0,
    unofficial_host: 0,
  };
  const bySource: Record<string, number> = {};
  for (const sample of rejected) {
    byReason[sample.reason]++;
    bySource[sample.source] = (bySource[sample.source] ?? 0) + 1;
  }
  return {
    total: rejected.length,
    byReason,
    bySource,
    samples: rejected.slice(0, 80),
  };
}

/** Busca sempre nas APIs externas — uso interno do serviço de cache. */
export async function fetchDealsOverviewFresh(options?: { trigger?: string }): Promise<DealsOverview> {
  const trigger = options?.trigger ?? 'manual';
  const { rate: usdBrlRate, fetchedAt: usdBrlRateFetchedAt } = await resolveUsdBrlRate({
    forceRefresh: true,
  });

  const [epicFree, epicSales, gamerpower, steam, catalogoSteamRaw, itchFree, itchOnSale, itadDeals] =
    await Promise.all([
      safeFetch(fetchEpicFreeGames),
      safeFetch(fetchEpicSaleGames),
      safeFetch(() => fetchGamerPowerGiveaways()),
      safeFetch(fetchSteamDeals),
      safeFetch(fetchCatalogSteamPromotions),
      safeFetch(() => fetchItchFreeGames({ maxPages: DEALS_MAX_PAGES })),
      safeFetch(() => fetchItchOnSaleGames({ maxPages: DEALS_MAX_PAGES })),
      safeFetch(async () => {
        if (!isItadConfigured()) return [];
        return fetchItadShopSales();
      }),
    ]);

  const steamFree = steam.items.filter((deal) => deal.kind === 'free');
  const steamSales = steam.items.filter((deal) => deal.kind === 'sale');
  const itchTemporaryFree = itchOnSale.items.filter((deal) => deal.kind === 'free');
  const itchSales = itchOnSale.items.filter((deal) => deal.kind === 'sale');
  const itadTemporaryFree = itadDeals.items.filter((deal) => deal.kind === 'free');
  const itadSales = itadDeals.items.filter((deal) => deal.kind === 'sale');

  const rawBySource: Record<string, number> = {
    epic: epicFree.items.length + epicSales.items.length,
    gamerpower: gamerpower.items.length,
    steam: steam.items.length,
    itch: itchFree.items.length + itchOnSale.items.length,
    itad: itadDeals.items.length,
  };

  const gratisDeduped = await enrichDealsWithOrbeLinks(
    dedupeDeals([
      ...epicFree.items,
      ...gamerpower.items,
      ...steamFree,
      ...itchFree.items,
      ...itchTemporaryFree,
      ...itadTemporaryFree,
    ]),
  );
  const gratisFiltered = filterDealsWithUrlReport(gratisDeduped, 'gratis');

  const promocoesDeduped = await enrichDealsWithOrbeLinks(
    dedupeDeals([
      ...epicSales.items,
      ...itadSales,
      ...steamSales,
      ...itchSales,
    ]),
  );
  const promocoesFiltered = filterDealsWithUrlReport(promocoesDeduped, 'promocoes');

  const allRejected = mergeRejectedSamples(gratisFiltered.rejected, promocoesFiltered.rejected);

  const gratisAll = normalizeDealsList(gratisFiltered.accepted, usdBrlRate);

  const { temporarios: gratisTemporariosRaw, permanentes: gratisPermanentesRaw } =
    splitFreeDeals(gratisAll);

  const gratisTemporarios = sortTemporaryFree(gratisTemporariosRaw);
  const gratisPermanentes = sortPermanentFree(gratisPermanentesRaw);

  const catalogoSteam = normalizeDealsList(catalogoSteamRaw.items, usdBrlRate);

  const promocoes = sortSales(
    normalizeDealsList(promocoesFiltered.accepted, usdBrlRate),
  );

  const epicCount = epicFree.items.length + epicSales.items.length;

  const overview: DealsOverview = {
    fetchedAt: new Date().toISOString(),
    usdBrlRate,
    usdBrlRateFetchedAt,
    gratis: gratisAll,
    gratisTemporarios,
    gratisPermanentes,
    promocoes,
    catalogoSteam,
    sources: {
      epic: {
        ok: !epicFree.error && !epicSales.error,
        count: epicCount,
        error: epicFree.error ?? epicSales.error,
      },
      gamerpower: {
        ok: !gamerpower.error,
        count: gamerpower.items.length,
        error: gamerpower.error,
      },
      steam: { ok: !steam.error, count: steam.items.length, error: steam.error },
      orbe: { ok: !catalogoSteamRaw.error, count: catalogoSteam.length, error: catalogoSteamRaw.error },
      itch: {
        ok: !itchFree.error && !itchOnSale.error,
        count: itchFree.items.length + itchOnSale.items.length,
        error: itchFree.error ?? itchOnSale.error,
      },
      itad: {
        ok: isItadConfigured() ? !itadDeals.error : true,
        count: itadDeals.items.length,
        error: isItadConfigured() ? itadDeals.error ?? undefined : undefined,
      },
    },
  };

  const filterSummary: DealsFilterSummary = {
    rawBySource,
    afterDedupe: {
      gratis: gratisDeduped.length,
      promocoes: promocoesDeduped.length,
    },
    accepted: {
      gratis: gratisFiltered.accepted.length,
      promocoes: promocoesFiltered.accepted.length,
    },
    rejected: aggregateRejected(allRejected),
    finalCounts: {
      gratis: overview.gratis.length,
      gratisTemporarios: overview.gratisTemporarios.length,
      gratisPermanentes: overview.gratisPermanentes.length,
      promocoes: overview.promocoes.length,
      catalogoSteam: overview.catalogoSteam.length,
    },
    usdBrlRate,
  };

  const fingerprint = fingerprintDealsOverview(overview);
  await recordDealsRefreshRun({
    trigger,
    status: 'completed',
    fingerprint,
    summary: filterSummary,
  });

  return overview;
}

/** Fingerprint estável do conteúdo — detecta mudança real sem comparar JSON inteiro. */
export function fingerprintDealsOverview(overview: DealsOverview): string {
  const snapshot = (deals: UnifiedDeal[]) =>
    deals
      .map((d) =>
        [
          d.id,
          d.endsAt ?? '',
          d.salePrice ?? '',
          d.discountPercent ?? '',
          d.status ?? '',
        ].join('|'),
      )
      .sort()
      .join(';');

  const payload = [
    snapshot(overview.gratisTemporarios),
    snapshot(overview.gratisPermanentes),
    snapshot(overview.promocoes),
    snapshot(overview.catalogoSteam ?? []),
    overview.sources.epic.ok ? '1' : '0',
    overview.sources.gamerpower.ok ? '1' : '0',
    overview.sources.steam.ok ? '1' : '0',
    overview.sources.orbe?.ok ? '1' : '0',
    overview.sources.itch?.ok ? '1' : '0',
    overview.sources.itad?.ok ? '1' : '0',
    String(overview.usdBrlRate ?? ''),
    overview.usdBrlRateFetchedAt ?? '',
  ].join('::');

  return crypto.createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

async function readRedisCache(): Promise<CachedDealsEntry | null> {
  const redis = getRedisClient();
  if (!redis) return null;

  try {
    const [json, fingerprint, fetchedAt] = await redis.mget(
      DEALS_REDIS_KEY,
      DEALS_FINGERPRINT_KEY,
      DEALS_FETCHED_AT_KEY,
    );
    if (!json || !fingerprint || !fetchedAt) return null;

    const overview = JSON.parse(json) as DealsOverview;
    const fetchedAtMs = Date.parse(fetchedAt);
    if (!Number.isFinite(fetchedAtMs)) return null;

    return { overview, fingerprint, fetchedAtMs };
  } catch (error: any) {
    logger.warn(`[deals-cache] Erro ao ler Redis: ${error.message}`);
    return null;
  }
}

async function writeRedisCache(entry: CachedDealsEntry): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;

  const fetchedAtIso = new Date(entry.fetchedAtMs).toISOString();
  const json = JSON.stringify(entry.overview);

  await redis
    .multi()
    .set(DEALS_REDIS_KEY, json, 'EX', DEALS_HARD_TTL_SECONDS)
    .set(DEALS_FINGERPRINT_KEY, entry.fingerprint, 'EX', DEALS_HARD_TTL_SECONDS)
    .set(DEALS_FETCHED_AT_KEY, fetchedAtIso, 'EX', DEALS_HARD_TTL_SECONDS)
    .exec();

  memoryCache = entry;
}

async function acquireRefreshLock(): Promise<string | null> {
  const redis = getRedisClient();
  if (!redis) return randomUUID();

  const token = randomUUID();
  const got = await redis.set(DEALS_LOCK_KEY, token, 'EX', DEALS_LOCK_TTL_SECONDS, 'NX');
  return got === 'OK' ? token : null;
}

async function releaseRefreshLock(token: string): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;

  const script = `
    if redis.call("GET", KEYS[1]) == ARGV[1] then
      return redis.call("DEL", KEYS[1])
    else
      return 0
    end
  `;
  await redis.eval(script, 1, DEALS_LOCK_KEY, token);
}

export type DealsCacheRefreshResult = {
  updated: boolean;
  unchanged: boolean;
  fingerprint?: string;
  previousFingerprint?: string;
  error?: string;
};

type CachedDealsEntry = {
  overview: DealsOverview;
  fingerprint: string;
  fetchedAtMs: number;
};

let memoryCache: CachedDealsEntry | null = null;
let backgroundRefreshInFlight = false;

/**
 * Busca nas APIs, compara fingerprint e grava no Redis só se o conteúdo mudou
 * (ou se não há cache). Retorna imediatamente se outro processo já está renovando.
 */
export async function refreshDealsCache(options?: {
  reason?: string;
}): Promise<DealsCacheRefreshResult> {
  const lockToken = await acquireRefreshLock();
  if (!lockToken) {
    return { updated: false, unchanged: true };
  }

  try {
    const previous = (await readRedisCache()) ?? memoryCache;

    if (previous) {
      const ageSeconds = (Date.now() - previous.fetchedAtMs) / 1000;
      if (ageSeconds < DEALS_MIN_REFRESH_INTERVAL_SECONDS) {
        logger.info(
          `[deals-cache] Refresh (${options?.reason ?? 'refresh'}) pulado — cache renovado há ${Math.round(ageSeconds)}s.`,
        );
        return { updated: false, unchanged: true, fingerprint: previous.fingerprint };
      }
    }

    const fresh = await fetchDealsOverviewFresh({ trigger: options?.reason ?? 'refresh' });
    const fingerprint = fingerprintDealsOverview(fresh);

    if (previous && previous.fingerprint === fingerprint) {
      const entry: CachedDealsEntry = {
        overview: { ...fresh, fetchedAt: new Date(previous.fetchedAtMs).toISOString() },
        fingerprint,
        fetchedAtMs: previous.fetchedAtMs,
      };
      await writeRedisCache(entry);
      logger.info(
        `[deals-cache] Sem mudança (${options?.reason ?? 'refresh'}) — TTL renovado.`,
      );
      return {
        updated: false,
        unchanged: true,
        fingerprint,
        previousFingerprint: previous.fingerprint,
      };
    }

    const entry: CachedDealsEntry = {
      overview: fresh,
      fingerprint,
      fetchedAtMs: Date.now(),
    };
    await writeRedisCache(entry);

    logger.info(
      `[deals-cache] Cache atualizado (${options?.reason ?? 'refresh'}) — ` +
        `grátis: ${fresh.gratis.length} (${fresh.gratisTemporarios.length} temporários, ${fresh.gratisPermanentes.length} permanentes), promoções: ${fresh.promocoes.length}.`,
    );

    return {
      updated: true,
      unchanged: false,
      fingerprint,
      previousFingerprint: previous?.fingerprint,
    };
  } catch (error: any) {
    logger.error(`[deals-cache] Falha ao renovar: ${error.message}`);
    return { updated: false, unchanged: false, error: error.message };
  } finally {
    await releaseRefreshLock(lockToken);
  }
}

function triggerBackgroundRefresh(reason: string): void {
  if (backgroundRefreshInFlight) return;
  backgroundRefreshInFlight = true;

  void refreshDealsCache({ reason: `background:${reason}` })
    .catch((error) => {
      logger.warn(`[deals-cache] Background refresh falhou: ${error?.message ?? error}`);
    })
    .finally(() => {
      backgroundRefreshInFlight = false;
    });
}

function getCachedEntry(): CachedDealsEntry | null {
  if (memoryCache) return memoryCache;
  return null;
}

async function resolveCachedEntry(): Promise<CachedDealsEntry | null> {
  if (memoryCache) {
    const ageMs = Date.now() - memoryCache.fetchedAtMs;
    if (ageMs < DEALS_HARD_TTL_SECONDS * 1000) return memoryCache;
  }

  const redisEntry = await readRedisCache();
  if (redisEntry) {
    memoryCache = redisEntry;
    return redisEntry;
  }

  return null;
}

export type DealsOverviewMeta = {
  cacheAgeSeconds: number;
  fromCache: boolean;
  stale: boolean;
};

/**
 * Ponto único de leitura para todas as rotas /deals.
 * - Cache hit: resposta imediata, zero chamada externa.
 * - Após soft TTL: dispara refresh em background; se houver mudança, próximo hit já vê o novo.
 * - Após hard TTL ou sem cache: refresh síncrono.
 */
export async function getDealsOverview(): Promise<DealsOverview & { _meta?: DealsOverviewMeta }> {
  const cached = await resolveCachedEntry();
  const now = Date.now();

  if (cached) {
    const ageSeconds = Math.floor((now - cached.fetchedAtMs) / 1000);

    if (ageSeconds >= DEALS_SOFT_TTL_SECONDS) {
      triggerBackgroundRefresh('soft-ttl');
    }

    if (ageSeconds < DEALS_HARD_TTL_SECONDS) {
      return {
        ...cached.overview,
        _meta: { cacheAgeSeconds: ageSeconds, fromCache: true, stale: ageSeconds >= DEALS_SOFT_TTL_SECONDS },
      };
    }
  }

  const result = await refreshDealsCache({ reason: cached ? 'hard-ttl' : 'cold-start' });
  if (result.error && cached) {
    logger.warn('[deals-cache] Refresh falhou — servindo cache expirado.');
    return {
      ...cached.overview,
      _meta: {
        cacheAgeSeconds: Math.floor((now - cached.fetchedAtMs) / 1000),
        fromCache: true,
        stale: true,
      },
    };
  }

  const refreshed = (await resolveCachedEntry()) ?? getCachedEntry();
  if (refreshed) {
    return {
      ...refreshed.overview,
      _meta: {
        cacheAgeSeconds: Math.floor((Date.now() - refreshed.fetchedAtMs) / 1000),
        fromCache: !result.updated,
        stale: false,
      },
    };
  }

  const fresh = await fetchDealsOverviewFresh({ trigger: 'cold-start' });
  return { ...fresh, _meta: { cacheAgeSeconds: 0, fromCache: false, stale: false } };
}

/** Warm-up do cron — verifica mudanças sem bloquear usuários. */
export async function warmUpDealsCache(): Promise<DealsCacheRefreshResult> {
  return refreshDealsCache({ reason: 'cron' });
}

export async function fetchFreeDeals(): Promise<UnifiedDeal[]> {
  const overview = await getDealsOverview();
  return overview.gratis;
}

export async function fetchSaleDeals(): Promise<UnifiedDeal[]> {
  const overview = await getDealsOverview();
  return overview.promocoes;
}

export function paginateDeals<T>(items: T[], page: number, limit: number): {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
} {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 100) : 48;
  const start = (safePage - 1) * safeLimit;
  const slice = items.slice(start, start + safeLimit);
  return {
    items: slice,
    total: items.length,
    page: safePage,
    limit: safeLimit,
    hasMore: start + safeLimit < items.length,
  };
}

export function sourcesHealth(overview: DealsOverview): 'ok' | 'degraded' | 'critical' {
  const statuses = Object.values(overview.sources);
  const failed = statuses.filter((source) => !source.ok).length;
  if (failed === 0) return 'ok';
  if (failed >= statuses.length - 1) return 'critical';
  return 'degraded';
}

/** @deprecated Use getDealsOverview — mantido para compatibilidade interna. */
export async function fetchDealsOverview(): Promise<DealsOverview> {
  const { _meta, ...overview } = await getDealsOverview();
  void _meta;
  return overview;
}
