import { prisma } from './clients';
import {
  mapAnimeToMidia,
  mapFilmeToMidia,
  mapJogoToMidia,
  mapSerieToMidia,
  translateAnimeGenre,
  translateGameTheme,
} from './mappers';
import { animeSafeWhereFilter } from './qualityFilters';
import {
  computeMatch,
  hasComparableSignal,
  MATCH_RESULT_LIMIT,
  matchUserMessage,
  MULTI_MODE_NAMES,
  overviewTokens,
  rarestAttr,
  rarityMapKey,
  seedWeightFromPreference,
  sharedStrong,
  SINGLE_MODE_NAMES,
  soloRetrievalAttrs,
  tokenForms,
  tuneProfile,
  type GamePlay,
  type GateAttr,
  type MatchAttr,
  type MatchOutcomeReason,
  type MatchPart,
  type MatchProfile,
  type MatchTipo,
  type RarityIndex,
} from './matchScore';
import { loadCandidateIds, rememberOverviewFrequency } from './matchRetrieval';

const BASE_SEED_LIMIT = 40;

const DIRECT_ANIME_RELATIONS = new Set([
  'SEQUEL',
  'PREQUEL',
  'SIDE_STORY',
  'PARENT',
  'ALTERNATIVE',
]);

type CatalogRow = any;

export type MatchPayload = {
  tipo: MatchTipo;
  modo: 'solo' | 'dupla';
  jogo: GamePlay | null;
  origem: 'base' | 'titulos';
  reason: MatchOutcomeReason;
  message: string;
  sementes: unknown[];
  itens: unknown[];
};

const rarityCache = new Map<MatchTipo, RarityIndex>();

const personSelect = { select: { id: true, name: true } };

const filmInclude = {
  genres: { include: { genero: true } },
  crew: {
    where: { job: { equals: 'Director', mode: 'insensitive' as const } },
    include: { pessoa: personSelect },
  },
  cast: {
    orderBy: { order: 'asc' as const },
    take: 5,
    include: { pessoa: personSelect },
  },
  companies: { include: { company: { select: { id: true, name: true } } } },
};

const serieInclude = {
  genres: { include: { genero: true } },
  createdBy: { include: { pessoa: personSelect } },
  crew: {
    where: { job: { equals: 'Creator', mode: 'insensitive' as const } },
    include: { pessoa: personSelect },
  },
  cast: {
    orderBy: { order: 'asc' as const },
    take: 5,
    include: { pessoa: personSelect },
  },
};

const animeInclude = {
  genres: { include: { genero: true } },
  tags: { include: { tag: true } },
  studios: { include: { studio: { select: { id: true, name: true } } } },
  sourceRelations: { include: { relatedAnime: { select: { anilistId: true } } } },
  relatedRelations: { include: { sourceAnime: { select: { anilistId: true } } } },
};

const jogoInclude = {
  genres: { include: { genero: true } },
  themes: { include: { theme: true } },
  playerPerspectives: { include: { perspective: true } },
  companies: {
    where: { role: { equals: 'developer', mode: 'insensitive' as const } },
    include: { company: { select: { id: true, name: true } } },
  },
  gameModes: { include: { gameMode: true } },
};

function asNumber(value: unknown): number {
  if (typeof value === 'bigint') return Number(value);
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim()) return Number(value);
  return 0;
}

function externalId(tipo: MatchTipo, row: CatalogRow): number {
  if (tipo === 'anime') return row.anilistId ?? 0;
  if (tipo === 'jogo') return row.igdbId ?? 0;
  return row.tmdbId ?? 0;
}

function namedAttr(prefix: string, entity: { id?: number; name?: string | null } | null | undefined): MatchAttr | null {
  const name = entity?.name?.trim();
  if (!entity?.id || !name) return null;
  return { key: `${prefix}:${entity.id}`, label: name, ref: String(entity.id) };
}

function genreAttrs(list: { genero?: { id?: number; name?: string | null } | null }[] | null | undefined): MatchAttr[] {
  const out: MatchAttr[] = [];
  for (const item of list ?? []) {
    const name = item.genero?.name?.trim();
    if (!name || !item.genero?.id) continue;
    if (name.toLowerCase() === 'hentai') continue;
    out.push({ key: name, label: name, ref: String(item.genero.id) });
  }
  return out;
}

