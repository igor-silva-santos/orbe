import './loadEnv';
import express from 'express';
import http from 'http';
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
import commentRoutes from './commentRoutes';

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

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin === '*' ? true : corsOrigin.split(',').map((o) => o.trim()),
  credentials: true,
}));
app.use(express.json());

// Usar as rotas de mídia e webhooks
app.use('/api', mediaRoutes);
app.use('/api', webhookRoutes);
app.use('/api', userRoutes);
app.use('/api', syncRoutes);
app.use('/api', watchlistRoutes);
app.use('/api/users', profileRoutes);
app.use('/api', commentRoutes);

// Healthcheck (sem depender de sync/cron)
app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: true });
  } catch {
    res.status(503).json({ ok: false, db: false });
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
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

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
    res.status(401).json({ error: 'Token inválido.' });
  }
};

// Rotas canônicas alinhadas ao frontend (/api/auth/*)
app.post('/api/auth/register', registerHandler);
app.post('/api/auth/login', loginHandler);
app.get('/api/auth/me', meHandler);

// Aliases legados
app.post('/register', registerHandler);
app.post('/login', loginHandler);
app.get('/profile', meHandler);

import { runDetetive } from './detetive';
import cron from 'node-cron';
import { checkInterruptedSyncOnStartup } from './syncState';

// Agendador para o Detetive Digital (roda todo dia às 3:00)
cron.schedule('0 3 * * *', () => {
  logger.info('Executando o Detetive Digital agendado...');
  runDetetive();
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, async () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  await checkInterruptedSyncOnStartup(prisma);
});


export default app;
