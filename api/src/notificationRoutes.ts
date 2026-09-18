import { Router, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import type { Notification } from '@prisma/client';
import { getVapidPublicKey } from './notificationService';
import { isPrismaSchemaError } from './prismaErrors';

const router = Router();

router.get('/notifications/vapid-public-key', (_req, res) => {
  const key = getVapidPublicKey();
  if (!key) {
    return res.status(503).json({ error: 'Push não configurado no servidor.' });
  }
  res.json({ publicKey: key });
});

function mapNotification(n: Notification) {
  return {
    id: n.id,
    type: n.type,
    message: n.message,
    foi_visualizada: n.isRead,
    midia_id: n.relatedMediaId,
    tipo_midia: n.relatedMediaType,
    createdAt: n.createdAt,
  };
}

router.get('/notifications', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json(notifications.map(mapNotification));
  } catch (error) {
    logger.error(`Erro ao buscar notificações do usuário ${userId}:`, error);
    res.status(500).json({ error: 'Erro ao buscar notificações.' });
  }
});

router.put('/notifications/:id/read', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID de notificação inválido.' });
  }

  try {
    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification || notification.userId !== userId) {
      return res.status(404).json({ error: 'Notificação não encontrada.' });
    }

    const updated = await prisma.notification.update({ where: { id }, data: { isRead: true } });
    res.json(mapNotification(updated));
  } catch (error) {
    logger.error(`Erro ao marcar notificação ${id} como lida:`, error);
    res.status(500).json({ error: 'Erro ao atualizar notificação.' });
  }
});

router.put('/notifications/read-all', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  try {
    await prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
    res.status(204).send();
  } catch (error) {
    logger.error(`Erro ao marcar todas notificações como lidas (usuário ${userId}):`, error);
    res.status(500).json({ error: 'Erro ao atualizar notificações.' });
  }
});

router.post('/notifications/subscribe', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { endpoint, keys } = req.body as {
    endpoint?: string;
    keys?: { p256dh?: string; auth?: string };
  };

  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    return res.status(400).json({ error: 'Subscription inválida.' });
  }

  try {
    await prisma.pushSubscription.upsert({
      where: { endpoint },
      create: {
        userId: req.user!.userId,
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
      update: {
        userId: req.user!.userId,
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
    });
    res.status(201).json({ success: true });
  } catch (error) {
    if (isPrismaSchemaError(error)) {
      return res.status(503).json({ error: 'Push indisponível — migração pendente.' });
    }
    logger.error('Erro ao salvar push subscription:', error);
    res.status(500).json({ error: 'Erro ao salvar subscription.' });
  }
});

router.post('/notifications/unsubscribe', authMiddleware, async (req: AuthRequest, res: Response) => {
  const endpoint = req.body?.endpoint as string | undefined;
  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint obrigatório.' });
  }

  try {
    await prisma.pushSubscription.deleteMany({
      where: { endpoint, userId: req.user!.userId },
    });
    res.json({ success: true });
  } catch (error) {
    if (isPrismaSchemaError(error)) {
      return res.status(503).json({ error: 'Push indisponível — migração pendente.' });
    }
    logger.error('Erro ao remover push subscription:', error);
    res.status(500).json({ error: 'Erro ao remover subscription.' });
  }
});

router.delete('/notifications/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID de notificação inválido.' });
  }

  try {
    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification || notification.userId !== userId) {
      return res.status(404).json({ error: 'Notificação não encontrada.' });
    }

    await prisma.notification.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    logger.error(`Erro ao excluir notificação ${id}:`, error);
    res.status(500).json({ error: 'Erro ao excluir notificação.' });
  }
});

export default router;
