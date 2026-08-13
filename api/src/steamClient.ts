import axios from 'axios';
import { logger } from './logger';

export const steamStoreApi = axios.create({
  baseURL: 'https://store.steampowered.com/api',
  timeout: 20000,
});

export const steamWebApi = axios.create({
  baseURL: 'https://api.steampowered.com',
  timeout: 20000,
});

export type SteamPcRequirements = {
  minimum?: string;
  recommended?: string;
};

export type SteamAppDetails = {
  appId: number;
  name: string;
  shortDescription?: string;
  headerImage?: string;
  isFree?: boolean;
  priceCents?: number;
  discountPercent?: number;
  pcRequirements?: SteamPcRequirements;
  playerCount?: number;
};

export type SteamFeaturedItem = {
  appId: number;
  name: string;
  discountPercent?: number;
  priceCents?: number;
  originalPriceCents?: number;
};

/** Teto conservador para preço Steam em centavos BRL (R$ 5.000) */
export const MAX_PLAUSIBLE_BRL_STEAM_PRICE_CENTS = 500_000;

export function isPlausibleBrlSteamPriceCents(cents: number | null | undefined): boolean {
  if (cents == null || cents < 0) return false;
  if (cents === 0) return true;
  return cents <= MAX_PLAUSIBLE_BRL_STEAM_PRICE_CENTS;
}

/** Extrai Steam App ID de URLs da loja */
export function extractSteamAppId(url: string): number | null {
  const match = url.match(/steampowered\.com\/app\/(\d+)/i);
  return match ? parseInt(match[1], 10) : null;
}

/** Detalhes do jogo na Steam Store (sem chave de API) */
export async function fetchSteamAppDetails(appId: number): Promise<SteamAppDetails | null> {
  try {
    const response = await steamStoreApi.get('/appdetails', {
      params: { appids: appId, l: 'portuguese', cc: 'br' },
    });
    const entry = response.data?.[appId];
    if (!entry?.success || !entry.data) return null;

    const data = entry.data;
    const priceOverview = data.price_overview;
    const pcReq = data.pc_requirements;

    return {
      appId,
      name: data.name,
      shortDescription: data.short_description,
      headerImage: data.header_image,
      isFree: data.is_free,
      priceCents: priceOverview?.final ?? (data.is_free ? 0 : undefined),
      discountPercent: priceOverview?.discount_percent,
      pcRequirements: pcReq
        ? {
            minimum: pcReq.minimum,
            recommended: pcReq.recommended,
          }
        : undefined,
    };
  } catch (error: any) {
    logger.warn(`Steam appdetails falhou para ${appId}: ${error.message}`);
    return null;
  }
}

/** Jogos em promoção e destaques da loja Steam (sem chave) */
export async function fetchSteamFeaturedSales(): Promise<SteamFeaturedItem[]> {
  try {
    const response = await steamStoreApi.get('/featuredcategories/', {
      params: { cc: 'br', l: 'portuguese' },
    });
    const specials = response.data?.specials?.items ?? [];
    const dailyDeals = response.data?.daily_deal?.items ?? [];
    const topSellers = response.data?.top_sellers?.items ?? [];

    const items: SteamFeaturedItem[] = [];
    const seen = new Set<number>();

    for (const item of [...specials, ...dailyDeals, ...topSellers]) {
      const appId = item.id ?? item.appid;
      if (!appId || seen.has(appId)) continue;
      seen.add(appId);

      const discount = item.discount_percent;
      const finalPrice = item.final_price ?? item.final;
      const originalPrice = item.original_price ?? item.initial;
      const currency = String(item.currency ?? 'BRL').toUpperCase();

      items.push({
        appId,
        name: item.name ?? `Steam App ${appId}`,
        discountPercent: discount,
        priceCents:
          currency === 'BRL' && isPlausibleBrlSteamPriceCents(finalPrice) ? finalPrice : undefined,
        originalPriceCents:
          currency === 'BRL' && isPlausibleBrlSteamPriceCents(originalPrice)
            ? originalPrice
            : undefined,
      });
    }

    return items;
  } catch (error: any) {
    logger.error(`Erro ao buscar featuredcategories Steam: ${error.message}`);
    return [];
  }
}

/** Mais jogados agora na Steam (requer STEAM_API_KEY) */
export async function fetchSteamMostPlayed(): Promise<{ appId: number; playerCount: number }[]> {
  const key = process.env.STEAM_API_KEY;
  if (!key) {
    logger.info('STEAM_API_KEY não configurada — pulando mais jogados Steam.');
    return [];
  }

  try {
    const response = await steamWebApi.get('/ISteamChartsService/GetMostPlayedGames/v1/', {
      params: { key, format: 'json' },
    });
    const ranks = response.data?.response?.ranks ?? [];
    return ranks
      .map((r: { appid?: number; concurrent_in_game?: number }) => ({
        appId: r.appid!,
        playerCount: r.concurrent_in_game ?? 0,
      }))
      .filter((r: { appId: number }) => r.appId);
  } catch (error: any) {
    logger.warn(`GetMostPlayedGames Steam falhou: ${error.message}`);
    return [];
  }
}

/** Jogadores atuais de um app (requer STEAM_API_KEY) */
export async function fetchSteamCurrentPlayers(appId: number): Promise<number | null> {
  const key = process.env.STEAM_API_KEY;
  if (!key) return null;

  try {
    const response = await steamWebApi.get('/IPlayerService/GetNumberOfCurrentPlayers/v1/', {
      params: { key, format: 'json', appid: appId },
    });
    return response.data?.response?.player_count ?? null;
  } catch {
    return null;
  }
}

