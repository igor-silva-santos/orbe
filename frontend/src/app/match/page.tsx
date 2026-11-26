import type { Metadata } from 'next';
import MatchClient from './MatchClient';

export const metadata: Metadata = {
  title: 'Match',
  description: 'Sugestão de filme, série, anime ou jogo a partir do que você gosta, sozinho ou em dupla.',
};

export default function MatchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MatchClient />
    </div>
  );
}
