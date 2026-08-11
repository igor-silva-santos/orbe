/* eslint-disable jsx-a11y/alt-text */
'use client';

import React from 'react';
import Image from 'next/image';

const TMDB_LOGO_BASE = 'https://image.tmdb.org/t/p/w45';

interface PlatformIconProps {
  platform?: string | null;
  logoPath?: string | null;
  className?: string;
  size?: number;
  iconOnly?: boolean;
  title?: string;
  /** Tile claro para ícones escuros em fundos escuros (ex.: cards no dark mode). */
  variant?: 'default' | 'tile';
}

const normalizePlatformKey = (platform?: string | null): string => {
  if (!platform || typeof platform !== 'string') return 'unknown';
  const lower = platform.toLowerCase().trim();
  if (!lower) return 'unknown';
  if (lower.includes('netflix')) return 'netflix';
  if (lower.includes('disney')) return 'disney';
  if (lower.includes('hbo') || lower === 'max' || lower.includes('hbomax')) return 'hbo';
  if (lower.includes('prime') || lower.includes('amazon')) return 'prime';
  if (lower.includes('apple')) return 'apple';
  if (lower.includes('crunchyroll')) return 'crunchyroll';
  if (lower.includes('star+') || lower.includes('star plus') || lower.includes('starplus')) return 'star';
  if (lower.includes('globoplay') || lower.includes('globo-play') || lower.includes('globo play') || lower === 'globo') return 'globoplay';
  if (lower.includes('claro') || lower.includes('claro-tv')) return 'claro';
  if (lower.includes('playstation') || lower === 'ps4' || lower === 'ps5') return 'playstation';
  if (lower.includes('xbox')) return 'xbox';
  if (lower.includes('nintendo') || lower.includes('switch')) return 'nintendo';
  if (lower.includes('steam')) return 'steam';
  if (lower.includes('epic')) return 'epic';
  if (lower.includes('gog')) return 'gog';
  if (lower === 'pc' || lower.includes('windows')) return 'pc';
  if (lower.includes('cinema')) return 'cinema';
  return 'unknown';
};

const TILE_CLASS =
  'inline-flex items-center justify-center shrink-0 rounded-[6px] bg-white p-[3px] shadow-sm ring-1 ring-black/10 dark:bg-white dark:ring-white/20';

const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  logoPath,
  className = 'h-4 w-4',
  size = 16,
  iconOnly = false,
  title,
  variant = 'default',
}) => {
  const label = title || (iconOnly ? '' : `${platform ?? 'plataforma'} icon`);
  const showTooltip = Boolean(label);
  const useTile = variant === 'tile';

  const iconProps = {
    width: size,
    height: size,
    className: `${className} object-contain shrink-0`,
    alt: label,
    title: useTile || !showTooltip ? undefined : label,
  };

  const wrapWithTile = (icon: React.ReactNode) => {
    if (!useTile) return icon;
    return (
      <span className={TILE_CLASS} title={showTooltip ? label : undefined}>
        {icon}
      </span>
    );
  };

  if (logoPath) {
    const src = logoPath.startsWith('http') ? logoPath : `${TMDB_LOGO_BASE}${logoPath}`;
    return wrapWithTile(<Image src={src} unoptimized {...iconProps} />);
  }

  switch (normalizePlatformKey(platform)) {
    case 'netflix':
      return wrapWithTile(<Image src="/icons/netflix.svg" {...iconProps} />);
    case 'disney':
      return wrapWithTile(<Image src="/icons/disney_plus.svg" {...iconProps} />);
    case 'hbo':
      return wrapWithTile(<Image src="/icons/HBO_Max.svg" {...iconProps} />);
    case 'prime':
      return wrapWithTile(<Image src="/icons/prime_video.svg" {...iconProps} />);
    case 'apple':
      return wrapWithTile(<Image src="/icons/apple-tv-plus.svg" {...iconProps} />);
    case 'crunchyroll':
      return wrapWithTile(<Image src="/icons/crunchyroll.svg" {...iconProps} aria-hidden="true" />);
    case 'star':
      return wrapWithTile(<Image src="/icons/star-plus.svg" {...iconProps} />);
    case 'globoplay':
      return wrapWithTile(<Image src="/icons/globoplay.svg" {...iconProps} />);
    case 'claro':
      return wrapWithTile(<Image src="/icons/claro-tv-plus.svg" {...iconProps} />);
    case 'playstation':
      return wrapWithTile(<Image src="/icons/playstation.svg" {...iconProps} />);
    case 'xbox':
      return wrapWithTile(<Image src="/icons/xbox.svg" {...iconProps} />);
    case 'nintendo':
      return wrapWithTile(<Image src="/icons/nintendo_switch.svg" {...iconProps} />);
    case 'steam':
      return wrapWithTile(<Image src="/icons/steam.svg" {...iconProps} />);
    case 'epic':
      return wrapWithTile(
        <div
          className={`${className} bg-[#2a2a2a] rounded flex items-center justify-center text-white font-bold shrink-0`}
          style={{ width: size, height: size, fontSize: size * 0.55 }}
          aria-hidden="true"
          title={useTile || !showTooltip ? undefined : label}
        >
          E
        </div>
      );
    case 'gog':
      return wrapWithTile(
        <div
          className={`${className} bg-purple-700 rounded flex items-center justify-center text-white font-bold shrink-0`}
          style={{ width: size, height: size, fontSize: size * 0.45 }}
          aria-hidden="true"
          title={useTile || !showTooltip ? undefined : label}
        >
          GOG
        </div>
      );
    case 'pc':
      return wrapWithTile(<Image src="/icons/pc.svg" {...iconProps} />);
    case 'cinema':
      return wrapWithTile(<Image src="/icons/cinema.svg" {...iconProps} />);
    default:
      return wrapWithTile(
        <div
          className={`${className} bg-muted rounded flex items-center justify-center shrink-0`}
          style={{ width: size, height: size }}
          title={useTile || !showTooltip ? undefined : label}
        >
          <span className="text-[10px] font-medium text-muted-foreground">?</span>
        </div>
      );
  }
};

export default PlatformIcon;
