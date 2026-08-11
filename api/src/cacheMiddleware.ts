import { Request, Response, NextFunction } from 'express';
import { getRedisClient } from './redisClient';
import { logger } from './logger';

const cacheMiddleware = (duration: number) => async (req: Request, res: Response, next: NextFunction) => {
  // Usar a URL original como chave de cache
  const key = `cache:${req.originalUrl}`;

  try {
    const redisClient = getRedisClient();
    if (!redisClient) {
      logger.warn('Redis client não está disponível. Pulando cache.');
      return next();
    }

    const cachedResponse = await redisClient.get(key);

    if (cachedResponse) {
      logger.info(`Cache HIT para a chave: ${key}`);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('X-Cache', 'HIT');
      return res.send(cachedResponse);
    }

    logger.info(`Cache MISS para a chave: ${key}`);
    res.setHeader('X-Cache', 'MISS');

    // Sobrescrever res.send para interceptar a resposta
    const originalSend = res.send.bind(res);
    res.send = (body: any): Response<any> => {
      try {
        // Só cachear respostas de sucesso — um 5xx transitório não deve ficar
        // "congelado" e ser servido como HIT pra todo mundo até o TTL expirar.
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const client = getRedisClient();
          if (client) {
            client.set(key, body, 'EX', duration);
            logger.info(`Resposta para a chave ${key} armazenada no cache por ${duration} segundos.`);
          } else {
            logger.warn('Redis client não está disponível. Não foi possível salvar no cache.');
          }
        }
      } catch (err) {
        logger.error(`Erro ao salvar no cache: ${err}`);
      }
      return originalSend(body);
    };

    next();

  } catch (err) {
    logger.error(`Erro no middleware de cache: ${err}`);
    // Se o Redis falhar, simplesmente prosseguir sem cache
    next();
  }
};

export default cacheMiddleware;
