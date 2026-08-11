import Redis from 'ioredis';
import { logger } from './logger';

function parseRedisUrl(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;

  if (value.startsWith('http://') || value.startsWith('https://')) {
    logger.error(
      'REDIS_URL parece ser REST URL (https://). Use a Redis URL do Upstash (rediss://...).'
    );
    return null;
  }

  try {
    const parsed = new URL(value);
    if (!parsed.hostname || parsed.hostname === '/') {
      logger.error('REDIS_URL inválida: hostname ausente.');
      return null;
    }
    if (!['redis:', 'rediss:'].includes(parsed.protocol)) {
      logger.error(`REDIS_URL deve usar redis:// ou rediss:// (recebido: ${parsed.protocol}).`);
      return null;
    }
    return value;
  } catch {
    logger.error('REDIS_URL inválida. Formato: rediss://default:TOKEN@host.upstash.io:6379');
    return null;
  }
}

const redisUrl = parseRedisUrl(process.env.REDIS_URL);

// Estado privado do módulo — nunca exportado diretamente. Consumidores devem chamar
// getRedisClient() a cada uso em vez de importar o binding, porque uma falha de conexão
// pode zerar essa variável depois que o módulo já carregou (ver connect().catch abaixo);
// um `import redisClient from './redisClient'` guarda só o snapshot do valor no momento
// do import (CommonJS), então nunca veria essa reatribuição.
let redisClientInstance: Redis | null = null;

if (redisUrl) {
  redisClientInstance = new Redis(redisUrl, {
    maxRetriesPerRequest: 2,
    lazyConnect: true,
    enableOfflineQueue: false,
    retryStrategy(times) {
      if (times > 3) return null;
      return Math.min(times * 500, 2000);
    },
    ...(redisUrl.startsWith('rediss://') ? { tls: {} } : {}),
  });

  redisClientInstance
    .connect()
    .then(() => logger.info('Conectado ao Redis com sucesso.'))
    .catch((err) => {
      logger.error('Falha ao conectar ao Redis:', err);
      redisClientInstance?.disconnect();
      redisClientInstance = null;
    });

  redisClientInstance.on('error', (err) => {
    if (redisClientInstance) logger.warn(`Redis: ${err.message}`);
  });
} else if (process.env.REDIS_URL?.trim()) {
  logger.warn('REDIS_URL definida mas inválida — cache desabilitado.');
} else {
  logger.warn('REDIS_URL não está definido. O cache Redis será desabilitado.');
}

/** Sempre chamar isto no ponto de uso — nunca guardar o retorno num binding de módulo. */
export function getRedisClient(): Redis | null {
  return redisClientInstance;
}
