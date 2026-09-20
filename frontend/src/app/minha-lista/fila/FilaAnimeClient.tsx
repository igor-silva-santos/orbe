'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import MinhaListaNav from '@/components/minha-lista/MinhaListaNav';
import SafeImage from '@/components/ui/SafeImage';
import orbeNerdApi from '@/lib/api';
import { useAppStore } from '@/stores/appStore';
import type { Anime } from '@/types';

type FilaItem = {
  id: string;
  title: string | null;
  st: string;
  statusLabel: string;
  badgeLabel: string | null;
  ep: number | null;
  season: number | null;
  dub: number | null;
  anime: Anime | null;
};

export default function FilaAnimeClient() {
  const router = useRouter();
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const openSuperModal = useAppStore((s) => s.openSuperModal);
  const [items, setItems] = useState<FilaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    orbeNerdApi
      .getFilaAnimes()
      .then((data) => setItems(data.items ?? []))
      .catch(() => setError('Não foi possível carregar a fila.'))
      .finally(() => setLoading(false));
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <PageHeader
        title="Fila de animes"
        description="Organizador do que assistir a seguir — sincronizado da Crunchyroll (watchlist). Prioridade: Continuar → A seguir → Começar."
      />
      <MinhaListaNav />

      <p className="text-sm text-muted-foreground mb-6">
        Use a extensão Orbe na página{' '}
        <a
          href="https://www.crunchyroll.com/pt-br/watchlist"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          crunchyroll.com/pt-br/watchlist
        </a>
        . Ative “só dublagem PT-BR” no popup se quiser filtrar a trilha dublada brasileira.
      </p>

      {loading && (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      )}

      {!loading && error && <p className="text-destructive text-center py-12">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-center text-muted-foreground py-12 max-w-lg mx-auto">
          Nenhum anime na fila. Sincronize pela extensão na watchlist da Crunchyroll.
        </p>
      )}

      {!loading && !error && items.length > 0 && (
        <ul className="space-y-3 max-w-3xl">
          {items.map((row) => (
            <li key={row.id}>
              <button
                type="button"
                onClick={() => row.anime && openSuperModal(row.anime, 'anime')}
                className="w-full flex gap-3 items-center text-left rounded-xl border border-border bg-card p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="w-14 h-20 rounded-md overflow-hidden bg-muted shrink-0">
                  <SafeImage
                    src={row.anime?.poster_url_api}
                    alt={row.title || 'Anime'}
                    width={56}
                    height={80}
                    imageSize="w185"
                    className="w-full h-full object-cover"
                    fallbackLabel="?"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold orbe-text-primary truncate">{row.title}</p>
                  <p className="text-sm text-primary font-medium">{row.statusLabel}</p>
                  {row.badgeLabel && (
                    <p className="text-xs text-muted-foreground truncate">{row.badgeLabel}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    T{row.season ?? 1} · E{row.ep ?? '?'}
                    {row.dub ? ' · Dublagem PT-BR' : ''}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
