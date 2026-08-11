import { Router, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { interactionRateLimiter } from './securityMiddleware';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import { isPositiveInt, isValidInteractionStatus, isValidMediaType, isValidRating, isStringWithMaxLength } from './validation';

const router = Router();

const MAX_COMENTARIO_LENGTH = 2000;

// Rota para buscar as interações do usuário logado
router.get('/me/interactions', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(403).json({ error: 'Usuário não autenticado.' });
    }

    try {
        const interactions = await prisma.preferencias_usuario_midia.findMany({
            where: { usuario_id: userId },
        });
        res.json(interactions);
    } catch (error) {
        logger.error(`Erro ao buscar interações para o usuário ID ${userId}:`, error);
        res.status(500).json({ error: 'Erro ao buscar interações.' });
    }
});

// Rota para criar/atualizar uma interação
router.post('/me/interactions', interactionRateLimiter, authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(403).json({ error: 'Usuário não autenticado.' });
    }

    const { midia_id, tipo_midia, status, avaliacao, comentario } = req.body;

    if (!midia_id || !tipo_midia || !status) {
        return res.status(400).json({ error: 'Dados da interação incompletos.' });
    }
    if (!isPositiveInt(midia_id)) {
        return res.status(400).json({ error: 'midia_id inválido.' });
    }
    if (!isValidMediaType(tipo_midia)) {
        return res.status(400).json({ error: 'tipo_midia inválido.' });
    }
    if (!isValidInteractionStatus(status)) {
        return res.status(400).json({ error: 'status inválido.' });
    }
    if (avaliacao != null && !isValidRating(avaliacao)) {
        return res.status(400).json({ error: 'avaliacao inválida.' });
    }
    if (comentario != null && !isStringWithMaxLength(comentario, MAX_COMENTARIO_LENGTH)) {
        return res.status(400).json({ error: `comentario excede o limite de ${MAX_COMENTARIO_LENGTH} caracteres.` });
    }

    try {
        const interaction = await prisma.preferencias_usuario_midia.upsert({
            where: {
                usuario_midia_unique: {
                    usuario_id: userId,
                    midia_id: Number(midia_id),
                    tipo_midia: tipo_midia,
                }
            },
            update: {
                status,
                avaliacao: avaliacao || undefined,
                comentario: comentario || undefined
            },
            create: {
                usuario_id: userId,
                midia_id: Number(midia_id),
                tipo_midia: tipo_midia,
                status: status,
                avaliacao: avaliacao || null,
                comentario: comentario || null
            },
        });
        res.status(201).json(interaction);
    } catch (error) {
        logger.error(`Erro ao salvar interação para o usuário ID ${userId}:`, error);
        res.status(500).json({ error: 'Erro ao salvar interação.' });
    }
});

export default router;
