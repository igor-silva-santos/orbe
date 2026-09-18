'use client';

import { BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export default function PushOptInBanner() {
  const { subscribe, status, error } = usePushNotifications();

  if (status === 'enabled' || status === 'unsupported' || status === 'denied') {
    return null;
  }

  return (
    <div className="rounded-xl border border-primary/20 bg-accent/40 p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
      <div className="flex items-start gap-3">
        <BellRing className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm">Notificações push</p>
          <p className="text-xs text-muted-foreground">
            Receba avisos de sync e novidades mesmo com o site fechado.
          </p>
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
      </div>
      <Button
        type="button"
        size="sm"
        onClick={subscribe}
        disabled={status === 'loading'}
        className="shrink-0"
      >
        {status === 'loading' ? 'Ativando...' : 'Ativar push'}
      </Button>
    </div>
  );
}
