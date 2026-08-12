import { Router, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { prisma } from './clients';
import { logger } from './logger';
import { translateSynopsisForStorage, isLikelyEnglish } from './translation';

const router = Router();

const WEBHOOK_SECRET = process.env.IGDB_WEBHOOK_SECRET || 'um-segredo-muito-dificil-de-adivinhar';

/**
 * IGDB verifica a inscrição com um header `X-Secret` contendo o valor configurado no
 * registro do webhook (ver igdbWebhooks.ts) — não é o protocolo Twitch EventSub (sem
 * handshake de challenge, sem assinatura HMAC composta). Se a IGDB tiver mudado esse
 * contrato, o log abaixo com os headers recebidos ajuda a ajustar rapidamente.
 */
const verifyWebhookSecret = (req: Request, res: Response, next: NextFunction) => {
  const providedSecret = req.header('X-Secret');

  if (!providedSecret) {
    logger.warn(`Webhook IGDB sem header X-Secret. Headers recebidos: ${JSON.stringify(req.headers)}`);
    return res.status(403).send('Assinatura ausente.');
  }

  const providedBuf = Buffer.from(providedSecret);
  const expectedBuf = Buffer.from(WEBHOOK_SECRET);
  const isValid = providedBuf.length === expectedBuf.length && crypto.timingSafeEqual(providedBuf, expectedBuf);

  if (!isValid) {
    logger.warn('Webhook IGDB com secret inválido.');
    return res.status(403).send('Assinatura inválida.');
  }

  next();
};

/**
 * Só atualiza jogos que já sincronizamos — o webhook dispara pra todo o catálogo do IGDB,
 * e a maior parte nunca passou pelo filtro de qualidade do sync pra entrar no nosso banco.
 * Não criamos linhas novas a partir do webhook, só mantemos as existentes atualizadas.
 */
const applyGameUpdate = async (gameData: any) => {
  if (!gameData?.id) return;

  const existing = await prisma.jogo.findUnique({ where: { igdbId: gameData.id }, select: { id: true } });
  if (!existing) return;

  const data: Record<string, unknown> = {};
  if (typeof gameData.name === 'string') data.name = gameData.name;
  if (typeof gameData.rating === 'number') data.rating = gameData.rating;
  if (typeof gameData.rating_count === 'number') data.ratingCount = gameData.rating_count;
  if (typeof gameData.hypes === 'number') data.hypes = gameData.hypes;
  if (typeof gameData.follows === 'number') data.follows = gameData.follows;
  if (typeof gameData.first_release_date === 'number') {
    data.firstReleaseDate = new Date(gameData.first_release_date * 1000);
  }
  if (typeof gameData.summary === 'string' && gameData.summary.trim()) {
    data.summary = isLikelyEnglish(gameData.summary)
      ? (await translateSynopsisForStorage(gameData.summary)) ?? gameData.summary
      : gameData.summary;
  }

  if (Object.keys(data).length === 0) return;

  await prisma.jogo.update({ where: { igdbId: gameData.id }, data });
  logger.info(`Jogo [${gameData.id}] "${gameData.name ?? ''}" atualizado via webhook IGDB.`);
};

// Endpoint que recebe as notificações do IGDB (registradas via igdbWebhooks.ts)
router.post('/webhooks/igdb/:endpoint', verifyWebhookSecret, async (req, res) => {
  const { endpoint } = req.params;
  const payload = req.body;

  try {
    if (endpoint === 'games') {
      const games = Array.isArray(payload) ? payload : [payload];
      for (const game of games) {
        await applyGameUpdate(game);
      }
    } else {
      logger.info(`Webhook IGDB recebido para endpoint não tratado: ${endpoint}`);
    }
  } catch (error) {
    logger.error('Erro ao processar webhook IGDB:', error);
  }

  res.status(200).send('OK');
});

export default router;
