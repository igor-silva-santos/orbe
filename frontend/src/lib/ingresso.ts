export const buildIngressoUrl = (title?: string | null): string => {
  const safe = (title ?? '').trim();
  if (!safe) return 'https://www.ingresso.com/filmes';

  const slug = safe
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return `https://www.ingresso.com/filme/${slug}`;
};
