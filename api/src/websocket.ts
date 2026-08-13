import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { logger } from './logger';
import { resolveCorsOptions } from './securityMiddleware';

// Gerenciamento de conexoes WebSocket
const clients = new Set<WebSocket>();
// Rastreia se cada cliente respondeu ao ultimo ping (heartbeat) — ver setInterval abaixo.
const clientsAlive = new WeakMap<WebSocket, boolean>();

let wsHeartbeatInterval: ReturnType<typeof setInterval> | null = null;

/**
 * CORS nao se aplica a upgrades de WebSocket, entao reaproveitamos a mesma lista de origens
 * de `resolveCorsOptions` pra decidir manualmente se aceitamos o handshake.
 */
function isWebSocketOriginAllowed(origin: string | undefined): boolean {
  const { origin: allowedOrigin } = resolveCorsOptions();
  if (allowedOrigin === true) return true; // dev sem CORS_ORIGIN configurado — sem restricao
  if (!origin) return false; // lista explicita configurada e request sem Origin — rejeita
  if (Array.isArray(allowedOrigin)) return allowedOrigin.includes(origin);
  if (typeof allowedOrigin === 'string') return origin === allowedOrigin;
  return false;
}

// Funcao para enviar mensagem para todos os clientes conectados
export const broadcast = (message: object) => {
  const messageString = JSON.stringify(message);
  logger.info(`Enviando broadcast para ${clients.size} clientes`);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageString);
    }
  });
};

/**
 * Cria o WebSocketServer por cima do http.Server ja existente e registra os handlers
 * de conexao e o heartbeat. Precisa ser chamado depois que `index.ts` cria o http.Server.
 */
export function attachWebSocketServer(server: http.Server): void {
  const wss = new WebSocketServer({ server, path: '/api/ws' });

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

  // Heartbeat: derruba clientes que pararam de responder pong (conexao morta sem `close` limpo).
  const HEARTBEAT_INTERVAL_MS = 30_000;
  wsHeartbeatInterval = setInterval(() => {
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
}

/**
 * Fecha todas as conexoes WS abertas e para o heartbeat. Chamado a partir do desligamento
 * gracioso de `index.ts`, antes de `server.close()`.
 */
export function shutdownWebSocket(): void {
  if (wsHeartbeatInterval) {
    clearInterval(wsHeartbeatInterval);
    wsHeartbeatInterval = null;
  }
  clients.forEach((ws) => {
    ws.close(1001, 'Servidor reiniciando');
  });
}
