import type { Metadata } from 'next';
import FilaAnimeClient from './FilaAnimeClient';

export const metadata: Metadata = {
  title: 'Fila Crunchyroll | Orbe',
  description: 'Organize o que assistir a seguir com base na sua watchlist da Crunchyroll.',
};

export default function FilaAnimePage() {
  return <FilaAnimeClient />;
}
