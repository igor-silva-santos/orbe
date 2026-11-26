'use client';

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import MediaCarousel from '@/components/ui/MediaCarousel';
import AnimeCarousel from '@/components/media/AnimeCarousel';
import ContinuarAssistindoSection from '@/components/watchlist/ContinuarAssistindoSection';
import type { Midia, Anime } from '@/types';
import { resolveCarouselOpenIndex, filterMidiaForCarouselTimeline } from '@/lib/carousel-utils';
import orbeNerdApi from '@/lib/api';
import { useOrbeDataRefresh } from '@/lib/hooks/useOrbeDataRefresh';
import { useSectionVisible } from '@/hooks/useSectionVisible';
import { getToken } from '@/lib/auth/token';
import { useAppStore } from '@/stores/appStore';
import {
  DEFAULT_HOME_LAYOUT,
  HOME_CAROUSEL_HREFS,
  HOME_CAROUSEL_LABELS,
  type HomeCarouselId,
} from '@/lib/home-layout';

export interface HomepageData {
  filmes: Midia[];
  series: Midia[];
  jogos: Midia[];
  animes: Anime[];
}

interface HomeClientProps {
  initialData: HomepageData;
}

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function sameLayout(a: HomeCarouselId[], b: HomeCarouselId[]): boolean {
  return a.length === b.length && a.every((id, index) => id === b[index]);
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const [data, setData] = useState(initialData);
  const [homeLayout, setHomeLayout] = useState<HomeCarouselId[]>(DEFAULT_HOME_LAYOUT);
  const [accountLayoutPending, setAccountLayoutPending] = useState(false);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  const heroRef = useRef<HTMLElement>(null);
  const heroVisible = useSectionVisible(heroRef);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useIsoLayoutEffect(() => {
    let cancelled = false;
    if (!getToken()) {
      setAccountLayoutPending(false);
      setHomeLayout((current) => (sameLayout(current, DEFAULT_HOME_LAYOUT) ? current : DEFAULT_HOME_LAYOUT));
      return;
    }

    setAccountLayoutPending(true);
    void orbeNerdApi.getHomeLayout().then((saved) => {
      if (cancelled) return;
      setHomeLayout(saved ?? DEFAULT_HOME_LAYOUT);
      setAccountLayoutPending(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (getToken()) return;
    setAccountLayoutPending(false);
    setHomeLayout((current) => (sameLayout(current, DEFAULT_HOME_LAYOUT) ? current : DEFAULT_HOME_LAYOUT));
  }, [isAuthenticated]);

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

  const firstSection = homeLayout[0];

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
                onClick={() => {
                  if (!firstSection) return;
                  document.getElementById(firstSection)?.scrollIntoView({ behavior: 'smooth' });
                }}
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
        <ContinuarAssistindoSection />
        {accountLayoutPending ? (
          <p className="text-center text-muted-foreground">Carregando sua tela inicial...</p>
        ) : homeLayout.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Nenhum carrossel na tela inicial.{' '}
            <Link href="/configuracoes" className="text-primary underline underline-offset-4">
              Mostre de novo em Configurações
            </Link>
            .
          </p>
        ) : (
          homeLayout.map((id) => (
            <HomeCarouselSection key={id} id={id} data={data} heroVisible={heroVisible} />
          ))
        )}
      </main>
    </div>
  );
}

function HomeCarouselSection({
  id,
  data,
  heroVisible,
}: {
  id: HomeCarouselId;
  data: HomepageData;
  heroVisible: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const visible = useSectionVisible(ref);
  const bootstrapEnabled = id === 'filmes' || id === 'jogos' ? heroVisible || visible : visible;

  let carousel;
  if (id === 'animes') {
    carousel = <AnimeCarousel initialData={data.animes} bootstrapEnabled={bootstrapEnabled} />;
  } else {
    const items = id === 'filmes' ? data.filmes : id === 'series' ? data.series : data.jogos;
    carousel = (
      <MediaCarousel
        mediaType={id}
        initialData={items}
        startIndex={resolveCarouselOpenIndex(filterMidiaForCarouselTimeline(items))}
        bootstrapEnabled={bootstrapEnabled}
      />
    );
  }

  return (
    <section ref={ref} id={id} className="overflow-hidden">
      <SectionHeading title={HOME_CAROUSEL_LABELS[id]} href={HOME_CAROUSEL_HREFS[id]} />
      {carousel}
    </section>
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
