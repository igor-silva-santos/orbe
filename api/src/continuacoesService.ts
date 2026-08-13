import { prisma } from './clients';
import {
  fetchTmdbCollection,
  fetchTmdbMovieRecommendations,
  fetchTmdbTvRecommendations,
} from './tmdbCollections';

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

export type ContinuacoesPayload = {
  saga: { id: number; nome: string; posterUrl: string | null; overview: string | null } | null;
  itens: ContinuacaoItem[];
  filmeAtualTmdbId?: number;
  serieAtualTmdbId?: number;
};

const posterUrl = (path: string | null | undefined) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;

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

  const itens: ContinuacaoItem[] = [...partsMap.entries()]
    .sort((a, b) => (a[1].ordem) - (b[1].ordem))
    .map(([id, meta]) => ({
      tipo: 'filme' as const,
      tmdbId: id,
      titulo: meta.title,
      posterUrl: posterUrl(meta.poster),
      releaseDate: meta.release,
      relacao: 'mesma_saga' as const,
      ordem: meta.ordem,
      noOrbe: inDb.has(id),
    }));

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
