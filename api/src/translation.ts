import { logger } from './logger';
import { getRedisClient } from './redisClient';

const memoryCache = new Map<string, string>();
const MAX_MEMORY_CACHE = 5000;
const CHUNK_SIZE = 450;

const englishIndicators =
  /\b(the|and|with|from|their|this|that|when|after|before|world|story|young|finds|must|against|his|her|into|through|while|where|which|will|would|could|should|about|years|life|death|family|friend|friends|battle|journey|discover|returns|begins|forces|fight|save|evil|power|secret|mysterious)\b/i;

const portugueseIndicators =
  /\b(de|da|do|das|dos|uma|um|para|com|que|não|nao|são|sao|está|esta|estão|estao|filme|série|serie|jogo|homem|mulher|anos|vida|mundo|história|historia|quando|depois|antes|sobre|entre|através|atraves|durante|também|tambem|ainda|onde|porque|porquê)\b/i;

const MYMEMORY_ERROR_PATTERNS = [
  /MYMEMORY\s+WARNING/i,
  /YOU\s+USED\s+ALL\s+AVAILABLE\s+FREE/i,
  /NEXT\s+AVAILABLE\s+IN/i,
  /TRANSLATED\.NET\/DOC\/USAGELIMITS/i,
  /VISIT\s+HTTPS?:\/\//i,
  /QUOTA\s+FINISHED/i,
  /INVALID\s+TARGET\s+LANGUAGE/i,
];

export const isTranslationError = (text: string): boolean =>
  MYMEMORY_ERROR_PATTERNS.some((pattern) => pattern.test(text));

const stripHtml = (text: string) =>
  text.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();

export const isLikelyPortuguese = (text: string | null | undefined): boolean => {
  if (!text || text.length < 8) return false;
  const cleaned = stripHtml(text);
  if (/[ãõáéíóúâêôç]/i.test(cleaned)) return true;
  return portugueseIndicators.test(cleaned);
};

export const isLikelyEnglish = (text: string | null | undefined): boolean => {
  if (!text || text.length < 8) return false;
  const cleaned = stripHtml(text);
  if (isLikelyPortuguese(cleaned)) return false;
  if (englishIndicators.test(cleaned)) return true;
  const latinLetters = cleaned.replace(/[^a-zA-Z]/g, '');
  if (latinLetters.length < 12) return false;
  return /^[\x20-\x7E]+$/.test(cleaned);
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const cacheGet = async (key: string): Promise<string | null> => {
  if (memoryCache.has(key)) return memoryCache.get(key)!;
  const redisClient = getRedisClient();
  if (redisClient) {
    try {
      const cached = await redisClient.get(`tr:pt:${key}`);
      if (cached) {
        memoryCache.set(key, cached);
        return cached;
      }
    } catch {
      /* ignore redis errors */
    }
  }
  return null;
};

const cacheSet = async (key: string, value: string) => {
  if (memoryCache.size >= MAX_MEMORY_CACHE) {
    const firstKey = memoryCache.keys().next().value;
    if (firstKey) memoryCache.delete(firstKey);
  }
  memoryCache.set(key, value);
  const redisClient = getRedisClient();
  if (redisClient) {
    try {
      await redisClient.set(`tr:pt:${key}`, value, 'EX', 60 * 60 * 24 * 30);
    } catch {
      /* ignore redis errors */
    }
  }
};

const splitIntoChunks = (text: string): string[] => {
  if (text.length <= CHUNK_SIZE) return [text];

  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text];
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    const piece = sentence.trim();
    if (!piece) continue;
    if (`${current} ${piece}`.trim().length > CHUNK_SIZE && current) {
      chunks.push(current.trim());
      current = piece;
    } else {
      current = current ? `${current} ${piece}` : piece;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks.length > 0 ? chunks : [text.slice(0, CHUNK_SIZE)];
};

const translateChunk = async (text: string): Promise<string | null> => {
  const cleaned = stripHtml(text);
  if (!cleaned) return null;

  const cacheKey = cleaned.slice(0, 500);
  const cached = await cacheGet(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleaned.slice(0, 500))}&langpair=en|pt-BR`;
    const response = await fetch(url);
    const data = await response.json();
    const translated = data?.responseData?.translatedText as string | undefined;

    if (translated && translated !== cleaned && !isTranslationError(translated)) {
      await cacheSet(cacheKey, translated);
      await delay(100);
      return translated;
    }
  } catch (error) {
    logger.warn('Falha ao traduzir texto:', error);
  }

  return null;
};

export async function translateToPortuguese(text: string | null | undefined): Promise<string | null> {
  if (!text) return null;
  const cleaned = stripHtml(text);
  if (!cleaned) return null;
  if (!isLikelyEnglish(cleaned)) return cleaned;

  const chunks = splitIntoChunks(cleaned);
  const translatedParts: string[] = [];

  for (const chunk of chunks) {
    const part = await translateChunk(chunk);
    translatedParts.push(part && !isTranslationError(part) ? part : chunk);
  }

  const result = translatedParts.join(' ').trim();
  return result || cleaned;
}

/** Resolve sinopse em PT: prioriza TMDB pt → MyMemory → texto original */
export async function resolvePortugueseSynopsis(
  text: string | null | undefined,
  tmdbPtOverview?: string | null
): Promise<string | null> {
  if (tmdbPtOverview?.trim() && !isLikelyEnglish(tmdbPtOverview)) {
    return tmdbPtOverview.trim();
  }

  if (!text?.trim()) return tmdbPtOverview?.trim() || null;
  const cleaned = stripHtml(text);
  if (!cleaned) return tmdbPtOverview?.trim() || null;

  if (!isLikelyEnglish(cleaned)) return cleaned;

  const translated = await translateToPortuguese(cleaned);
  if (translated && !isTranslationError(translated)) return translated;

  return tmdbPtOverview?.trim() || cleaned;
}

/** Traduz sinopse para persistência no banco (sync) */
export async function translateSynopsisForStorage(
  text: string | null | undefined,
  options?: { tmdbId?: number; mediaType?: 'movie' | 'tv' }
): Promise<string | null | undefined> {
  if (!text?.trim()) return text;
  if (!isLikelyEnglish(text)) return text;

  let tmdbPt: string | null = null;
  if (options?.tmdbId && options?.mediaType) {
    const { fetchTmdbPtOverview } = await import('./tmdbOverview');
    tmdbPt = await fetchTmdbPtOverview(options.mediaType, options.tmdbId);
  }

  return resolvePortugueseSynopsis(text, tmdbPt);
}

export async function translateFields<T extends Record<string, unknown>>(
  item: T,
  fields: (keyof T)[]
): Promise<T> {
  const result = { ...item };
  for (const field of fields) {
    const value = item[field];
    if (typeof value === 'string') {
      const translated = await translateToPortuguese(value);
      if (translated && !isTranslationError(translated)) {
        (result as Record<string, unknown>)[field as string] = translated;
      }
    }
    if (Array.isArray(value)) {
      (result as Record<string, unknown>)[field as string] = await Promise.all(
        value.map(async (entry) => {
          if (typeof entry === 'string') {
            const translated = await translateToPortuguese(entry);
            if (translated && !isTranslationError(translated)) return translated;
            return entry;
          }
          return entry;
        })
      );
    }
  }
  return result;
}
