const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const PLACEHOLDER_POSTER = '/placeholder.svg';
export const PLACEHOLDER_AVATAR = '/placeholder.svg';

export type TmdbImageSize = 'w92' | 'w185' | 'w342' | 'w500' | 'w780';

export const TMDB_CARD_SIZE: TmdbImageSize = 'w342';
export const TMDB_THUMB_SIZE: TmdbImageSize = 'w185';
export const TMDB_FULL_SIZE: TmdbImageSize = 'w500';

/** Tiny SVG blur placeholder for next/image */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjI4IiBmaWxsPSIjMWExYTJlIi8+PC9zdmc+';

function encodeSvgToDataUrl(svg: string): string {
  const base64 =
    typeof btoa === 'function'
      ? btoa(svg)
      : Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/** Placeholder blur determinístico por URL de poster (evita flash idêntico em todos os cards). */
export function getPosterBlurDataUrl(src: string | null | undefined): string {
  if (!src || src.trim() === '') return BLUR_DATA_URL;

  let hash = 0;
  for (let i = 0; i < src.length; i += 1) {
    hash = (hash * 31 + src.charCodeAt(i)) | 0;
  }

  const hue = Math.abs(hash) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="28"><rect width="20" height="28" fill="hsl(${hue}, 22%, 18%)"/></svg>`;
  return encodeSvgToDataUrl(svg);
}

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

  if (trimmed.startsWith('/api/images/igdb')) {
    return trimmed;
  }

  if (trimmed.includes('images.igdb.com')) {
    try {
      const absolute = trimmed.startsWith('//') ? `https:${trimmed}` : trimmed;
      const parsed = new URL(absolute, 'https://images.igdb.com');
      const marker = '/igdb/image/upload';
      const markerIndex = parsed.pathname.indexOf(marker);
      if (markerIndex >= 0) {
        const suffix = parsed.pathname.slice(markerIndex + marker.length);
        if (suffix) {
          return `/api/images/igdb${suffix}`;
        }
      }
    } catch {
      // fall through
    }
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    if (trimmed.includes('image.tmdb.org')) {
      return resizeTmdbUrl(trimmed, size);
    }
    return trimmed;
  }

  if (trimmed.startsWith('/api/images/igdb')) {
    return trimmed;
  }

  if (trimmed.startsWith('//')) {
    if (trimmed.includes('images.igdb.com')) {
      return resolveImageUrl(`https:${trimmed}`, size);
    }
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

/** IGDB covers via /api/images/igdb proxy or direct images.igdb.com — skip Vercel image optimizer. */
export function isIgdbOrProxyImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('/api/images/igdb')) return true;
  try {
    const parsed = new URL(trimmed.startsWith('//') ? `https:${trimmed}` : trimmed, 'http://n');
    return (
      parsed.pathname.startsWith('/api/images/igdb') || parsed.hostname === 'images.igdb.com'
    );
  } catch {
    return false;
  }
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
