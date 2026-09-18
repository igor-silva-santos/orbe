'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Download, PlugZap, ShieldCheck } from 'lucide-react';
import type { WatchlistAnime } from '@/types';
import { Button } from '@/components/ui/button';
import type { ExtensionDetectStatus } from '@/hooks/useExtensionDetector';

interface EditProgressModalProps {
  item: WatchlistAnime | null;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, data: Partial<WatchlistAnime>) => Promise<void>;
}

export default function EditProgressModal({ item, open, onClose, onSave }: EditProgressModalProps) {
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(0);
  const [totalEpisodes, setTotalEpisodes] = useState<number | ''>('');
  const [remainingTimeSec, setRemainingTimeSec] = useState<number | ''>('');
  const [status, setStatus] = useState<WatchlistAnime['status']>('comecar');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !item) return;
    setSeason(item.season);
    setEpisode(item.episode);
    setTotalEpisodes(item.totalEpisodes ?? '');
    setRemainingTimeSec(item.remainingTimeSec ?? '');
    setStatus(item.status);
    setNote(item.note || '');
  }, [open, item]);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-card border p-6 space-y-4">
        <h3 className="text-lg font-bold">Editar progresso</h3>
        <p className="text-sm text-muted-foreground">{item.title}</p>

        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1 text-sm">
            Temporada
            <input
              type="number"
              min={1}
              value={season}
              onChange={(e) => setSeason(Number(e.target.value))}
              className="w-full rounded-lg border px-3 py-2 bg-background"
            />
          </label>
          <label className="space-y-1 text-sm">
            Episódio
            <input
              type="number"
              min={0}
              value={episode}
              onChange={(e) => setEpisode(Number(e.target.value))}
              className="w-full rounded-lg border px-3 py-2 bg-background"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1 text-sm">
            Total de eps
            <input
              type="number"
              min={0}
              value={totalEpisodes}
              onChange={(e) => setTotalEpisodes(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full rounded-lg border px-3 py-2 bg-background"
            />
          </label>
          <label className="space-y-1 text-sm">
            Tempo restante (seg)
            <input
              type="number"
              min={0}
              value={remainingTimeSec}
              onChange={(e) =>
                setRemainingTimeSec(e.target.value === '' ? '' : Number(e.target.value))
              }
              className="w-full rounded-lg border px-3 py-2 bg-background"
            />
          </label>
        </div>

        <label className="space-y-1 text-sm block">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as WatchlistAnime['status'])}
            className="w-full rounded-lg border px-3 py-2 bg-background"
          >
            <option value="comecar">Começar</option>
            <option value="continuar">Continuar</option>
            <option value="seguir">Seguindo</option>
            <option value="terminado">Terminado</option>
          </select>
        </label>

        <label className="space-y-1 text-sm block">
          Nota
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 bg-background min-h-20"
          />
        </label>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              try {
                await onSave(item.id, {
                  season,
                  episode,
                  totalEpisodes: totalEpisodes === '' ? null : totalEpisodes,
                  remainingTimeSec: remainingTimeSec === '' ? null : remainingTimeSec,
                  status,
                  note,
                });
                onClose();
              } finally {
                setSaving(false);
              }
            }}
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ImportBackupModal({
  open,
  onClose,
  onImport,
}: {
  open: boolean;
  onClose: () => void;
  onImport: (items: Record<string, unknown>[]) => Promise<void>;
}) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl bg-card border p-6 space-y-4">
        <h3 className="text-lg font-bold">Importar backup JSON</h3>
        <p className="text-sm text-muted-foreground">
          Cole o JSON exportado do app watchlist antigo.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-40 rounded-lg border px-3 py-2 bg-background font-mono text-xs"
          placeholder='[{"title":"...", "malId": 123, "ep": 5, ...}]'
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              setError('');
              try {
                const parsed = JSON.parse(text);
                const items = Array.isArray(parsed) ? parsed : parsed.items;
                if (!Array.isArray(items)) throw new Error('JSON inválido');
                await onImport(items);
                setText('');
                onClose();
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao importar');
              } finally {
                setLoading(false);
              }
            }}
          >
            Importar
          </Button>
        </div>
      </div>
    </div>
  );
}

const EXTENSION_DOCS_URL = '/extensao/crunchyroll';

interface ExtensionPanelProps {
  status: ExtensionDetectStatus;
  onRecheck?: () => void;
}

export function ExtensionPanel({ status, onRecheck }: ExtensionPanelProps) {
  if (status === 'idle' || status === 'checking') {
    return (
      <div className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        Verificando extensão Orbe Sync...
      </div>
    );
  }

  if (status === 'installed') {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-600" />
          <h3 className="font-bold text-green-800 dark:text-green-300">
            Extensão Orbe Sync detectada
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Abra sua fila na Crunchyroll e sincronize pelo popup. Se ainda não conectou sua conta,
          faça isso uma vez abaixo.
        </p>
        <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
          <Link href="/extensao">Conectar conta</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-primary/30 bg-accent p-5 space-y-4">
      <div className="flex items-start gap-3">
        <PlugZap className="h-6 w-6 text-primary shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h3 className="font-bold text-primary">Sincronize sua fila da Crunchyroll</h3>
          <p className="text-sm text-muted-foreground">
            A extensão Orbe Sync importa automaticamente os animes da sua fila — com episódio,
            temporada e tempo restante — direto para esta lista. Você instala <strong>uma vez</strong>{' '}
            no Chrome e pronto; não precisa repetir a cada uso.
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Código aberto: você pode ler tudo antes de instalar</li>
            <li>Só lê a fila que você abrir na Crunchyroll — nada escondido</li>
            <li>Não pede senha da Crunchyroll</li>
          </ul>
        </div>
      </div>
      <Button asChild className="bg-primary hover:bg-primary/90">
        <Link href={EXTENSION_DOCS_URL}>
          <Download className="h-4 w-4 mr-2" />
          Instalar extensão
        </Link>
      </Button>
      {onRecheck && (
        <button
          type="button"
          onClick={onRecheck}
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-primary"
        >
          Já instalei — verificar novamente
        </button>
      )}
    </div>
  );
}
