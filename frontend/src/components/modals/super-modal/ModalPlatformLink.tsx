'use client';

import type { ReactNode } from 'react';

type Props = {
  href: string;
  label: string;
  icon?: ReactNode;
  className?: string;
};

const baseClass =
  'inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer';

export default function ModalPlatformLink({ href, label, icon, className = '' }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} ${className}`}
      aria-label={`Abrir ${label}`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
