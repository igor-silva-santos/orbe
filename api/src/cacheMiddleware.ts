import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { getRedisClient } from './redisClient';
import { logger } from './logger';

// Tempo (segundos) que o lock de recomputo fica ativo. Curto o bastante pra nao
// travar requests legitimos por muito tempo caso o processo que segura o lock
// morra no meio do caminho (crash, timeout, deploy) antes do finally liberar o lock.
const LOCK_TTL_SECONDS = 30;

// Quantas vezes (e com que intervalo) um request "seguidor" espera o lider
// terminar de recalcular antes de desistir e computar por conta propria.
const POLL_ATTEMPTS = 3;
const POLL_INTERVAL_MS = 300;

// So libera o lock se ele ainda pertencer a este request (compara o token antes
// de apagar). Evita que um request derrube o lock de outro processo que ja pegou
// a mesma chave depois que o TTL deste expirou (ex.: o lider morreu no meio).
const RELEASE_LOCK_SCRIPT = `
if redis.call("GET", KEYS[1]) == ARGV[1] then
  return redis.call("DEL", KEYS[1])
else
  return 0
end
`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Incrementar ao mudar filtros de carrossel/listagem para invalidar Redis sem flush manual */
const CACHE_KEY_VERSION = process.env.CACHE_KEY_VERSION || '3';

