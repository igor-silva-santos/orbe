'use client';

import Image from 'next/image';
import { ExternalLink, Gift } from 'lucide-react';
import type { UnifiedDeal } from '@/types/deals';

type DealPriceBadgeProps = {
  deal: UnifiedDeal;
  className?: string;
};

/** Badge de preço Steam ou GRÁTIS — clique abre a loja oficial diretamente. */
export function DealPriceBadge({ deal, className = '' }: DealPriceBadgeProps) {
  const isFree = deal.kind === 'free';
  const showSteamPrice = !isFree && deal.salePrice && deal.currency === 'BRL';
  const showFreeBadge = isFree;

  if (!showSteamPrice && !showFreeBadge) return null;

  const label = isFree
    ? 'Resgatar grátis na loja'
    : `Ver oferta ${deal.salePrice} na loja`;

  if (showFreeBadge) {
    return (
      <a
        href={deal.storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
        className={`group/badge block rounded-md border border-emerald-500/60 bg-emerald-600/95 px-2.5 py-1.5 shadow-md transition-all hover:bg-emerald-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${className}`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Gift className="h-3.5 w-3.5 shrink-0 text-white" aria-hidden />
            <span className="text-sm font-bold text-white tracking-wide">GRÁTIS</span>
            {deal.originalPrice && deal.originalPrice !== deal.salePrice && (
              <span className="text-[10px] line-through text-emerald-100/90 truncate">
                {deal.originalPrice}
              </span>
            )}
          </div>
          <ExternalLink
            className="h-3.5 w-3.5 shrink-0 text-white/90 group-hover/badge:text-white"
            aria-hidden
          />
        </div>
        <span className="text-[9px] text-emerald-50/90 leading-tight block mt-0.5">
          {deal.freeTier === 'permanent' ? 'Sempre grátis · clique para jogar' : 'Clique para resgatar'}
        </span>
      </a>
    );
  }

  return (
    <a
      href={deal.storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
      className={`group/badge block rounded-md border border-border/80 bg-background/95 px-2 py-1 shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      <div className="flex items-center gap-1.5">
        {(deal.platform === 'steam' || deal.source === 'orbe') && (
          <Image src="/icons/steam.svg" alt="" width={14} height={14} className="shrink-0 opacity-90" />
        )}
        <span className="text-xs font-bold orbe-text-primary">{deal.salePrice}</span>
        {deal.originalPrice && deal.originalPrice !== deal.salePrice && (
          <span className="text-[9px] line-through text-muted-foreground">{deal.originalPrice}</span>
        )}
        <ExternalLink
          className="h-3 w-3 shrink-0 text-muted-foreground group-hover/badge:text-primary ml-auto"
          aria-hidden
        />
      </div>
      <span className="text-[9px] text-muted-foreground leading-tight block">
        {deal.priceConverted ? 'Preço convertido · BRL' : 'Preço na Steam · Brasil'}
      </span>
    </a>
  );
}