function peopleAttrs(list: { pessoa?: { id?: number; name?: string | null } | null }[] | null | undefined): MatchAttr[] {
  const out: MatchAttr[] = [];
  const seen = new Set<string>();
  for (const item of list ?? []) {
    const attr = namedAttr('pessoa', item.pessoa);
    if (!attr || seen.has(attr.key)) continue;
    seen.add(attr.key);
    out.push(attr);
  }
  return out;
}

function castAttrs(list: { order?: number | null; pessoa?: { id?: number; name?: string | null } | null }[] | null | undefined): MatchAttr[] {
  return peopleAttrs([...(list ?? [])].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))).slice(0, 5);
}

function decadeAttr(date: Date | string | null | undefined, year: number | null | undefined): MatchAttr[] {
  let parsedYear: number | null = null;
  if (date instanceof Date && !Number.isNaN(date.getTime())) parsedYear = date.getUTCFullYear();
  else if (typeof date === 'string' && date) {
    const parsed = new Date(date);
    if (!Number.isNaN(parsed.getTime())) parsedYear = parsed.getUTCFullYear();
  }
  if (parsedYear == null && typeof year === 'number') parsedYear = year;
  if (parsedYear == null || parsedYear < 1880 || parsedYear > 2100) return [];
  const decade = Math.floor(parsedYear / 10) * 10;
  return [{ key: String(decade), label: `anos ${decade}` }];
}

function tagAttrs(list: { tag?: { id?: number; name?: string | null; isAdult?: boolean | null } | null }[] | null | undefined): MatchAttr[] {
  const out: MatchAttr[] = [];
  for (const item of list ?? []) {
    const tag = item.tag;
    const name = tag?.name?.trim();
    if (!name || tag?.id == null || tag.isAdult || name.toLowerCase() === 'hentai') continue;
    out.push({ key: name, label: name, ref: String(tag.id) });
  }
  return out;
}

function studioAttrs(list: { studio?: { id?: number; name?: string | null } | null }[] | null | undefined): MatchAttr[] {
  const out: MatchAttr[] = [];
  for (const item of list ?? []) {
    const attr = namedAttr('studio', item.studio);
    if (attr) out.push(attr);
  }
  return out;
}

function simpleNamedAttrs(
  list: { theme?: { id?: number; name?: string | null } | null; perspective?: { id?: number; name?: string | null } | null }[] | null | undefined,
  field: 'theme' | 'perspective',
): MatchAttr[] {
  const out: MatchAttr[] = [];
  for (const item of list ?? []) {
    const entity = item[field];
    const name = entity?.name?.trim();
    if (!name || entity?.id == null) continue;
    out.push({ key: name, label: name, ref: String(entity.id) });
  }
  return out;
}

function companyAttrs(list: { company?: { id?: number; name?: string | null } | null }[] | null | undefined): MatchAttr[] {
  const out: MatchAttr[] = [];
  for (const item of list ?? []) {
    const attr = namedAttr('company', item.company);
    if (attr) out.push(attr);
  }
  return out;
}

function developerAttrs(list: { company?: { id?: number; name?: string | null } | null }[] | null | undefined): MatchAttr[] {
  const out: MatchAttr[] = [];
  for (const item of list ?? []) {
    const attr = namedAttr('dev', item.company);
    if (attr) out.push(attr);
  }
  return out;
}

function relatedAnimeIds(row: CatalogRow): number[] {
  const ids: number[] = [];
  for (const rel of row.sourceRelations ?? []) {
    if (DIRECT_ANIME_RELATIONS.has(String(rel.relationType)) && rel.relatedAnime?.anilistId) {
      ids.push(rel.relatedAnime.anilistId);
    }
  }
  for (const rel of row.relatedRelations ?? []) {
    if (DIRECT_ANIME_RELATIONS.has(String(rel.relationType)) && rel.sourceAnime?.anilistId) {
      ids.push(rel.sourceAnime.anilistId);
    }
  }
  return ids;
}

