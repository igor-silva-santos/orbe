import { prisma } from './clients';
import { translateAnimeGenre, translateGameGenre, mapFilmeToMidia, mapSerieToMidia, mapAnimeToMidia, mapJogoToMidia } from './mappers';
import {
  animeQualityFilter,
  filmeQualityFilter,
  jogoQualityFilter,
  serieQualityFilter,
} from './qualityFilters';
import {
  computeMatch,
  MATCH_RESULT_LIMIT,
  matchUserMessage,
  MULTIPLAYER_NAME_FRAGMENTS,
  normalizeMatchLabel,
  SINGLE_NAME_FRAGMENTS,
  type GamePlay,
  type MatchOutcomeReason,
  type MatchTipo,
  type MatchTitle,
} from './matchScore';

const BASE_SEED_LIMIT = 12;
const CANDIDATE_POOL = 80;

const LIKED = ['gostei', 'amei'] as const;

type CatalogRow = {
  genres?: { genero?: { name?: string | null } | null }[] | null;
  gameModes?: { gameMode?: { name?: string | null } | null }[] | null;
  popularity?: number | null;
  rating?: number | null;
  hypes?: number | null;
  tmdbId?: number;
  anilistId?: number;
  igdbId?: number;
};

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

function externalId(tipo: MatchTipo, row: CatalogRow): number {
  if (tipo === 'anime') return row.anilistId ?? 0;
  if (tipo === 'jogo') return row.igdbId ?? 0;
  return row.tmdbId ?? 0;
}

function rawNames(row: CatalogRow, key: 'genres' | 'gameModes', nested: 'genero' | 'gameMode'): string[] {
  const list = key === 'genres' ? row.genres : row.gameModes;
  return (list ?? [])
    .map((item) => {
      const record = item as { genero?: { name?: string | null }; gameMode?: { name?: string | null } };
      return nested === 'genero' ? record.genero?.name : record.gameMode?.name;
    })
    .filter((name): name is string => Boolean(name && name.trim()));
}

function toMatchTitle(tipo: MatchTipo, row: CatalogRow): MatchTitle {
  const popularity = tipo === 'jogo'
    ? Number(row.rating ?? row.hypes ?? 0)
    : Number(row.popularity ?? 0);
  return {
    id: externalId(tipo, row),
    genres: rawNames(row, 'genres', 'genero'),
    modes: tipo === 'jogo' ? rawNames(row, 'gameModes', 'gameMode') : undefined,
    popularity,
  };
}

function displayGenre(tipo: MatchTipo, name: string): string {
  if (tipo === 'anime') return translateAnimeGenre(name);
  if (tipo === 'jogo') return translateGameGenre(name);
  return name;
}

function mapRow(tipo: MatchTipo, row: CatalogRow): Record<string, unknown> {
  if (tipo === 'filme') return mapFilmeToMidia(row);
  if (tipo === 'serie') return mapSerieToMidia(row);
  if (tipo === 'anime') return mapAnimeToMidia(row);
  return mapJogoToMidia(row);
}

function modeFilter(play: GamePlay) {
  const fragments = play === 'multiplayer' ? MULTIPLAYER_NAME_FRAGMENTS : SINGLE_NAME_FRAGMENTS;
  return {
    gameModes: {
      some: {
        gameMode: {
          OR: fragments.map((fragment) => ({
            name: { contains: fragment, mode: 'insensitive' as const },
          })),
        },
      },
    },
  };
}

function targetGenreNames(modo: 'solo' | 'dupla', seeds: MatchTitle[]): string[] {
  if (modo === 'dupla') {
    const other = new Set(seeds[1]?.genres.map((genre) => normalizeMatchLabel(genre)) ?? []);
    const shared = (seeds[0]?.genres ?? []).filter((genre) => other.has(normalizeMatchLabel(genre)));
    return [...new Set(shared)];
  }
  return [...new Set(seeds.flatMap((seed) => seed.genres.map((genre) => genre.trim())).filter(Boolean))];
}

async function loadRows(tipo: MatchTipo, ids: number[]): Promise<CatalogRow[]> {
  if (ids.length === 0) return [];
  if (tipo === 'filme') {
    return prisma.filme.findMany({
      where: { tmdbId: { in: ids } },
      include: { genres: { include: { genero: true } } },
    });
  }
  if (tipo === 'serie') {
    return prisma.serie.findMany({
      where: { tmdbId: { in: ids } },
      include: { genres: { include: { genero: true } } },
    });
  }
  if (tipo === 'anime') {
    return prisma.anime.findMany({
      where: { anilistId: { in: ids } },
      include: { genres: { include: { genero: true } } },
    });
  }
  return prisma.jogo.findMany({
    where: { igdbId: { in: ids } },
    include: {
      genres: { include: { genero: true } },
      gameModes: { include: { gameMode: true } },
    },
  });
}

