'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Serie, CalendarModalData } from '@/types';
import { dedupeStreamingProviders } from '@/lib/streaming-providers';
import SerieInfoBlock from './SerieInfoBlock';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SafeImage from '@/components/ui/SafeImage';
import PlatformIcon from '@/components/ui/PlatformIcons';
import { sanitizeTranslatedText } from '@/lib/media-helpers';
import { PLATFORM_ICON_SIZE_MODAL } from '@/lib/platform-icon-sizes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContinuacoesSuperModalTabs from '@/components/continuacoes/ContinuacoesSuperModalTabs';
import ModalPlatformLink from '@/components/modals/super-modal/ModalPlatformLink';
import SerieSeasonDrawer from '@/components/modals/super-modal/SerieSeasonDrawer';
import { useAppStore } from '@/stores/appStore';

interface SerieModalContentProps {
  serie: Serie;
  openCalendarModal: (data: CalendarModalData) => void;
}

const isTmdbProvider = (name?: string | null) => (name ?? '').toLowerCase().includes('tmdb');

const SerieModalContent: React.FC<SerieModalContentProps> = ({ serie }) => {
  const closeSuperModal = useAppStore((s) => s.closeSuperModal);
  const [seasonDrawer, setSeasonDrawer] = useState<number | null>(null);

  if (!serie) {
    return <div>Carregando...</div>;
  }

  const trailerKey = serie.trailer_key || serie.videos?.find(v => v.type === 'Trailer')?.key;

  const streamingLinks = useMemo(() => {
    const raw = [
      ...(serie.streamingProviders || [])
        .filter((p: any) => p.url && p.provider?.name && !isTmdbProvider(p.provider.name))
        .map((p: any) => ({
          name: p.provider.name as string,
          url: p.url as string,
          providerTmdbId: p.provider?.tmdbId ?? null,
        })),
      ...(serie.plataformas_api || [])
        .filter((p) => p.url && p.nome && !isTmdbProvider(p.nome))
        .map((p) => ({ name: p.nome, url: p.url, providerTmdbId: null })),
    ];
    return dedupeStreamingProviders(raw);
  }, [serie.streamingProviders, serie.plataformas_api]);

  const tmdbSerieUrl = `https://www.themoviedb.org/tv/${serie.id}`;
  const hasStreaming = streamingLinks.length > 0;

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

      <Tabs defaultValue="detalhes" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
        </TabsList>

        <TabsContent value="detalhes" className="space-y-6 mt-4">

      {/* Sinopse */}
      {serie.sinopse && (
        <section>
          <h2 className="text-xl font-bold mb-2 text-yellow-500 dark:text-blue-400">Sinopse</h2>
          <p className="text-muted-foreground leading-relaxed">{sanitizeTranslatedText(serie.sinopse)}</p>
        </section>
      )}

      {/* Disponível Em */}
      {(hasStreaming || serie.id) && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Disponível em</h2>
          <div className="flex flex-wrap gap-4 mt-2">
            {streamingLinks.map((p) => (
              <ModalPlatformLink
                key={`${p.name}-${p.url}`}
                href={p.url}
                label={p.name}
                icon={
                  <PlatformIcon platform={p.name} size={PLATFORM_ICON_SIZE_MODAL} className="h-8 w-8" variant="circle" />
                }
              />
            ))}
            <ModalPlatformLink
              href={tmdbSerieUrl}
              label="TMDB"
              className="border border-primary/40 text-primary hover:bg-primary/10 bg-transparent"
            />
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
                  <CarouselItem key={`${ator.id}-${ator.personagem}`} className="basis-auto">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {ator.id ? (
                          <Link
                            href={`/pessoa/${ator.id}`}
                            onClick={() => {
                              sessionStorage.setItem(
                                'orbe:superModalReturn',
                                JSON.stringify({ type: 'serie', id: serie.id }),
                              );
                              closeSuperModal();
                            }}
                            className="flex flex-col items-center text-center w-24"
                          >
                            <SafeImage
                              src={ator.foto_url}
                              alt={ator.nome}
                              width={96}
                              height={144}
                              className="rounded-full object-cover h-24 w-24 mb-2"
                              fallbackLabel="?"
                            />
                            <p className="font-semibold text-sm truncate w-full hover:text-primary transition-colors">{ator.nome}</p>
                            <p className="text-xs text-gray-400 truncate w-full">{ator.personagem}</p>
                          </Link>
                        ) : (
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
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ator.nome} como {ator.personagem}{ator.id ? ' — ver filmografia' : ''}</p>
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
              <button
                key={season.numero}
                type="button"
                onClick={() => setSeasonDrawer(season.numero)}
                className="flex w-full justify-between items-center bg-muted hover:bg-muted/80 p-2 rounded-lg text-left cursor-pointer transition-colors"
              >
                <span className="font-medium">{season.nome || `Temporada ${season.numero}`}</span>
                <span className="text-muted-foreground">{season.episodios} episódios</span>
              </button>
            ))}
          </div>
        </section>
      )}
        </TabsContent>

      </Tabs>

      <ContinuacoesSuperModalTabs tipo="serie" tmdbId={serie.id} showSagaLink={false} />

      {seasonDrawer !== null && (
        <SerieSeasonDrawer
          tmdbId={serie.id}
          seasonNumber={seasonDrawer}
          seasonLabel={
            serie.temporadas?.find((s) => s.numero === seasonDrawer)?.nome ||
            `Temporada ${seasonDrawer}`
          }
          onClose={() => setSeasonDrawer(null)}
        />
      )}
    </div>
  );
};

export default SerieModalContent;
