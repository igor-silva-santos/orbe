'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/minha-lista', label: 'Catálogo Orbe' },
  { href: '/minha-lista/fila', label: 'Fila Crunchyroll' },
];

export default function MinhaListaNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-2 mb-6">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              active
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:bg-muted'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
