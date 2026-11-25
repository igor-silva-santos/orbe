import type { UnifiedDeal } from '@/types/deals';

/** Espelha a lógica do backend (`api/src/deals/dealPricing.ts`) para strings de preço. */
export function parsePriceNumberFromString(value: string | null | undefined): number | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === 'n/a' || normalized === 'free' || normalized === 'grátis' || normalized === 'gratis') {
    return 0;
  }

  const isExplicitBrl = normalized.includes('r$') || normalized.includes('brl');
  const isExplicitUsd =
    normalized.includes('usd') || normalized.includes('us$') || /^\$/.test(normalized.trim());

  let numericPart = normalized.replace(/[^\d.,]/g, '');
  if (!numericPart) return null;

  const commaCount = (numericPart.match(/,/g) ?? []).length;
  const dotCount = (numericPart.match(/\./g) ?? []).length;

  let canonical: string;

  if (isExplicitBrl || (commaCount >= 1 && dotCount >= 1)) {
    canonical = numericPart.replace(/\./g, '').replace(',', '.');
  } else if (commaCount === 1 && dotCount === 0) {
    canonical = numericPart.replace(',', '.');
  } else if (isExplicitUsd || (dotCount === 1 && commaCount === 0)) {
    canonical = numericPart;
  } else if (dotCount > 1) {
    canonical = numericPart.replace(/\./g, '');
  } else {
    canonical = numericPart.replace(',', '.');
  }

  const match = canonical.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const parsed = Number.parseFloat(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

export function getDealSalePriceValue(deal: UnifiedDeal): number {
  if (deal.salePriceValue != null && Number.isFinite(deal.salePriceValue)) {
    return deal.salePriceValue;
  }
  if (deal.salePrice?.toLowerCase().includes('grátis') || deal.salePrice?.toLowerCase().includes('gratis')) {
    return 0;
  }
  const parsed = parsePriceNumberFromString(deal.salePrice);
  return parsed != null && Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
}

export const PROMO_BARGAIN_MAX_BRL = 30;

export function isBargainPromo(deal: UnifiedDeal, maxBrl = PROMO_BARGAIN_MAX_BRL): boolean {
  if (deal.kind === 'free') return false;
  const value = getDealSalePriceValue(deal);
  return value > 0 && value <= maxBrl;
}

export function isSteamDeal(deal: UnifiedDeal): boolean {
  return deal.platform === 'steam' || deal.source === 'steam' || deal.source === 'orbe';
}
