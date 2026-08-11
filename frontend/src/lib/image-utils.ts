const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
const IGDB_IMAGE_BASE = 'https://images.igdb.com/igdb/image/upload';

export const PLACEHOLDER_POSTER = '/placeholder.svg';
export const PLACEHOLDER_AVATAR = '/placeholder.svg';

export type TmdbImageSize = 'w92' | 'w185' | 'w342' | 'w500' | 'w780';

export const TMDB_CARD_SIZE: TmdbImageSize = 'w342';
export const TMDB_THUMB_SIZE: TmdbImageSize = 'w185';
export const TMDB_FULL_SIZE: TmdbImageSize = 'w500';

/** Tiny SVG blur placeholder for next/image */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjI4IiBmaWxsPSIjMWExYTJlIi8+PC9zdmc+';

function buildTmdbUrl(path: string, size: TmdbImageSize): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${TMDB_IMAGE_BASE}/${size}${normalizedPath}`;
}

function resizeTmdbUrl(url: string, size: TmdbImageSize): string {
  return url.replace(/\/t\/p\/w\d+/, `/t/p/${size}`);
}

/**
 * Resolve URLs de imagem vindas da API para um endereço absoluto utilizável no frontend.
 */
export function resolveImageUrl(
  url: string | null | undefined,
  size: TmdbImageSize = TMDB_CARD_SIZE
): string | null {
  if (!url || url.trim() === '') return null;

  const trimmed = url.trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    if (trimmed.includes('image.tmdb.org')) {
      return resizeTmdbUrl(trimmed, size);
    }
    return trimmed;
  }

  if (trimmed.startsWith('/api/images/igdb')) {
    const path = trimmed.replace('/api/images/igdb', '');
    return `${IGDB_IMAGE_BASE}${path}`;
  }

  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  if (trimmed.startsWith('/t_p/') || trimmed.startsWith('/')) {
    return buildTmdbUrl(trimmed, size);
  }

  return trimmed;
}

export function getImageSrc(
  url: string | null | undefined,
  size: TmdbImageSize = TMDB_CARD_SIZE
): string {
  return resolveImageUrl(url, size) ?? PLACEHOLDER_POSTER;
}

export function isValidImageUrl(url: string | null | undefined): boolean {
  return resolveImageUrl(url) !== null;
}

/** Hosts liberados em next.config.mjs `images.remotePatterns`. */
const ALLOWED_REMOTE_IMAGE_HOSTS = new Set([
  'image.tmdb.org',
  's4.anilist.co',
  'images.igdb.com',
  'logos-world.net',
  'store.steampowered.com',
  'www.playstation.com',
]);

/**
 * next/image lança erro em runtime se o host não estiver em `remotePatterns`
 * (ex: avatar com URL arbitrária cadastrada pelo usuário). Usar antes de
 * renderizar <Image src={...}> com URLs vindas de input livre do usuário.
 */
export function isAllowedRemoteImageHost(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && ALLOWED_REMOTE_IMAGE_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}
