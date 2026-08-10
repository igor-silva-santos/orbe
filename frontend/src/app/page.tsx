'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MediaCarousel from '@/components/ui/MediaCarousel';
import AnimeCarousel from '@/components/media/AnimeCarousel';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import type { Midia, Anime } from '@/types';
import { API_BASE } from '@/lib/apiBase';

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
  <div className="overflow-hidden max-w-full">
    <div className="flex gap-3 px-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex-[0_0_170px] min-w-0">
          <MidiaCardSkeleton />
        </div>
      ))}
    </div>
  </div>
);

interface HomepageData {
  filmes: Midia[];
  series: Midia[];
  jogos: Midia[];
  animes: Anime[];
}

export default function Home() {
  const [data, setData] = useState<HomepageData | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/homepage`)
      .then((res) => {
        if (!res.ok) throw new Error('homepage fetch failed');
        return res.json();
      })
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-background overflow-x-hidden">
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
              <Link
                href="/jogos-em-alta"
                className="orbe-block orbe-block-hover bg-card orbe-text-primary font-bold text-sm px-6 py-3.5 rounded-[14px] inline-flex items-center"
              >
                🎮 Ver jogos em alta
              </Link>
            </div>
          </div>
          <div className="relative h-64 md:h-[340px] hidden sm:block" aria-hidden="true">
            <div className="absolute rounded-[20px] bg-primary w-[180px] h-[240px] top-0 right-[60px] rotate-[6deg] border-[3px] border-[var(--orbe-block-border)] shadow-[6px_6px_0_var(--orbe-block-border)]" />
            <div className="absolute rounded-[20px] bg-[var(--orbe-accent-2)] w-[150px] h-[200px] bottom-0 left-5 -rotate-[8deg] border-[3px] border-[var(--orbe-block-border)] shadow-[6px_6px_0_var(--orbe-block-border)]" />
            <div className="absolute top-10 left-[100px] w-[90px] h-[90px] rounded-full border-[3px] border-[var(--orbe-block-border)] bg-[var(--orbe-hero-yellow)] shadow-[5px_5px_0_var(--orbe-block-border)]" />
          </div>
        </div>
      </section>

      <main className="container mx-auto py-12 space-y-14 px-2 sm:px-4 overflow-x-hidden">

        <section id="filmes" className="overflow-hidden">
          <SectionHeading title="Filmes" />
          {!data?.filmes ? <CarouselSkeleton /> : <MediaCarousel mediaType="filmes" initialData={data.filmes} startIndex={calculateStartIndex(data.filmes)} />}
        </section>

        <section id="series" className="overflow-hidden">
          <SectionHeading title="Séries" />
          {!data?.series ? <CarouselSkeleton /> : <MediaCarousel mediaType="series" initialData={data.series} startIndex={calculateStartIndex(data.series)} />}
        </section>

        <section id="animes" className="overflow-hidden">
          <SectionHeading title="Animes" />
          {!data?.animes ? <CarouselSkeleton /> : <AnimeCarousel initialData={data.animes} />}
        </section>

        <section id="jogos" className="overflow-hidden">
          <SectionHeading title="Jogos" />
          {!data?.jogos ? <CarouselSkeleton /> : <MediaCarousel mediaType="jogos" initialData={data.jogos} startIndex={calculateStartIndex(data.jogos)} />}
        </section>

      </main>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-5 px-2">
      <h2 className="font-display text-xl md:text-[22px] orbe-text-primary">
        {title}
      </h2>
    </div>
  );
}
