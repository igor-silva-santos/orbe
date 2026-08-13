import { proxyApiGet } from '@/lib/apiProxy';

/** Proxy explícito para o status de sync — evita 403 quando o rewrite da Vercel falha. */
export async function GET() {
  return proxyApiGet('sync/status');
}
