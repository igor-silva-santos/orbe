import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import jwt from 'jsonwebtoken';
import { commentRateLimiter } from './securityMiddleware';

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

const VALID_MEDIA_TYPES = ['filme', 'serie', 'anime', 'jogo'];

// Listar comentários de uma mídia
router.get('/comments/:tipo/:id', async (req: Request, res: Response) => {
    const { tipo, id } = req.params;

    if (!VALID_MEDIA_TYPES.includes(tipo)) {
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

export default router;
