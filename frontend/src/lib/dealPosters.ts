/**
 * Capas que o navegador pode pedir em Promoções.
 *
 * A CDN da Steam e o site da GamerPower respondem 403 no navegador (hotlink).
 * Cada URL dessas vira um erro no console e o Next ainda faz preload dela.
 * O browser só recebe o proxy da própria origem (`/api/images/...`), que busca
 * a imagem no servidor. Epic, itch e IGDB seguem com a URL original.
 */

const DEAD_STEAM_CAPSULE = /\/steam\/apps\/\d+\/capsule_616x353\.jpg(?:$|\?)/i;
const STEAM_APP_IN_URL = /\/steam\/apps\/(\d+)\//i;

function isGamerPowerImage(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname === 'www.gamerpower.com';
  } catch {
    return false;
  }
}

function isSteamCdnImage(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname;
    return host === 'steamcdn-a.akamaihd.net' || host === 'media.steampowered.com' || host.endsWith('steamstatic.com');
  } catch {
    return false;
  }
}

function appIdFromImage(url: string): number | null {
  const match = url.match(STEAM_APP_IN_URL);
  if (!match) return null;
  const id = Number(match[1]);
  return Number.isFinite(id) && id > 0 ? Math.trunc(id) : null;
}

function posterProxy(url: string): string {
  return `/api/images/poster?url=${encodeURIComponent(url)}&v=1`;
}

export function dealPosterCandidates(
  imageUrl: string | null | undefined,
  steamAppId: number | null | undefined,
): string[] {
  const list: string[] = [];
  const push = (url: string | null | undefined) => {
    const trimmed = url?.trim();
    if (!trimmed || list.includes(trimmed)) return;
    if (DEAD_STEAM_CAPSULE.test(trimmed)) return;
    list.push(trimmed);
  };

  const trimmedImage = imageUrl?.trim() ?? '';
  const imageIsDead = trimmedImage !== '' && DEAD_STEAM_CAPSULE.test(trimmedImage);
  const fromArg =
    steamAppId != null && Number.isFinite(steamAppId) && steamAppId > 0 ? Math.trunc(steamAppId) : null;
  const appId = fromArg ?? (trimmedImage ? appIdFromImage(trimmedImage) : null);
  const steamCdn = trimmedImage !== '' && isSteamCdnImage(trimmedImage);
  const gamerPower = trimmedImage !== '' && isGamerPowerImage(trimmedImage);

  if (trimmedImage && !imageIsDead && !steamCdn && !gamerPower) {
    push(trimmedImage);
  }

  if (appId) {
    push(`/api/images/steam/${appId}`);
  }

  if (gamerPower && !imageIsDead) {
    push(posterProxy(trimmedImage));
  } else if (steamCdn && !imageIsDead && !appId) {
    push(posterProxy(trimmedImage));
  }

  return list;
}
