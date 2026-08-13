'use client';

import { cardStatusClassName, type CardStatus } from '@/lib/card-status';

type Props = {
  status: CardStatus;
  className?: string;
};

export default function CardStatusBadge({ status, className = '' }: Props) {
  const isBanner = status.variant === 'em_cartaz';
  return (
    <div
      className={`pointer-events-none font-bold leading-tight ${isBanner ? 'rounded-tr-md px-2.5 py-1 text-[10px] sm:text-[11px]' : 'rounded-full border px-2 py-0.5 text-[10px] sm:text-[10.5px]'} ${cardStatusClassName(status.variant)} ${className}`}
    >
      {status.label}
    </div>
  );
}
