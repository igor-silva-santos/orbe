import './loadEnv';

import { PrismaClient } from '@prisma/client';
import { prisma } from './clients';
import { igdbApi, getIgdbAccessToken } from './clients';
import { logger } from './logger';
import { isJogoRelevantForSync, SYNC_MIN_GAME_HYPES } from './qualityFilters';
import { isLikelyEnglish, translateSynopsisForStorage } from './translation';
import { isOpenPeriod } from './syncDateHelpers';
import { resolveIgdbRelease, isYearWithinRange } from './yearOnlyRelease';
import type { SyncContentOptions } from './syncOptions';
import { resolveSyncContentOptions } from './syncOptions';
import { addSkipReasons, updateSyncProgress } from './syncState';
import { dedupeBy, ensureIgdbNamedEntity } from './syncUtils';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** 401/403 (chave inválida/sem permissão) não deve virar "lista vazia" silenciosa — precisa falhar o sync. */
function isAuthError(error: any): boolean {
  const status = error?.response?.status;
  return status === 401 || status === 403;
}

async function igdbApiWithRetry<T>(fn: () => Promise<T>, maxRetries = 5, initialDelay = 1000): Promise<T> {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await fn();
        } catch (error: any) {
            const isNetworkError = error.code === 'ENOTFOUND' || error.code === 'ECONNRESET';
            const isRateLimitError = error.response && error.response.status === 429;
            if (isNetworkError || isRateLimitError) {
                attempt++;
                if (attempt >= maxRetries) {
                    throw error;
                }
                const delayTime = initialDelay * Math.pow(2, attempt);
                logger.info(`Tentativa ${attempt} falhou com erro ${isRateLimitError ? '429' : 'de rede'}. Tentando novamente em ${delayTime}ms...`);
                await delay(delayTime);
            } else {
                throw error;
            }
        }
    }
    throw new Error("Número máximo de tentativas atingido");
}

async function fetchAndSyncEvents(prisma: PrismaClient, startDateStr: string, endDateStr: string): Promise<any[]> {
    logger.info(`Buscando e sincronizando eventos da IGDB entre ${startDateStr} e ${endDateStr} (incl. futuros)...`);
    const startDate = Math.floor(new Date(startDateStr).getTime() / 1000);
    const endDate = Math.floor(new Date(endDateStr).getTime() / 1000);
    const nowTs = Math.floor(Date.now() / 1000);

    const query = `
        fields name, description, start_time, end_time, games;
        where (start_time >= ${startDate} & start_time <= ${endDate}) | start_time > ${nowTs};
        sort start_time asc;
        limit 200;
    `;
    logger.info(`Query IGDB para eventos: ${query}`);
    try {
        const response = await igdbApiWithRetry(() => igdbApi.post('/events', query));
        const events = response.data as any[];
        const seenIds = new Set<number>();

        for (const event of events) {
            if (seenIds.has(event.id)) continue;
            seenIds.add(event.id);
            await prisma.event.upsert({
                where: { igdbId: event.id },
                update: {
                    name: event.name,
                    description: event.description,
                    start_time: event.start_time ? new Date(event.start_time * 1000) : null,
                    end_time: event.end_time ? new Date(event.end_time * 1000) : null,
                },
                create: {
                    igdbId: event.id,
                    name: event.name,
                    description: event.description,
                    start_time: event.start_time ? new Date(event.start_time * 1000) : null,
                    end_time: event.end_time ? new Date(event.end_time * 1000) : null,
                },
            });
            logger.info(`✅ Evento [${event.id}] "${event.name}" sincronizado.`);
        }
        return events;
    } catch (error: any) {
        logger.error(`Erro ao buscar e sincronizar eventos: ${error.response ? JSON.stringify(error.response.data) : error.message || error}`);
        return [];
    }
}

