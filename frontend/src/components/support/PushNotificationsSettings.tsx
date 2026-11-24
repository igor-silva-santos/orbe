'use client';

import { useCallback, useState } from 'react';
import orbeNerdApi from '@/lib/api';
import PushOptInBanner from '@/components/support/PushOptInBanner';
import { Button } from '@/components/ui/button';

export default function PushNotificationsSettings() {
  const [testBusy, setTestBusy] = useState(false);
  const [testMessage, setTestMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const runTest = useCallback(async () => {
    setTestBusy(true);
    setTestMessage(null);
    try {
      const res = (await orbeNerdApi.sendTestPush()) as {
        success?: boolean;
        pushAttempted?: boolean;
        hint?: string;
      };
      const hint = res.hint ?? '';
      setTestMessage({
        type: 'ok',
        text: res.pushAttempted
          ? `Teste enviado. Verifique o sino (in-app) e a notificação do sistema. ${hint}`
          : `Notificação in-app criada. Push não tentado: ${hint}`,
      });
    } catch (e) {
      setTestMessage({
        type: 'err',
        text: e instanceof Error ? e.message : 'Falha ao enviar teste.',
      });
    } finally {
      setTestBusy(false);
    }
  }, []);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Notificações</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Avisos no navegador (push) e no sino da barra superior.
        </p>
      </div>
      <div className="p-6 space-y-4">
        <PushOptInBanner />
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Button type="button" variant="outline" size="sm" disabled={testBusy} onClick={() => void runTest()}>
            {testBusy ? 'Enviando…' : 'Enviar notificação de teste'}
          </Button>
          <p className="text-xs text-muted-foreground">
            Cria um aviso in-app e tenta push para este usuário (requer VAPID na API).
          </p>
        </div>
        {testMessage && (
          <p className={`text-sm ${testMessage.type === 'ok' ? 'text-green-600' : 'text-destructive'}`}>
            {testMessage.text}
          </p>
        )}
      </div>
    </div>
  );
}