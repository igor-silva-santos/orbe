'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useHorizontalDragScroll } from '@/hooks/useHorizontalDragScroll';

interface HorizontalScrollRowProps {
  children: ReactNode;
  className?: string;
  scrollbar?: 'thin' | 'hide';
  enableDrag?: boolean;
}

/**
 * Fileira horizontal com arraste de mouse, wheel suave e sem “puxar” imagens.
 */
export function HorizontalScrollRow({
  children,
  className,
  scrollbar = 'thin',
  enableDrag = true,
}: HorizontalScrollRowProps) {
  const { scrollRef, dragging, handlers } = useHorizontalDragScroll();

  return (
    <div
      ref={enableDrag ? scrollRef : undefined}
      className={cn(
        'carousel-horizontal-row flex gap-4 overflow-x-auto overflow-y-hidden pb-2 -mx-1 px-1 select-none',
        scrollbar === 'thin' ? 'scrollbar-thin' : 'scrollbar-hide',
        enableDrag && (dragging ? 'carousel-dragging cursor-grabbing' : 'cursor-grab'),
        className,
      )}
      style={enableDrag ? { touchAction: 'pan-y pinch-zoom' } : undefined}
      {...(enableDrag ? handlers : {})}
    >
      {children}
    </div>
  );
}

export default HorizontalScrollRow;
