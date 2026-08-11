'use client';

import Image from 'next/image';
import {
  formatSteamPriceBRL,
  getSteamStoreUrl,
  hasSteamPriceDisplay,
} from '@/lib/media-helpers';
import type { Jogo, Midia } from '@/types';

type SteamPriceVariant = 'card' | 'modal';

interface SteamPriceLabelProps {
  item: Jogo | Midia;
  variant?: SteamPriceVariant;
  className?: string;
}

const SteamPriceLabel: React.FC<SteamPriceLabelProps> = ({
  item,
  variant = 'card',
  className = '',
}) => {
  if (!hasSteamPriceDisplay(item)) return null;

  const price = formatSteamPriceBRL(item.steam_price_cents);
  if (!price) return null;

  const discount =
    typeof item.steam_discount_percent === 'number' && item.steam_discount_percent > 0
      ? item.steam_discount_percent
      : null;
  const storeUrl = getSteamStoreUrl(item.steam_app_id);

  const isCard = variant === 'card';

  const content = (
    <div
      className={`flex flex-col gap-0.5 ${isCard ? 'rounded-md border border-border/80 bg-background/95 px-2 py-1' : ''} ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <Image src="/icons/steam.svg" alt="" width={14} height={14} className="shrink-0 opacity-90" />
        <span className={`font-bold orbe-text-primary ${isCard ? 'text-xs' : 'text-base'}`}>
          {price}
        </span>
        {discount != null && (
          <span
            className={`rounded-full bg-emerald-600/90 px-1.5 py-0.5 font-bold text-white ${isCard ? 'text-[9px]' : 'text-xs'}`}
          >
            -{discount}%
          </span>
        )}
      </div>
      <span className={`text-muted-foreground ${isCard ? 'text-[9px] leading-tight' : 'text-xs'}`}>
        Preço na Steam · Brasil
      </span>
    </div>
  );

  if (storeUrl) {
    return (
      <a
        href={storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="block hover:opacity-90 transition-opacity"
        title="Ver na Steam"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default SteamPriceLabel;
