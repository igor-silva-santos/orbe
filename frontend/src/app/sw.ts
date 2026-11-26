/// <reference lib="webworker" />
import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from 'serwist';
import { NetworkOnly, Serwist } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

/** Catálogo dinâmico — nunca servir stale do cache do SW (defaultCache guarda /api/* por 24h). */
const isDynamicCatalogApi = ({ sameOrigin, url }: { sameOrigin: boolean; url: URL }) =>
  sameOrigin &&
  (url.pathname === '/api/homepage' ||
    /^\/api\/(filmes|series|animes|jogos)\/(by-month|by-season)/.test(url.pathname));

/**
 * Três coisas ficam fora do cache do SW de propósito:
 * - Navegação do documento. Se o SW responde e a rede falha sem cópia em cache,
 *   o Chrome registra "network error" e `no-response` (visto em /promocoes).
 * - `/api/images/`. O defaultCache guarda `/api/*` por 24h; um 502 no proxy
 *   de capa não pode ficar preso e esconder a imagem que a rede já entrega.
 * - Capas direto na Steam e na GamerPower, se alguma ainda for pedida. O cache
 *   de imagens guarda resposta opaca por 30 dias, inclusive um 403/404.
 */
const DEAL_POSTER_HOSTS = new Set([
  'www.gamerpower.com',
  'cdn.akamai.steamstatic.com',
  'cdn.cloudflare.steamstatic.com',
  'shared.akamai.steamstatic.com',
  'shared.fastly.steamstatic.com',
  'shared.cloudflare.steamstatic.com',
  'shared.steamstatic.com',
  'steamcdn-a.akamaihd.net',
]);

function isDealPosterRequest(url: URL): boolean {
  return DEAL_POSTER_HOSTS.has(url.hostname);
}

function matcherSkipsDealPosters(matcher: RuntimeCaching['matcher']): RuntimeCaching['matcher'] {
  return (context) => {
    if (context.request.mode === 'navigate' || isDealPosterRequest(context.url)) return false;
    if (matcher instanceof RegExp) return matcher.test(context.url.href);
    if (typeof matcher === 'string') {
      return context.url.href === new URL(matcher, self.location.href).href;
    }
    return matcher(context);
  };
}

const isPosterProxy = ({ sameOrigin, url }: { sameOrigin: boolean; url: URL }) =>
  sameOrigin && url.pathname.startsWith('/api/images/');

const runtimeCaching: RuntimeCaching[] = [
  {
    matcher: isPosterProxy,
    method: 'GET',
    handler: new NetworkOnly(),
  },
  {
    matcher: isDynamicCatalogApi,
    method: 'GET',
    handler: new NetworkOnly(),
  },
  ...defaultCache.map((entry) => ({
    ...entry,
    matcher: matcherSkipsDealPosters(entry.matcher),
  })),
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false,
  runtimeCaching,
});

serwist.addEventListeners();

self.addEventListener('push', (event) => {
  const data = event.data?.json() as { title?: string; body?: string; url?: string } | undefined;
  const title = data?.title ?? 'Orbe Nerd';
  const options: NotificationOptions = {
    body: data?.body ?? '',
    icon: '/icons/icon.svg',
    data: { url: data?.url ?? '/minha-lista/animes' },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data?.url as string) || '/';
  event.waitUntil(self.clients.openWindow(url));
});
