'use client';

import type { ReactNode } from 'react';

type CarouselSectionHeadingProps = {
  title: string;
  /** Título curto no mobile; usa `title` quando omitido */
  shortTitle?: string;
  onClick?: () => void;
  hint?: string;
  children?: ReactNode;
};

/** Cabeçalho do carrossel com título responsivo — evita corte no mobile. */
export function CarouselSectionHeading({
  title,
  shortTitle,
  onClick,
  hint,
  children,
}: CarouselSectionHeadingProps) {
  const mobileTitle = shortTitle ?? title;

  return (
    <h3
      className="text-base sm:text-xl font-bold leading-snug cursor-pointer font-display orbe-text-primary hover:text-primary transition-colors flex flex-wrap items-center gap-x-2 gap-y-0.5 w-full sm:w-auto shrink-0"
      onClick={onClick}
      title={hint}
    >
      <span className="sm:hidden">{mobileTitle}</span>
      <span className="hidden sm:inline">{title}</span>
      {children}
    </h3>
  );
}

export default CarouselSectionHeading;
