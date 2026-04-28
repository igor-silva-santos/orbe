import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_secreto';

interface AuthRequest extends Request {
  user?: { 
    userId: number;
    role: string;
  };
}

// Middleware de Autenticação
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Não autorizado.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, role: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido.' });
    }
};

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
