import { logger } from './logger';

const cache = new Map<string, string>();
const MAX_CACHE = 5000;

const englishIndicators = /\b(the|and|with|from|their|this|that|when|after|before|world|story|young|finds|must|against)\b/i;

export const isLikelyEnglish = (text: string | null | undefined): boolean => {
  if (!text || text.length < 8) return false;
  const cleaned = text.replace(/<[^>]+>/g, '').trim();
  if (/[ãõáéíóúâêôç]/i.test(cleaned)) return false;
  return englishIndicators.test(cleaned) || /^[a-z0-9\s.,'";:!?()-]+$/i.test(cleaned);
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function translateToPortuguese(text: string | null | undefined): Promise<string | null> {
  if (!text) return null;

  const cleaned = text.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/__+/g, '').trim();
  if (!cleaned) return null;
  if (!isLikelyEnglish(cleaned)) return cleaned;

  const cacheKey = cleaned.slice(0, 500);
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleaned.slice(0, 500))}&langpair=en|pt-BR`;
    const response = await fetch(url);
    const data = await response.json();
    const translated = data?.responseData?.translatedText as string | undefined;

    if (translated && translated !== cleaned) {
      if (cache.size >= MAX_CACHE) {
        const firstKey = cache.keys().next().value;
        if (firstKey) cache.delete(firstKey);
      }
      cache.set(cacheKey, translated);
      await delay(120);
      return translated;
    }
  } catch (error) {
    logger.warn('Falha ao traduzir texto:', error);
  }

  return cleaned;
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
      if (translated) (result as Record<string, unknown>)[field as string] = translated;
    }
    if (Array.isArray(value)) {
      (result as Record<string, unknown>)[field as string] = await Promise.all(
        value.map(async (entry) => {
          if (typeof entry === 'string') return (await translateToPortuguese(entry)) ?? entry;
          return entry;
        })
      );
    }
  }
  return result;
}
