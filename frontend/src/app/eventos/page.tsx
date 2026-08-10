'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Gamepad2, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import orbeNerdApi from '@/lib/api';
import MidiaCard from '@/components/media/MidiaCard';
import PageHeader from '@/components/layout/PageHeader';
import type { Evento } from '@/types';

type TabId = 'upcoming' | 'ongoing' | 'past' | 'all';

const TABS: { id: TabId; label: string }[] = [
  { id: 'upcoming', label: 'Próximos' },
  { id: 'ongoing', label: 'Em andamento' },
  { id: 'past', label: 'Recentes' },
  { id: 'all', label: 'Todos' },
];

const formatEventDate = (start?: string | null, end?: string | null) => {
  if (!start) return 'Data a confirmar';
  try {
    const startLabel = format(parseISO(start), "d 'de' MMMM yyyy", { locale: ptBR });
    if (!end) return startLabel;
    const endLabel = format(parseISO(end), "d 'de' MMMM yyyy", { locale: ptBR });
    return `${startLabel} — ${endLabel}`;
  } catch {
    return 'Data a confirmar';
  }
};

export default function EventosPage() {
  const [events, setEvents] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('upcoming');

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const status = activeTab === 'all' ? undefined : activeTab;
        const data = await orbeNerdApi.getEventos(status);
        setEvents(data);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [activeTab]);

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
        description="Conferências e showcases de games — E3, Gamescom, State of Play e mais."
      />

      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-colors ${
              activeTab === tab.id
                ? 'orbe-pill-active'
                : 'orbe-text-primary border-[var(--orbe-block-border)] hover:bg-muted'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="loading-spinner h-8 w-8" />
        </div>
      ) : events.length === 0 ? (
        <div className="orbe-block bg-card rounded-[20px] p-10 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold orbe-text-primary mb-2">Nenhum evento encontrado</h3>
          <p className="text-muted-foreground">
            Os eventos são sincronizados da IGDB junto com os jogos. Rode o sync de games para popular esta seção.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((evento) => (
            <section key={evento.id} className="orbe-block bg-card rounded-[20px] p-4 md:p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="space-y-2 min-w-0">
                  <h2 className="font-display text-xl md:text-2xl orbe-text-primary flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5 text-[var(--orbe-accent-2)] shrink-0" />
                    {evento.nome}
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 shrink-0" />
                    {formatEventDate(evento.data_inicio, evento.data_fim)}
                  </p>
                  {evento.descricao && (
                    <p className="text-sm orbe-text-secondary line-clamp-3">{evento.descricao}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold orbe-text-primary bg-muted px-3 py-1 rounded-full border-2 border-[var(--orbe-block-border)]">
                    {evento.total_jogos} jogos
                  </span>
                  {evento.url && (
                    <a
                      href={evento.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="orbe-block-sm orbe-block-sm-hover inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-[10px]"
                    >
                      Site <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

              {evento.jogos.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                  {evento.jogos.map((jogo) => (
                    <div key={jogo.id} className="flex-shrink-0 w-[170px] sm:w-[190px]">
                      <MidiaCard midia={jogo} type="jogo" />
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
