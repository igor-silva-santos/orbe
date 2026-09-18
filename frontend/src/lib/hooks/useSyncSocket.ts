import { useEffect, useRef, useState } from 'react';
import { getWsUrl } from '@/lib/apiBase';

export interface SyncMessage {
  type: 'SYNC_START' | 'SYNC_PROGRESS' | 'SYNC_COMPLETE' | 'SYNC_ERROR' | 'CACHE_INVALIDATED';
  mediaType?: string;
  scope?: string;
  total?: number;
  current?: number;
  message?: string;
  period?: string;
}

const INITIAL_RECONNECT_DELAY_MS = 1000;
const MAX_RECONNECT_DELAY_MS = 30000;
const QUICK_DISCONNECT_MS = 2500;
const MAX_QUICK_DISCONNECTS = 4;
const PAUSE_AFTER_FAILURES_MS = 5 * 60 * 1000;

export function useSyncSocket() {
  const [lastMessage, setLastMessage] = useState<SyncMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const wsUrl = getWsUrl();
    if (!wsUrl) return;

    let socket: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let reconnectAttempts = 0;
    let quickDisconnects = 0;
    let openedAt = 0;
    let unmounted = false;
    const isDev = process.env.NODE_ENV === 'development';

    const scheduleReconnect = (delay: number) => {
      if (unmounted) return;
      reconnectTimer = setTimeout(connect, delay);
    };

    const connect = () => {
      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        if (isDev) console.log('Conectado ao WebSocket de Sincronização');
        openedAt = Date.now();
        reconnectAttempts = 0;
        setIsConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage(data);
        } catch (err) {
          if (isDev) console.error('Erro ao processar mensagem WS:', err);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        if (unmounted) return;

        const livedMs = Date.now() - openedAt;
        if (openedAt > 0 && livedMs < QUICK_DISCONNECT_MS) {
          quickDisconnects += 1;
        } else {
          quickDisconnects = 0;
        }

        if (quickDisconnects >= MAX_QUICK_DISCONNECTS) {
          if (isDev) {
            console.warn('WebSocket instável — pausando reconexões por alguns minutos.');
          }
          quickDisconnects = 0;
          scheduleReconnect(PAUSE_AFTER_FAILURES_MS);
          return;
        }

        if (isDev) console.log('Desconectado do WebSocket, tentando reconectar...');
        const delay = Math.min(
          INITIAL_RECONNECT_DELAY_MS * 2 ** reconnectAttempts,
          MAX_RECONNECT_DELAY_MS,
        );
        reconnectAttempts += 1;
        scheduleReconnect(delay);
      };

      socket.onerror = () => {
        socket?.close();
      };
    };

    connect();

    return () => {
      unmounted = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (socket) {
        socket.onclose = null;
        socket.onerror = null;
        socket.close();
      }
    };
  }, []);

  return { lastMessage, isConnected };
}
