
import { Serie } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatNextEpisodeDetail } from '@/lib/media-helpers';

interface SerieInfoBlockProps {
  serie: Serie;
}

const SerieInfoBlock = ({ serie }: SerieInfoBlockProps) => {
  const { isDark } = useTheme();

  const labelColor = isDark ? 'text-blue-400' : 'text-yellow-500';

  const creators = serie.criadores?.map((creator) => creator.nome).join(', ');
  const releaseLabel = (() => {
    if (!serie.data_lancamento_api) return 'N/A';
    try {
      const raw = String(serie.data_lancamento_api);
      const date = raw.includes('T') ? parseISO(raw) : new Date(raw);
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return 'N/A';
    }
  })();
  const rating = serie.avaliacao ? (serie.avaliacao / 10).toFixed(1) : null;

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold">{serie.titulo_curado || serie.titulo_api}</h1>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm md:text-base">
        <div className="flex">
          <span className={`font-semibold ${labelColor} mr-2`}>Lançamento:</span>
          <span>{releaseLabel}</span>
        </div>
        {serie.status && (
          <div className="flex">
            <span className={`font-semibold ${labelColor} mr-2`}>Status:</span>
            <span>{serie.status}</span>
          </div>
        )}
        {rating && (
          <div className="flex">
            <span className={`font-semibold ${labelColor} mr-2`}>Nota:</span>
            <span>{rating} / 10</span>
          </div>
        )}
        <div className="flex">
          <span className={`font-semibold ${labelColor} mr-2`}>Temporadas:</span>
          <span>{serie.numero_temporadas}</span>
        </div>
        <div className="flex">
          <span className={`font-semibold ${labelColor} mr-2`}>Episódios:</span>
          <span>{serie.numero_episodios}</span>
        </div>
        {creators && (
          <div className="flex col-span-2">
            <span className={`font-semibold ${labelColor} mr-2`}>Criadores:</span>
            <span>{creators}</span>
          </div>
        )}
        {serie.nextAiringEpisode && (
          <div className="flex col-span-2 items-center flex-wrap gap-2">
            <span className={`font-semibold ${labelColor}`}>Próximo episódio:</span>
            <span className="inline-flex items-center rounded-full border-2 border-[var(--orbe-block-border)] bg-[var(--orbe-accent)]/10 px-3 py-1 text-xs font-bold text-orange-700 dark:text-orange-300">
              {formatNextEpisodeDetail(
                serie.nextAiringEpisode.airingAt,
                serie.nextAiringEpisode.episode,
                serie.nextAiringEpisode.season,
              )}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <span className={`font-semibold ${labelColor}`}>Gêneros:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {serie.generos_api?.map((genre) => (
            <span key={genre} className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SerieInfoBlock;
