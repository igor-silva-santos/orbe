import './loadEnv';

import { logger } from './logger';
import { tmdb, tmdbApi } from './clients';
import { Cast, Crew } from 'moviedb-promise';
import { PrismaClient } from '@prisma/client';
import { prisma } from './clients';
import { broadcast } from './websocket';
import { isMovieRelevantForSync, hasPortugueseLocalization, isConcertOrLiveRecording } from './qualityFilters';
import { isLikelyEnglish, translateSynopsisForStorage } from './translation';
import { detectMovieBrLocalization, getBrOverviewFromTranslations, type TmdbTranslationEntry } from './tmdbBrLocalization';
import { isOpenPeriod } from './syncDateHelpers';
import { resolveTmdbRelease, isYearWithinRange } from './yearOnlyRelease';
import type { SyncContentOptions } from './syncOptions';
import { resolveSyncContentOptions } from './syncOptions';
import { getSyncRunProgress } from './syncProgress';
import { addSkipReasons, updateSyncProgress } from './syncState';
import { dedupeBy, resolveTmdbGeneroIds } from './syncUtils';
import { buildStreamingProvidersCreate, parseFilmeTmdbDisponibilidade, refreshFilmesWithIncompleteAvailability } from './filmeAvailability';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** Teto real da TMDB para /discover e listas paginadas — page > 500 retorna erro na API. */
const TMDB_MAX_PAGE = 500;

/** 401/403 (chave inválida/sem permissão) não deve virar "lista vazia" silenciosa — precisa falhar o sync. */
function isAuthError(error: any): boolean {
  const status = error?.response?.status;
  return status === 401 || status === 403;
}

type MovieSourceFlags = {
  emCartaz?: boolean;
  emBreve?: boolean;
};

async function tmdbApiWithRetry<T>(fn: () => Promise<T>, maxApiRetries = 5, maxNetworkRetries = Infinity, initialDelay = 1000): Promise<T> {
    let apiAttempt = 0;
    let networkAttempt = 0;
    while (true) {
        try {
            return await fn();
        } catch (error: any) {
            const isNetworkError = error.code === 'ENOTFOUND' || error.code === 'ECONNRESET';
            const isRateLimitError = error.response && error.response.status === 429;

            if (isNetworkError) {
                networkAttempt++;
                if (networkAttempt > maxNetworkRetries) {
                    logger.error(`❌ Erro de rede persistente após ${maxNetworkRetries} tentativas. Abortando.`);
                    throw error;
                }
                const delayTime = initialDelay * Math.pow(2, networkAttempt);
                logger.warn(`⚠️ Erro de rede (Tentativa ${networkAttempt}). Tentando novamente em ${delayTime}ms...`);
                await delay(delayTime);
                continue;
            } else if (isRateLimitError) {
                apiAttempt++;
                if (apiAttempt > maxApiRetries) {
                    logger.error(`❌ Limite de requisições excedido após ${maxApiRetries} tentativas. Abortando.`);
                    throw error;
                }
                const delayTime = initialDelay * Math.pow(2, apiAttempt);
                logger.warn(`⏳ Limite de requisições (Tentativa ${apiAttempt}). Tentando novamente em ${delayTime}ms...`);
                await delay(delayTime);
                continue;
            } else {
                throw error;
            }
        }
    }
}

async function fetchIdsFromDiscover(
  params: Record<string, unknown>,
  maxPages = 10,
): Promise<number[]> {
  const movieIds = new Set<number>();
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const response = await tmdbApiWithRetry(() =>
        tmdbApi.get('/discover/movie', {
          params: { ...params, page, region: 'BR', include_adult: false },
        }),
      );

      if (response.data.results) {
        for (const movie of response.data.results) {
          if (movie.id && !movie.adult) {
            movieIds.add(movie.id);
          }
        }
      }

      totalPages = response.data.total_pages || 1;
      if (totalPages > TMDB_MAX_PAGE) totalPages = TMDB_MAX_PAGE;
      page++;
      await delay(250);
    } while (page <= totalPages && page <= maxPages);

    return Array.from(movieIds);
  } catch (error) {
    if (isAuthError(error)) {
      logger.error(`❌ Erro de autenticação TMDB no discover — abortando sync (chave de API inválida/sem permissão): ${error}`);
      throw error;
    }
    logger.error(`Erro ao buscar IDs no discover TMDB (retornando ${movieIds.size} IDs parciais já coletados): ${error}`);
    return Array.from(movieIds);
  }
}

