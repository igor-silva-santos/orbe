'use client';
import { FilmeDetalhes } from '@/types';
import { NOT_INFORMED, resolveFilmeTitle } from '@/lib/media-helpers';
import { formatTmdbPopularityHint, formatTmdbPopularityLabel } from '@/lib/engagement-labels';
import { filmeDestaqueLabels } from '@/lib/filme-destaque';

const formatRuntime = (minutes: number | null | undefined) => {
  if (!minutes) return NOT_INFORMED;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const FilmeInfoBlock = ({ filme }: { filme: FilmeDetalhes }) => {
  if (!filme) return null;

  const director = filme.crew?.find(member => member.job === 'Director');
  const voteAverage = filme.voteAverage ?? (filme as { voteAverage?: number }).voteAverage;
  const popularity = filme.popularity;
  const tagline = (filme as { tagline?: string | null }).tagline;
  const filmeTitle = resolveFilmeTitle(filme);
  const destaqueLabels = filmeDestaqueLabels(filme);

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold">{filmeTitle}</h1>
        {destaqueLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {destaqueLabels.map((label) => (
              <span
                key={label}
                className="text-xs font-semibold uppercase tracking-wide rounded-full border border-primary/30 bg-primary/10 text-primary px-2.5 py-1"
              >
                {label}
              </span>
            ))}
          </div>
        )}
        {filme.originalTitle && filmeTitle !== filme.originalTitle && (
          <h2 className="text-lg text-gray-400">{filme.originalTitle}</h2>
        )}
        {tagline && (
          <p className="text-sm text-muted-foreground italic mt-1">{tagline}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-bold text-yellow-500 dark:text-blue-400">Lançamento: </span>
          {filme.releaseDate || (filme as { data_lancamento_api?: string }).data_lancamento_api
            ? new Date(
                filme.releaseDate || (filme as { data_lancamento_api?: string }).data_lancamento_api!
              ).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
            : NOT_INFORMED}
        </div>
        <div>
          <span className="font-bold text-yellow-500 dark:text-blue-400">Duração: </span>
          {formatRuntime(filme.runtime)}
        </div>
        {voteAverage != null && voteAverage > 0 && (
          <div>
            <span className="font-bold text-yellow-500 dark:text-blue-400">Nota: </span>
            {voteAverage.toFixed(1)} / 10
          </div>
        )}
        {popularity != null && popularity > 0 && (
          <div title={formatTmdbPopularityHint()}>
            <span className="font-bold text-yellow-500 dark:text-blue-400">Interesse: </span>
            {formatTmdbPopularityLabel(popularity)}
          </div>
        )}
        {filme.status && (
          <div>
            <span className="font-bold text-yellow-500 dark:text-blue-400">Status: </span>
            {filme.status}
          </div>
        )}
      </div>
      <div>
        <span className="font-bold text-yellow-500 dark:text-blue-400">Direção: </span>
        {director ? director.pessoa.name : NOT_INFORMED}
      </div>
      {filme.genres && filme.genres.length > 0 && (
        <div>
          <span className="font-bold text-yellow-500 dark:text-blue-400">Gêneros:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {filme.genres.map(({ genero }) => (
              <div key={genero.id} className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
                {genero.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmeInfoBlock;