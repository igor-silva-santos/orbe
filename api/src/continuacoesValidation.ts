export const MAX_SAGAS_LIMIT = 100;
export const DEFAULT_SAGAS_LIMIT = 48;

export function parseSagasLimit(raw: unknown): number {
  const parsed = parseInt(String(raw ?? DEFAULT_SAGAS_LIMIT), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_SAGAS_LIMIT;
  return Math.min(MAX_SAGAS_LIMIT, parsed);
}
