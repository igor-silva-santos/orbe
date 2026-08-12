'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  /** Chave estável usada pra lembrar o estado (aberto/fechado) entre visitas. */
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}

const storageKey = (id: string) => `orbe-drawer-${id}`;

/** Seção "gaveta": colapsável, lembra o estado entre visitas via localStorage. */
export function CollapsibleSection({
  id,
  title,
  icon: Icon,
  defaultOpen = true,
  className = '',
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return defaultOpen;
    const stored = window.localStorage.getItem(storageKey(id));
    return stored === null ? defaultOpen : stored === 'open';
  });

  const toggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(storageKey(id), next ? 'open' : 'closed');
      }
      return next;
    });
  };

  return (
    <section className={className}>
      <button
        type="button"
        onClick={toggle}
        className="flex items-center justify-between w-full gap-2 mb-4 group text-left"
        aria-expanded={isOpen}
      >
        <h2 className="font-display text-xl orbe-text-primary flex items-center gap-2 group-hover:text-primary transition-colors">
          {Icon && <Icon className="h-5 w-5 text-[var(--orbe-accent-2)]" />}
          {title}
        </h2>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${isOpen ? '' : '-rotate-90'}`}
        />
      </button>
      {isOpen && children}
    </section>
  );
}

export default CollapsibleSection;
