'use client';

import { useCallback, useEffect, useState } from 'react';
import { X, Calendar, Clock, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { apiClient } from '@/lib/api';
import SafeImage from '@/components/ui/SafeImage';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';
import { sanitizeTranslatedText } from '@/lib/media-helpers';
import type { TemporadaDetalhe } from '@/types';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function formatDisplayDate(dateStr: string | null | undefined): string | null {
  if (!dateStr) return null;
  try {
    const parsed = parseISO(dateStr);
    if (Number.isNaN(parsed.getTime())) return null;
    return format(parsed, 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return null;
  }
}

export default function SeasonModal() {
  const { isSeasonModalOpen, seasonModalData, closeSeasonModal } = useAppStore();
  const [details, setDetails] = useState<TemporadaDetalhe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = useCallback(() => {
    closeSeasonModal();
    setDetails(null);
    setError(false);
  }, [closeSeasonModal]);

  useEffect(() => {
    if (!isSeasonModalOpen || !seasonModalData) {
      setDetails(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    void apiClient
      .get(`/series/${seasonModalData.serieId}/seasons/${seasonModalData.seasonNumber}`)
      .then((data) => {
        if (!cancelled) setDetails(data as TemporadaDetalhe);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isSeasonModalOpen, seasonModalData]);

  useEffect(() => {
    if (!isSeasonModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isSeasonModalOpen, handleClose]);

  if (!isSeasonModalOpen || !seasonModalData) return null;

  const seasonLabel =
    seasonModalData.seasonName ||
    details?.nome ||
    (seasonModalData.seasonNumber === 0
      ? 'Especiais'
      : `Temporada ${seasonModalData.seasonNumber}`);
  const serieTitle = details?.serie_titulo || seasonModalData.serieTitle;
  const seasonDate = formatDisplayDate(details?.data_exibicao);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm overflow-y-auto overflow-x-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="container mx-auto px-4 py-8 max-w-full">
        <div className="bg-background rounded-lg shadow-xl max-w-3xl mx-auto relative overflow-hidden">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-muted transition-colors"
            aria-label="Fechar temporada"
          >
            <X className="h-5 w-5 text-primary" />
          </button>

          {loading && (
            <div className="flex items-center justify-center min-h-[min(50vh,400px)] p-12">
              <LoadingIndicator message="Carregando temporada..." size="lg" />
            </div>
          )}

          {!loading && error && (
            <div className="p-8 text-center text-destructive">
              Não foi possível carregar os detalhes desta temporada.
            </div>
          )}

          {!loading && !error && details && (
            <div className="p-4 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <SafeImage
                    src={details.poster_url}
                    alt={`Pôster de ${seasonLabel}`}
                    width={400}
                    height={600}
                    className="rounded-lg shadow-lg w-full"
                    fallbackLabel="Sem imagem"
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <ChevronRight className="h-4 w-4" />
                    {serieTitle}
                  </p>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{seasonLabel}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {seasonDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Exibição: {seasonDate}
                      </span>
                    )}
                    <span>{details.episodios.length} episódio(s)</span>
                  </div>
                </div>
              </div>

              {details.sinopse && (
                <section>
                  <h2 className="text-xl font-bold mb-2 text-yellow-500 dark:text-blue-400">Sinopse</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {sanitizeTranslatedText(details.sinopse)}
                  </p>
                </section>
              )}

              {details.episodios.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Episódios</h2>
                  <div className="space-y-3">
                    {details.episodios.map((ep) => {
                      const epDate = formatDisplayDate(ep.data_exibicao);
                      return (
                        <div
                          key={ep.numero}
                          className="flex gap-3 bg-muted rounded-lg p-3 items-start"
                        >
                          {ep.still_url && (
                            <SafeImage
                              src={ep.still_url}
                              alt={ep.nome || `Episódio ${ep.numero}`}
                              width={120}
                              height={68}
                              className="rounded-md object-cover w-28 h-16 shrink-0"
                              fallbackLabel="?"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-foreground">
                                {ep.numero}. {ep.nome || 'Sem título'}
                              </span>
                              {epDate && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {epDate}
                                </span>
                              )}
                              {ep.duracao_min != null && ep.duracao_min > 0 && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {ep.duracao_min} min
                                </span>
                              )}
                            </div>
                            {ep.sinopse && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                                {sanitizeTranslatedText(ep.sinopse)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
