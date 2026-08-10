/* eslint-disable jsx-a11y/alt-text */
'use client';

import React from 'react';
import Image from 'next/image';

interface PlatformIconProps {
  platform: string;
  className?: string;
  size?: number;
  iconOnly?: boolean;
}

const normalizePlatformKey = (platform: string): string => {
  const lower = platform.toLowerCase().trim();
  if (lower.includes('netflix')) return 'netflix';
  if (lower.includes('disney')) return 'disney';
  if (lower.includes('hbo') || lower === 'max' || lower.includes('hbomax')) return 'hbo';
  if (lower.includes('prime') || lower.includes('amazon')) return 'prime';
  if (lower.includes('apple')) return 'apple';
  if (lower.includes('crunchyroll')) return 'crunchyroll';
  if (lower.includes('star+') || lower.includes('star plus') || lower.includes('starplus')) return 'star';
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

const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  className = 'h-4 w-4',
  size = 16,
  iconOnly = false,
}) => {
  const iconProps = {
    width: size,
    height: size,
    className,
    alt: iconOnly ? '' : `${platform} icon`,
  };

  switch (normalizePlatformKey(platform)) {
    case 'netflix':
      return <Image src="/icons/netflix.svg" {...iconProps} />;
    case 'disney':
      return <Image src="/icons/disney_plus.svg" {...iconProps} />;
    case 'hbo':
      return <Image src="/icons/HBO_Max.svg" {...iconProps} />;
    case 'prime':
      return <Image src="/icons/prime_video.svg" {...iconProps} />;
    case 'apple':
      return <Image src="/icons/apple-tv-plus.svg" {...iconProps} />;
    case 'crunchyroll':
      return <Image src="/icons/crunchyroll.svg" {...iconProps} aria-hidden="true" />;
    case 'star':
      return <Image src="/icons/star-plus.svg" {...iconProps} />;
    case 'playstation':
      return <Image src="/icons/playstation.svg" {...iconProps} />;
    case 'xbox':
      return <Image src="/icons/xbox.svg" {...iconProps} />;
    case 'nintendo':
      return <Image src="/icons/nintendo_switch.svg" {...iconProps} />;
    case 'steam':
      return <Image src="/icons/steam.svg" {...iconProps} />;
    case 'epic':
      return (
        <div
          className={`${className} bg-[#2a2a2a] rounded flex items-center justify-center text-white font-bold`}
          style={{ width: size, height: size, fontSize: size * 0.55 }}
          aria-hidden="true"
        >
          E
        </div>
      );
    case 'gog':
      return (
        <div
          className={`${className} bg-purple-700 rounded flex items-center justify-center text-white font-bold`}
          style={{ width: size, height: size, fontSize: size * 0.45 }}
          aria-hidden="true"
        >
          GOG
        </div>
      );
    case 'pc':
      return <Image src="/icons/pc.svg" {...iconProps} />;
    case 'cinema':
      return <Image src="/icons/cinema.svg" {...iconProps} />;
    default:
      return (
        <div className={`${className} bg-muted rounded flex items-center justify-center`} style={{ width: size, height: size }}>
          <span className="text-xs font-medium text-muted-foreground">?</span>
        </div>
      );
  }
};

export default PlatformIcon;
