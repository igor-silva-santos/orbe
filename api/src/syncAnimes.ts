import './loadEnv';

import { logger } from './logger';
import { anilistApi } from './clients';
import { prisma } from './clients';
import { isAnimeRelevantForSeasonalSync } from './qualityFilters';
import { isLikelyEnglish, translateSynopsisForStorage } from './translation';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function prismaUpdateWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 5,
  initialDelay = 1000
): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await operation();
    } catch (error: any) {
      if (error.message.includes('Server has closed the connection')) {
        attempt++;
        if (attempt >= maxRetries) {
          throw error;
        }
        const delayTime = initialDelay * Math.pow(2, attempt);
        logger.warn(`Prisma update failed due to connection loss. Retrying in ${delayTime}ms... (Attempt ${attempt}/${maxRetries})`);
        await delay(delayTime);
        // Reconnect Prisma client if necessary, though it often handles this internally
        await prisma.$disconnect();
        await prisma.$connect();
      } else {
        throw error;
      }
    }
  }
  throw new Error("Maximum retries reached for Prisma update.");
}


async function anilistApiWithRetry(query: string, variables: any, maxRetries = 5, initialDelay = 1000) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            const response = await anilistApi.post('', { query, variables });
            // AniList pode retornar 200 OK mas com um array de erros no corpo
            if (response.data.errors) {
                const isRetryable = response.data.errors.some((e: any) => e.status === 403 || e.status >= 500);
                if (isRetryable) {
                    // Lança um erro customizado para ser pego pelo bloco catch
                    const error = new Error(`AniList API error: ${response.data.errors[0].message}`);
                    (error as any).response = { status: response.data.errors[0].status };
                    throw error;
                }
            }
            return response;
        } catch (error: any) {
            const isNetworkError = error.code === 'ENOTFOUND' || error.code === 'ECONNRESET';
            const isRetryableHttpError = error.response && (
                error.response.status === 429 || // Rate Limit
                error.response.status === 403 || // Forbidden (AniList downtime)
                error.response.status >= 500    // Server errors
            );

            if (isNetworkError || isRetryableHttpError) {
                attempt++;
                if (attempt >= maxRetries) {
                    throw error;
                }
                const delayTime = initialDelay * Math.pow(2, attempt);
                const reason = isNetworkError ? 'rede' : `HTTP status ${error.response.status}`;
                logger.info(`Tentativa ${attempt} falhou com erro de ${reason}. Tentando novamente em ${delayTime}ms...`);
                await delay(delayTime);
            } else {
                throw error;
            }
        }
    }
    throw new Error("Número máximo de tentativas atingido");
}

async function fetchSeasonAnimeIds(year: number, seasons: string[]): Promise<Map<string, number[]>> {
    logger.info(`Buscando animes da temporada ${year} (${seasons.join(', ')}) ordenados por estreia...`);
    const seasonAnimeIds = new Map<string, number[]>();

    const query = `
      query ($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int, $type: MediaType) {
        Page(page: $page, perPage: $perPage) {
          pageInfo { hasNextPage }
          media(
            season: $season,
            seasonYear: $seasonYear,
            type: $type,
            sort: START_DATE_DESC,
            isAdult: false
          ) {
            id
            format
            status
            startDate { year month day }
          }
        }
      }
    `;

    for (const season of seasons) {
        const idsForSeason: number[] = [];
        const seenIds = new Set<number>();
        let page = 1;
        let hasNextPage = true;
        while (hasNextPage) {
            try {
                logger.info(`Buscando animes: Ano ${year}, Estação ${season}, Página ${page}...`);
                const variables = { page, perPage: 50, season: season.toUpperCase(), seasonYear: year, type: 'ANIME' };
                const response = await anilistApiWithRetry(query, variables);
                const pageData = response.data.data.Page;

                if (pageData.media) {
                    for (const anime of pageData.media) {
                        if (!seenIds.has(anime.id) && isAnimeRelevantForSeasonalSync(anime)) {
                            seenIds.add(anime.id);
                            idsForSeason.push(anime.id);
                        }
                    }
                }

                hasNextPage = pageData.pageInfo.hasNextPage;
                page++;
                await delay(1000);
            } catch (error: any) {
                const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
                logger.error(`Erro ao buscar animes para ${season} ${year}: ${errorMessage}`);
                hasNextPage = false;
            }
        }
        seasonAnimeIds.set(season, idsForSeason);
        logger.info(`  ${season} ${year}: ${idsForSeason.length} animes de temporada encontrados`);
    }
    logger.info(`Busca de animes por temporada concluída.`);
    return seasonAnimeIds;
}

