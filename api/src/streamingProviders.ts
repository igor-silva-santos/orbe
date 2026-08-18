/**
 * Normaliza nomes de provedores TMDB para uma marca canônica (ex.: Netflix vs Netflix basic with Ads).
 * Mantém paridade com frontend/src/lib/media-helpers.ts `normalizeProviderName`.
 */
export function normalizeStreamingProviderName(name?: string | null): string {
  if (!name?.trim()) return 'Desconhecido';
  const lowerName = name.toLowerCase();
  if (lowerName.includes('netflix')) return 'Netflix';
  if (lowerName.includes('hbo') || lowerName === 'max') return 'Max';
  if (lowerName.includes('prime video') || lowerName.includes('amazon prime')) return 'Prime Video';
  if (lowerName === 'amazon' || lowerName.includes('amazon.')) return 'Prime Video';
  if (lowerName.includes('disney')) return 'Disney+';
  if (lowerName.includes('crunchyroll')) return 'Crunchyroll';
  if (lowerName.includes('star+') || lowerName.includes('star plus')) return 'Star+';
  if (lowerName.includes('apple tv')) return 'Apple TV+';
  if (lowerName.includes('globoplay') || lowerName.includes('globo play')) return 'Globoplay';
  if (lowerName.includes('claro')) return 'Claro TV+';
  if (lowerName.includes('hidive')) return 'HIDIVE';
  if (lowerName.includes('funimation')) return 'Funimation';
  if (lowerName.includes('tmdb')) return 'TMDB';
  return name.trim();
}

/** TMDB IDs canônicos quando há duplicatas da mesma marca (ex.: Prime Video 9 e 119). */
const CANONICAL_TMDB_PROVIDER_IDS: Partial<Record<string, number>> = {
  Netflix: 8,
  'Prime Video': 119,
  Max: 384,
  'Disney+': 337,
  Crunchyroll: 283,
  'Apple TV+': 350,
  Globoplay: 307,
};

export function isAdsStreamingVariantName(name?: string | null): boolean {
  if (!name) return false;
  const lower = name.toLowerCase();
  return (
    lower.includes('with ads') ||
    lower.includes('basic with') ||
    lower.includes('ad-supported') ||
    /\bads\b/.test(lower)
  );
}

type TmdbWatchProvider = {
  provider_id?: number;
  provider_name?: string;
  logo_path?: string | null;
  display_priority?: number;
};

function providerScore(provider: TmdbWatchProvider): number {
  let score = 0;
  const name = provider.provider_name ?? '';
  const normalized = normalizeStreamingProviderName(name);
  const canonicalId = CANONICAL_TMDB_PROVIDER_IDS[normalized];

  if (!isAdsStreamingVariantName(name)) score += 100;
  if (canonicalId != null && provider.provider_id === canonicalId) score += 50;
  if (provider.display_priority != null) score += Math.max(0, 30 - provider.display_priority);
  score += Math.max(0, 20 - Math.min(name.length, 20));

  return score;
}

/** Agrupa variantes TMDB (Netflix + Netflix with Ads, Prime 9 + 119) por marca. */
export function dedupeTmdbWatchProviders(providers: TmdbWatchProvider[]): TmdbWatchProvider[] {
  const byBrand = new Map<string, TmdbWatchProvider>();

  for (const provider of providers) {
    const key = normalizeStreamingProviderName(provider.provider_name);
    if (key === 'Desconhecido') continue;

    const existing = byBrand.get(key);
    if (!existing) {
      byBrand.set(key, provider);
      continue;
    }

    if (providerScore(provider) > providerScore(existing)) {
      byBrand.set(key, provider);
    }
  }

  return Array.from(byBrand.values());
}
