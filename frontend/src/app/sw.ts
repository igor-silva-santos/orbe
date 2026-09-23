/// <reference lib="webworker" />
import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
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
  (url.pathname === '/api/home' ||
    /^\/api\/(filmes|series|animes|jogos)\/(by-month|by-season)/.test(url.pathname));

/** Posters/logos de CDN — cache do SW gerava `no-response` quando TMDB falhava/timeout. */
const isMediaCdnImage = ({ url }: { url: URL }) =>
  url.hostname === 'image.tmdb.org' ||
  url.hostname === 's4.anilist.co' ||
  url.hostname === 'images.igdb.com';

const runtimeCaching = [
  {
    matcher: isDynamicCatalogApi,
    method: 'GET' as const,
    handler: new NetworkOnly(),
  },
  {
    matcher: isMediaCdnImage,
    method: 'GET' as const,
    handler: new NetworkOnly(),
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