async function fetchIdsFromTmdbList(
  endpoint: string,
  params: Record<string, unknown> = {},
  maxPages = 10,
): Promise<number[]> {
  const movieIds = new Set<number>();
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const response = await tmdbApiWithRetry(() =>
        tmdbApi.get(endpoint, {
          params: { ...params, page, region: 'BR' },
        }),
      );

      if (response.data.results) {
        for (const movie of response.data.results) {
          if (movie.id && !movie.adult) {
            movieIds.add(movie.id);
          }
        }
      }

      totalPages = response.data.total_pages || 1;
      if (totalPages > TMDB_MAX_PAGE) totalPages = TMDB_MAX_PAGE;
      page++;
      await delay(250);
    } while (page <= totalPages && page <= maxPages);

    return Array.from(movieIds);
  } catch (error) {
    if (isAuthError(error)) {
      logger.error(`❌ Erro de autenticação TMDB em ${endpoint} — abortando sync (chave de API inválida/sem permissão): ${error}`);
      throw error;
    }
    logger.error(`Erro ao buscar IDs de ${endpoint} (retornando ${movieIds.size} IDs parciais já coletados): ${error}`);
    return Array.from(movieIds);
  }
}

type CuratedFetchOptions = {
  /** Quando true, busca só now_playing/upcoming (cinema). Evita popular/top_rated em sync por ano. */
  cinemaOnly?: boolean;
};

/** Listas curadas TMDB — prioridade sobre discover amplo */
async function fetchCuratedMovieIds(options: CuratedFetchOptions = {}): Promise<Map<number, MovieSourceFlags>> {
  const { cinemaOnly = false } = options;
  const listLabel = cinemaOnly
    ? 'now_playing, upcoming'
    : 'now_playing, upcoming, popular, top_rated, discover';
  logger.info(`Buscando filmes de listas curadas TMDB (${listLabel})...`);
  const flags = new Map<number, MovieSourceFlags>();

  const markIds = (ids: number[], patch: MovieSourceFlags) => {
    for (const id of ids) {
      const existing = flags.get(id) ?? {};
      flags.set(id, { ...existing, ...patch });
    }
  };

  const nowPlaying = await fetchIdsFromTmdbList('/movie/now_playing', {}, 10);
  markIds(nowPlaying, { emCartaz: true });
  logger.info(`  now_playing: ${nowPlaying.length} filmes`);

  const upcoming = await fetchIdsFromTmdbList('/movie/upcoming', {}, 10);
  markIds(upcoming, { emBreve: true });
  logger.info(`  upcoming: ${upcoming.length} filmes`);

  if (!cinemaOnly) {
    const popular = await fetchIdsFromTmdbList('/movie/popular', {}, 15);
    markIds(popular, {});
    logger.info(`  popular: ${popular.length} filmes`);

    const topRated = await fetchIdsFromTmdbList('/discover/movie', {
      sort_by: 'vote_average.desc',
      'vote_count.gte': 500,
      'vote_average.gte': 7,
      with_release_type: '2|3',
    }, 10);
    markIds(topRated, {});
    logger.info(`  top_rated (vote_count>=500): ${topRated.length} filmes`);

    const theatrical = await fetchIdsFromTmdbList('/discover/movie', {
      sort_by: 'popularity.desc',
      'vote_count.gte': 50,
      with_release_type: '2|3',
    }, 20);
    markIds(theatrical, {});
    logger.info(`  discover theatrical (vote_count>=50): ${theatrical.length} filmes`);
  } else {
    logger.info('  popular/top_rated/discover ignorados (sync focado em período).');
  }

  logger.info(`Total de ${flags.size} IDs únicos de listas curadas.`);
  return flags;
}

function isReleaseWithinPeriod(releaseDate: Date, periodStart: Date, periodEnd: Date): boolean {
  return releaseDate >= periodStart && releaseDate <= periodEnd;
}

