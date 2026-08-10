'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Gamepad2, Layers, Monitor, Users } from 'lucide-react';
import realApi from '@/data/realApi';
import MidiaCard from '@/components/media/MidiaCard';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import type { Jogo } from '@/types';

interface GameSection {
  nome: string;
  jogos: Jogo[];
  total: number;
}

interface JogosEmAltaData {
  semana: string;
  destaques: Jogo[];
  categorias: GameSection[];
  modos: GameSection[];
  plataformas: GameSection[];
}

type TabId = 'destaques' | 'categorias' | 'modos' | 'plataformas';

const TABS: { id: TabId; label: string; icon: typeof Gamepad2 }[] = [
  { id: 'destaques', label: 'Destaques', icon: Gamepad2 },
  { id: 'categorias', label: 'Categoria', icon: Layers },
  { id: 'modos', label: 'Modo de Jogo', icon: Users },
  { id: 'plataformas', label: 'Plataforma', icon: Monitor },
];

const tabButtonClass = (isActive: boolean) =>
  `inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
    isActive
      ? 'bg-primary text-primary-foreground border-primary'
      : 'bg-card orbe-text-primary border-border hover:bg-muted'
  }`;

const HorizontalRow = ({ section }: { section: GameSection }) => (
  <section className="bg-card rounded-lg border border-border p-4 md:p-5 space-y-4">
    <div className="flex items-center justify-between gap-3">
      <h3 className="font-display text-base md:text-lg orbe-text-primary flex items-center gap-2">
        <span className="w-2 h-5 bg-[var(--orbe-accent-2)] rounded-full shrink-0" />
        {section.nome}
      </h3>
      <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
        {section.total} jogos
      </span>
    </div>
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
      {section.jogos.map((jogo) => (
        <div key={`${section.nome}-${jogo.id}`} className="flex-shrink-0 w-[170px] sm:w-[190px]">
          <MidiaCard midia={jogo} type="jogo" />
        </div>
      ))}
    </div>
  </section>
);

const GroupedTab = ({ sections, emptyMessage }: { sections: GameSection[]; emptyMessage: string }) => {
  if (sections.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-10 text-center">
        <p className="text-muted-foreground font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {sections.map((section) => (
        <HorizontalRow key={section.nome} section={section} />
      ))}
    </div>
  );
};

export default function JogosEmAltaPage() {
  const [data, setData] = useState<JogosEmAltaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('destaques');

  useEffect(() => {
    realApi.getJogosEmAlta().then((result) => {
      setData(result as JogosEmAltaData);
    }).catch(console.error).finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <section className="relative overflow-hidden border-b border-[var(--orbe-divider)] py-10 md:py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm text-[var(--orbe-accent-2)] font-medium uppercase tracking-wide mb-4">
                {data?.semana || 'Esta semana'}
              </p>
              <h1 className="font-display text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight orbe-text-primary flex items-center gap-3">
                <Gamepad2 className="h-8 w-8 text-[var(--orbe-accent-2)] shrink-0" />
                Jogos em Alta
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl">
                Os mais jogados da semana, organizados por categoria, modo de jogo e plataforma.
              </p>
            </div>

            {!isLoading && data && (
              <div className="flex gap-3">
                <div className="bg-card rounded-lg border border-border px-4 py-3 text-center min-w-[90px]">
                  <p className="font-display text-2xl orbe-text-primary">{data.destaques.length}</p>
                  <p className="text-xs text-muted-foreground font-medium">Destaques</p>
                </div>
                <div className="bg-card rounded-lg border border-border px-4 py-3 text-center min-w-[90px]">
                  <p className="font-display text-2xl orbe-text-primary">{data.categorias.length}</p>
                  <p className="text-xs text-muted-foreground font-medium">Categorias</p>
                </div>
                <div className="bg-card rounded-lg border border-border px-4 py-3 text-center min-w-[90px]">
                  <p className="font-display text-2xl orbe-text-primary">{data.plataformas.length}</p>
                  <p className="text-xs text-muted-foreground font-medium">Plataformas</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 md:py-10 space-y-8">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={tabButtonClass(isActive)}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <MidiaCardSkeleton key={i} />
            ))}
          </div>
        ) : data ? (
          <>
            {activeTab === 'destaques' && (
              <section className="space-y-4">
                <h2 className="font-display text-xl orbe-text-primary border-b border-border pb-2">
                  Top da Semana
                </h2>
                {data.destaques.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
                    {data.destaques.map((jogo, index) => (
                      <div key={jogo.id} className="relative w-full max-w-[210px]">
                        {index < 3 && (
                          <span className="absolute -top-2 -left-1 z-10 bg-[var(--orbe-hero-yellow)] orbe-text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                            #{index + 1}
                          </span>
                        )}
                        <MidiaCard midia={jogo} type="jogo" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-card rounded-lg border border-border p-10 text-center">
                    <p className="text-muted-foreground">Nenhum destaque disponível esta semana.</p>
                  </div>
                )}
              </section>
            )}

            {activeTab === 'categorias' && (
              <GroupedTab sections={data.categorias} emptyMessage="Nenhuma categoria com jogos em alta esta semana." />
            )}

            {activeTab === 'modos' && (
              <GroupedTab sections={data.modos} emptyMessage="Nenhum modo de jogo com destaques esta semana." />
            )}

            {activeTab === 'plataformas' && (
              <GroupedTab sections={data.plataformas} emptyMessage="Nenhuma plataforma com jogos em alta esta semana." />
            )}
          </>
        ) : (
          <div className="bg-card rounded-lg border border-border p-10 text-center">
            <p className="text-muted-foreground font-medium">Não foi possível carregar os jogos em alta.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 bg-primary text-primary-foreground font-medium text-sm px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
