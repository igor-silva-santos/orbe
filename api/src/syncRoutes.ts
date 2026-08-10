import { Router } from 'express';
import { logger } from './logger';
import { prisma } from './clients';
import { syncMovies } from './syncMovies';
import { syncSeries } from './syncSeries';
import { syncAnimes } from './syncAnimes';
import { syncGames } from './syncGames';

const router = Router();

const SYNC_SECRET = process.env.SYNC_SECRET || 'super-secret-sync-key';

const protectSync = (req: any, res: any, next: any) => {
  const secret = req.headers['x-sync-secret'] || (req.body && req.body.secret);
  if (secret !== SYNC_SECRET) {
    logger.warn('Tentativa de sincronização não autorizada.');
    return res.status(403).json({ error: 'Não autorizado.' });
  }
  next();
};

router.use('/run-sync', protectSync);
router.use('/run-sync-all', protectSync);

router.post('/run-sync', async (req, res) => {
  const { mediaType, startDate, endDate, startYear, endYear } = req.body;

  if (!mediaType || !((startDate && endDate) || (startYear && endYear))) {
    return res.status(400).json({ error: 'Parâmetros inválidos. Forneça mediaType e (startDate/endDate ou startYear/endYear).' });
  }

  logger.info(`Sincronização manual iniciada para ${mediaType} de ${startDate || startYear} a ${endDate || endYear}`);
  
  res.status(202).json({ message: `Sincronização para ${mediaType} iniciada. Verifique os logs para o progresso.` });

  try {
    switch (mediaType) {
      case 'movies':
        await syncMovies(prisma, startDate, endDate);
        break;
      case 'series':
        await syncSeries(prisma, startDate, endDate);
        break;
      case 'animes': {
        const start = parseInt(startYear);
        const end = parseInt(endYear);
        for (let year = start; year <= end; year++) {
          await syncAnimes(year, ['WINTER', 'SPRING', 'SUMMER', 'FALL']);
        }
        break;
      }
      case 'games':
        await syncGames(prisma, startDate, endDate);
        break;
      default:
        logger.warn(`Tipo de mídia desconhecido para sincronização: ${mediaType}`);
    }
    logger.info(`Sincronização manual para ${mediaType} concluída.`);
  } catch (error) {
    logger.error(`Erro durante a sincronização manual de ${mediaType}:`, error);
  }
});

/** Sincroniza filmes, séries, animes e jogos de 2026 em sequência */
router.post('/run-sync-all', async (req, res) => {
  const startDate = req.body?.startDate || '2026-01-01';
  const endDate = req.body?.endDate || '2026-12-31';
  const startYear = parseInt(req.body?.startYear || '2026', 10);
  const endYear = parseInt(req.body?.endYear || '2026', 10);

  logger.info(`Sincronização completa iniciada: ${startDate} → ${endDate}`);
  res.status(202).json({ message: `Sincronização completa de ${startYear} iniciada. Verifique os logs.` });

  try {
    logger.info('--- FILMES ---');
    await syncMovies(prisma, startDate, endDate);
    logger.info('--- SÉRIES ---');
    await syncSeries(prisma, startDate, endDate);
    logger.info('--- ANIMES ---');
    for (let year = startYear; year <= endYear; year++) {
      await syncAnimes(year, ['WINTER', 'SPRING', 'SUMMER', 'FALL']);
    }
    logger.info('--- JOGOS ---');
    await syncGames(prisma, startDate, endDate);
    logger.info('✅ Sincronização completa concluída.');
  } catch (error) {
    logger.error('Erro na sincronização completa:', error);
  }
});

export default router;
