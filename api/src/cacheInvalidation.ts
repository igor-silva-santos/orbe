import redisClient from './redisClient';
import { logger } from './logger';

/**
 * Invalida chaves Redis por padrão glob (ex: `cache:/api/homepage*`).
 */
export async function invalidateCacheByPatterns(patterns: string[]): Promise<void> {
  if (!redisClient || patterns.length === 0) return;

  try {
    const keysToDelete = new Set<string>();

    for (const pattern of patterns) {
      const normalized = pattern.includes('*') ? pattern : `${pattern}*`;
      const keys = await redisClient.keys(normalized);
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
  'cache:/api/trending*',
];

export function invalidationPatternsForMedia(
  type: 'filmes' | 'series' | 'jogos' | 'animes',
  id: string | number
): string[] {
  const patterns = [
    `cache:/api/${type}/${id}/details`,
    `cache:/api/${type}*`,
    `cache:/api/${type}/by-year*`,
    `cache:/api/${type}/by-month*`,
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
