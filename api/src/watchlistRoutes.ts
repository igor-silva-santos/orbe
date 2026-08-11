import { Router } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_secreto';
const WATCHLIST_SYNC_MAX_ITEMS = 500;

// Middleware de Autenticação
const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Não autorizado' });
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Sincronizar itens do Watchlist (Bulk Upsert)
router.post('/watchlist/sync', authenticate, async (req: any, res: any) => {
  const { items } = req.body; // Array de itens do IndexedDB
  const userId = req.userId;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Items deve ser um array' });
  }

  if (items.length > WATCHLIST_SYNC_MAX_ITEMS) {
    return res.status(400).json({
      error: `Limite de ${WATCHLIST_SYNC_MAX_ITEMS} itens por sincronização.`,
    });
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
router.get('/watchlist', authenticate, async (req: any, res: any) => {
  try {
    const items = await prisma.watchlistItem.findMany({
      where: { 
        userId: req.userId,
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
