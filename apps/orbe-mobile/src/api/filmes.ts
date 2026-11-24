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