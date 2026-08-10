'use client';

import { useState, useEffect } from 'react';
import MediaCarousel from '@/components/ui/MediaCarousel';
import AnimeCarousel from '@/components/media/AnimeCarousel';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import type { Midia, Anime } from '@/types';
import { API_BASE } from '@/lib/apiBase';

const fetchInitialMediaData = async (mediaType: 'filmes' | 'series' | 'jogos') => {
  const year = new Date().getFullYear();
  const response = await fetch(`${API_BASE}/${mediaType}/by-year?year=${year}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch initial data for ${mediaType}`);
  }
  const data = await response.json();
  return data.sort((a: Midia, b: Midia) => {
    const dateA = a.data_lancamento_api ? new Date(a.data_lancamento_api).getTime() : 0;
    const dateB = b.data_lancamento_api ? new Date(b.data_lancamento_api).getTime() : 0;
    return dateA - dateB;
  });
};

const fetchInitialAnimeData = async () => {
    const getSeason = (date: Date) => {
        const month = date.getMonth();
        if (month >= 0 && month <= 2) return 'WINTER';
        if (month >= 3 && month <= 5) return 'SPRING';
        if (month >= 6 && month <= 8) return 'SUMMER';
        return 'FALL';
    };
    const year = new Date().getFullYear();
    const season = getSeason(new Date());

    const response = await fetch(`${API_BASE}/animes/by-season?year=${year}&season=${season}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch animes`);
    }
    return response.json();
}

const calculateStartIndex = (data: Midia[]) => {
    if (!data || data.length === 0) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const index = data.findIndex(item => {
      if (!item.data_lancamento_api) return false;
      const releaseDate = new Date(item.data_lancamento_api);
      return !isNaN(releaseDate.getTime()) && releaseDate >= today;
    });
    
    return index > -1 ? index : data.length - 1;
}

const CarouselSkeleton = () => (
  <div className="overflow-hidden">
    <div className="flex -ml-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="relative min-w-0 flex-shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-4">
          <MidiaCardSkeleton />
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [initialData, setInitialData] = useState<{ filmes: Midia[], series: Midia[], jogos: Midia[], animes: Anime[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [filmes, series, jogos, animes] = await Promise.all([
          fetchInitialMediaData('filmes'),
          fetchInitialMediaData('series'),
          fetchInitialMediaData('jogos'),
          fetchInitialAnimeData(),
        ]);
        setInitialData({ filmes, series, jogos, animes });
      } catch (error) {
        console.error("Failed to load initial carousel data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  return (
    <div className="bg-background">
      {/* Hero — Anime-Pop (preview 03) */}
      <section className="relative overflow-hidden border-b-[3px] border-[var(--orbe-block-border)] py-14 md:py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <span className="orbe-block-sm inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide bg-[var(--orbe-accent-2)] text-white px-4 py-2 rounded-full mb-5">
              ⚡ Season Pass 2026
            </span>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.6rem)] leading-[1.05] mb-5 orbe-text-primary">
              Todo o universo <span className="orbe-nerd-stroke">nerd</span> num só lugar
            </h1>
            <p className="text-muted-foreground text-base md:text-[16px] leading-relaxed max-w-xl mb-7 font-medium">
              Filmes, séries, animes e jogos — descubra lançamentos, monte sua watchlist e nunca mais perca uma estreia.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <button
                type="button"
                onClick={() => document.getElementById('filmes')?.scrollIntoView({ behavior: 'smooth' })}
                className="orbe-block orbe-block-hover bg-primary text-primary-foreground font-bold text-sm px-6 py-3.5 rounded-[14px]"
              >
                ▶ Começar agora
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('jogos')?.scrollIntoView({ behavior: 'smooth' })}
                className="orbe-block orbe-block-hover bg-card orbe-text-primary font-bold text-sm px-6 py-3.5 rounded-[14px]"
              >
                🎮 Ver jogos em alta
              </button>
            </div>
          </div>
          <div className="relative h-64 md:h-[340px] hidden sm:block" aria-hidden="true">
            <div className="absolute rounded-[20px] bg-primary w-[180px] h-[240px] top-0 right-[60px] rotate-[6deg] border-[3px] border-[var(--orbe-block-border)] shadow-[6px_6px_0_var(--orbe-block-border)]" />
            <div className="absolute rounded-[20px] bg-[var(--orbe-accent-2)] w-[150px] h-[200px] bottom-0 left-5 -rotate-[8deg] border-[3px] border-[var(--orbe-block-border)] shadow-[6px_6px_0_var(--orbe-block-border)]" />
            <div className="absolute top-10 left-[100px] w-[90px] h-[90px] rounded-full border-[3px] border-[var(--orbe-block-border)] bg-[var(--orbe-hero-yellow)] shadow-[5px_5px_0_var(--orbe-block-border)]" />
          </div>
        </div>
      </section>

      <main className="container mx-auto py-12 space-y-14 px-4">

        <section id="filmes">
          <SectionHeading title="Filmes" chip="HOT" />
          {isLoading || !initialData ? <CarouselSkeleton /> : <MediaCarousel mediaType="filmes" initialData={initialData.filmes} startIndex={calculateStartIndex(initialData.filmes)} />}
        </section>

        <section id="series">
          <SectionHeading title="Séries" chip="NEW" />
          {isLoading || !initialData ? <CarouselSkeleton /> : <MediaCarousel mediaType="series" initialData={initialData.series} startIndex={calculateStartIndex(initialData.series)} />}
        </section>

        <section id="animes">
          <SectionHeading title="Animes" chip="S2026" />
          {isLoading || !initialData ? <CarouselSkeleton /> : <AnimeCarousel initialData={initialData.animes} />}
        </section>

        <section id="jogos">
          <SectionHeading title="Jogos" chip="PLAY" />
          {isLoading || !initialData ? <CarouselSkeleton /> : <MediaCarousel mediaType="jogos" initialData={initialData.jogos} startIndex={calculateStartIndex(initialData.jogos)} />}
        </section>

      </main>
    </div>
  );
}

function SectionHeading({ title, chip }: { title: string; chip: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-display text-xl md:text-[22px] orbe-text-primary flex items-center gap-3">
        {title}
        <span className="font-sans text-[11.5px] font-bold bg-foreground text-background px-2.5 py-1 rounded-full">
          {chip}
        </span>
      </h2>
    </div>
  );
}
