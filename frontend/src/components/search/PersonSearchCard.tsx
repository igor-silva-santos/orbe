'use client';

import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import { useAppStore } from '@/stores/appStore';

export type PersonSearchItem =
  | { kind: 'pessoa'; id: number; name: string; profilePath: string | null }
  | { kind: 'dublador'; id: number; name: string; profilePath: string | null };

type Props = {
  person: PersonSearchItem;
};

export default function PersonSearchCard({ person }: Props) {
  const closeSearch = useAppStore((s) => s.closeSearch);
  const href = person.kind === 'pessoa' ? `/pessoa/${person.id}` : `/dublador/${person.id}`;

  return (
    <Link
      href={href}
      onClick={() => {
        sessionStorage.setItem('orbe:returnTo', 'search');
        closeSearch();
      }}
      className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 hover:bg-muted/60 transition-colors cursor-pointer w-full max-w-sm"
    >
      <div className="h-14 w-14 rounded-full overflow-hidden bg-muted shrink-0">
        <SafeImage
          src={person.profilePath}
          alt={person.name}
          width={56}
          height={56}
          imageSize="w185"
          className="h-full w-full object-cover"
          fallbackLabel="?"
        />
      </div>
      <div className="min-w-0 text-left">
        <p className="font-semibold text-sm truncate orbe-text-primary">{person.name}</p>
        <p className="text-xs text-muted-foreground">
          {person.kind === 'pessoa' ? 'Ator / equipe' : 'Dublador'}
        </p>
      </div>
    </Link>
  );
}
