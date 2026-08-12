import type { Prisma, PrismaClient } from '@prisma/client';
import { dedupeBy } from './syncUtils';

const THEATRICAL_RELEASE_TYPES = new Set([2, 3]);
const DIGITAL_RELEASE_TYPES = new Set([4]);

export type FilmeTmdbDisponibilidade = {
  estreiaCinema: boolean;
  estreiaStreaming: boolean;
  releaseType: string;
};

export function parseFilmeTmdbDisponibilidade(movieDetails: any): FilmeTmdbDisponibilidade {
  const brReleases = movieDetails.release_dates?.results?.find((r: any) => r.iso_3166_1 === 'BR');
  const brReleaseDates: { type?: number }[] = brReleases?.release_dates ?? [];

  const estreiaCinema = brReleaseDates.some((rd) => THEATRICAL_RELEASE_TYPES.has(rd.type ?? -1));
  const estreiaDigital = brReleaseDates.some((rd) => DIGITAL_RELEASE_TYPES.has(rd.type ?? -1));

  const brProviders = movieDetails['watch/providers']?.results?.BR;
  const temProvedores = Boolean(
    brProviders?.flatrate?.length || brProviders?.rent?.length || brProviders?.buy?.length,
  );

  const estreiaStreaming = temProvedores || estreiaDigital;

  let releaseType = 'unknown';
  if (estreiaCinema && estreiaStreaming) releaseType = 'both';
  else if (estreiaCinema) releaseType = 'theatrical';
  else if (estreiaStreaming) releaseType = 'digital';

  return { estreiaCinema, estreiaStreaming, releaseType };
}

export function buildStreamingProvidersCreate(movieDetails: any): Prisma.FilmeOnStreamingProviderCreateWithoutFilmeInput[] {
  const br = movieDetails['watch/providers']?.results?.BR;
  const providers = [
    ...(br?.flatrate ?? []),
    ...(br?.rent ?? []),
    ...(br?.buy ?? []),
  ];

  return dedupeBy(providers, (provider: any) => provider.provider_id).map((provider: any) => ({
    url: br?.link ?? null,
    provider: {
      connectOrCreate: {
        where: { tmdbId: provider.provider_id },
        create: {
          tmdbId: provider.provider_id,
          name: provider.provider_name,
          logoPath: provider.logo_path,
        },
      },
    },
  }));
}

export async function upsertFilmeStreamingProviders(
  prisma: PrismaClient,
  filmeDbId: number,
  movieDetails: any,
): Promise<number> {
  const create = buildStreamingProvidersCreate(movieDetails);
  await prisma.filme.update({
    where: { id: filmeDbId },
    data: {
      streamingProviders: { deleteMany: {}, create },
    },
  });
  return create.length;
}

export async function refreshFilmeAvailabilityFromTmdb(
  prisma: PrismaClient,
  filme: { id: number; tmdbId: number },
  movieDetails: any,
): Promise<FilmeTmdbDisponibilidade & { providerCount: number }> {
  const disponibilidade = parseFilmeTmdbDisponibilidade(movieDetails);
  const providerCount = await upsertFilmeStreamingProviders(prisma, filme.id, movieDetails);

  await prisma.filme.update({
    where: { id: filme.id },
    data: {
      estreia_cinema: disponibilidade.estreiaCinema,
      estreia_streaming: disponibilidade.estreiaStreaming,
      releaseType: disponibilidade.releaseType,
    },
  });

  return { ...disponibilidade, providerCount };
}

/** Reconsulta watch/providers + release_dates para filmes sem dados completos no banco. */
export async function refreshFilmesWithIncompleteAvailability(
  prisma: PrismaClient,
  tmdbFetch: (tmdbId: number) => Promise<any>,
  options: { limit?: number } = {},
): Promise<{ checked: number; updated: number }> {
  const limit = options.limit ?? 200;
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const twoYearsAhead = new Date();
  twoYearsAhead.setFullYear(twoYearsAhead.getFullYear() + 2);

  const candidates = await prisma.filme.findMany({
    where: {
      releaseDate: { gte: sixMonthsAgo, lte: twoYearsAhead },
      OR: [
        { streamingProviders: { none: {} }, estreia_streaming: false },
        { estreia_cinema: true, emCartaz: true, ingresso_link: null, ingresso_sem_pagina: false },
      ],
      AND: [{ OR: [{ voteCount: { gt: 10 } }, { popularity: { gt: 5 } }] }],
    },
    select: { id: true, tmdbId: true, title: true },
    orderBy: { popularity: 'desc' },
    take: limit,
  });

  let updated = 0;
  for (const filme of candidates) {
    try {
      const movieDetails = await tmdbFetch(filme.tmdbId);
      if (!movieDetails?.id) continue;
      const result = await refreshFilmeAvailabilityFromTmdb(prisma, filme, movieDetails);
      if (result.providerCount > 0 || result.estreiaCinema || result.estreiaStreaming) {
        updated++;
      }
    } catch {
      // ignora falhas pontuais — próximo sync tenta de novo
    }
  }

  return { checked: candidates.length, updated };
}
