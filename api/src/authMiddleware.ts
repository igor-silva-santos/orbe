import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_secreto';

export interface AuthUser {
  userId: number;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

class MissingTokenError extends Error {
  constructor() {
    super('MISSING_TOKEN');
  }
}

/** Extrai e valida o Bearer token do header Authorization. Lança se ausente/inválido/expirado. */
export function verifyBearerToken(authHeader: string | undefined): AuthUser {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new MissingTokenError();
  }
  const token = authHeader.slice('Bearer '.length);
  return jwt.verify(token, JWT_SECRET) as AuthUser;
}

/** Middleware obrigatório — 401 se token ausente/inválido/expirado. */
export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  try {
    req.user = verifyBearerToken(req.headers.authorization);
    next();
  } catch (error) {
    if (error instanceof MissingTokenError) {
      res.status(401).json({ error: 'Token não fornecido.' });
      return;
    }
    res.status(401).json({ error: 'Token inválido.' });
  }
}

export { MissingTokenError };
