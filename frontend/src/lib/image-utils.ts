const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const IGDB_IMAGE_BASE = 'https://images.igdb.com/igdb/image/upload';

export const PLACEHOLDER_POSTER = '/placeholder.svg';
export const PLACEHOLDER_AVATAR = '/placeholder.svg';

/**
 * Resolve URLs de imagem vindas da API para um endereço absoluto utilizável no frontend.
 */
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url || url.trim() === '') return null;

  const trimmed = url.trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
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
    return `${TMDB_IMAGE_BASE}${trimmed}`;
  }

  return trimmed;
}

export function getImageSrc(url: string | null | undefined): string {
  return resolveImageUrl(url) ?? PLACEHOLDER_POSTER;
}

export function isValidImageUrl(url: string | null | undefined): boolean {
  return resolveImageUrl(url) !== null;
}
