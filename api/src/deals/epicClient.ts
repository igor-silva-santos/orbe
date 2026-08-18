import axios from 'axios';
import { logger } from '../logger';
import type { DealKind, UnifiedDeal } from './types';

const EPIC_STATIC_BASE = 'https://store-site-backend-static.ak.epicgames.com';
const EPIC_STATIC_IPV4_BASE = 'https://store-site-backend-static-ipv4.ak.epicgames.com';
const EPIC_CONTENT_BASE = 'https://store-content.ak.epicgames.com/api';

const epicStoreApi = axios.create({
  baseURL: EPIC_STATIC_BASE,
  timeout: 20000,
});

type EpicPromotionOffer = {
  startDate?: string;
  endDate?: string;
  discountSetting?: {
    discountType?: string;
    discountPercentage?: number;
  };
};

type EpicPageMapping = {
  pageSlug?: string;
  pageType?: string;
};

type EpicCatalogElement = {
  title?: string;
  id?: string;
  namespace?: string;
  description?: string;
  productSlug?: string | null;
  urlSlug?: string;
  keyImages?: { type?: string; url?: string }[];
  customAttributes?: { key?: string; value?: string }[];
  offerMappings?: EpicPageMapping[];
  catalogNs?: { mappings?: EpicPageMapping[] };
  promotions?: {
    promotionalOffers?: { promotionalOffers?: EpicPromotionOffer[] }[];
    upcomingPromotionalOffers?: { promotionalOffers?: EpicPromotionOffer[] }[];
  };
  price?: {
    totalPrice?: {
      discountPrice?: number;
      originalPrice?: number;
      currencyCode?: string;
      fmtPrice?: { originalPrice?: string; discountPrice?: string };
    };
  };
};

type EpicFeedCandidate = {
  label: string;
  baseURL: string;
  path: string;
  params?: Record<string, string | number | boolean>;
};

/**
 * Endpoints REST públicos testados em servidor (sem GraphQL / sem Cloudflare browse).
 * Funcionam: freeGamesPromotions (static + ipv4).
 * 404: browse/content paths em static e store-content.
 * 401: catalog-public-service-prod.
 * 403: store.epicgames.com/browse (Cloudflare).
 */
const EPIC_SALE_FEED_CANDIDATES: EpicFeedCandidate[] = [
  {
    label: 'content-discount-edition-base',
    baseURL: EPIC_CONTENT_BASE,
    path: '/content/v2/BR/pt-BR/browse/discount-and-free-games-edition-base',
    params: { count: 40, start: 0, sortBy: 'currentPrice', sortDirection: 'asc' },
  },
  {
    label: 'static-discount-edition-base',
    baseURL: EPIC_STATIC_BASE,
    path: '/content/v2/BR/pt-BR/browse/discount-and-free-games-edition-base',
    params: { count: 40, start: 0 },
  },
  {
    label: 'static-ipv4-discount-edition-base',
    baseURL: EPIC_STATIC_IPV4_BASE,
    path: '/content/v2/BR/pt-BR/browse/discount-and-free-games-edition-base',
    params: { count: 40, start: 0 },
  },
  {
    label: 'static-browse-discounted',
    baseURL: EPIC_STATIC_BASE,
    path: '/browse',
    params: {
      locale: 'pt-BR',
      country: 'BR',
      category: 'Game/discounted/edition/base',
      count: 40,
      start: 0,
    },
  },
];

const EPIC_INTERNAL_SLUG_RE = /^[0-9a-f]{32}$/i;

function epicCustomProductSlug(element: EpicCatalogElement): string | null {
  const attr = element.customAttributes?.find((item) => item.key === 'com.epicgames.app.productSlug');
  return attr?.value?.trim() || null;
}

function epicPageSlugFromMappings(element: EpicCatalogElement): string | null {
  const mappings = [...(element.offerMappings ?? []), ...(element.catalogNs?.mappings ?? [])];
  const productHome = mappings.find((mapping) => mapping.pageType === 'productHome' && mapping.pageSlug);
  if (productHome?.pageSlug) return productHome.pageSlug;
  return mappings.find((mapping) => mapping.pageSlug)?.pageSlug ?? null;
}

