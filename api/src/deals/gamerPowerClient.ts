import axios from 'axios';
import { logger } from '../logger';
import { isOfficialStoreUrl } from './dealStoreUrl';
import type { DealPlatform, UnifiedDeal } from './types';

const gamerPowerApi = axios.create({
  baseURL: 'https://www.gamerpower.com/api',
  timeout: 20000,
});

type GamerPowerGiveaway = {
  id?: number;
  title?: string;
  worth?: string;
  thumbnail?: string;
  image?: string;
  description?: string;
  instructions?: string;
  open_giveaway_url?: string;
  open_giveaway?: string;
  published_date?: string;
  type?: string;
  platforms?: string;
  end_date?: string | null;
  status?: string;
  gamerpower_url?: string;
};

function mapPlatformLabel(raw: string): DealPlatform {
  const value = raw.toLowerCase();
  if (value.includes('steam')) return 'steam';
  if (value.includes('epic')) return 'epic';
  if (value.includes('gog')) return 'gog';
  if (value.includes('ubisoft')) return 'ubisoft';
  if (value.includes('origin') || value.includes('ea app')) return 'origin';
  if (value.includes('itch')) return 'itch';
  if (value.includes('xbox') || value.includes('microsoft')) return 'xbox';
  if (value.includes('playstation') || value.includes('ps4') || value.includes('ps5')) return 'playstation';
  if (value.includes('pc')) return 'pc';
  return 'other';
}

function primaryPlatform(platforms: string): DealPlatform {
  const parts = platforms.split(',').map((p) => p.trim()).filter(Boolean);
  for (const part of parts) {
    const mapped = mapPlatformLabel(part);
    if (mapped !== 'pc' && mapped !== 'other') return mapped;
  }
  return parts.length ? mapPlatformLabel(parts[0]) : 'other';
}

function parseWorthValue(worth?: string | null): number | null {
  if (!worth) return null;
  const normalized = worth.trim().toLowerCase();
  if (!normalized || normalized === 'n/a' || normalized === 'free') return 0;
  const match = normalized.replace(',', '.').match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const parsed = Number.parseFloat(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

function isGameGiveaway(item: GamerPowerGiveaway): boolean {
  const type = (item.type ?? 'game').trim().toLowerCase();
  return type === 'game' || type === 'games';
}

function mapGamerPowerDeal(item: GamerPowerGiveaway): UnifiedDeal | null {
  if (!item.id || !item.title) return null;
  if (!isGameGiveaway(item)) return null;
  const platforms = (item.platforms ?? 'PC')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
  const storeUrl = item.open_giveaway_url ?? item.open_giveaway;
  if (!storeUrl || !isOfficialStoreUrl(storeUrl)) return null;

  const worthValue = parseWorthValue(item.worth);
  const hasEndDate = Boolean(item.end_date?.trim());

  return {
    id: `gamerpower:${item.id}`,
    source: 'gamerpower',
    kind: 'free',
    title: item.title,
    description: item.description ?? null,
    imageUrl: item.image ?? item.thumbnail ?? null,
    platform: primaryPlatform(item.platforms ?? ''),
    platforms: platforms.length ? platforms : ['PC'],
    storeUrl,
    worth: item.worth ?? null,
    instructions: item.instructions ?? null,
    endsAt: item.end_date ?? null,
    status: item.status?.toLowerCase() ?? 'active',
    freeTier: hasEndDate || (worthValue != null && worthValue > 0) ? 'temporary' : 'permanent',
  };
}

export async function fetchGamerPowerGiveaways(options?: {
  platform?: string;
  type?: string;
}): Promise<UnifiedDeal[]> {
  try {
    const response = await gamerPowerApi.get('/giveaways', {
      params: {
        type: 'game',
        ...(options?.platform ? { platform: options.platform } : {}),
        ...(options?.type ? { type: options.type } : {}),
      },
    });
    const items: GamerPowerGiveaway[] = Array.isArray(response.data) ? response.data : [];
    return items
      .map(mapGamerPowerDeal)
      .filter((deal): deal is UnifiedDeal => deal != null);
  } catch (error: any) {
    logger.warn(`GamerPower giveaways falhou: ${error.message}`);
    return [];
  }
}
