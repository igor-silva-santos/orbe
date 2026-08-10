'use client';

import { Jogo, CalendarModalData } from '@/types';
import JogoInfoBlock from './JogoInfoBlock';
import { getGameStores } from '@/lib/media-helpers';
import PlatformIcon from '@/components/ui/PlatformIcons';
import SafeImage from '@/components/ui/SafeImage';

interface JogoModalContentProps {
  jogo: Jogo;
  openCalendarModal: (data: CalendarModalData) => void;
}

const JogoModalContent: React.FC<JogoModalContentProps> = ({ jogo }) => {
  if (!jogo) {
    return <div>Carregando...</div>;
  }

  const trailerKey = jogo.trailer_key || jogo.videos?.find((v) => v.key)?.key;
  const gameStores = getGameStores(jogo);
  const synopsis = jogo.sinopse || '(não informado)';

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-48 flex-shrink-0 mx-auto md:mx-0">
          <SafeImage
            src={jogo.poster_curado || jogo.poster_url_api}
            alt={`Pôster de ${jogo.titulo_curado || jogo.titulo_api}`}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
            fallbackLabel="Sem imagem"
          />
        </div>
        <div className="flex-1">
          <JogoInfoBlock jogo={jogo} />
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-2 text-yellow-500 dark:text-blue-400">Sinopse</h2>
        <p className="text-muted-foreground leading-relaxed">{synopsis}</p>
      </section>

      {trailerKey && (
        <section>
          <h2 className="text-xl font-bold mb-2 text-yellow-500 dark:text-blue-400">Trailer</h2>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </section>
      )}

      {gameStores.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Onde comprar / jogar</h2>
          <div className="flex flex-wrap gap-4 mt-2">
            {gameStores.map((store) => (
              <a
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <PlatformIcon platform={store.icon} className="h-5 w-5" />
                <span>{store.name}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default JogoModalContent;
