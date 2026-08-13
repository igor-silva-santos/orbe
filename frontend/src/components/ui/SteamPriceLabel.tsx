'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  formatSteamPriceBRL,
  getSteamStoreUrl,
  hasSteamAppId,
  hasSteamPriceDisplay,
  isPlausibleBrlSteamPriceCents,
} from '@/lib/media-helpers';
import { API_BASE } from '@/lib/apiBase';
import type { Jogo, Midia } from '@/types';

type SteamPriceVariant = 'card' | 'modal';

interface SteamPriceLabelProps {
  item: Jogo | Midia;
  variant?: SteamPriceVariant;
  className?: string;
}

type LiveSteamPrice = {
  steam_price_cents: number | null;
  steam_discount_percent: number | null;
};

const SteamPriceLabel: React.FC<SteamPriceLabelProps> = ({
  item,
  variant = 'card',
  className = '',
}) => {
  const [livePrice, setLivePrice] = useState<LiveSteamPrice | null>(null);

  const cachedCents = 'steam_price_cents' in item ? item.steam_price_cents : null;
  const cachedDiscount =
    'steam_discount_percent' in item ? item.steam_discount_percent : null;
  const appId = 'steam_app_id' in item ? item.steam_app_id : null;
  const cachedLooksValid =
    cachedCents != null && isPlausibleBrlSteamPriceCents(cachedCents);
  const shouldFetchLive =
    Boolean(appId) && (variant === 'modal' || !cachedLooksValid);

  useEffect(() => {
    if (!shouldFetchLive) {
      setLivePrice(null);
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch(`${API_BASE}/jogos/${item.id}/steam-price`);
        if (!response.ok) return;
        const data = (await response.json()) as LiveSteamPrice;
        if (!cancelled) setLivePrice(data);
      } catch {
        // ignora — preço opcional no card
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [shouldFetchLive, appId, item.id]);

  if (!hasSteamAppId(item) && !hasSteamPriceDisplay(item)) return null;

  const priceCents =
    (shouldFetchLive ? livePrice?.steam_price_cents : null) ??
    (cachedLooksValid ? cachedCents : null) ??
    livePrice?.steam_price_cents ??
    null;
  const discountPercent =
    (shouldFetchLive ? livePrice?.steam_discount_percent : null) ??
    cachedDiscount ??
    livePrice?.steam_discount_percent ??
    null;

  const price = formatSteamPriceBRL(priceCents);
  if (!price) return null;

  const discount =
    typeof discountPercent === 'number' && discountPercent > 0 ? discountPercent : null;
  const storeUrl = getSteamStoreUrl(appId);

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
