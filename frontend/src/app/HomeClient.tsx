'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import MediaCarousel from '@/components/ui/MediaCarousel';
import AnimeCarousel from '@/components/media/AnimeCarousel';
import type { Midia, Anime } from '@/types';
import { resolveCarouselOpenIndex, filterMidiaForCarouselTimeline } from '@/lib/carousel-utils';
import orbeNerdApi from '@/lib/api';
import { useOrbeDataRefresh } from '@/lib/hooks/useOrbeDataRefresh';
import { useSectionVisible } from '@/hooks/useSectionVisible';

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

  const heroRef = useRef<HTMLElement>(null);
  const filmesRef = useRef<HTMLElement>(null);
  const seriesRef = useRef<HTMLElement>(null);
  const animesRef = useRef<HTMLElement>(null);
  const jogosRef = useRef<HTMLElement>(null);

  const heroVisible = useSectionVisible(heroRef);
  const filmesVisible = useSectionVisible(filmesRef);
  const seriesVisible = useSectionVisible(seriesRef);
  const animesVisible = useSectionVisible(animesRef);
  const jogosVisible = useSectionVisible(jogosRef);

  /** Filmes e jogos bootstraps quando o hero ou a própria seção estão perto do viewport */
  const filmesBootstrapEnabled = heroVisible || filmesVisible;
  const jogosBootstrapEnabled = heroVisible || jogosVisible;

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
    } catch (error) {
      console.error('Erro ao atualizar homepage após sync:', error);
    }
  }, []);

  useOrbeDataRefresh(refreshHomepage);

  return (
    <div className="bg-background overflow-x-hidden">
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-border/40 py-14 md:py-16"
      >
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
        <section ref={filmesRef} id="filmes" className="overflow-hidden">
          <SectionHeading title="Filmes" href="/filmes" />
          <MediaCarousel
            mediaType="filmes"
            initialData={data.filmes}
            startIndex={resolveCarouselOpenIndex(filterMidiaForCarouselTimeline(data.filmes))}
            bootstrapEnabled={filmesBootstrapEnabled}
          />
        </section>

        <section ref={seriesRef} id="series" className="overflow-hidden">
          <SectionHeading title="Séries" href="/series" />
          <MediaCarousel
            mediaType="series"
            initialData={data.series}
            startIndex={resolveCarouselOpenIndex(filterMidiaForCarouselTimeline(data.series))}
            bootstrapEnabled={seriesVisible}
          />
        </section>

        <section ref={animesRef} id="animes" className="overflow-hidden">
          <SectionHeading title="Animes" href="/animes" />
          <AnimeCarousel
            initialData={data.animes}
            bootstrapEnabled={animesVisible}
          />
        </section>

        <section ref={jogosRef} id="jogos" className="overflow-hidden">
          <SectionHeading title="Jogos" href="/jogos" />
          <MediaCarousel
            mediaType="jogos"
            initialData={data.jogos}
            startIndex={resolveCarouselOpenIndex(filterMidiaForCarouselTimeline(data.jogos))}
            bootstrapEnabled={jogosBootstrapEnabled}
          />
        </section>
      </main>
    </div>
  );
}

function SectionHeading({ title, href }: { title: string; href: string }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold mb-6 orbe-text-primary px-2 sm:px-0">
      <Link
        href={href}
        className="inline-block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        {title}
      </Link>
    </h2>
  );
}
