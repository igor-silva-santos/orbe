import { formatBrlFromCents, getUsdBrlRate, parsePriceNumber } from './dealPricing';
import type { UnifiedDeal } from './types';

function formatBrlFromUnits(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function normalizeEpicPrices(deal: UnifiedDeal): UnifiedDeal {
  if (deal.salePriceValue != null) return deal;
  const parsedSale = parsePriceNumber(deal.salePrice);
  const parsedOrig = parsePriceNumber(deal.originalPrice);
  return {
    ...deal,
    salePriceValue: parsedSale,
    originalPriceValue: parsedOrig,
  };
}

/** Converte preços USD (itch.io etc.) para BRL usando taxa informada. */
export function normalizeDealToBrl(deal: UnifiedDeal, usdBrlRate: number): UnifiedDeal {
  let normalized = deal.source === 'epic' ? normalizeEpicPrices(deal) : deal;

  if (normalized.currency === 'BRL' || normalized.source === 'steam' || normalized.source === 'orbe') {
    return { ...normalized, priceConverted: false };
  }

  if (normalized.currency !== 'USD' || normalized.salePriceValue == null) {
    return { ...normalized, priceConverted: false };
  }

  const brlSale = Math.round(normalized.salePriceValue * usdBrlRate * 100) / 100;
  const brlOrig =
    normalized.originalPriceValue != null
      ? Math.round(normalized.originalPriceValue * usdBrlRate * 100) / 100
      : null;

  return {
    ...normalized,
    salePrice: brlSale === 0 ? 'Grátis' : formatBrlFromUnits(brlSale),
    originalPrice: brlOrig != null ? formatBrlFromUnits(brlOrig) : normalized.originalPrice,
    salePriceValue: brlSale,
    originalPriceValue: brlOrig,
    currency: 'BRL',
    priceConverted: true,
    originalSalePriceUsd: normalized.salePrice ?? null,
  };
}

export function normalizeDealsList(deals: UnifiedDeal[], usdBrlRate?: number): UnifiedDeal[] {
  const rate = usdBrlRate ?? getUsdBrlRate();
  return deals.map((deal) => normalizeDealToBrl(deal, rate));
}

export { getUsdBrlRate };
