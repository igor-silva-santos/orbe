import orbeNerdApi from '@/lib/api';
import type { User } from '@/types';
import { clearBrowserSession } from '@/lib/session';
import { getToken, removeToken, saveToken } from './token';

export function normalizeUser(raw: unknown): User {
  const u = (raw ?? {}) as Record<string, unknown>;
  const email = String(u.email ?? '');
  const role = u.role === 'admin' ? 'admin' : 'user';

  return {
    id: Number(u.id),
    email,
    nome: String(u.nome ?? email.split('@')[0] ?? 'Usuário'),
    avatar: (u.avatar as string | null) ?? null,
    role,
    quer_avaliar: Boolean(u.quer_avaliar ?? false),
    data_criacao: String(u.data_criacao ?? new Date().toISOString()),
    preferencias: u.preferencias as User['preferencias'],
  };
}

/** Restaura sessão a partir do token em localStorage. */
export async function bootstrapSession(): Promise<User | null> {
  if (!getToken()) return null;
  try {
    const raw = await orbeNerdApi.getCurrentUser();
    return normalizeUser(raw);
  } catch {
    removeToken();
    return null;
  }
}

/** Login com e-mail e senha; persiste token e retorna usuário normalizado. */
export async function loginWithCredentials(email: string, password: string): Promise<User> {
  const result = await orbeNerdApi.login({ email, password });
  saveToken(result.token);
  return normalizeUser(result.user);
}

/** Cadastro com e-mail e senha; persiste token e retorna usuário normalizado. */
export async function registerWithCredentials(
  nome: string,
  email: string,
  password: string,
): Promise<User> {
  const result = await orbeNerdApi.register({ nome, email, password });
  saveToken(result.token);
  return normalizeUser(result.user);
}

/** Remove token local e cookie de sessão (chamar junto com appStore.logout). */
export function clearSession(): void {
  removeToken();
  void clearBrowserSession();
}

/** Exclui a conta autenticada no servidor e limpa sessão local. */
export async function deleteAccountWithPassword(password: string): Promise<void> {
  await orbeNerdApi.deleteAccount(password);
  clearSession();
}
