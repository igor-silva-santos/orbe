'use client';

import { useEffect, useState } from 'react';

const ORBE_PING_EVENT = 'ORBE_EXTENSION_PING';
const ORBE_PONG_EVENT = 'ORBE_EXTENSION_PONG';
const SESSION_KEY = 'orbe:extension:detected';

export type ExtensionDetectStatus = 'idle' | 'checking' | 'installed' | 'missing';

function readCachedStatus(): ExtensionDetectStatus | null {
  if (typeof window === 'undefined') return null;
  const cached = sessionStorage.getItem(SESSION_KEY);
  if (cached === 'installed' || cached === 'missing') return cached;
  return null;
}

function cacheStatus(status: 'installed' | 'missing') {
  sessionStorage.setItem(SESSION_KEY, status);
}

export function clearExtensionDetectionCache() {
  sessionStorage.removeItem(SESSION_KEY);
}

function runDetection(
  onResult: (status: 'installed' | 'missing') => void
): () => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const onPong = (event: MessageEvent) => {
    if (event.source !== window || event.data?.type !== ORBE_PONG_EVENT) return;
    cacheStatus('installed');
    onResult('installed');
    if (timeoutId) clearTimeout(timeoutId);
    window.removeEventListener('message', onPong);
  };

  window.addEventListener('message', onPong);
  window.postMessage({ type: ORBE_PING_EVENT }, window.location.origin);

  timeoutId = setTimeout(() => {
    window.removeEventListener('message', onPong);
    cacheStatus('missing');
    onResult('missing');
  }, 2000);

  return () => {
    window.removeEventListener('message', onPong);
    if (timeoutId) clearTimeout(timeoutId);
  };
}

/** Detecta a extensão Orbe uma única vez por sessão do navegador. */
export function useExtensionDetector(enabled = true) {
  const [status, setStatus] = useState<ExtensionDetectStatus>(() => readCachedStatus() ?? 'idle');
  const [recheckToken, setRecheckToken] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('recheck') === '1') {
        clearExtensionDetectionCache();
        window.history.replaceState({}, '', window.location.pathname);
      }
    }

    const cached = readCachedStatus();
    if (cached && recheckToken === 0) {
      setStatus(cached);
      return;
    }

    setStatus('checking');
    return runDetection((result) => setStatus(result));
  }, [enabled, recheckToken]);

  const recheck = () => {
    clearExtensionDetectionCache();
    setRecheckToken((n) => n + 1);
  };

  return { status, recheck };
}
