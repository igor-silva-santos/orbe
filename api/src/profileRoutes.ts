import { Router, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from './clients';
import { logger } from './logger';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import { isStringWithMaxLength, isValidHttpUrl } from './validation';
import { mergePreferenciasOrbe } from './preferenciasOrbe';

const router = Router();

const MAX_NOME_LENGTH = 100;
const MAX_BIO_LENGTH = 1000;
const MAX_AVATAR_LENGTH = 2000;

const profileSelect = {
    id: true,
    email: true,
    nome: true,
    bio: true,
    avatar: true,
    preferencias: true,
    perfil_publico: true,
    role: true,
    quer_avaliar: true,
    data_criacao: true,
} as const;

function withMergedPreferencias<T extends { preferencias: unknown; quer_avaliar: boolean }>(user: T) {
    const { preferencias: _stored, quer_avaliar, ...rest } = user;
    return {
        ...rest,
        quer_avaliar,
        preferencias: mergePreferenciasOrbe(user.preferencias, { querAvaliar: quer_avaliar }),
    };
}

// Buscar perfil do usuário logado
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: profileSelect,
        });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
        res.json(withMergedPreferencias(user));
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
        const existing = await prisma.user.findUnique({
            where: { id: userId },
            select: { preferencias: true, quer_avaliar: true },
        });
        if (!existing) return res.status(404).json({ error: 'Usuário não encontrado.' });

        const updateData: Prisma.UserUpdateInput = {};

        if (nome !== undefined) updateData.nome = nome;
        if (bio !== undefined) updateData.bio = bio;
        if (avatar !== undefined) updateData.avatar = avatar;
        if (perfil_publico !== undefined) updateData.perfil_publico = perfil_publico;

        if (preferencias !== undefined) {
            const mergedIncoming = mergePreferenciasOrbe(
                { ...(existing.preferencias as object | null ?? {}), ...(preferencias as object) },
                { querAvaliar: existing.quer_avaliar },
            );
            updateData.preferencias = mergedIncoming as Prisma.InputJsonValue;
            if (typeof (preferencias as { querAvaliar?: boolean }).querAvaliar === 'boolean') {
                updateData.quer_avaliar = (preferencias as { querAvaliar: boolean }).querAvaliar;
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: profileSelect,
        });
        res.json(withMergedPreferencias(updatedUser));
    } catch (error) {
        logger.error(`Erro ao atualizar perfil ID ${userId}:`, error);
        res.status(500).json({ error: 'Erro ao atualizar perfil.' });
    }
});

export default router;
