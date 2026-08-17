import { prisma } from '../clients';
import { jogoQualityFilter } from '../qualityFilters';
import { resolveIgdbImageUrl } from '../igdbImageUrl';
import { logger } from '../logger';
import { formatBrlFromCents } from './dealPricing';
import type { UnifiedDeal } from './types';

function posterFromJogo(jogo: {
  cover?: string | null;
  screenshots?: { url?: string | null }[];
}): string | null {
  const cover = resolveIgdbImageUrl(jogo.cover);
  if (cover) return cover;
  const shot = jogo.screenshots?.find((s) => s?.url)?.url;
  return resolveIgdbImageUrl(shot);
}

/** Promoções Steam do catálogo Orbe (IGDB) — mesma base de /jogos-em-alta. */
export async function fetchCatalogSteamPromotions(): Promise<UnifiedDeal[]> {
  try {
    const jogos = await prisma.jogo.findMany({
      where: {
        AND: [
          jogoQualityFilter,
          { steamAppId: { not: null } },
          { steamDiscountPercent: { gte: 10 } },
        ],
      },
      orderBy: [{ steamDiscountPercent: 'desc' }, { rating: 'desc' }],
      take: 40,
      select: {
        igdbId: true,
        name: true,
        steamAppId: true,
        steamPriceCents: true,
        steamDiscountPercent: true,
        rating: true,
        cover: true,
        screenshots: { take: 1, select: { url: true } },
      },
    });

    return jogos
      .map((jogo): UnifiedDeal | null => {
        const appId = jogo.steamAppId;
        if (appId == null) return null;
        const priceCents = jogo.steamPriceCents ?? null;
        const discount = jogo.steamDiscountPercent ?? null;
        const originalPriceCents =
          priceCents != null && discount != null && discount > 0 && discount < 100
            ? Math.round(priceCents / (1 - discount / 100))
            : null;

        return {
          id: `orbe:${jogo.igdbId}`,
          source: 'orbe',
          kind: 'sale',
          title: jogo.name,
          imageUrl: posterFromJogo(jogo),
          platform: 'steam',
          platforms: ['Steam', 'Catálogo Orbe'],
          storeUrl: `https://store.steampowered.com/app/${appId}`,
          originalPrice:
            originalPriceCents != null && originalPriceCents > 0
              ? formatBrlFromCents(originalPriceCents)
              : null,
          salePrice:
            priceCents != null
              ? priceCents === 0
                ? 'Grátis'
                : formatBrlFromCents(priceCents)
              : null,
          salePriceValue: priceCents != null ? priceCents / 100 : null,
          originalPriceValue: originalPriceCents != null ? originalPriceCents / 100 : null,
          discountPercent: discount,
          currency: 'BRL',
          steamAppId: appId,
          dealRating: jogo.rating ?? null,
          status: 'promocao',
          orbeGameId: jogo.igdbId,
          orbeUrl: `/jogos/${jogo.igdbId}`,
        };
      })
      .filter((deal): deal is UnifiedDeal => deal != null);
  } catch (error: any) {
    logger.warn(`Catálogo Orbe promoções falhou: ${error.message}`);
    return [];
  }
}

/** Enriquece deals externos com link para página do jogo no Orbe quando há steamAppId. */
export async function enrichDealsWithOrbeLinks(deals: UnifiedDeal[]): Promise<UnifiedDeal[]> {
  const appIds = [
    ...new Set(
      deals
        .map((deal) => deal.steamAppId)
        .filter((id): id is number => id != null && Number.isFinite(id)),
    ),
  ];
  if (appIds.length === 0) return deals;

  try {
    const jogos = await prisma.jogo.findMany({
      where: { steamAppId: { in: appIds } },
      select: { igdbId: true, steamAppId: true },
    });
    const byAppId = new Map(jogos.map((j) => [j.steamAppId!, j.igdbId]));

    return deals.map((deal) => {
      if (deal.orbeGameId || deal.steamAppId == null) return deal;
      const igdbId = byAppId.get(deal.steamAppId);
      if (!igdbId) return deal;
      return {
        ...deal,
        orbeGameId: igdbId,
        orbeUrl: `/jogos/${igdbId}`,
      };
    });
  } catch (error: any) {
    logger.warn(`Enriquecimento Orbe falhou: ${error.message}`);
    return deals;
  }
}
