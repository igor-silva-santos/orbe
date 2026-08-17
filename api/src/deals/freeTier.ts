import type { UnifiedDeal } from './types';

export type FreeTier = 'temporary' | 'permanent';

import { parsePriceNumber } from './dealPricing';

/**
 * Jogos "estão de graça": tinham preço e estão 100% grátis por tempo limitado.
 * Jogos "são de graça": nunca custaram (F2P / preço base zero).
 */
export function classifyFreeTier(deal: UnifiedDeal): FreeTier {
  if (deal.kind !== 'free') return 'temporary';

  if (deal.source === 'epic') return 'temporary';

  const original = parsePriceNumber(deal.originalPrice);
  const worth = parsePriceNumber(deal.worth);

  if (deal.source === 'gamerpower') {
    if (deal.endsAt) return 'temporary';
    if (worth != null && worth > 0) return 'temporary';
    if (original != null && original > 0) return 'temporary';
    // Giveaways de jogos completos costumam ser promoções temporárias
    if ((deal.status ?? '').toLowerCase() === 'active') return 'temporary';
    return 'permanent';
  }

  if (deal.source === 'steam') {
    if (deal.freeTier === 'permanent' || deal.freeTier === 'temporary') return deal.freeTier;
    if (original != null && original > 0) return 'temporary';
    return 'permanent';
  }

  if (deal.source === 'cheapshark') {
    if (original != null && original > 0) return 'temporary';
    if (deal.discountPercent === 100 && original != null && original > 0) return 'temporary';
    return 'permanent';
  }

  if (original != null && original > 0) return 'temporary';
  return 'permanent';
}

export function withFreeTier(deal: UnifiedDeal): UnifiedDeal {
  if (deal.kind !== 'free') return deal;
  return { ...deal, freeTier: classifyFreeTier(deal) };
}

export function splitFreeDeals(deals: UnifiedDeal[]): {
  temporarios: UnifiedDeal[];
  permanentes: UnifiedDeal[];
} {
  const temporarios: UnifiedDeal[] = [];
  const permanentes: UnifiedDeal[] = [];

  for (const deal of deals) {
    const enriched = withFreeTier(deal);
    if (enriched.freeTier === 'permanent') {
      permanentes.push(enriched);
    } else {
      temporarios.push(enriched);
    }
  }

  return { temporarios, permanentes };
}
