import type { UserInteraction } from '@/types';

export type ListHighlight = {
  label: string;
  borderClass: string;
  pillClass: string;
};

const HIGHLIGHTS: Record<'acompanhando' | 'quero_assistir' | 'favorito', ListHighlight> = {
  acompanhando: {
    label: 'Acompanhando',
    borderClass: 'ring-2 ring-amber-400/90 ring-offset-2 ring-offset-background',
    pillClass: 'bg-amber-500/95 text-white border-amber-300/40',
  },
  quero_assistir: {
    label: 'Na sua lista',
    borderClass: 'ring-2 ring-sky-400/90 ring-offset-2 ring-offset-background',
    pillClass: 'bg-sky-600/95 text-white border-sky-300/40',
  },
  favorito: {
    label: 'Favorito',
    borderClass: 'ring-2 ring-rose-400/90 ring-offset-2 ring-offset-background',
    pillClass: 'bg-rose-500/95 text-white border-rose-300/40',
  },
};

export function getListHighlight(
  status: UserInteraction['status'] | undefined,
): ListHighlight | null {
  if (!status || status === 'assistido' || status === 'oculto') return null;
  if (status in HIGHLIGHTS) {
    return HIGHLIGHTS[status as keyof typeof HIGHLIGHTS];
  }
  return null;
}