async function loadCandidates(
  tipo: MatchTipo,
  genreNames: string[],
  excludeIds: number[],
  gamePlay: GamePlay | null,
): Promise<CatalogRow[]> {
  if (genreNames.length === 0) return [];
  const genreSome = { genres: { some: { genero: { name: { in: genreNames } } } } };
  if (tipo === 'filme') {
    return prisma.filme.findMany({
      where: {
        AND: [
          filmeQualityFilter,
          genreSome,
          excludeIds.length ? { tmdbId: { notIn: excludeIds } } : {},
        ],
      },
      orderBy: { popularity: 'desc' },
      take: CANDIDATE_POOL,
      include: { genres: { include: { genero: true } } },
    });
  }
  if (tipo === 'serie') {
    return prisma.serie.findMany({
      where: {
        AND: [
          serieQualityFilter,
          genreSome,
          excludeIds.length ? { tmdbId: { notIn: excludeIds } } : {},
        ],
      },
      orderBy: { popularity: 'desc' },
      take: CANDIDATE_POOL,
      include: { genres: { include: { genero: true } } },
    });
  }
  if (tipo === 'anime') {
    return prisma.anime.findMany({
      where: {
        AND: [
          animeQualityFilter,
          genreSome,
          excludeIds.length ? { anilistId: { notIn: excludeIds } } : {},
        ],
      },
      orderBy: { popularity: 'desc' },
      take: CANDIDATE_POOL,
      include: { genres: { include: { genero: true } } },
    });
  }
  return prisma.jogo.findMany({
    where: {
      AND: [
        jogoQualityFilter,
        genreSome,
        excludeIds.length ? { igdbId: { notIn: excludeIds } } : {},
        gamePlay ? modeFilter(gamePlay) : {},
      ],
    },
    orderBy: [{ rating: 'desc' }, { hypes: 'desc' }],
    take: CANDIDATE_POOL,
    include: {
      genres: { include: { genero: true } },
      gameModes: { include: { gameMode: true } },
    },
  });
}

async function loadBaseIds(userId: number, tipo: MatchTipo): Promise<number[]> {
  const prefs = await prisma.preferencias_usuario_midia.findMany({
    where: {
      usuario_id: userId,
      tipo_midia: tipo,
      NOT: { status: 'oculto' },
      OR: [
        { status: 'favorito' },
        { avaliacao: { in: [...LIKED] } },
      ],
    },
    orderBy: { data_interacao: 'desc' },
    take: BASE_SEED_LIMIT,
    select: { midia_id: true },
  });
  return prefs.map((pref) => pref.midia_id);
}

function emptyPayload(
  input: {
    tipo: MatchTipo;
    modo: 'solo' | 'dupla';
    gamePlay: GamePlay | null;
    origem: 'base' | 'titulos';
  },
  reason: MatchOutcomeReason,
  bloqueadoPeloModo = false,
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
      bloqueadoPeloModo,
    }),
    sementes: [],
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

  let ids = input.ids;
  if (input.useBase) {
    if (!input.userId) return emptyPayload(meta, 'precisa_login');
    ids = await loadBaseIds(input.userId, input.tipo);
    if (ids.length === 0) return emptyPayload(meta, 'sem_base');
  }

  const rows = await loadRows(input.tipo, ids);
  const byId = new Map(rows.map((row) => [externalId(input.tipo, row), row]));
  const ordered = ids.map((id) => byId.get(id)).filter((row): row is CatalogRow => Boolean(row));

  if (!input.useBase && ordered.length !== ids.length) return emptyPayload(meta, 'titulo_ausente');
  if (ordered.length === 0) return emptyPayload(meta, 'sem_base');

  const seeds = ordered.map((row) => toMatchTitle(input.tipo, row));
  const genreNames = targetGenreNames(input.modo, seeds);
  if (genreNames.length === 0) {
    return {
      ...emptyPayload(meta, input.modo === 'dupla' ? 'sem_paralelo' : 'sem_afinidade'),
      sementes: ordered.map((row) => mapRow(input.tipo, row)),
    };
  }
  const candidates = await loadCandidates(input.tipo, genreNames, seeds.map((seed) => seed.id), input.gamePlay);
  const scored = computeMatch({
    modo: input.modo,
    seeds,
    candidates: candidates.map((row) => toMatchTitle(input.tipo, row)),
    gamePlay: input.gamePlay,
    limit: MATCH_RESULT_LIMIT,
  });

  if (scored.reason !== 'ok') {
    return {
      ...emptyPayload(meta, scored.reason, scored.bloqueadoPeloModo),
      sementes: ordered.map((row) => mapRow(input.tipo, row)),
    };
  }

  const candidateById = new Map(candidates.map((row) => [externalId(input.tipo, row), row]));
  const itens = scored.items.flatMap((item) => {
    const row = candidateById.get(item.id);
    if (!row) return [];
    return [{
      ...mapRow(input.tipo, row),
      generos_em_comum: item.shared.map((name) => displayGenre(input.tipo, name)),
    }];
  });

  return {
    tipo: input.tipo,
    modo: input.modo,
    jogo: input.gamePlay,
    origem,
    reason: itens.length ? 'ok' : 'sem_afinidade',
    message: matchUserMessage({
      reason: itens.length ? 'ok' : 'sem_afinidade',
      tipo: input.tipo,
      gamePlay: input.gamePlay,
      bloqueadoPeloModo: !itens.length && scored.bloqueadoPeloModo,
    }),
    sementes: ordered.map((row) => mapRow(input.tipo, row)),
    itens,
  };
}
