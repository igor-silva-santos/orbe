'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Languages, Trash2, ExternalLink } from 'lucide-react';
import type { WatchlistAnime } from '@/types';
import { formatRemainingTime, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WatchlistAnimeCardProps {
  item: WatchlistAnime;
  onEdit: (item: WatchlistAnime) => void;
  onRemove: (id: string) => void | Promise<void>;
  removing?: boolean;
}

const statusLabels: Record<string, string> = {
  comecar: 'Começar',
  continuar: 'Continuar',
  seguir: 'Seguindo',
  novamente: 'De novo',
  terminado: 'Terminado',
};

export default function WatchlistAnimeCard({
  item,
  onEdit,
  onRemove,
  removing = false,
}: WatchlistAnimeCardProps) {
  const progressLabel =
    item.episode > 0
      ? `S${item.season} · E${item.episode}${item.totalEpisodes ? `/${item.totalEpisodes}` : ''}`
      : 'Não iniciado';

  return (
    <article className="rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[2/3] bg-muted">
        {item.posterUrl ? (
          <Image src={item.posterUrl} alt={item.title} fill className="object-cover" unoptimized />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm px-4 text-center">
            {item.title}
          </div>
        )}
        <span className="absolute top-2 left-2 rounded-md bg-primary text-primary-foreground text-xs font-bold px-2 py-1">
          {statusLabels[item.status] || item.status}
        </span>
        {item.hasDub && (
          <span className="absolute top-2 right-2 rounded-md bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
            <Languages className="h-3 w-3" /> DUB
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold line-clamp-2">{item.title}</h3>
          {item.titleAlt && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{item.titleAlt}</p>
          )}
        </div>

        <p className="text-sm font-semibold text-primary">{progressLabel}</p>

        {item.remainingTimeSec != null && item.remainingTimeSec > 0 && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Restam {formatRemainingTime(item.remainingTimeSec)}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
            Editar
          </Button>
          {item.crunchyrollUrl && (
            <Button size="sm" variant="ghost" asChild>
              <Link href={item.crunchyrollUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            disabled={removing}
            onClick={() => onRemove(item.id)}
            aria-label="Remover da lista"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </article>
  );
}

export function WatchlistFilterTabs({
  value,
  onChange,
  counts,
}: {
  value: string;
  onChange: (value: 'all' | 'andamento' | 'comecar' | 'terminado' | 'dub') => void;
  counts: Record<string, number>;
}) {
  const tabs = [
    { id: 'all', label: 'Todos' },
    { id: 'andamento', label: 'Em andamento' },
    { id: 'comecar', label: 'Começar' },
    { id: 'terminado', label: 'Terminados' },
    { id: 'dub', label: 'Dublagem' },
  ] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold border transition-colors',
            value === tab.id
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background hover:bg-accent'
          )}
        >
          {tab.label} ({counts[tab.id] ?? 0})
        </button>
      ))}
    </div>
  );
}
