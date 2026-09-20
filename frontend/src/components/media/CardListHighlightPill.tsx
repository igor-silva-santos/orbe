'use client';

import type { ListHighlight } from '@/lib/list-highlight';

type Props = {
  highlight: ListHighlight;
  className?: string;
};

export default function CardListHighlightPill({ highlight, className = '' }: Props) {
  return (
    <span
      className={`absolute top-2 left-2 z-20 max-w-[calc(100%-3rem)] truncate rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide shadow-sm sm:text-[10px] ${highlight.pillClass} ${className}`}
      title={highlight.label}
    >
      {highlight.label}
    </span>
  );
}
