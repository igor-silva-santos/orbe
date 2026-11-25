import type { CarouselCard } from '@/types/media';

/** Rotas de detalhe disponíveis no M2 (outros tipos: M3). */
export function mediaDetailHref(item: CarouselCard): string | null {
  if (item.type === 'filme' || !item.type) {
    return `/filme/${item.id}`;
  }
  return null;
}