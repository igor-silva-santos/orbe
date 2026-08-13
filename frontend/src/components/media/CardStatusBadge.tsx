'use client';

import { cardStatusClassName, type CardStatus } from '@/lib/card-status';

type Props = {
  status: CardStatus;
  className?: string;
};

export default function CardStatusBadge({ status, className = '' }: Props) {
  return (
    <div
      className={`pointer-events-none rounded-full border px-2 py-0.5 text-[10px] font-bold leading-tight sm:text-[10.5px] ${cardStatusClassName(status.variant)} ${className}`}
    >
      {status.label}
    </div>
  );
}
