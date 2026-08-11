'use client';

import React, { useState, useEffect } from 'react';
import {
  MoreVertical,
  Heart,
  Bookmark,
  Star,
  Check,
  EyeOff,
} from 'lucide-react';
import PlatformIcon from '@/components/ui/PlatformIcons';
import AwardIcon from '@/components/ui/AwardIcons';
import SafeImage from '@/components/ui/SafeImage';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAppStore } from '@/stores/appStore';
import {
  getStreamingProviders,
  getGamePlatforms,
  getAnimeDubStatus,
  formatRating,
  formatNextEpisodeCard,
  hasSteamPriceDisplay,
} from '@/lib/media-helpers';
import SteamPriceLabel from '@/components/ui/SteamPriceLabel';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { MidiaCardProps, UserAction, Anime, Jogo } from '@/types';

const useCountdown = (targetDate: string | undefined) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!targetDate) return;

    const updateCountdown = () => {
      const difference = new Date(targetDate).getTime() - Date.now();
      if (difference <= 0) {
        setTimeLeft('Já disponível');
        return false;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
      return true;
    };

    if (!updateCountdown()) return;

    const interval = setInterval(() => {
      if (!updateCountdown()) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};

const MidiaCard = React.forwardRef<HTMLDivElement, MidiaCardProps>((
  {
    midia,
    type,
    userInteractions = [],
    onInteraction,
    onClick,
    isFocused,
    priority = false,
  }, ref) => {

  if (!midia) {
    return null;
  }

  const { openSuperModal, openRatingModal } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const rating = formatRating(midia, type);
  const genres = Array.isArray(midia.generos_api) ? midia.generos_api : [];
  const providers = getStreamingProviders(midia);
  const platforms = type === 'jogo' ? getGamePlatforms(midia as Jogo) : [];
  const dubStatus = type === 'anime' ? getAnimeDubStatus(midia as Anime) : null;

  const isAnime = type === 'anime';
  const nextAiringEpisode = isAnime ? (midia as Anime).nextAiringEpisode : null;
  const countdown = useCountdown(nextAiringEpisode?.airingAt);

  // Lógica para detectar novo episódio (lançado nas últimas 24h)
  const isNewEpisode = (() => {
    if (!isAnime || !midia.data_lancamento_api) return false;
    const releaseDate = new Date(midia.data_lancamento_api);
    const now = new Date();
    const diffInMs = now.getTime() - releaseDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    // Se o anime já estreou e o lançamento foi há menos de 24h
    return diffInHours > 0 && diffInHours <= 24;
  })();

  const animeReleaseDate = isAnime ? new Date((midia as Anime).data_lancamento_api) : null;
  const isFutureRelease = animeReleaseDate ? animeReleaseDate > new Date() : false;
  const hasNextEpisode = !!nextAiringEpisode;
  const nextEpisodeNumber =
    nextAiringEpisode?.episode ?? (midia as Anime).numero_episodio_atual ?? null;
  const nextEpisodeCardLabel =
    nextAiringEpisode && nextEpisodeNumber
      ? formatNextEpisodeCard(nextAiringEpisode.airingAt, nextEpisodeNumber, countdown)
      : null;

  const userInteraction = userInteractions.find(
    interaction => interaction.midia_id === midia.id && interaction.tipo_midia === type
  );

  const isAdultContent = (midia as any).isAdult === true;

  const topAward = midia.premiacoes?.find((a) => a.status === 'vencedor') ?? midia.premiacoes?.[0];
  const showSteamPrice = type === 'jogo' && hasSteamPriceDisplay(midia);

  const formatReleaseDate = () => {
    const date = midia.data_lancamento_curada || midia.data_lancamento_api;
    if (!date) return 'A ser anunciado';
    try {
      if (typeof date === 'object' && date !== null && 'year' in date) {
        const dateObj = date as { year: number, month: number, day: number };
        return `${String(dateObj.day).padStart(2, '0')}/${String(dateObj.month).padStart(2, '0')}/${String(dateObj.year).slice(-2)}`;
      }
      return format(parseISO(date as string), 'dd/MM/yy', { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  const hasReleased = (() => {
    const date = midia.data_lancamento_curada || midia.data_lancamento_api;
    if (!date) return false;
    try {
      const releaseDate = typeof date === 'string' ? parseISO(date) : new Date((date as any).year, (date as any).month - 1, (date as any).day);
      return releaseDate <= new Date();
    } catch {
      return false;
    }
  })();

  const menuActions = [
    { icon: Heart, label: 'Favoritar', action: 'favoritar' as UserAction, active: userInteraction?.status === 'favorito' },
    { icon: Bookmark, label: 'Quero Assistir', action: 'quero_assistir' as UserAction, active: userInteraction?.status === 'quero_assistir' },
    ...(type === 'anime' || type === 'serie' ? [{ icon: Star, label: 'Acompanhando', action: 'acompanhando' as UserAction, active: userInteraction?.status === 'acompanhando' }] : []),
    { icon: Check, label: type === 'jogo' ? 'Já Joguei' : 'Já Assisti', action: (type === 'jogo' ? 'ja_joguei' : 'ja_assisti') as UserAction, active: userInteraction?.status === 'assistido', disabled: !hasReleased },
    { icon: EyeOff, label: 'Não me Interessa', action: 'nao_me_interessa' as UserAction, active: userInteraction?.status === 'oculto' }
  ];

  const handleCardClick = () => {
    openSuperModal(midia, type);
    setIsMenuOpen(false);
  };

  const handleMenuAction = (action: UserAction, event: React.MouseEvent) => {
    event.stopPropagation();
    if ((action === 'ja_assisti' || action === 'ja_joguei') && !hasReleased) return;
    if (action === 'ja_assisti' || action === 'ja_joguei') {
      openRatingModal(midia, type, action);
    } else {
      onInteraction?.(action, midia);
    }
    setIsMenuOpen(false);
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative group" ref={ref}>
            <div
              className={`relative bg-card rounded-[20px] overflow-hidden cursor-pointer w-full max-w-[210px] mx-auto flex flex-col ${isFocused ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''} transition-colors`}
              onClick={onClick || handleCardClick}
            >
              <div className="relative w-full aspect-[206/290] rounded-lg overflow-hidden shrink-0">
                <SafeImage
                  src={midia.poster_url_api}
                  alt={midia.titulo_api || 'Imagem da Mídia'}
                  width={206}
                  height={290}
                  sizes="33vw"
                  imageSize="w342"
                  loading={priority ? 'eager' : 'lazy'}
                  priority={priority}
                  className={`object-cover object-center transition-opacity duration-300 group-hover:opacity-90 w-full h-full ${isAdultContent ? 'blur-md hover:blur-none' : ''}`}
                  fallbackLabel="Sem imagem"
                />
                {type === 'filme' && (midia as any).em_prevenda && (
                  <div className="absolute top-2 right-2 z-10 rounded-full border-2 border-[var(--orbe-block-border)] bg-background px-2 py-0.5 text-[10.5px] font-bold orbe-text-primary">
                    PRÉ-VENDA
                  </div>
                )}
                {topAward && (
                  <div className="absolute top-2 left-2 z-10 max-w-[calc(100%-3rem)]">
                    <AwardIcon
                      award={topAward.nome}
                      status={topAward.status}
                      year={topAward.ano}
                      size={12}
                      className="h-3 w-3"
                    />
                  </div>
                )}
                {showSteamPrice && (
                  <div className="absolute bottom-2 left-2 right-2 z-10">
                    <SteamPriceLabel item={midia} variant="card" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={handleMenuToggle}
                    className="bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-lg py-1 z-50">
                      {menuActions.map((menuAction) => (
                        <button
                          key={menuAction.action}
                          onClick={(e) => !menuAction.disabled && handleMenuAction(menuAction.action, e)}
                          disabled={menuAction.disabled}
                          className={`flex items-center w-full px-3 py-2 text-sm transition-colors ${menuAction.disabled ? 'text-muted-foreground cursor-not-allowed opacity-50' : 'hover:bg-muted'} ${menuAction.active ? 'text-primary' : 'text-foreground'}`}
                        >
                          <menuAction.icon className="h-4 w-4 mr-2" />
                          {menuAction.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-3 flex flex-col shrink-0">
                <div className="flex justify-between items-start mb-1 min-h-[40px] max-h-[40px]">
                  <h3 className="font-bold text-sm sm:text-base line-clamp-2 pr-2 flex-grow orbe-text-primary leading-tight">{midia.titulo_curado || midia.titulo_api}</h3>
                  {rating && (
                    <div className="flex items-center gap-1 text-sm shrink-0">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="font-bold">{rating}</span>
                    </div>
                  )}
                </div>
                <div className="h-[22px] mb-1.5 flex items-center overflow-hidden">
                {type === 'anime' ? (
                  isFutureRelease ? (
                    <p className="text-xs text-gray-400 truncate">Lançamento: {formatReleaseDate()}</p>
                  ) : hasNextEpisode && nextEpisodeCardLabel ? (
                    <span className="inline-flex max-w-full items-center rounded-full border border-[var(--orbe-block-border)] bg-[var(--orbe-accent)]/10 px-1.5 py-0.5 text-[9px] font-semibold leading-none text-orange-700 dark:text-orange-300 sm:text-[10px] whitespace-nowrap truncate">
                      {nextEpisodeCardLabel}
                    </span>
                  ) : (
                    <p className="text-xs text-gray-400 truncate">Lançamento: {formatReleaseDate()}</p>
                  )
                ) : (
                  <p className="text-xs text-gray-400 truncate">
                    Lançamento: {formatReleaseDate()}
                  </p>
                )}
                </div>
                <div className="flex flex-wrap items-center gap-1 mb-1 min-h-[22px] max-h-[22px] overflow-hidden">
                  {genres.slice(0, 2).map(genre => (
                    <span key={genre} className="bg-[var(--orbe-accent)]/15 text-[var(--orbe-accent)] border border-[var(--orbe-accent)]/30 px-2 py-0.5 rounded-full text-[10px] font-semibold truncate transition-colors">
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="h-[20px] mb-1 flex items-center">
                  {dubStatus && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${dubStatus === 'Dublado' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'} transition-colors`}>
                      {dubStatus}
                    </span>
                  )}
                </div>
                {(type === 'jogo' ? platforms : providers).length > 0 && (
                  <div
                    className={`flex items-center gap-1.5 overflow-x-auto overflow-y-hidden shrink-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
                      type === 'jogo' ? 'h-[26px]' : 'h-[22px]'
                    }`}
                  >
                    {(type === 'jogo' ? platforms : providers).map((p) => (
                      <span key={p.name} title={p.name} className="inline-flex shrink-0">
                        <PlatformIcon
                          platform={p.icon}
                          logoPath={'logo_path' in p ? (p.logo_path as string | null | undefined) : undefined}
                          size={type === 'jogo' ? 24 : 18}
                          iconOnly
                          className={type === 'jogo' ? 'h-6 w-6' : 'h-[18px] w-[18px] rounded-sm'}
                          title={p.name}
                        />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {isMenuOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{midia.titulo_curado || midia.titulo_api}</p>
        </TooltipContent>
    </Tooltip>
  );
});

MidiaCard.displayName = 'MidiaCard';

export default MidiaCard;