function epicReadableUrlSlug(urlSlug?: string): string | null {
  if (!urlSlug?.trim()) return null;
  if (EPIC_INTERNAL_SLUG_RE.test(urlSlug)) return null;
  return urlSlug;
}

function epicStoreSlug(element: EpicCatalogElement): string | null {
  return (
    epicCustomProductSlug(element) ??
    (element.productSlug?.trim() ||
      epicPageSlugFromMappings(element) ||
      epicReadableUrlSlug(element.urlSlug))
  );
}

function epicImageUrl(element: EpicCatalogElement): string | null {
  const images = element.keyImages ?? [];
  const wide = images.find((img) => img.type === 'OfferImageWide');
  const tall = images.find((img) => img.type === 'OfferImageTall');
  const thumb = images.find((img) => img.type === 'Thumbnail');
  return wide?.url ?? tall?.url ?? thumb?.url ?? null;
}

function epicStoreUrl(element: EpicCatalogElement): string {
  const slug = epicStoreSlug(element);
  if (slug) {
    return `https://store.epicgames.com/pt-BR/p/${slug}`;
  }
  return 'https://store.epicgames.com/pt-BR/free-games';
}

function extractCatalogElements(data: unknown): EpicCatalogElement[] {
  if (!data || typeof data !== 'object') return [];
  const root = data as Record<string, unknown>;

  const catalog = root.data as Record<string, unknown> | undefined;
  const searchStore = catalog?.Catalog as Record<string, unknown> | undefined;
  const nestedSearch = searchStore?.searchStore as { elements?: EpicCatalogElement[] } | undefined;
  if (nestedSearch?.elements?.length) return nestedSearch.elements;

  const directSearch = catalog?.searchStore as { elements?: EpicCatalogElement[] } | undefined;
  if (directSearch?.elements?.length) return directSearch.elements;

  const content = root.content as { items?: EpicCatalogElement[] } | undefined;
  if (content?.items?.length) return content.items;

  const items = root.items as EpicCatalogElement[] | undefined;
  if (items?.length) return items;

  return [];
}

async function fetchEpicCatalogFromCandidate(candidate: EpicFeedCandidate): Promise<EpicCatalogElement[]> {
  const response = await axios.get(candidate.path, {
    baseURL: candidate.baseURL,
    timeout: 20000,
    params: candidate.params,
    validateStatus: (status) => status < 500,
  });

  if (response.status !== 200) {
    logger.debug(`Epic feed ${candidate.label}: HTTP ${response.status}`);
    return [];
  }

  const elements = extractCatalogElements(response.data);
  if (elements.length === 0) {
    logger.debug(`Epic feed ${candidate.label}: resposta vazia`);
    return [];
  }

  logger.info(`Epic feed ${candidate.label}: ${elements.length} elementos`);
  return elements;
}

async function fetchEpicPromotionsFeed(): Promise<EpicCatalogElement[]> {
  const response = await epicStoreApi.get('/freeGamesPromotions', {
    params: { locale: 'pt-BR', country: 'BR', allowUnpublished: true },
  });
  return extractCatalogElements(response.data);
}

/** Tenta feeds browse/sale REST; fallback em freeGamesPromotions (feed promocional limitado). */
export async function fetchEpicCatalogElements(): Promise<EpicCatalogElement[]> {
  for (const candidate of EPIC_SALE_FEED_CANDIDATES) {
    try {
      const elements = await fetchEpicCatalogFromCandidate(candidate);
      if (elements.length > 0) return elements;
    } catch (error: any) {
      logger.debug(`Epic feed ${candidate.label} falhou: ${error.message}`);
    }
  }

  try {
    const elements = await fetchEpicPromotionsFeed();
    if (elements.length > 0) {
      logger.info(`Epic feed freeGamesPromotions: ${elements.length} elementos (fallback)`);
      return elements;
    }
  } catch (error: any) {
    logger.warn(`Epic freeGamesPromotions falhou: ${error.message}`);
  }

  return [];
}

