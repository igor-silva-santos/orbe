import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Necessario para o Dockerfile: ele copia .next/standalone e roda server.js dali.
  // Sem isso o Next nunca gera essa pasta e o build da imagem falha no COPY.
  output: 'standalone',
  images: {
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
        port: '',
        pathname: '/file/anilistcdn/**',
      },
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
        port: '',
        pathname: '/igdb/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'logos-world.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'store.steampowered.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn1.epicgames.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gamerpower.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shared.fastly.steamstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.steamstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.akamai.steamstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.greenmangaming.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.unrealengine.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.cheapshark.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.itch.zone',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'itch.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.playstation.com',
        port: '',
        pathname: '/**',
      },
    ],
  
  },
  rewrites: async () => {
    // Proxy /api/* → API Express. Em dev: localhost:3001.
    // Em produção: API_PROXY_ORIGIN ou origem derivada de NEXT_PUBLIC_API_URL.
    const apiOrigin =
      process.env.API_PROXY_ORIGIN?.replace(/\/$/, '') ||
      (process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '')
        : null) ||
      (process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : null);

    if (!apiOrigin) {
      return [];
    }

    return [
      {
        source: '/api/:path*',
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;