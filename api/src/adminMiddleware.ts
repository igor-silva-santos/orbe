import { Response, NextFunction } from 'express';
import { logger } from './logger';
import { verifyBearerToken, MissingTokenError, type AuthRequest } from './authMiddleware';

const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = verifyBearerToken(req.headers.authorization);

    if (user.role !== 'admin') {
      logger.warn(`Usuário (ID: ${user.userId}) sem permissão de admin tentou acessar rota protegida.`);
      return res.status(403).json({ error: 'Acesso proibido. Requer permissão de administrador.' });
    }

    req.user = user;
    logger.info(`Acesso de admin concedido para o usuário (ID: ${user.userId})`);
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
