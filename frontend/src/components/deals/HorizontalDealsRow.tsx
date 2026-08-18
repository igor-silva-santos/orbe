'use client';

import DealCard from '@/components/deals/DealCard';
import HorizontalScrollRow from '@/components/ui/HorizontalScrollRow';
import type { UnifiedDeal } from '@/types/deals';

interface HorizontalDealsRowProps {
  deals: UnifiedDeal[];
  enableDrag?: boolean;
  priorityCount?: number;
}

/** Fileira horizontal de promoções com arraste e scroll suave. */
export function HorizontalDealsRow({
  deals,
  enableDrag = true,
  priorityCount = 6,
}: HorizontalDealsRowProps) {
  if (deals.length === 0) return null;

  return (
    <HorizontalScrollRow enableDrag={enableDrag}>
      {deals.map((deal, index) => (
        <div key={deal.id} className="flex-shrink-0 w-[170px] sm:w-[190px]">
          <DealCard deal={deal} priority={index < priorityCount} />
        </div>
      ))}
    </HorizontalScrollRow>
  );
}

export default HorizontalDealsRow;
