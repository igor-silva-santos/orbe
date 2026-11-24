import { apiGet } from '@/api/client';
import type { HomepageResponse } from '@/types/media';

export async function fetchHomepage(): Promise<HomepageResponse> {
  return apiGet<HomepageResponse>('/homepage', { auth: false });
}