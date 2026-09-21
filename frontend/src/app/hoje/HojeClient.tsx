'use client';

import { useEffect, useMemo, useState } from 'react';
import { Calendar, Clapperboard, Film, Gamepad2, Sparkles, Tv } from 'lucide-react';
import realApi from '@/data/realApi';
import MidiaCard from '@/components/media/MidiaCard';
import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';
import PageHeader from '@/components/layout/PageHeader';
import type { Anime, Filme, Serie, Jogo, UserAction, UserInteraction, TipoMidia } from '@/types';
import { useMidiaInteraction } from '@/lib/hooks/useMidiaInteraction';
import { useAppStore } from '@/stores/appStore';
import {
  HOJE_SECTION_OPTIONS,
  HojeSectionKey,
  loadHojeSections,
  saveHojeSections,
} from '@/lib/hoje-preferences';

interface HojeData {
  data: string;
  estreiasSemana?: Filme[];
  cinema: Filme[];
  streamingFilmes: Filme[];
  streamingSeries: Serie[];
  streamingAnimes: Anime[];
  destaquesJogos: Jogo[];
}

const MediaRow = ({
  title,
  icon: Icon,
  items,
  type,
  userInteractions,
  onInteraction,
}: {
  title: string;
  icon: typeof Film;
  items: Array<Filme | Serie | Jogo | Anime>;
  type: TipoMidia;
  userInteractions: UserInteraction[];
  onInteraction: (action: UserAction, midia: Filme | Serie | Jogo | Anime, type: TipoMidia) => void;
}) => {
  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl orbe-text-primary flex items-center gap-2 border-b border-border pb-2">
        <Icon className="h-5 w-5 text-primary shrink-0" />
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
        {items.map((item) => (
          <MidiaCard
            key={`${type}-${item.id}`}
            midia={item}
            type={type}
            userInteractions={userInteractions}
            onInteraction={onInteraction}
          />
        ))}
      </div>
    </section>
  );
};

export default function HojeClient() {
  const handleInteraction = useMidiaInteraction();
  const userInteractions = useAppStore((s) => s.userInteractions);
  const [data, setData] = useState<HojeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enabledSections, setEnabledSections] = useState<Set<HojeSectionKey>>(
    () => loadHojeSections(),
  );

  useEffect(() => {
    realApi.getHoje()
      .then((result) => setData(result as HojeData))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const toggleSection = (key: HojeSectionKey) => {
    setEnabledSections((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        if (next.size === 1) return current;
        next.delete(key);
      } else {
        next.add(key);
      }
      saveHojeSections(next);
      return next;
    });
  };

  const sections = useMemo(
    () =>
      [
        {
          key: 'cinema' as const,
          title: 'Em cartaz nos cinemas',
          icon: Clapperboard,
          items: data?.cinema ?? [],
          type: 'filme' as const,
        },
        {
          key: 'estreiasSemana' as const,
          title: 'Estreias da semana',
          icon: Calendar,
          items: data?.estreiasSemana ?? [],
          type: 'filme' as const,
        },
        {
          key: 'streamingFilmes' as const,
          title: 'Filmes populares no streaming esta semana',
          icon: Film,
          items: data?.streamingFilmes ?? [],
          type: 'filme' as const,
        },
        {
          key: 'streamingSeries' as const,
          title: 'Séries populares no streaming esta semana',
          icon: Tv,
          items: data?.streamingSeries ?? [],
          type: 'serie' as const,
        },
        {
          key: 'streamingAnimes' as const,
          title: 'Animes em exibição esta semana',
          icon: Sparkles,
          items: data?.streamingAnimes ?? [],
          type: 'anime' as const,
        },
        {
          key: 'destaquesJogos' as const,
          title: 'Jogos em destaque',
          icon: Gamepad2,
          items: data?.destaquesJogos ?? [],
          type: 'jogo' as const,
        },
      ].filter((section) => enabledSections.has(section.key)),
    [data, enabledSections],
  );

  const hasVisibleContent = sections.some((section) => section.items.length > 0);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8 space-y-10">
      <PageHeader
        title="Hoje"
        description="O que está nos cinemas, no streaming e em destaque nesta semana"
      />

      {data?.data && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground capitalize -mt-4">
          <Calendar className="h-4 w-4" />
          {data.data}
        </p>
      )}

      <div className="rounded-xl border border-border bg-card p-4 space-y-3">
        <p className="text-sm font-semibold orbe-text-primary">O que mostrar por padrão</p>
        <p className="text-xs text-muted-foreground">
          Escolha as seções que você quer ver. Sua preferência é salva neste navegador.
        </p>
        <div className="flex flex-wrap gap-2">
          {HOJE_SECTION_OPTIONS.map((option) => {
            const active = enabledSections.has(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleSection(option.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border orbe-text-primary hover:bg-muted'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <MidiaCardSkeleton key={index} />
          ))}
        </div>
      ) : data ? (
        <div className="space-y-10">
          {sections.map((section) => (
            <MediaRow
              key={section.key}
              title={section.title}
              icon={section.icon}
              items={section.items}
              type={section.type}
              userInteractions={userInteractions}
              onInteraction={handleInteraction}
            />
          ))}

          {!hasVisibleContent && (
            <div className="text-center py-16 bg-muted rounded-lg border border-border">
              <p className="text-muted-foreground font-medium">
                Nenhum destaque disponível para os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted rounded-lg border border-border">
          <p className="text-muted-foreground font-medium">Não foi possível carregar o conteúdo de hoje.</p>
        </div>
      )}
    </div>
  );
}
