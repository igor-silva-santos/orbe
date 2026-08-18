'use client';

import { useCallback, useState } from 'react';
import { Calendar, ExternalLink, Gamepad2, Radio, Ticket, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MidiaCard from '@/components/media/MidiaCard';
import orbeNerdApi from '@/lib/api';
import type { Evento, EventoStatus, UserAction, UserInteraction, Filme, Serie, Anime, Jogo, TipoMidia } from '@/types';

const STATUS_LABELS: Record<EventoStatus, string> = {
  upcoming: 'Em breve',
  ongoing: 'Em andamento',
  past: 'Realizado',
};

const STATUS_STYLES: Record<EventoStatus, string> = {
  upcoming: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  ongoing: 'bg-sky-500/15 text-sky-700 dark:text-sky-400',
  past: 'bg-muted text-muted-foreground',
};

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

interface GameEventCardProps {
  evento: Evento;
  userInteractions: UserInteraction[];
  onInteraction: (action: UserAction, midia: Filme | Serie | Anime | Jogo, type: TipoMidia) => void;
  defaultExpanded?: boolean;
}

export const GameEventCard: React.FC<GameEventCardProps> = ({
  evento,
  userInteractions,
  onInteraction,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [detail, setDetail] = useState<Evento | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const status = evento.status ?? 'upcoming';
  const displayEvent = detail ?? evento;
  const hasMoreGames =
    (displayEvent.total_jogos_exibidos ?? displayEvent.jogos.length) < displayEvent.total_jogos;

  const loadFullEvent = useCallback(async () => {
    if (detail || loadingDetail) return;
    setLoadingDetail(true);
    try {
      const full = await orbeNerdApi.getEventoById(evento.id);
      setDetail(full);
    } catch (error) {
      console.error('Erro ao carregar detalhes do evento:', error);
    } finally {
      setLoadingDetail(false);
    }
  }, [detail, loadingDetail, evento.id]);

  const toggleExpanded = () => {
    const next = !expanded;
    setExpanded(next);
    if (next && hasMoreGames && !detail) {
      void loadFullEvent();
    }
  };

  const ticketUrl = status !== 'past' ? evento.url : null;

  return (
    <section className="orbe-block bg-card rounded-[20px] p-4 md:p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div className="space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-xl md:text-2xl orbe-text-primary flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-[var(--orbe-accent-2)] shrink-0" />
              {evento.nome}
            </h3>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${STATUS_STYLES[status]}`}>
              {STATUS_LABELS[status]}
            </span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0" />
            {formatEventDate(evento.data_inicio, evento.data_fim)}
          </p>
          {evento.descricao && (
            <p className="text-sm orbe-text-secondary">{evento.descricao}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span className="text-xs font-bold orbe-text-primary bg-muted px-3 py-1 rounded-full border-2 border-[var(--orbe-block-border)]">
            {displayEvent.total_jogos} anúncio(s)
            {evento.total_jogos_catalogo != null && evento.total_jogos_catalogo > displayEvent.total_jogos && (
              <span className="text-muted-foreground font-normal">
                {' '}
                ({evento.total_jogos_catalogo} no catálogo IGDB)
              </span>
            )}
          </span>
          {ticketUrl && (
            <a
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="orbe-block-sm orbe-block-sm-hover inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-[10px]"
            >
              <Ticket className="h-3.5 w-3.5" />
              Site / ingressos
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {evento.live_stream_url && (
            <a
              href={evento.live_stream_url}
              target="_blank"
              rel="noopener noreferrer"
              className="orbe-block-sm orbe-block-sm-hover inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-[10px]"
            >
              <Radio className="h-3.5 w-3.5" />
              Transmissão
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {evento.link_igdb && (
            <a
              href={evento.link_igdb}
              target="_blank"
              rel="noopener noreferrer"
              className="orbe-block-sm orbe-block-sm-hover inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-[10px]"
            >
              IGDB <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>

      {displayEvent.jogos.length > 0 && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={toggleExpanded}
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Ocultar jogos anunciados
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Ver jogos anunciados ({displayEvent.jogos.length}
                {displayEvent.total_jogos > displayEvent.jogos.length
                  ? ` de ${displayEvent.total_jogos}`
                  : ''}
                )
              </>
            )}
          </button>

          {expanded && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
              {loadingDetail && (
                <p className="text-sm text-muted-foreground py-4">Carregando lista completa...</p>
              )}
              {!loadingDetail &&
                displayEvent.jogos.map((jogo) => (
                  <div key={jogo.id} className="flex-shrink-0 w-[170px] sm:w-[190px]">
                    <MidiaCard
                      midia={jogo}
                      type="jogo"
                      userInteractions={userInteractions}
                      onInteraction={onInteraction}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {displayEvent.jogos.length === 0 && status === 'past' && (
        <p className="text-sm text-muted-foreground flex items-start gap-2">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          Nenhum jogo vinculado neste evento no Orbe. Os dados vêm da IGDB — rode o sync de jogos
          para atualizar.
        </p>
      )}
    </section>
  );
};

export default GameEventCard;
