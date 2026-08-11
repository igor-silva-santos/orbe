import type { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { logger } from './logger';
import { igdbApi, getIgdbAccessToken } from './clients';
import {
  extractSteamAppId,
  fetchSteamAppDetails,
  fetchSteamFeaturedSales,
  fetchSteamMostPlayed,
  fetchSteamCurrentPlayers,
} from './steamClient';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function findJogoBySteamAppId(prisma: PrismaClient, appId: number) {
  return prisma.jogo.findFirst({
    where: {
      OR: [
        { steamAppId: appId },
        { websites: { some: { url: { contains: `steampowered.com/app/${appId}` } } } },
      ],
    },
  });
}

async function resolveIgdbIdByName(name: string): Promise<number | null> {
  try {
    const query = `search "${name.replace(/"/g, '')}"; fields name, id; limit 1;`;
    const response = await igdbApi.post('/games', query);
    const game = response.data?.[0];
    return game?.id ?? null;
  } catch {
    return null;
  }
}

async function enrichJogoWithSteam(
  prisma: PrismaClient,
  jogoId: number,
  appId: number,
  extras?: {
    playerCount?: number;
    priceCents?: number;
    discountPercent?: number;
  },
): Promise<void> {
  const details = await fetchSteamAppDetails(appId);
  if (!details) return;

  await prisma.jogo.update({
    where: { id: jogoId },
    data: {
      steamAppId: appId,
      steamPlayerCount: extras?.playerCount ?? details.playerCount,
      steamPriceCents: extras?.priceCents ?? details.priceCents,
      steamDiscountPercent: extras?.discountPercent ?? details.discountPercent,
      pcRequirements: details.pcRequirements ?? undefined,
      steamSyncedAt: new Date(),
    },
  });
}

/** Vincula steamAppId a partir de websites IGDB já sincronizados */
export async function linkSteamAppIdsFromWebsites(prisma: PrismaClient): Promise<number> {
  const jogos = await prisma.jogo.findMany({
    where: { steamAppId: null },
    include: { websites: true },
    take: 500,
    orderBy: { rating: 'desc' },
  });

  let linked = 0;
  for (const jogo of jogos) {
    for (const site of jogo.websites) {
      const appId = extractSteamAppId(site.url);
      if (!appId) continue;

      const conflict = await prisma.jogo.findUnique({ where: { steamAppId: appId } });
      if (conflict && conflict.id !== jogo.id) break;

      await prisma.jogo.update({
        where: { id: jogo.id },
        data: { steamAppId: appId },
      });
      linked++;
      break;
    }
  }

  logger.info(`Steam: ${linked} jogos vinculados via URL da loja.`);
  return linked;
}

/** Sincroniza promoções e mais jogados da Steam nos jogos do catálogo */
export async function syncSteamData(prisma: PrismaClient): Promise<{
  salesUpdated: number;
  trendingUpdated: number;
  specsUpdated: number;
}> {
  await getIgdbAccessToken();

  let salesUpdated = 0;
  let trendingUpdated = 0;
  let specsUpdated = 0;

  await linkSteamAppIdsFromWebsites(prisma);

  const sales = await fetchSteamFeaturedSales();
  for (const sale of sales.slice(0, 80)) {
    let jogo = await findJogoBySteamAppId(prisma, sale.appId);

    if (!jogo) {
      const igdbId = await resolveIgdbIdByName(sale.name);
      if (igdbId) {
        jogo = await prisma.jogo.findUnique({ where: { igdbId } });
      }
    }

    if (jogo) {
      await enrichJogoWithSteam(prisma, jogo.id, sale.appId, {
        priceCents: sale.priceCents,
        discountPercent: sale.discountPercent,
      });
      salesUpdated++;
    }
    await delay(200);
  }

  const mostPlayed = await fetchSteamMostPlayed();
  for (const entry of mostPlayed.slice(0, 50)) {
    let jogo = await findJogoBySteamAppId(prisma, entry.appId);

    if (!jogo) {
      const details = await fetchSteamAppDetails(entry.appId);
      if (details) {
        const igdbId = await resolveIgdbIdByName(details.name);
        if (igdbId) {
          jogo = await prisma.jogo.findUnique({ where: { igdbId } });
        }
      }
    }

    if (jogo) {
      await enrichJogoWithSteam(prisma, jogo.id, entry.appId, {
        playerCount: entry.playerCount,
      });
      trendingUpdated++;
    }
    await delay(200);
  }

  const pcJogos = await prisma.jogo.findMany({
    where: {
      steamAppId: { not: null },
      OR: [
        { pcRequirements: { equals: Prisma.DbNull } },
        { steamSyncedAt: null },
      ],
    },
    take: 40,
    orderBy: { rating: 'desc' },
  });

  for (const jogo of pcJogos) {
    if (!jogo.steamAppId) continue;
    let playerCount: number | undefined;
    const current = await fetchSteamCurrentPlayers(jogo.steamAppId);
    if (current != null) playerCount = current;

    await enrichJogoWithSteam(prisma, jogo.id, jogo.steamAppId, { playerCount });
    specsUpdated++;
    await delay(300);
  }

  logger.info(
    `Steam sync: promoções=${salesUpdated}, trending=${trendingUpdated}, specs=${specsUpdated}`,
  );

  return { salesUpdated, trendingUpdated, specsUpdated };
}
