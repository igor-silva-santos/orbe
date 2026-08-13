import axios from 'axios';
import { logger } from '../logger';
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

function mapGamerPowerDeal(item: GamerPowerGiveaway): UnifiedDeal | null {
  if (!item.id || !item.title) return null;
  const platforms = (item.platforms ?? 'PC')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
  const storeUrl = item.open_giveaway_url ?? item.open_giveaway ?? item.gamerpower_url;
  if (!storeUrl) return null;

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
  };
}

export async function fetchGamerPowerGiveaways(options?: {
  platform?: string;
  type?: string;
}): Promise<UnifiedDeal[]> {
  try {
    const response = await gamerPowerApi.get('/giveaways', {
      params: {
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
