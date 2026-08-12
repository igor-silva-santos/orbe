import './loadEnv';
import express from 'express';
import http from 'http';
import crypto from 'crypto';
import { WebSocketServer, WebSocket } from 'ws';
import { prisma } from './clients';
import { Prisma } from '@prisma/client';
import { logger } from './logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import mediaRoutes from './mediaRoutes';
import webhookRoutes from './webhookRoutes';
import { registerAllIgdbWebhooks } from './igdbWebhooks';
import userRoutes from './userRoutes';
import syncRoutes from './syncRoutes';
import watchlistRoutes from './watchlistRoutes';
import profileRoutes from './profileRoutes';
import notificationRoutes from './notificationRoutes';
import calendarRoutes from './calendarRoutes';
import contactRoutes, { isValidEmail } from './contactRoutes';
import { verifyBearerToken, MissingTokenError } from './authMiddleware';
import {
  applySecurityMiddleware,
  authRateLimiter,
  assertIgdbWebhookSecretConfigured,
  assertJwtSecretConfigured,
  isIgdbWebhooksEnabled,
  resolveCorsOptions,
} from './securityMiddleware';

assertJwtSecretConfigured();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/api/ws' });

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_secreto';

// Gerenciamento de conexões WebSocket
const clients = new Set<WebSocket>();
// Rastreia se cada cliente respondeu ao último ping (heartbeat) — ver setInterval abaixo.
const clientsAlive = new WeakMap<WebSocket, boolean>();

/**
 * CORS não se aplica a upgrades de WebSocket, então reaproveitamos a mesma lista de origens
 * de `resolveCorsOptions` pra decidir manualmente se aceitamos o handshake.
 */
function isWebSocketOriginAllowed(origin: string | undefined): boolean {
  const { origin: allowedOrigin } = resolveCorsOptions();
  if (allowedOrigin === true) return true; // dev sem CORS_ORIGIN configurado — sem restrição
  if (!origin) return false; // lista explícita configurada e request sem Origin — rejeita
  if (Array.isArray(allowedOrigin)) return allowedOrigin.includes(origin);
  if (typeof allowedOrigin === 'string') return origin === allowedOrigin;
  return false;
}

wss.on('connection', (ws, request) => {
  const origin = request.headers.origin;
  if (!isWebSocketOriginAllowed(origin)) {
    logger.warn(`Conexão WebSocket rejeitada — origem não permitida: ${origin ?? '(sem origem)'}`);
    ws.close(1008, 'Origem não permitida');
    return;
  }

  clients.add(ws);
  clientsAlive.set(ws, true);
  logger.info('Novo cliente WebSocket conectado.');

  ws.on('pong', () => {
    clientsAlive.set(ws, true);
  });

  ws.on('close', () => {
    clients.delete(ws);
    clientsAlive.delete(ws);
    logger.info('Cliente WebSocket desconectado.');
  });

  ws.on('error', (error) => {
    logger.error('Erro no WebSocket:', error);
    clients.delete(ws);
    clientsAlive.delete(ws);
  });
});

// Heartbeat: derruba clientes que pararam de responder pong (conexão morta sem `close` limpo).
const HEARTBEAT_INTERVAL_MS = 30_000;
const wsHeartbeatInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (clientsAlive.get(ws) === false) {
      clientsAlive.delete(ws);
      clients.delete(ws);
      ws.terminate();
      return;
    }
    clientsAlive.set(ws, false);
    ws.ping();
  });
}, HEARTBEAT_INTERVAL_MS);

// Função para enviar mensagem para todos os clientes conectados
export const broadcast = (message: object) => {
  const messageString = JSON.stringify(message);
  logger.info(`Enviando broadcast para ${clients.size} clientes`);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageString);
    }
  });
};

app.use(cors(resolveCorsOptions()));
app.use(express.json({ limit: '256kb' }));
applySecurityMiddleware(app);

// Usar as rotas de mídia e webhooks (IGDB opcional)
app.use('/api', mediaRoutes);
if (isIgdbWebhooksEnabled()) {
  assertIgdbWebhookSecretConfigured();
  app.use('/api', webhookRoutes);
  logger.info('Webhooks IGDB habilitados.');
  void registerAllIgdbWebhooks();
} else {
  logger.info('Webhooks IGDB desabilitados (defina IGDB_WEBHOOKS_ENABLED=true para ativar).');
}
app.use('/api', userRoutes);
app.use('/api', syncRoutes);
app.use('/api', watchlistRoutes);
app.use('/api/users', profileRoutes);
app.use('/api', notificationRoutes);
app.use('/api', calendarRoutes);
app.use('/api', contactRoutes);

