export function isPrismaSchemaError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const code = (error as { code?: string }).code;
  return code === 'P2021' || code === 'P2022' || code === 'P2010';
}