function toProfile(tipo: MatchTipo, row: CatalogRow, weight = 1): MatchProfile {
  const id = externalId(tipo, row);
  if (tipo === 'filme') {
    return {
      id,
      seedWeight: weight,
      adult: row.adult === true,
      collectionId: row.collectionId ?? null,
      attrs: {
        generos: genreAttrs(row.genres),
        diretor: peopleAttrs(row.crew),
        elenco: castAttrs(row.cast),
        decada: decadeAttr(row.releaseDate, row.releaseYear),
        trama: overviewTokens(row.overview),
        produtora: companyAttrs(row.companies),
      },
    };
  }
  if (tipo === 'serie') {
    return {
      id,
      seedWeight: weight,
      adult: row.adult === true,
      attrs: {
        generos: genreAttrs(row.genres),
        criador: peopleAttrs([...(row.createdBy ?? []), ...(row.crew ?? [])]),
        elenco: castAttrs(row.cast),
        decada: decadeAttr(row.firstAirDate, row.releaseYear),
        trama: overviewTokens(row.overview),
      },
    };
  }
  if (tipo === 'anime') {
    return {
      id,
      seedWeight: weight,
      adult: row.isAdult === true,
      formato: row.format ?? null,
      relatedIds: relatedAnimeIds(row),
      attrs: {
        generos: genreAttrs(row.genres),
        tags: tagAttrs(row.tags),
        estudio: studioAttrs(row.studios),
      },
    };
  }
  return {
    id,
    seedWeight: weight,
    modes: (row.gameModes ?? [])
      .map((item: { gameMode?: { name?: string | null } | null }) => item.gameMode?.name?.trim())
      .filter((name: string | undefined): name is string => Boolean(name)),
    attrs: {
      generos: genreAttrs(row.genres),
      temas: simpleNamedAttrs(row.themes, 'theme'),
      perspectiva: simpleNamedAttrs(row.playerPerspectives, 'perspective'),
      desenvolvedora: developerAttrs(row.companies),
    },
  };
}

function displayLabel(tipo: MatchTipo, label: string): string {
  const translated = tipo === 'anime'
    ? translateAnimeGenre(label)
    : tipo === 'jogo'
      ? translateGameTheme(label)
      : label;
  if (!translated) return translated;
  return translated.charAt(0).toLocaleUpperCase('pt-BR') + translated.slice(1);
}

function mapRow(tipo: MatchTipo, row: CatalogRow): Record<string, unknown> {
  if (tipo === 'filme') return mapFilmeToMidia(row);
  if (tipo === 'serie') return mapSerieToMidia(row);
  if (tipo === 'anime') return mapAnimeToMidia(row);
  return mapJogoToMidia(row);
}

function idsOf(attrs: GateAttr[], part: MatchPart): number[] {
  return [...new Set(
    attrs
      .filter((attr) => attr.part === part && attr.ref && /^\d+$/.test(attr.ref))
      .map((attr) => Number(attr.ref)),
  )];
}

function modeWhere(play: GamePlay) {
  const names = play === 'single' ? SINGLE_MODE_NAMES : MULTI_MODE_NAMES;
  return {
    gameModes: {
      some: {
        gameMode: {
          OR: names.map((name) => ({ name: { equals: name, mode: 'insensitive' as const } })),
        },
      },
    },
  };
}

function sheetWhere(allowAdult: boolean) {
  return {
    AND: [
      {
        OR: [
          { posterPath: { not: null } },
          { AND: [{ overview: { not: null } }, { NOT: { overview: '' } }] },
        ],
      },
      ...(allowAdult ? [] : [{ OR: [{ adult: false }, { adult: null }] }]),
    ],
  };
}

