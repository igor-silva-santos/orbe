'use client';

import { Serie, CalendarModalData } from '@/types';
import SerieInfoBlock from './SerieInfoBlock';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SafeImage from '@/components/ui/SafeImage';
import PlatformIcon from '@/components/ui/PlatformIcons';
import { sanitizeTranslatedText } from '@/lib/media-helpers';
import CommentSection from './CommentSection';

interface SerieModalContentProps {
  serie: Serie;
  openCalendarModal: (data: CalendarModalData) => void;
}

const isTmdbProvider = (name?: string | null) => (name ?? '').toLowerCase().includes('tmdb');

const SerieModalContent: React.FC<SerieModalContentProps> = ({ serie }) => {
  if (!serie) {
    return <div>Carregando...</div>;
  }

  const trailerKey = serie.trailer_key || serie.videos?.find(v => v.type === 'Trailer')?.key;

  const streamingProviders = (serie.streamingProviders || [])
    .filter((p: any) => p.url && p.provider?.name && !isTmdbProvider(p.provider.name));

  const fallbackPlatforms = (serie.plataformas_api || [])
    .filter((p) => p.url && p.nome && !isTmdbProvider(p.nome));

  const hasStreaming = streamingProviders.length > 0 || fallbackPlatforms.length > 0;

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Bloco Superior: Pôster e Informações Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <SafeImage
            src={serie.poster_curado || serie.poster_url_api}
            alt={`Pôster de ${serie.titulo_curado || serie.titulo_api}`}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
            fallbackLabel="Sem imagem"
          />
        </div>
        <div className="md:col-span-2">
          <SerieInfoBlock serie={serie} />
        </div>
      </div>

      {/* Sinopse */}
      {serie.sinopse && (
        <section>
          <h2 className="text-xl font-bold mb-2 text-yellow-500 dark:text-blue-400">Sinopse</h2>
          <p className="text-muted-foreground leading-relaxed">{sanitizeTranslatedText(serie.sinopse)}</p>
        </section>
      )}

      {/* Disponível Em */}
      {hasStreaming && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Disponível em</h2>
          <div className="flex flex-wrap gap-4 mt-2">
            {streamingProviders.map((p: any) => (
              <a
                key={p.provider.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <PlatformIcon platform={p.provider.name} className="h-5 w-5" variant="tile" />
                <span>{p.provider.name}</span>
              </a>
            ))}
            {fallbackPlatforms.map((p) => (
              <a
                key={p.nome}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <PlatformIcon platform={p.nome} className="h-5 w-5" variant="tile" />
                <span>{p.nome}</span>
              </a>
            ))}
          </div>
        </section>
      )}
      
      {/* Trailer */}
      {trailerKey && (
        <section>
          <h2 className="text-xl font-bold mb-2 text-yellow-500 dark:text-blue-400">Trailer</h2>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </section>
      )}

      {/* Carrossel de Elenco */}
      {serie.elenco && serie.elenco.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Elenco</h2>
          <TooltipProvider>
            <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
              <CarouselContent>
                {serie.elenco.map(ator => (
                  <CarouselItem key={ator.id} className="basis-auto">
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex flex-col items-center text-center w-24">
                          <SafeImage
                            src={ator.foto_url}
                            alt={ator.nome}
                            width={96}
                            height={144}
                            className="rounded-full object-cover h-24 w-24 mb-2"
                            fallbackLabel="?"
                          />
                          <p className="font-semibold text-sm truncate w-full">{ator.nome}</p>
                          <p className="text-xs text-gray-400 truncate w-full">{ator.personagem}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ator.nome} como {ator.personagem}</p>
                      </TooltipContent>
                    </Tooltip>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TooltipProvider>
        </section>
      )}

      {/* Lista de Temporadas */}
      {serie.temporadas && serie.temporadas.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Temporadas</h2>
          <div className="space-y-2">
            {serie.temporadas.map(season => (
              <div key={season.numero} className="flex justify-between items-center bg-muted p-2 rounded-lg">
                <span className="font-medium">{season.nome || `Temporada ${season.numero}`}</span>
                <span className="text-muted-foreground">{season.episodios} episódios</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <CommentSection midiaId={serie.id} tipoMidia="serie" />
    </div>
  );
};

export default SerieModalContent;
