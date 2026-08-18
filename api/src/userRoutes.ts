import { Router, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { interactionRateLimiter } from './securityMiddleware';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import { isPositiveInt, isValidInteractionStatus, isValidMediaType, isValidRating, isStringWithMaxLength } from './validation';
import {
  isValidDealPreferenceStatus,
  syncDealPreferenceToJogo,
  type DealPreferenceStatus,
} from './dealPreferences';

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

router.get('/me/deal-preferences', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(403).json({ error: 'Usuário não autenticado.' });
    }

    try {
        const preferences = await prisma.preferencias_usuario_oferta.findMany({
            where: { usuario_id: userId },
            orderBy: { data_interacao: 'desc' },
        });
        res.json(preferences);
    } catch (error) {
        logger.error(`Erro ao buscar preferências de oferta para usuário ${userId}:`, error);
        res.status(500).json({ error: 'Erro ao buscar preferências de ofertas.' });
    }
});

router.post('/me/deal-preferences', interactionRateLimiter, authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(403).json({ error: 'Usuário não autenticado.' });
    }

    const { deal_id, status, steam_app_id, platform, title, orbe_game_id } = req.body;

    if (!deal_id || !status) {
        return res.status(400).json({ error: 'deal_id e status são obrigatórios.' });
    }
    if (typeof deal_id !== 'string' || deal_id.length > 120) {
        return res.status(400).json({ error: 'deal_id inválido.' });
    }
    if (!isValidDealPreferenceStatus(status)) {
        return res.status(400).json({ error: 'status inválido.' });
    }
    if (steam_app_id != null && !isPositiveInt(steam_app_id)) {
        return res.status(400).json({ error: 'steam_app_id inválido.' });
    }
    if (orbe_game_id != null && !isPositiveInt(orbe_game_id)) {
        return res.status(400).json({ error: 'orbe_game_id inválido.' });
    }
    if (title != null && !isStringWithMaxLength(title, 300)) {
        return res.status(400).json({ error: 'title inválido.' });
    }
    if (platform != null && !isStringWithMaxLength(platform, 40)) {
        return res.status(400).json({ error: 'platform inválido.' });
    }

    try {
        const preference = await prisma.preferencias_usuario_oferta.upsert({
            where: {
                usuario_oferta_unique: {
                    usuario_id: userId,
                    deal_id: deal_id.trim(),
                },
            },
            update: {
                status,
                steam_app_id: steam_app_id != null ? Number(steam_app_id) : undefined,
                platform: platform?.trim() || undefined,
                title: title?.trim() || undefined,
            },
            create: {
                usuario_id: userId,
                deal_id: deal_id.trim(),
                status,
                steam_app_id: steam_app_id != null ? Number(steam_app_id) : null,
                platform: platform?.trim() || null,
                title: title?.trim() || null,
            },
        });

        await syncDealPreferenceToJogo(userId, {
            deal_id: preference.deal_id,
            status: preference.status as DealPreferenceStatus,
            steam_app_id: preference.steam_app_id,
            platform: preference.platform,
            title: preference.title,
            orbe_game_id: orbe_game_id != null ? Number(orbe_game_id) : null,
        });

        res.status(201).json(preference);
    } catch (error) {
        logger.error(`Erro ao salvar preferência de oferta para usuário ${userId}:`, error);
        res.status(500).json({ error: 'Erro ao salvar preferência de oferta.' });
    }
});

router.delete('/me/deal-preferences/:dealId', interactionRateLimiter, authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(403).json({ error: 'Usuário não autenticado.' });
    }

    const dealId = req.params.dealId?.trim();
    if (!dealId) {
        return res.status(400).json({ error: 'dealId inválido.' });
    }

    try {
        await prisma.preferencias_usuario_oferta.deleteMany({
            where: { usuario_id: userId, deal_id: dealId },
        });
        res.status(204).send();
    } catch (error) {
        logger.error(`Erro ao remover preferência de oferta para usuário ${userId}:`, error);
        res.status(500).json({ error: 'Erro ao remover preferência de oferta.' });
    }
});

export default router;
