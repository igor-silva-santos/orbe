'use client';

import MidiaCard from '@/components/media/MidiaCard';
import { useHorizontalDragScroll } from '@/hooks/useHorizontalDragScroll';
import type { Anime, Filme, Jogo, Serie, TipoMidia, UserAction, UserInteraction } from '@/types';

interface HorizontalMediaRowProps {
  items: Array<Filme | Serie | Anime | Jogo>;
  type: TipoMidia;
  userInteractions: UserInteraction[];
  onInteraction: (action: UserAction, midia: Filme | Serie | Anime | Jogo, type: TipoMidia) => void;
  enableDrag?: boolean;
}

/** Fileira horizontal de cards — suporta arrastar com mouse quando enableDrag=true. */
export function HorizontalMediaRow({
  items,
  type,
  userInteractions,
  onInteraction,
  enableDrag = false,
}: HorizontalMediaRowProps) {
  const { scrollRef, dragging, handlers } = useHorizontalDragScroll();

  if (items.length === 0) return null;

  return (
    <div
      ref={enableDrag ? scrollRef : undefined}
      className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1 ${
        enableDrag ? (dragging ? 'cursor-grabbing select-none' : 'cursor-grab') : ''
      }`}
      style={enableDrag ? { touchAction: 'pan-y' } : undefined}
      {...(enableDrag ? handlers : {})}
    >
      {items.map((item) => (
        <div key={`${type}-${item.id}`} className="flex-shrink-0 w-[170px] sm:w-[190px]">
          <MidiaCard midia={item} type={type} userInteractions={userInteractions} onInteraction={onInteraction} />
        </div>
      ))}
    </div>
  );
}

export default HorizontalMediaRow;
