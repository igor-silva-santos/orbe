import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/perfil', '/minha-lista', '/configuracoes', '/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
