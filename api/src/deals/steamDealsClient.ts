import { prisma } from '../clients';
import { jogoQualityFilter } from '../qualityFilters';
import { fetchSteamFeaturedSales } from '../steamClient';
import { logger } from '../logger';
import { resolveDealImageUrl } from './dealImages';
import { formatBrlFromCents } from './dealPricing';
import type { UnifiedDeal } from './types';

function mapSteamDeal(input: {
  appId: number;
  title: string;
  discountPercent?: number | null;
  priceCents?: number | null;
  originalPriceCents?: number | null;
  imageUrl?: string | null;
  dealRating?: number | null;
}): UnifiedDeal | null {
  const { appId, title, discountPercent, priceCents, originalPriceCents, dealRating } = input;
  if (!appId || !title) return null;

  const discount = discountPercent ?? null;
  const isFree = priceCents === 0 || discount === 100;
  const hadPrice = (originalPriceCents ?? 0) > 0;

  return {
    id: `steam:${appId}`,
    source: 'steam',
    kind: isFree ? 'free' : 'sale',
    title,
    imageUrl: resolveDealImageUrl(input.imageUrl, appId),
    platform: 'steam',
    platforms: ['Steam'],
    storeUrl: `https://store.steampowered.com/app/${appId}`,
    originalPrice:
      originalPriceCents != null && originalPriceCents > 0
        ? formatBrlFromCents(originalPriceCents)
        : null,
    salePrice: priceCents != null ? (priceCents === 0 ? 'Grátis' : formatBrlFromCents(priceCents)) : null,
    salePriceValue: priceCents != null ? priceCents / 100 : null,
    originalPriceValue: originalPriceCents != null ? originalPriceCents / 100 : null,
    discountPercent: discount,
    currency: 'BRL',
    steamAppId: appId,
    dealRating: dealRating ?? null,
    status: isFree ? 'gratis' : 'promocao',
    freeTier: isFree ? (hadPrice ? 'temporary' : 'permanent') : null,
  };
}

export async function fetchSteamCatalogDeals(): Promise<UnifiedDeal[]> {
  try {
    const jogos = await prisma.jogo.findMany({
      where: {
        AND: [
          jogoQualityFilter,
          { steamAppId: { not: null } },
          {
            OR: [
              { steamDiscountPercent: { gte: 5 } },
              { AND: [{ steamDiscountPercent: 100 }, { steamPriceCents: 0 }] },
            ],
          },
        ],
      },
      orderBy: [{ steamDiscountPercent: 'desc' }, { rating: 'desc' }],
      take: 60,
      select: {
        name: true,
        steamAppId: true,
        steamPriceCents: true,
        steamDiscountPercent: true,
        rating: true,
        cover: true,
      },
    });

    return jogos
      .map((jogo) => {
        const appId = jogo.steamAppId;
        if (appId == null) return null;
        const priceCents = jogo.steamPriceCents ?? null;
        const discount = jogo.steamDiscountPercent ?? null;
        const originalPriceCents =
          priceCents != null && discount != null && discount > 0 && discount < 100
            ? Math.round(priceCents / (1 - discount / 100))
            : null;

        return mapSteamDeal({
          appId,
          title: jogo.name,
          discountPercent: discount,
          priceCents,
          originalPriceCents,
          dealRating: jogo.rating ?? null,
        });
      })
      .filter((deal): deal is UnifiedDeal => deal != null);
  } catch (error: any) {
    logger.warn(`Steam catalog deals falhou: ${error.message}`);
    return [];
  }
}

export async function fetchSteamFeaturedDeals(): Promise<UnifiedDeal[]> {
  try {
    const featured = await fetchSteamFeaturedSales();
    return featured
      .map((item) =>
        mapSteamDeal({
          appId: item.appId,
          title: item.name,
          discountPercent: item.discountPercent,
          priceCents: item.priceCents,
          originalPriceCents: item.originalPriceCents,
        }),
      )
      .filter((deal): deal is UnifiedDeal => deal != null);
  } catch (error: any) {
    logger.warn(`Steam featured deals falhou: ${error.message}`);
    return [];
  }
}

export async function fetchSteamDeals(): Promise<UnifiedDeal[]> {
  const [catalog, featured] = await Promise.all([
    fetchSteamCatalogDeals(),
    fetchSteamFeaturedDeals(),
  ]);

  const byAppId = new Map<number, UnifiedDeal>();
  for (const deal of [...featured, ...catalog]) {
    const appId = deal.steamAppId;
    if (appId == null) continue;
    const existing = byAppId.get(appId);
    if (!existing || (deal.dealRating ?? 0) > (existing.dealRating ?? 0)) {
      byAppId.set(appId, deal);
    }
  }

  return Array.from(byAppId.values());
}
