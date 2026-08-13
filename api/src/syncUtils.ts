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

type IgdbNamedEntity = { id: number; name: string; slug?: string };

/**
 * Garante que uma entidade IGDB (gênero, plataforma, tema etc.) exista no banco.
 * Se o `id` não existir mas o `name` já estiver cadastrado (unique em name), reutiliza
 * o registro existente em vez de falhar com P2002.
 */
export async function ensureIgdbNamedEntity(
  delegate: {
    findUnique: (args: any) => Promise<{ id: number } | null>;
    findFirst: (args: any) => Promise<{ id: number } | null>;
    create: (args: any) => Promise<{ id: number }>;
  },
  idField: 'igdbId' | 'id',
  entity: IgdbNamedEntity,
): Promise<number> {
  const byId = await delegate.findUnique({ where: { [idField]: entity.id } });
  if (byId) return byId.id;

  const byName = await delegate.findFirst({ where: { name: entity.name } });
  if (byName) return byName.id;

  const data: Record<string, unknown> = { [idField]: entity.id, name: entity.name };
  if (entity.slug) data.slug = entity.slug;

  try {
    const created = await delegate.create({ data });
    return created.id;
  } catch (error: any) {
    if (error?.code === 'P2002') {
      const fallback = await delegate.findFirst({ where: { name: entity.name } });
      if (fallback) return fallback.id;
    }
    throw error;
  }
}
