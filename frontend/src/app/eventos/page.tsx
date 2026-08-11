'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clapperboard,
  ExternalLink,
  Film,
  Gamepad2,
  Sparkles,
  Tv,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import orbeNerdApi from '@/lib/api';
import MidiaCard from '@/components/media/MidiaCard';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import PageHeader from '@/components/layout/PageHeader';
import type { Anime, Evento, EventoResumo, Filme, Jogo, Serie, TipoMidia, UserAction, UserInteraction } from '@/types';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';

type TabId = 'eventos' | 'proximos' | 'destaques';

const TABS: { id: TabId; label: string; anchor: string }[] = [
  { id: 'eventos', label: 'Próximos eventos', anchor: 'eventos-games' },
  { id: 'proximos', label: 'O que vem aí', anchor: 'o-que-vem-ai' },
  { id: 'destaques', label: 'Destaques recentes', anchor: 'destaques-recentes' },
];

const PROXIMOS_SECTIONS: {
  key: keyof EventoResumo['proximos'];
  label: string;
  type: TipoMidia;
  icon: typeof Film;
}[] = [
  { key: 'filmes', label: 'Filmes', type: 'filme', icon: Film },
  { key: 'series', label: 'Séries', type: 'serie', icon: Tv },
  { key: 'animes', label: 'Animes', type: 'anime', icon: Sparkles },
  { key: 'jogos', label: 'Jogos', type: 'jogo', icon: Gamepad2 },
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

const tabButtonClass = (isActive: boolean) =>
  `px-4 py-2 rounded-full text-sm font-bold border-2 transition-colors ${
    isActive
      ? 'orbe-pill-active'
      : 'orbe-text-primary border-[var(--orbe-block-border)] hover:bg-muted'
  }`;

const scrollToSection = (anchor: string, setActiveTab: (tab: TabId) => void, tab: TabId) => {
  setActiveTab(tab);
  const el = document.getElementById(anchor);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

type InteractionProps = {
  userInteractions: UserInteraction[];
  onInteraction: (action: UserAction, midia: Filme | Serie | Anime | Jogo, type: TipoMidia) => void;
};

const MediaCarousel = ({
  items,
  type,
  userInteractions,
  onInteraction,
}: {
  items: Array<Filme | Serie | Anime | Jogo>;
  type: TipoMidia;
} & InteractionProps) => {
  if (items.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
      {items.map((item) => (
        <div key={`${type}-${item.id}`} className="flex-shrink-0 w-[170px] sm:w-[190px]">
          <MidiaCard
            midia={item}
            type={type}
            showCountdown
            userInteractions={userInteractions}
            onInteraction={onInteraction}
          />
        </div>
      ))}
    </div>
  );
};

const GameEventCard = ({ evento, userInteractions, onInteraction }: { evento: Evento } & InteractionProps) => (
  <section className="orbe-block bg-card rounded-[20px] p-4 md:p-6 space-y-4">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
      <div className="space-y-2 min-w-0">
        <h3 className="font-display text-xl md:text-2xl orbe-text-primary flex items-center gap-2">
          <Gamepad2 className="h-5 w-5 text-[var(--orbe-accent-2)] shrink-0" />
          {evento.nome}
        </h3>
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
            <MidiaCard midia={jogo} type="jogo" userInteractions={userInteractions} onInteraction={onInteraction} />
          </div>
        ))}
      </div>
    )}
  </section>
);

