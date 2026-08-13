import { prisma } from './clients';
import {
  fetchTmdbCollection,
  fetchTmdbMovieRecommendations,
  fetchTmdbTvRecommendations,
} from './tmdbCollections';
import {
  CINEMATIC_UNIVERSES,
  buildKeywordOrFilter,
  getUniverseById,
  matchesUniversePatterns,
  type CinematicUniverseConfig,
} from './cinematicUniverses';

export type ContinuacaoRelacao =
  | 'precuela'
  | 'sequencia'
  | 'mesma_saga'
  | 'spin_off'
  | 'recomendado';

export type ContinuacaoItem = {
  tipo: 'filme' | 'serie';
  tmdbId: number;
  titulo: string;
  posterUrl: string | null;
  releaseDate: string | null;
  relacao: ContinuacaoRelacao;
  ordem: number;
  noOrbe: boolean;
};

export type SagaSummary = {
  id: number;
  nome: string;
  posterUrl: string | null;
  totalFilmes: number;
  preview: ContinuacaoItem[];
};

export type UniversoSummary = {
  id: string;
  nome: string;
  descricao: string;
  posterUrl: string | null;
  totalFilmes: number;
  totalSeries: number;
  totalTitulos: number;
  preview: ContinuacaoItem[];
  primeiraData: string | null;
  ultimaData: string | null;
};

export type UniversoPayload = {
  universo: {
    id: string;
    nome: string;
    descricao: string;
    posterUrl: string | null;
  };
  itens: ContinuacaoItem[];
};

export type ContinuacoesPayload = {
  saga: { id: number; nome: string; posterUrl: string | null; overview: string | null } | null;
  itens: ContinuacaoItem[];
  filmeAtualTmdbId?: number;
  serieAtualTmdbId?: number;
};

const posterUrl = (path: string | null | undefined) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;

const formatReleaseDate = (date: Date | string | null | undefined): string | null => {
  if (!date) return null;
  if (date instanceof Date) return date.toISOString().split('T')[0];
  return String(date).split('T')[0];
};

const releaseTimestamp = (value: string | null | undefined): number => {
  if (!value) return Number.POSITIVE_INFINITY;
  const ts = new Date(value).getTime();
  return Number.isNaN(ts) ? Number.POSITIVE_INFINITY : ts;
};

/** Ordena filmes e séries pela data de lançamento/estreia (cronológica). */
export function sortContinuacaoItemsChronologically(items: ContinuacaoItem[]): ContinuacaoItem[] {
  return [...items]
    .sort((a, b) => {
      const diff = releaseTimestamp(a.releaseDate) - releaseTimestamp(b.releaseDate);
      if (diff !== 0) return diff;
      return a.titulo.localeCompare(b.titulo, 'pt-BR');
    })
    .map((item, index) => ({ ...item, ordem: index + 1 }));
}

async function collectUniversoItens(universe: CinematicUniverseConfig): Promise<ContinuacaoItem[]> {
  const byKey = new Map<string, ContinuacaoItem>();

  const addItem = (item: {
    tipo: 'filme' | 'serie';
    tmdbId: number;
    titulo: string;
    posterUrl: string | null;
    releaseDate: string | null;
  }) => {
    const key = `${item.tipo}:${item.tmdbId}`;
    if (byKey.has(key)) return;
    byKey.set(key, {
      ...item,
      relacao: 'mesma_saga',
      ordem: 0,
      noOrbe: false,
    });
  };

  const collections = await prisma.collection.findMany({
    include: {
      filmes: {
        select: {
          tmdbId: true,
          title: true,
          originalTitle: true,
          posterPath: true,
          releaseDate: true,
        },
      },
    },
  });

  for (const collection of collections) {
    if (!matchesUniversePatterns(collection.name, universe.collectionPatterns)) continue;
    for (const filme of collection.filmes) {
      addItem({
        tipo: 'filme',
        tmdbId: filme.tmdbId,
        titulo: filme.title,
        posterUrl: posterUrl(filme.posterPath),
        releaseDate: formatReleaseDate(filme.releaseDate),
      });
    }
  }

  const filmeKeywordFilter = buildKeywordOrFilter(universe.searchKeywords, ['title', 'originalTitle']);
  if (filmeKeywordFilter) {
    const filmes = await prisma.filme.findMany({
      where: filmeKeywordFilter,
      select: {
        tmdbId: true,
        title: true,
        originalTitle: true,
        posterPath: true,
        releaseDate: true,
      },
    });
    for (const filme of filmes) {
      const matches =
        matchesUniversePatterns(filme.title, universe.titlePatterns) ||
        matchesUniversePatterns(filme.originalTitle, universe.titlePatterns);
      if (!matches) continue;
      addItem({
        tipo: 'filme',
        tmdbId: filme.tmdbId,
        titulo: filme.title,
        posterUrl: posterUrl(filme.posterPath),
        releaseDate: formatReleaseDate(filme.releaseDate),
      });
    }
  }

  const serieKeywordFilter = buildKeywordOrFilter(universe.searchKeywords, ['name', 'originalName']);
  if (serieKeywordFilter) {
    const series = await prisma.serie.findMany({
      where: serieKeywordFilter,
      select: {
        tmdbId: true,
        name: true,
        originalName: true,
        posterPath: true,
        firstAirDate: true,
      },
    });
    for (const serie of series) {
      const matches =
        matchesUniversePatterns(serie.name, universe.titlePatterns) ||
        matchesUniversePatterns(serie.originalName, universe.titlePatterns);
      if (!matches) continue;
      addItem({
        tipo: 'serie',
        tmdbId: serie.tmdbId,
        titulo: serie.name,
        posterUrl: posterUrl(serie.posterPath),
        releaseDate: formatReleaseDate(serie.firstAirDate),
      });
    }
  }

  const sorted = sortContinuacaoItemsChronologically([...byKey.values()]);
  const filmeIds = sorted.filter((item) => item.tipo === 'filme').map((item) => item.tmdbId);
  const serieIds = sorted.filter((item) => item.tipo === 'serie').map((item) => item.tmdbId);
  const [filmesInDb, seriesInDb] = await Promise.all([filmesNoOrbe(filmeIds), seriesNoOrbe(serieIds)]);

  return sorted.map((item) => ({
    ...item,
    noOrbe: item.tipo === 'filme' ? filmesInDb.has(item.tmdbId) : seriesInDb.has(item.tmdbId),
  }));
}

