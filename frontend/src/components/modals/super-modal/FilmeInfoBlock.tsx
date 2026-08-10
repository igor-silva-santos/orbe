'use client';
import { FilmeDetalhes } from '@/types';
import { NOT_INFORMED } from '@/lib/media-helpers';

const formatRuntime = (minutes: number | null | undefined) => {
  if (!minutes) return NOT_INFORMED;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const FilmeInfoBlock = ({ filme }: { filme: FilmeDetalhes }) => {
  if (!filme) return null;

  const director = filme.crew?.find(member => member.job === 'Director');
  const voteAverage = (filme as any).voteAverage as number | null | undefined;
  const tagline = (filme as any).tagline as string | null | undefined;

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold">{filme.title}</h1>
        {filme.originalTitle && filme.title !== filme.originalTitle && (
          <h2 className="text-lg text-gray-400">{filme.originalTitle}</h2>
        )}
        {tagline && (
          <p className="text-sm text-muted-foreground italic mt-1">{tagline}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-bold text-yellow-500 dark:text-blue-400">Lançamento: </span>
          {filme.releaseDate
            ? new Date(filme.releaseDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
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