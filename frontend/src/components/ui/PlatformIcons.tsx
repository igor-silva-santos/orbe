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
  /** 'tile': quadrado claro para ícones escuros em fundos escuros. 'circle': bolha redonda (ex.: "onde jogar"). */
  variant?: 'default' | 'tile' | 'circle';
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
  if (lower.includes('hidive')) return 'crunchyroll';
  if (lower.includes('funimation')) return 'crunchyroll';
  if (lower.includes('star+') || lower.includes('star plus') || lower.includes('starplus')) return 'star';
  if (lower.includes('globoplay') || lower.includes('globo-play') || lower.includes('globo play') || lower === 'globo') return 'globoplay';
  if (lower.includes('claro') || lower.includes('claro-tv')) return 'claro';
  if (lower.includes('playstation') || lower === 'ps4' || lower === 'ps5') return 'playstation';
  if (lower.includes('xbox')) return 'xbox';
  if (lower.includes('nintendo') || lower.includes('switch')) return 'nintendo';
  if (lower.includes('steam')) return 'steam';
  if (lower.includes('epic')) return 'epic';
  if (lower.includes('gog')) return 'gog';
  if (lower === 'mac' || lower.includes('macos') || lower.includes('mac os')) return 'mac';
  if (lower === 'pc' || lower.includes('windows')) return 'pc';
  if (lower.includes('linux')) return 'linux';
  if (lower.includes('cinema')) return 'cinema';
  if (lower.includes('streaming')) return 'streaming';
  return 'unknown';
};

// `overflow-hidden` é essencial aqui: alguns ícones locais (ex.: globoplay.svg, claro-tv-plus.svg)
// são "app icons" com fundo quadrado opaco (viewBox quadrado preenchido de ponta a ponta). Sem
// recortar, os cantos desse quadrado ficam maiores que o círculo inscrito na tile e vazam para
// fora da bolha branca — é isso que faz esses ícones parecerem "quadrados dentro de um círculo".
const TILE_CLASS =
  'inline-flex items-center justify-center shrink-0 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/10 dark:bg-white dark:ring-white/20';
const CIRCLE_TILE_CLASS =
  'inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/10 dark:bg-white dark:ring-white/20';

const getTileClass = (iconSize: number, circle: boolean) =>
  `${circle ? CIRCLE_TILE_CLASS : TILE_CLASS} ${iconSize >= 26 ? 'p-1' : 'p-[3px]'}`;

/** Ícones compactos para tiles pequenos (cards); wordmarks ficam ilegíveis abaixo de ~32px. */
const GAME_TILE_ICON_SRC: Partial<Record<string, string>> = {
  playstation: '/icons/playstation_icone_azul.svg',
  nintendo: '/icons/nintendo_switch.svg',
  steam: '/icons/steam-logo.svg',
};

type BadgeIconProps = { width: number; height: number; className: string; title?: string };

/**
 * Selos coloridos (PC, Mac, Linux, Epic, GOG, Xbox) são desenhados por nós, ao contrário dos
 * ícones-imagem (Netflix, PlayStation etc.), que naturalmente "respiram" dentro da própria caixa
 * porque o desenho não ocupa 100% do viewBox. Um selo colorido que preenche a caixa inteira lado
 * a lado com esses ícones-imagem parece bem maior/mais pesado — daí o selo ficar circunscrito a
 * ~78% da caixa, com a mesma folga que os ícones-imagem já têm.
 */
const BADGE_SCALE = 0.78;

const renderBadgeIcon = (
  iconProps: BadgeIconProps,
  showTooltip: boolean,
  label: string,
  bgClass: string,
  renderContent: (badgeSize: number) => React.ReactNode,
) => {
  const { width, height, className } = iconProps;
  const badgeSize = Math.max(1, Math.round(Math.min(width, height) * BADGE_SCALE));
  return (
    <div
      className={`${className} flex items-center justify-center shrink-0`}
      style={{ width, height }}
      aria-hidden="true"
      title={showTooltip ? label : undefined}
    >
      <div
        className={`${bgClass} rounded-full flex items-center justify-center text-white shrink-0`}
        style={{ width: badgeSize, height: badgeSize }}
      >
        {renderContent(badgeSize)}
      </div>
    </div>
  );
};

const renderPcIcon = (
  iconProps: { width: number; height: number; className: string; alt: string; title?: string },
  useTile: boolean,
  showTooltip: boolean,
  label: string,
) => {
  if (useTile) {
    return renderBadgeIcon(iconProps, showTooltip, label, 'bg-[#1a1a1a] font-extrabold', (badgeSize) => (
      <span style={{ fontSize: badgeSize * 0.42 }}>PC</span>
    ));
  }
  return <Image src="/icons/pc.svg" {...iconProps} />;
};

const renderMacIcon = (
  iconProps: { width: number; height: number; className: string; alt: string; title?: string },
  showTooltip: boolean,
  label: string,
) =>
  renderBadgeIcon(iconProps, showTooltip, label, 'bg-[#1a1a1a] font-extrabold', (badgeSize) => (
    <span style={{ fontSize: badgeSize * 0.38 }}>Mac</span>
  ));

