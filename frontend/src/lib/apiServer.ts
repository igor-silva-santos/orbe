import type { Midia, Anime } from '@/types';

export interface HomepageData {
  filmes: Midia[];
  series: Midia[];
  jogos: Midia[];
  animes: Anime[];
}

function getApiOrigin(): string {
  return (
    process.env.API_PROXY_ORIGIN?.replace(/\/$/, '') ||
    process.env.INTERNAL_API_URL?.replace(/\/$/, '') ||
    (process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : '')
  );
}

export async function fetchHomepage(): Promise<HomepageData> {
  const origin = getApiOrigin();
  if (!origin) {
    return { filmes: [], series: [], jogos: [], animes: [] };
  }

  const res = await fetch(`${origin}/api/homepage`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error('homepage fetch failed');
  }

  return res.json();
}
