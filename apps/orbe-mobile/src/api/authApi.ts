import { apiGet, apiPost } from '@/api/client';
import type { AuthUser } from '@/types/media';

type LoginResponse = { token: string; user?: AuthUser };

export async function login(email: string, password: string): Promise<LoginResponse> {
  const body = await apiPost<{ token?: string; user?: AuthUser; error?: string }>(
    '/auth/login',
    { email, password },
    { auth: false },
  );
  if (!body.token) throw new Error('Resposta sem token');
  return { token: body.token, user: body.user };
}

export async function fetchMe(): Promise<AuthUser> {
  return apiGet<AuthUser>('/auth/me');
}