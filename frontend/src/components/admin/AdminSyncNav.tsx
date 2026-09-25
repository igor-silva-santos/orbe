'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin/sync', label: 'Sync ao vivo' },
  { href: '/admin/jobs', label: 'Jobs GitHub' },
  { href: '/admin/sync-logs', label: 'Logs no banco' },
];

export default function AdminSyncNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 mb-6">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              active
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border hover:bg-muted'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
