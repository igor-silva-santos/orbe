import type { Metadata } from 'next';
import MinhaListaClient from './MinhaListaClient';

export const metadata: Metadata = {
  title: 'Minha lista | Orbe',
  description: 'Sua watchlist no Orbe — favoritos, quero assistir, acompanhando e concluídos.',
};

export default function MinhaListaPage() {
  return <MinhaListaClient />;
}
