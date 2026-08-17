import type { DealPlatform, UnifiedDeal } from '@/types/deals';

export const PLATFORM_LABELS: Record<DealPlatform, string> = {
  steam: 'Steam',
  epic: 'Epic Games',
  gog: 'GOG',
  ubisoft: 'Ubisoft',
  origin: 'EA App',
  itch: 'itch.io',
  pc: 'PC',
  other: 'Loja',
};

export const ALL_PLATFORM_FILTERS: { id: DealPlatform | 'all'; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'steam', label: PLATFORM_LABELS.steam },
  { id: 'epic', label: PLATFORM_LABELS.epic },
  { id: 'gog', label: PLATFORM_LABELS.gog },
  { id: 'ubisoft', label: PLATFORM_LABELS.ubisoft },
  { id: 'origin', label: PLATFORM_LABELS.origin },
  { id: 'itch', label: PLATFORM_LABELS.itch },
];

/** Plataformas com seção/atalho dedicado na aba Grátis. */
export const FREE_FEATURED_PLATFORMS: DealPlatform[] = ['itch', 'origin'];

export function getPlatformLabel(platform: string): string {
  return PLATFORM_LABELS[platform as DealPlatform] ?? platform;
}

export function filterByPlatform(
  deals: UnifiedDeal[],
  platformFilter: DealPlatform | 'all',
): UnifiedDeal[] {
  if (platformFilter === 'all') return deals;
  return deals.filter((d) => d.platform === platformFilter);
}

export function filterBySearch(deals: UnifiedDeal[], query: string): UnifiedDeal[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return deals;
  return deals.filter((deal) => deal.title.toLowerCase().includes(normalized));
}

export function availablePlatformFilters(deals: UnifiedDeal[]): typeof ALL_PLATFORM_FILTERS {
  const platforms = new Set(deals.map((deal) => deal.platform));
  const specific = ALL_PLATFORM_FILTERS.filter(
    (filter) => filter.id !== 'all' && platforms.has(filter.id as DealPlatform),
  );
  if (specific.length === 0) {
    return [{ id: 'all', label: 'Todas' }];
  }
  return [{ id: 'all', label: 'Todas' }, ...specific];
}

export function groupByPlatform(deals: UnifiedDeal[]): Record<string, UnifiedDeal[]> {
  const groups: Record<string, UnifiedDeal[]> = {};
  for (const deal of deals) {
    const key = deal.platform;
    if (!groups[key]) groups[key] = [];
    groups[key].push(deal);
  }
  return groups;
}
