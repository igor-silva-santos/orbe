'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layers, Monitor, Users } from 'lucide-react';
import realApi from '@/data/realApi';
import MidiaCard from '@/components/media/MidiaCard';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import type { Anime, Filme, Jogo, Serie, TipoMidia, UserAction, UserInteraction } from '@/types';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';

export interface GameSection {
  id?: string;
  nome: string;
  jogos: Jogo[];
  total: number;
}

export interface JogosEmAltaData {
  semana: string;
  metrica?: string;
  destaques: Jogo[];
  steam_mais_jogados?: Jogo[];
  steam_promocoes?: Jogo[];
  categorias: GameSection[];
  modos: GameSection[];
  plataformas: GameSection[];
}

type InteractionProps = {
  userInteractions: UserInteraction[];
  onInteraction: (action: UserAction, midia: Filme | Serie | Anime | Jogo, type: TipoMidia) => void;
};

const HorizontalRow = ({ section, userInteractions, onInteraction }: { section: GameSection } & InteractionProps) => (
  <section className="bg-card rounded-lg border border-border p-4 md:p-5 space-y-4">
    <div className="flex items-center justify-between gap-3">
      <h3 className="font-display text-base md:text-lg orbe-text-primary flex items-center gap-2">
        <span className="w-2 h-5 bg-[var(--orbe-accent-2)] rounded-full shrink-0" />
        {section.nome}
      </h3>
      <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
        {section.total} {section.total === 1 ? 'jogo' : 'jogos'}
      </span>
    </div>
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
      {section.jogos.map((jogo) => (
        <div key={`${section.nome}-${jogo.id}`} className="flex-shrink-0 w-[170px] sm:w-[190px]">
          <MidiaCard midia={jogo} type="jogo" userInteractions={userInteractions} onInteraction={onInteraction} />
        </div>
      ))}
    </div>
  </section>
);

const BlockSection = ({
  id,
  title,
  icon,
  sections,
  emptyMessage,
  userInteractions,
  onInteraction,
}: {
  id: string;
  title: string;
  icon: typeof Monitor;
  sections: GameSection[];
  emptyMessage: string;
} & InteractionProps) => {
  if (sections.length === 0) {
    return (
      <CollapsibleSection id={id} title={title} icon={icon}>
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <p className="text-muted-foreground text-sm">{emptyMessage}</p>
        </div>
      </CollapsibleSection>
    );
  }

  return (
    <CollapsibleSection id={id} title={title} icon={icon}>
      <div className="space-y-5">
        {sections.map((section) => (
          <HorizontalRow key={section.id ?? section.nome} section={section} userInteractions={userInteractions} onInteraction={onInteraction} />
        ))}
      </div>
    </CollapsibleSection>
  );
};

type JogosEmAltaContentProps = {
  showPromocoesBanner?: boolean;
  compact?: boolean;
};

export default function JogosEmAltaContent({ showPromocoesBanner = true, compact = false }: JogosEmAltaContentProps) {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const [data, setData] = useState<JogosEmAltaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    realApi
      .getJogosEmAlta()
      .then((result) => setData(result as JogosEmAltaData))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
        {Array.from({ length: compact ? 6 : 8 }).map((_, i) => (
          <MidiaCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-card rounded-lg border border-border p-10 text-center">
        <p className="text-muted-foreground font-medium">Não foi possível carregar os jogos em alta.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {!compact && (
        <div className="space-y-2">
          <p className="text-sm text-[var(--orbe-accent-2)] font-medium uppercase tracking-wide">
            {data.semana}
          </p>
          {data.metrica && (
            <p className="text-xs text-muted-foreground max-w-2xl border-l-2 border-[var(--orbe-accent-2)] pl-3">
              {data.metrica}
            </p>
          )}
        </div>
      )}

      {showPromocoesBanner && (
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm font-medium orbe-text-primary">Ofertas ao vivo de várias lojas</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Promoções grátis e com desconto — atualizadas a cada 10 minutos.
            </p>
          </div>
          <Link
            href="/promocoes?tab=promocoes"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-xs font-medium hover:bg-primary/90 transition-colors shrink-0"
          >
            Ver promoções ao vivo
          </Link>
        </div>
      )}

      <CollapsibleSection id="jogos-em-alta-top-semana" title="Top da Semana" defaultOpen>
        {data.destaques.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
            {data.destaques.map((jogo, index) => (
              <div key={jogo.id} className="relative w-full max-w-[210px]">
                {index < 3 && (
                  <span className="absolute -top-2 -left-1 z-10 bg-[var(--orbe-hero-yellow)] orbe-text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                    #{index + 1}
                  </span>
                )}
                <MidiaCard midia={jogo} type="jogo" userInteractions={userInteractions} onInteraction={handleInteraction} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border p-10 text-center">
            <p className="text-muted-foreground">Nenhum destaque disponível esta semana.</p>
          </div>
        )}
      </CollapsibleSection>

      {data.steam_mais_jogados && data.steam_mais_jogados.length > 0 && (
        <CollapsibleSection id="jogos-em-alta-steam-trending" title="Mais jogados na Steam" icon={Monitor}>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {data.steam_mais_jogados.map((jogo) => (
              <div key={`steam-trend-${jogo.id}`} className="flex-shrink-0 w-[170px] sm:w-[190px]">
                <MidiaCard midia={jogo} type="jogo" userInteractions={userInteractions} onInteraction={handleInteraction} />
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      <BlockSection
        id="jogos-em-alta-por-plataforma"
        title="Mais jogados por plataforma"
        icon={Monitor}
        sections={data.plataformas}
        emptyMessage="Nenhum jogo em destaque por plataforma esta semana."
        userInteractions={userInteractions}
        onInteraction={handleInteraction}
      />

      <BlockSection
        id="jogos-em-alta-por-modo"
        title="Por modo de jogo"
        icon={Users}
        sections={data.modos}
        emptyMessage="Nenhum modo de jogo com destaques esta semana."
        userInteractions={userInteractions}
        onInteraction={handleInteraction}
      />

      {data.categorias.length > 0 && (
        <BlockSection
          id="jogos-em-alta-por-categoria"
          title="Por categoria"
          icon={Layers}
          sections={data.categorias}
          emptyMessage=""
          userInteractions={userInteractions}
          onInteraction={handleInteraction}
        />
      )}
    </div>
  );
}