function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Healthcheck — público retorna mínimo; detalhes só com token interno
// Resultado cacheado em memória por HEALTH_CACHE_TTL_MS: o healthCheckPath do Render bate
// aqui continuamente, e cada chamada sem cache custava 2 idas ao banco (SELECT 1 + getSyncStatus).
type HealthCacheEntry = {
  ok: boolean;
  db: boolean;
  sync: Awaited<ReturnType<typeof getSyncStatus>> | null;
};

const HEALTH_CACHE_TTL_MS = 20_000;
let healthCache: { at: number; entry: HealthCacheEntry } | null = null;

async function computeHealth(): Promise<HealthCacheEntry> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const syncStatus = await getSyncStatus(prisma);
    return { ok: true, db: true, sync: syncStatus };
  } catch {
    return { ok: false, db: false, sync: null };
  }
}

async function getHealthCached(): Promise<HealthCacheEntry> {
  const now = Date.now();
  if (healthCache && now - healthCache.at < HEALTH_CACHE_TTL_MS) {
    return healthCache.entry;
  }
  const entry = await computeHealth();
  healthCache = { at: now, entry };
  return entry;
}

app.get('/api/health', async (req, res) => {
  const healthToken = process.env.HEALTH_CHECK_TOKEN;
  const provided = req.headers['x-health-token'];
  const showDetails = Boolean(
    healthToken && typeof provided === 'string' && timingSafeEqualStrings(provided, healthToken),
  );

  const { ok, db, sync: syncStatus } = await getHealthCached();

  if (!ok) {
    res.status(503).json(showDetails ? { ok: false, db } : { ok: false });
    return;
  }

  const body: Record<string, unknown> = { ok: true };
  if (showDetails) {
    body.db = true;
    body.sync = syncStatus;
  } else if (syncStatus && (syncStatus.syncActive || syncStatus.resumeAvailable)) {
    // Público só sabe que há sync pendente — endpoints internos ficam reservados ao token de saúde.
    body.syncHint = 'pending';
  }
  res.json(body);
});

type AuthUserPayload = {
  id: number;
  email: string;
  role: string;
  quer_avaliar: boolean | null;
  data_criacao: Date;
};

