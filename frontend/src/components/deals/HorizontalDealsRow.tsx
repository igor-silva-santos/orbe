'use client';

import DealCard from '@/components/deals/DealCard';
import { useHorizontalDragScroll } from '@/hooks/useHorizontalDragScroll';
import type { UnifiedDeal } from '@/types/deals';

interface HorizontalDealsRowProps {
  deals: UnifiedDeal[];
  enableDrag?: boolean;
  priorityCount?: number;
}

/** Fileira horizontal de promoções — suporta arrastar com mouse quando enableDrag=true. */
export function HorizontalDealsRow({
  deals,
  enableDrag = false,
  priorityCount = 6,
}: HorizontalDealsRowProps) {
  const { scrollRef, dragging, handlers } = useHorizontalDragScroll();

  if (deals.length === 0) return null;

  return (
    <div
      ref={enableDrag ? scrollRef : undefined}
      className={`flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1 ${
        enableDrag ? (dragging ? 'cursor-grabbing select-none' : 'cursor-grab') : ''
      }`}
      style={enableDrag ? { touchAction: 'pan-y' } : undefined}
      {...(enableDrag ? handlers : {})}
    >
      {deals.map((deal, index) => (
        <div key={deal.id} className="flex-shrink-0 w-[170px] sm:w-[190px]">
          <DealCard deal={deal} priority={index < priorityCount} />
        </div>
      ))}
    </div>
  );
}

export default HorizontalDealsRow;
