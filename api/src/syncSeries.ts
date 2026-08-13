import './loadEnv';

import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import { tmdb, tmdbApi } from './clients';
import { prisma } from './clients';
import { isSerieRelevantForSync } from './qualityFilters';
import { isLikelyEnglish, translateSynopsisForStorage } from './translation';
import { isOpenPeriod } from './syncDateHelpers';
import { getSyncRunProgress } from './syncProgress';
import { addSkipReasons, updateSyncProgress } from './syncState';
import { buildTmdbGenreCreates, dedupeBy } from './syncUtils';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** 401/403 (chave inválida/sem permissão) não deve virar "lista vazia" silenciosa — precisa falhar o sync. */
function isAuthError(error: any): boolean {
  const status = error?.response?.status;
  return status === 401 || status === 403;
}

async function tmdbApiWithRetry<T>(fn: () => Promise<T>, maxRetries = 5, initialDelay = 1000): Promise<T> {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await fn();
        } catch (error: any) {
            const isNetworkError = error.code === 'ENOTFOUND' || error.code === 'ECONNRESET';
            if (isNetworkError) {
                attempt++;
                if (attempt >= maxRetries) {
                    throw error;
                }
                const delayTime = initialDelay * Math.pow(2, attempt);
                logger.info(`Tentativa ${attempt} falhou com erro de rede. Tentando novamente em ${delayTime}ms...`);
                await delay(delayTime);
            } else {
                throw error;
            }
        }
    }
    throw new Error("Número máximo de tentativas atingido");
}

async function fetchIdsFromTmdbList(
  endpoint: string,
  params: Record<string, unknown> = {},
  maxPages = 10,
): Promise<number[]> {
  const seriesIds = new Set<number>();
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const response = await tmdbApiWithRetry(() => tmdbApi.get(endpoint, {
        params: { ...params, page, region: 'BR' },
      }));

      if (response.data.results) {
        for (const serie of response.data.results) {
          if (serie.id && !serie.adult) {
            seriesIds.add(serie.id);
          }
        }
      }

      totalPages = response.data.total_pages || 1;
      page++;
      await delay(250);
    } while (page <= totalPages && page <= maxPages);

    return Array.from(seriesIds);
  } catch (error) {
    if (isAuthError(error)) {
      logger.error(`❌ Erro de autenticação TMDB em ${endpoint} — abortando sync (chave de API inválida/sem permissão): ${error}`);
      throw error;
    }
    logger.error(`Erro ao buscar IDs de ${endpoint} (retornando ${seriesIds.size} IDs parciais já coletados): ${error}`);
    return Array.from(seriesIds);
  }
}

async function fetchCuratedSeriesIds(): Promise<Set<number>> {
  logger.info('Buscando séries de listas curadas TMDB (popular, on_the_air)...');
  const ids = new Set<number>();

  const popular = await fetchIdsFromTmdbList('/tv/popular', {}, 15);
  popular.forEach((id) => ids.add(id));
  logger.info(`  popular: ${popular.length} séries`);

  const onTheAir = await fetchIdsFromTmdbList('/tv/on_the_air', {}, 10);
  onTheAir.forEach((id) => ids.add(id));
  logger.info(`  on_the_air: ${onTheAir.length} séries`);

  logger.info(`Total de ${ids.size} IDs únicos de listas curadas.`);
  return ids;
}

