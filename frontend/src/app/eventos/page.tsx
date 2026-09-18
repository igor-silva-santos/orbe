'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import orbeNerdApi from '@/lib/api';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import PageHeader from '@/components/layout/PageHeader';
import { GameEventCard } from '@/components/ui/GameEventCard';
import type { EventoResumo } from '@/types';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 6 }, (_, index) => CURRENT_YEAR - index);

export default function EventosPage() {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const [resumo, setResumo] = useState<EventoResumo | null>(null);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [isLoading, setIsLoading] = useState(true);

  const loadResumo = useCallback(async (year: number) => {
    setIsLoading(true);
    try {
      const data = await orbeNerdApi.getEventosResumo(year);
      setResumo(data);
    } catch (error) {
      console.error('Erro ao carregar resumo de eventos:', error);
      setResumo(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadResumo(selectedYear);
  }, [selectedYear, loadResumo]);

  const relevantEvents = useMemo(() => {
    if (!resumo) return [];
    return resumo.eventos_games.filter(
      (evento) => (evento.jogos?.length ?? evento.total_jogos ?? 0) > 0,
    );
  }, [resumo]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold orbe-text-secondary hover:orbe-text-primary mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao início
      </Link>

      <PageHeader
        title="Eventos"
        description="Conferências e showcases com anúncios de jogos — por padrão, só o ano atual."
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Ano
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm orbe-text-primary"
          >
            {YEAR_OPTIONS.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        {!isLoading && resumo && (
          <div className="orbe-block-sm bg-card px-4 py-2 rounded-full text-xs font-bold orbe-text-primary">
            {relevantEvents.length} eventos com anúncios em {selectedYear}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[170px]">
              <MidiaCardSkeleton />
            </div>
          ))}
        </div>
      ) : !resumo ? (
        <div className="orbe-block bg-card rounded-[20px] p-10 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold orbe-text-primary mb-2">Não foi possível carregar o relatório</h3>
          <p className="text-muted-foreground">Tente novamente em alguns instantes.</p>
        </div>
      ) : (
        <section className="space-y-5">
          <p className="text-sm text-muted-foreground -mt-2">
            E3, Gamescom, State of Play e outros showcases com jogos anunciados — apenas eventos com conteúdo relevante.
          </p>

          {relevantEvents.length === 0 ? (
            <div className="orbe-block bg-card rounded-[20px] p-8 text-center">
              <p className="text-muted-foreground">
                Nenhum evento com anúncios em {selectedYear}. Tente outro ano no filtro acima.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {relevantEvents.map((evento) => (
                <GameEventCard
                  key={evento.id}
                  evento={evento}
                  userInteractions={userInteractions}
                  onInteraction={handleInteraction}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
