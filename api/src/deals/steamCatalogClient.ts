import { prisma } from '../clients';
import { mapJogoToMidia } from '../mappers';
import { jogoQualityFilter } from '../qualityFilters';
import { logger } from '../logger';
import type { UnifiedDeal } from './types';

export type SteamCatalogCarouselItem = ReturnType<typeof mapJogoToMidia>;

function formatBRL(cents: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
}

function estimateOriginalPriceCents(saleCents: number, discountPercent: number): number | null {
  if (discountPercent <= 0 || discountPercent >= 100) return null;
  return Math.round(saleCents / (1 - discountPercent / 100));
}

export function mapJogoToSteamDeal(jogo: {
  id: number;
  titulo: string | null;
  tituloCurado: string | null;
  posterUrl: string | null;
  steamAppId: number | null;
  steamPriceCents: number | null;
  steamDiscountPercent: number | null;
  steamPlayerCount: number | null;
  hypes: number | null;
}): UnifiedDeal | null {
  if (!jogo.steamAppId || jogo.steamDiscountPercent == null || jogo.steamDiscountPercent < 5) {
    return null;
  }
  if (jogo.steamPriceCents == null || jogo.steamPriceCents < 0) return null;

  const mapped = mapJogoToMidia(jogo);
  const discount = jogo.steamDiscountPercent;
  const saleCents = jogo.steamPriceCents;
  const originalCents = estimateOriginalPriceCents(saleCents, discount);

  return {
    id: `steam:${jogo.steamAppId}`,
    source: 'steam',
    kind: 'sale',
    title: mapped.titulo_curado || mapped.titulo_api || 'Jogo Steam',
    imageUrl: mapped.poster_url_api ?? null,
    platform: 'steam',
    platforms: ['Steam'],
    storeUrl: `https://store.steampowered.com/app/${jogo.steamAppId}`,
    originalPrice: originalCents != null && originalCents > saleCents ? formatBRL(originalCents) : null,
    salePrice: formatBRL(saleCents),
    discountPercent: discount,
    currency: 'BRL',
    steamAppId: jogo.steamAppId,
    dealRating: jogo.steamPlayerCount ?? jogo.hypes ?? null,
    status: 'on_sale',
  };
}

export type SteamCatalogPayload = {
  deals: UnifiedDeal[];
  carousel: ReturnType<typeof mapJogoToMidia>[];
};

export async function fetchSteamCatalogSales(): Promise<SteamCatalogPayload> {
  try {
    const jogos = await prisma.jogo.findMany({
      where: {
        AND: [
          jogoQualityFilter,
          { steamAppId: { not: null } },
          { steamDiscountPercent: { gte: 5 } },
          { steamPriceCents: { not: null } },
        ],
      },
      orderBy: [
        { steamPlayerCount: 'desc' },
        { hypes: 'desc' },
        { steamDiscountPercent: 'desc' },
      ],
      take: 80,
      include: {
        platforms: { include: { plataforma: true } },
        genres: { include: { genero: true } },
        gameModes: { include: { gameMode: true } },
      },
    });

    const carousel = jogos.map((jogo) => mapJogoToMidia(jogo));
    const deals = jogos
      .map((jogo) => mapJogoToSteamDeal(jogo))
      .filter((deal): deal is UnifiedDeal => deal != null);

    return { deals, carousel };
  } catch (error: any) {
    logger.warn(`Steam catalog sales falhou: ${error.message}`);
    return { deals: [], carousel: [] };
  }
}