const cacheMiddleware = (duration: number) => async (req: Request, res: Response, next: NextFunction) => {
  // Este middleware e generico e hoje so e usado em rotas GET publicas e nao
  // personalizadas (catalogo de midia) — a chave de cache abaixo nao tem nenhuma
  // dimensao de usuario. Se algum dia ele for aplicado numa rota autenticada, cachear
  // por `req.originalUrl` vazaria a resposta de um usuario pra outro em silencio. Em
  // vez de complicar a chave com o id do usuario, e mais simples e mais seguro nunca
  // passar por este cache (nem leitura, nem escrita) quando ha Authorization —
  // elimina a categoria inteira do problema.
  if (req.headers.authorization) {
    return next();
  }

  // Usar a URL original como chave de cache (versão evita servir payload antigo após deploy)
  const key = `cache:v${CACHE_KEY_VERSION}:${req.originalUrl}`;
  // Copia "stale" com TTL bem mais longo que o cache normal. So serve pra dar uma
  // resposta razoavel (stale-while-revalidate) pra quem chegar enquanto outro
  // request ja esta recalculando a resposta fresca — nunca e usada como fonte de
  // verdade primaria.
  const staleKey = `${key}:stale`;
  const staleTtl = duration * 4;
  const lockKey = `lock:${key}`;

  /**
   * Sem isso, o cache do lado do servidor (Redis) existe mas nunca chega como sinal HTTP
   * pro navegador nem pra CDN da Vercel — toda requisição, mesmo idêntica e recém-servida,
   * ainda baixa o payload inteiro de novo. `s-maxage` habilita cache na CDN/edge;
   * `max-age` menor no navegador evita ficar `duration` inteiro sem ver uma atualização
   * manual; `stale-while-revalidate` deixa servir uma resposta ligeiramente velha mesmo
   * assim, revalidando em segundo plano. Todas as rotas que usam este middleware são
   * GETs públicos e não-personalizados (catálogo de mídia), então `public` é seguro mesmo
   * quando o cliente manda `Authorization` (usuário logado vê o mesmo conteúdo).
   */
  const cacheControlHeader = `public, max-age=60, s-maxage=${duration}, stale-while-revalidate=${duration}`;

  const redisClient = getRedisClient();
  if (!redisClient) {
    logger.warn('Redis client não está disponível. Pulando cache.');
    return next();
  }

  // Intercepta res.send: se a rota terminar com sucesso, grava a resposta no cache
  // fresco e na copia stale. Usado tanto pelo request que vira "lider" (pegou o
  // lock) quanto pelo request de ultimo recurso que desiste de esperar o lider.
  const cacheOnSuccessfulSend = () => {
    const originalSend = res.send.bind(res);
    res.send = (body: any): Response<any> => {
      try {
        // Só cachear respostas de sucesso — um 5xx transitório não deve ficar
        // "congelado" e ser servido como HIT pra todo mundo até o TTL expirar.
        if (res.statusCode >= 200 && res.statusCode < 300) {
          res.setHeader('Cache-Control', cacheControlHeader);
          const client = getRedisClient();
          if (client) {
            client.set(key, body, 'EX', duration);
            client.set(staleKey, body, 'EX', staleTtl);
            logger.info(
              `Resposta para a chave ${key} armazenada no cache por ${duration}s (stale por ${staleTtl}s).`
            );
          } else {
            logger.warn('Redis client não está disponível. Não foi possível salvar no cache.');
          }
        }
      } catch (err) {
        logger.error(`Erro ao salvar no cache: ${err}`);
      }
      return originalSend(body);
    };
  };

  try {
    const cachedResponse = await redisClient.get(key);

    if (cachedResponse) {
      logger.info(`Cache HIT para a chave: ${key}`);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', cacheControlHeader);
      return res.send(cachedResponse);
    }

    // MISS: tentar virar o "lider" que recalcula, pra evitar que N requests
    // simultaneos disparem o mesmo conjunto pesado de queries de uma vez
    // (thundering herd) quando uma chave de TTL longo (ex.: 12h) expira numa rota
    // movimentada. `NX` garante que so um request consegue o lock por vez.
    const lockToken = randomUUID();
    const gotLock = await redisClient.set(lockKey, lockToken, 'EX', LOCK_TTL_SECONDS, 'NX');

    if (gotLock !== 'OK') {
      // Outro request ja esta recalculando. Preferir servir uma resposta stale (se
      // existir) a fazer o cliente esperar — resolve a maior parte dos casos sem
      // nenhum request adicional bater no banco (stale-while-revalidate).
      const stale = await redisClient.get(staleKey);
      if (stale) {
        logger.info(`Cache STALE (lock ocupado pelo lider) para a chave: ${key}`);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Cache', 'STALE');
        res.setHeader('Cache-Control', cacheControlHeader);
        return res.send(stale);
      }

      // Sem stale disponivel (ex.: primeira vez que essa chave e calculada):
      // aguardar um pouco e tentar pegar o resultado fresco que o lider esta
      // preenchendo, em vez de recalcular tudo em paralelo.
      for (let attempt = 0; attempt < POLL_ATTEMPTS; attempt += 1) {
        await sleep(POLL_INTERVAL_MS);
        const fresh = await redisClient.get(key);
        if (fresh) {
          logger.info(`Cache HIT (apos aguardar o lider) para a chave: ${key}`);
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('X-Cache', 'HIT');
          res.setHeader('Cache-Control', cacheControlHeader);
          return res.send(fresh);
        }
      }

      // O lider nao terminou a tempo (ou morreu sem liberar o lock/gravar o
      // cache). Ultimo recurso: seguir sem lock, igual ao comportamento anterior
      // a esta correcao, pra nao deixar o request pendurado indefinidamente.
      logger.warn(`Timeout aguardando o lider recalcular a chave: ${key}. Prosseguindo sem lock.`);
      res.setHeader('X-Cache', 'MISS');
      cacheOnSuccessfulSend();
      return next();
    }

    // Este request pegou o lock: ele e o responsavel por recalcular e preencher o
    // cache. O lock precisa ser liberado sempre — mesmo se a rota lancar uma
    // excecao, retornar erro, ou o cliente cair a conexao no meio — senao os
    // proximos requests ficariam esperando (via poll) ate o TTL do lock (30s) por
    // nada. Como o calculo de fato acontece depois, em `next()`/nos handlers da
    // rota (fora da pilha de chamada deste middleware), o equivalente a um
    // try/finally aqui e ouvir os eventos de fim da resposta.
    let lockReleased = false;
    const releaseLock = () => {
      if (lockReleased) return;
      lockReleased = true;
      const client = getRedisClient();
      if (!client) return;
      client.eval(RELEASE_LOCK_SCRIPT, 1, lockKey, lockToken).catch((err) => {
        logger.error(`Erro ao liberar lock da chave ${key}: ${err}`);
      });
    };
    // 'finish': resposta enviada com sucesso (ou erro tratado por outro middleware,
    // que no fim das contas tambem chama res.send/res.end).
    // 'close': conexao encerrada antes de 'finish' (ex.: cliente desistiu, ou uma
    // excecao nao tratada derrubou a request sem nunca chamar res.end).
    res.once('finish', releaseLock);
    res.once('close', releaseLock);

    logger.info(`Cache MISS para a chave: ${key}. Lock adquirido, recalculando.`);
    res.setHeader('X-Cache', 'MISS');
    cacheOnSuccessfulSend();

    next();
  } catch (err) {
    logger.error(`Erro no middleware de cache: ${err}`);
    // Se o Redis falhar, simplesmente prosseguir sem cache
    next();
  }
};

export default cacheMiddleware;