export default function EventosPage() {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const [resumo, setResumo] = useState<EventoResumo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('eventos');

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

  const totalProximos = resumo
    ? resumo.proximos.filmes.length +
      resumo.proximos.series.length +
      resumo.proximos.animes.length +
      resumo.proximos.jogos.length
    : 0;

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
        description="Conferências de games, estreias e lançamentos — tudo que vem por aí em um só lugar."
      />

      {!isLoading && resumo && (
        <div className="flex flex-wrap gap-3 mb-6 -mt-2">
          <div className="orbe-block-sm bg-card px-4 py-2 rounded-full text-xs font-bold orbe-text-primary">
            {resumo.eventos_games.length} eventos de games
          </div>
          <div className="orbe-block-sm bg-card px-4 py-2 rounded-full text-xs font-bold orbe-text-primary">
            {totalProximos} lançamentos próximos
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-8 sticky top-16 z-20 bg-background/90 backdrop-blur-sm py-2 -mx-1 px-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => scrollToSection(tab.anchor, setActiveTab, tab.id)}
            className={tabButtonClass(activeTab === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-8">
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[170px]">
                <MidiaCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      ) : !resumo ? (
        <div className="orbe-block bg-card rounded-[20px] p-10 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold orbe-text-primary mb-2">Não foi possível carregar o relatório</h3>
          <p className="text-muted-foreground">Tente novamente em alguns instantes.</p>
        </div>
      ) : (
        <div className="space-y-12">
          <section id="eventos-games" className="scroll-mt-28 space-y-5">
            <h2 className="font-display text-2xl orbe-text-primary flex items-center gap-2 border-b border-[var(--orbe-divider)] pb-3">
              <Gamepad2 className="h-6 w-6 text-[var(--orbe-accent-2)]" />
              Próximos eventos de games
            </h2>
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

          <section id="o-que-vem-ai" className="scroll-mt-28 space-y-6">
            <h2 className="font-display text-2xl orbe-text-primary flex items-center gap-2 border-b border-[var(--orbe-divider)] pb-3">
              <Sparkles className="h-6 w-6 text-[var(--orbe-accent-2)]" />
              O que vem aí
            </h2>
            <p className="text-sm text-muted-foreground -mt-2">
              Filmes, séries, animes e jogos com estreia nos próximos 3 meses.
            </p>

            {totalProximos === 0 ? (
              <div className="orbe-block bg-card rounded-[20px] p-8 text-center">
                <p className="text-muted-foreground">Nenhum lançamento próximo encontrado.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {PROXIMOS_SECTIONS.map(({ key, label, type, icon: Icon }) => {
                  const items = resumo.proximos[key];
                  if (items.length === 0) return null;

                  return (
                    <div key={key} className="orbe-block bg-card rounded-[20px] p-4 md:p-6 space-y-4">
                      <h3 className="font-display text-lg orbe-text-primary flex items-center gap-2">
                        <Icon className="h-5 w-5 text-[var(--orbe-accent-2)]" />
                        {label}
                        <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-1">
                          {items.length}
                        </span>
                      </h3>
                      <MediaCarousel items={items} type={type} userInteractions={userInteractions} onInteraction={handleInteraction} />
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section id="destaques-recentes" className="scroll-mt-28 space-y-6">
            <h2 className="font-display text-2xl orbe-text-primary flex items-center gap-2 border-b border-[var(--orbe-divider)] pb-3">
              <Clapperboard className="h-6 w-6 text-[var(--orbe-accent-2)]" />
              Destaques recentes
            </h2>
            <p className="text-sm text-muted-foreground -mt-2">
              Em cartaz nos cinemas e eventos de games dos últimos 30 dias.
            </p>

            {resumo.destaques_recentes.filmes.length > 0 && (
              <div className="orbe-block bg-card rounded-[20px] p-4 md:p-6 space-y-4">
                <h3 className="font-display text-lg orbe-text-primary flex items-center gap-2">
                  <Film className="h-5 w-5 text-[var(--orbe-accent-2)]" />
                  Em cartaz
                </h3>
                <MediaCarousel items={resumo.destaques_recentes.filmes} type="filme" userInteractions={userInteractions} onInteraction={handleInteraction} />
              </div>
            )}

            {resumo.destaques_recentes.eventos.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-display text-lg orbe-text-primary flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-[var(--orbe-accent-2)]" />
                  Eventos recentes
                </h3>
                {resumo.destaques_recentes.eventos.map((evento) => (
                  <GameEventCard key={`recent-${evento.id}`} evento={evento} userInteractions={userInteractions} onInteraction={handleInteraction} />
                ))}
              </div>
            )}

            {resumo.destaques_recentes.filmes.length === 0 &&
              resumo.destaques_recentes.eventos.length === 0 && (
                <div className="orbe-block bg-card rounded-[20px] p-8 text-center">
                  <p className="text-muted-foreground">Nenhum destaque recente no momento.</p>
                </div>
              )}
          </section>
        </div>
      )}
    </div>
  );
}
