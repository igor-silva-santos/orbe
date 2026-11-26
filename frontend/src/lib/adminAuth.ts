import { API_BASE } from '@/lib/apiBase';

export function getAuthToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

export async function adminAuthFetch(path: string): Promise<Response> {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: 'no-store',
  });
  if (!response.ok) {
    let message = `Erro ${response.status}`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // corpo não JSON
    }
    throw new Error(message);
  }
  return response;
}