async function processAnimeBatch(animeIds: number[]): Promise<{ successCount: number, errorCount: number, skippedCount: number }> {
    let successCount = 0, errorCount = 0, skippedCount = 0;

    const detailQuery = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          idMal
          title { romaji english native }
          description(asHtml: false)
          episodes
          season
          seasonYear
          format
          status
          startDate { year month day }
          endDate { year month day }
          averageScore
          meanScore
          popularity
          duration
          source
          siteUrl
          bannerImage
          coverImage { extraLarge }
          synonyms
          countryOfOrigin
          hashtag
          isLicensed
          isAdult
          genres
          tags { id name description category isAdult }
          studios(isMain: true) { nodes { id name } }
          characters(sort: [ROLE, RELEVANCE], perPage: 25) {
            edges {
              role
              node { id name { full } image { large } }
              voiceActors(sort: RELEVANCE) {
                id
                name { full }
                image { large }
                language: languageV2
              }
            }
          }
          staff(sort: RELEVANCE, perPage: 15) {
            edges {
              role
              node { id name { full } image { large } }
            }
          }
          streamingEpisodes { title thumbnail url site }
          trailer { id site }
          externalLinks { id url site }
          rankings { id rank type context year allTime }
          airingSchedule(notYetAired: true, perPage: 5) { nodes { airingAt episode } }
          relations {
            edges {
              relationType
              node { id }
            }
          }
        }
      }
    `;

    for (const id of animeIds) {
        try {
            const response = await anilistApiWithRetry(detailQuery, { id });
            const anime = response.data.data.Media;

            if (!anime) {
                skippedCount++;
                continue;
            }

            if (!isAnimeRelevantForSeasonalSync(anime)) {
                skippedCount++;
                logger.info(
                  `⏭️ Anime [${id}] "${anime.title?.romaji}" ignorado: critérios de sync ` +
                  `(score=${anime.averageScore ?? 0}, pop=${anime.popularity ?? 0}, status=${anime.status ?? '—'}).`
                );
                continue;
            }

            const startDate = (anime.startDate && anime.startDate.year)
                ? new Date(anime.startDate.year, (anime.startDate.month || 1) - 1, anime.startDate.day || 1)
                : null;
            const endDate = (anime.endDate && anime.endDate.year)
                ? new Date(anime.endDate.year, (anime.endDate.month || 1) - 1, anime.endDate.day || 1)
                : null;

            const scalarData = {
                anilistId: anime.id,
                malId: anime.idMal,
                titleRomaji: anime.title.romaji!,
                titleEnglish: anime.title.english,
                titleNative: anime.title.native,
                description: isLikelyEnglish(anime.description)
                    ? (await translateSynopsisForStorage(anime.description)) ?? anime.description
                    : anime.description,
                episodes: anime.episodes,
                season: anime.season,
                seasonYear: anime.seasonYear,
                format: anime.format,
                status: anime.status,
                startDate: startDate,
                endDate: endDate,
                averageScore: anime.averageScore,
                meanScore: anime.meanScore,
                popularity: anime.popularity,
                duration: anime.duration,
                source: anime.source,
                siteUrl: anime.siteUrl,
                coverImage: anime.coverImage?.extraLarge,
                bannerImage: anime.bannerImage,
                synonyms: anime.synonyms,
                countryOfOrigin: anime.countryOfOrigin,
                hashtag: anime.hashtag,
                isLicensed: anime.isLicensed,
                isAdult: anime.isAdult,
            };

            const staffToCreate = anime.staff?.edges?.map((edge: any) => ({
                role: edge.role,
                staff: {
                    connectOrCreate: {
                        where: { anilistId: edge.node.id },
                        create: { anilistId: edge.node.id, name: edge.node.name.full, image: edge.node.image.large }
                    }
                }
            })) || [];

            const uniqueStaffKeys = new Set();
            const uniqueStaffToCreate = staffToCreate.filter((staffMember: any) => {
              const key = `${staffMember.staff.connectOrCreate.where.anilistId}-${staffMember.role}`;
              if (uniqueStaffKeys.has(key)) {
                return false;
              } else {
                uniqueStaffKeys.add(key);
                return true;
              }
            });

            const relatedAnimeIds = anime.relations?.edges.map((edge: any) => edge.node.id) || [];
            const existingRelatedAnimes = await prismaUpdateWithRetry(() => prisma.anime.findMany({
                where: { anilistId: { in: relatedAnimeIds } },
                select: { anilistId: true }
            }));
            const existingRelatedAnilistIds = new Set(existingRelatedAnimes.map((a: any) => a.anilistId));

            const relationsToCreate = anime.relations?.edges
                ?.filter((edge: any) => existingRelatedAnilistIds.has(edge.node.id))
                .map((edge: any) => ({
                    relationType: edge.relationType,
                    relatedAnime: {
                        connect: { anilistId: edge.node.id }
                    }
                })) || [];

            const externalLinksData = [
              ...(anime.externalLinks?.map((link: any) => ({ url: link.url, site: link.site })) ?? []),
              ...(anime.trailer?.site === 'youtube' && anime.trailer?.id
                ? [{ url: `https://www.youtube.com/watch?v=${anime.trailer.id}`, site: 'YouTube' }]
                : []),
            ];

            const relationalData = {
                genres: { create: anime.genres?.map((name: string) => ({ genero: { connectOrCreate: { where: { name }, create: { name } } } })) },
                tags: { create: anime.tags?.map((tag: any) => ({ tag: { connectOrCreate: { where: { id: tag.id }, create: { id: tag.id, name: tag.name, description: tag.description, category: tag.category, isAdult: tag.isAdult } } } })) },
                studios: { create: anime.studios?.nodes?.map((studio: any) => ({ studio: { connectOrCreate: { where: { anilistId: studio.id }, create: { anilistId: studio.id, name: studio.name } } } })) },
                streamingLinks: { create: anime.streamingEpisodes?.map((link: any) => ({ url: link.url, site: link.site, thumbnail: link.thumbnail })) },
                externalLinks: { create: externalLinksData },
                ranks: { create: anime.rankings?.map((rank: any) => ({ rank: rank.rank, type: rank.type, context: rank.context, year: rank.year, allTime: rank.allTime })) },
                airingSchedule: { create: anime.airingSchedule?.nodes?.map((schedule: any) => ({ airingAt: new Date(schedule.airingAt * 1000), episode: schedule.episode })) },
                staff: { create: uniqueStaffToCreate },
                sourceRelations: { create: relationsToCreate },
            };



            const existingAnime = await prismaUpdateWithRetry(() => prisma.anime.findUnique({ where: { anilistId: id } }));

            if (existingAnime) {
                await prismaUpdateWithRetry(() => prisma.anime.update({
                    where: { anilistId: id },
                    data: {
                        ...scalarData,
                        genres: { deleteMany: {}, create: relationalData.genres.create },
                        tags: { deleteMany: {}, create: relationalData.tags.create },
                        studios: { deleteMany: {}, create: relationalData.studios.create },
                        staff: { deleteMany: {}, create: relationalData.staff.create },
                        streamingLinks: { deleteMany: {}, create: relationalData.streamingLinks.create },
                        externalLinks: { deleteMany: {}, create: relationalData.externalLinks.create },
                        ranks: { deleteMany: {}, create: relationalData.ranks.create },
                        airingSchedule: { deleteMany: {}, create: relationalData.airingSchedule.create },
                        sourceRelations: { deleteMany: {}, create: relationsToCreate },
                    },
                }));
            } else {
                await prismaUpdateWithRetry(() => prisma.anime.create({
                    data: {
                        ...scalarData,
                        ...relationalData,
                    },
                }));
            }

            // Handle characters separately
            if (anime.characters?.edges) {
                const existingCharLinks = await prismaUpdateWithRetry(() => prisma.animeCharacter.findMany({
                    where: { anime: { anilistId: id } },
                    select: { id: true }
                }));
                if (existingCharLinks.length > 0) {
                    const idsToDelete = existingCharLinks.map(link => link.id);
                    await prismaUpdateWithRetry(() => prisma.animeCharacterVoiceActor.deleteMany({
                        where: { animeCharacterId: { in: idsToDelete } }
                    }));
                    await prismaUpdateWithRetry(() => prisma.animeCharacter.deleteMany({
                        where: { id: { in: idsToDelete } }
                    }));
                }

                for (const edge of anime.characters.edges) {
                    const personagem = await prismaUpdateWithRetry(() => prisma.personagem.upsert({
                        where: { anilistId: edge.node.id },
                        update: { name: edge.node.name.full, image: edge.node.image.large },
                        create: { anilistId: edge.node.id, name: edge.node.name.full, image: edge.node.image.large },
                    }));

                    const allVoiceActors = edge.voiceActors || [];
                    const voiceActorsJapanese = allVoiceActors.filter((va: any) => va.language === 'JAPANESE');
                    const voiceActorsBrazilian = allVoiceActors.filter((va: any) => va.language === 'PORTUGUESE');

                    const combinedVAs = [...voiceActorsJapanese, ...voiceActorsBrazilian];
                    const uniqueVAs = Array.from(new Map(combinedVAs.map(va => [va.id, va])).values());

                    await prismaUpdateWithRetry(() => prisma.animeCharacter.create({
                        data: {
                            role: edge.role,
                            anime: { connect: { anilistId: id } },
                            character: { connect: { id: personagem.id } },
                            voiceActors: {
                                create: uniqueVAs.map((va: any) => ({
                                    dublador: {
                                        connectOrCreate: {
                                            where: { anilistId: va.id },
                                            create: {
                                                anilistId: va.id,
                                                name: va.name.full,
                                                image: va.image.large,
                                                language: va.language,
                                            },
                                        },
                                    },
                                })),
                            },
                        },
                    }));
                }
            }

            successCount++;
            logger.info(`✅ Anime [${id}] "${anime.title.romaji}" sincronizado.`);

        } catch (error: any) {
            errorCount++;
            const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
            logger.error(`❌ Erro ao processar o anime ID ${id}: ${errorMessage}`);
        } finally {
            await delay(700);
        }
    }

    logger.info(`--- Resumo do Lote (Animes) --- Sucesso: ${successCount}, Erros: ${errorCount}, Pulados: ${skippedCount}`);
    return { successCount, errorCount, skippedCount };
}