function gateFilters(tipo: MatchTipo, attrs: GateAttr[]): Record<string, unknown>[] {
  const or: Record<string, unknown>[] = [];
  const genres = idsOf(attrs, 'generos');
  if (genres.length) or.push({ genres: { some: { generoId: { in: genres } } } });
  if (tipo === 'filme') {
    const directors = idsOf(attrs, 'diretor');
    if (directors.length) {
      or.push({
        crew: {
          some: {
            pessoaId: { in: directors },
            job: { equals: 'Director', mode: 'insensitive' },
          },
        },
      });
    }
  }
  if (tipo === 'serie') {
    const creators = idsOf(attrs, 'criador');
    if (creators.length) {
      or.push({ createdBy: { some: { pessoaId: { in: creators } } } });
      or.push({
        crew: {
          some: {
            pessoaId: { in: creators },
            job: { equals: 'Creator', mode: 'insensitive' },
          },
        },
      });
    }
  }
  if (tipo === 'anime') {
    const tags = idsOf(attrs, 'tags');
    const studios = idsOf(attrs, 'estudio');
    if (tags.length) or.push({ tags: { some: { tagId: { in: tags } } } });
    if (studios.length) or.push({ studios: { some: { studioId: { in: studios } } } });
  }
  if (tipo === 'jogo') {
    const themes = idsOf(attrs, 'temas');
    const developers = idsOf(attrs, 'desenvolvedora');
    if (themes.length) or.push({ themes: { some: { themeId: { in: themes } } } });
    if (developers.length) {
      or.push({
        companies: {
          some: {
            companyId: { in: developers },
            role: { equals: 'developer', mode: 'insensitive' },
          },
        },
      });
    }
  }
  return or;
}

function excludeWhere(tipo: MatchTipo, excludeIds: number[]) {
  if (excludeIds.length === 0) return {};
  if (tipo === 'anime') return { anilistId: { notIn: excludeIds } };
  if (tipo === 'jogo') return { igdbId: { notIn: excludeIds } };
  return { tmdbId: { notIn: excludeIds } };
}

function candidateWhere(
  tipo: MatchTipo,
  attrs: GateAttr[],
  excludeIds: number[],
  gamePlay: GamePlay | null,
  allowAdult: boolean,
): Record<string, any> {
  const or = gateFilters(tipo, attrs);
  const shared = or.length === 1 ? or[0] : { OR: or };
  if (tipo === 'filme' || tipo === 'serie') {
    return { AND: [sheetWhere(allowAdult), shared, excludeWhere(tipo, excludeIds)] };
  }
  if (tipo === 'anime') {
    return { AND: [animeSafeWhereFilter, shared, excludeWhere(tipo, excludeIds)] };
  }
  return {
    AND: [
      {
        OR: [
          { AND: [{ summary: { not: null } }, { NOT: { summary: '' } }] },
          { AND: [{ cover: { not: null } }, { NOT: { cover: '' } }] },
        ],
      },
      shared,
      excludeWhere(tipo, excludeIds),
      ...(gamePlay ? [modeWhere(gamePlay)] : []),
    ],
  };
}

async function loadRows(tipo: MatchTipo, ids: number[]): Promise<CatalogRow[]> {
  if (ids.length === 0) return [];
  if (tipo === 'filme') {
    return prisma.filme.findMany({ where: { tmdbId: { in: ids } }, include: filmInclude });
  }
  if (tipo === 'serie') {
    return prisma.serie.findMany({ where: { tmdbId: { in: ids } }, include: serieInclude });
  }
  if (tipo === 'anime') {
    return prisma.anime.findMany({ where: { anilistId: { in: ids } }, include: animeInclude });
  }
  return prisma.jogo.findMany({ where: { igdbId: { in: ids } }, include: jogoInclude });
}

async function loadCandidateRows(
  tipo: MatchTipo,
  attrs: GateAttr[],
  seeds: MatchProfile[],
  excludeIds: number[],
  gamePlay: GamePlay | null,
  allowAdult: boolean,
): Promise<CatalogRow[]> {
  const ids = await loadCandidateIds({ tipo, seeds, attrs, excludeIds, gamePlay });
  if (ids.length === 0) return [];
  if (tipo === 'filme') {
    return prisma.filme.findMany({
      where: { AND: [sheetWhere(allowAdult), { tmdbId: { in: ids } }] },
      include: filmInclude,
    });
  }
  if (tipo === 'serie') {
    return prisma.serie.findMany({
      where: { AND: [sheetWhere(allowAdult), { tmdbId: { in: ids } }] },
      include: serieInclude,
    });
  }
  if (tipo === 'anime') {
    return prisma.anime.findMany({
      where: { AND: [animeSafeWhereFilter, { anilistId: { in: ids } }] },
      include: animeInclude,
    });
  }
  return prisma.jogo.findMany({
    where: {
      AND: [
        {
          OR: [
            { AND: [{ summary: { not: null } }, { NOT: { summary: '' } }] },
            { AND: [{ cover: { not: null } }, { NOT: { cover: '' } }] },
          ],
        },
        { igdbId: { in: ids } },
        ...(gamePlay ? [modeWhere(gamePlay)] : []),
      ],
    },
    include: jogoInclude,
  });
}

