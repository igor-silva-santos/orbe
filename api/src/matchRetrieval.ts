import { Prisma } from '@prisma/client';
import { prisma } from './clients';
import {
  FOLD_FROM,
  FOLD_TO,
  mergeCandidateIds,
  MULTI_MODE_NAMES,
  rarityMapKey,
  SINGLE_MODE_NAMES,
  tokenForms,
  type GamePlay,
  type GateAttr,
  type MatchProfile,
  type MatchTipo,
  type RarityIndex,
} from './matchScore';

const POOL = 300;

function refs(attrs: GateAttr[], part: GateAttr['part']): number[] {
  return [...new Set(
    attrs
      .filter((attr) => attr.part === part && attr.ref && /^\d+$/.test(attr.ref))
      .map((attr) => Number(attr.ref)),
  )];
}

function profileRefs(seeds: MatchProfile[], part: GateAttr['part']): number[] {
  const ids: number[] = [];
  for (const seed of seeds) {
    for (const attr of seed.attrs[part] ?? []) {
      if (attr.ref && /^\d+$/.test(attr.ref)) ids.push(Number(attr.ref));
    }
  }
  return [...new Set(ids)];
}

function notIn(column: Prisma.Sql, ids: number[]): Prisma.Sql {
  if (ids.length === 0) return Prisma.sql`TRUE`;
  return Prisma.sql`${column} NOT IN (${Prisma.join(ids)})`;
}

async function queryIds(query: Prisma.Sql): Promise<number[]> {
  const rows = await prisma.$queryRaw<Array<{ id: number }>>(query);
  return rows.map((row) => Number(row.id)).filter((id) => Number.isInteger(id) && id > 0);
}

export async function rememberOverviewFrequency(
  tipo: 'filme' | 'serie',
  tokens: string[],
  rarity: RarityIndex,
): Promise<void> {
  const missing = [...new Set(tokens.filter((token) => rarity.df[rarityMapKey('trama', token)] == null))];
  if (missing.length === 0) return;
  const forms = [...new Set(missing.flatMap((token) => tokenForms(token)))];
  const byForm = new Map<string, number>();
  if (forms.length > 0) {
    const table = tipo === 'filme' ? 'Filme' : 'Serie';
    const rows = await prisma.$queryRaw<Array<{ word: string; df: number }>>(Prisma.sql`
      SELECT word, COUNT(DISTINCT id)::int AS df
      FROM (
        SELECT id,
               unnest(regexp_split_to_array(
                 translate(lower(overview), ${FOLD_FROM}, ${FOLD_TO}),
                 '[^a-z0-9]+'
               )) AS word
        FROM ${Prisma.raw(`"${table}"`)}
        WHERE overview IS NOT NULL AND overview <> ''
      ) tokens
      WHERE word IN (${Prisma.join(forms)})
      GROUP BY word
    `);
    for (const row of rows) byForm.set(row.word, Number(row.df));
  }
  for (const token of missing) {
    let df = 0;
    for (const form of tokenForms(token)) df += byForm.get(form) ?? 0;
    rarity.df[rarityMapKey('trama', token)] = df;
  }
}

async function plotIds(
  table: 'Filme' | 'Serie',
  idColumn: 'tmdbId',
  tokens: string[],
  exclude: number[],
): Promise<number[]> {
  const forms = [...new Set(tokens.flatMap((token) => tokenForms(token)))].filter((form) => /^[a-z0-9]+$/.test(form));
  if (forms.length === 0) return [];
  const pattern = `\\y(?:${forms.join('|')})\\y`;
  const id = Prisma.raw(`f."${idColumn}"`);
  return queryIds(Prisma.sql`
    SELECT ${id} AS id
    FROM ${Prisma.raw(`"${table}"`)} f
    WHERE f.overview IS NOT NULL
      AND f.overview <> ''
      AND translate(lower(f.overview), ${FOLD_FROM}, ${FOLD_TO}) ~ ${pattern}
      AND ${notIn(id, exclude)}
    ORDER BY ${id} DESC
    LIMIT 80
  `);
}

