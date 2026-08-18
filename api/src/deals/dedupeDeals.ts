import type { UnifiedDeal } from './types';

function normalizeTitle(title: string): string {
  return title.toLowerCase().trim().replace(/\s+/g, ' ');
}

/** Slug do produto Epic extraído de store.epicgames.com/.../p/{slug}. */
export function epicSlugFromStoreUrl(storeUrl: string): string | null {
  const match = storeUrl.match(/store\.epicgames\.com\/[^/]+\/p\/([^/?#]+)/i);
  return match?.[1]?.toLowerCase() ?? null;
}

function dealQualityScore(deal: UnifiedDeal): number {
  let score = 0;
  if (deal.imageUrl) score += 100;
  if (deal.dealRating != null) score += deal.dealRating * 10;
  if (deal.source === 'steam' || deal.source === 'epic') score += 25;
  if (deal.source === 'epic' && deal.platform === 'epic') score += 30;
  if (deal.endsAt) score += 5;
  if (!deal.priceConverted) score += 10;
  if (deal.source === 'itad' && deal.currency === 'BRL') score += 25;
  return score;
}

/** Chaves alternativas para o mesmo jogo — cruza Epic REST e Steam por steamAppId ou slug. */
export function dealDedupeKeys(deal: UnifiedDeal): string[] {
  const keys = new Set<string>();

  if (deal.steamAppId != null && Number.isFinite(deal.steamAppId) && deal.steamAppId > 0) {
    keys.add(`steam:${deal.steamAppId}`);
  }

  if (deal.platform === 'epic') {
    const slug = epicSlugFromStoreUrl(deal.storeUrl);
    if (slug) keys.add(`epic-slug:${slug}`);
    keys.add(`epic-title:${normalizeTitle(deal.title)}`);
  }

  if (deal.source === 'epic') {
    const offerKey = deal.id.replace(/^epic:/, '');
    keys.add(`epic-offer:${offerKey}`);
  }

  keys.add(`${deal.platform}:${normalizeTitle(deal.title)}`);

  return Array.from(keys);
}

/** @deprecated Use dealDedupeKeys — mantido para testes legados. */
export function dealDedupeKey(deal: UnifiedDeal): string {
  return dealDedupeKeys(deal)[0];
}

function mergeDealPair(a: UnifiedDeal, b: UnifiedDeal): UnifiedDeal {
  const primary = dealQualityScore(a) >= dealQualityScore(b) ? a : b;
  const secondary = primary === a ? b : a;

  const epicNative =
    primary.source === 'epic' && primary.platform === 'epic'
      ? primary
      : secondary.source === 'epic' && secondary.platform === 'epic'
        ? secondary
        : null;

  return {
    ...primary,
    imageUrl: primary.imageUrl ?? secondary.imageUrl,
    dealRating: primary.dealRating ?? secondary.dealRating,
    steamAppId: primary.steamAppId ?? secondary.steamAppId,
    storeUrl: epicNative?.storeUrl ?? primary.storeUrl,
    originalPrice: epicNative?.originalPrice ?? primary.originalPrice,
    salePrice: epicNative?.salePrice ?? primary.salePrice,
    originalPriceValue: epicNative?.originalPriceValue ?? primary.originalPriceValue,
    salePriceValue: epicNative?.salePriceValue ?? primary.salePriceValue,
    currency: epicNative?.currency ?? primary.currency,
    priceConverted: epicNative ? false : primary.priceConverted,
    endsAt: primary.endsAt ?? secondary.endsAt,
    startsAt: primary.startsAt ?? secondary.startsAt,
  };
}

export function dedupeDeals(deals: UnifiedDeal[]): UnifiedDeal[] {
  const keyToIndex = new Map<string, number>();
  const result: UnifiedDeal[] = [];

  for (const deal of deals) {
    const keys = dealDedupeKeys(deal);
    let matchIndex: number | undefined;

    for (const key of keys) {
      const idx = keyToIndex.get(key);
      if (idx !== undefined) {
        matchIndex = idx;
        break;
      }
    }

    if (matchIndex === undefined) {
      const idx = result.length;
      result.push(deal);
      for (const key of keys) keyToIndex.set(key, idx);
      continue;
    }

    const merged = mergeDealPair(result[matchIndex], deal);
    result[matchIndex] = merged;
    for (const key of dealDedupeKeys(merged)) keyToIndex.set(key, matchIndex);
  }

  return result;
}
