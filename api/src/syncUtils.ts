/**
 * As APIs externas (TMDB/IGDB/AniList) por vezes retornam o mesmo item duas vezes na mesma lista
 * (ex.: gênero ou empresa duplicado). Como as tabelas de junção usam chave composta, um `create`
 * nested com entradas duplicadas viola a unique constraint. Deduplicar pela chave natural antes
 * de montar o `create` evita o erro.
 */
export function dedupeBy<T>(items: T[] | undefined | null, keyFn: (item: T) => string | number | undefined | null): T[] {
  if (!items) return [];
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    const key = keyFn(item);
    if (key === undefined || key === null) continue;
    const normalizedKey = String(key);
    if (seen.has(normalizedKey)) continue;
    seen.add(normalizedKey);
    result.push(item);
  }
  return result;
}

type TmdbNamedEntity = { id: number; name: string };

type GeneroDelegate = {
  findUnique: (args: { where: { tmdbId: number } }) => Promise<{ id: number; name: string } | null>;
  findFirst: (args: { where: { name: string } }) => Promise<{ id: number } | null>;
  create: (args: { data: { tmdbId: number; name: string } }) => Promise<{ id: number }>;
  update: (args: { where: { id: number }; data: { name: string } }) => Promise<unknown>;
};

/**
 * Garante que um gênero TMDB exista e devolve o id interno. Reutiliza por tmdbId ou name
 * para evitar P2002 e, no nested create de FilmeGenero/SerieGenero, duplicar o mesmo generoId.
 */
export async function ensureTmdbGenero(delegate: GeneroDelegate, genre: TmdbNamedEntity): Promise<number> {
  const byTmdb = await delegate.findUnique({ where: { tmdbId: genre.id } });
  if (byTmdb) {
    if (byTmdb.name !== genre.name) {
      await delegate.update({ where: { id: byTmdb.id }, data: { name: genre.name } });
    }
    return byTmdb.id;
  }

  const byName = await delegate.findFirst({ where: { name: genre.name } });
  if (byName) return byName.id;

  try {
    const created = await delegate.create({ data: { tmdbId: genre.id, name: genre.name } });
    return created.id;
  } catch (error: any) {
    if (error?.code === 'P2002') {
      const fallback =
        (await delegate.findUnique({ where: { tmdbId: genre.id } })) ??
        (await delegate.findFirst({ where: { name: genre.name } }));
      if (fallback) return fallback.id;
    }
    throw error;
  }
}

/** Resolve ids internos de gênero TMDB, sem duplicatas. */
export async function resolveTmdbGeneroIds(
  delegate: GeneroDelegate,
  genres: TmdbNamedEntity[] | undefined | null,
): Promise<number[]> {
  const unique = dedupeBy(genres, (genre) => genre.id);
  const seenGeneroIds = new Set<number>();
  const ids: number[] = [];

  for (const genre of unique) {
    if (!genre?.id || !genre?.name) continue;
    const generoId = await ensureTmdbGenero(delegate, genre);
    if (seenGeneroIds.has(generoId)) continue;
    seenGeneroIds.add(generoId);
    ids.push(generoId);
  }

  return ids;
}

/** Monta creates de junção com `connect` por id interno, sem duplicar generoId no mesmo filme/série. */
export async function buildTmdbGenreCreates(
  delegate: GeneroDelegate,
  genres: TmdbNamedEntity[] | undefined | null,
): Promise<{ genero: { connect: { id: number } } }[]> {
  const ids = await resolveTmdbGeneroIds(delegate, genres);
  return ids.map((id) => ({ genero: { connect: { id } } }));
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
