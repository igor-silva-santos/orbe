/**
 * Base URL para chamadas HTTP à API Express.
 * Em dev e produção usa `/api` — o proxy/rewrite em next.config.mjs
 * encaminha para a API Express (local ou remota via env).
 */
export const API_BASE = '/api';

/** URL absoluta da API para handshake da extensão (fora do proxy relativo /api). */
export function getAbsoluteApiUrl(origin?: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  if (base) return base;
  if (origin) return `${origin.replace(/\/$/, '')}/api`;
  if (typeof window !== 'undefined') return `${window.location.origin}/api`;
  return '/api';
}

function resolveProductionWsUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_WS_URL?.replace(/\/$/, '');
  if (explicit) {
    return explicit.endsWith('/api/ws') ? explicit : `${explicit}/api/ws`;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  if (apiUrl) {
    const wsBase = apiUrl.replace(/^http/i, 'ws');
    return wsBase.endsWith('/api/ws') ? wsBase : `${wsBase}/api/ws`;
  }

  return '';
}

/** URL do WebSocket da API (conexão direta, sem proxy Next.js). */
export function getWsUrl(): string {
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_WS_URL?.replace(/\/$/, '')?.endsWith('/api/ws')
      ? process.env.NEXT_PUBLIC_WS_URL.replace(/\/$/, '')
      : process.env.NEXT_PUBLIC_WS_URL
        ? `${process.env.NEXT_PUBLIC_WS_URL.replace(/\/$/, '')}/api/ws`
        : 'ws://localhost:3001/api/ws';
  }
  return resolveProductionWsUrl();
}
