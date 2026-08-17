import { formatBrlFromCents, parsePriceNumber } from './dealPricing';
import type { UnifiedDeal } from './types';

/** Taxa USD→BRL para exibição/ordenação (configurável via env). */
export function getUsdBrlRate(): number {
  const raw = Number(process.env.DEALS_USD_BRL_RATE ?? 5.5);
  return Number.isFinite(raw) && raw > 0 ? raw : 5.5;
}

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

/** Converte preços USD (CheapShark) para BRL aproximado para exibição e ordenação. */
export function normalizeDealToBrl(deal: UnifiedDeal): UnifiedDeal {
  let normalized = deal.source === 'epic' ? normalizeEpicPrices(deal) : deal;

  if (normalized.currency === 'BRL' || normalized.source === 'steam') {
    return { ...normalized, priceConverted: false };
  }

  if (normalized.currency !== 'USD' || normalized.salePriceValue == null) {
    return { ...normalized, priceConverted: false };
  }

  const rate = getUsdBrlRate();
  const brlSale = Math.round(normalized.salePriceValue * rate * 100) / 100;
  const brlOrig =
    normalized.originalPriceValue != null
      ? Math.round(normalized.originalPriceValue * rate * 100) / 100
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

export function normalizeDealsList(deals: UnifiedDeal[]): UnifiedDeal[] {
  return deals.map(normalizeDealToBrl);
}
