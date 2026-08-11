import { Router, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import { isStringWithMaxLength, isValidHttpUrl } from './validation';

const router = Router();

const MAX_NOME_LENGTH = 100;
const MAX_BIO_LENGTH = 1000;
const MAX_AVATAR_LENGTH = 2000;

// Buscar perfil do usuário logado
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                nome: true,
                bio: true,
                avatar: true,
                preferencias: true,
                perfil_publico: true,
                role: true,
                data_criacao: true
            }
        });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
        res.json(user);
    } catch (error) {
        logger.error(`Erro ao buscar perfil ID ${userId}:`, error);
        res.status(500).json({ error: 'Erro ao buscar perfil.' });
    }
});

// Atualizar perfil do usuário
router.patch('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    const { nome, bio, avatar, preferencias, perfil_publico } = req.body;

    if (nome != null && !isStringWithMaxLength(nome, MAX_NOME_LENGTH)) {
        return res.status(400).json({ error: `nome excede o limite de ${MAX_NOME_LENGTH} caracteres.` });
    }
    if (bio != null && !isStringWithMaxLength(bio, MAX_BIO_LENGTH)) {
        return res.status(400).json({ error: `bio excede o limite de ${MAX_BIO_LENGTH} caracteres.` });
    }
    if (avatar != null && avatar !== '' && (!isStringWithMaxLength(avatar, MAX_AVATAR_LENGTH) || !isValidHttpUrl(avatar))) {
        return res.status(400).json({ error: 'avatar deve ser uma URL http(s) válida.' });
    }
    if (perfil_publico != null && typeof perfil_publico !== 'boolean') {
        return res.status(400).json({ error: 'perfil_publico deve ser um booleano.' });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                nome,
                bio,
                avatar,
                preferencias,
                perfil_publico
            },
            select: {
                id: true,
                email: true,
                nome: true,
                bio: true,
                avatar: true,
                preferencias: true,
                perfil_publico: true
            }
        });
        res.json(updatedUser);
    } catch (error) {
        logger.error(`Erro ao atualizar perfil ID ${userId}:`, error);
        res.status(500).json({ error: 'Erro ao atualizar perfil.' });
    }
});

export default router;
