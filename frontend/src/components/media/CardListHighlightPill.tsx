'use client';

import type { ListHighlight } from '@/lib/list-highlight';

type Props = {
  highlight: ListHighlight;
  className?: string;
};

export default function CardListHighlightPill({ highlight, className = '' }: Props) {
  return (
    <span
      className={`inline-flex w-max min-w-0 max-w-full shrink-0 truncate rounded-full border px-1.5 py-px text-[8px] font-semibold leading-none sm:text-[9px] ${highlight.pillClass} ${className}`}
      title={highlight.label}
    >
      {highlight.label}
    </span>
  );
}
