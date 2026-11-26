'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Clock, Languages } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import MinhaListaNav from '@/components/minha-lista/MinhaListaNav';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { useWatchlistStore } from '@/stores/watchlistStore';
import { isInPersonalQueue, sortWatchlistQueue } from '@/lib/watchlist-queue';
import { formatRemainingTime } from '@/lib/utils';

const STATUS_LABEL: Record<string, string> = {
  continuar: 'Continuar',
  seguir: 'Seguindo',
  novamente: 'De novo',
  comecar: 'Começar',
};

export default function FilaAnimeClient() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const { items, error, fetchItems } = useWatchlistStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;
    fetchItems().finally(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, [isAuthenticated, fetchItems]);

  const queue = useMemo(
    () => sortWatchlistQueue(items.filter((item) => isInPersonalQueue(item.status))),
    [items]
  );

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-3xl font-extrabold">Fila de animes</h1>
        <p className="text-muted-foreground">Faça login para ver sua fila.</p>
        <Button asChild>
          <Link href="/login">Entrar no Orbe</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 md:py-10">
      <PageHeader
        title="Fila de animes"
        description="O que assistir agora, na ordem Continuar, Seguindo, De novo e Começar. O episódio vem da sua lista e da sincronização com a Crunchyroll."
      />
      <MinhaListaNav />

      <p className="text-sm text-muted-foreground mb-6">
        Abra a fila em{' '}
        <a
          href="https://www.crunchyroll.com/pt-br/watchlist"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          crunchyroll.com/pt-br/watchlist
        </a>{' '}
        e sincronize pela extensão Orbe. Títulos já terminados ficam na lista completa.
      </p>

      {!ready && queue.length === 0 && (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      )}

      {ready && error && queue.length === 0 && (
        <p className="text-destructive text-center py-12">{error}</p>
      )}

      {ready && !error && queue.length === 0 && (
        <div className="text-center text-muted-foreground py-12 max-w-lg mx-auto space-y-4">
          <p>Nenhum anime na fila. Sincronize pela extensão ou adicione um título do catálogo.</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link href="/minha-lista/animes">Abrir lista de animes</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/extensao/crunchyroll">Instalar extensão</Link>
            </Button>
          </div>
        </div>
      )}

      {queue.length > 0 && (
        <ul className="space-y-3 max-w-3xl">
          {queue.map((row) => {
            const href = row.crunchyrollUrl || '/minha-lista/animes';
            const external = Boolean(row.crunchyrollUrl);
            return (
              <li key={row.id}>
                <Link
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="w-full flex gap-3 items-center text-left rounded-xl border border-border bg-card p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{row.title}</p>
                    <p className="text-sm font-medium text-primary">
                      {STATUS_LABEL[row.status] || row.status}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span>
                        T{row.season} · E{row.episode}
                        {row.totalEpisodes ? `/${row.totalEpisodes}` : ''}
                      </span>
                      {row.hasDub && (
                        <span className="inline-flex items-center gap-1">
                          <Languages className="h-3 w-3" /> Dublagem
                        </span>
                      )}
                      {row.remainingTimeSec != null && row.remainingTimeSec > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Restam {formatRemainingTime(row.remainingTimeSec)}
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
