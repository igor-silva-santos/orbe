import { proxyApiGetWithAuth } from '@/lib/apiProxy';

/** Proxy explícito — mesma origem na Vercel, sem cache do service worker no /auth/me. */
export async function GET(request: Request) {
  return proxyApiGetWithAuth('auth/me', request);
}
