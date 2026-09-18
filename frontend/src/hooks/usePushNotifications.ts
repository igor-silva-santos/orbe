'use client';

import { useCallback, useState } from 'react';
import orbeNerdApi from '@/lib/api';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

export function usePushNotifications() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'enabled' | 'denied' | 'unsupported'>(
    'idle'
  );
  const [error, setError] = useState<string | null>(null);

  const subscribe = useCallback(async () => {
    setError(null);
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setStatus('unsupported');
      return;
    }

    setStatus('loading');
    try {
      let publicKey: string;
      try {
        const keyResponse = await orbeNerdApi.getVapidPublicKey();
        publicKey = keyResponse.publicKey;
      } catch {
        setStatus('unsupported');
        setError('Push ainda não configurado no servidor. Tente novamente após o próximo deploy.');
        return;
      }

      if (!publicKey) {
        setStatus('unsupported');
        setError('Push não disponível neste ambiente.');
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setStatus('denied');
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      await orbeNerdApi.subscribePush(subscription.toJSON());
      setStatus('enabled');
    } catch (err) {
      setStatus('idle');
      setError(err instanceof Error ? err.message : 'Não foi possível ativar push');
    }
  }, []);

  return { subscribe, status, error };
}
