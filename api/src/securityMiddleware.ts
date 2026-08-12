import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { Express, RequestHandler } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Só existe pra dev local sem .env configurado. Qualquer ambiente alcançável pela rede deve
 * configurar os secrets de verdade — não confiamos só em NODE_ENV==='production' bater
 * exatamente, porque um typo ou um staging exposto à internet com NODE_ENV diferente
 * herdaria os defaults hardcoded deste arquivo sem nenhum erro, só um warning no log.
 */
const allowInsecureDevSecrets = process.env.ALLOW_INSECURE_DEV_SECRETS === 'true';

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

/** Detalhes ao vivo — dispara TMDB/IGDB/AniList/Steam/MyMemory */
export const detailsRateLimiter: RequestHandler = rateLimit({
  windowMs: 60 * 1000,
  max: isProduction ? 30 : 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas requisições de detalhes. Aguarde um momento.' },
});

/** Sync manual — operações pesadas no servidor */
export const syncRateLimiter: RequestHandler = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: isProduction ? 6 : 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Limite de sincronizações atingido. Tente mais tarde.' },
});

/** Interações do usuário (status, avaliação) */
export const interactionRateLimiter: RequestHandler = rateLimit({
  windowMs: 60 * 1000,
  max: isProduction ? 30 : 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas interações em sequência. Aguarde um momento.' },
});

/** Formulário de contato — público, sem autenticação, alvo comum de spam */
export const contactRateLimiter: RequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 5 : 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas mensagens enviadas. Aguarde alguns minutos antes de tentar novamente.' },
});

export function assertJwtSecretConfigured(): void {
  const secret = process.env.JWT_SECRET;
  const isDefault = !secret || secret === 'seu_segredo_jwt_super_secreto';

  if (isDefault && !allowInsecureDevSecrets) {
    throw new Error(
      'JWT_SECRET não configurado ou inseguro. Defina uma chave forte, ' +
      'ou ALLOW_INSECURE_DEV_SECRETS=true só em desenvolvimento local.'
    );
  }

  if (isDefault) {
    console.warn('[segurança] JWT_SECRET padrão em uso — configure antes de produção.');
  }
}

const DEFAULT_IGDB_WEBHOOK_SECRET = 'um-segredo-muito-dificil-de-adivinhar';

/** Webhooks IGDB são opcionais — só ative com IGDB_WEBHOOKS_ENABLED=true */
export function isIgdbWebhooksEnabled(): boolean {
  return process.env.IGDB_WEBHOOKS_ENABLED === 'true';
}

export function assertIgdbWebhookSecretConfigured(): void {
  if (!isIgdbWebhooksEnabled()) return;

  const secret = process.env.IGDB_WEBHOOK_SECRET;
  const isDefault = !secret || secret === DEFAULT_IGDB_WEBHOOK_SECRET;

  if (isDefault && !allowInsecureDevSecrets) {
    throw new Error(
      'IGDB_WEBHOOK_SECRET não configurado ou inseguro. Defina uma chave forte, ' +
      'ou ALLOW_INSECURE_DEV_SECRETS=true só em desenvolvimento local.'
    );
  }

  if (isDefault) {
    console.warn(
      '[segurança] IGDB_WEBHOOK_SECRET padrão em uso — configure antes de produção.'
    );
  }
}

export function resolveCorsOptions(): {
  origin: string | string[] | boolean;
  credentials: boolean;
} {
  const corsOrigin = process.env.CORS_ORIGIN?.trim();

  if (isProduction) {
    if (!corsOrigin || corsOrigin === '*') {
      throw new Error(
        'CORS_ORIGIN deve ser uma lista explícita de origens em produção (não use *).'
      );
    }
    return {
      origin: corsOrigin.split(',').map((o) => o.trim()).filter(Boolean),
      credentials: true,
    };
  }

  if (!corsOrigin || corsOrigin === '*') {
    return { origin: true, credentials: true };
  }

  return {
    origin: corsOrigin.split(',').map((o) => o.trim()).filter(Boolean),
    credentials: true,
  };
}

export function applySecurityMiddleware(app: Express): void {
  app.set('trust proxy', 1);
  app.use(securityHeaders);
  app.use('/api', apiRateLimiter);
}
