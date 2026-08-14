import type Redis from 'ioredis';
import { getRedisClient } from './redisClient';
import { logger } from './logger';

/** SCAN em vez de KEYS — KEYS bloqueia o Redis inteiro durante a varredura do keyspace. */
function scanKeys(client: Redis, pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const found: string[] = [];
    const stream = client.scanStream({ match: pattern, count: 100 });
    stream.on('data', (keys: string[]) => {
      found.push(...keys);
    });
    stream.on('end', () => resolve(found));
    stream.on('error', (err) => reject(err));
  });
}

/**
 * Invalida chaves Redis por padrão glob (ex: `cache:/api/homepage*`).
 */
export async function invalidateCacheByPatterns(patterns: string[]): Promise<void> {
  const redisClient = getRedisClient();
  if (!redisClient || patterns.length === 0) return;

  try {
    const keysToDelete = new Set<string>();

    for (const pattern of patterns) {
      const normalized = pattern.includes('*') ? pattern : `${pattern}*`;
      const keys = await scanKeys(redisClient, normalized);
      keys.forEach((key) => keysToDelete.add(key));
    }

    if (keysToDelete.size === 0) return;

    await redisClient.del(...Array.from(keysToDelete));
    logger.info(`Cache invalidado: ${keysToDelete.size} chave(s)`);
  } catch (err) {
    logger.error(`Erro ao invalidar cache: ${err}`);
  }
}

const SHARED_LIST_PATTERNS = [
  'cache:/api/homepage*',
  'cache:/api/pesquisa*',
  'cache:/api/search*',
  'cache:/api/trending*',
];

const MEDIA_SYNC_PATTERNS: Record<'filmes' | 'series' | 'animes' | 'jogos', string[]> = {
  filmes: [
    'cache:/api/filmes*',
    'cache:/api/hoje*',
    ...SHARED_LIST_PATTERNS,
  ],
  series: [
    'cache:/api/series*',
    'cache:/api/hoje*',
    ...SHARED_LIST_PATTERNS,
  ],
  animes: [
    'cache:/api/animes*',
    'cache:/api/hoje*',
    ...SHARED_LIST_PATTERNS,
  ],
  jogos: [
    'cache:/api/jogos*',
    'cache:/api/eventos*',
    'cache:/api/hoje*',
    ...SHARED_LIST_PATTERNS,
  ],
};

export type CacheInvalidationScope = 'all' | 'homepage' | 'filmes' | 'series' | 'animes' | 'jogos' | 'eventos' | 'premios';

const CACHE_SCOPE_PATTERNS: Record<CacheInvalidationScope, string[]> = {
  all: [
    ...new Set([
      ...Object.values(MEDIA_SYNC_PATTERNS).flat(),
      'cache:/api/premios*',
      'cache:/api/eventos*',
    ]),
  ],
  homepage: ['cache:/api/homepage*', 'cache:/api/hoje*'],
  filmes: MEDIA_SYNC_PATTERNS.filmes,
  series: MEDIA_SYNC_PATTERNS.series,
  animes: MEDIA_SYNC_PATTERNS.animes,
  jogos: MEDIA_SYNC_PATTERNS.jogos,
  eventos: ['cache:/api/eventos*'],
  premios: ['cache:/api/premios*'],
};

export function getCacheInvalidationPatterns(scope: CacheInvalidationScope = 'all'): string[] {
  return CACHE_SCOPE_PATTERNS[scope] ?? CACHE_SCOPE_PATTERNS.all;
}

export async function invalidateCacheAfterMediaSync(
  mediaType: 'movies' | 'series' | 'animes' | 'games' | 'steam',
): Promise<void> {
  const key =
    mediaType === 'movies'
      ? 'filmes'
      : mediaType === 'games' || mediaType === 'steam'
        ? 'jogos'
        : mediaType;
  await invalidateCacheByPatterns(MEDIA_SYNC_PATTERNS[key]);
}

export function invalidationPatternsForMedia(
  type: 'filmes' | 'series' | 'jogos' | 'animes',
  id: string | number
): string[] {
  const patterns = [
    `cache:/api/${type}/${id}/details`,
    `cache:/api/${type}*`,
    `cache:/api/${type}/by-year*`,
    `cache:/api/${type}/by-month*`,
    `cache:/api/${type}/year-tbd*`,
    ...SHARED_LIST_PATTERNS,
  ];

  if (type === 'animes') {
    patterns.push('cache:/api/animes/by-season*');
  }

  if (type === 'jogos') {
    patterns.push('cache:/api/jogos/em-alta*');
  }

  return patterns;
}

export async function invalidateMediaCaches(
  type: 'filmes' | 'series' | 'jogos' | 'animes',
  id: string | number
): Promise<void> {
  await invalidateCacheByPatterns(invalidationPatternsForMedia(type, id));
}
