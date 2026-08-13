'use client';

import Image from 'next/image';
import { ExternalLink, Gift, Tag } from 'lucide-react';
import type { UnifiedDeal } from '@/types/deals';

const PLATFORM_LABELS: Record<string, string> = {
  steam: 'Steam',
  epic: 'Epic Games',
  gog: 'GOG',
  ubisoft: 'Ubisoft',
  origin: 'EA / Origin',
  itch: 'itch.io',
  pc: 'PC',
  other: 'Loja',
};

const SOURCE_LABELS: Record<string, string> = {
  epic: 'Epic Games',
  gamerpower: 'GamerPower',
  cheapshark: 'CheapShark',
};

function formatEndsAt(endsAt: string | null | undefined): string | null {
  if (!endsAt) return null;
  const date = new Date(endsAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface DealCardProps {
  deal: UnifiedDeal;
  priority?: boolean;
}

export default function DealCard({ deal, priority = false }: DealCardProps) {
  const platformLabel = PLATFORM_LABELS[deal.platform] ?? deal.platforms[0] ?? 'Loja';
  const sourceLabel = SOURCE_LABELS[deal.source] ?? deal.source;
  const endsLabel = formatEndsAt(deal.endsAt);
  const isFree = deal.kind === 'free';

  return (
    <a
      href={deal.storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-card rounded-[20px] border border-border overflow-hidden hover:border-primary/50 transition-colors w-full max-w-[210px]"
    >
      <div className="relative aspect-[206/290] w-full bg-muted overflow-hidden">
        {deal.imageUrl ? (
          <Image
            src={deal.imageUrl}
            alt={deal.title}
            fill
            sizes="210px"
            className="object-cover transition-transform group-hover:scale-[1.02]"
            priority={priority}
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Gift className="h-10 w-10 opacity-40" />
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          <span className="rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-semibold orbe-text-primary border border-border">
            {platformLabel}
          </span>
          {isFree && (
            <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
              GRÁTIS
            </span>
          )}
        </div>
        {deal.discountPercent != null && deal.discountPercent > 0 && !isFree && (
          <span className="absolute top-2 right-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
            -{deal.discountPercent}%
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-sm orbe-text-primary line-clamp-2 leading-snug">{deal.title}</h3>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {isFree ? (
            <Gift className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          ) : (
            <Tag className="h-3.5 w-3.5 shrink-0" />
          )}
          <span>
            {deal.salePrice ?? (isFree ? 'Grátis para resgatar' : 'Ver oferta')}
            {deal.originalPrice && deal.salePrice && deal.originalPrice !== deal.salePrice && (
              <span className="ml-1 line-through opacity-70">{deal.originalPrice}</span>
            )}
          </span>
        </div>

        {deal.worth && (
          <p className="text-[10px] text-muted-foreground">Valor: {deal.worth}</p>
        )}

        {endsLabel && (
          <p className="text-[10px] text-muted-foreground">Até {endsLabel}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="text-[9px] text-muted-foreground truncate">{sourceLabel}</span>
          <ExternalLink className="h-3.5 w-3.5 text-primary shrink-0 opacity-80 group-hover:opacity-100" />
        </div>
      </div>
    </a>
  );
}
