'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Gift, Tag } from 'lucide-react';
import { getPlatformLabel } from '@/lib/dealFilters';
import type { UnifiedDeal } from '@/types/deals';

const SOURCE_LABELS: Record<string, string> = {
  epic: 'Epic Games',
  gamerpower: 'GamerPower',
  cheapshark: 'CheapShark',
  steam: 'Steam',
  orbe: 'Catálogo Orbe',
};

function steamFallbackImage(appId: number): string {
  return `https://shared.fastly.steamstatic.com/steam/apps/${appId}/capsule_616x353.jpg`;
}

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
  const platformLabel = getPlatformLabel(deal.platform) || deal.platforms[0] || 'Loja';
  const sourceLabel = SOURCE_LABELS[deal.source] ?? deal.source;
  const endsLabel = formatEndsAt(deal.endsAt);
  const isFree = deal.kind === 'free';
  const isTemporaryFree = isFree && deal.freeTier !== 'permanent';
  const isPermanentFree = isFree && deal.freeTier === 'permanent';

  const initialImage = useMemo(() => {
    if (deal.imageUrl) return deal.imageUrl;
    if (deal.steamAppId) return steamFallbackImage(deal.steamAppId);
    return null;
  }, [deal.imageUrl, deal.steamAppId]);

  const [imageSrc, setImageSrc] = useState<string | null>(initialImage);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageSrc(initialImage);
    setImageLoaded(false);
  }, [initialImage, deal.id]);

  const handleImageError = () => {
    if (deal.steamAppId && imageSrc !== steamFallbackImage(deal.steamAppId)) {
      setImageSrc(steamFallbackImage(deal.steamAppId));
      return;
    }
    setImageSrc(null);
  };

  return (
    <a
      href={deal.storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-card rounded-[20px] border border-border overflow-hidden hover:border-primary/50 transition-colors w-full max-w-[210px]"
    >
      <div className="relative aspect-[206/290] w-full bg-muted overflow-hidden">
        {!imageLoaded && imageSrc && (
          <div className="absolute inset-0 bg-skeleton orbe-shimmer" aria-hidden />
        )}
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={deal.title}
            fill
            sizes="210px"
            className={`object-cover transition-transform group-hover:scale-[1.02] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            priority={priority}
            unoptimized
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
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
          {isTemporaryFree && (
            <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
              GRÁTIS AGORA
            </span>
          )}
          {isPermanentFree && (
            <span className="rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-bold text-white">
              F2P
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
            {deal.salePrice ?? (isTemporaryFree ? 'Grátis por tempo limitado' : isPermanentFree ? 'Sempre grátis' : isFree ? 'Grátis para resgatar' : 'Ver oferta')}
            {deal.originalPrice && deal.salePrice && deal.originalPrice !== deal.salePrice && (
              <span className="ml-1 line-through opacity-70">{deal.originalPrice}</span>
            )}
          </span>
        </div>

        {deal.worth && (
          <p className="text-[10px] text-muted-foreground">Valor: {deal.worth}</p>
        )}

        {deal.priceConverted && deal.originalSalePriceUsd && (
          <p className="text-[10px] text-muted-foreground">
            Original: {deal.originalSalePriceUsd} (câmbio aprox.)
          </p>
        )}

        {endsLabel && (
          <p className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">Acaba em {endsLabel}</p>
        )}

        {deal.orbeUrl && (
          <Link
            href={deal.orbeUrl}
            onClick={(event) => event.stopPropagation()}
            className="text-[10px] font-medium text-primary hover:underline"
          >
            Ver no Orbe →
          </Link>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="text-[9px] text-muted-foreground truncate">{sourceLabel}</span>
          <ExternalLink className="h-3.5 w-3.5 text-primary shrink-0 opacity-80 group-hover:opacity-100" />
        </div>
      </div>
    </a>
  );
}
