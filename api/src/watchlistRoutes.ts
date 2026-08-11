import { Router, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import { isStringWithMaxLength } from './validation';

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

    // Usamos uma transação para garantir consistência
    const operations = items.map((item: any) => {
      const data = {
        userId,
        id: item.id,
        malId: item.malId || null,
        tmdbId: item.tmdbId || null,
        title: item.title || item.q || null,
        ep: item.ep || 0,
        season: item.s || item.season || 1,
        dub: item.dub || 0,
        st: item.st || item.status || 'comecar',
        lists: item.lists || [],
        note: item.note || null,
        badge: item.badge || null,
        badgeLabel: item.badgeLabel || null,
        updatedAt: new Date(item.updatedAt || Date.now()),
        isRemoved: item._rm || false,
      };

      return prisma.watchlistItem.upsert({
        where: {
          userId_id: { userId, id: item.id }
        },
        update: data,
        create: data,
      });
    });

    await Promise.all(operations);

    res.json({ success: true, count: items.length });
  } catch (error) {
    logger.error(`Erro ao sincronizar watchlist: ${error}`);
    res.status(500).json({ error: 'Erro interno ao sincronizar' });
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
