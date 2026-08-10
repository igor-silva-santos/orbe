import './loadEnv';

import { PrismaClient } from '@prisma/client';
import { prisma } from './clients';
import { igdbApi, getIgdbAccessToken } from './clients';
import { logger } from './logger';
import { isJogoRelevantForSync } from './qualityFilters';
import { isLikelyEnglish, translateSynopsisForStorage } from './translation';
import { updateSyncProgress } from './syncState';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
                `fields id, rating, rating_count; where rating >= 50 & category = 0; limit ${limit}; offset ${offset}; sort rating desc;`
            ));

            const games = response.data;
            if (games && games.length > 0) {
                for (const game of games) {
                    if (game.id && isJogoRelevantForSync({ rating: game.rating, ratingCount: game.rating_count })) {
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
        logger.error(`Erro ao buscar jogos populares: ${error.message || error}`);
        return [];
    }
}

async function processGameBatch(gameIds: number[], prisma: PrismaClient, eventId: number | null = null): Promise<void> {
    if (gameIds.length === 0) return;

    const query = `
        fields name, summary, cover.url, first_release_date, rating, rating_count,
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
               game_engines.name, game_engines.slug, game_engines.id,
               release_dates.date, release_dates.region;
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
                if (!isJogoRelevantForSync({ rating: game.rating, ratingCount: game.rating_count })) {
                    logger.info(
                      `⏭️ Jogo [${game.id}] "${game.name}" ignorado: critérios de sync ` +
                      `(rating=${game.rating ?? 0}).`
                    );
                    continue;
                }

                const brReleaseDate = game.release_dates?.find((rd: any) => rd.region === 2)?.date;
                const firstReleaseDate = brReleaseDate ? new Date(brReleaseDate * 1000) : (game.first_release_date ? new Date(game.first_release_date * 1000) : null);
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

                const updateData = {
                    name: game.name,
                    summary: isLikelyEnglish(game.summary)
                      ? (await translateSynopsisForStorage(game.summary)) ?? game.summary
                      : game.summary,
                    cover: coverUrl,
                    firstReleaseDate: firstReleaseDate,
                    rating: game.rating,
                    ...(eventId && { event: { connect: { igdbId: eventId } } })
                };

                const createData = {
                    ...updateData,
                    igdbId: game.id,
                    genres: { create: game.genres?.map((genre: any) => ({ genero: { connectOrCreate: { where: { igdbId: genre.id }, create: { igdbId: genre.id, name: genre.name } } } })) ?? [] },
                    companies: { create: companiesToCreate },
                    platforms: { create: game.platforms?.map((platform: any) => ({ plataforma: { connectOrCreate: { where: { igdbId: platform.id }, create: { igdbId: platform.id, name: platform.name } } } })) ?? [] },
                    themes: { create: game.themes?.map((theme: any) => ({ theme: { connectOrCreate: { where: { igdbId: theme.id }, create: { igdbId: theme.id, name: theme.name } } } })) ?? [] },
                    playerPerspectives: { create: game.player_perspectives?.map((persp: any) => ({ perspective: { connectOrCreate: { where: { igdbId: persp.id }, create: { igdbId: persp.id, name: persp.name } } } })) ?? [] },
                    screenshots: { create: game.screenshots?.map((ss: any) => ({ igdbId: ss.id, url: `https:${ss.url.replace('t_thumb', 't_screenshot_huge')}`.replace('https://images.igdb.com/igdb/image/upload', '/api/images/igdb') })) ?? [] },
                    artworks: { create: game.artworks?.map((art: any) => ({ igdbId: art.id, url: `https:${art.url.replace('t_thumb', 't_1080p')}`.replace('https://images.igdb.com/igdb/image/upload', '/api/images/igdb') })) ?? [] },
                    websites: { create: game.websites?.filter((w: any) => w.category != null).map((w: any) => ({ url: w.url, category: w.category, igdbId: w.id })) ?? [] },
                    videos: { create: game.videos?.map((video: any) => ({ key: video.video_id, name: video.name || '', site: 'YouTube', type: 'Trailer', official: true })) ?? [] },
                    gameModes: { create: game.game_modes?.map((mode: any) => ({ gameMode: { connectOrCreate: { where: { id: mode.id }, create: { id: mode.id, name: mode.name, slug: mode.slug } } } })) ?? [] },
                    gameEngines: { create: game.game_engines?.map((engine: any) => ({ gameEngine: { connectOrCreate: { where: { id: engine.id }, create: { id: engine.id, name: engine.name, slug: engine.slug } } } })) ?? [] },
                };

                const existingGame = await prisma.jogo.findUnique({ where: { igdbId: game.id } });

                await prisma.jogo.upsert({
                    where: { igdbId: game.id },
                    update: updateData,
                    create: createData,
                });

                logger.info(`${existingGame ? '🔄' : '✅'} Jogo [${game.id}] "${game.name}" sincronizado.`);

            } catch (error) {
                logger.error(`❌ Erro ao processar o jogo ID ${game.id}. Pulando: ${error}`);
            }
        }
    } catch (error: any) {
        logger.error(`❌ Erro ao processar o lote de jogos IDs ${gameIds.join(',')}. Pulando: ${error.message || error}`);
    }
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
                `fields id; where first_release_date >= ${startDate} & first_release_date <= ${endDate} & release_dates.region = 2; limit ${limit}; offset ${offset}; sort id asc;`
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
        logger.error(`Erro ao buscar IDs de jogos: ${error.message || error}`);
        return [];
    }
}


export async function syncGames(prisma: PrismaClient, startDate?: string, endDate?: string, limit?: number) {
    const startDateArg = startDate || process.argv[2];
    const endDateArg = endDate || process.argv[3];

    if (!startDateArg || !endDateArg) {
        logger.error('Datas de início e fim são necessárias para a sincronização de jogos.');
        return;
    }

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

        const popularIds = await fetchPopularGameIds();
        const batchSize = 100;
        const countBatches = (ids: number[]) => Math.ceil(ids.length / batchSize) || 0;

        const events = await fetchAndSyncEvents(prisma, startDateArg, endDateArg);
        const processedEventGameIds = new Set<number>();
        const plannedEventGameIds = new Set<number>();

        let allGameIds = await fetchAllGameIdsForPeriod(startDateArg, endDateArg);
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
                await processGameBatch(batch, prisma);
                completedBatches++;
                await reportProgress();
                await delay(250);
            }
        }

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
                    await processGameBatch(batch, prisma, event.id);
                    batch.forEach((id: number) => processedEventGameIds.add(id));
                    completedBatches++;
                    await reportProgress();
                    await delay(250);
                }
            }
        }

        if (finalGeneralIds.length === 0) {
            logger.info('Nenhum jogo geral para atualizar.');
            return;
        }

        for (let i = 0; i < finalGeneralIds.length; i += batchSize) {
            const batch = finalGeneralIds.slice(i, i + batchSize);
            logger.info(`Processando lote de jogos gerais: ${i + 1}-${Math.min(i + batchSize, finalGeneralIds.length)} de ${finalGeneralIds.length}`);
            await processGameBatch(batch, prisma);
            completedBatches++;
            await reportProgress();
            await delay(250);
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