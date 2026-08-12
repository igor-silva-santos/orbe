'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import orbeNerdApi from '@/lib/api';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import PageHeader from '@/components/layout/PageHeader';
import { GameEventCard } from '@/components/ui/GameEventCard';
import type { EventoResumo } from '@/types';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';

export default function EventosPage() {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const [resumo, setResumo] = useState<EventoResumo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResumo = async () => {
      setIsLoading(true);
      try {
        const data = await orbeNerdApi.getEventosResumo();
        setResumo(data);
      } catch (error) {
        console.error('Erro ao carregar resumo de eventos:', error);
        setResumo(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadResumo();
  }, []);

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
        description="Conferências, showcases e premiações de games — tudo que vem por aí em um só lugar."
      />

      {!isLoading && resumo && (
        <div className="flex flex-wrap gap-3 mb-6 -mt-2">
          <div className="orbe-block-sm bg-card px-4 py-2 rounded-full text-xs font-bold orbe-text-primary">
            {resumo.eventos_games.length} eventos de games
          </div>
        </div>
      )}

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
            E3, Gamescom, State of Play e outros showcases com os jogos anunciados.
          </p>

          {resumo.eventos_games.length === 0 ? (
            <div className="orbe-block bg-card rounded-[20px] p-8 text-center">
              <p className="text-muted-foreground">
                Nenhum evento de games no momento. Os dados são sincronizados da IGDB junto com os jogos.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {resumo.eventos_games.map((evento) => (
                <GameEventCard key={evento.id} evento={evento} userInteractions={userInteractions} onInteraction={handleInteraction} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
