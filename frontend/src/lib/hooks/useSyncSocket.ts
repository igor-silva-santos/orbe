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

export function useSyncSocket() {
  const [lastMessage, setLastMessage] = useState<SyncMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const wsUrl = getWsUrl();
    if (!wsUrl) return;

    let socket: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let reconnectAttempts = 0;
    let unmounted = false;

    const connect = () => {
      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Conectado ao WebSocket de Sincronização');
        }
        reconnectAttempts = 0;
        setIsConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage(data);
        } catch (err) {
          console.error('Erro ao processar mensagem WS:', err);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        if (unmounted) return;
        if (process.env.NODE_ENV === 'development') {
          console.log('Desconectado do WebSocket, tentando reconectar...');
        }
        const delay = Math.min(
          INITIAL_RECONNECT_DELAY_MS * 2 ** reconnectAttempts,
          MAX_RECONNECT_DELAY_MS
        );
        reconnectAttempts += 1;
        reconnectTimer = setTimeout(connect, delay);
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
