'use client';

import MidiaCard from '@/components/media/MidiaCard';
import type { Anime, Filme, Jogo, Serie, TipoMidia, UserAction, UserInteraction } from '@/types';

interface HorizontalMediaRowProps {
  items: Array<Filme | Serie | Anime | Jogo>;
  type: TipoMidia;
  userInteractions: UserInteraction[];
  onInteraction: (action: UserAction, midia: Filme | Serie | Anime | Jogo, type: TipoMidia) => void;
}

/** Fileira horizontal simples de cards — usada nas gavetas "O que vem aí" / "Destaques recentes". */
export function HorizontalMediaRow({ items, type, userInteractions, onInteraction }: HorizontalMediaRowProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
      {items.map((item) => (
        <div key={`${type}-${item.id}`} className="flex-shrink-0 w-[170px] sm:w-[190px]">
          <MidiaCard midia={item} type={type} userInteractions={userInteractions} onInteraction={onInteraction} />
        </div>
      ))}
    </div>
  );
}

export default HorizontalMediaRow;
