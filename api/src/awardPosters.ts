import { Prisma } from '@prisma/client';
import { prisma } from './clients';
import { cleanScrapedMediaTitle, titleSearchVariants } from './awardMediaMatcher';
import { resolveIgdbImageUrl } from './igdbImageUrl';
import type { AwardEventsResponse } from './awardCeremonies';
import type { AwardMediaType } from './awardCeremoniesCatalog';

const TMDB_POSTER = 'https://image.tmdb.org/t/p/w342';

function lookupKeys(titulo: string): string[] {
  const plain = cleanScrapedMediaTitle(titulo).toLowerCase();
  return [...new Set([...titleSearchVariants(titulo), plain].filter(Boolean))];
}

function remember(map: Map<string, string>, keys: string[], poster: string | null) {
  if (!poster) return;
  for (const key of keys) {
    if (key && !map.has(key)) map.set(key, poster);
  }
}

export function posterForTitle(titulo: string, posters: Map<string, string>): string | null {
  for (const key of lookupKeys(titulo)) {
    const poster = posters.get(key);
    if (poster) return poster;
  }
  return null;
}

async function postersFor(
  tipo: AwardMediaType,
  titulos: string[],
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const keys = [...new Set(titulos.flatMap((titulo) => lookupKeys(titulo)))];
  if (keys.length === 0) return map;
  const keyList = Prisma.join(keys);

  if (tipo === 'filme' || tipo === 'serie') {
    const table = tipo === 'filme' ? Prisma.raw('"Filme"') : Prisma.raw('"Serie"');
    const titleCol = tipo === 'filme' ? Prisma.raw('title') : Prisma.raw('name');
    const originalCol = tipo === 'filme' ? Prisma.raw('"originalTitle"') : Prisma.raw('"originalName"');
    const rows = await prisma.$queryRaw<Array<{ title: string; original: string | null; posterPath: string | null }>>(Prisma.sql`
      SELECT ${titleCol} AS title, ${originalCol} AS original, "posterPath"
      FROM ${table}
      WHERE "posterPath" IS NOT NULL
        AND (
          lower(${titleCol}) IN (${keyList})
          OR lower(COALESCE(${originalCol}, '')) IN (${keyList})
        )
    `);
    for (const row of rows) {
      const poster = row.posterPath ? `${TMDB_POSTER}${row.posterPath}` : null;
      remember(map, [...lookupKeys(row.title), ...lookupKeys(row.original ?? '')], poster);
    }
    return map;
  }

  if (tipo === 'anime') {
    const rows = await prisma.$queryRaw<Array<{ romaji: string | null; english: string | null; native: string | null; cover: string | null }>>(Prisma.sql`
      SELECT "titleRomaji" AS romaji, "titleEnglish" AS english, "titleNative" AS native, "coverImage" AS cover
      FROM "Anime"
      WHERE "coverImage" IS NOT NULL
        AND (
          lower(COALESCE("titleRomaji", '')) IN (${keyList})
          OR lower(COALESCE("titleEnglish", '')) IN (${keyList})
          OR lower(COALESCE("titleNative", '')) IN (${keyList})
        )
    `);
    for (const row of rows) {
      remember(
        map,
        [row.romaji, row.english, row.native].flatMap((title) => lookupKeys(title ?? '')),
        row.cover,
      );
    }
    return map;
  }

  const rows = await prisma.$queryRaw<Array<{ name: string; cover: string | null }>>(Prisma.sql`
    SELECT name, cover
    FROM "Jogo"
    WHERE cover IS NOT NULL
      AND lower(name) IN (${keyList})
  `);
  for (const row of rows) {
    remember(map, lookupKeys(row.name), resolveIgdbImageUrl(row.cover));
  }
  return map;
}

export async function attachAwardPosters(response: AwardEventsResponse): Promise<AwardEventsResponse> {
  const buckets: Record<AwardMediaType, string[]> = { filme: [], serie: [], anime: [], jogo: [] };
  for (const evento of response.eventos) {
    for (const categoria of evento.categorias) {
      for (const indicado of categoria.indicados) buckets[indicado.tipo].push(indicado.titulo);
    }
  }
  const [filmes, series, animes, jogos] = await Promise.all([
    postersFor('filme', buckets.filme),
    postersFor('serie', buckets.serie),
    postersFor('anime', buckets.anime),
    postersFor('jogo', buckets.jogo),
  ]);
  const byType = { filme: filmes, serie: series, anime: animes, jogo: jogos };
  return {
    ...response,
    eventos: response.eventos.map((evento) => ({
      ...evento,
      categorias: evento.categorias.map((categoria) => ({
        ...categoria,
        indicados: categoria.indicados.map((indicado) => ({
          ...indicado,
          poster: posterForTitle(indicado.titulo, byType[indicado.tipo]),
        })),
      })),
    })),
  };
}