async function fetchSeriesIdsForPeriod(startDate: string, endDate: string): Promise<number[]> {
  const openPeriod = isOpenPeriod(endDate);
  logger.info(
    `Buscando IDs de séries com primeira exibição entre ${startDate} e ${endDate}` +
    (openPeriod ? ' (período aberto — filtros relaxados)' : '') +
    '...',
  );
  const seriesIds = new Set<number>();
  let page = 1;
  let totalPages = 1;

  const discoverParams: Record<string, unknown> = {
    'first_air_date.gte': startDate,
    'first_air_date.lte': endDate,
    region: 'BR',
    sort_by: 'popularity.desc',
  };

  if (!openPeriod) {
    discoverParams['vote_count.gte'] = 50;
  }

  try {
    do {
      const response = await tmdbApiWithRetry(() => tmdbApi.get('/discover/tv', {
        params: { ...discoverParams, page },
      }));

      if (response.data.results) {
        for (const serie of response.data.results) {
          if (serie.id && !serie.adult) {
            seriesIds.add(serie.id);
          }
        }
      }

      totalPages = response.data.total_pages || 1;
      if (totalPages > 500) totalPages = 500; // Respect TMDB's 500 page limit

      page++;
      await delay(250);
    } while (page <= totalPages);

    logger.info(`Total de ${seriesIds.size} IDs de séries encontrados para o período.`);
    return Array.from(seriesIds);
  } catch (error) {
    if (isAuthError(error)) {
      logger.error(`❌ Erro de autenticação TMDB na descoberta por período — abortando sync (chave de API inválida/sem permissão): ${error}`);
      throw error;
    }
    logger.error(`Erro ao buscar IDs de séries para o período (retornando ${seriesIds.size} IDs parciais já coletados): ${error}`);
    return Array.from(seriesIds);
  }
}

