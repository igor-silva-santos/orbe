'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  PlugZap,
  ShieldCheck,
} from 'lucide-react';
import { getToken } from '@/lib/auth/token';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { getAbsoluteApiUrl } from '@/lib/apiBase';

const ORBE_CONNECT_EVENT = 'ORBE_EXTENSION_CONNECT';
const ORBE_ACK_EVENT = 'ORBE_EXTENSION_ACK';
const ORBE_PING_EVENT = 'ORBE_EXTENSION_PING';
const ORBE_PONG_EVENT = 'ORBE_EXTENSION_PONG';

type ExtensionStatus = 'checking' | 'missing' | 'ready';

export default function ExtensaoPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAppStore();
  const [extensionStatus, setExtensionStatus] = useState<ExtensionStatus>('checking');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login?next=/extensao');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const onPong = (event: MessageEvent) => {
      if (event.source !== window || event.data?.type !== ORBE_PONG_EVENT) return;
      setExtensionStatus('ready');
      if (timeoutId) clearTimeout(timeoutId);
    };

    window.addEventListener('message', onPong);
    window.postMessage({ type: ORBE_PING_EVENT }, window.location.origin);

    timeoutId = setTimeout(() => {
      setExtensionStatus((current) => (current === 'checking' ? 'missing' : current));
    }, 2000);

    return () => {
      window.removeEventListener('message', onPong);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const connectExtension = useCallback(() => {
    const token = getToken();
    if (!token) {
      setMessage('Faça login no Orbe antes de conectar a extensão.');
      return;
    }

    if (extensionStatus === 'missing') {
      setMessage('Extensão não detectada. Instale primeiro em /extensao/crunchyroll.');
      return;
    }

    const apiUrl = getAbsoluteApiUrl(window.location.origin);
    const requestId = crypto.randomUUID();
    setConnecting(true);
    setMessage('Aguardando confirmação da extensão...');

    const timeoutId = setTimeout(() => {
      setConnecting(false);
      setConnected(false);
      setMessage(
        'Não recebemos confirmação da extensão. Verifique se ela está instalada e recarregue esta página.',
      );
    }, 5000);

    const onAck = (event: MessageEvent) => {
      if (event.source !== window || event.data?.type !== ORBE_ACK_EVENT) return;
      if (event.data.requestId && event.data.requestId !== requestId) return;

      clearTimeout(timeoutId);
      window.removeEventListener('message', onAck);
      setConnecting(false);

      if (event.data.ok) {
        setConnected(true);
        setMessage('Extensão conectada com sucesso. Abra a fila na Crunchyroll e sincronize.');
      } else {
        setConnected(false);
        setMessage(event.data.error || 'Falha ao conectar a extensão.');
      }
    };

    window.addEventListener('message', onAck);

    const payload = { type: ORBE_CONNECT_EVENT, token, apiUrl, requestId };
    window.postMessage(payload, window.location.origin);
    document.dispatchEvent(new CustomEvent('orbe-extension-connect', { detail: payload }));
  }, [extensionStatus]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <PlugZap className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-extrabold">Conectar extensão Crunchyroll</h1>
      </div>
      <p className="text-muted-foreground mb-4">
        Autorize a extensão Orbe Sync a usar sua conta — sem copiar token manualmente.
      </p>

      {user?.email && (
        <p className="text-sm text-muted-foreground mb-6">
          Logado como <strong>{user.email}</strong>
        </p>
      )}

      {extensionStatus === 'checking' && (
        <p className="text-sm text-muted-foreground mb-4">Verificando extensão instalada...</p>
      )}

      {extensionStatus === 'missing' && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-4 mb-6 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-amber-800 dark:text-amber-200">
              Extensão não detectada
            </p>
            <p className="text-amber-700 dark:text-amber-300 mt-1">
              Instale a extensão open source antes de conectar. Veja o passo a passo em{' '}
              <Link href="/extensao/crunchyroll" className="underline font-medium">
                /extensao/crunchyroll
              </Link>
              .
            </p>
          </div>
        </div>
      )}

      {extensionStatus === 'ready' && !connected && (
        <div className="rounded-lg border border-green-300 bg-green-50 dark:bg-green-950/30 p-4 mb-6 flex gap-3">
          <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
          <p className="text-sm text-green-800 dark:text-green-200">
            Extensão detectada. Código aberto — você pode auditar tudo em{' '}
            <code className="text-xs bg-green-100 dark:bg-green-900 px-1 rounded">extension/</code>.
          </p>
        </div>
      )}

      <div className="rounded-xl border border-primary/30 bg-accent p-6 space-y-4">
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>
            Instale a extensão (guia em{' '}
            <Link href="/extensao/crunchyroll" className="text-primary underline">
              /extensao/crunchyroll
            </Link>
            )
          </li>
          <li>Clique no botão abaixo para enviar seu login para a extensão</li>
          <li>Abra sua fila na Crunchyroll e use &quot;Sincronizar fila agora&quot; no popup</li>
        </ol>

        <Button
          onClick={connectExtension}
          disabled={connecting || extensionStatus === 'checking'}
          className="bg-primary hover:bg-primary/90"
        >
          {connected ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Extensão conectada
            </>
          ) : connecting ? (
            'Conectando...'
          ) : (
            'Conectar extensão agora'
          )}
        </Button>

        {message && <p className="text-sm text-muted-foreground">{message}</p>}

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/extensao/crunchyroll">
              Como instalar e código aberto
              <ExternalLink className="h-3 w-3 ml-2 opacity-60" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/minha-lista/animes">Ir para Minha Lista</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