function shouldUseCinemaOnlyCurated(periodStart: Date, periodEnd: Date): boolean {
  const msPerDay = 24 * 60 * 60 * 1000;
  const spanDays = (periodEnd.getTime() - periodStart.getTime()) / msPerDay;
  // Períodos curtos (ex.: sync:2026) não devem puxar popular/top_rated de todos os tempos
  return spanDays <= 366;
}

function assertValidSyncDates(startDate: string, endDate: string): { start: Date; end: Date } {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error(`Datas de sync inválidas: startDate=${startDate}, endDate=${endDate}`);
  }
  if (start > end) {
    throw new Error(`Período de sync inválido: ${startDate} é posterior a ${endDate}`);
  }
  return { start, end };
}

async function fetchMovieIdsForPeriod(startDate: string, endDate: string): Promise<number[]> {
  const openPeriod = isOpenPeriod(endDate);
  logger.info(
    `Buscando IDs de filmes com estreia BR entre ${startDate} e ${endDate}` +
    (openPeriod ? ' (período aberto — múltiplas estratégias de discover)' : '') +
    '...',
  );
  const movieIds = new Set<number>();

  const brDateBase: Record<string, unknown> = {
    region: 'BR',
    'release_date.gte': startDate,
    'release_date.lte': endDate,
    with_release_type: '2|3',
    without_genres: '104',
  };

  const discoverPasses = openPeriod
    ? [
        { label: 'estreia BR ascendente', params: { ...brDateBase, sort_by: 'release_date.asc' }, pages: 40 },
        { label: 'estreia BR descendente', params: { ...brDateBase, sort_by: 'release_date.desc' }, pages: 25 },
        { label: 'popularidade BR', params: { ...brDateBase, sort_by: 'popularity.desc' }, pages: 25 },
        {
          label: 'estreia primária ascendente',
          params: {
            region: 'BR',
            'primary_release_date.gte': startDate,
            'primary_release_date.lte': endDate,
            sort_by: 'primary_release_date.asc',
            with_release_type: '2|3',
            without_genres: '104',
          },
          pages: 25,
        },
      ]
    : [
        {
          label: 'popularidade BR (cinema)',
          params: {
            ...brDateBase,
            sort_by: 'popularity.desc',
            with_release_type: '2|3',
            'vote_count.gte': 50,
          },
          pages: 25,
        },
        {
          label: 'estreia BR recente',
          params: {
            ...brDateBase,
            sort_by: 'release_date.desc',
            with_release_type: '2|3',
            'vote_count.gte': 20,
          },
          pages: 15,
        },
      ];

  for (const pass of discoverPasses) {
    const ids = await fetchIdsFromDiscover(pass.params, pass.pages);
    logger.info(`  discover ${pass.label}: +${ids.length} IDs (${movieIds.size} acumulados antes)`);
    for (const id of ids) {
      movieIds.add(id);
    }
  }

  if (openPeriod) {
    logger.info('Complementando período aberto com /movie/upcoming...');
    const upcomingIds = await fetchIdsFromTmdbList('/movie/upcoming', {}, 20);
    for (const id of upcomingIds) {
      movieIds.add(id);
    }
    logger.info(`  upcoming: total acumulado ${movieIds.size} IDs`);
  }

  logger.info(`Total de ${movieIds.size} IDs de filmes encontrados para o período.`);
  return Array.from(movieIds);
}