async function countCandidates(
  tipo: MatchTipo,
  attrs: GateAttr[],
  excludeIds: number[],
  allowAdult: boolean,
): Promise<number> {
  if (gateFilters(tipo, attrs).length === 0) return 0;
  const where = candidateWhere(tipo, attrs, excludeIds, null, allowAdult);
  if (tipo === 'filme') return prisma.filme.count({ where });
  if (tipo === 'serie') return prisma.serie.count({ where });
  if (tipo === 'anime') return prisma.anime.count({ where });
  return prisma.jogo.count({ where });
}

async function loadBaseSeeds(userId: number, tipo: MatchTipo): Promise<Array<{ id: number; weight: number }>> {
  const prefs = await prisma.preferencias_usuario_midia.findMany({
    where: {
      usuario_id: userId,
      tipo_midia: tipo,
      OR: [
        { status: 'favorito' },
        { avaliacao: { in: ['gostei', 'amei'] } },
      ],
    },
    orderBy: { data_interacao: 'desc' },
    take: BASE_SEED_LIMIT,
    select: { midia_id: true, status: true, avaliacao: true },
  });
  const seeds: Array<{ id: number; weight: number }> = [];
  for (const pref of prefs) {
    const weight = seedWeightFromPreference(pref.status, pref.avaliacao);
    if (weight == null) continue;
    seeds.push({ id: pref.midia_id, weight });
  }
  return seeds;
}

async function loadBlockedIds(userId: number | null, tipo: MatchTipo): Promise<number[]> {
  if (!userId) return [];
  const prefs = await prisma.preferencias_usuario_midia.findMany({
    where: {
      usuario_id: userId,
      tipo_midia: tipo,
      OR: [{ status: 'oculto' }, { avaliacao: 'nao_gostei' }],
    },
    select: { midia_id: true },
  });
  return prefs.map((pref) => pref.midia_id);
}

function rememberDf(df: Record<string, number>, part: MatchPart, key: string, value: number) {
  if (!key || !(value > 0)) return;
  df[`${part}:${key.trim().toLowerCase().replace(/\s+/g, ' ')}`] = value;
}

async function groupedNames(query: Promise<Array<{ name: string | null; df: unknown }>>, part: MatchPart, df: Record<string, number>) {
  const rows = await query;
  for (const row of rows) {
    if (row.name) rememberDf(df, part, row.name, asNumber(row.df));
  }
}

async function groupedIds(
  query: Promise<Array<{ id: unknown; df: unknown }>>,
  part: MatchPart,
  prefix: string,
  df: Record<string, number>,
) {
  const rows = await query;
  for (const row of rows) {
    if (row.id == null) continue;
    rememberDf(df, part, `${prefix}:${asNumber(row.id)}`, asNumber(row.df));
  }
}

