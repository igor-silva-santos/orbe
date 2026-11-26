'use client';

import { cardStatusClassName, type CardStatus } from '@/lib/card-status';

type Props = {
  status: CardStatus;
  className?: string;
};

export default function CardStatusBadge({ status, className = '' }: Props) {
  return (
    <div
      title={status.label}
      className={`pointer-events-none w-max min-w-0 max-w-full shrink-0 truncate rounded-full border px-2 py-0.5 text-[10px] font-bold leading-none sm:text-[10.5px] ${cardStatusClassName(status.variant)} ${className}`}
    >
      {status.label}
    </div>
  );
}