async function fetchPopularGameIds(): Promise<number[]> {
    logger.info('Buscando jogos populares da IGDB...');
    const gameIds = new Set<number>();
    const limit = 500;
    let offset = 0;
    let hasMore = true;

    try {
        while (hasMore && offset < 2000) {
            const response = await igdbApiWithRetry(() => igdbApi.post(
                '/games',
                `fields id, rating, rating_count, hypes, follows; where (rating >= 50 | hypes >= ${SYNC_MIN_GAME_HYPES}) & category = 0; limit ${limit}; offset ${offset}; sort rating desc;`
            ));

            const games = response.data;
            if (games && games.length > 0) {
                for (const game of games) {
                    if (game.id && isJogoRelevantForSync({
                        rating: game.rating,
                        ratingCount: game.rating_count,
                        hypes: game.hypes,
                        follows: game.follows,
                    })) {
                        gameIds.add(game.id);
                    }
                }
                offset += games.length;
                hasMore = games.length === limit;
            } else {
                hasMore = false;
            }
            await delay(250);
        }
        logger.info(`Total de ${gameIds.size} IDs de jogos populares IGDB.`);
        return Array.from(gameIds);
    } catch (error: any) {
        if (isAuthError(error)) {
          logger.error(`❌ Erro de autenticação IGDB — abortando sync (client/token inválido): ${error.message || error}`);
          throw error;
        }
        logger.error(`Erro ao buscar jogos populares (retornando ${gameIds.size} IDs parciais já coletados): ${error.message || error}`);
        return Array.from(gameIds);
    }
}

