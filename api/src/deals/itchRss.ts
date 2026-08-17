import crypto from 'crypto';
import * as cheerio from 'cheerio';
import type { UnifiedDeal } from './types';
import type { ItchBrowseGameRow } from './itchClient';
import { mapItchBrowseGame } from './itchClient';

export type ItchRssItemRow = {
  gameId: string;
  title: string;
  storeUrl: string;
  imageUrl?: string | null;
  salePrice?: string | null;
  fullPrice?: string | null;
  discountPercent?: number | null;
  saleEnds?: string | null;
  platforms: string[];
};

function itchIdFromGuid(guid: string): string {
  const match = guid.match(/itch\.io\/([^/?#]+)/i);
  if (match?.[1]) return match[1];
  return crypto.createHash('md5').update(guid).digest('hex').slice(0, 12);
}

function platformLabelFromTag(tagName?: string): string | null {
  if (!tagName) return null;
  const map: Record<string, string> = {
    windows: 'Windows',
    osx: 'macOS',
    linux: 'Linux',
    android: 'Android',
    html: 'HTML5',
  };
  return map[tagName.toLowerCase()] ?? tagName;
}

export function parseItchRssXml(xml: string, browseKind: 'free' | 'sale'): UnifiedDeal[] {
  const $ = cheerio.load(xml, { xmlMode: true });
  const deals: UnifiedDeal[] = [];

  $('item').each((_, element) => {
    const guid = $(element).find('guid').first().text().trim();
    const link = $(element).find('link').first().text().trim();
    const plainTitle = $(element).find('plainTitle').first().text().trim();
    const title = plainTitle || $(element).find('title').first().text().trim();
    const storeUrl = link || guid;
    const imageUrl = $(element).find('imageurl').first().text().trim() || null;
    const salePrice = $(element).find('price').first().text().trim() || null;
    const fullPrice = $(element).find('fullPrice').first().text().trim() || null;
    const discountRaw = $(element).find('discountpercent').first().text().trim();
    const discountPercent = discountRaw ? Number.parseInt(discountRaw, 10) : null;
    const saleEnds = $(element).find('saleends').first().text().trim() || null;

    const platforms: string[] = [];
    $(element)
      .find('platforms')
      .children()
      .each((__, platformEl) => {
        const tag = (platformEl as { tagName?: string }).tagName?.toLowerCase();
        const enabled = $(platformEl).text().trim().toLowerCase() === 'yes';
        if (!enabled || !tag) return;
        const label = platformLabelFromTag(tag);
        if (label) platforms.push(label);
      });

    const deal = mapItchBrowseGame(
      {
        gameId: itchIdFromGuid(guid || storeUrl),
        title,
        storeUrl,
        imageUrl,
        salePrice,
        discountPercent: Number.isFinite(discountPercent ?? NaN) ? discountPercent : null,
        platforms,
      },
      browseKind,
    );

    if (deal && saleEnds) {
      const endsAt = new Date(saleEnds);
      if (!Number.isNaN(endsAt.getTime())) {
        deal.endsAt = endsAt.toISOString();
      }
    }

    if (deal && browseKind === 'sale' && fullPrice && deal.originalPriceValue == null) {
      const match = fullPrice.replace(/,/g, '').match(/\$?\s*(\d+(?:\.\d+)?)/);
      if (match) {
        deal.originalPriceValue = Number.parseFloat(match[1]);
        deal.originalPrice = fullPrice;
      }
    }

    if (deal) deals.push(deal);
  });

  return deals;
}