async function processSerieBatch(serieIds: number[], prisma: PrismaClient, curatedIds: Set<number> = new Set()): Promise<{ successCount: number, errorCount: number, skippedCount: number, skipReasons: Record<string, number>, noBrProviderIds: number[] }> {
  let successCount = 0, errorCount = 0, skippedCount = 0;
  const skipReasons: Record<string, number> = {};
  const noBrProviderIds: number[] = [];
  const bumpSkip = (reason: string) => {
    skippedCount++;
    skipReasons[reason] = (skipReasons[reason] ?? 0) + 1;
  };

  for (const id of serieIds) {
    try {
      const serieDetails = await tmdbApiWithRetry(() => tmdb.tvInfo({
        id,
        language: 'pt-BR',
        append_to_response: 'credits,videos,watch/providers,release_dates',
      })) as any;



      const brProviders = serieDetails['watch/providers']?.results?.BR;
      if (!brProviders) {
        bumpSkip('no_br_provider');
        noBrProviderIds.push(id);
        continue;
      }

      const firstAirDate: Date | null = serieDetails.first_air_date ? new Date(serieDetails.first_air_date) : null;
      if (!firstAirDate) {
        bumpSkip('no_first_air_date');
        continue;
      }

      const isCurated = curatedIds.has(id);
      if (!isCurated && !isSerieRelevantForSync(serieDetails)) {
        bumpSkip('quality_filter');
        logger.info(
          `⏭️ Série [${id}] "${serieDetails.name}" ignorada: critérios de sync ` +
          `(votes=${serieDetails.vote_count ?? 0}, pop=${(serieDetails.popularity ?? 0).toFixed(1)}).`
        );
        continue;
      }

      const scalarData = {
        tmdbId: serieDetails.id,
        name: serieDetails.name!,
        originalName: serieDetails.original_name,
        overview: isLikelyEnglish(serieDetails.overview)
          ? (await translateSynopsisForStorage(serieDetails.overview, {
              tmdbId: serieDetails.id,
              mediaType: 'tv',
            })) ?? serieDetails.overview
          : serieDetails.overview,
        firstAirDate: firstAirDate,
        lastAirDate: serieDetails.last_air_date ? new Date(serieDetails.last_air_date) : null,
        numberOfEpisodes: serieDetails.number_of_episodes,
        numberOfSeasons: serieDetails.number_of_seasons,
        status: serieDetails.status,
        homepage: serieDetails.homepage,
        posterPath: serieDetails.poster_path,
        backdropPath: serieDetails.backdrop_path,
        voteAverage: serieDetails.vote_average,
        voteCount: serieDetails.vote_count,
        popularity: serieDetails.popularity,
        type: serieDetails.type,
        inProduction: serieDetails.in_production,
        tagline: serieDetails.tagline,
      };

      const genreCreates = await buildTmdbGenreCreates(prisma.genero, serieDetails.genres);

      const relationalData = {
        genres: {
          create: genreCreates,
        },
        networks: {
          create: dedupeBy(serieDetails.networks, (network: any) => network.id).map((network: any) => ({ network: { connectOrCreate: { where: { tmdbId: network.id }, create: { tmdbId: network.id, name: network.name, logoPath: network.logo_path } } } }))
        },
        languages: {
            create: dedupeBy(serieDetails.spoken_languages, (lang: any) => lang.iso_639_1).map((lang: any) => ({ language: { connectOrCreate: { where: { iso: lang.iso_639_1 }, create: { iso: lang.iso_639_1, name: lang.english_name } } } }))
        },
        seasons: {
          create: dedupeBy(serieDetails.seasons, (season: any) => season.id).map((season: any) => ({
            tmdbId: season.id,
            name: season.name,
            overview: season.overview,
            airDate: season.air_date ? new Date(season.air_date) : null,
            episodeCount: season.episode_count,
            seasonNumber: season.season_number,
            posterPath: season.poster_path,
          }))
        },
        createdBy: {
            create: dedupeBy(serieDetails.created_by, (creator: any) => creator.id).map((creator: any) => ({ pessoa: { connectOrCreate: { where: { tmdbId: creator.id }, create: { tmdbId: creator.id, name: creator.name, profilePath: creator.profile_path } } } }))
        },
        cast: {
          create: dedupeBy(serieDetails.credits?.cast?.slice(0, 20), (person: any) => `${person.id}-${person.order}`).map((person: any) => ({ character: person.character, order: person.order, pessoa: { connectOrCreate: { where: { tmdbId: person.id }, create: { tmdbId: person.id, name: person.name, profilePath: person.profile_path } } } }))
        },
        crew: {
          create: dedupeBy(serieDetails.credits?.crew?.filter((p: any) => ['Creator', 'Director', 'Screenplay', 'Writer'].includes(p.job || '')), (person: any) => `${person.id}-${person.job}`).map((person: any) => ({ job: person.job, department: person.department, pessoa: { connectOrCreate: { where: { tmdbId: person.id }, create: { tmdbId: person.id, name: person.name, profilePath: person.profile_path } } } }))
        },
        videos: {
            create: dedupeBy(serieDetails.videos?.results?.filter((v: any) => v.site === 'YouTube'), (video: any) => video.id).map((video: any) => ({ tmdbId: video.id, key: video.key, name: video.name, site: video.site, type: video.type, official: video.official }))
        },
        streamingProviders: {
            create: dedupeBy(brProviders.flatrate, (provider: any) => provider.provider_id).map((provider: any) => ({
                url: brProviders.link, // Adiciona a URL da página "Onde Assistir"
                provider: { connectOrCreate: { where: { tmdbId: provider.provider_id }, create: { tmdbId: provider.provider_id, name: provider.provider_name, logoPath: provider.logo_path } } }
            }))
        }
      };



      const existingSerie = await prisma.serie.findUnique({ where: { tmdbId: id }, select: { id: true } });

      if (existingSerie) {
        await prisma.serie.update({
          where: { tmdbId: id },
          data: {
            ...scalarData,
            genres: { deleteMany: {}, create: relationalData.genres.create },
            networks: { deleteMany: {}, create: relationalData.networks.create },
            languages: { deleteMany: {}, create: relationalData.languages.create },
            seasons: { deleteMany: {}, create: relationalData.seasons.create },
            createdBy: { deleteMany: {}, create: relationalData.createdBy.create },
            cast: { deleteMany: {}, create: relationalData.cast.create },
            crew: { deleteMany: {}, create: relationalData.crew.create },
            videos: { deleteMany: {}, create: relationalData.videos.create },
            streamingProviders: { deleteMany: {}, create: relationalData.streamingProviders.create },
          },
        });
      } else {
        await prisma.serie.create({
          data: { ...scalarData, ...relationalData },
        });
      }

      successCount++;
      logger.info(`✅ Série [${id}] "${serieDetails.name}" sincronizada.`);

    } catch (error) {
      errorCount++;
      logger.error(`❌ Erro ao processar a série ID ${id}. Pulando: ${error}`);
    }
  }

  logger.info(`--- Resumo do Lote (Séries) --- Sucesso: ${successCount}, Erros: ${errorCount}, Pulados: ${skippedCount}`);
  return { successCount, errorCount, skippedCount, skipReasons, noBrProviderIds };
}

