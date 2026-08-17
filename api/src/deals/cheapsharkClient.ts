import axios from 'axios';
import { logger } from '../logger';
import { resolveDealImageUrl } from './dealImages';
import { parsePriceNumber } from './dealPricing';
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

function resolveStoreUrl(
  storeId: string | undefined,
  dealId: string,
  steamAppId: number | null,
): string {
  if (steamAppId != null && steamAppId > 0) {
    return `https://store.steampowered.com/app/${steamAppId}`;
  }
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
  const normal = Number.parseFloat(item.normalPrice ?? '');
  const savings = parseDiscountPercent(item.savings);
  const isFree = sale === 0 || savings === 100;
  const storeName = STORE_NAME_MAP[item.storeID ?? ''] ?? 'Loja parceira';
  const steamAppId = item.steamAppID ? Number.parseInt(item.steamAppID, 10) : null;

  return {
    id: `cheapshark:${item.dealID}`,
    source: 'cheapshark',
    kind: isFree ? 'free' : 'sale',
    title: item.title,
    imageUrl: resolveDealImageUrl(item.thumb ?? null, steamAppId),
    platform: mapCheapSharkPlatform(item.storeID),
    platforms: [storeName],
    storeUrl: resolveStoreUrl(item.storeID, item.dealID, steamAppId),
    originalPrice: item.normalPrice ? `$${item.normalPrice}` : null,
    salePrice: item.salePrice ? `$${item.salePrice}` : null,
    originalPriceValue: parsePriceNumber(item.normalPrice ? `$${item.normalPrice}` : null),
    salePriceValue: parsePriceNumber(item.salePrice ? `$${item.salePrice}` : null),
    discountPercent: savings,
    currency: 'USD',
    steamAppId,
    dealRating: item.dealRating ? Number.parseFloat(item.dealRating) : null,
    status: item.isOnSale === '1' ? 'on_sale' : 'active',
    freeTier: isFree ? (normal > 0 ? 'temporary' : 'permanent') : null,
  };
}

export async function fetchCheapSharkDeals(options?: {
  storeId?: string;
  freeOnly?: boolean;
  permanentFreeOnly?: boolean;
  pageSize?: number;
  pageNumber?: number;
}): Promise<UnifiedDeal[]> {
  try {
    const pageSize = options?.pageSize ?? 60;
    const params: Record<string, string | number> = {
      onSale: 1,
      pageSize,
      pageNumber: options?.pageNumber ?? 0,
      sortBy: options?.freeOnly || options?.permanentFreeOnly ? 'Savings' : 'DealRating',
    };
    if (options?.storeId) params.storeID = options.storeId;

    const response = await cheapsharkApi.get('/deals', { params });
    const items: CheapSharkDeal[] = Array.isArray(response.data) ? response.data : [];

    return items
      .map(mapCheapSharkDeal)
      .filter((deal): deal is UnifiedDeal => {
        if (!deal) return false;
        if (options?.permanentFreeOnly) return deal.kind === 'free' && deal.freeTier === 'permanent';
        if (options?.freeOnly) return deal.kind === 'free';
        return true;
      });
  } catch (error: any) {
    logger.warn(`CheapShark deals falhou: ${error.message}`);
    return [];
  }
}

/** Busca várias páginas do CheapShark (paginação real na API externa). */
export async function fetchCheapSharkDealsPaged(options?: {
  storeId?: string;
  freeOnly?: boolean;
  permanentFreeOnly?: boolean;
  pageSize?: number;
  maxPages?: number;
}): Promise<UnifiedDeal[]> {
  const pageSize = options?.pageSize ?? 60;
  const maxPages = options?.maxPages ?? 3;
  const all: UnifiedDeal[] = [];

  for (let page = 0; page < maxPages; page++) {
    const batch = await fetchCheapSharkDeals({
      ...options,
      pageSize,
      pageNumber: page,
    });
    if (batch.length === 0) break;
    all.push(...batch);
    if (batch.length < pageSize) break;
  }

  return all;
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