async function processGameBatch(
    gameIds: number[],
    prisma: PrismaClient,
    eventId: number | null = null,
    period?: { start: Date; end: Date },
    includeUndated = false,
): Promise<{ skipReasons: Record<string, number> }> {
    const skipReasons: Record<string, number> = {};
    const bumpSkip = (reason: string) => {
        skipReasons[reason] = (skipReasons[reason] ?? 0) + 1;
    };
    if (gameIds.length === 0) return { skipReasons };

    const query = `
        fields name, summary, cover.url, first_release_date, release_dates.date, release_dates.category,
               rating, rating_count, hypes, follows,
               genres.name, genres.id, 
               involved_companies.company.name, involved_companies.company.id, involved_companies.developer, involved_companies.publisher, 
               platforms.name, platforms.id, 
               themes.name, themes.id, 
               player_perspectives.name, player_perspectives.id, 
               screenshots.url, screenshots.id, 
               artworks.url, artworks.id, 
               websites.url, websites.category, websites.id,
               videos.name, videos.video_id,
               game_modes.name, game_modes.slug, game_modes.id,
               game_engines.name, game_engines.slug, game_engines.id;
        where id = (${gameIds.join(',')});
        limit ${gameIds.length};
    `;

    try {
        const response = await igdbApiWithRetry(() => igdbApi.post('/games', query, {
            headers: {
                'Accept-Language': 'pt-BR'
            }
        }));
        const games = response.data;

        for (const game of games) {

            try {
                // Jogos de eventos (Game Awards etc.) são curados pelo IGDB — não aplicar filtro de rating.
                if (!eventId && !isJogoRelevantForSync({
                    rating: game.rating,
                    ratingCount: game.rating_count,
                    hypes: game.hypes,
                    follows: game.follows,
                })) {
                    bumpSkip('quality_filter');
                    logger.info(
                      `⏭️ Jogo [${game.id}] "${game.name}" ignorado: critérios de sync ` +
                      `(rating=${game.rating ?? 0}, rating_count=${game.rating_count ?? 0}, ` +
                      `hypes=${game.hypes ?? 0}, follows=${game.follows ?? 0}).`
                    );
                    continue;
                }

                const igdbResolved = resolveIgdbRelease(game);
                let firstReleaseDate = igdbResolved.calendarDate;
                let releaseYear = igdbResolved.releaseYear;

                if (!firstReleaseDate && igdbResolved.isYearOnly && releaseYear) {
                    if (!includeUndated) {
                        bumpSkip('no_release_date');
                        continue;
                    }
                    if (period && !isYearWithinRange(releaseYear, period.start, period.end)) {
                        bumpSkip('out_of_period');
                        continue;
                    }
                } else if (!firstReleaseDate) {
                    if (!includeUndated) {
                        bumpSkip('no_release_date');
                        continue;
                    }
                } else {
                    releaseYear = firstReleaseDate.getFullYear();
                }

                const coverUrl = game.cover?.url ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`.replace('https://images.igdb.com/igdb/image/upload', '/api/images/igdb') : null;

                // De-duplicate company roles
                const companyRoles = new Map<string, { role: string; company: any }>();
                game.involved_companies?.forEach((inv: any) => {
                  if (inv.company) { // Ensure company object exists
                    if (inv.developer) {
                      const key = `${inv.company.id}-developer`;
                      if (!companyRoles.has(key)) {
                        companyRoles.set(key, { role: 'developer', company: inv.company });
                      }
                    }
                    if (inv.publisher) {
                      const key = `${inv.company.id}-publisher`;
                      if (!companyRoles.has(key)) {
                        companyRoles.set(key, { role: 'publisher', company: inv.company });
                      }
                    }
                  }
                });
                const companiesToCreate = Array.from(companyRoles.values()).map(cr => ({
                  role: cr.role,
                  company: {
                    connectOrCreate: {
                      where: { igdbId: cr.company.id },
                      create: { igdbId: cr.company.id, name: cr.company.name }
                    }
                  }
                }));

                const [
                  genreLinks,
                  platformLinks,
                  themeLinks,
                  perspectiveLinks,
                  gameModeLinks,
                  gameEngineLinks,
                ] = await Promise.all([
                  Promise.all(
                    dedupeBy(game.genres, (genre: any) => genre.id).map(async (genre: any) => ({
                      genero: {
                        connect: {
                          id: await ensureIgdbNamedEntity(prisma.jogoGenero, 'igdbId', {
                            id: genre.id,
                            name: genre.name,
                          }),
                        },
                      },
                    })),
                  ),
                  Promise.all(
                    dedupeBy(game.platforms, (platform: any) => platform.id).map(async (platform: any) => ({
                      plataforma: {
                        connect: {
                          id: await ensureIgdbNamedEntity(prisma.jogoPlataforma, 'igdbId', {
                            id: platform.id,
                            name: platform.name,
                          }),
                        },
                      },
                    })),
                  ),
                  Promise.all(
                    dedupeBy(game.themes, (theme: any) => theme.id).map(async (theme: any) => ({
                      theme: {
                        connect: {
                          id: await ensureIgdbNamedEntity(prisma.jogoTheme, 'igdbId', {
                            id: theme.id,
                            name: theme.name,
                          }),
                        },
                      },
                    })),
                  ),
                  Promise.all(
                    dedupeBy(game.player_perspectives, (persp: any) => persp.id).map(async (persp: any) => ({
                      perspective: {
                        connect: {
                          id: await ensureIgdbNamedEntity(prisma.jogoPlayerPerspective, 'igdbId', {
                            id: persp.id,
                            name: persp.name,
                          }),
                        },
                      },
                    })),
                  ),
                  Promise.all(
                    dedupeBy(game.game_modes, (mode: any) => mode.id).map(async (mode: any) => ({
                      gameMode: {
                        connect: {
                          id: await ensureIgdbNamedEntity(prisma.gameMode, 'id', {
                            id: mode.id,
                            name: mode.name,
                            slug: mode.slug,
                          }),
                        },
                      },
                    })),
                  ),
                  Promise.all(
                    dedupeBy(game.game_engines, (engine: any) => engine.id).map(async (engine: any) => ({
                      gameEngine: {
                        connect: {
                          id: await ensureIgdbNamedEntity(prisma.gameEngine, 'id', {
                            id: engine.id,
                            name: engine.name,
                            slug: engine.slug,
                          }),
                        },
                      },
                    })),
                  ),
                ]);

                const relationCreates = {
                  genres: { create: genreLinks },
                  platforms: { create: platformLinks },
                  themes: { create: themeLinks },
                  playerPerspectives: { create: perspectiveLinks },
                  gameModes: { create: gameModeLinks },
                  gameEngines: { create: gameEngineLinks },
                  screenshots: {
                    create: dedupeBy(game.screenshots, (ss: any) => ss.id).map((ss: any) => ({
                      igdbId: ss.id,
                      url: `https:${ss.url.replace('t_thumb', 't_screenshot_huge')}`.replace(
                        'https://images.igdb.com/igdb/image/upload',
                        '/api/images/igdb',
                      ),
                    })),
                  },
                  artworks: {
                    create: dedupeBy(game.artworks, (art: any) => art.id).map((art: any) => ({
                      igdbId: art.id,
                      url: `https:${art.url.replace('t_thumb', 't_1080p')}`.replace(
                        'https://images.igdb.com/igdb/image/upload',
                        '/api/images/igdb',
                      ),
                    })),
                  },
                  websites: {
                    create:
                      game.websites
                        ?.filter((w: any) => w.category != null)
                        .map((w: any) => ({ url: w.url, category: w.category, igdbId: w.id })) ?? [],
                  },
                  videos: {
                    create:
                      game.videos?.map((video: any) => ({
                        key: video.video_id,
                        name: video.name || '',
                        site: 'YouTube',
                        type: 'Trailer',
                        official: true,
                      })) ?? [],
                  },
                };

                const updateData = {
                    name: game.name,
                    summary: isLikelyEnglish(game.summary)
                      ? (await translateSynopsisForStorage(game.summary)) ?? game.summary
                      : game.summary,
                    cover: coverUrl,
                    firstReleaseDate: firstReleaseDate,
                    releaseYear: releaseYear,
                    rating: game.rating,
                    ratingCount: game.rating_count,
                    hypes: game.hypes,
                    follows: game.follows,
                    // `connect` numa relação muitos-para-muitos ADICIONA ao conjunto existente
                    // em vez de substituir — um jogo pode aparecer em mais de um evento.
                    ...(eventId && { events: { connect: [{ igdbId: eventId }] } })
                };

                const createData = {
                    ...updateData,
                    igdbId: game.id,
                    companies: { create: companiesToCreate },
                    ...relationCreates,
                };

                const existingGame = await prisma.jogo.findUnique({ where: { igdbId: game.id } });

                if (existingGame) {
                    await prisma.jogo.update({
                        where: { igdbId: game.id },
                        data: {
                            ...updateData,
                            genres: { deleteMany: {}, create: relationCreates.genres.create },
                            companies: { deleteMany: {}, create: createData.companies.create },
                            platforms: { deleteMany: {}, create: relationCreates.platforms.create },
                            themes: { deleteMany: {}, create: relationCreates.themes.create },
                            playerPerspectives: { deleteMany: {}, create: relationCreates.playerPerspectives.create },
                            screenshots: { deleteMany: {}, create: relationCreates.screenshots.create },
                            artworks: { deleteMany: {}, create: relationCreates.artworks.create },
                            websites: { deleteMany: {}, create: relationCreates.websites.create },
                            videos: { deleteMany: {}, create: relationCreates.videos.create },
                            gameModes: { deleteMany: {}, create: relationCreates.gameModes.create },
                            gameEngines: { deleteMany: {}, create: relationCreates.gameEngines.create },
                        },
                    });
                } else {
                    await prisma.jogo.create({ data: createData });
                }

                logger.info(`${existingGame ? '🔄' : '✅'} Jogo [${game.id}] "${game.name}" sincronizado.`);

            } catch (error) {
                logger.error(`❌ Erro ao processar o jogo ID ${game.id}. Pulando: ${error}`);
            }
        }
    } catch (error: any) {
        logger.error(`❌ Erro ao processar o lote de jogos IDs ${gameIds.join(',')}. Pulando: ${error.message || error}`);
    }

    return { skipReasons };
}

async function fetchAllGameIdsForPeriod(startDateStr: string, endDateStr: string): Promise<number[]> {
    logger.info(`Buscando todos os IDs de jogos para o período de ${startDateStr} a ${endDateStr}...`);
    const gameIds = new Set<number>();
    const limit = 500; // Max limit for IGDB
    let offset = 0;
    let hasMore = true;

    const startDate = Math.floor(new Date(startDateStr).getTime() / 1000);
    const endDate = Math.floor(new Date(endDateStr).getTime() / 1000);

    try {
        while (hasMore) {
            const response = await igdbApiWithRetry(() => igdbApi.post(
                '/games',
                `fields id; where first_release_date >= ${startDate} & first_release_date <= ${endDate}; limit ${limit}; offset ${offset}; sort id asc;`
            ));

            const games = response.data;

            if (games && games.length > 0) {
                for (const game of games) {
                    if (game.id) {
                        gameIds.add(game.id);
                    }
                }
                offset += games.length;
                hasMore = games.length === limit;
            } else {
                hasMore = false;
            }
            await delay(250); // Respect IGDB rate limit (4 req/sec)
        }
        logger.info(`Total de ${gameIds.size} IDs de jogos únicos encontrados para o período.`);
        return Array.from(gameIds);
    } catch (error: any) {
        if (isAuthError(error)) {
          logger.error(`❌ Erro de autenticação IGDB — abortando sync (client/token inválido): ${error.message || error}`);
          throw error;
        }
        logger.error(`Erro ao buscar IDs de jogos (retornando ${gameIds.size} IDs parciais já coletados): ${error.message || error}`);
        return Array.from(gameIds);
    }
}


/** Jogos com data TBD (categoria IGDB 7) dentro do intervalo do período */
async function fetchUndatedGameIdsForPeriod(startDateStr: string, endDateStr: string): Promise<number[]> {
    logger.info(`Buscando IDs de jogos TBA/TBD para ${startDateStr} a ${endDateStr}...`);
    const gameIds = new Set<number>();
    const limit = 500;
    let offset = 0;
    let hasMore = true;

    const startTs = Math.floor(new Date(startDateStr).getTime() / 1000);
    const endTs = Math.floor(new Date(endDateStr).getTime() / 1000);

    try {
        while (hasMore) {
            const response = await igdbApiWithRetry(() => igdbApi.post(
                '/games',
                `fields id; where release_dates.category = 7 & release_dates.date >= ${startTs} & release_dates.date <= ${endTs}; limit ${limit}; offset ${offset}; sort id asc;`
            ));

            const games = response.data;
            if (games?.length > 0) {
                for (const game of games) {
                    if (game.id) gameIds.add(game.id);
                }
                offset += games.length;
                hasMore = games.length === limit;
            } else {
                hasMore = false;
            }
            await delay(250);
        }
        logger.info(`Total de ${gameIds.size} IDs TBD únicos encontrados para o período.`);
        return Array.from(gameIds);
    } catch (error: any) {
        logger.error(`Erro ao buscar IDs TBD de jogos: ${error.message || error}`);
        return Array.from(gameIds);
    }
}


export async function syncGames(
    prisma: PrismaClient,
    startDate?: string,
    endDate?: string,
    limitOrOptions?: number | SyncContentOptions,
    maybeOptions?: SyncContentOptions,
) {
    const startDateArg = startDate || process.argv[2];
    const endDateArg = endDate || process.argv[3];
    const limit = typeof limitOrOptions === 'number' ? limitOrOptions : limitOrOptions?.limit ?? maybeOptions?.limit;
    const { includeUndated, undatedOnly } = resolveSyncContentOptions(
        typeof limitOrOptions === 'object' ? limitOrOptions : maybeOptions,
    );

    if (!startDateArg || !endDateArg) {
        logger.error('Datas de início e fim são necessárias para a sincronização de jogos.');
        return;
    }

    const periodOpen = isOpenPeriod(endDateArg);
    const period = { start: new Date(startDateArg), end: new Date(endDateArg) };

    let totalBatches = 0;
    let completedBatches = 0;

    const reportProgress = async () => {
        if (totalBatches <= 0) return;
        await updateSyncProgress(prisma, {
            phase: 'jogos',
            processedInPhase: completedBatches,
            totalInPhase: totalBatches,
        });
    };

    try {
        await getIgdbAccessToken();
        await updateSyncProgress(prisma, { phase: 'jogos', processedInPhase: 0, totalInPhase: 0 });

        const popularIds = periodOpen || undatedOnly ? await fetchPopularGameIds() : [];
        if (!periodOpen && !undatedOnly) {
            logger.info('Período histórico — lista curada de jogos populares ignorada.');
        }
        const batchSize = 100;
        const countBatches = (ids: number[]) => Math.ceil(ids.length / batchSize) || 0;

        const events = await fetchAndSyncEvents(prisma, startDateArg, endDateArg);
        const processedEventGameIds = new Set<number>();
        const plannedEventGameIds = new Set<number>();

        let allGameIds = undatedOnly
            ? await fetchUndatedGameIdsForPeriod(startDateArg, endDateArg)
            : await fetchAllGameIdsForPeriod(startDateArg, endDateArg);

        if (!undatedOnly && includeUndated) {
            const undatedIds = await fetchUndatedGameIdsForPeriod(startDateArg, endDateArg);
            for (const id of undatedIds) allGameIds.push(id);
            allGameIds = [...new Set(allGameIds)];
        }
        for (const event of events) {
            if (!event.games?.length) continue;
            const gameIds = limit ? event.games.slice(0, limit) : event.games;
            gameIds.forEach((id: number) => plannedEventGameIds.add(id));
        }

        const generalGameIds = allGameIds.filter((id) => !plannedEventGameIds.has(id));
        let finalGeneralIds = generalGameIds;
        if (limit) {
            finalGeneralIds = generalGameIds.slice(0, limit);
        }
        logger.info(
            `Sincronização geral: ${finalGeneralIds.length} jogos a processar (excluindo ${plannedEventGameIds.size} jogos de eventos).`,
        );

        let popularBatchCount = 0;
        if (popularIds.length > 0) {
            let idsToSync = limit ? popularIds.slice(0, limit) : popularIds;
            popularBatchCount = countBatches(idsToSync);
        }

        let eventBatchCount = 0;
        for (const event of events) {
            if (event.games?.length) {
                const gameIds = limit ? event.games.slice(0, limit) : event.games;
                eventBatchCount += countBatches(gameIds);
            }
        }

        totalBatches = popularBatchCount + eventBatchCount + countBatches(finalGeneralIds);
        await reportProgress();

        if (popularIds.length > 0) {
            let idsToSync = popularIds;
            if (limit) {
                idsToSync = idsToSync.slice(0, limit);
            }
            for (let i = 0; i < idsToSync.length; i += batchSize) {
                const batch = idsToSync.slice(i, i + batchSize);
                logger.info(`Processando lote curado de jogos: ${i + 1}-${Math.min(i + batchSize, idsToSync.length)} de ${idsToSync.length}`);
                const batchResult = await processGameBatch(batch, prisma, null, period, includeUndated);
                await addSkipReasons(prisma, 'jogos', batchResult.skipReasons);
                completedBatches++;
                await reportProgress();
                await delay(250);
            }
        }

        if (!undatedOnly) {
        for (const event of events) {
            if (event.games && event.games.length > 0) {
                let gameIds = event.games;
                logger.info(`Evento "${event.name}" (ID: ${event.id}) tem ${gameIds.length} jogos associados.`);
                
                if (limit) {
                    gameIds = gameIds.slice(0, limit);
                    logger.info(`Limitando a sincronização de jogos do evento a ${limit} itens.`);
                }

                for (let i = 0; i < gameIds.length; i += batchSize) {
                    const batch = gameIds.slice(i, i + batchSize);
                    logger.info(`Processando lote de jogos do evento ${event.id}: ${i + 1}-${Math.min(i + batchSize, gameIds.length)} de ${gameIds.length}`);
                    const batchResult = await processGameBatch(batch, prisma, event.id, period, includeUndated);
                    await addSkipReasons(prisma, 'jogos', batchResult.skipReasons);
                    batch.forEach((id: number) => processedEventGameIds.add(id));
                    completedBatches++;
                    await reportProgress();
                    await delay(250);
                }
            }
        }
        }

        if (finalGeneralIds.length === 0) {
            if (undatedOnly) {
                logger.info('Sincronização undated de jogos concluída (sem IDs TBD adicionais).');
            } else {
                logger.info('Nenhum jogo geral para atualizar.');
            }
            return;
        }

        for (let i = 0; i < finalGeneralIds.length; i += batchSize) {
            const batch = finalGeneralIds.slice(i, i + batchSize);
            logger.info(`Processando lote de jogos gerais: ${i + 1}-${Math.min(i + batchSize, finalGeneralIds.length)} de ${finalGeneralIds.length}`);
            const batchResult = await processGameBatch(batch, prisma, null, period, includeUndated);
            await addSkipReasons(prisma, 'jogos', batchResult.skipReasons);
            completedBatches++;
            await reportProgress();
            await delay(250);
        }

        if (undatedOnly) {
            logger.info('Sincronização undated de jogos concluída.');
        }
        
    } catch (error: any) {
        logger.error(`Erro ao sincronizar jogos: ${error.message || error}`);
        throw error;
    }
}

const main = async () => {
    
    const startDate = process.argv[2];
    const endDate = process.argv[3];
    const limit = process.argv[4] ? parseInt(process.argv[4]) : undefined;

    if (!startDate || !endDate) {
        console.error('Uso: ts-node src/syncGames.ts <startDate> <endDate> [limit]');
        process.exit(1);
    }

    try {
        await syncGames(prisma, startDate, endDate, limit);
    } catch (error) {
        logger.error(`Erro fatal na sincronização de jogos: ${error}`);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

if (require.main === module) {
    main();
}