const PENDING_BR_CHECK_KEY = 'series_pending_br_check';
const PENDING_BR_CHECK_MAX_STORED = 5000;

async function readPendingBrCheckIds(prisma: PrismaClient): Promise<number[]> {
  const row = await prisma.appSetting.findUnique({ where: { key: PENDING_BR_CHECK_KEY } });
  return Array.isArray(row?.value) ? (row!.value as number[]) : [];
}

async function writePendingBrCheckIds(prisma: PrismaClient, ids: number[]): Promise<void> {
  const deduped = Array.from(new Set(ids)).slice(0, PENDING_BR_CHECK_MAX_STORED);
  await prisma.appSetting.upsert({
    where: { key: PENDING_BR_CHECK_KEY },
    create: { key: PENDING_BR_CHECK_KEY, value: deduped },
    update: { value: deduped },
  });
}

/**
 * Rechecha séries que foram puladas por falta de streaming BR em syncs anteriores.
 * Dados de watch/providers da TMDB (via JustWatch) podem chegar atrasados em relação à estreia,
 * então uma série sem provider hoje pode ganhar um mês depois — sem isso, ela nunca mais seria
 * revisitada a não ser que um sync futuro cobrisse o mesmo período de novo.
 */
export async function recheckPendingBrSeries(prisma: PrismaClient, batchLimit = 200): Promise<{ resolved: number; stillPending: number }> {
  const pendingIds = await readPendingBrCheckIds(prisma);
  if (pendingIds.length === 0) {
    return { resolved: 0, stillPending: 0 };
  }

  const idsToCheck = pendingIds.slice(0, batchLimit);
  const remaining = pendingIds.slice(batchLimit);

  logger.info(`Rechecando streaming BR de ${idsToCheck.length} séries pendentes (${pendingIds.length} no total)...`);

  const stillNoProvider: number[] = [];
  const idsWithNewProvider: number[] = [];

  for (const id of idsToCheck) {
    try {
      const serieDetails = await tmdbApiWithRetry(() => tmdb.tvInfo({
        id,
        language: 'pt-BR',
        append_to_response: 'watch/providers',
      })) as any;

      if (serieDetails['watch/providers']?.results?.BR) {
        idsWithNewProvider.push(id);
      } else {
        stillNoProvider.push(id);
      }
    } catch (error) {
      logger.error(`❌ Erro ao rechecar streaming BR da série ID ${id}: ${error}`);
      stillNoProvider.push(id);
    }
    await delay(250);
  }

  if (idsWithNewProvider.length > 0) {
    logger.info(`  ${idsWithNewProvider.length} séries ganharam streaming BR — reprocessando.`);
    const result = await processSerieBatch(idsWithNewProvider, prisma);
    await addSkipReasons(prisma, 'series', result.skipReasons);
    // Séries que ainda não passam no filtro de qualidade (mas já têm provider BR) saem da fila —
    // o motivo de skip agora é qualidade, não mais falta de streaming.
  }

  await writePendingBrCheckIds(prisma, [...stillNoProvider, ...remaining]);
  const resolved = idsWithNewProvider.length;
  const stillPending = stillNoProvider.length + remaining.length;
  logger.info(`Recheck de streaming BR concluído: ${resolved} resolvidas, ${stillPending} ainda pendentes.`);
  return { resolved, stillPending };
}


