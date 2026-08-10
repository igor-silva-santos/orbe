import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { Express, RequestHandler } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

/** Headers de segurança padrão */
export const securityHeaders = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
});

/** Limite geral da API — evita abuso em rotas públicas */
export const apiRateLimiter: RequestHandler = rateLimit({
  windowMs: 60 * 1000,
  max: isProduction ? 300 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas requisições. Tente novamente em instantes.' },
});

/** Limite mais rígido em login/registro */
export const authRateLimiter: RequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 15 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas de autenticação. Aguarde alguns minutos.' },
});

/** Limite em busca/pesquisa */
export const searchRateLimiter: RequestHandler = rateLimit({
  windowMs: 60 * 1000,
  max: isProduction ? 60 : 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas buscas em sequência. Aguarde um momento.' },
});

/** Limite na homepage — payload grande, alvo comum de scraping */
export const homepageRateLimiter: RequestHandler = rateLimit({
  windowMs: 60 * 1000,
  max: isProduction ? 40 : 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas requisições à homepage. Aguarde um momento.' },
});

export function assertJwtSecretConfigured(): void {
  const secret = process.env.JWT_SECRET;
  const isDefault = !secret || secret === 'seu_segredo_jwt_super_secreto';

  if (isProduction && isDefault) {
    throw new Error(
      'JWT_SECRET não configurado ou inseguro. Defina uma chave forte em produção.'
    );
  }

  if (isDefault) {
    console.warn('[segurança] JWT_SECRET padrão em uso — configure antes de produção.');
  }
}

export function applySecurityMiddleware(app: Express): void {
  app.set('trust proxy', 1);
  app.use(securityHeaders);
  app.use('/api', apiRateLimiter);
}
