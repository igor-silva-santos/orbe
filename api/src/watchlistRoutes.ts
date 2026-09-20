import { Router, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import { isStringWithMaxLength } from './validation';
import {
  buildWatchlistPayloadFromCrunchyroll,
  type CrunchyrollScrapedItem,
} from './crunchyrollWatchlistService';
import { compareQueueStatus, type WatchlistQueueStatus } from './crunchyrollStatus';
import { mapAnimeToMidia } from './mappers';
import { animeCarouselInclude } from './routes/mediaRoutesHelpers';

const router = Router();
const WATCHLIST_SYNC_MAX_ITEMS = 500;
const MAX_FIELD_LENGTH = 500;
const MAX_LISTS_ITEMS = 50;

function isValidWatchlistItem(item: any): boolean {
  if (!item || typeof item !== 'object') return false;
  if (typeof item.id !== 'string' || item.id.length === 0 || item.id.length > 200) return false;
  if (item.title != null && !isStringWithMaxLength(item.title, MAX_FIELD_LENGTH)) return false;
  if (item.q != null && !isStringWithMaxLength(item.q, MAX_FIELD_LENGTH)) return false;
  if (item.st != null && !isStringWithMaxLength(item.st, MAX_FIELD_LENGTH)) return false;
  if (item.status != null && !isStringWithMaxLength(item.status, MAX_FIELD_LENGTH)) return false;
  if (item.note != null && !isStringWithMaxLength(item.note, 5000)) return false;
  if (item.badge != null && !isStringWithMaxLength(item.badge, MAX_FIELD_LENGTH)) return false;
  if (item.badgeLabel != null && !isStringWithMaxLength(item.badgeLabel, MAX_FIELD_LENGTH)) return false;
  if (item.lists != null) {
    if (!Array.isArray(item.lists) || item.lists.length > MAX_LISTS_ITEMS) return false;
    if (!item.lists.every((l: unknown) => typeof l === 'string' && l.length <= MAX_FIELD_LENGTH)) return false;
  }
  return true;
}

function mapItemToWatchlistData(userId: number, item: any) {
  return {
    userId,
    id: item.id,
    malId: item.malId ?? null,
    anilistId: item.anilistId ?? null,
    tmdbId: item.tmdbId ?? null,
    crunchyrollId: item.crunchyrollId ?? null,
    title: item.title || item.q || null,
    ep: item.ep ?? 0,
    season: item.s ?? item.season ?? 1,
    dub: item.dub ?? 0,
    st: item.st || item.status || 'comecar',
    lists: item.lists || [],
    note: item.note ?? null,
    badge: item.badge ?? null,
    badgeLabel: item.badgeLabel ?? null,
    updatedAt: new Date(item.updatedAt || Date.now()),
    isRemoved: item._rm || false,
  };
}

async function upsertWatchlistItems(userId: number, items: any[]) {
  const operations = items.map((item) => {
    const data = mapItemToWatchlistData(userId, item);
    return prisma.watchlistItem.upsert({
      where: { userId_id: { userId, id: item.id } },
      update: data,
      create: data,
    });
  });

  const BATCH_SIZE = 50;
  for (let i = 0; i < operations.length; i += BATCH_SIZE) {
    await prisma.$transaction(operations.slice(i, i + BATCH_SIZE));
  }
}

// Sincronizar itens do Watchlist (Bulk Upsert)
router.post('/watchlist/sync', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { items } = req.body; // Array de itens do IndexedDB
  const userId = req.user!.userId;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Items deve ser um array' });
  }

  if (items.length > WATCHLIST_SYNC_MAX_ITEMS) {
    return res.status(400).json({
      error: `Limite de ${WATCHLIST_SYNC_MAX_ITEMS} itens por sincronização.`,
    });
  }

  if (!items.every(isValidWatchlistItem)) {
    return res.status(400).json({ error: 'Um ou mais itens da watchlist têm formato inválido.' });
  }

  try {
    logger.info(`Sincronizando ${items.length} itens para o usuário ${userId}`);

    await upsertWatchlistItems(userId, items);

    res.json({ success: true, count: items.length });
  } catch (error) {
    logger.error(`Erro ao sincronizar watchlist: ${error}`);
    res.status(500).json({ error: 'Erro interno ao sincronizar' });
  }
});

router.post('/watchlist/crunchyroll/sync', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { items, trackPtBrDub } = req.body as {
    items?: CrunchyrollScrapedItem[];
    trackPtBrDub?: boolean;
  };

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items deve ser um array' });
  }
  if (items.length > WATCHLIST_SYNC_MAX_ITEMS) {
    return res.status(400).json({ error: `Limite de ${WATCHLIST_SYNC_MAX_ITEMS} itens.` });
  }

  try {
    const payloads = await buildWatchlistPayloadFromCrunchyroll(items, {
      trackPtBrDub: Boolean(trackPtBrDub),
    });
    await upsertWatchlistItems(userId, payloads);
    res.json({ success: true, count: payloads.length, skipped: items.length - payloads.length });
  } catch (error) {
    logger.error(`Erro ao sincronizar fila Crunchyroll: ${error}`);
    res.status(500).json({ error: 'Erro ao sincronizar fila Crunchyroll.' });
  }
});

const FILA_STATUS_LABEL: Record<string, string> = {
  continuar: 'Continuar',
  a_seguir: 'A seguir',
  comecar: 'Começar',
  assistir_de_novo: 'Assistir de novo',
  concluido: 'Concluído',
  esperando_dublagem: 'Aguardando dublagem PT-BR',
  esperando_episodio: 'Aguardando novo episódio',
};

router.get('/watchlist/fila-animes', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  try {
    const rows = await prisma.watchlistItem.findMany({
      where: {
        userId,
        isRemoved: false,
        lists: { has: 'crunchyroll' },
      },
    });

    const sorted = [...rows].sort((a, b) => {
      const sa = (a.st as WatchlistQueueStatus) || 'comecar';
      const sb = (b.st as WatchlistQueueStatus) || 'comecar';
      const byStatus = compareQueueStatus(sa, sb);
      if (byStatus !== 0) return byStatus;
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    });

    const anilistIds = sorted.map((r) => r.anilistId).filter((id): id is number => typeof id === 'number');
    const animes = anilistIds.length
      ? await prisma.anime.findMany({
          where: { anilistId: { in: anilistIds } },
          include: animeCarouselInclude,
        })
      : [];
    const animeById = new Map(animes.map((a) => [a.anilistId, mapAnimeToMidia(a)]));

    res.json({
      items: sorted.map((row) => ({
        ...row,
        statusLabel: FILA_STATUS_LABEL[row.st] ?? row.st,
        anime: row.anilistId ? animeById.get(row.anilistId) ?? null : null,
      })),
    });
  } catch (error) {
    logger.error(`Erro ao buscar fila de animes: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar fila de animes.' });
  }
});

// Buscar todos os itens da watchlist do usuário
router.get('/watchlist', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const items = await prisma.watchlistItem.findMany({
      where: {
        userId: req.user!.userId,
        isRemoved: false
      },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar watchlist' });
  }
});

export default router;
