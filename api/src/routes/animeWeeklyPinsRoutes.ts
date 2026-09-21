import { Router, Response } from 'express';
import { prisma } from '../clients';
import { logger } from '../logger';
import { authMiddleware, type AuthRequest } from '../authMiddleware';
import { mapAnimeToCarouselCard } from '../mappers';
import { parsePositiveIntId, animeCarouselInclude } from './mediaRoutesHelpers';

const router = Router();
const MAX_PINS_PER_USER = 40;

router.get('/animes/weekly-pins', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  try {
    const pins = await prisma.animeWeeklyPin.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    const anilistIds = pins.map((p) => p.anilistId);
    if (anilistIds.length === 0) {
      return res.json({ anilistIds: [], animes: [] });
    }
    const animes = await prisma.anime.findMany({
      where: { anilistId: { in: anilistIds } },
      include: animeCarouselInclude,
    });
    const byId = new Map(animes.map((a) => [a.anilistId, a]));
    const ordered = anilistIds
      .map((id) => byId.get(id))
      .filter((a): a is NonNullable<typeof a> => Boolean(a));
    res.json({
      anilistIds,
      animes: ordered.map((a) => mapAnimeToCarouselCard(a)),
    });
  } catch (error) {
    logger.error(`Erro ao listar weekly pins: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar animes da sua semana.' });
  }
});

router.put('/animes/weekly-pins/:anilistId', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const anilistId = parsePositiveIntId(req.params.anilistId);
  if (!anilistId) {
    return res.status(400).json({ error: 'ID de anime inválido.' });
  }
  try {
    const anime = await prisma.anime.findUnique({ where: { anilistId }, select: { anilistId: true } });
    if (!anime) {
      return res.status(404).json({ error: 'Anime não encontrado no Orbe.' });
    }
    const count = await prisma.animeWeeklyPin.count({ where: { userId } });
    const existing = await prisma.animeWeeklyPin.findUnique({
      where: { userId_anilistId: { userId, anilistId } },
    });
    if (!existing && count >= MAX_PINS_PER_USER) {
      return res.status(400).json({ error: `Limite de ${MAX_PINS_PER_USER} animes na semana.` });
    }
    await prisma.animeWeeklyPin.upsert({
      where: { userId_anilistId: { userId, anilistId } },
      create: { userId, anilistId },
      update: {},
    });
    res.json({ anilistId, pinned: true });
  } catch (error) {
    logger.error(`Erro ao fixar anime na semana: ${error}`);
    res.status(500).json({ error: 'Erro ao fixar anime na semana.' });
  }
});

router.delete('/animes/weekly-pins/:anilistId', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const anilistId = parsePositiveIntId(req.params.anilistId);
  if (!anilistId) {
    return res.status(400).json({ error: 'ID de anime inválido.' });
  }
  try {
    await prisma.animeWeeklyPin.deleteMany({ where: { userId, anilistId } });
    res.json({ anilistId, pinned: false });
  } catch (error) {
    logger.error(`Erro ao remover pin da semana: ${error}`);
    res.status(500).json({ error: 'Erro ao remover anime da semana.' });
  }
});

export default router;
