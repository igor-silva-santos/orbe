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
      className={`pointer-events-none w-max min-w-0 max-w-full shrink-0 truncate rounded-full border px-1.5 py-px text-[8px] font-semibold leading-none sm:text-[9px] ${cardStatusClassName(status.variant)} ${className}`}
    >
      {status.label}
    </div>
  );
}