async function processMovieBatch(
  movieIds: number[],
  prisma: PrismaClient,
  sourceFlags: Map<number, MovieSourceFlags> = new Map(),
  period?: { start: Date; end: Date },
  includeUndated = false,
): Promise<{ successCount: number, errorCount: number, skippedCount: number, skipReasons: Record<string, number> }> {
  let successCount = 0, errorCount = 0, skippedCount = 0;
  const skipReasons: Record<string, number> = {};
  const bumpSkip = (reason: string) => {
    skippedCount++;
    skipReasons[reason] = (skipReasons[reason] ?? 0) + 1;
  };

  for (const id of movieIds) {
    try {
      const movieDetails = await tmdbApiWithRetry(() => tmdb.movieInfo({
        id,
        language: 'pt-BR',
        append_to_response: 'credits,videos,watch/providers,release_dates,translations',
      })) as any;

      const brReleases = movieDetails.release_dates?.results?.find((r: any) => r.iso_3166_1 === 'BR');
      let releaseDate: Date | null = null;
      let releaseYear: number | null = null;
      let relevantRelease: any = undefined;

      if (brReleases && brReleases.release_dates.length > 0) {
        relevantRelease = brReleases.release_dates.find((rd: any) => rd.type === 3);
        if (!relevantRelease) relevantRelease = brReleases.release_dates.find((rd: any) => rd.type === 2);
        if (!relevantRelease) relevantRelease = brReleases.release_dates.find((rd: any) => rd.type === 4);
        if (!relevantRelease) relevantRelease = brReleases.release_dates[0];
        if (relevantRelease?.release_date) {
          releaseDate = new Date(relevantRelease.release_date);
        }
      }

      if ((!releaseDate || Number.isNaN(releaseDate.getTime())) && movieDetails.release_date) {
        releaseDate = new Date(movieDetails.release_date);
      }

      if (!releaseDate || Number.isNaN(releaseDate.getTime())) {
        const tmdbResolved = resolveTmdbRelease(movieDetails.release_date, movieDetails.status);
        if (tmdbResolved.isYearOnly && tmdbResolved.releaseYear) {
          if (!includeUndated) {
            bumpSkip('no_release_date');
            continue;
          }
          if (period && !isYearWithinRange(tmdbResolved.releaseYear, period.start, period.end)) {
            bumpSkip('out_of_period');
            continue;
          }
          releaseDate = null;
          releaseYear = tmdbResolved.releaseYear;
        } else {
          bumpSkip('no_release_date');
          continue;
        }
      } else {
        releaseYear = releaseDate.getFullYear();
      }

      const flags = sourceFlags.get(id) ?? {};
      const disponibilidade = parseFilmeTmdbDisponibilidade(movieDetails);
      const periodOpen = period ? isOpenPeriod(period.end.toISOString().split('T')[0]) : false;
      const isCinemaCurated =
        periodOpen && (flags.emCartaz || flags.emBreve) && disponibilidade.estreiaCinema;

      if (isConcertOrLiveRecording(movieDetails)) {
        bumpSkip('concert_or_live');
        logger.info(`⏭️ Filme [${id}] "${movieDetails.title}" ignorado: show/concerto ao vivo (não é filme).`);
        continue;
      }

      if (
        period &&
        releaseDate &&
        !isCinemaCurated &&
        !isReleaseWithinPeriod(releaseDate, period.start, period.end)
      ) {
        bumpSkip('out_of_period');
        logger.info(
          `⏭️ Filme [${id}] "${movieDetails.title}" ignorado: lançamento ` +
          `${releaseDate.toISOString().split('T')[0]} fora do período ` +
          `${period.start.toISOString().split('T')[0]}–${period.end.toISOString().split('T')[0]}.`
        );
        continue;
      }

      if (!isCinemaCurated && !isMovieRelevantForSync(movieDetails)) {
        bumpSkip('quality_filter');
        logger.info(
          `⏭️ Filme [${id}] "${movieDetails.title}" ignorado: critérios de sync ` +
          `(votes=${movieDetails.vote_count ?? 0}, pop=${(movieDetails.popularity ?? 0).toFixed(1)}, ` +
          `avg=${movieDetails.vote_average ?? 0}, poster=${!!movieDetails.poster_path}, ` +
          `pt=${hasPortugueseLocalization(movieDetails) ? 'sim' : 'não'}, ` +
          `estreia=${releaseDate ? releaseDate.toISOString().split('T')[0] : `ano ${releaseYear}`}).`
        );
        continue;
      }

      const translations = (movieDetails.translations?.translations ?? []) as TmdbTranslationEntry[];
      const localizacaoPtBr = detectMovieBrLocalization(movieDetails, translations);
      const brOverview = getBrOverviewFromTranslations(translations);

      const scalarData = {
        tmdbId: movieDetails.id,
        title: movieDetails.title!,
        originalTitle: movieDetails.original_title,
        overview: isLikelyEnglish(movieDetails.overview)
          ? (brOverview
            ?? (await translateSynopsisForStorage(movieDetails.overview, {
              tmdbId: movieDetails.id,
              mediaType: 'movie',
            })) ?? movieDetails.overview)
          : movieDetails.overview,
        releaseDate: releaseDate,
        releaseYear: releaseYear,
        runtime: movieDetails.runtime,
        budget: BigInt(movieDetails.budget || 0),
        revenue: BigInt(movieDetails.revenue || 0),
        popularity: movieDetails.popularity,
        voteAverage: movieDetails.vote_average,
        voteCount: movieDetails.vote_count,
        status: movieDetails.status,
        tagline: movieDetails.tagline,
        homepage: movieDetails.homepage,
        posterPath: movieDetails.poster_path,
        backdropPath: movieDetails.backdrop_path,
        imdbId: movieDetails.imdb_id,
        adult: movieDetails.adult ?? false,
        emCartaz: (flags.emCartaz ?? false) && disponibilidade.estreiaCinema,
        emBreve: (flags.emBreve ?? false) && disponibilidade.estreiaCinema,
        estreia_cinema: disponibilidade.estreiaCinema,
        estreia_streaming: disponibilidade.estreiaStreaming,
        releaseType: disponibilidade.releaseType,
        localizacaoPtBr,
        collection: movieDetails.belongs_to_collection ? {
          connectOrCreate: {
            where: { id: movieDetails.belongs_to_collection.id },
            create: {
              id: movieDetails.belongs_to_collection.id,
              name: movieDetails.belongs_to_collection.name,
              posterPath: movieDetails.belongs_to_collection.poster_path,
              backdropPath: movieDetails.belongs_to_collection.backdrop_path,
            }
          }
        } : undefined
      };

      const generoIds = await resolveTmdbGeneroIds(prisma.genero, movieDetails.genres);
      const genreCreates = generoIds.map((generoId) => ({ genero: { connect: { id: generoId } } }));

      const relationalData = {
        genres: {
          create: genreCreates,
        },
        companies: {
          create: dedupeBy(movieDetails.production_companies, (company: any) => company.id).map((company: any) => ({ company: { connectOrCreate: { where: { tmdbId: company.id }, create: { tmdbId: company.id, name: company.name } } } }))
        },
        countries: {
            create: dedupeBy(movieDetails.production_countries, (country: any) => country.iso_3166_1).map((country: any) => ({ country: { connectOrCreate: { where: { iso: country.iso_3166_1 }, create: { iso: country.iso_3166_1, name: country.name } } } }))
        },
        languages: {
            create: dedupeBy(movieDetails.spoken_languages, (lang: any) => lang.iso_639_1).map((lang: any) => ({ language: { connectOrCreate: { where: { iso: lang.iso_639_1 }, create: { iso: lang.iso_639_1, name: lang.english_name } } } }))
        },
        cast: {
          create: dedupeBy(movieDetails.credits?.cast?.slice(0, 20), (person: any) => `${person.id}-${person.order}`).map((person: Cast) => ({ character: person.character, order: person.order, pessoa: { connectOrCreate: { where: { tmdbId: person.id }, create: { tmdbId: person.id, name: person.name, profilePath: person.profile_path } } } })) as any
        },
        crew: {
          create: dedupeBy(movieDetails.credits?.crew?.filter((p: Crew) => ['Director', 'Screenplay', 'Writer'].includes(p.job || '')), (person: any) => `${person.id}-${person.job}`).map((person: Crew) => ({ job: person.job, department: person.department, pessoa: { connectOrCreate: { where: { tmdbId: person.id }, create: { tmdbId: person.id, name: person.name, profilePath: person.profile_path } } } })) as any
        },
        videos: {
            create: dedupeBy(movieDetails.videos?.results?.filter((v: any) => v.site === 'YouTube'), (video: any) => video.id).map((video: any) => ({ tmdbId: video.id, key: video.key, name: video.name, site: video.site, type: video.type, official: video.official }))
        },
        streamingProviders: {
            create: buildStreamingProvidersCreate(movieDetails),
        }
      };

      const existingFilme = await prisma.filme.findUnique({ where: { tmdbId: id }, select: { id: true } });

      if (existingFilme) {
        const filmeId = existingFilme.id;
        // Deleta junções antes do update — nested deleteMany+create no Prisma pode
        // recriar FilmeCompany/FilmeGenero antes do delete e estourar unique constraint.
        await prisma.$transaction(async (tx) => {
          await tx.filmeGenero.deleteMany({ where: { filmeId } });
          await tx.filmeCompany.deleteMany({ where: { filmeId } });
          await tx.filmeCountry.deleteMany({ where: { filmeId } });
          await tx.filmeLanguage.deleteMany({ where: { filmeId } });
          await tx.filmeCast.deleteMany({ where: { filmeId } });
          await tx.filmeCrew.deleteMany({ where: { filmeId } });
          await tx.video.deleteMany({ where: { filmeId } });
          await tx.filmeOnStreamingProvider.deleteMany({ where: { filmeId } });

          await tx.filme.update({
            where: { id: filmeId },
            data: scalarData,
          });
        }, { maxWait: 15000, timeout: 120000 });

        await prisma.filme.update({
          where: { id: filmeId },
          data: {
            companies: relationalData.companies,
            countries: relationalData.countries,
            languages: relationalData.languages,
            cast: relationalData.cast,
            crew: relationalData.crew,
            videos: relationalData.videos,
            streamingProviders: relationalData.streamingProviders,
          },
        });

        if (generoIds.length > 0) {
          await prisma.filmeGenero.createMany({
            data: generoIds.map((generoId) => ({ filmeId, generoId })),
            skipDuplicates: true,
          });
        }
      } else {
        await prisma.filme.create({
          data: { ...scalarData, ...relationalData },
        });
      }

      successCount++;
      const flagLabel = flags.emCartaz ? 'em cartaz' : flags.emBreve ? 'em breve' : 'período';
      logger.info(
        `✅ Filme [${id}] "${movieDetails.title}" (${flagLabel}, release type: ${relevantRelease?.type}, pt-BR: ${localizacaoPtBr ? 'sim' : 'não'}) sincronizado.`,
      );

    } catch (error) {
      errorCount++;
      logger.error(`❌ Erro ao processar o filme ID ${id}. Pulando: ${error}`);
    }
  }

  logger.info(`--- Resumo do Lote (Filmes) --- Sucesso: ${successCount}, Erros: ${errorCount}, Pulados: ${skippedCount}`);
  return { successCount, errorCount, skippedCount, skipReasons };
}


