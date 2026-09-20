'use client';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ComponentProps } from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: ComponentProps<typeof Button>['variant'];
  showIcon?: boolean;
  className?: string;
};

export default function ModalExternalButton({
  href,
  children,
  variant = 'outline',
  showIcon = true,
  className = '',
}: Props) {
  return (
    <Button variant={variant} asChild className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 cursor-pointer"
      >
        {children}
        {showIcon && <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />}
      </a>
    </Button>
  );
}
