'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Info } from 'lucide-react';
import orbeNerdApi from '@/lib/api';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import PageHeader from '@/components/layout/PageHeader';
import { GameEventCard } from '@/components/ui/GameEventCard';
import type { Evento, EventoStatus } from '@/types';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';

const CURRENT_YEAR = new Date().getFullYear();

const SECTION_ORDER: EventoStatus[] = ['ongoing', 'upcoming', 'past'];

const SECTION_TITLES: Record<EventoStatus, string> = {
  ongoing: 'Em andamento',
  upcoming: 'Próximos eventos',
  past: 'Já realizados',
};

export default function EventosPage() {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const [year, setYear] = useState(CURRENT_YEAR);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    void orbeNerdApi
      .getEventosAno(year)
      .then((data) => {
        if (!cancelled) setEventos(data.eventos);
      })
      .catch((error) => {
        console.error('Erro ao carregar eventos:', error);
        if (!cancelled) setEventos([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [year]);

  const grouped = useMemo(() => {
    const buckets: Record<EventoStatus, Evento[]> = {
      upcoming: [],
      ongoing: [],
      past: [],
    };
    for (const evento of eventos) {
      const status = evento.status ?? 'upcoming';
      buckets[status].push(evento);
    }
    buckets.past.sort((a, b) => {
      const da = a.data_inicio ? new Date(a.data_inicio).getTime() : 0;
      const db = b.data_inicio ? new Date(b.data_inicio).getTime() : 0;
      return db - da;
    });
    return buckets;
  }, [eventos]);

  const yearOptions = useMemo(() => {
    const years = new Set<number>();
    for (let y = CURRENT_YEAR + 1; y >= CURRENT_YEAR - 3; y -= 1) years.add(y);
    years.add(year);
    return Array.from(years).sort((a, b) => b - a);
  }, [year]);

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
        title="Eventos de games"
        description="Showcases, conferências e premiações — calendário do ano com os jogos anunciados em cada evento."
      />

      <div className="flex flex-wrap items-center gap-3 mb-4 -mt-2">
        <label className="flex items-center gap-2 text-sm font-semibold orbe-text-primary">
          <Calendar className="h-4 w-4" />
          Ano
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            className="bg-muted border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
        {!isLoading && (
          <span className="orbe-block-sm bg-card px-4 py-2 rounded-full text-xs font-bold orbe-text-primary">
            {eventos.length} evento(s) em {year}
          </span>
        )}
      </div>

      <div className="orbe-block-sm bg-muted/50 border border-border rounded-xl p-4 mb-6 text-sm text-muted-foreground flex gap-2">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          Dados sincronizados da{' '}
          <a href="https://www.igdb.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            IGDB
          </a>
          . As datas e a lista de jogos refletem o que está no catálogo Orbe após o sync — jogos
          só entram quando o lançamento é coerente com o evento. Links de ingresso aparecem quando
          a IGDB registra o site oficial do evento.
        </p>
      </div>

      {isLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-full max-w-xl">
              <MidiaCardSkeleton />
            </div>
          ))}
        </div>
      ) : eventos.length === 0 ? (
        <div className="orbe-block bg-card rounded-[20px] p-10 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold orbe-text-primary mb-2">Nenhum evento em {year}</h3>
          <p className="text-muted-foreground">
            Os eventos são importados durante o sync de jogos. Tente outro ano ou aguarde a próxima sincronização.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {SECTION_ORDER.map((status) => {
            const list = grouped[status];
            if (list.length === 0) return null;
            return (
              <section key={status} className="space-y-4">
                <h2 className="text-lg font-bold orbe-text-primary">{SECTION_TITLES[status]}</h2>
                <div className="space-y-6">
                  {list.map((evento) => (
                    <GameEventCard
                      key={evento.id}
                      evento={evento}
                      userInteractions={userInteractions}
                      onInteraction={handleInteraction}
                      defaultExpanded={status === 'ongoing'}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