export async function syncMovies(
  prisma: PrismaClient,
  startDate: string,
  endDate: string,
  limitOrOptions?: number | SyncContentOptions,
  maybeOptions?: SyncContentOptions,
) {
  const limit = typeof limitOrOptions === 'number' ? limitOrOptions : limitOrOptions?.limit ?? maybeOptions?.limit;
  const { includeUndated } = resolveSyncContentOptions(
    typeof limitOrOptions === 'object' ? limitOrOptions : maybeOptions,
  );
  const { start: periodStart, end: periodEnd } = assertValidSyncDates(startDate, endDate);
  let currentStartDate = new Date(periodStart);
  const finalEndDate = new Date(periodEnd);
  const period = { start: periodStart, end: periodEnd };
  const periodOpen = isOpenPeriod(endDate);
  const cinemaOnlyCurated = periodOpen && shouldUseCinemaOnlyCurated(period.start, period.end);
  const runProgress = getSyncRunProgress();
  const phaseTracker = runProgress?.startPhase('FILMES');

  logger.info(
    `Iniciando sincronização de filmes ` +
    (periodOpen
      ? `(${cinemaOnlyCurated ? 'cinema curado' : 'listas curadas completas'} + período ${startDate} a ${endDate}).`
      : `(período histórico ${startDate} a ${endDate} — somente discover por data, sem listas curadas).`),
  );

  if (limit) {
    logger.warn(`O parâmetro limit (${limit}) será aplicado para cada lote, não para o total.`);
  }

  await updateSyncProgress(prisma, { phase: 'filmes' });

  let curatedIds: number[] = [];
  const curatedFlags = new Map<number, MovieSourceFlags>();

  if (periodOpen) {
    const flags = await fetchCuratedMovieIds({ cinemaOnly: cinemaOnlyCurated });
    for (const [id, patch] of flags) {
      curatedFlags.set(id, patch);
    }
    curatedIds = Array.from(curatedFlags.keys());
    phaseTracker?.setTotal(curatedIds.length);
  } else {
    logger.info('Período histórico — listas curadas (em cartaz/top_rated) ignoradas.');
  }

  if (curatedIds.length > 0) {
    broadcast({ type: 'SYNC_START', mediaType: 'movies', total: curatedIds.length, period: 'cinema (em cartaz / em breve)' });

    if (limit) {
      curatedIds = curatedIds.slice(0, limit);
    }

    const batchSize = 10;
    for (let i = 0; i < curatedIds.length; i += batchSize) {
      const batch = curatedIds.slice(i, i + batchSize);
      logger.info(`Processando lote cinema: ${i + 1}-${Math.min(i + batchSize, curatedIds.length)} de ${curatedIds.length}`);
      const batchResult = await processMovieBatch(batch, prisma, curatedFlags, period, includeUndated);
      await addSkipReasons(prisma, 'filmes', batchResult.skipReasons);
      phaseTracker?.advance(batch.length);
      await updateSyncProgress(prisma, {
        processedInPhase: i + batch.length,
        totalInPhase: curatedIds.length,
      });

      broadcast({
        type: 'SYNC_PROGRESS',
        mediaType: 'movies',
        current: Math.min(i + batchSize, curatedIds.length),
        total: curatedIds.length,
      });
    }
  }

  let monthlyProcessed = 0;

  while (currentStartDate <= finalEndDate) {
    const startStr = currentStartDate.toISOString().split('T')[0];
    const endOfMonth = new Date(currentStartDate.getFullYear(), currentStartDate.getMonth() + 1, 0);
    const endStr = (endOfMonth > finalEndDate ? finalEndDate : endOfMonth).toISOString().split('T')[0];

    let monthlyIds = await fetchMovieIdsForPeriod(startStr, endStr);
    phaseTracker?.addToTotal(monthlyIds.length);

    if (monthlyIds.length > 0) {
        broadcast({ type: 'SYNC_START', mediaType: 'movies', total: monthlyIds.length, period: `${startStr} - ${endStr}` });

        if (limit) {
            monthlyIds = monthlyIds.slice(0, limit);
            logger.info(`Limitando a sincronização deste mês a ${limit} itens.`);
        }

        const batchSize = 10;
        for (let i = 0; i < monthlyIds.length; i += batchSize) {
            const batch = monthlyIds.slice(i, i + batchSize);
            logger.info(`Processando lote do período ${startStr} a ${endStr}: ${i + 1}-${Math.min(i + batchSize, monthlyIds.length)} de ${monthlyIds.length}`);
            const batchResult = await processMovieBatch(batch, prisma, curatedFlags, period, includeUndated);
            await addSkipReasons(prisma, 'filmes', batchResult.skipReasons);
            phaseTracker?.advance(batch.length);
            monthlyProcessed += batch.length;
            const stats = phaseTracker?.getStats();
            await updateSyncProgress(prisma, {
              processedInPhase: stats?.processed ?? monthlyProcessed,
              totalInPhase: stats?.total,
            });

            broadcast({
                type: 'SYNC_PROGRESS',
                mediaType: 'movies',
                current: Math.min(i + batchSize, monthlyIds.length),
                total: monthlyIds.length
            });
        }
    }

    currentStartDate.setMonth(currentStartDate.getMonth() + 1);
    currentStartDate.setDate(1);
  }

  logger.info(`Sincronização de filmes concluída para o período de ${startDate} a ${endDate}.`);

  const refreshResult = await refreshFilmesWithIncompleteAvailability(
    prisma,
    (tmdbId) =>
      tmdbApiWithRetry(() =>
        tmdb.movieInfo({
          id: tmdbId,
          language: 'pt-BR',
          append_to_response: 'watch/providers,release_dates',
        }),
      ),
    { limit: 200 },
  );
  logger.info(
    `Atualização de disponibilidade incompleta: ${refreshResult.updated}/${refreshResult.checked} filmes corrigidos.`,
  );
}

const main = async () => {

  const startDate = process.argv[2];
  const endDate = process.argv[3];
  const limit = process.argv[4] ? parseInt(process.argv[4]) : undefined;

  if (!startDate || !endDate) {
    console.error('Uso: ts-node src/syncMovies.ts <startDate> <endDate> [limit]');
    process.exit(1);
  }

  try {
    await syncMovies(prisma, startDate, endDate, limit);
  } catch (error) {
    logger.error(`Erro fatal na sincronização de filmes: ${error}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

if (require.main === module) {
  main();
}
