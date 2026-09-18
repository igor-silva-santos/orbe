export const VALID_MEDIA_TYPES = ['filme', 'serie', 'anime', 'jogo'] as const;
export type MediaType = (typeof VALID_MEDIA_TYPES)[number];

export const VALID_INTERACTION_STATUSES = [
  'favorito',
  'quero_assistir',
  'acompanhando',
  'assistido',
  'oculto',
] as const;

export const VALID_RATINGS = ['gostei', 'amei', 'nao_gostei'] as const;

export function isValidMediaType(value: unknown): value is MediaType {
  return typeof value === 'string' && (VALID_MEDIA_TYPES as readonly string[]).includes(value);
}

export function isValidInteractionStatus(value: unknown): boolean {
  return typeof value === 'string' && (VALID_INTERACTION_STATUSES as readonly string[]).includes(value);
}

export function isValidRating(value: unknown): boolean {
  return typeof value === 'string' && (VALID_RATINGS as readonly string[]).includes(value);
}

export function isPositiveInt(value: unknown): value is number {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

export function isValidHttpUrl(value: unknown): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isStringWithMaxLength(value: unknown, maxLength: number): boolean {
  return typeof value === 'string' && value.length <= maxLength;
}

export const VALID_WATCHLIST_STATUSES = [
  'comecar',
  'continuar',
  'seguir',
  'assistido',
  'pausado',
  'dropado',
] as const;

export type WatchlistStatus = (typeof VALID_WATCHLIST_STATUSES)[number];

export function isNonNegativeInt(value: unknown): value is number {
  const n = Number(value);
  return Number.isInteger(n) && n >= 0;
}

export function isValidWatchlistStatus(value: unknown): value is WatchlistStatus {
  return (
    typeof value === 'string' &&
    (VALID_WATCHLIST_STATUSES as readonly string[]).includes(value)
  );
}
