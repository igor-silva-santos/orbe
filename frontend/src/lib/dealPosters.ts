/**
 * Ordem de tentativa das capas em Promoções e jogos grátis.
 * A capsule antiga da Steam (`.../capsule_616x353.jpg` no Fastly) responde 403/404.
 * GamerPower às vezes responde 403 no navegador; o último recurso é o proxy same-origin.
 */

const DEAD_STEAM_CAPSULE = /\/steam\/apps\/\d+\/capsule_616x353\.jpg(?:$|\?)/i;

function steamLibraryImageUrl(appId: number): string {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
}

function steamHeaderImageUrl(appId: number): string {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;
}

function steamStoreHeaderImageUrl(appId: number): string {
  return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`;
}

function isGamerPowerImage(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname === 'www.gamerpower.com';
  } catch {
    return false;
  }
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
  if (!imageIsDead) push(trimmedImage);

  const appId =
    steamAppId != null && Number.isFinite(steamAppId) && steamAppId > 0 ? Math.trunc(steamAppId) : null;

  if (appId) {
    push(steamLibraryImageUrl(appId));
    push(steamHeaderImageUrl(appId));
    push(steamStoreHeaderImageUrl(appId));
    push(`/api/images/steam/${appId}`);
  }

  if (!imageIsDead && isGamerPowerImage(trimmedImage)) {
    push(`/api/images/poster?url=${encodeURIComponent(trimmedImage)}&v=1`);
  }

  return list;
}
