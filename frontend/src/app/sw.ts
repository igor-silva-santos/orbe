/// <reference lib="webworker" />
import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from 'serwist';
import { NetworkOnly, Serwist, Strategy, type StrategyHandler } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

/**
 * Falha de rede em CDN não deve gerar `Uncaught (in promise) no-response` no console.
 * Devolve 504 silencioso; o <img> mostra placeholder/quebrado sem derrubar o SW.
 * A resposta de erro não entra no cache.
 */
class GracefulNetwork extends Strategy {
  async _handle(request: Request, handler: StrategyHandler): Promise<Response> {
    try {
      const response = await handler.fetch(request);
      if (response) return response;
    } catch {
      // rede/CDN indisponível
    }
    try {
      const direct = await fetch(request);
      if (direct) return direct;
    } catch {
      // offline total
    }
    return new Response(null, { status: 504, statusText: 'Network unavailable' });
  }
}

/** Toda GET /api/* na mesma origem — catálogo e auth são dinâmicos (defaultCache cacheava 24h). */
const isSameOriginApiGet = ({
  sameOrigin,
  url,
  request,
}: {
  sameOrigin: boolean;
  url: URL;
  request: Request;
}) => sameOrigin && url.pathname.startsWith('/api/') && request.method === 'GET';

const isMediaCdnImage = ({ url }: { url: URL }) =>
  url.hostname === 'image.tmdb.org' ||
  url.hostname === 's4.anilist.co' ||
  url.hostname === 'images.igdb.com';

/**
 * Duas coisas ficam fora do SW de propósito:
 * - Navegação do documento. Se o SW responde e a rede falha sem cópia em cache,
 *   o Chrome registra "network error" e `no-response` (visto em /promocoes).
 * - Capas de promoção (Steam e GamerPower). O cache de imagens guarda resposta
 *   opaca por 30 dias, inclusive quando o CDN respondeu 403/404.
 * Sem rota correspondente, o navegador busca direto.
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

const runtimeCaching: RuntimeCaching[] = [
  {
    matcher: isSameOriginApiGet,
    method: 'GET',
    handler: new NetworkOnly(),
  },
  {
    matcher: isMediaCdnImage,
    method: 'GET',
    handler: new GracefulNetwork(),
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
