/// <reference lib="webworker" />
import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
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

const runtimeCaching = [
  {
    matcher: isSameOriginApiGet,
    handler: new NetworkOnly(),
  },
  {
    matcher: isMediaCdnImage,
    method: 'GET' as const,
    handler: new GracefulNetwork(),
  },
  ...defaultCache,
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
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
