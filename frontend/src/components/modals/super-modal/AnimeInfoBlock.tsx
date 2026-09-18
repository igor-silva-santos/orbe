'use client';

import { Anime } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { ExternalLink, Star } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { NOT_INFORMED, translateAnimeGenre, formatNextEpisodeDetail } from '@/lib/media-helpers';

interface AnimeInfoBlockProps {
  anime: Anime;
}

const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return NOT_INFORMED;
  try {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return NOT_INFORMED;
  }
};

const AnimeInfoBlock: React.FC<AnimeInfoBlockProps> = ({ anime }) => {
  const { isDark } = useTheme();
  const labelColor = isDark ? 'text-blue-400' : 'text-yellow-500';

  const title = anime.titleEnglish || anime.titleRomaji || anime.titulo_api || NOT_INFORMED;
  const dubStatus = anime.dublagem_info ? 'Dublado' : 'Legendado';
  const score = anime.avaliacao ? (anime.avaliacao / 10).toFixed(1) : null;
  const director = (anime as any).diretor || anime.staff?.find((s) =>
    s.funcao?.toLowerCase().includes('director')
  )?.nome;

  return (
    <div className="flex-1 space-y-4">
      <h1 className="text-2xl md:text-4xl font-bold text-foreground">{title}</h1>
      {anime.titleRomaji && anime.titleRomaji !== title && (
        <h2 className="text-lg md:text-xl text-gray-400 -mt-2">{anime.titleRomaji}</h2>
      )}
      {anime.titleNative && anime.titleNative !== anime.titleRomaji && (
        <h2 className="text-md md:text-lg text-gray-500 -mt-2">{anime.titleNative}</h2>
      )}

      {score && (
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          <span className="font-bold text-lg">{score}</span>
          <span className="text-sm text-muted-foreground">/ 10</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <span className={`font-semibold ${labelColor} mr-2`}>Lançamento:</span>
          <span className="text-muted-foreground">{formatDate(anime.data_lancamento_api)}</span>
        </div>
        <div>
          <span className={`font-semibold ${labelColor} mr-2`}>Status:</span>
          <span className="text-muted-foreground">{(anime as any).status || NOT_INFORMED}</span>
        </div>
        <div>
          <span className={`font-semibold ${labelColor} mr-2`}>Direção:</span>
          <span className="text-muted-foreground">{director || NOT_INFORMED}</span>
        </div>
        <div>
          <span className={`font-semibold ${labelColor} mr-2`}>Episódios:</span>
          <span className="text-muted-foreground">{anime.numero_episodios ?? NOT_INFORMED}</span>
        </div>
        <div>
          <span className={`font-semibold ${labelColor} mr-2`}>Temporada:</span>
          <span className="text-muted-foreground">
            {(anime as any).season && (anime as any).seasonYear
              ? `${(anime as any).season} ${(anime as any).seasonYear}`
              : NOT_INFORMED}
          </span>
        </div>
        <div>
          <span className={`font-semibold ${labelColor} mr-2`}>Fonte:</span>
          <span className="text-muted-foreground">{anime.fonte || NOT_INFORMED}</span>
        </div>
        <div>
          <span className={`font-semibold ${labelColor} mr-2`}>Estúdio:</span>
          <span className="text-muted-foreground">{anime.estudio || NOT_INFORMED}</span>
        </div>
        <div>
          <span className={`font-semibold ${labelColor} mr-2`}>Dublagem:</span>
          <span className="text-muted-foreground">{dubStatus}</span>
        </div>
      </div>

      {anime.generos_api && anime.generos_api.length > 0 ? (
        <div>
          <span className={`font-semibold ${labelColor}`}>Gêneros:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {anime.generos_api.map((genre) => (
              <span key={genre} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                {translateAnimeGenre(genre)}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <span className={`font-semibold ${labelColor}`}>Gêneros:</span>
          <span className="text-muted-foreground ml-2">{NOT_INFORMED}</span>
        </div>
      )}

      {anime.nextAiringEpisode && (
        <div>
          <span className={`font-semibold ${labelColor}`}>Próximo episódio:</span>
          <span className="inline-flex ml-2 mt-1 items-center rounded-full border-2 border-[var(--orbe-block-border)] bg-[var(--orbe-accent)]/10 px-3 py-1 text-xs font-bold text-orange-700 dark:text-orange-300">
            {formatNextEpisodeDetail(
              anime.nextAiringEpisode.airingAt,
              anime.nextAiringEpisode.episode,
              anime.nextAiringEpisode.season,
            )}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {anime.mal_link && (
          <a
            href={anime.mal_link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-semibold ${labelColor} hover:underline`}
          >
            MyAnimeList <ExternalLink size={16} />
          </a>
        )}
        {(anime as any).anilist_link && (
          <a
            href={(anime as any).anilist_link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-semibold ${labelColor} hover:underline`}
          >
            AniList <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default AnimeInfoBlock;
