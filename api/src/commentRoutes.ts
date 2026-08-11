import { Router, Request, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { commentRateLimiter } from './securityMiddleware';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import { isPositiveInt, isStringWithMaxLength, isValidMediaType } from './validation';

const router = Router();

const MAX_TEXTO_LENGTH = 3000;

// Listar comentários de uma mídia
router.get('/comments/:tipo/:id', async (req: Request, res: Response) => {
    const { tipo, id } = req.params;

    if (!isValidMediaType(tipo)) {
        return res.status(400).json({ error: 'Tipo de mídia inválido.' });
    }

    const midiaId = Number(id);
    if (!Number.isInteger(midiaId) || midiaId <= 0) {
        return res.status(400).json({ error: 'ID de mídia inválido.' });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: {
                tipo_midia: tipo,
                midia_id: midiaId
            },
            include: {
                usuario: {
                    select: {
                        nome: true,
                        avatar: true
                    }
                }
            },
            orderBy: { data_criacao: 'desc' }
        });
        res.json(comments);
    } catch (error) {
        logger.error(`Erro ao buscar comentários para ${tipo} ID ${id}:`, error);
        res.status(500).json({ error: 'Erro ao buscar comentários.' });
    }
});

// Criar um novo comentário
router.post('/comments', commentRateLimiter, authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    const { midia_id, tipo_midia, texto, spoiler } = req.body;

    if (!midia_id || !tipo_midia || !texto) {
        return res.status(400).json({ error: 'Dados incompletos para o comentário.' });
    }
    if (!isPositiveInt(midia_id)) {
        return res.status(400).json({ error: 'midia_id inválido.' });
    }
    if (!isValidMediaType(tipo_midia)) {
        return res.status(400).json({ error: 'tipo_midia inválido.' });
    }
    if (!isStringWithMaxLength(texto, MAX_TEXTO_LENGTH) || texto.trim().length === 0) {
        return res.status(400).json({ error: `texto inválido ou excede o limite de ${MAX_TEXTO_LENGTH} caracteres.` });
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                usuario_id: userId!,
                midia_id: Number(midia_id),
                tipo_midia,
                texto,
                spoiler: spoiler || false
            },
            include: {
                usuario: {
                    select: {
                        nome: true,
                        avatar: true
                    }
                }
            }
        });
        res.status(201).json(comment);
    } catch (error) {
        logger.error(`Erro ao criar comentário para o usuário ID ${userId}:`, error);
        res.status(500).json({ error: 'Erro ao criar comentário.' });
    }
});

// Excluir um comentário — autor do comentário ou admin
router.delete('/comments/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    const role = req.user?.role;
    const commentId = Number(req.params.id);

    if (!Number.isInteger(commentId) || commentId <= 0) {
        return res.status(400).json({ error: 'ID de comentário inválido.' });
    }

    try {
        const comment = await prisma.comment.findUnique({ where: { id: commentId } });
        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        if (comment.usuario_id !== userId && role !== 'admin') {
            return res.status(403).json({ error: 'Você não tem permissão para excluir este comentário.' });
        }

        await prisma.comment.delete({ where: { id: commentId } });
        res.status(204).send();
    } catch (error) {
        logger.error(`Erro ao excluir comentário ID ${commentId}:`, error);
        res.status(500).json({ error: 'Erro ao excluir comentário.' });
    }
});

export default router;
