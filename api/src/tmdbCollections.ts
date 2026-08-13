import { tmdbApi } from './clients';
import { logger } from './logger';

export type TmdbCollectionPart = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview?: string | null;
};

export type TmdbCollectionDetails = {
  id: number;
  name: string;
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: TmdbCollectionPart[];
};

export async function fetchTmdbCollection(collectionId: number): Promise<TmdbCollectionDetails | null> {
  try {
    const response = await tmdbApi.get(`/collection/${collectionId}`, {
      params: { language: 'pt-BR' },
    });
    const data = response.data;
    if (!data?.id) return null;
    return {
      id: data.id,
      name: data.name,
      overview: data.overview ?? null,
      poster_path: data.poster_path ?? null,
      backdrop_path: data.backdrop_path ?? null,
      parts: (data.parts ?? []).map((part: TmdbCollectionPart) => ({
        id: part.id,
        title: part.title,
        poster_path: part.poster_path ?? null,
        release_date: part.release_date ?? null,
        overview: part.overview ?? null,
      })),
    };
  } catch (error: any) {
    logger.warn(`TMDB collection ${collectionId} falhou: ${error.message}`);
    return null;
  }
}

export async function fetchTmdbMovieRecommendations(tmdbId: number, limit = 12) {
  try {
    const response = await tmdbApi.get(`/movie/${tmdbId}/recommendations`, {
      params: { language: 'pt-BR', page: 1 },
    });
    return (response.data?.results ?? []).slice(0, limit) as Array<{
      id: number;
      title: string;
      poster_path: string | null;
      release_date: string | null;
      media_type?: string;
    }>;
  } catch {
    return [];
  }
}

export async function fetchTmdbTvRecommendations(tmdbId: number, limit = 12) {
  try {
    const response = await tmdbApi.get(`/tv/${tmdbId}/recommendations`, {
      params: { language: 'pt-BR', page: 1 },
    });
    return (response.data?.results ?? []).slice(0, limit) as Array<{
      id: number;
      name: string;
      poster_path: string | null;
      first_air_date: string | null;
    }>;
  } catch {
    return [];
  }
}
