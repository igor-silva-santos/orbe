'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clapperboard, Film, Gamepad2, Tv } from 'lucide-react';
import realApi from '@/data/realApi';
import MidiaCard from '@/components/media/MidiaCard';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import PageHeader from '@/components/layout/PageHeader';
import type { Filme, Serie, Jogo, UserAction, UserInteraction, TipoMidia } from '@/types';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';

interface HojeData {
  data: string;
  cinema: Filme[];
  streamingFilmes: Filme[];
  streamingSeries: Serie[];
  destaquesJogos: Jogo[];
}

const MediaRow = ({
  title,
  icon: Icon,
  items,
  type,
  userInteractions,
  onInteraction,
}: {
  title: string;
  icon: typeof Film;
  items: Array<Filme | Serie | Jogo>;
  type: 'filme' | 'serie' | 'jogo';
  userInteractions: UserInteraction[];
  onInteraction: (action: UserAction, midia: Filme | Serie | Jogo, type: TipoMidia) => void;
}) => {
  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl orbe-text-primary flex items-center gap-2 border-b border-border pb-2">
        <Icon className="h-5 w-5 text-primary shrink-0" />
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
        {items.map((item) => (
          <MidiaCard
            key={`${type}-${item.id}`}
            midia={item}
            type={type}
            userInteractions={userInteractions}
            onInteraction={onInteraction}
          />
        ))}
      </div>
    </section>
  );
};

export default function HojeClient() {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const [data, setData] = useState<HojeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    realApi.getHoje()
      .then((result) => setData(result as HojeData))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8 space-y-10">
      <PageHeader
        title="Hoje"
        description="O que está nos cinemas e o que está bombando no streaming esta semana"
      />

      {data?.data && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground capitalize -mt-4">
          <Calendar className="h-4 w-4" />
          {data.data}
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <MidiaCardSkeleton key={index} />
          ))}
        </div>
      ) : data ? (
        <div className="space-y-10">
          <MediaRow title="Em cartaz nos cinemas" icon={Clapperboard} items={data.cinema} type="filme" userInteractions={userInteractions} onInteraction={handleInteraction} />
          <MediaRow title="Filmes populares no streaming esta semana" icon={Film} items={data.streamingFilmes} type="filme" userInteractions={userInteractions} onInteraction={handleInteraction} />
          <MediaRow title="Séries populares no streaming esta semana" icon={Tv} items={data.streamingSeries} type="serie" userInteractions={userInteractions} onInteraction={handleInteraction} />
          <MediaRow title="Jogos em destaque" icon={Gamepad2} items={data.destaquesJogos} type="jogo" userInteractions={userInteractions} onInteraction={handleInteraction} />

          {data.cinema.length === 0 &&
            data.streamingFilmes.length === 0 &&
            data.streamingSeries.length === 0 &&
            data.destaquesJogos.length === 0 && (
              <div className="text-center py-16 bg-muted rounded-lg border border-border">
                <p className="text-muted-foreground font-medium">Nenhum destaque disponível no momento.</p>
              </div>
            )}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted rounded-lg border border-border">
          <p className="text-muted-foreground font-medium">Não foi possível carregar o conteúdo de hoje.</p>
        </div>
      )}
    </div>
  );
}
