/** URL pública do app (Vercel). Fallback para o deploy atual. */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '');
  return url || 'https://orbe-seven.vercel.app';
}