async function filmIds(seeds: MatchProfile[], attrs: GateAttr[], exclude: number[]): Promise<number[]> {
  const genreIds = refs(attrs, 'generos');
  const directorIds = [...new Set([...refs(attrs, 'diretor'), ...profileRefs(seeds, 'diretor')])];
  const collections = [...new Set(seeds.map((seed) => seed.collectionId).filter((id): id is number => id != null && id > 0))];
  const tokens = [...new Set(seeds.flatMap((seed) => (seed.attrs.trama ?? []).map((attr) => attr.key)))].slice(0, 12);
  const [byOverlap, byDirector, byFranchise, byPlot] = await Promise.all([
    genreIds.length
      ? queryIds(Prisma.sql`
          SELECT f."tmdbId" AS id
          FROM "Filme" f
          JOIN "FilmeGenero" fg ON fg."filmeId" = f.id
          WHERE fg."generoId" IN (${Prisma.join(genreIds)})
            AND ${notIn(Prisma.sql`f."tmdbId"`, exclude)}
          GROUP BY f.id, f."tmdbId"
          ORDER BY COUNT(DISTINCT fg."generoId") DESC, f."tmdbId" DESC
          LIMIT 220
        `)
      : Promise.resolve([]),
    directorIds.length
      ? queryIds(Prisma.sql`
          SELECT DISTINCT f."tmdbId" AS id
          FROM "Filme" f
          JOIN "FilmeCrew" c ON c."filmeId" = f.id
          WHERE c."pessoaId" IN (${Prisma.join(directorIds)})
            AND LOWER(c.job) = 'director'
            AND ${notIn(Prisma.sql`f."tmdbId"`, exclude)}
        `)
      : Promise.resolve([]),
    collections.length
      ? queryIds(Prisma.sql`
          SELECT f."tmdbId" AS id
          FROM "Filme" f
          WHERE f."collectionId" IN (${Prisma.join(collections)})
            AND ${notIn(Prisma.sql`f."tmdbId"`, exclude)}
        `)
      : Promise.resolve([]),
    tokens.length ? plotIds('Filme', 'tmdbId', tokens, exclude) : Promise.resolve([]),
  ]);
  return mergeCandidateIds(byOverlap, [...byPlot, ...byDirector, ...byFranchise], POOL);
}

async function serieIds(seeds: MatchProfile[], attrs: GateAttr[], exclude: number[]): Promise<number[]> {
  const genreIds = refs(attrs, 'generos');
  const creatorIds = [...new Set([...refs(attrs, 'criador'), ...profileRefs(seeds, 'criador')])];
  const tokens = [...new Set(seeds.flatMap((seed) => (seed.attrs.trama ?? []).map((attr) => attr.key)))].slice(0, 12);
  const [byOverlap, byCreator, byPlot] = await Promise.all([
    genreIds.length
      ? queryIds(Prisma.sql`
          SELECT s."tmdbId" AS id
          FROM "Serie" s
          JOIN "SerieGenero" sg ON sg."serieId" = s.id
          WHERE sg."generoId" IN (${Prisma.join(genreIds)})
            AND ${notIn(Prisma.sql`s."tmdbId"`, exclude)}
          GROUP BY s.id, s."tmdbId"
          ORDER BY COUNT(DISTINCT sg."generoId") DESC, s."tmdbId" DESC
          LIMIT 220
        `)
      : Promise.resolve([]),
    creatorIds.length
      ? queryIds(Prisma.sql`
          SELECT DISTINCT s."tmdbId" AS id
          FROM "Serie" s
          JOIN "SerieCreator" c ON c."serieId" = s.id
          WHERE c."pessoaId" IN (${Prisma.join(creatorIds)})
            AND ${notIn(Prisma.sql`s."tmdbId"`, exclude)}
          UNION
          SELECT DISTINCT s."tmdbId" AS id
          FROM "Serie" s
          JOIN "SerieCrew" c ON c."serieId" = s.id
          WHERE c."pessoaId" IN (${Prisma.join(creatorIds)})
            AND LOWER(c.job) = 'creator'
            AND ${notIn(Prisma.sql`s."tmdbId"`, exclude)}
        `)
      : Promise.resolve([]),
    tokens.length ? plotIds('Serie', 'tmdbId', tokens, exclude) : Promise.resolve([]),
  ]);
  return mergeCandidateIds(byOverlap, [...byPlot, ...byCreator], POOL);
}

async function countedIds(
  fromSql: Prisma.Sql,
  idSql: Prisma.Sql,
  matchIds: number[],
  excludeColumn: Prisma.Sql,
  exclude: number[],
): Promise<number[]> {
  if (matchIds.length === 0) return [];
  return queryIds(Prisma.sql`
    SELECT ${idSql} AS id
    ${fromSql}
    WHERE ${excludeColumn} IN (${Prisma.join(matchIds)})
      AND ${notIn(idSql, exclude)}
    GROUP BY 1
    ORDER BY COUNT(*) DESC, 1 DESC
    LIMIT 260
  `);
}