export async function syncSeries(prisma: PrismaClient, startDate: string, endDate: string, limit?: number) {
  let currentStartDate = new Date(startDate);
  const finalEndDate = new Date(endDate);
  const runProgress = getSyncRunProgress();
  const phaseTracker = runProgress?.startPhase('SÉRIES');

  logger.info(`Iniciando sincronização de séries (listas curadas + período ${startDate} a ${endDate}).`);

  if (limit) {
    logger.warn(`O parâmetro limit (${limit}) será aplicado para cada mês, não para o total.`);
  }

  await updateSyncProgress(prisma, { phase: 'series' });

  const allNoBrProviderIds: number[] = [];

  const curatedIds = await fetchCuratedSeriesIds();
  let curatedIdList = Array.from(curatedIds);
  phaseTracker?.setTotal(curatedIdList.length);

  if (curatedIdList.length > 0) {
    if (limit) {
      curatedIdList = curatedIdList.slice(0, limit);
    }

    const batchSize = 10;
    for (let i = 0; i < curatedIdList.length; i += batchSize) {
      const batch = curatedIdList.slice(i, i + batchSize);
      logger.info(`Processando lote curado de séries: ${i + 1}-${Math.min(i + batchSize, curatedIdList.length)} de ${curatedIdList.length}`);
      const batchResult = await processSerieBatch(batch, prisma, curatedIds);
      await addSkipReasons(prisma, 'series', batchResult.skipReasons);
      allNoBrProviderIds.push(...batchResult.noBrProviderIds);
      phaseTracker?.advance(batch.length);
      const stats = phaseTracker?.getStats();
      await updateSyncProgress(prisma, {
        processedInPhase: stats?.processed,
        totalInPhase: stats?.total,
      });
    }
  }

  while (currentStartDate <= finalEndDate) {
    const currentEndDate = new Date(currentStartDate);
    currentEndDate.setMonth(currentEndDate.getMonth() + 1);
    currentEndDate.setDate(0);

    const startStr = currentStartDate.toISOString().split('T')[0];
    const endStr = (currentEndDate > finalEndDate ? finalEndDate : currentEndDate).toISOString().split('T')[0];
    
    let monthlyIds = await fetchSeriesIdsForPeriod(startStr, endStr);
    phaseTracker?.addToTotal(monthlyIds.length);
    
    if (monthlyIds.length > 0) {
        if (limit) {
            monthlyIds = monthlyIds.slice(0, limit);
            logger.info(`Limitando a sincronização deste mês a ${limit} itens.`);
        }

        const batchSize = 10;
        for (let i = 0; i < monthlyIds.length; i += batchSize) {
            const batch = monthlyIds.slice(i, i + batchSize);
            logger.info(`Processando lote de séries do período ${startStr} a ${endStr}: ${i + 1}-${Math.min(i + batchSize, monthlyIds.length)} de ${monthlyIds.length}`);
            const batchResult = await processSerieBatch(batch, prisma, curatedIds);
            await addSkipReasons(prisma, 'series', batchResult.skipReasons);
            allNoBrProviderIds.push(...batchResult.noBrProviderIds);
            phaseTracker?.advance(batch.length);
            const stats = phaseTracker?.getStats();
            await updateSyncProgress(prisma, {
              processedInPhase: stats?.processed,
              totalInPhase: stats?.total,
            });
        }
    }

    currentStartDate.setMonth(currentStartDate.getMonth() + 1);
    currentStartDate.setDate(1);
  }

  if (allNoBrProviderIds.length > 0) {
    const existingPending = await readPendingBrCheckIds(prisma);
    await writePendingBrCheckIds(prisma, [...existingPending, ...allNoBrProviderIds]);
    logger.info(`${allNoBrProviderIds.length} séries sem streaming BR guardadas para recheck futuro.`);
  }

  logger.info(`Sincronização de séries concluída para o período de ${startDate} a ${endDate}.`);
}

const main = async () => {
  
  const startDate = process.argv[2];
  const endDate = process.argv[3];
  const limit = process.argv[4] ? parseInt(process.argv[4]) : undefined;

  if (!startDate || !endDate) {
    console.error('Uso: ts-node src/syncSeries.ts <startDate> <endDate> [limit]');
    process.exit(1);
  }

  try {
    await syncSeries(prisma, startDate, endDate, limit);
  } catch (error) {
    logger.error(`Erro fatal na sincronização de séries: ${error}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

if (require.main === module) {
  main();
}