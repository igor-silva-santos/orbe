'use client';

import { FilmeDetalhes, CalendarModalData } from '@/types';
import FilmeInfoBlock from './FilmeInfoBlock';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import SafeImage from '@/components/ui/SafeImage';
import PlatformIcon from '@/components/ui/PlatformIcons';
import IngressoButton from '@/components/ui/IngressoButton';
import { buildIngressoUrl } from '@/lib/ingresso';
import { resolveFilmeTitle, resolveFilmePoster, sanitizeTranslatedText } from '@/lib/media-helpers';
import { ExternalLink } from 'lucide-react';
import CommentSection from './CommentSection';
import { useAppStore } from '@/stores/appStore';

interface FilmeModalContentProps {
  filme: FilmeDetalhes;
  openCalendarModal: (data: CalendarModalData) => void;
}

const isTmdbProvider = (name?: string | null) => (name ?? '').toLowerCase().includes('tmdb');

const FilmeModalContent: React.FC<FilmeModalContentProps> = ({ filme, openCalendarModal }) => {
  const closeSuperModal = useAppStore((s) => s.closeSuperModal);

  if (!filme) {
    return <div>Carregando...</div>;
  }

  const trailerKey = filme.videos?.find((v) => v.type === 'Trailer' && v.official)?.key
    || filme.videos?.find((v) => v.type === 'Trailer')?.key
    || filme.videos?.[0]?.key;

  const releaseDateRaw = filme.releaseDate ?? (filme as { data_lancamento_api?: string }).data_lancamento_api;
  const releaseDate = releaseDateRaw ? new Date(releaseDateRaw) : null;
  const now = new Date();

  const isFutureRelease = releaseDate && releaseDate > now;
  const filmeTitle = resolveFilmeTitle(filme);
  const ingressoUrl = filme.ingresso_link || buildIngressoUrl(filmeTitle);
  const canBuyTickets = filme.tem_sessoes === true;

  const streamingProviders = (filme.streamingProviders || []).filter(
    (p) => p.url && p.provider?.name && !isTmdbProvider(p.provider.name)
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-40 sm:w-48 flex-shrink-0 mx-auto md:mx-0">
          <SafeImage
            src={resolveFilmePoster(filme)}
            alt={`Pôster de ${filmeTitle}`}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
            fallbackLabel="Sem imagem"
          />
        </div>
        <div className="flex-1 min-w-0">
          <FilmeInfoBlock filme={filme} />

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {isFutureRelease && (
              <Button onClick={() => openCalendarModal({ midia: filme as any, type: 'filme' })}>
                Adicionar ao Calendário
              </Button>
            )}

            <IngressoButton url={ingressoUrl} canBuy={canBuyTickets} emPrevenda={Boolean(filme.em_prevenda)} />

            <Button variant="outline" asChild>
              <a
                href={`https://www.themoviedb.org/movie/${filme.tmdbId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                TMDB <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {(filme.overview || (filme as { sinopse?: string }).sinopse) && (
        <section>
          <h2 className="text-xl font-bold mb-2 text-yellow-500 dark:text-blue-400">Sinopse</h2>
          <p className="text-muted-foreground leading-relaxed">
            {sanitizeTranslatedText(filme.overview || (filme as { sinopse?: string }).sinopse)}
          </p>
        </section>
      )}

      {streamingProviders.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Disponível em</h2>
          <div className="flex flex-wrap gap-3 mt-2">
            {streamingProviders.map((p) => (
              <a
                key={p.provider.name}
                href={p.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-semibold px-3 py-2 rounded-lg transition-colors text-sm"
              >
                <PlatformIcon platform={p.provider.name} className="h-5 w-5" variant="tile" />
                <span>{p.provider.name}</span>
              </a>
            ))}
          </div>
        </section>
      )}

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
            />
          </div>
        </section>
      )}

      {filme.cast && filme.cast.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Elenco</h2>
          <TooltipProvider>
            <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
              <CarouselContent>
                {filme.cast.map((ator) => (
                  <CarouselItem key={ator.pessoa.id} className="basis-auto">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/pessoa/${ator.pessoa.id}`}
                          onClick={closeSuperModal}
                          className="block text-center w-20 sm:w-24 cursor-pointer"
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-full mb-2 overflow-hidden mx-auto">
                            <SafeImage
                              src={ator.pessoa.profilePath}
                              alt={ator.pessoa.name}
                              width={80}
                              height={80}
                              imageSize="w185"
                              className="w-full h-full object-cover"
                              fallbackLabel="?"
                            />
                          </div>
                          <p className="font-semibold text-xs truncate w-full hover:text-primary transition-colors">{ator.pessoa.name}</p>
                          <p className="text-xs text-muted-foreground truncate w-full">{ator.character}</p>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ator.pessoa.name} como {ator.character} — ver filmografia</p>
                      </TooltipContent>
                    </Tooltip>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TooltipProvider>
        </section>
      )}

      <CommentSection midiaId={filme.id} tipoMidia="filme" />
    </div>
  );
};

export default FilmeModalContent;