async function animeIds(seeds: MatchProfile[], attrs: GateAttr[], exclude: number[]): Promise<number[]> {
  const tagIds = refs(attrs, 'tags');
  const genreIds = refs(attrs, 'generos');
  const studioIds = [...new Set([...refs(attrs, 'estudio'), ...profileRefs(seeds, 'estudio')])];
  const [byTag, byGenre, byStudio] = await Promise.all([
    countedIds(
      Prisma.sql`FROM "Anime" a JOIN "AnimeOnTag" link ON link."animeId" = a.id`,
      Prisma.sql`a."anilistId"`,
      tagIds,
      Prisma.sql`link."tagId"`,
      exclude,
    ),
    countedIds(
      Prisma.sql`FROM "Anime" a JOIN "AnimeOnGenero" link ON link."animeId" = a.id`,
      Prisma.sql`a."anilistId"`,
      genreIds,
      Prisma.sql`link."generoId"`,
      exclude,
    ),
    studioIds.length
      ? queryIds(Prisma.sql`
          SELECT DISTINCT a."anilistId" AS id
          FROM "Anime" a
          JOIN "AnimeOnStudio" link ON link."animeId" = a.id
          WHERE link."studioId" IN (${Prisma.join(studioIds)})
            AND ${notIn(Prisma.sql`a."anilistId"`, exclude)}
        `)
      : Promise.resolve([]),
  ]);
  return mergeCandidateIds(byGenre, [...byStudio, ...byTag], POOL);
}

async function jogoIds(
  seeds: MatchProfile[],
  attrs: GateAttr[],
  exclude: number[],
  gamePlay: GamePlay | null,
): Promise<number[]> {
  const genreIds = refs(attrs, 'generos');
  const themeIds = refs(attrs, 'temas');
  const developerIds = [...new Set([...refs(attrs, 'desenvolvedora'), ...profileRefs(seeds, 'desenvolvedora')])];
  const modeNames = gamePlay == null ? [] : gamePlay === 'single' ? SINGLE_MODE_NAMES : MULTI_MODE_NAMES;
  const modeSql = modeNames.length === 0
    ? Prisma.sql`TRUE`
    : Prisma.sql`EXISTS (
        SELECT 1
        FROM "JogoOnGameMode" jm
        JOIN "GameMode" gm ON gm.id = jm."gameModeId"
        WHERE jm."jogoId" = j.id
          AND gm.name IN (${Prisma.join(modeNames)})
      )`;
  const [byTheme, byGenre, byDeveloper] = await Promise.all([
    themeIds.length
      ? queryIds(Prisma.sql`
          SELECT j."igdbId" AS id
          FROM "Jogo" j
          JOIN "JogoOnTheme" link ON link."jogoId" = j.id
          WHERE link."themeId" IN (${Prisma.join(themeIds)})
            AND ${notIn(Prisma.sql`j."igdbId"`, exclude)}
            AND ${modeSql}
          GROUP BY j.id, j."igdbId"
          ORDER BY COUNT(DISTINCT link."themeId") DESC, j."igdbId" DESC
          LIMIT 220
        `)
      : Promise.resolve([]),
    genreIds.length
      ? queryIds(Prisma.sql`
          SELECT j."igdbId" AS id
          FROM "Jogo" j
          JOIN "JogoOnGenero" link ON link."jogoId" = j.id
          WHERE link."generoId" IN (${Prisma.join(genreIds)})
            AND ${notIn(Prisma.sql`j."igdbId"`, exclude)}
            AND ${modeSql}
          GROUP BY j.id, j."igdbId"
          ORDER BY COUNT(DISTINCT link."generoId") DESC, j."igdbId" DESC
          LIMIT 220
        `)
      : Promise.resolve([]),
    developerIds.length
      ? queryIds(Prisma.sql`
          SELECT DISTINCT j."igdbId" AS id
          FROM "Jogo" j
          JOIN "JogoOnCompany" link ON link."jogoId" = j.id
          WHERE link."companyId" IN (${Prisma.join(developerIds)})
            AND LOWER(link.role) = 'developer'
            AND ${notIn(Prisma.sql`j."igdbId"`, exclude)}
            AND ${modeSql}
        `)
      : Promise.resolve([]),
  ]);
  return mergeCandidateIds(byGenre, [...byDeveloper, ...byTheme], POOL);
}

export async function loadCandidateIds(input: {
  tipo: MatchTipo;
  seeds: MatchProfile[];
  attrs: GateAttr[];
  excludeIds: number[];
  gamePlay: GamePlay | null;
}): Promise<number[]> {
  if (input.tipo === 'filme') return filmIds(input.seeds, input.attrs, input.excludeIds);
  if (input.tipo === 'serie') return serieIds(input.seeds, input.attrs, input.excludeIds);
  if (input.tipo === 'anime') return animeIds(input.seeds, input.attrs, input.excludeIds);
  return jogoIds(input.seeds, input.attrs, input.excludeIds, input.gamePlay);
}
