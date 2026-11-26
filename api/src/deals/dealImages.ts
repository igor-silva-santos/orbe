/**
 * Capa vertical da Steam.
 * `shared.fastly.steamstatic.com/steam/apps/{id}/capsule_616x353.jpg` deixou de existir
 * (404 aqui; 403 em algumas redes) e o card ficava sem pôster.
 */
export function steamLibraryImageUrl(appId: number): string {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
}

export function steamHeaderImageUrl(appId: number): string {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;
}

/** Header sem hash em store_item_assets — cobre jogos cujo header clássico ainda não existe. */
export function steamStoreHeaderImageUrl(appId: number): string {
  return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`;
}

const POSTER_HOSTS = new Set([
  'www.gamerpower.com',
  'cdn.akamai.steamstatic.com',
  'cdn.cloudflare.steamstatic.com',
  'shared.akamai.steamstatic.com',
  'shared.fastly.steamstatic.com',
  'shared.cloudflare.steamstatic.com',
  'shared.steamstatic.com',
  'steamcdn-a.akamaihd.net',
]);

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

/** Hosts de capa que o proxy same-origin pode buscar. Bloqueia SSRF fora dessa lista. */
export function isAllowedPosterUrl(raw: string): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }

  if (url.protocol !== 'https:') return false;
  if (url.username || url.password) return false;
  if (!POSTER_HOSTS.has(url.hostname)) return false;
  if (url.pathname.includes('..') || url.pathname.includes('\\')) return false;
  if (!IMAGE_EXT.test(url.pathname)) return false;
  if (url.hostname === 'www.gamerpower.com' && !url.pathname.startsWith('/offers/')) return false;
  return true;
}

/** Prioriza a capa Steam quando há appId; senão mantém a URL original. */
export function resolveDealImageUrl(
  imageUrl: string | null | undefined,
  steamAppId: number | null | undefined,
): string | null {
  if (steamAppId != null && Number.isFinite(steamAppId) && steamAppId > 0) {
    return steamLibraryImageUrl(steamAppId);
  }
  return imageUrl?.trim() || null;
}
