import { getApiBase } from '@/config';
import { getToken } from '@/auth';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type QueryParams = Record<string, string | number | boolean | undefined>;

function buildUrl(path: string, query?: QueryParams): string {
  const base = getApiBase().replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === '') continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function parseJson<T>(res: Response): Promise<T> {
  const body = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    const msg = typeof body.error === 'string' ? body.error : `HTTP ${res.status}`;
    throw new ApiError(msg, res.status);
  }
  return body as T;
}

export async function apiGet<T>(
  path: string,
  options?: { query?: QueryParams; auth?: boolean },
): Promise<T> {
  const headers: Record<string, string> = {};
  const useAuth = options?.auth !== false;
  if (useAuth) {
    const token = await getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(buildUrl(path, options?.query), {
      headers,
      signal: controller.signal,
    });
    return parseJson<T>(res);
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new ApiError('Tempo esgotado. Verifique sua conexão.', 0);
    }
    throw e;
  } finally {
    clearTimeout(timeout);
  }
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  options?: { auth?: boolean },
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const useAuth = options?.auth !== false;
  if (useAuth) {
    const token = await getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(buildUrl(path), {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  return parseJson<T>(res);
}