import { apiGet } from '@/api/client';
import type { SearchResponse } from '@/types/media';

export async function fetchSearch(q: string, category?: string): Promise<SearchResponse> {
  return apiGet<SearchResponse>('/pesquisa', {
    auth: false,
    query: { q, category },
  });
}