const registerHandler = async (req: express.Request, res: express.Response) => {
  const { email, password, nome } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email inválido.' });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'A senha precisa ter pelo menos 8 caracteres.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    try {
      newUser = await prisma.user.create({
        data: {
          email,
          hashed_password: hashedPassword,
          ...(nome ? { nome } : {}),
        },
      });
    } catch (createError) {
      // Corrida: dois cadastros simultâneos passam ambos pelo findUnique acima antes de
      // qualquer create commitar. A constraint única do banco é a autoridade final —
      // P2002 aqui significa que o outro request venceu a corrida.
      if (
        createError instanceof Prisma.PrismaClientKnownRequestError &&
        createError.code === 'P2002'
      ) {
        return res.status(400).json({ error: 'Usuário já existe.' });
      }
      throw createError;
    }

    const token = jwt.sign({ userId: newUser.id, role: newUser.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const user: AuthUserPayload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      quer_avaliar: newUser.quer_avaliar,
      data_criacao: newUser.data_criacao,
    };

    res.status(201).json({ message: 'Usuário criado com sucesso!', userId: newUser.id, token, user });
  } catch (error) {
    logger.error(`Erro no registro: ${error}`);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// Hash fixo usado só pra gastar o mesmo tempo de um bcrypt.compare real quando o e-mail não
// existe — sem isso, a diferença de tempo entre "usuário não existe" (retorno imediato) e
// "usuário existe, senha errada" (~100ms de bcrypt) permite enumerar contas por timing.
const DUMMY_PASSWORD_HASH = bcrypt.hashSync('dummy', 10);

const loginHandler = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    const userRecord = await prisma.user.findUnique({
      where: { email },
    });

    if (!userRecord) {
      await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, userRecord.hashed_password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ userId: userRecord.id, role: userRecord.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    const user: AuthUserPayload = {
      id: userRecord.id,
      email: userRecord.email,
      role: userRecord.role,
      quer_avaliar: userRecord.quer_avaliar,
      data_criacao: userRecord.data_criacao,
    };

    res.json({ token, user });
  } catch (error) {
    logger.error(`Erro no login: ${error}`);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

const meHandler = async (req: express.Request, res: express.Response) => {
  try {
    const decoded = verifyBearerToken(req.headers.authorization);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        quer_avaliar: true,
        data_criacao: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(user);
  } catch (error) {
    if (error instanceof MissingTokenError) {
      return res.status(401).json({ error: 'Token não fornecido.' });
    }
    res.status(401).json({ error: 'Token inválido.' });
  }
};

// Rotas canônicas alinhadas ao frontend (/api/auth/*)
app.post('/api/auth/register', authRateLimiter, registerHandler);
app.post('/api/auth/login', authRateLimiter, loginHandler);
app.get('/api/auth/me', meHandler);

// Aliases legados
app.post('/register', authRateLimiter, registerHandler);
app.post('/login', authRateLimiter, loginHandler);
app.get('/profile', meHandler);

// Rota inexistente — depois de todas as rotas registradas, resposta em JSON em vez do HTML
// padrão do Express (mantém consistência com o resto da API).
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// Handler de erro global — precisa ter EXATAMENTE 4 parâmetros pro Express reconhecer como
// error handler. Cobre exceções fora dos try/catch de cada rota (ex.: JSON malformado no body).
app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Erro não tratado:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

import { runDetetive } from './detetive';
import cron from 'node-cron';
import { checkInterruptedSyncOnStartup, getSyncStatus } from './syncState';
import { refreshStaleSteamPrices } from './syncSteam';

// Agendador para o Detetive Digital (roda todo dia às 3:00, horário de São Paulo)
cron.schedule('0 3 * * *', () => {
  logger.info('Executando o Detetive Digital agendado...');
  runDetetive();
}, { timezone: 'America/Sao_Paulo' });

// Refresh diário de preços Steam (jogos com steamAppId e sync >24h), horário de São Paulo
cron.schedule('0 4 * * *', async () => {
  logger.info('Executando refresh diário de preços Steam...');
  try {
    const updated = await refreshStaleSteamPrices(prisma);
    logger.info(`Refresh diário Steam: ${updated} jogos atualizados.`);
  } catch (error) {
    logger.error('Erro no refresh diário de preços Steam:', error);
  }
}, { timezone: 'America/Sao_Paulo' });

// Renovação diária da inscrição de webhooks IGDB (expira periodicamente), horário de São Paulo
if (isIgdbWebhooksEnabled()) {
  cron.schedule('0 5 * * *', () => {
    logger.info('Renovando inscrição de webhooks IGDB...');
    void registerAllIgdbWebhooks();
  }, { timezone: 'America/Sao_Paulo' });
}

const PORT = process.env.PORT || 3001;

server.listen(PORT, async () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  await checkInterruptedSyncOnStartup(prisma);
});

// Desligamento gracioso: o Render manda SIGTERM ao reiniciar/redeployar o serviço. Sem isso,
// requests em voo são cortados, o Prisma não desconecta, e um sync em andamento some deixando
// o lock preso no banco (checkInterruptedSyncOnStartup atenua isso na volta, mas é remediação).
const SHUTDOWN_TIMEOUT_MS = 10_000;
let shuttingDown = false;

function shutdown(signal: string): void {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info(`Recebido ${signal} — iniciando desligamento gracioso...`);

  const forceExitTimer = setTimeout(() => {
    logger.error('Desligamento gracioso excedeu o timeout — forçando saída.');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
  forceExitTimer.unref();

  clearInterval(wsHeartbeatInterval);
  wss.clients.forEach((ws) => {
    ws.close(1001, 'Servidor reiniciando');
  });

  server.close(async (closeError) => {
    if (closeError) {
      logger.error('Erro ao fechar servidor HTTP:', closeError);
    }
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      logger.error('Erro ao desconectar do banco:', disconnectError);
    }
    clearTimeout(forceExitTimer);
    logger.info('Desligamento gracioso concluído.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;
