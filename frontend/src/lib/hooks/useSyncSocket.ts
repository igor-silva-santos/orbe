import { useEffect, useState, useCallback } from 'react';
import { getWsUrl } from '@/lib/apiBase';

export interface SyncMessage {
  type: 'SYNC_START' | 'SYNC_PROGRESS' | 'SYNC_COMPLETE' | 'SYNC_ERROR';
  mediaType: string;
  total?: number;
  current?: number;
  message?: string;
  period?: string;
}

export function useSyncSocket() {
  const [lastMessage, setLastMessage] = useState<SyncMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const wsUrl = getWsUrl();
    if (!wsUrl) return;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('Conectado ao WebSocket de Sincronização');
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
      console.log('Desconectado do WebSocket');
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  return { lastMessage, isConnected };
}
