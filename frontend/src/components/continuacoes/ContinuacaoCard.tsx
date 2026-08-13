'use client';

import SafeImage from '@/components/ui/SafeImage';
import { labelContinuacaoRelacao } from '@/lib/continuacoes-labels';
import type { ContinuacaoItem } from '@/types/continuacoes';

type Props = {
  item: ContinuacaoItem;
  onClick: () => void;
  compact?: boolean;
};

export default function ContinuacaoCard({ item, onClick, compact }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border border-border bg-card hover:bg-muted/60 transition-colors overflow-hidden w-full ${
        compact ? 'flex gap-3 p-2' : 'block'
      }`}
    >
      <div className={compact ? 'w-14 shrink-0' : 'aspect-[2/3] w-full'}>
        <SafeImage
          src={item.posterUrl ?? ''}
          alt={item.titulo}
          width={200}
          height={300}
          className={compact ? 'rounded-md w-14 h-20 object-cover' : 'w-full h-full object-cover'}
          fallbackLabel="?"
        />
      </div>
      <div className={compact ? 'min-w-0 py-0.5' : 'p-3 space-y-1'}>
        <p className={`font-semibold leading-snug ${compact ? 'text-sm line-clamp-2' : 'text-base line-clamp-2'}`}>
          {item.titulo}
        </p>
        <p className="text-xs text-muted-foreground">
          {labelContinuacaoRelacao(item.relacao)}
          {item.releaseDate ? ` · ${item.releaseDate.slice(0, 4)}` : ''}
          {item.tipo === 'serie' ? ' · Série' : ' · Filme'}
        </p>
      </div>
    </button>
  );
}
