'use client';

import { Calendar, ExternalLink, Gamepad2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MidiaCard from '@/components/media/MidiaCard';
import HorizontalScrollRow from '@/components/ui/HorizontalScrollRow';
import type { Evento, UserAction, UserInteraction, Filme, Serie, Anime, Jogo, TipoMidia } from '@/types';

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
}

export const GameEventCard: React.FC<GameEventCardProps> = ({ evento, userInteractions, onInteraction }) => (
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
      <HorizontalScrollRow scrollbar="hide">
        {evento.jogos.map((jogo) => (
          <div key={jogo.id} className="flex-shrink-0 w-[170px] sm:w-[190px]">
            <MidiaCard midia={jogo} type="jogo" userInteractions={userInteractions} onInteraction={onInteraction} />
          </div>
        ))}
      </HorizontalScrollRow>
    )}
  </section>
);

export default GameEventCard;
