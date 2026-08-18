'use client';

import MidiaCard from '@/components/media/MidiaCard';
import HorizontalScrollRow from '@/components/ui/HorizontalScrollRow';
import type { Anime, Filme, Jogo, Serie, TipoMidia, UserAction, UserInteraction } from '@/types';

interface HorizontalMediaRowProps {
  items: Array<Filme | Serie | Anime | Jogo>;
  type: TipoMidia;
  userInteractions: UserInteraction[];
  onInteraction: (action: UserAction, midia: Filme | Serie | Anime | Jogo, type: TipoMidia) => void;
  enableDrag?: boolean;
}

/** Fileira horizontal de cards — arrastar, wheel e sem seleção de imagem. */
export function HorizontalMediaRow({
  items,
  type,
  userInteractions,
  onInteraction,
  enableDrag = true,
}: HorizontalMediaRowProps) {
  if (items.length === 0) return null;

  return (
    <HorizontalScrollRow enableDrag={enableDrag}>
      {items.map((item) => (
        <div key={`${type}-${item.id}`} className="flex-shrink-0 w-[170px] sm:w-[190px]">
          <MidiaCard
            midia={item}
            type={type}
            userInteractions={userInteractions}
            onInteraction={onInteraction}
          />
        </div>
      ))}
    </HorizontalScrollRow>
  );
}

export default HorizontalMediaRow;
