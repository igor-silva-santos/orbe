import Redis from 'ioredis';
import { logger } from './logger';

/**
 * Valida REDIS_URL antes de conectar.
 * Erro comum: usar REST URL do Upstash (https://...) em vez da Redis URL (rediss://...).
 */
function parseRedisUrl(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;

  if (value.startsWith('http://') || value.startsWith('https://')) {
    logger.error(
      'REDIS_URL parece ser uma REST URL (https://). No Upstash, use a "Redis URL" com rediss:// — não a REST URL.'
    );
    return null;
  }

  try {
    const parsed = new URL(value);
    if (!parsed.hostname || parsed.hostname === '/') {
      logger.error(
        'REDIS_URL inválida: hostname ausente. Copie a Redis URL completa do Upstash (ex.: rediss://default:TOKEN@host.upstash.io:6379).'
      );
      return null;
    }
    if (!['redis:', 'rediss:'].includes(parsed.protocol)) {
      logger.error(
        `REDIS_URL deve começar com redis:// ou rediss:// (recebido: ${parsed.protocol}).`
      );
      return null;
    }
    return value;
  } catch {
    logger.error(
      'REDIS_URL inválida. Formato esperado: rediss://default:SENHA@endpoint.upstash.io:6379'
    );
    return null;
  }
}

const redisUrl = parseRedisUrl(process.env.REDIS_URL);

let redisClient: Redis | null = null;

if (redisUrl) {
  redisClient = new Redis(redisUrl, {
    maxRetriesPerRequest: 2,
    lazyConnect: true,
    enableOfflineQueue: false,
    retryStrategy(times) {
      if (times > 3) {
        logger.error(
          'Redis: desistindo após 3 tentativas. Verifique REDIS_URL no Render (Redis URL do Upstash, não REST).'
        );
        return null;
      }
      return Math.min(times * 500, 2000);
    },
    ...(redisUrl.startsWith('rediss://') ? { tls: {} } : {}),
  });

  redisClient
    .connect()
    .then(() => {
      logger.info('Conectado ao Redis com sucesso.');
    })
    .catch((err) => {
      logger.error('Falha ao conectar ao Redis:', err);
      redisClient?.disconnect();
      redisClient = null;
    });

  redisClient.on('error', (err) => {
    // Evita flood — a mensagem principal já foi logada no connect().catch
    if (redisClient) {
      logger.warn(`Redis erro: ${err.message}`);
    }
  });
} else if (process.env.REDIS_URL?.trim()) {
  logger.warn('REDIS_URL definida mas inválida — cache Redis desabilitado.');
} else {
  logger.warn('REDIS_URL não está definido. O cache Redis será desabilitado.');
}

export default redisClient;
