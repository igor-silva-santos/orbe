import axios from 'axios';
import { logger } from '../logger';
import type { DealPlatform, UnifiedDeal } from './types';

const ITAD_USER_AGENT = 'OrbeNerd/1.0 (promocoes@orbe.app)';

/** Epic Games Store no IsThereAnyDeal. */
export const ITAD_SHOP_EPIC = 16;
/** EA App / EA Store no IsThereAnyDeal. */
export const ITAD_SHOP_EA = 52;
/** Microsoft Store (Xbox PC) no IsThereAnyDeal. */
export const ITAD_SHOP_MICROSOFT = 48;

const SHOP_PLATFORM_MAP: Record<number, DealPlatform> = {
  [ITAD_SHOP_EPIC]: 'epic',
  [ITAD_SHOP_EA]: 'origin',
  [ITAD_SHOP_MICROSOFT]: 'xbox',
};

const SHOP_LABEL_MAP: Record<number, string> = {
  [ITAD_SHOP_EPIC]: 'Epic Games Store',
  [ITAD_SHOP_EA]: 'EA App',
  [ITAD_SHOP_MICROSOFT]: 'Microsoft Store',
};

type ItadMoney = {
  amount?: number;
  amountInt?: number;
  currency?: string;
};

type ItadDealEntry = {
  shop?: { id?: number; name?: string };
  price?: ItadMoney;
  regular?: ItadMoney;
  cut?: number;
  url?: string;
  expiry?: string | null;
  timestamp?: string | null;
};

type ItadListItem = {
  id?: string;
  title?: string;
  assets?: {
    boxart?: string;
    banner600?: string;
    banner400?: string;
    banner300?: string;
  };
  deal?: ItadDealEntry;
};

type ItadDealsResponse = {
  nextOffset?: number;
  hasMore?: boolean;
  list?: ItadListItem[];
};

const itadApi = axios.create({
  baseURL: 'https://api.isthereanydeal.com',
  timeout: 25000,
  headers: {
    'User-Agent': ITAD_USER_AGENT,
  },
});

export function isItadConfigured(): boolean {
  return Boolean(process.env.ITAD_API_KEY?.trim());
}

function itadApiKey(): string | null {
  const key = process.env.ITAD_API_KEY?.trim();
  return key || null;
}

function moneyValue(money?: ItadMoney | null): number | null {
  if (!money) return null;
  if (money.amount != null && Number.isFinite(money.amount)) return money.amount;
  if (money.amountInt != null) return money.amountInt / 100;
  return null;
}

function formatMoney(value: number | null, currency?: string | null): string | null {
  if (value == null) return null;
  if (currency === 'BRL') return `R$ ${value.toFixed(2).replace('.', ',')}`;
  if (currency === 'USD') return `$${value.toFixed(2)}`;
  return `${currency ?? ''} ${value.toFixed(2)}`.trim();
}

function pickImageUrl(assets?: ItadListItem['assets']): string | null {
  if (!assets) return null;
  return assets.boxart || assets.banner600 || assets.banner400 || assets.banner300 || null;
}

export function mapItadListItem(item: ItadListItem, expectedShopId: number): UnifiedDeal | null {
  const deal = item.deal;
  const shopId = deal?.shop?.id ?? expectedShopId;
  const platform = SHOP_PLATFORM_MAP[shopId] ?? 'other';
  const title = item.title?.trim();
  const storeUrl = deal?.url?.trim();
  if (!title || !storeUrl || !item.id) return null;

  const cut = deal?.cut ?? 0;
  const salePriceValue = moneyValue(deal?.price);
  const originalPriceValue = moneyValue(deal?.regular);
  const currency = deal?.price?.currency ?? deal?.regular?.currency ?? 'BRL';

  if (salePriceValue == null || cut <= 0) return null;

  const isFree = cut >= 100 || salePriceValue === 0;

  return {
    id: `itad:${item.id}:${shopId}`,
    source: 'itad',
    kind: isFree ? 'free' : 'sale',
    title,
    imageUrl: pickImageUrl(item.assets),
    platform,
    platforms: [SHOP_LABEL_MAP[shopId] ?? deal?.shop?.name ?? 'PC'],
    storeUrl,
    originalPrice: formatMoney(originalPriceValue, currency),
    salePrice: isFree ? 'Grátis' : formatMoney(salePriceValue, currency),
    originalPriceValue,
    salePriceValue,
    discountPercent: Math.round(cut),
    currency,
    startsAt: deal?.timestamp ?? null,
    endsAt: deal?.expiry ?? null,
    status: isFree ? 'gratis' : 'promocao',
    freeTier: isFree ? 'temporary' : null,
  };
}

async function fetchItadDealsPage(options: {
  shopIds: number[];
  country: string;
  offset: number;
  limit: number;
}): Promise<ItadDealsResponse> {
  const key = itadApiKey();
  if (!key) {
    throw new Error('ITAD_API_KEY não configurada');
  }

  const response = await itadApi.get<ItadDealsResponse>('/deals/v2', {
    params: {
      key,
      country: options.country,
      shops: options.shopIds.join(','),
      offset: options.offset,
      limit: options.limit,
      sort: '-cut',
    },
  });

  return response.data ?? {};
}

function itadMaxPages(): number {
  const parsed = Number.parseInt(process.env.ITAD_MAX_PAGES ?? '10', 10);
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 50) : 10;
}

/** Promoções pagas (e grátis temporários) via ITAD — Epic, EA e Microsoft Store, links oficiais. */
export async function fetchItadShopSales(options?: {
  shopIds?: number[];
  country?: string;
  maxPages?: number;
}): Promise<UnifiedDeal[]> {
  if (!isItadConfigured()) {
    return [];
  }

  const shopIds = options?.shopIds ?? [ITAD_SHOP_EPIC, ITAD_SHOP_EA, ITAD_SHOP_MICROSOFT];
  const country = options?.country ?? process.env.ITAD_COUNTRY ?? 'BR';
  const maxPages = options?.maxPages ?? itadMaxPages();
  const pageSize = 20;
  const all: UnifiedDeal[] = [];
  const seen = new Set<string>();

  try {
    let offset = 0;
    for (let page = 0; page < maxPages; page++) {
      const response = await fetchItadDealsPage({
        shopIds,
        country,
        offset,
        limit: pageSize,
      });

      const batch = (response.list ?? [])
        .map((item) => {
          const shopId = item.deal?.shop?.id;
          const expectedShopId =
            shopId != null && shopIds.includes(shopId) ? shopId : shopIds[0];
          return mapItadListItem(item, expectedShopId);
        })
        .filter((deal): deal is UnifiedDeal => {
          if (!deal) return false;
          if (seen.has(deal.id)) return false;
          seen.add(deal.id);
          return true;
        });

      all.push(...batch);

      if (!response.hasMore || batch.length === 0) break;
      offset = response.nextOffset ?? offset + pageSize;
    }

    return all;
  } catch (error: any) {
    logger.warn(`ITAD deals falhou: ${error.message}`);
    throw error;
  }
}

export async function fetchItadEpicSales(): Promise<UnifiedDeal[]> {
  return fetchItadShopSales({ shopIds: [ITAD_SHOP_EPIC] });
}

export async function fetchItadEaSales(): Promise<UnifiedDeal[]> {
  return fetchItadShopSales({ shopIds: [ITAD_SHOP_EA] });
}
