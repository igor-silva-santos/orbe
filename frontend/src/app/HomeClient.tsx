'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import MediaCarousel from '@/components/ui/MediaCarousel';
import AnimeCarousel from '@/components/media/AnimeCarousel';
import type { Midia, Anime } from '@/types';
import { resolveCarouselOpenIndex } from '@/lib/carousel-utils';
import orbeNerdApi from '@/lib/api';
import { useOrbeDataRefresh } from '@/lib/hooks/useOrbeDataRefresh';

export interface HomepageData {
  filmes: Midia[];
  series: Midia[];
  jogos: Midia[];
  animes: Anime[];
}

interface HomeClientProps {
  initialData: HomepageData;
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const [data, setData] = useState(initialData);
  const [carouselKey, setCarouselKey] = useState(0);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const refreshHomepage = useCallback(async () => {
    try {
      const fresh = await orbeNerdApi.getHomepage();
      setData({
        filmes: (fresh.filmes ?? []) as Midia[],
        series: (fresh.series ?? []) as Midia[],
        jogos: (fresh.jogos ?? []) as Midia[],
        animes: (fresh.animes ?? []) as Anime[],
      });
      setCarouselKey((k) => k + 1);
    } catch (error) {
      console.error('Erro ao atualizar homepage após sync:', error);
    }
  }, []);

  useOrbeDataRefresh(refreshHomepage);

  return (
    <div className="bg-background overflow-x-hidden">
      <section className="relative overflow-hidden border-b border-border/40 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.6rem)] leading-[1.05] mb-5 orbe-text-primary">
              Todo o universo <span className="text-primary">nerd</span> num só lugar
            </h1>
            <p className="text-muted-foreground text-base md:text-[16px] leading-relaxed max-w-xl mx-auto mb-7 font-medium">
              Filmes, séries, animes e jogos — descubra lançamentos, monte sua watchlist e nunca mais perca uma estreia.
            </p>
            <div className="flex gap-3.5 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => document.getElementById('filmes')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium"
              >
                ▶ Começar agora
              </button>
              <Link
                href="/promocoes?tab=em-alta"
                className="border border-border rounded-lg px-6 py-3 font-medium inline-flex items-center"
              >
                🎮 Ver jogos em alta
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto py-12 space-y-14 px-2 sm:px-4 overflow-x-hidden">
        <section id="filmes" className="overflow-hidden">
          <SectionHeading title="Filmes" />
          <MediaCarousel
            key={`filmes-${carouselKey}`}
            mediaType="filmes"
            initialData={data.filmes}
            startIndex={resolveCarouselOpenIndex(data.filmes)}
          />
        </section>

        <section id="series" className="overflow-hidden">
          <SectionHeading title="Séries" />
          <MediaCarousel
            key={`series-${carouselKey}`}
            mediaType="series"
            initialData={data.series}
            startIndex={resolveCarouselOpenIndex(data.series)}
          />
        </section>

        <section id="animes" className="overflow-hidden">
          <SectionHeading title="Animes" />
          <AnimeCarousel key={`animes-${carouselKey}`} initialData={data.animes} />
        </section>

        <section id="jogos" className="overflow-hidden">
          <SectionHeading title="Jogos" />
          <MediaCarousel
            key={`jogos-${carouselKey}`}
            mediaType="jogos"
            initialData={data.jogos}
            startIndex={resolveCarouselOpenIndex(data.jogos)}
          />
        </section>
      </main>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold mb-6 orbe-text-primary px-2 sm:px-0">{title}</h2>
  );
}
