'use client';

import { Bookmark, Heart, Star } from 'lucide-react';
import type { UserInteraction } from '@/types';

type Props = {
  interaction: UserInteraction | undefined;
};

export default function CardListIndicator({ interaction }: Props) {
  if (!interaction?.status) return null;

  const config = {
    favorito: { Icon: Heart, className: 'text-rose-500 fill-rose-500', label: 'Favorito' },
    quero_assistir: { Icon: Bookmark, className: 'text-sky-500 fill-sky-500', label: 'Na sua lista' },
    acompanhando: { Icon: Star, className: 'text-amber-400 fill-amber-400', label: 'Acompanhando' },
    assistido: { Icon: Star, className: 'text-emerald-500', label: 'Assistido' },
    ja_joguei: { Icon: Star, className: 'text-emerald-500', label: 'Já joguei' },
    oculto: null,
  } as const;

  const item = config[interaction.status as keyof typeof config];
  if (!item) return null;

  const { Icon, className, label } = item;

  return (
    <div
      className="absolute bottom-2 left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm"
      title={label}
      aria-label={label}
    >
      <Icon className={`h-3.5 w-3.5 ${className}`} />
    </div>
  );
}
