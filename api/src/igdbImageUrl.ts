const IGDB_DIRECT_PREFIXES = [
  'https://images.igdb.com/igdb/image/upload',
  'http://images.igdb.com/igdb/image/upload',
  '//images.igdb.com/igdb/image/upload',
] as const;

/** Normaliza capas IGDB para o proxy same-origin `/api/images/igdb` (evita 402/hotlink no browser). */
export function resolveIgdbImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('/api/images/igdb')) {
    return trimmed;
  }

  for (const prefix of IGDB_DIRECT_PREFIXES) {
    if (trimmed.startsWith(prefix)) {
      return `/api/images/igdb${trimmed.slice(prefix.length)}`;
    }
  }

  if (trimmed.startsWith('//images.igdb.com/igdb/image/upload')) {
    return `/api/images/igdb${trimmed.slice('//images.igdb.com/igdb/image/upload'.length)}`;
  }

  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  if (trimmed.startsWith('http')) {
    return trimmed;
  }

  return trimmed;
}
