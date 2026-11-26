/** 401/403 após sessão expirada — não vale poluir o console como erro de produto. */
export function isExpectedAuthError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? '');
  return (
    /401|403/.test(message) ||
    /token inválido|token não fornecido|não autorizado|credenciais inválidas/i.test(message)
  );
}