const renderLinuxIcon = (
  iconProps: { width: number; height: number; className: string; alt: string; title?: string },
  showTooltip: boolean,
  label: string,
) =>
  renderBadgeIcon(iconProps, showTooltip, label, 'bg-[#1a1a1a] font-mono font-bold', (badgeSize) => (
    <span style={{ fontSize: badgeSize * 0.4 }}>{'>_'}</span>
  ));

/**
 * xbox_icone.svg já é o glifo circular ("orb") da Xbox, sem cor de preenchimento definida
 * (preto por padrão). Recolorimos para branco (xbox_icone_white.svg) e desenhamos sobre um
 * selo verde (#107C10, mesma cor usada no wordmark xbox.svg) — pedido do usuário: "ícone
 * redondo e verde", em qualquer contexto (tile ou default).
 */
const renderXboxIcon = (
  iconProps: { width: number; height: number; className: string; alt: string; title?: string },
  showTooltip: boolean,
  label: string,
) =>
  renderBadgeIcon(iconProps, showTooltip, label, 'bg-[#107C10]', (badgeSize) => {
    const glyphSize = Math.max(1, Math.round(badgeSize * 0.62));
    return (
      <Image
        src="/icons/xbox_icone_white.svg"
        width={glyphSize}
        height={glyphSize}
        alt={label}
        unoptimized
      />
    );
  });

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
  const isCircle = variant === 'circle';
  const useTile = variant === 'tile' || isCircle;

  const iconProps = {
    width: size,
    height: size,
    className: `${className} object-contain shrink-0`,
    alt: label,
    title: useTile || !showTooltip ? undefined : label,
    // Ícones locais em /icons são SVGs estáticos já otimizados; o otimizador de imagem do
    // Next exige `dangerouslyAllowSVG` + prólogo `<?xml` no arquivo para servi-los via
    // `/_next/image`, o que vários desses SVGs não têm — sem isso o pipeline retorna 400 e
    // o ícone simplesmente não aparece. `unoptimized` faz o navegador carregar o arquivo
    // direto, sem depender desse pipeline.
    unoptimized: true,
  };

  const wrapWithTile = (icon: React.ReactNode) => {
    if (!useTile) return icon;
    return (
      <span className={getTileClass(size, isCircle)} title={showTooltip ? label : undefined}>
        {icon}
      </span>
    );
  };

  const gameIconSrc = (key: string, defaultSrc: string) =>
    useTile && GAME_TILE_ICON_SRC[key] ? GAME_TILE_ICON_SRC[key]! : defaultSrc;

  if (logoPath) {
    const src = logoPath.startsWith('http') ? logoPath : `${TMDB_LOGO_BASE}${logoPath}`;
    const logoClass = isCircle
      ? `${className} object-cover rounded-full shrink-0`
      : `${className} object-contain shrink-0`;
    return wrapWithTile(<Image src={src} {...iconProps} className={logoClass} />);
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
      return wrapWithTile(<Image src={gameIconSrc('playstation', '/icons/playstation.svg')} {...iconProps} />);
    case 'xbox':
      return wrapWithTile(renderXboxIcon(iconProps, showTooltip, label));
    case 'nintendo':
      return wrapWithTile(<Image src={gameIconSrc('nintendo', '/icons/nintendo_switch.svg')} {...iconProps} />);
    case 'steam':
      return wrapWithTile(<Image src={gameIconSrc('steam', '/icons/steam.svg')} {...iconProps} />);
    case 'epic':
      return wrapWithTile(
        renderBadgeIcon(iconProps, showTooltip, label, 'bg-[#2a2a2a] font-bold', (badgeSize) => (
          <span style={{ fontSize: badgeSize * 0.55 }}>E</span>
        ))
      );
    case 'gog':
      return wrapWithTile(
        renderBadgeIcon(iconProps, showTooltip, label, 'bg-purple-700 font-bold', (badgeSize) => (
          <span style={{ fontSize: badgeSize * 0.4 }}>GOG</span>
        ))
      );
    case 'pc':
      return wrapWithTile(renderPcIcon(iconProps, useTile, showTooltip, label));
    case 'mac':
      return wrapWithTile(renderMacIcon(iconProps, showTooltip, label));
    case 'linux':
      return wrapWithTile(renderLinuxIcon(iconProps, showTooltip, label));
    case 'cinema':
      return wrapWithTile(<Image src="/icons/cinema.svg" {...iconProps} />);
    case 'streaming':
      return wrapWithTile(<Image src="/icons/streaming.svg" {...iconProps} />);
    default:
      return wrapWithTile(
        <div
          className={`${className} bg-muted rounded-full flex items-center justify-center shrink-0`}
          style={{ width: size, height: size }}
          title={useTile || !showTooltip ? undefined : label}
        >
          <span className="text-[10px] font-medium text-muted-foreground">?</span>
        </div>
      );
  }
};

export default PlatformIcon;
