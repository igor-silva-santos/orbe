import axios from 'axios';
import { logger } from '../logger';
import type { DealKind, UnifiedDeal } from './types';

const epicStoreApi = axios.create({
  baseURL: 'https://store-site-backend-static.ak.epicgames.com',
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

type EpicCatalogElement = {
  title?: string;
  id?: string;
  namespace?: string;
  description?: string;
  productSlug?: string;
  urlSlug?: string;
  keyImages?: { type?: string; url?: string }[];
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

function epicImageUrl(element: EpicCatalogElement): string | null {
  const images = element.keyImages ?? [];
  const wide = images.find((img) => img.type === 'OfferImageWide');
  const tall = images.find((img) => img.type === 'OfferImageTall');
  const thumb = images.find((img) => img.type === 'Thumbnail');
  return wide?.url ?? tall?.url ?? thumb?.url ?? null;
}

function epicStoreUrl(element: EpicCatalogElement): string {
  if (element.productSlug) {
    return `https://store.epicgames.com/pt-BR/p/${element.productSlug}`;
  }
  if (element.namespace && element.urlSlug) {
    return `https://store.epicgames.com/pt-BR/p/${element.urlSlug}`;
  }
  return 'https://store.epicgames.com/pt-BR/free-games';
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
    discountPercent,
    currency: price?.currencyCode ?? 'BRL',
    startsAt: offer.startDate ?? null,
    endsAt: offer.endDate ?? null,
    status: kind === 'free' ? 'gratis' : 'promocao',
  };
}

export async function fetchEpicFreeGames(): Promise<UnifiedDeal[]> {
  try {
    const response = await epicStoreApi.get('/freeGamesPromotions', {
      params: { locale: 'pt-BR', country: 'BR', allowUnpublished: true },
    });
    const elements: EpicCatalogElement[] =
      response.data?.data?.Catalog?.searchStore?.elements ?? [];

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
