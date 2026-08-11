import type { Midia, Anime, Filme, Serie, Jogo } from '@/types';

export interface HomepageData {
  filmes: Midia[];
  series: Midia[];
  jogos: Midia[];
  animes: Anime[];
}

export interface MediaListResponse<T> {
  results: T[];
  total: number;
  page?: number;
  limit?: number;
}

export interface StatusOption {
  value: string;
  label: string;
}

export interface FilmeFilters {
  genres: string[];
  years: number[];
  statuses: StatusOption[];
  platforms: string[];
}

export interface SerieFilters {
  genres: string[];
  years: number[];
  statuses: StatusOption[];
  platforms: string[];
}

export interface AnimeFilters {
  genres: string[];
  years: number[];
  formats: string[];
  sources: string[];
  statuses: StatusOption[];
}

export interface JogoFilters {
  genres: string[];
  platforms: string[];
  gameModes: string[];
  gameEngines: string[];
  years: number[];
}

export interface FilmesPageData {
  results: Filme[];
  total: number;
  filters: FilmeFilters;
}

export interface SeriesPageData {
  results: Serie[];
  total: number;
  filters: SerieFilters;
}

export interface AnimesPageData {
  results: Anime[];
  total: number;
  filters: AnimeFilters;
}

export interface JogosPageData {
  results: Jogo[];
  total: number;
  filters: JogoFilters;
}

const REVALIDATE_SECONDS = 300;

function getApiOrigin(): string {
  return (
    process.env.API_PROXY_ORIGIN?.replace(/\/$/, '') ||
    process.env.INTERNAL_API_URL?.replace(/\/$/, '') ||
    (process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : '')
  );
}

async function serverFetch<T>(path: string): Promise<T> {
  const origin = getApiOrigin();
  if (!origin) {
    throw new Error(`API origin não configurada para ${path}`);
  }

  const res = await fetch(`${origin}/api${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`fetch failed: ${path} (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export async function fetchHomepage(): Promise<HomepageData> {
  const origin = getApiOrigin();
  if (!origin) {
    return { filmes: [], series: [], jogos: [], animes: [] };
  }

  return serverFetch<HomepageData>('/homepage');
}

export async function fetchFilmesPageData(): Promise<FilmesPageData> {
  const [list, filters] = await Promise.all([
    serverFetch<MediaListResponse<Filme>>('/filmes'),
    serverFetch<FilmeFilters>('/filmes/filtros'),
  ]);
  return {
    results: list.results ?? [],
    total: list.total ?? 0,
    filters: {
      genres: filters.genres ?? [],
      years: filters.years ?? [],
      statuses: filters.statuses ?? [],
      platforms: filters.platforms ?? [],
    },
  };
}

export async function fetchSeriesPageData(): Promise<SeriesPageData> {
  const [list, filters] = await Promise.all([
    serverFetch<MediaListResponse<Serie>>('/series'),
    serverFetch<SerieFilters>('/series/filtros'),
  ]);
  return {
    results: list.results ?? [],
    total: list.total ?? 0,
    filters: {
      genres: filters.genres ?? [],
      years: filters.years ?? [],
      statuses: filters.statuses ?? [],
      platforms: filters.platforms ?? [],
    },
  };
}

export async function fetchAnimesPageData(): Promise<AnimesPageData> {
  const [list, filters] = await Promise.all([
    serverFetch<MediaListResponse<Anime>>('/animes'),
    serverFetch<AnimeFilters>('/animes/filtros'),
  ]);
  return {
    results: list.results ?? [],
    total: list.total ?? 0,
    filters: {
      genres: filters.genres ?? [],
      years: filters.years ?? [],
      formats: filters.formats ?? [],
      sources: filters.sources ?? [],
      statuses: filters.statuses ?? [],
    },
  };
}

export async function fetchJogosPageData(): Promise<JogosPageData> {
  const [list, filters] = await Promise.all([
    serverFetch<MediaListResponse<Jogo>>('/jogos'),
    serverFetch<JogoFilters>('/jogos/filtros'),
  ]);
  return {
    results: list.results ?? [],
    total: list.total ?? 0,
    filters: {
      genres: filters.genres ?? [],
      platforms: filters.platforms ?? [],
      gameModes: filters.gameModes ?? [],
      gameEngines: filters.gameEngines ?? [],
      years: filters.years ?? [],
    },
  };
}
