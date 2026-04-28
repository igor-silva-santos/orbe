'use client';

import { useState, useEffect } from 'react';
import { FilmeDetalhes, CalendarModalData } from '@/types';
import FilmeInfoBlock from './FilmeInfoBlock';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import PlatformIcon from '@/components/ui/PlatformIcons';
import orbeNerdApi from '@/lib/api';
import { User, Send, MessageSquare } from 'lucide-react';

interface FilmeModalContentProps {
  filme: FilmeDetalhes;
  openCalendarModal: (data: CalendarModalData) => void;
}

const FilmeModalContent: React.FC<FilmeModalContentProps> = ({ filme, openCalendarModal }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await orbeNerdApi.getComments('filme', filme.tmdbId);
        setComments(data);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      }
    };
    if (filme) loadComments();
  }, [filme]);

  const handleSendComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try {
      const comment = await orbeNerdApi.createComment({
        midia_id: filme.tmdbId,
        tipo_midia: 'filme',
        texto: newComment
      });
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!filme) {
    return <div>Carregando...</div>;
  }

  const trailerKey = filme.videos?.find(v => v.type === 'Trailer' && v.official)?.key;

  // Lógica dos botões
  const releaseDate = filme.releaseDate ? new Date(filme.releaseDate) : null;
  const now = new Date();
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(now.getDate() - 90);
  
  const isMovieInTheaters = filme.status === 'Released' && releaseDate && releaseDate > ninetyDaysAgo && releaseDate <= now;
  const isFutureRelease = releaseDate && releaseDate > now;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Bloco Superior: Pôster e Informações Principais */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-48 flex-shrink-0 mx-auto md:mx-0">
          <Image
            src={filme.posterPath ? `https://image.tmdb.org/t/p/original${filme.posterPath}` : '/placeholder-poster.jpg'}
            alt={`Pôster de ${filme.title}`}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="flex-1">
          <FilmeInfoBlock filme={filme} />

          <div className="flex items-center gap-4 mt-4">
            {/* Botão Adicionar ao Calendário */}
            {isFutureRelease && (
              <Button onClick={() => openCalendarModal({ midia: filme as any, type: 'filme' })}>Adicionar ao Calendário</Button>
            )}

            {/* Botão Comprar Ingresso */}
            {isMovieInTheaters && (
              filme.ingresso_link ? (
                <Button asChild>
                  <a href={filme.ingresso_link} target="_blank" rel="noopener noreferrer">
                    Comprar Ingresso
                  </a>
                </Button>
              ) : (
                <Button disabled>
                  Ingresso Indisponível
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Sinopse */}
      {filme.overview && (
        <section>
          <h2 className="text-xl font-bold mb-2 text-yellow-500 dark:text-blue-400">Sinopse</h2>
          <p className="text-muted-foreground leading-relaxed">{filme.overview}</p>
        </section>
      )}

      {/* Disponível Em */}
      {filme.streamingProviders && filme.streamingProviders.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Disponível em</h2>
          <div className="flex flex-wrap gap-4 mt-2">
            {filme.streamingProviders.map((p) => (
              p.url && (
                <a 
                  key={p.provider.name} 
                  href={p.url}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <PlatformIcon platform={p.provider.name} className="h-5 w-5" />
                  <span>{p.provider.name}</span>
                </a>
              )
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
              src={`https://www.youtube.com/embed/${trailerKey}`}
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
      {filme.cast && filme.cast.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">Elenco</h2>
          <TooltipProvider>
            <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
              <CarouselContent>
                {filme.cast.map(ator => (
                  <CarouselItem key={ator.pessoa.id} className="basis-auto">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center w-24 cursor-pointer">
                          <div className="w-20 h-20 bg-muted rounded-full mb-2 overflow-hidden mx-auto">
                            <Image
                              src={ator.pessoa.profilePath ? `https://image.tmdb.org/t/p/original${ator.pessoa.profilePath}` : '/placeholder-avatar.jpg'}
                              alt={ator.pessoa.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="font-semibold text-xs truncate w-full">{ator.pessoa.name}</p>
                          <p className="text-xs text-muted-foreground truncate w-full">{ator.character}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ator.pessoa.name} como {ator.character}</p>
                      </TooltipContent>
                    </Tooltip>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TooltipProvider>
        </section>
      )}

      {/* Seção de Comentários */}
      <section className="pt-8 border-t border-muted">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-yellow-500 dark:text-blue-400">
          <MessageSquare className="h-5 w-5" />
          Comentários ({comments.length})
        </h2>

        {/* Formulário de Novo Comentário */}
        <div className="bg-muted/30 p-4 rounded-xl mb-8 space-y-3">
          <Textarea 
            placeholder="O que você achou desta obra? Compartilhe sua opinião..."
            className="bg-background border-muted-foreground/20 resize-none min-h-[100px]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button 
              disabled={isSubmitting || !newComment.trim()} 
              onClick={handleSendComment}
              className="gap-2"
            >
              {isSubmitting ? 'Enviando...' : 'Comentar'}
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Lista de Comentários */}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 p-4 bg-muted/20 rounded-xl border border-muted/50">
                <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0 overflow-hidden border border-muted-foreground/10">
                  {comment.usuario.avatar ? (
                    <Image src={comment.usuario.avatar} alt={comment.usuario.nome} width={40} height={40} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">{comment.usuario.nome || 'Usuário Orbe'}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(comment.data_criacao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {comment.texto}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground italic">
              Seja o primeiro a comentar sobre este filme!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FilmeModalContent;
