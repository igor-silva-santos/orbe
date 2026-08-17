import type { UnifiedDeal } from './types';

function dealQualityScore(deal: UnifiedDeal): number {
  let score = 0;
  if (deal.imageUrl) score += 100;
  if (deal.dealRating != null) score += deal.dealRating * 10;
  if (deal.source === 'steam' || deal.source === 'epic') score += 25;
  if (deal.endsAt) score += 5;
  if (!deal.priceConverted) score += 10;
  return score;
}

export function dealDedupeKey(deal: UnifiedDeal): string {
  if (deal.steamAppId != null && Number.isFinite(deal.steamAppId)) {
    return `steam:${deal.steamAppId}`;
  }
  if (deal.source === 'epic') {
    const slug = deal.id.replace(/^epic:/, '');
    return `epic:${slug}`;
  }
  return `${deal.platform}:${deal.title.toLowerCase().trim()}`;
}

export function dedupeDeals(deals: UnifiedDeal[]): UnifiedDeal[] {
  const byKey = new Map<string, UnifiedDeal>();
  for (const deal of deals) {
    const key = dealDedupeKey(deal);
    const existing = byKey.get(key);
    if (!existing || dealQualityScore(deal) > dealQualityScore(existing)) {
      byKey.set(key, deal);
    }
  }
  return Array.from(byKey.values());
}
