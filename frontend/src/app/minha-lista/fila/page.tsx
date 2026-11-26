import type { Metadata } from 'next';
import FilaAnimeClient from './FilaAnimeClient';

export const metadata: Metadata = {
  title: 'Fila de animes | Orbe',
  description: 'Fila pessoal de animes com progresso por episódio, sincronizada da Crunchyroll.',
};

export default function FilaAnimePage() {
  return <FilaAnimeClient />;
}
