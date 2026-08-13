import axios from 'axios';
import { logger } from '../logger';
import type { DealPlatform, UnifiedDeal } from './types';

const CHEAPSHARK_USER_AGENT = 'OrbeNerd/1.0 (promocoes@orbe.app)';

const cheapsharkApi = axios.create({
  baseURL: 'https://www.cheapshark.com/api/1.0',
  timeout: 20000,
  headers: {
    'User-Agent': CHEAPSHARK_USER_AGENT,
  },
});

const STORE_PLATFORM_MAP: Record<string, DealPlatform> = {
  '1': 'steam',
  '7': 'gog',
  '25': 'epic',
};

const STORE_NAME_MAP: Record<string, string> = {
  '1': 'Steam',
  '7': 'GOG',
  '25': 'Epic Games Store',
};

type CheapSharkDeal = {
  dealID?: string;
  title?: string;
  storeID?: string;
  gameID?: string;
  salePrice?: string;
  normalPrice?: string;
  savings?: string;
  thumb?: string;
  steamAppID?: string;
  dealRating?: string;
  isOnSale?: string;
};

function mapCheapSharkPlatform(storeId?: string): DealPlatform {
  if (!storeId) return 'other';
  return STORE_PLATFORM_MAP[storeId] ?? 'other';
}

function cheapSharkStoreUrl(storeId: string | undefined, dealId: string): string {
  return `https://www.cheapshark.com/redirect?dealID=${encodeURIComponent(dealId)}`;
}

function parseDiscountPercent(savings?: string): number | null {
  if (!savings) return null;
  const value = Number.parseFloat(savings);
  return Number.isFinite(value) ? Math.round(value) : null;
}

function mapCheapSharkDeal(item: CheapSharkDeal): UnifiedDeal | null {
  if (!item.dealID || !item.title) return null;
  const sale = Number.parseFloat(item.salePrice ?? '');
  const savings = parseDiscountPercent(item.savings);
  const isFree = sale === 0 || savings === 100;
  const storeName = STORE_NAME_MAP[item.storeID ?? ''] ?? 'Loja parceira';

  return {
    id: `cheapshark:${item.dealID}`,
    source: 'cheapshark',
    kind: isFree ? 'free' : 'sale',
    title: item.title,
    imageUrl: item.thumb ?? null,
    platform: mapCheapSharkPlatform(item.storeID),
    platforms: [storeName],
    storeUrl: cheapSharkStoreUrl(item.storeID, item.dealID),
    originalPrice: item.normalPrice ? `$${item.normalPrice}` : null,
    salePrice: item.salePrice ? `$${item.salePrice}` : null,
    discountPercent: savings,
    currency: 'USD',
    steamAppId: item.steamAppID ? Number.parseInt(item.steamAppID, 10) : null,
    dealRating: item.dealRating ? Number.parseFloat(item.dealRating) : null,
    status: item.isOnSale === '1' ? 'on_sale' : 'active',
  };
}

export async function fetchCheapSharkDeals(options?: {
  storeId?: string;
  freeOnly?: boolean;
  pageSize?: number;
}): Promise<UnifiedDeal[]> {
  try {
    const pageSize = options?.pageSize ?? 40;
    const params: Record<string, string | number> = {
      onSale: 1,
      pageSize,
      sortBy: options?.freeOnly ? 'Savings' : 'DealRating',
    };
    if (options?.storeId) params.storeID = options.storeId;

    const response = await cheapsharkApi.get('/deals', { params });
    const items: CheapSharkDeal[] = Array.isArray(response.data) ? response.data : [];

    return items
      .map(mapCheapSharkDeal)
      .filter((deal): deal is UnifiedDeal => {
        if (!deal) return false;
        if (options?.freeOnly) return deal.kind === 'free';
        return true;
      });
  } catch (error: any) {
    logger.warn(`CheapShark deals falhou: ${error.message}`);
    return [];
  }
}

export async function fetchCheapSharkStores(): Promise<{ id: string; name: string }[]> {
  try {
    const response = await cheapsharkApi.get('/stores');
    const items = Array.isArray(response.data) ? response.data : [];
    return items
      .filter((store: { isActive?: number }) => store.isActive === 1)
      .map((store: { storeID?: string; storeName?: string }) => ({
        id: store.storeID ?? '',
        name: store.storeName ?? 'Loja',
      }))
      .filter((store) => store.id);
  } catch (error: any) {
    logger.warn(`CheapShark stores falhou: ${error.message}`);
    return [];
  }
}
