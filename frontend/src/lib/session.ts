/** Nome do cookie httpOnly usado pelo middleware para rotas protegidas */
export const SESSION_COOKIE_NAME = 'orbe_session';

/**
 * Só aceita um path relativo de verdade — bloqueia `//evil.com` e `/\evil.com`
 * (URLs protocol-relative que `startsWith('/')` sozinho não pega).
 */
export function safeRedirectPath(value: string | null): string {
  if (!value) return '/';
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return '/';
  return value;
}

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 dias — alinhado ao JWT da API

export function getSessionCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax';
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

/** Define cookie de sessão no browser (após login/registro) */
export async function establishBrowserSession(token: string): Promise<void> {
  await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
}

/** Remove cookie de sessão (logout ou sessão expirada) */
export async function clearBrowserSession(): Promise<void> {
  try {
    await fetch('/api/auth/session', { method: 'DELETE' });
  } catch {
    // Falha de rede no logout não deve impedir limpeza local
  }
}
