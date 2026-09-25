import { Response, NextFunction } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { verifyBearerToken, MissingTokenError, type AuthRequest } from './authMiddleware';
import { ensureUserAdminFromEnv } from './adminFromEnv';

/** Valida JWT e confere papel admin no banco (inclui ORBE_ADMIN_EMAILS). */
const adminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tokenUser = verifyBearerToken(req.headers.authorization);

    const record = await prisma.user.findUnique({
      where: { id: tokenUser.userId },
      select: { id: true, email: true, role: true },
    });
    if (!record) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const effective = await ensureUserAdminFromEnv(prisma, record);
    if (effective.role !== 'admin') {
      logger.warn(`Usuário (ID: ${tokenUser.userId}) sem permissão de admin tentou acessar rota protegida.`);
      return res.status(403).json({ error: 'Acesso proibido. Requer permissão de administrador.' });
    }

    req.user = { userId: effective.id, role: effective.role };
    next();
  } catch (error) {
    if (error instanceof MissingTokenError) {
      logger.warn('Tentativa de acesso admin sem token de autorização.');
      return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }
    logger.error('Erro na verificação do token de admin:', error);
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};

export default adminMiddleware;
