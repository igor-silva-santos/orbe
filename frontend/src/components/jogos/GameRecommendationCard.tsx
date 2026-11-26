'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Gamepad2, Users } from 'lucide-react';
import type { GameRecommendation } from '@/types/gameRecommendations';

function kindLabel(kind: GameRecommendation['kind']): string {
  return kind === 'demo' ? 'Demo' : 'Acesso antecipado';
}

export default function GameRecommendationCard({
  item,
  priority = false,
}: {
  item: GameRecommendation;
  priority?: boolean;
}) {
  return (
    <article className="w-full max-w-[210px] flex flex-col rounded-[20px] border border-border bg-card overflow-hidden shadow-sm hover:border-primary/40 transition-colors">
      <a
        href={item.storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-[206/290] block bg-muted"
      >
        <Image
          src={item.imageUrl || '/placeholder.svg'}
          alt={item.title}
          fill
          className="object-cover"
          sizes="210px"
          priority={priority}
        />
        <span className="absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
          {kindLabel(item.kind)}
        </span>
        {item.multiplayer && (
          <span className="absolute top-2 right-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground flex items-center gap-1">
            <Users className="h-3 w-3" />
            MP
          </span>
        )}
      </a>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-semibold orbe-text-primary line-clamp-2 leading-snug">{item.title}</h3>
        {item.priceLabel && (
          <p className="text-xs text-emerald-600 font-medium">{item.priceLabel}</p>
        )}
        <div className="mt-auto flex flex-col gap-1.5">
          <a
            href={item.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border py-1.5 text-xs font-medium hover:bg-muted transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Steam
          </a>
          {item.orbeUrl ? (
            <Link
              href={item.orbeUrl}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 text-primary py-1.5 text-xs font-medium hover:bg-primary/20 transition-colors"
            >
              <Gamepad2 className="h-3.5 w-3.5" />
              Ver no Orbe
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
