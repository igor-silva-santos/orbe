'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import realApi from '@/data/realApi';
import MidiaCard from '@/components/media/MidiaCard';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import type { Jogo } from '@/types';

type GroupedGames = Record<string, Jogo[]>;

interface JogosEmAltaData {
  destaques: Jogo[];
  porGenero: GroupedGames;
  porPlataforma: GroupedGames;
  porModo: GroupedGames;
}

const GameSection = ({ title, games }: { title: string; games: Jogo[] }) => {
  if (!games || games.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg md:text-xl orbe-text-primary flex items-center gap-2">
        <span className="orbe-block-sm inline-block w-2 h-6 bg-[var(--orbe-accent-2)] rounded-full" />
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
        {games.map((jogo) => (
          <MidiaCard key={`${title}-${jogo.id}`} midia={jogo} type="jogo" />
        ))}
      </div>
    </section>
  );
};

const GroupedSection = ({ title, groups }: { title: string; groups: GroupedGames }) => {
  const entries = Object.entries(groups).filter(([, items]) => items.length > 0);
  if (entries.length === 0) return null;

  return (
    <div className="space-y-8">
      <h2 className="font-display text-xl md:text-2xl orbe-text-primary border-b-[3px] border-[var(--orbe-block-border)] pb-3">
        {title}
      </h2>
      {entries.map(([groupName, games]) => (
        <GameSection key={groupName} title={groupName} games={games} />
      ))}
    </div>
  );
};

export default function JogosEmAltaPage() {
  const [data, setData] = useState<JogosEmAltaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    realApi.getJogosEmAlta().then((result) => {
      setData(result as JogosEmAltaData);
    }).catch(console.error).finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <div className="border-b-[3px] border-[var(--orbe-block-border)] bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Link href="/" className="orbe-block-sm p-2 rounded-xl bg-card orbe-text-primary hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-display text-2xl md:text-3xl orbe-text-primary flex items-center gap-2">
              <Gamepad2 className="h-7 w-7 text-[var(--orbe-accent-2)]" />
              Jogos em Alta
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Os mais jogados da semana, por categoria, modo e plataforma</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 space-y-12">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <MidiaCardSkeleton key={i} />
            ))}
          </div>
        ) : data ? (
          <>
            {data.destaques.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-display text-xl md:text-2xl orbe-text-primary">Destaques da Semana</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
                  {data.destaques.map((jogo) => (
                    <MidiaCard key={jogo.id} midia={jogo} type="jogo" />
                  ))}
                </div>
              </section>
            )}
            <GroupedSection title="Por Categoria" groups={data.porGenero} />
            <GroupedSection title="Por Modo de Jogo" groups={data.porModo} />
            <GroupedSection title="Por Plataforma" groups={data.porPlataforma} />
          </>
        ) : (
          <p className="text-center text-muted-foreground py-12">Não foi possível carregar os jogos em alta.</p>
        )}
      </main>
    </div>
  );
}
