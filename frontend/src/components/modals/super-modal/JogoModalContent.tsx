'use client';

import { Jogo, CalendarModalData } from '@/types';
import JogoInfoBlock from './JogoInfoBlock';
import PcRequirementsDrawer from './PcRequirementsDrawer';
import { sanitizeTranslatedText } from '@/lib/media-helpers';
import JogoPlatformLinks from './JogoPlatformLinks';
import SafeImage from '@/components/ui/SafeImage';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CommentSection from './CommentSection';

interface JogoModalContentProps {
  jogo: Jogo;
  openCalendarModal: (data: CalendarModalData) => void;
}

const JogoModalContent: React.FC<JogoModalContentProps> = ({ jogo }) => {
  if (!jogo) {
    return <div>Carregando...</div>;
  }

  const trailerKey = jogo.trailer_key || jogo.videos?.find((v) => v.key)?.key;
  const synopsis = jogo.sinopse
    ? sanitizeTranslatedText(jogo.sinopse) || '(não informado)'
    : '(não informado)';
  const isPcGame =
    (jogo.plataformas_api || []).some((p) => /\b(pc|windows|steam|mac)\b/i.test(p.nome || '')) ||
    Boolean(jogo.steam_app_id);

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

      <JogoPlatformLinks jogo={jogo} />

      {isPcGame && jogo.pc_requirements && (
        <PcRequirementsDrawer requirements={jogo.pc_requirements} />
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

      {jogo.screenshots && jogo.screenshots.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Capturas de tela</h2>
          <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
            <CarouselContent>
              {jogo.screenshots.map((url, idx) => (
                <CarouselItem key={idx} className="basis-auto">
                  <SafeImage
                    src={url}
                    alt={`Screenshot ${idx + 1}`}
                    width={320}
                    height={180}
                    className="rounded-lg object-cover h-36 w-64"
                    fallbackLabel="?"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      )}

      <CommentSection midiaId={jogo.id} tipoMidia="jogo" />
    </div>
  );
};

export default JogoModalContent;
