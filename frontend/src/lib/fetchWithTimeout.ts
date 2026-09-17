/** Timeout padrão para fetches de carrossel — cobre cold start do Render sem pendurar indefinidamente. */
export const CAROUSEL_FETCH_TIMEOUT_MS = 60_000;

export async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeoutMs?: number } = {},
): Promise<Response> {
  const { timeoutMs = CAROUSEL_FETCH_TIMEOUT_MS, ...fetchOptions } = options;
  return fetch(url, {
    ...fetchOptions,
    signal: AbortSignal.timeout(timeoutMs),
  });
}
