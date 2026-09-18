import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const routes = [
    '',
    '/filmes',
    '/series',
    '/animes',
    '/jogos',
    '/premios',
    '/hoje',
    '/promocoes',
    '/continuacoes',
    '/eventos',
    '/extensao',
    '/extensao/crunchyroll',
    '/minha-lista',
    '/minha-lista/animes',
    '/ajuda',
    '/apoie',
    '/login',
    '/termos',
    '/privacidade',
    '/cookies',
    '/dmca',
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'hourly' : 'daily',
    priority: path === '' ? 1 : 0.8,
  }));
}