export type SyncAnimesOptions = {
  limit?: number;
  onBatchComplete?: () => void | Promise<void>;
};

export async function syncAnimes(year: number, seasons: string[], options?: SyncAnimesOptions) {
  const seasonAnimeIds = await fetchSeasonAnimeIds(year, seasons);

  const seasonTranslations: { [key: string]: string } = {
      WINTER: 'Inverno',
      SPRING: 'Primavera',
      SUMMER: 'Verão',
      FALL: 'Outono'
  };

  for (const [season, ids] of seasonAnimeIds.entries()) {
    let animeIds = ids;
    if (options?.limit) {
        animeIds = animeIds.slice(0, options.limit);
        logger.info(`Limitando a sincronização de animes para a estação ${season} a ${options.limit} itens.`);
    }

    const batchSize = 10;

    if (animeIds.length === 0) {
        logger.info(`Nenhum anime para sincronizar na estação ${season} de ${year}.`);
        continue;
    }

    for (let i = 0; i < animeIds.length; i += batchSize) {
        const batch = animeIds.slice(i, i + batchSize);
        const translatedSeason = seasonTranslations[season] || season;
        logger.info(`Processando lote de animes: ${i + 1}-${Math.min(i + batchSize, animeIds.length)} de ${animeIds.length} da temporada ${translatedSeason} de ${year}`);
        await processAnimeBatch(batch);
        if (options?.onBatchComplete) {
          await options.onBatchComplete();
        }
      }
  }
}

const main = async () => {
  const startYearArg = process.argv[2];
  const endYearArg = process.argv[3];
  const limit = process.argv[4] ? parseInt(process.argv[4]) : undefined;

  if (!startYearArg || !endYearArg) {
    console.error('Uso: ts-node src/syncAnimes.ts <startYear> <endYear> [limit]');
    process.exit(1);
  }

  const startYear = parseInt(startYearArg);
  const endYear = parseInt(endYearArg);
  const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
  
  for (let year = startYear; year <= endYear; year++) {
    try {
      logger.info(`--- Iniciando sincronização para o ano ${year} ---`);
      await syncAnimes(year, seasons, limit !== undefined ? { limit } : undefined);
      logger.info(`--- Sincronização para o ano ${year} concluída com sucesso ---`);
    } catch (error) {
      logger.error(`--- Erro fatal na sincronização de animes para o ano ${year}: ${error} ---`);
    }
  }
};

if (require.main === module) {
  main();
}