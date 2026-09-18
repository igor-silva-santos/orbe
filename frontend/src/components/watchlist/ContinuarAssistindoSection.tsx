'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/stores/appStore';
import orbeNerdApi from '@/lib/api';
import type { WatchlistAnime } from '@/types';
import { formatRemainingTime } from '@/lib/utils';

export default function ContinuarAssistindoSection() {
  const { isAuthenticated } = useAppStore();
  const [items, setItems] = useState<WatchlistAnime[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    orbeNerdApi
      .getContinuarAnimes()
      .then((data) => setItems(data.results.slice(0, 10)))
      .catch(() => setItems([]));
  }, [isAuthenticated]);

  if (!isAuthenticated || items.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-extrabold orbe-text-primary">Continuar assistindo</h2>
        <Link href="/minha-lista/animes" className="text-sm font-semibold text-primary hover:underline">
          Ver todos
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.crunchyrollUrl || '/minha-lista/animes'}
            target={item.crunchyrollUrl ? '_blank' : undefined}
            rel={item.crunchyrollUrl ? 'noopener noreferrer' : undefined}
            className="min-w-[140px] max-w-[140px] shrink-0 rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[2/3] bg-muted">
              {item.posterUrl ? (
                <Image src={item.posterUrl} alt={item.title} fill className="object-cover" unoptimized />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-center px-2">
                  {item.title}
                </div>
              )}
            </div>
            <div className="p-2 space-y-1">
              <p className="text-xs font-bold line-clamp-2">{item.title}</p>
              <p className="text-[11px] text-primary font-semibold">
                S{item.season} · E{item.episode}
              </p>
              {item.remainingTimeSec != null && item.remainingTimeSec > 0 && (
                <p className="text-[10px] text-muted-foreground">
                  Restam {formatRemainingTime(item.remainingTimeSec)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
