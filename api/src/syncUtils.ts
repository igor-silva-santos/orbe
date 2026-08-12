/**
 * As APIs externas (TMDB/IGDB/AniList) por vezes retornam o mesmo item duas vezes na mesma lista
 * (ex.: gênero ou empresa duplicado). Como as tabelas de junção usam chave composta, um `create`
 * nested com entradas duplicadas viola a unique constraint. Deduplicar pela chave natural antes
 * de montar o `create` evita o erro.
 */
export function dedupeBy<T>(items: T[] | undefined | null, keyFn: (item: T) => string | number | undefined | null): T[] {
  if (!items) return [];
  const seen = new Set<string | number>();
  const result: T[] = [];
  for (const item of items) {
    const key = keyFn(item);
    if (key === undefined || key === null) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}
