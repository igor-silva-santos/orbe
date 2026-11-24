import { apiGet } from '@/api/client';
import type { FilmesListResponse } from '@/types/media';

export type FilmesQuery = {
  page?: number;
  limit?: number;
  mes?: string;
  ano?: string;
  filtro?: string;
};

export async function fetchFilmes(query: FilmesQuery = {}): Promise<FilmesListResponse> {
  return apiGet<FilmesListResponse>('/filmes', {
    auth: false,
    query: {
      page: query.page ?? 1,
      limit: query.limit ?? 24,
      mes: query.mes,
      ano: query.ano,
      filtro: query.filtro,
    },
  });
}

export type FilmeDetails = {
  id?: number;
  titulo_api?: string;
  titulo_curado?: string | null;
  sinopse?: string;
  poster_url_api?: string | null;
  data_lancamento_api?: string | null;
  duracao?: string;
  generos_api?: string[];
};

export async function fetchFilmeDetails(tmdbId: number | string): Promise<FilmeDetails> {
  return apiGet<FilmeDetails>(`/filmes/${tmdbId}/details`, { auth: false });
}