import axios from 'axios';
import * as cheerio from 'cheerio';
import { logger } from '../logger';
import type { UnifiedDeal } from './types';

const ITCH_USER_AGENT = 'OrbeNerd/1.0 (promocoes@orbe.app)';

const itchApi = axios.create({
  baseURL: 'https://itch.io',
  timeout: 20000,
  headers: {
    'User-Agent': ITCH_USER_AGENT,
    Accept: 'application/json',
  },
});

type ItchBrowseResponse = {
  num_items?: number;
  page?: number;
  content?: string;
};

export type ItchBrowseGameRow = {
  gameId: string;
  title: string;
  storeUrl: string;
  imageUrl?: string | null;
  description?: string | null;
  salePrice?: string | null;
  discountPercent?: number | null;
  platforms: string[];
};

function absoluteItchUrl(href: string | undefined): string | null {
  if (!href) return null;
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  return `https://itch.io${href.startsWith('/') ? href : `/${href}`}`;
}

function parseUsdPrice(raw?: string | null): number | null {
  if (!raw) return null;
  const match = raw.trim().replace(/,/g, '').match(/\$?\s*(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const parsed = Number.parseFloat(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseDiscountPercent(raw?: string | null): number | null {
  if (!raw) return null;
  const normalized = raw.trim().toLowerCase();
  if (!normalized || normalized.includes('bundle')) return null;
  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const value = Number.parseFloat(match[1]);
  return Number.isFinite(value) ? Math.round(value) : null;
}

function computeOriginalPrice(salePrice: number | null, discountPercent: number | null): number | null {
  if (salePrice == null || discountPercent == null || discountPercent <= 0 || discountPercent >= 100) {
    return null;
  }
  const factor = 1 - discountPercent / 100;
  if (factor <= 0) return null;
  return Math.round((salePrice / factor) * 100) / 100;
}

export function mapItchBrowseGame(row: ItchBrowseGameRow, browseKind: 'free' | 'sale'): UnifiedDeal | null {
  if (!row.gameId || !row.title || !row.storeUrl) return null;

  const salePriceValue = parseUsdPrice(row.salePrice);
  const discountPercent = row.discountPercent ?? null;
  const isTemporaryFree =
    browseKind === 'sale' && (discountPercent === 100 || salePriceValue === 0);
  const kind = isTemporaryFree ? 'free' : browseKind === 'free' ? 'free' : 'sale';

  const originalPriceValue =
    kind === 'sale' ? computeOriginalPrice(salePriceValue, discountPercent) : null;

  return {
    id: `itch:${row.gameId}`,
    source: 'itch',
    kind,
    title: row.title,
    description: row.description ?? null,
    imageUrl: row.imageUrl ?? null,
    platform: 'itch',
    platforms: row.platforms.length ? row.platforms : ['itch.io'],
    storeUrl: row.storeUrl,
    originalPrice:
      originalPriceValue != null ? `$${originalPriceValue.toFixed(2)}` : null,
    salePrice:
      salePriceValue != null
        ? salePriceValue === 0
          ? '$0.00'
          : row.salePrice ?? `$${salePriceValue.toFixed(2)}`
        : null,
    originalPriceValue,
    salePriceValue,
    discountPercent,
    currency: 'USD',
    status: browseKind === 'sale' ? 'on_sale' : 'active',
    freeTier:
      kind === 'free'
        ? isTemporaryFree || (originalPriceValue != null && originalPriceValue > 0)
          ? 'temporary'
          : 'permanent'
        : null,
  };
}

export function parseItchBrowseHtml(html: string, browseKind: 'free' | 'sale'): UnifiedDeal[] {
  const $ = cheerio.load(html);
  const deals: UnifiedDeal[] = [];

  $('.game_cell[data-game_id]').each((_, element) => {
    const gameId = $(element).attr('data-game_id')?.trim();
    const titleLink = $(element).find('a.title.game_link').first();
    const title = titleLink.text().trim();
    const storeUrl = absoluteItchUrl(titleLink.attr('href'));
    const imageUrl =
      $(element).find('img').attr('data-lazy_src') ??
      $(element).find('img').attr('src') ??
      null;
    const description = $(element).find('.game_text').first().text().trim() || null;
    const salePrice = $(element).find('.price_value').first().text().trim() || null;
    const discountPercent = parseDiscountPercent($(element).find('.sale_tag').first().text());

    const platforms: string[] = [];
    $(element)
      .find('.game_platform span[title]')
      .each((__, platformEl) => {
        const label = $(platformEl).attr('title')?.replace(/^Download for /, '').trim();
        if (label) platforms.push(label);
      });

    const deal = mapItchBrowseGame(
      {
        gameId: gameId ?? '',
        title,
        storeUrl: storeUrl ?? '',
        imageUrl,
        description,
        salePrice,
        discountPercent,
        platforms,
      },
      browseKind,
    );

    if (deal) deals.push(deal);
  });

  return deals;
}

async function fetchItchBrowsePage(
  path: '/games/free' | '/games/on-sale',
  page: number,
): Promise<UnifiedDeal[]> {
  const browseKind = path === '/games/free' ? 'free' : 'sale';
  const response = await itchApi.get<ItchBrowseResponse>(path, {
    params: { page, format: 'json' },
  });

  const content = response.data?.content;
  if (!content) return [];

  return parseItchBrowseHtml(content, browseKind);
}

async function fetchItchBrowseGames(
  path: '/games/free' | '/games/on-sale',
  options?: { maxPages?: number },
): Promise<UnifiedDeal[]> {
  const maxPages = options?.maxPages ?? 2;
  const all: UnifiedDeal[] = [];

  for (let page = 1; page <= maxPages; page++) {
    const batch = await fetchItchBrowsePage(path, page);
    if (batch.length === 0) break;
    all.push(...batch);
    if (batch.length < 30) break;
  }

  return all;
}

/** Jogos permanentemente grátis no itch.io (preço base zero). */
export async function fetchItchFreeGames(options?: { maxPages?: number }): Promise<UnifiedDeal[]> {
  try {
    return await fetchItchBrowseGames('/games/free', options);
  } catch (error: any) {
    logger.warn(`itch.io free games falhou: ${error.message}`);
    return [];
  }
}

/** Promoções ativas no itch.io (inclui 100% de desconto como kind=free). */
export async function fetchItchOnSaleGames(options?: { maxPages?: number }): Promise<UnifiedDeal[]> {
  try {
    return await fetchItchBrowseGames('/games/on-sale', options);
  } catch (error: any) {
    logger.warn(`itch.io on-sale games falhou: ${error.message}`);
    return [];
  }
}
