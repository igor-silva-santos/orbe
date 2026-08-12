'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { apiClient } from '@/lib/api';
import { useAppStore } from '@/stores/appStore';
import type { Filme, Serie } from '@/types';

interface PersonCredit {
  id: number;
  mediaType: 'filme' | 'serie';
  title: string;
  character: string | null;
  posterPath: string | null;
  releaseDate: string | null;
}

interface PersonCredits {
  id: number;
  name: string;
  profilePath: string | null;
  biography: string | null;
  filmography: PersonCredit[];
}

export default function PessoaPage({ params }: { params: { id: string } }) {
  const openSuperModal = useAppStore((s) => s.openSuperModal);
  const [data, setData] = useState<PersonCredits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setHasError(false);
    apiClient
      .get(`/pessoas/${params.id}/creditos`)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setHasError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const handleOpenCredit = (credit: PersonCredit) => {
    const stub = {
      id: credit.id,
      titulo_api: credit.title,
      titulo_curado: null,
      poster_url_api: credit.posterPath,
      poster_curado: null,
      data_lancamento_api: credit.releaseDate,
      data_lancamento_curada: null,
      generos_api: [],
      avaliacao: null,
      plataformas_api: [],
      premiacoes: [],
    } as unknown as Filme | Serie;
    openSuperModal(stub, credit.mediaType);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      {isLoading && <p className="text-muted-foreground">Carregando...</p>}
      {!isLoading && hasError && (
        <p className="text-destructive">Não foi possível carregar esta pessoa.</p>
      )}

      {!isLoading && data && (
        <>
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-muted shrink-0">
              <SafeImage
                src={data.profilePath}
                alt={data.name}
                width={128}
                height={128}
                imageSize="w185"
                className="w-full h-full object-cover"
                fallbackLabel="?"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold orbe-text-primary">{data.name}</h1>
              {data.biography && (
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-6 max-w-2xl">
                  {data.biography}
                </p>
              )}
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">
            Filmes e séries
          </h2>
          {data.filmography.length === 0 ? (
            <p className="text-muted-foreground">Nenhum título encontrado.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.filmography.map((credit) => (
                <button
                  key={`${credit.mediaType}-${credit.id}`}
                  onClick={() => handleOpenCredit(credit)}
                  className="text-left group"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted mb-2">
                    <SafeImage
                      src={credit.posterPath}
                      alt={credit.title}
                      width={342}
                      height={513}
                      imageSize="w342"
                      className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
                      fallbackLabel="Sem imagem"
                    />
                  </div>
                  <p className="text-sm font-semibold line-clamp-2 orbe-text-primary">{credit.title}</p>
                  {credit.character && (
                    <p className="text-xs text-muted-foreground line-clamp-1">{credit.character}</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
