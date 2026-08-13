import { fetchEpicFreeGames } from './epicClient';
import { fetchGamerPowerGiveaways } from './gamerPowerClient';
import { fetchCheapSharkDeals } from './cheapsharkClient';
import type { DealsOverview, UnifiedDeal } from './types';

function dedupeDeals(deals: UnifiedDeal[]): UnifiedDeal[] {
  const seen = new Set<string>();
  const result: UnifiedDeal[] = [];
  for (const deal of deals) {
    const key = `${deal.platform}:${deal.title.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(deal);
  }
  return result;
}

async function safeFetch<T>(fn: () => Promise<T[]>): Promise<{ items: T[]; error?: string }> {
  try {
    const items = await fn();
    return { items };
  } catch (error: any) {
    return { items: [], error: error?.message ?? 'Erro desconhecido' };
  }
}

export async function fetchDealsOverview(): Promise<DealsOverview> {
  const [epic, gamerpower, cheapsharkFree, cheapsharkSales] = await Promise.all([
    safeFetch(fetchEpicFreeGames),
    safeFetch(() => fetchGamerPowerGiveaways()),
    safeFetch(() => fetchCheapSharkDeals({ freeOnly: true, pageSize: 30 })),
    safeFetch(() => fetchCheapSharkDeals({ pageSize: 40 })),
  ]);

  const gratis = dedupeDeals([
    ...epic.items,
    ...gamerpower.items,
    ...cheapsharkFree.items,
  ]);

  const promocoes = dedupeDeals(
    cheapsharkSales.items.filter((deal) => deal.kind === 'sale'),
  );

  return {
    fetchedAt: new Date().toISOString(),
    gratis,
    promocoes,
    sources: {
      epic: { ok: !epic.error, count: epic.items.length, error: epic.error },
      gamerpower: {
        ok: !gamerpower.error,
        count: gamerpower.items.length,
        error: gamerpower.error,
      },
      cheapshark: {
        ok: !cheapsharkFree.error && !cheapsharkSales.error,
        count: cheapsharkFree.items.length + cheapsharkSales.items.length,
        error: cheapsharkFree.error ?? cheapsharkSales.error,
      },
    },
  };
}

export async function fetchFreeDeals(): Promise<UnifiedDeal[]> {
  const overview = await fetchDealsOverview();
  return overview.gratis;
}

export async function fetchSaleDeals(): Promise<UnifiedDeal[]> {
  const overview = await fetchDealsOverview();
  return overview.promocoes;
}