async function loadRarity(tipo: MatchTipo): Promise<RarityIndex> {
  const df: Record<string, number> = {};
  if (tipo === 'filme') {
    const [countRows] = await Promise.all([
      prisma.$queryRaw<Array<{ n: unknown }>>`SELECT COUNT(*)::int AS n FROM "Filme"`,
      groupedNames(prisma.$queryRaw`
        SELECT g."name" AS name, COUNT(DISTINCT fg."filmeId")::int AS df
        FROM "FilmeGenero" fg
        JOIN "Genero" g ON g.id = fg."generoId"
        GROUP BY g."name"
      `, 'generos', df),
      groupedIds(prisma.$queryRaw`
        SELECT fc."pessoaId" AS id, COUNT(DISTINCT fc."filmeId")::int AS df
        FROM "FilmeCrew" fc
        WHERE LOWER(fc."job") = 'director'
        GROUP BY fc."pessoaId"
      `, 'diretor', 'pessoa', df),
      groupedIds(prisma.$queryRaw`
        SELECT fc."pessoaId" AS id, COUNT(DISTINCT fc."filmeId")::int AS df
        FROM "FilmeCast" fc
        GROUP BY fc."pessoaId"
      `, 'elenco', 'pessoa', df),
      groupedIds(prisma.$queryRaw`
        SELECT fc."companyId" AS id, COUNT(DISTINCT fc."filmeId")::int AS df
        FROM "FilmeCompany" fc
        GROUP BY fc."companyId"
      `, 'produtora', 'company', df),
      (async () => {
        const rows = await prisma.$queryRaw<Array<{ decade: unknown; df: unknown }>>`
          SELECT (FLOOR(COALESCE(EXTRACT(YEAR FROM "releaseDate"), "releaseYear"::numeric) / 10) * 10)::int AS decade,
                 COUNT(*)::int AS df
          FROM "Filme"
          WHERE "releaseDate" IS NOT NULL OR "releaseYear" IS NOT NULL
          GROUP BY 1
        `;
        for (const row of rows) rememberDf(df, 'decada', String(asNumber(row.decade)), asNumber(row.df));
      })(),
    ]);
    return { n: asNumber(countRows[0]?.n), df };
  }

  if (tipo === 'serie') {
    const [countRows] = await Promise.all([
      prisma.$queryRaw<Array<{ n: unknown }>>`SELECT COUNT(*)::int AS n FROM "Serie"`,
      groupedNames(prisma.$queryRaw`
        SELECT g."name" AS name, COUNT(DISTINCT sg."serieId")::int AS df
        FROM "SerieGenero" sg
        JOIN "Genero" g ON g.id = sg."generoId"
        GROUP BY g."name"
      `, 'generos', df),
      groupedIds(prisma.$queryRaw`
        SELECT pessoa."pessoaId" AS id, COUNT(DISTINCT pessoa."serieId")::int AS df
        FROM (
          SELECT "pessoaId", "serieId" FROM "SerieCreator"
          UNION
          SELECT "pessoaId", "serieId" FROM "SerieCrew" WHERE LOWER("job") = 'creator'
        ) pessoa
        GROUP BY pessoa."pessoaId"
      `, 'criador', 'pessoa', df),
      groupedIds(prisma.$queryRaw`
        SELECT sc."pessoaId" AS id, COUNT(DISTINCT sc."serieId")::int AS df
        FROM "SerieCast" sc
        GROUP BY sc."pessoaId"
      `, 'elenco', 'pessoa', df),
      (async () => {
        const rows = await prisma.$queryRaw<Array<{ decade: unknown; df: unknown }>>`
          SELECT (FLOOR(COALESCE(EXTRACT(YEAR FROM "firstAirDate"), "releaseYear"::numeric) / 10) * 10)::int AS decade,
                 COUNT(*)::int AS df
          FROM "Serie"
          WHERE "firstAirDate" IS NOT NULL OR "releaseYear" IS NOT NULL
          GROUP BY 1
        `;
        for (const row of rows) rememberDf(df, 'decada', String(asNumber(row.decade)), asNumber(row.df));
      })(),
    ]);
    return { n: asNumber(countRows[0]?.n), df };
  }

  if (tipo === 'anime') {
    const [countRows] = await Promise.all([
      prisma.$queryRaw<Array<{ n: unknown }>>`SELECT COUNT(*)::int AS n FROM "Anime"`,
      groupedNames(prisma.$queryRaw`
        SELECT g."name" AS name, COUNT(DISTINCT ag."animeId")::int AS df
        FROM "AnimeOnGenero" ag
        JOIN "AnimeGenero" g ON g.id = ag."generoId"
        GROUP BY g."name"
      `, 'generos', df),
      groupedNames(prisma.$queryRaw`
        SELECT t."name" AS name, COUNT(DISTINCT at."animeId")::int AS df
        FROM "AnimeOnTag" at
        JOIN "AnimeTag" t ON t.id = at."tagId"
        GROUP BY t."name"
      `, 'tags', df),
      groupedIds(prisma.$queryRaw`
        SELECT s."studioId" AS id, COUNT(DISTINCT s."animeId")::int AS df
        FROM "AnimeOnStudio" s
        GROUP BY s."studioId"
      `, 'estudio', 'studio', df),
    ]);
    return { n: asNumber(countRows[0]?.n), df };
  }

  const [countRows] = await Promise.all([
    prisma.$queryRaw<Array<{ n: unknown }>>`SELECT COUNT(*)::int AS n FROM "Jogo"`,
    groupedNames(prisma.$queryRaw`
      SELECT g."name" AS name, COUNT(DISTINCT jg."jogoId")::int AS df
      FROM "JogoOnGenero" jg
      JOIN "JogoGenero" g ON g.id = jg."generoId"
      GROUP BY g."name"
    `, 'generos', df),
    groupedNames(prisma.$queryRaw`
      SELECT t."name" AS name, COUNT(DISTINCT jt."jogoId")::int AS df
      FROM "JogoOnTheme" jt
      JOIN "JogoTheme" t ON t.id = jt."themeId"
      GROUP BY t."name"
    `, 'temas', df),
    groupedNames(prisma.$queryRaw`
      SELECT p."name" AS name, COUNT(DISTINCT jp."jogoId")::int AS df
      FROM "JogoOnPlayerPerspective" jp
      JOIN "JogoPlayerPerspective" p ON p.id = jp."perspectiveId"
      GROUP BY p."name"
    `, 'perspectiva', df),
    groupedIds(prisma.$queryRaw`
      SELECT jc."companyId" AS id, COUNT(DISTINCT jc."jogoId")::int AS df
      FROM "JogoOnCompany" jc
      WHERE LOWER(jc."role") = 'developer'
      GROUP BY jc."companyId"
    `, 'desenvolvedora', 'dev', df),
  ]);
  return { n: asNumber(countRows[0]?.n), df };
}

