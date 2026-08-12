'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/apiBase';
import { ORBE_DATA_REFRESH_EVENT } from '@/lib/hooks/useOrbeDataRefresh';
import { useSyncSocket } from '@/lib/hooks/useSyncSocket';

type SyncStatusResponse = {
  syncActive?: boolean;
};

/**
 * Detecta fim de sync (poll + WebSocket) e atualiza páginas sem exigir reload manual.
 */
export default function SyncRefreshListener() {
  const router = useRouter();
  const wasActiveRef = useRef(false);
  const { lastMessage } = useSyncSocket();

  const triggerRefresh = useCallback(() => {
    router.refresh();
    window.dispatchEvent(new CustomEvent(ORBE_DATA_REFRESH_EVENT));
  }, [router]);

  useEffect(() => {
    if (lastMessage?.type === 'SYNC_COMPLETE' || lastMessage?.type === 'CACHE_INVALIDATED') {
      triggerRefresh();
    }
  }, [lastMessage, triggerRefresh]);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const poll = async () => {
      if (cancelled) return;

      let delayMs = 45000;
      try {
        const res = await fetch(`${API_BASE}/sync/status`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const status = (await res.json()) as SyncStatusResponse;
        const active = Boolean(status.syncActive);

        if (wasActiveRef.current && !active) {
          triggerRefresh();
        }
        wasActiveRef.current = active;
        delayMs = active ? 8000 : 45000;
      } catch {
        delayMs = 60000;
      }

      if (!cancelled) {
        timeoutId = setTimeout(poll, delayMs);
      }
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [triggerRefresh]);

  return null;
}
