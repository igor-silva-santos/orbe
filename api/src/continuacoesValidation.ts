export const MAX_SAGAS_LIMIT = 100;
export const DEFAULT_SAGAS_LIMIT = 48;

const UNIVERSE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseSagasLimit(raw: unknown): number {
  const parsed = parseInt(String(raw ?? DEFAULT_SAGAS_LIMIT), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_SAGAS_LIMIT;
  return Math.min(MAX_SAGAS_LIMIT, parsed);
}

export function parseUniverseId(raw: unknown): string | null {
  const id = String(raw ?? '').trim().toLowerCase();
  if (!id || !UNIVERSE_ID_PATTERN.test(id)) return null;
  return id;
}
