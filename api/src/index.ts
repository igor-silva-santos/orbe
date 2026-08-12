import './loadEnv';
import express from 'express';
import http from 'http';
import crypto from 'crypto';
import { WebSocketServer, WebSocket } from 'ws';
import { prisma } from './clients';
import { logger } from './logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import mediaRoutes from './mediaRoutes';
import webhookRoutes from './webhookRoutes';
import userRoutes from './userRoutes';
import syncRoutes from './syncRoutes';
import watchlistRoutes from './watchlistRoutes';
import profileRoutes from './profileRoutes';
import notificationRoutes from './notificationRoutes';
import calendarRoutes from './calendarRoutes';
import contactRoutes from './contactRoutes';
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

wss.on('connection', (ws) => {
  clients.add(ws);
  logger.info('Novo cliente WebSocket conectado.');

  ws.on('close', () => {
    clients.delete(ws);
    logger.info('Cliente WebSocket desconectado.');
  });

  ws.on('error', (error) => {
    logger.error('Erro no WebSocket:', error);
    clients.delete(ws); 
  });
});

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
app.get('/api/health', async (req, res) => {
  const healthToken = process.env.HEALTH_CHECK_TOKEN;
  const provided = req.headers['x-health-token'];
  const showDetails = Boolean(
    healthToken && typeof provided === 'string' && timingSafeEqualStrings(provided, healthToken),
  );

  try {
    await prisma.$queryRaw`SELECT 1`;
    const syncStatus = await getSyncStatus(prisma);
    const body: Record<string, unknown> = { ok: true };
    if (showDetails) {
      body.db = true;
      body.sync = syncStatus;
    } else if (syncStatus.syncActive || syncStatus.resumeAvailable) {
      body.syncHint = syncStatus.message ?? 'Ver GET /api/sync/status';
    }
    res.json(body);
  } catch {
    res.status(503).json(showDetails ? { ok: false, db: false } : { ok: false });
  }
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

    const newUser = await prisma.user.create({
      data: {
        email,
        hashed_password: hashedPassword,
        ...(nome ? { nome } : {}),
      },
    });

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

import { runDetetive } from './detetive';
import cron from 'node-cron';
import { checkInterruptedSyncOnStartup, getSyncStatus } from './syncState';
import { refreshStaleSteamPrices } from './syncSteam';

// Agendador para o Detetive Digital (roda todo dia às 3:00)
cron.schedule('0 3 * * *', () => {
  logger.info('Executando o Detetive Digital agendado...');
  runDetetive();
});

// Refresh diário de preços Steam (jogos com steamAppId e sync >24h)
cron.schedule('0 4 * * *', async () => {
  logger.info('Executando refresh diário de preços Steam...');
  try {
    const updated = await refreshStaleSteamPrices(prisma);
    logger.info(`Refresh diário Steam: ${updated} jogos atualizados.`);
  } catch (error) {
    logger.error('Erro no refresh diário de preços Steam:', error);
  }
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, async () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  await checkInterruptedSyncOnStartup(prisma);
});


export default app;
