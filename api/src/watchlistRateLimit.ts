import { Response, NextFunction } from 'express';
import type { AuthRequest } from './authMiddleware';

const WINDOW_MS = 60_000;
/** Sess├Áes grandes (fila CR) podem importar 1 item/request; 500/min cobre ~8 req/s. */
const MAX_IMPORTS_PER_WINDOW = 500;
const buckets = new Map<number, { count: number; resetAt: number }>();

export function watchlistImportRateLimit(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const userId = req.user?.userId;
  if (!userId) {
    next();
    return;
  }

  const now = Date.now();
  const bucket = buckets.get(userId);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(userId, { count: 1, resetAt: now + WINDOW_MS });
    next();
    return;
  }

  if (bucket.count >= MAX_IMPORTS_PER_WINDOW) {
    res.status(429).json({ error: 'Limite de importa├º├Áes atingido. Tente novamente em instantes.' });
    return;
  }

  bucket.count += 1;
  next();
}