export async function listUniversos(): Promise<UniversoSummary[]> {
  const summaries: UniversoSummary[] = [];

  for (const universe of CINEMATIC_UNIVERSES) {
    const itens = await collectUniversoItens(universe);
    if (itens.length < 2) continue;

    summaries.push({
      id: universe.id,
      nome: universe.nome,
      descricao: universe.descricao,
      posterUrl: itens.find((item) => item.posterUrl)?.posterUrl ?? null,
      totalFilmes: itens.filter((item) => item.tipo === 'filme').length,
      totalSeries: itens.filter((item) => item.tipo === 'serie').length,
      totalTitulos: itens.length,
      preview: itens.slice(0, 6),
      primeiraData: itens[0]?.releaseDate ?? null,
      ultimaData: itens[itens.length - 1]?.releaseDate ?? null,
    });
  }

  return summaries;
}

export async function getUniversoById(id: string): Promise<UniversoPayload | null> {
  const universe = getUniverseById(id);
  if (!universe) return null;

  const itens = await collectUniversoItens(universe);
  if (itens.length === 0) return null;

  return {
    universo: {
      id: universe.id,
      nome: universe.nome,
      descricao: universe.descricao,
      posterUrl: itens.find((item) => item.posterUrl)?.posterUrl ?? null,
    },
    itens,
  };
}

export function relacaoPorData(
  atual: Date | null,
  outro: Date | null,
  naMesmaSaga: boolean,
): ContinuacaoRelacao {
  if (naMesmaSaga) {
    if (!atual || !outro) return 'mesma_saga';
    return outro.getTime() < atual.getTime() ? 'precuela' : 'sequencia';
  }
  return 'recomendado';
}

async function filmesNoOrbe(tmdbIds: number[]): Promise<Set<number>> {
  if (tmdbIds.length === 0) return new Set();
  const rows = await prisma.filme.findMany({
    where: { tmdbId: { in: tmdbIds } },
    select: { tmdbId: true },
  });
  return new Set(rows.map((r) => r.tmdbId));
}

async function seriesNoOrbe(tmdbIds: number[]): Promise<Set<number>> {
  if (tmdbIds.length === 0) return new Set();
  const rows = await prisma.serie.findMany({
    where: { tmdbId: { in: tmdbIds } },
    select: { tmdbId: true },
  });
  return new Set(rows.map((r) => r.tmdbId));
}

export async function listSagas(limit = 60): Promise<SagaSummary[]> {
  const collections = await prisma.collection.findMany({
    include: {
      filmes: {
        select: {
          tmdbId: true,
          title: true,
          posterPath: true,
          releaseDate: true,
        },
        orderBy: { releaseDate: 'asc' },
      },
    },
    orderBy: { name: 'asc' },
  });

  const sagas: SagaSummary[] = [];

  for (const collection of collections) {
    const totalFilmes = collection.filmes.length;
    if (totalFilmes < 2) continue;

    const previewSource = collection.filmes.map((f) => ({
      tmdbId: f.tmdbId,
      title: f.title,
      posterPath: f.posterPath,
      releaseDate: f.releaseDate,
    }));

    const previewIds = previewSource.map((f) => f.tmdbId);
    const inDb = await filmesNoOrbe(previewIds);

    sagas.push({
      id: collection.id,
      nome: collection.name,
      posterUrl: posterUrl(collection.posterPath ?? previewSource[0]?.posterPath),
      totalFilmes,
      preview: previewSource.slice(0, 4).map((f, index) => ({
        tipo: 'filme' as const,
        tmdbId: f.tmdbId,
        titulo: f.title,
        posterUrl: posterUrl(f.posterPath),
        releaseDate: f.releaseDate?.toISOString?.() ?? (f.releaseDate as string | null) ?? null,
        relacao: 'mesma_saga' as const,
        ordem: index + 1,
        noOrbe: inDb.has(f.tmdbId),
      })),
    });

    if (sagas.length >= limit) break;
  }

  return sagas;
}

