import type { UnifiedDeal } from './types';

export type FreeTier = 'temporary' | 'permanent';

/** Extrai valor numérico de strings como "$24.99", "R$ 0,00" ou "N/A". */
function parsePriceValue(value: string | null | undefined): number | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === 'n/a' || normalized === 'free' || normalized === 'grátis' || normalized === 'gratis') {
    return 0;
  }
  const match = normalized.replace(',', '.').match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const parsed = Number.parseFloat(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Jogos "estão de graça": tinham preço e estão 100% grátis por tempo limitado.
 * Jogos "são de graça": nunca custaram (F2P / preço base zero).
 */
export function classifyFreeTier(deal: UnifiedDeal): FreeTier {
  if (deal.kind !== 'free') return 'temporary';

  if (deal.source === 'epic') return 'temporary';

  const original = parsePriceValue(deal.originalPrice);
  const worth = parsePriceValue(deal.worth);

  if (deal.source === 'gamerpower') {
    if (deal.endsAt) return 'temporary';
    if (worth != null && worth > 0) return 'temporary';
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
