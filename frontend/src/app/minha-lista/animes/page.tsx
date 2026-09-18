'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Upload, RefreshCw, X } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import {
  useWatchlistStore,
  filterWatchlistItems,
} from '@/stores/watchlistStore';
import WatchlistAnimeCard, { WatchlistFilterTabs } from '@/components/watchlist/WatchlistAnimeCard';
import EditProgressModal, {
  ExtensionPanel,
  ImportBackupModal,
} from '@/components/watchlist/WatchlistModals';
import { Button } from '@/components/ui/button';
import { useExtensionDetector } from '@/hooks/useExtensionDetector';
import OfflineBanner from '@/components/ui/OfflineBanner';
import PushOptInBanner from '@/components/support/PushOptInBanner';
import type { WatchlistAnime } from '@/types';

export default function MinhaListaAnimesPage() {
  const { isAuthenticated } = useAppStore();
  const { status: extensionStatus, recheck: recheckExtension } = useExtensionDetector(isAuthenticated);
  const {
    items,
    lastSyncedAt,
    isLoading,
    error,
    syncFeedback,
    filter,
    fetchItems,
    setFilter,
    removeItem,
    updateItem,
    syncItems,
    clearSyncFeedback,
  } = useWatchlistStore();
  const [editItem, setEditItem] = useState<WatchlistAnime | null>(null);
  const [backupOpen, setBackupOpen] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) fetchItems();
  }, [isAuthenticated, fetchItems]);

  const filtered = useMemo(() => filterWatchlistItems(items, filter), [items, filter]);

  const counts = useMemo(
    () => ({
      all: items.length,
      andamento: filterWatchlistItems(items, 'andamento').length,
      comecar: filterWatchlistItems(items, 'comecar').length,
      terminado: filterWatchlistItems(items, 'terminado').length,
      dub: filterWatchlistItems(items, 'dub').length,
    }),
    [items]
  );

  const lastSyncedLabel = useMemo(() => {
    if (!lastSyncedAt) return null;
    try {
      return format(new Date(lastSyncedAt), "d 'de' MMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
    } catch {
      return lastSyncedAt;
    }
  }, [lastSyncedAt]);

  const handleRemove = async (id: string) => {
    if (!window.confirm('Remover este anime da sua lista?')) return;
    setRemovingId(id);
    try {
      await removeItem(id);
    } catch {
      // feedback handled in store
    } finally {
      setRemovingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-3xl font-extrabold">Minha Lista · Animes</h1>
        <p className="text-muted-foreground">Faça login para ver e sincronizar sua watchlist.</p>
        <Button asChild>
          <Link href="/login">Entrar no Orbe</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <OfflineBanner />
      <PushOptInBanner />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/minha-lista" className="text-sm text-muted-foreground hover:text-primary">
            ← Minha Lista
          </Link>
          <h1 className="text-3xl font-extrabold mt-2">Animes</h1>
          <p className="text-muted-foreground mt-1">{items.length} títulos na sua lista</p>
          {lastSyncedLabel ? (
            <p className="text-xs text-muted-foreground mt-1">
              Última sincronização: {lastSyncedLabel}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">Nenhuma sincronização registrada ainda.</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => fetchItems()}>
            <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
          </Button>
          <Button variant="outline" onClick={() => setBackupOpen(true)}>
            <Upload className="h-4 w-4 mr-2" /> Importar backup
          </Button>
        </div>
      </div>

      {syncFeedback && (
        <div
          className={`rounded-lg border p-4 text-sm flex items-start justify-between gap-3 ${
            syncFeedback.type === 'success'
              ? 'border-green-500/30 bg-green-500/5 text-green-800 dark:text-green-300'
              : 'border-destructive/30 bg-destructive/5 text-destructive'
          }`}
          role="status"
        >
          <span>{syncFeedback.message}</span>
          <button
            type="button"
            onClick={clearSyncFeedback}
            className="shrink-0 opacity-70 hover:opacity-100"
            aria-label="Fechar aviso"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <ExtensionPanel status={extensionStatus} onRecheck={recheckExtension} />

      <WatchlistFilterTabs value={filter} onChange={setFilter} counts={counts} />

      {isLoading && (
        <div className="py-16 text-center text-muted-foreground">Carregando sua lista...</div>
      )}

      {error && !syncFeedback && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
          {error}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="rounded-xl border border-dashed p-10 text-center space-y-4">
          <p className="text-muted-foreground">
            {extensionStatus === 'installed'
              ? 'Nenhum anime na lista ainda. Abra sua fila na Crunchyroll e sincronize pelo popup da extensão.'
              : 'Nenhum anime na lista ainda. Instale a extensão Orbe Sync para importar sua fila da Crunchyroll automaticamente.'}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {extensionStatus === 'installed' ? (
              <Button asChild>
                <Link href="/extensao">Conectar conta</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/extensao/crunchyroll">Instalar extensão</Link>
              </Button>
            )}
            <Button variant="outline" onClick={() => setBackupOpen(true)}>
              Importar backup JSON
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((item) => (
          <WatchlistAnimeCard
            key={item.id}
            item={item}
            onEdit={setEditItem}
            onRemove={handleRemove}
            removing={removingId === item.id}
          />
        ))}
      </div>

      <EditProgressModal
        item={editItem}
        open={!!editItem}
        onClose={() => setEditItem(null)}
        onSave={updateItem}
      />

      <ImportBackupModal
        open={backupOpen}
        onClose={() => setBackupOpen(false)}
        onImport={async (rawItems) => {
          await syncItems(rawItems);
        }}
      />
    </div>
  );
}
