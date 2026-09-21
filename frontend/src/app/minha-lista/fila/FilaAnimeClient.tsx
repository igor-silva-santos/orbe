'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import MinhaListaNav from '@/components/minha-lista/MinhaListaNav';
import SafeImage from '@/components/ui/SafeImage';
import orbeNerdApi from '@/lib/api';
import { useAppStore } from '@/stores/appStore';
import type { Anime } from '@/types';

type CrCatalog = {
  episodesSubCount?: number | null;
  episodesDubPtBrCount?: number | null;
  subFrontier?: { season: number; episode: number } | null;
  dubPtBrFrontier?: { season: number; episode: number } | null;
};

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
  crMeta?: { preferredAudio?: string; catalog?: CrCatalog | null } | null;
};

function formatTe(pos: { season: number; episode: number } | null | undefined): string | null {
  if (!pos) return null;
  return `T${pos.season}E${pos.episode}`;
}

function catalogHint(row: FilaItem): string | null {
  const cat = row.crMeta?.catalog;
  if (!cat) return null;
  const parts: string[] = [];
  if (cat.episodesSubCount != null) parts.push(`${cat.episodesSubCount} eps no ar`);
  if (cat.episodesDubPtBrCount != null) parts.push(`${cat.episodesDubPtBrCount} dublados PT-BR`);
  const sub = formatTe(cat.subFrontier);
  const dub = formatTe(cat.dubPtBrFrontier);
  if (sub) parts.push(`sub até ${sub}`);
  if (dub) parts.push(`dub até ${dub}`);
  return parts.length ? parts.join(' · ') : null;
}

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
        description="Sincronizado da Crunchyroll. Prioridade: Continuar → A seguir → Começar. “Aguardando dublagem” = sub à frente da dublagem BR; “Aguardando novo episódio” = falta ep no ar."
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
                  <p
                    className={`text-sm font-medium ${
                      row.st === 'esperando_dublagem' || row.st === 'esperando_episodio'
                        ? 'text-amber-600 dark:text-amber-500'
                        : 'text-primary'
                    }`}
                  >
                    {row.statusLabel}
                  </p>
                  {row.badgeLabel && (
                    <p className="text-xs text-muted-foreground truncate">{row.badgeLabel}</p>
                  )}
                  {catalogHint(row) && (
                    <p className="text-xs text-muted-foreground truncate">{catalogHint(row)}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    T{row.season ?? 1} · E{row.ep ?? '?'}
                    {row.dub || row.crMeta?.preferredAudio === 'pt-BR' ? ' · Trilha PT-BR' : ' · Leg/sub'}
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