async function rarityFor(tipo: MatchTipo): Promise<RarityIndex> {
  const cached = rarityCache.get(tipo);
  if (cached) return cached;
  const index = await loadRarity(tipo);
  rarityCache.set(tipo, index);
  return index;
}

function allowAdultTitles(seeds: MatchProfile[]): boolean {
  return seeds.length > 0 && seeds.every((seed) => seed.adult === true);
}

function emptyPayload(
  input: {
    tipo: MatchTipo;
    modo: 'solo' | 'dupla';
    gamePlay: GamePlay | null;
    origem: 'base' | 'titulos';
  },
  reason: MatchOutcomeReason,
  extra?: { bloqueadoPeloModo?: boolean; paralelo?: string[]; sementes?: unknown[] },
): MatchPayload {
  return {
    tipo: input.tipo,
    modo: input.modo,
    jogo: input.gamePlay,
    origem: input.origem,
    reason,
    message: matchUserMessage({
      reason,
      tipo: input.tipo,
      gamePlay: input.gamePlay,
      bloqueadoPeloModo: extra?.bloqueadoPeloModo,
      paralelo: extra?.paralelo,
    }),
    sementes: extra?.sementes ?? [],
    itens: [],
  };
}

export async function runMatch(input: {
  tipo: MatchTipo;
  modo: 'solo' | 'dupla';
  ids: number[];
  useBase: boolean;
  gamePlay: GamePlay | null;
  userId: number | null;
}): Promise<MatchPayload> {
  const origem: 'base' | 'titulos' = input.useBase ? 'base' : 'titulos';
  const meta = { tipo: input.tipo, modo: input.modo, gamePlay: input.gamePlay, origem };

  let requested: Array<{ id: number; weight: number }> = input.ids.map((id) => ({ id, weight: 1 }));
  if (input.useBase) {
    if (!input.userId) return emptyPayload(meta, 'precisa_login');
    requested = await loadBaseSeeds(input.userId, input.tipo);
    if (requested.length === 0) return emptyPayload(meta, 'sem_base');
  }

  const [rows, blockedIds, rarity] = await Promise.all([
    loadRows(input.tipo, requested.map((seed) => seed.id)),
    loadBlockedIds(input.userId, input.tipo),
    rarityFor(input.tipo),
  ]);
  const byId = new Map(rows.map((row) => [externalId(input.tipo, row), row]));
  const ordered = requested
    .map((seed) => ({ row: byId.get(seed.id), weight: seed.weight }))
    .filter((seed): seed is { row: CatalogRow; weight: number } => Boolean(seed.row));

  if (!input.useBase && ordered.length !== requested.length) return emptyPayload(meta, 'titulo_ausente');
  if (ordered.length === 0) return emptyPayload(meta, 'sem_base');

  const paired = ordered.map((seed) => ({
    profile: toProfile(input.tipo, seed.row, seed.weight),
    row: mapRow(input.tipo, seed.row),
  }));
  const usable = input.useBase
    ? paired.filter((seed) => hasComparableSignal(input.tipo, seed.profile))
    : paired;
  if (usable.length === 0 || (!input.useBase && usable.some((seed) => !hasComparableSignal(input.tipo, seed.profile)))) {
    return emptyPayload(meta, 'sem_ficha', { sementes: paired.map((seed) => seed.row) });
  }
  const rawProfiles = usable.map((seed) => seed.profile);
  if (input.tipo === 'filme' || input.tipo === 'serie') {
    await rememberOverviewFrequency(
      input.tipo,
      rawProfiles.flatMap((profile) => (profile.attrs.trama ?? []).map((attr) => attr.key)),
      rarity,
    );
  }
  const profiles = rawProfiles.map((profile) => tuneProfile(profile, rarity));
  const seedRows = usable.map((seed) => seed.row);

  const strong = input.modo === 'dupla' ? sharedStrong(input.tipo, profiles, rarity) : [];
  if (input.modo === 'dupla' && strong.length === 0) {
    return emptyPayload(meta, 'sem_paralelo', { sementes: seedRows });
  }
  const queryAttrs = input.modo === 'dupla'
    ? [rarestAttr(strong, rarity)].filter((attr): attr is GateAttr => Boolean(attr))
    : soloRetrievalAttrs(input.tipo, profiles, rarity);
  if (queryAttrs.length === 0) {
    return emptyPayload(meta, 'sem_afinidade', { sementes: seedRows });
  }

  const excludeIds = [...new Set([
    ...profiles.map((seed) => seed.id),
    ...profiles.flatMap((seed) => seed.relatedIds ?? []),
    ...blockedIds,
  ])];
  const adultOk = allowAdultTitles(profiles);
  const candidateRows = await loadCandidateRows(
    input.tipo,
    queryAttrs,
    profiles,
    excludeIds,
    input.gamePlay,
    adultOk,
  );
  const rawCandidates = candidateRows.map((row) => toProfile(input.tipo, row));
  if (input.tipo === 'filme' || input.tipo === 'serie') {
    await rememberOverviewFrequency(
      input.tipo,
      rawCandidates.flatMap((profile) => (profile.attrs.trama ?? []).map((attr) => attr.key)),
      rarity,
    );
  }
  const scored = computeMatch({
    tipo: input.tipo,
    modo: input.modo,
    seeds: profiles,
    candidates: rawCandidates.map((profile) => tuneProfile(profile, rarity)),
    rarity,
    gamePlay: input.gamePlay,
    blockedIds,
    limit: MATCH_RESULT_LIMIT,
  });

  let bloqueadoPeloModo = scored.bloqueadoPeloModo;
  if (
    input.gamePlay
    && scored.reason === 'sem_afinidade'
    && !bloqueadoPeloModo
    && candidateRows.length === 0
  ) {
    const withoutMode = await countCandidates(input.tipo, queryAttrs, excludeIds, adultOk);
    if (withoutMode > 0) bloqueadoPeloModo = true;
  }

  const paralelo = scored.paralelo.map((label) => displayLabel(input.tipo, label));
  if (scored.reason !== 'ok') {
    return emptyPayload(meta, scored.reason, { bloqueadoPeloModo, paralelo, sementes: seedRows });
  }

  const candidateById = new Map(candidateRows.map((row) => [externalId(input.tipo, row), row]));
  const itens = scored.items.flatMap((item) => {
    const row = candidateById.get(item.id);
    if (!row) return [];
    return [{
      ...mapRow(input.tipo, row),
      generos_em_comum: item.shared.map((label) => displayLabel(input.tipo, label)),
    }];
  });

  const reason: MatchOutcomeReason = itens.length ? 'ok' : 'sem_afinidade';
  return {
    tipo: input.tipo,
    modo: input.modo,
    jogo: input.gamePlay,
    origem,
    reason,
    message: matchUserMessage({
      reason,
      tipo: input.tipo,
      gamePlay: input.gamePlay,
      bloqueadoPeloModo: !itens.length && bloqueadoPeloModo,
      paralelo: itens.length ? undefined : paralelo,
    }),
    sementes: seedRows,
    itens,
  };
}
