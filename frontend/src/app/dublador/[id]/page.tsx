'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import { apiClient } from '@/lib/api';
import { useAppStore } from '@/stores/appStore';
import type { Anime, Filme, Jogo, Serie, TipoMidia } from '@/types';

interface DubCredit {
  id: number;
  mediaType: 'filme' | 'serie' | 'anime' | 'jogo';
  title: string;
  character: string | null;
  posterPath: string | null;
  releaseDate: string | null;
}

interface DubladorCredits {
  id: number;
  name: string;
  language: string | null;
  profilePath: string | null;
  filmography: DubCredit[];
}

const MEDIA_LABEL: Record<DubCredit['mediaType'], string> = {
  filme: 'Filme',
  serie: 'Série',
  anime: 'Anime',
  jogo: 'Jogo',
};

export default function DubladorPage({ params }: { params: { id: string } }) {
  const openSuperModal = useAppStore((s) => s.openSuperModal);
  const [data, setData] = useState<DubladorCredits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setHasError(false);
    apiClient
      .get(`/dubladores/${params.id}/creditos`)
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

  const handleOpenCredit = (credit: DubCredit) => {
    const stub = {
      id: credit.id,
      titulo_api: credit.title,
      titulo_curado: credit.title,
      poster_url_api: credit.posterPath ?? '',
      poster_curado: credit.posterPath,
      data_lancamento_api: credit.releaseDate,
      data_lancamento_curada: credit.releaseDate,
      generos_api: [],
      avaliacao: null,
      plataformas_api: [],
      premiacoes: [],
    } as unknown as Filme | Serie | Anime | Jogo;
    openSuperModal(stub, credit.mediaType as TipoMidia);
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
        <p className="text-destructive">Não foi possível carregar este dublador.</p>
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
              <p className="text-sm text-muted-foreground mt-1">
                {data.language?.toUpperCase().includes('PORTUGUESE')
                  ? 'Dublagem em português'
                  : data.language?.toUpperCase().includes('JAPANESE')
                    ? 'Voz original (japonês)'
                    : 'Dublador(a)'}
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4 text-yellow-500 dark:text-blue-400">
            Trabalhos de dublagem
          </h2>
          {data.filmography.length === 0 ? (
            <p className="text-muted-foreground">Nenhum título encontrado para este dublador.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.filmography.map((credit) => (
                <button
                  key={`${credit.mediaType}-${credit.id}-${credit.character ?? ''}`}
                  onClick={() => handleOpenCredit(credit)}
                  className="text-left group"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted mb-2">
                    <SafeImage
                      src={credit.posterPath}
                      alt={credit.title}
                      width={342}
                      height={513}
                      imageSize="w342"
                      className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
                      fallbackLabel="Sem imagem"
                    />
                    {credit.character ? (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pb-2 pt-8">
                        <p className="text-[11px] font-medium text-white line-clamp-2 leading-tight">
                          {credit.character}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <p className="text-sm font-semibold line-clamp-2 orbe-text-primary">{credit.title}</p>
                  {credit.character ? (
                    <p className="text-xs text-primary line-clamp-2 mt-0.5">como {credit.character}</p>
                  ) : null}
                  <p className="text-[11px] text-muted-foreground">{MEDIA_LABEL[credit.mediaType]}</p>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