export async function getSagaById(collectionId: number): Promise<ContinuacoesPayload | null> {
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
    include: {
      filmes: {
        orderBy: { releaseDate: 'asc' },
      },
    },
  });

  const tmdb = await fetchTmdbCollection(collectionId);
  const nome = collection?.name ?? tmdb?.name ?? 'Saga';
  const overview = tmdb?.overview ?? null;
  const poster = collection?.posterPath ?? tmdb?.poster_path ?? null;

  const partsMap = new Map<number, { title: string; poster: string | null; release: string | null; ordem: number }>();

  if (tmdb?.parts.length) {
    tmdb.parts
      .sort((a, b) => (a.release_date ?? '').localeCompare(b.release_date ?? ''))
      .forEach((part, index) => {
        partsMap.set(part.id, {
          title: part.title,
          poster: part.poster_path,
          release: part.release_date,
          ordem: index + 1,
        });
      });
  }

  for (const filme of collection?.filmes ?? []) {
    if (!partsMap.has(filme.tmdbId)) {
      partsMap.set(filme.tmdbId, {
        title: filme.title,
        poster: filme.posterPath,
        release: filme.releaseDate?.toISOString().split('T')[0] ?? null,
        ordem: partsMap.size + 1,
      });
    }
  }

  if (partsMap.size < 2) return null;

  const tmdbIds = [...partsMap.keys()];
  const inDb = await filmesNoOrbe(tmdbIds);

  const itens: ContinuacaoItem[] = sortContinuacaoItemsChronologically(
    [...partsMap.entries()].map(([id, meta]) => ({
      tipo: 'filme' as const,
      tmdbId: id,
      titulo: meta.title,
      posterUrl: posterUrl(meta.poster),
      releaseDate: meta.release,
      relacao: 'mesma_saga' as const,
      ordem: meta.ordem,
      noOrbe: inDb.has(id),
    })),
  );

  return {
    saga: { id: collectionId, nome, posterUrl: posterUrl(poster), overview },
    itens,
  };
}

export async function getContinuacoesFilme(tmdbId: number): Promise<ContinuacoesPayload> {
  const filme = await prisma.filme.findUnique({
    where: { tmdbId },
    include: { collection: true },
  });

  const atualDate = filme?.releaseDate ?? null;
  const collectionId = filme?.collectionId ?? filme?.collection?.id ?? null;

  if (collectionId) {
    const saga = await getSagaById(collectionId);
    if (saga) {
      const itens = saga.itens
        .filter((item) => item.tmdbId !== tmdbId)
        .map((item) => ({
          ...item,
          relacao: relacaoPorData(
            atualDate,
            item.releaseDate ? new Date(item.releaseDate) : null,
            true,
          ),
        }));
      return { ...saga, itens, filmeAtualTmdbId: tmdbId };
    }
  }

  const belongs = filme?.collection
    ? { id: filme.collection.id, nome: filme.collection.name, posterUrl: posterUrl(filme.collection.posterPath), overview: null as string | null }
    : null;

  const recomendacoes = await fetchTmdbMovieRecommendations(tmdbId, 8);
  const inDb = await filmesNoOrbe(recomendacoes.map((r) => r.id));

  const itens: ContinuacaoItem[] = recomendacoes.map((rec, index) => ({
    tipo: 'filme',
    tmdbId: rec.id,
    titulo: rec.title,
    posterUrl: posterUrl(rec.poster_path),
    releaseDate: rec.release_date ?? null,
    relacao: 'recomendado',
    ordem: index + 1,
    noOrbe: inDb.has(rec.id),
  }));

  return {
    saga: belongs,
    itens,
    filmeAtualTmdbId: tmdbId,
  };
}

export async function getContinuacoesSerie(tmdbId: number): Promise<ContinuacoesPayload> {
  const serie = await prisma.serie.findUnique({ where: { tmdbId } });
  const atualDate = serie?.firstAirDate ?? null;

  const recomendacoes = await fetchTmdbTvRecommendations(tmdbId, 10);
  const serieIds = recomendacoes.map((r) => r.id);
  const inDbSeries = await seriesNoOrbe(serieIds);

  const itens: ContinuacaoItem[] = recomendacoes.map((rec, index) => ({
    tipo: 'serie',
    tmdbId: rec.id,
    titulo: rec.name,
    posterUrl: posterUrl(rec.poster_path),
    releaseDate: rec.first_air_date ?? null,
    relacao: relacaoPorData(atualDate, rec.first_air_date ? new Date(rec.first_air_date) : null, false),
    ordem: index + 1,
    noOrbe: inDbSeries.has(rec.id),
  }));

  return {
    saga: null,
    itens,
    serieAtualTmdbId: tmdbId,
  };
}
