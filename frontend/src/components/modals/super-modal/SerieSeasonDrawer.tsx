'use client';

import { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import orbeNerdApi from '@/lib/api';
import SafeImage from '@/components/ui/SafeImage';

export type SerieSeasonEpisode = {
  episodeNumber: number;
  name: string;
  overview: string;
  runtime: number | null;
  stillUrl: string | null;
  airDate: string | null;
};

type Props = {
  tmdbId: number;
  seasonNumber: number;
  seasonLabel: string;
  onClose: () => void;
};

export default function SerieSeasonDrawer({ tmdbId, seasonNumber, seasonLabel, onClose }: Props) {
  const [episodes, setEpisodes] = useState<SerieSeasonEpisode[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setEpisodes(null);

    orbeNerdApi
      .getSerieSeasonEpisodes(tmdbId, seasonNumber)
      .then((res) => {
        if (!cancelled) setEpisodes(res.episodes ?? []);
      })
      .catch(() => {
        if (!cancelled) setError('Não foi possível carregar os episódios.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tmdbId, seasonNumber]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Fechar"
        onClick={onClose}
      />
      <div className="relative h-full w-full max-w-md bg-background shadow-xl flex flex-col border-l border-border animate-in slide-in-from-right duration-200">
        <header className="flex items-start justify-between gap-3 p-4 border-b border-border shrink-0">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Temporada</p>
            <h3 className="text-lg font-bold leading-tight">{seasonLabel}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors shrink-0"
            aria-label="Fechar lista de episódios"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Carregando episódios...
            </div>
          )}
          {error && <p className="text-sm text-muted-foreground py-8 text-center">{error}</p>}
          {!loading && !error && episodes && episodes.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">Nenhum episódio listado.</p>
          )}
          {!loading && !error && episodes && episodes.length > 0 && (
            <ul className="space-y-4">
              {episodes.map((ep) => (
                <li key={ep.episodeNumber} className="flex gap-3">
                  <div className="w-28 shrink-0 aspect-video rounded-md overflow-hidden bg-muted">
                    {ep.stillUrl ? (
                      <SafeImage
                        src={ep.stillUrl}
                        alt=""
                        width={112}
                        height={63}
                        className="w-full h-full object-cover"
                        fallbackLabel={`E${ep.episodeNumber}`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground font-semibold">
                        E{ep.episodeNumber}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      Ep. {ep.episodeNumber}
                      {ep.airDate ? ` · ${ep.airDate}` : ''}
                      {ep.runtime ? ` · ${ep.runtime} min` : ''}
                    </p>
                    <p className="font-semibold text-sm leading-snug">{ep.name || `Episódio ${ep.episodeNumber}`}</p>
                    {ep.overview && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{ep.overview}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
