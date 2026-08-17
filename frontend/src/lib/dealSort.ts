import type { UnifiedDeal } from '@/types/deals';

export type DealSortOption =
  | 'popular'
  | 'discount'
  | 'price_asc'
  | 'price_desc'
  | 'ending_soon'
  | 'title';

export const DEAL_SORT_OPTIONS: { id: DealSortOption; label: string; freeOnly?: boolean; saleOnly?: boolean }[] = [
  { id: 'popular', label: 'Popularidade' },
  { id: 'discount', label: 'Maior desconto', saleOnly: true },
  { id: 'price_asc', label: 'Menor preço', saleOnly: true },
  { id: 'price_desc', label: 'Maior preço', saleOnly: true },
  { id: 'ending_soon', label: 'Acaba primeiro', freeOnly: true },
  { id: 'title', label: 'A–Z' },
];

function parseEndsAt(value: string | null | undefined): number {
  if (!value) return Number.POSITIVE_INFINITY;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
}

function priceValue(deal: UnifiedDeal): number {
  if (deal.salePriceValue != null) return deal.salePriceValue;
  if (deal.salePrice?.toLowerCase().includes('grátis') || deal.salePrice?.toLowerCase().includes('gratis')) {
    return 0;
  }
  const match = deal.salePrice?.replace(/\./g, '').replace(',', '.').match(/(\d+(?:\.\d+)?)/);
  return match ? Number.parseFloat(match[1]) : Number.POSITIVE_INFINITY;
}

export function sortDeals(deals: UnifiedDeal[], sort: DealSortOption): UnifiedDeal[] {
  const copy = [...deals];

  switch (sort) {
    case 'popular':
      return copy.sort((a, b) => (b.dealRating ?? 0) - (a.dealRating ?? 0));
    case 'discount':
      return copy.sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0));
    case 'price_asc':
      return copy.sort((a, b) => priceValue(a) - priceValue(b));
    case 'price_desc':
      return copy.sort((a, b) => priceValue(b) - priceValue(a));
    case 'ending_soon':
      return copy.sort((a, b) => parseEndsAt(a.endsAt) - parseEndsAt(b.endsAt));
    case 'title':
      return copy.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    default:
      return copy;
  }
}

export function sortOptionsForTab(tab: 'gratis' | 'promocoes'): typeof DEAL_SORT_OPTIONS {
  return DEAL_SORT_OPTIONS.filter((option) => {
    if (tab === 'gratis') return !option.saleOnly;
    return !option.freeOnly;
  });
}