function collectPromotionOffers(element: EpicCatalogElement): EpicPromotionOffer[] {
  const promos = element.promotions;
  if (!promos) return [];
  const buckets = [
    ...(promos.promotionalOffers ?? []),
    ...(promos.upcomingPromotionalOffers ?? []),
  ];
  return buckets.flatMap((bucket) => bucket.promotionalOffers ?? []);
}

function isFreePromotion(offer: EpicPromotionOffer): boolean {
  const setting = offer.discountSetting;
  if (!setting) return false;
  if (setting.discountType === 'PERCENTAGE' && setting.discountPercentage === 0) return true;
  return false;
}

function isActivePromotion(offer: EpicPromotionOffer, now = Date.now()): boolean {
  const start = offer.startDate ? Date.parse(offer.startDate) : null;
  const end = offer.endDate ? Date.parse(offer.endDate) : null;
  if (start != null && now < start) return false;
  if (end != null && now > end) return false;
  return true;
}

function mapEpicDeal(element: EpicCatalogElement, offer: EpicPromotionOffer, kind: DealKind): UnifiedDeal {
  const price = element.price?.totalPrice;
  const discountPercent =
    kind === 'free'
      ? 100
      : price?.originalPrice && price?.discountPrice && price.originalPrice > 0
        ? Math.round(((price.originalPrice - price.discountPrice) / price.originalPrice) * 100)
        : null;

  return {
    id: `epic:${element.namespace ?? element.id}:${offer.startDate ?? kind}`,
    source: 'epic',
    kind,
    title: element.title ?? 'Jogo Epic Games',
    description: element.description ?? null,
    imageUrl: epicImageUrl(element),
    platform: 'epic',
    platforms: ['PC', 'Epic Games Store'],
    storeUrl: epicStoreUrl(element),
    originalPrice: price?.fmtPrice?.originalPrice ?? null,
    salePrice: price?.fmtPrice?.discountPrice ?? (kind === 'free' ? 'Grátis' : null),
    originalPriceValue: price?.originalPrice != null ? price.originalPrice / 100 : null,
    salePriceValue: price?.discountPrice != null ? price.discountPrice / 100 : null,
    discountPercent,
    currency: price?.currencyCode ?? 'BRL',
    startsAt: offer.startDate ?? null,
    endsAt: offer.endDate ?? null,
    status: kind === 'free' ? 'gratis' : 'promocao',
    freeTier: kind === 'free' ? 'temporary' : null,
  };
}

export async function fetchEpicFreeGames(): Promise<UnifiedDeal[]> {
  try {
    const elements = await fetchEpicCatalogElements();
    const deals: UnifiedDeal[] = [];
    const seen = new Set<string>();

    for (const element of elements) {
      for (const offer of collectPromotionOffers(element)) {
        if (!isFreePromotion(offer) || !isActivePromotion(offer)) continue;
        const deal = mapEpicDeal(element, offer, 'free');
        if (seen.has(deal.id)) continue;
        seen.add(deal.id);
        deals.push(deal);
      }
    }

    return deals;
  } catch (error: any) {
    logger.warn(`Epic free games falhou: ${error.message}`);
    return [];
  }
}

/** Promoções pagas Epic com desconto ativo (API REST oficial Epic). */
export async function fetchEpicSaleGames(): Promise<UnifiedDeal[]> {
  try {
    const elements = await fetchEpicCatalogElements();
    const deals: UnifiedDeal[] = [];
    const seen = new Set<string>();

    for (const element of elements) {
      const price = element.price?.totalPrice;
      const original = price?.originalPrice ?? 0;
      const discount = price?.discountPrice ?? 0;
      if (original <= 0 || discount <= 0 || discount >= original) continue;

      const offers = collectPromotionOffers(element).filter(isActivePromotion);
      const offer = offers[0] ?? { startDate: undefined, endDate: undefined };
      const deal = mapEpicDeal(element, offer, 'sale');
      if (seen.has(deal.id)) continue;
      seen.add(deal.id);
      deals.push(deal);
    }

    return deals;
  } catch (error: any) {
    logger.warn(`Epic sale games falhou: ${error.message}`);
    return [];
  }
}
