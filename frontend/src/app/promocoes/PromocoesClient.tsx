'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Gift, RefreshCw, Tag, Sparkles, Clock } from 'lucide-react';
import realApi from '@/data/realApi';
import DealCard from '@/components/deals/DealCard';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ALL_PLATFORM_FILTERS,
  FREE_FEATURED_PLATFORMS,
  availablePlatformFilters,
  filterByPlatform,
  getPlatformLabel,
  groupByPlatform,
} from '@/lib/dealFilters';
import type { DealsOverview, DealPlatform, UnifiedDeal } from '@/types/deals';

const REFRESH_INTERVAL_MS = 10 * 60 * 1000;

function formatFetchedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'agora';
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function excludePlatforms(deals: UnifiedDeal[], platforms: DealPlatform[]): UnifiedDeal[] {
  if (platforms.length === 0) return deals;
  return deals.filter((deal) => !platforms.includes(deal.platform));
}

function DealsGrid({ deals, priorityCount = 6 }: { deals: UnifiedDeal[]; priorityCount?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
      {deals.map((deal, index) => (
        <DealCard key={deal.id} deal={deal} priority={index < priorityCount} />
      ))}
    </div>
  );
}

function DealsByPlatform({
  deals,
  platformFilter,
}: {
  deals: UnifiedDeal[];
  platformFilter: DealPlatform | 'all';
}) {
  const filtered = useMemo(
    () => filterByPlatform(deals, platformFilter),
    [deals, platformFilter],
  );
  const byPlatform = useMemo(() => groupByPlatform(filtered), [filtered]);

  if (filtered.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-10 text-center">
        <p className="text-muted-foreground">Nenhum jogo nesta plataforma no momento.</p>
      </div>
    );
  }

  if (platformFilter !== 'all') {
    return <DealsGrid deals={filtered} />;
  }

  return (
    <div className="space-y-8">
      {Object.entries(byPlatform).map(([platform, platformDeals]) => (
        <div key={platform}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {getPlatformLabel(platform)}
          </h3>
          <DealsGrid deals={platformDeals} />
        </div>
      ))}
    </div>
  );
}

function PlatformFilters({
  options,
  platformFilter,
  onChange,
}: {
  options: typeof ALL_PLATFORM_FILTERS;
  platformFilter: DealPlatform | 'all';
  onChange: (value: DealPlatform | 'all') => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onChange(filter.id)}
          className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
            platformFilter === filter.id
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card border-border orbe-text-primary hover:bg-muted'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function FreeQuickFilters({
  deals,
  platformFilter,
  onChange,
}: {
  deals: UnifiedDeal[];
  platformFilter: DealPlatform | 'all';
  onChange: (value: DealPlatform | 'all') => void;
}) {
  const quickOptions = FREE_FEATURED_PLATFORMS.filter((platform) =>
    deals.some((deal) => deal.platform === platform),
  );

  if (quickOptions.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground">Destaques:</span>
      {quickOptions.map((platform) => {
        const isActive = platformFilter === platform;
        return (
          <button
            key={platform}
            type="button"
            onClick={() => onChange(isActive ? 'all' : platform)}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border orbe-text-primary hover:bg-muted'
            }`}
          >
            {getPlatformLabel(platform)}
          </button>
        );
      })}
    </div>
  );
}

function SourceFooter({ data }: { data: DealsOverview }) {
  return (
    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground border-t border-border pt-4">
      <span>Fontes:</span>
      <span className={data.sources.epic.ok ? 'text-emerald-600' : 'text-destructive'}>
        Epic ({data.sources.epic.count})
      </span>
      <span className={data.sources.gamerpower.ok ? 'text-emerald-600' : 'text-destructive'}>
        GamerPower ({data.sources.gamerpower.count})
      </span>
      <span className={data.sources.cheapshark.ok ? 'text-emerald-600' : 'text-destructive'}>
        CheapShark ({data.sources.cheapshark.count})
      </span>
      <span className={data.sources.itch?.ok ? 'text-emerald-600' : 'text-destructive'}>
        itch.io ({data.sources.itch?.count ?? 0})
      </span>
    </div>
  );
}

export default function PromocoesClient({
  initialTab = 'gratis',
}: {
  initialTab?: 'gratis' | 'promocoes' | 'em-alta';
} = {}) {
  const [data, setData] = useState<DealsOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<DealPlatform | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'gratis' | 'promocoes'>(
    initialTab === 'promocoes' ? 'promocoes' : 'gratis',
  );

  const loadDeals = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    setError(null);
    try {
      const overview = await realApi.getDeals();
      setData(overview as DealsOverview);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar promoções e jogos grátis.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadDeals();
  }, [loadDeals]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void loadDeals(true);
    }, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [loadDeals]);

  const gratisTemporarios = useMemo(() => {
    if (!data) return [];
    if (data.gratisTemporarios?.length) return data.gratisTemporarios;
    return data.gratis.filter((d) => d.freeTier !== 'permanent');
  }, [data]);

  const gratisPermanentes = useMemo(() => {
    if (!data) return [];
    if (data.gratisPermanentes?.length) return data.gratisPermanentes;
    return data.gratis.filter((d) => d.freeTier === 'permanent');
  }, [data]);

  const allFreeDeals = useMemo(
    () => [...gratisTemporarios, ...gratisPermanentes],
    [gratisTemporarios, gratisPermanentes],
  );

  const freePlatformOptions = useMemo(
    () => availablePlatformFilters(allFreeDeals),
    [allFreeDeals],
  );

  const showFeaturedSections = platformFilter === 'all';

  const featuredPlatformsWithDeals = useMemo(
    () =>
      showFeaturedSections
        ? FREE_FEATURED_PLATFORMS.filter((platform) =>
            allFreeDeals.some((deal) => deal.platform === platform),
          )
        : [],
    [allFreeDeals, showFeaturedSections],
  );

  const mainTemporarios = useMemo(() => {
    const base = showFeaturedSections
      ? excludePlatforms(gratisTemporarios, featuredPlatformsWithDeals)
      : gratisTemporarios;
    return filterByPlatform(base, platformFilter);
  }, [gratisTemporarios, platformFilter, showFeaturedSections, featuredPlatformsWithDeals]);

  const mainPermanentes = useMemo(() => {
    const base = showFeaturedSections
      ? excludePlatforms(gratisPermanentes, featuredPlatformsWithDeals)
      : gratisPermanentes;
    return filterByPlatform(base, platformFilter);
  }, [gratisPermanentes, platformFilter, showFeaturedSections, featuredPlatformsWithDeals]);

  const featuredDealsByPlatform = useMemo(() => {
    const grouped: Partial<Record<DealPlatform, UnifiedDeal[]>> = {};
    for (const platform of featuredPlatformsWithDeals) {
      grouped[platform] = filterByPlatform(allFreeDeals, platform);
    }
    return grouped;
  }, [allFreeDeals, featuredPlatformsWithDeals]);

  useEffect(() => {
    if (platformFilter === 'all') return;
    const hasFilter = freePlatformOptions.some((option) => option.id === platformFilter);
    if (!hasFilter) setPlatformFilter('all');
  }, [freePlatformOptions, platformFilter]);

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
                Atualização automática a cada 10 min
              </p>
              <h1 className="font-display text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight orbe-text-primary flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-[var(--orbe-accent-2)] shrink-0" />
                Promoções & Jogos Grátis
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-2xl">
                Ofertas gratuitas e promoções reunidas da Epic Games, GamerPower, CheapShark e itch.io
                — incluindo giveaways na EA App. Clique para resgatar na loja.
              </p>
              {data?.fetchedAt && (
                <p className="text-xs text-muted-foreground mt-3">
                  Última atualização: {formatFetchedAt(data.fetchedAt)}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => void loadDeals(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 self-start md:self-auto bg-primary text-primary-foreground font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Atualizar agora
            </button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 md:py-10">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-full max-w-[210px] aspect-[206/290] rounded-[20px] bg-skeleton orbe-shimmer" />
            ))}
          </div>
        ) : error ? (
          <div className="bg-card rounded-lg border border-border p-10 text-center">
            <p className="text-muted-foreground font-medium">{error}</p>
            <button
              type="button"
              onClick={() => void loadDeals()}
              className="mt-4 bg-primary text-primary-foreground font-medium text-sm px-6 py-3 rounded-lg"
            >
              Tentar novamente
            </button>
          </div>
        ) : data ? (
          <Tabs
            value={activeTab}
            onValueChange={(tab) => setActiveTab(tab as 'gratis' | 'promocoes')}
            className="space-y-8"
          >
            <TabsList className="h-auto flex-wrap gap-1 p-1 w-full sm:w-auto">
              <TabsTrigger value="gratis" className="gap-2 px-4 py-2">
                <Gift className="h-4 w-4" />
                Jogos de Graça
                <span className="text-xs opacity-70">({allFreeDeals.length})</span>
              </TabsTrigger>
              <TabsTrigger value="promocoes" className="gap-2 px-4 py-2">
                <Tag className="h-4 w-4" />
                Promoções
                <span className="text-xs opacity-70">({data.promocoes.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gratis" className="space-y-10 mt-0">
              <FreeQuickFilters
                deals={allFreeDeals}
                platformFilter={platformFilter}
                onChange={setPlatformFilter}
              />

              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl orbe-text-primary flex items-center gap-2">
                      <Clock className="h-5 w-5 text-emerald-600" />
                      Estão de graça
                      <span className="text-sm font-normal text-muted-foreground">
                        ({mainTemporarios.length})
                      </span>
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                      Jogos que custavam e estão com 100% de desconto por tempo limitado — vale resgatar agora.
                    </p>
                  </div>
                  <PlatformFilters
                    options={freePlatformOptions}
                    platformFilter={platformFilter}
                    onChange={setPlatformFilter}
                  />
                </div>

                {mainTemporarios.length === 0 ? (
                  <div className="bg-card rounded-lg border border-border p-10 text-center">
                    <p className="text-muted-foreground">
                      Nenhum jogo temporariamente grátis nesta plataforma no momento.
                    </p>
                  </div>
                ) : (
                  <DealsByPlatform
                    deals={
                      showFeaturedSections
                        ? excludePlatforms(gratisTemporarios, featuredPlatformsWithDeals)
                        : gratisTemporarios
                    }
                    platformFilter={platformFilter}
                  />
                )}
              </section>

              {featuredPlatformsWithDeals.map((platform) => {
                const deals = featuredDealsByPlatform[platform] ?? [];
                if (deals.length === 0) return null;

                const sectionTitle =
                  platform === 'origin'
                    ? 'Grátis na EA'
                    : `Grátis na ${getPlatformLabel(platform)}`;

                return (
                  <CollapsibleSection
                    key={platform}
                    id={`promocoes-gratis-${platform}`}
                    title={sectionTitle}
                    icon={Gift}
                    defaultOpen
                  >
                    <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                      Giveaways gratuitos na {getPlatformLabel(platform)} via GamerPower.
                    </p>
                    <DealsGrid deals={deals} />
                  </CollapsibleSection>
                );
              })}

              <CollapsibleSection
                id="promocoes-jogos-sempre-gratis"
                title="São de graça"
                icon={Gift}
                defaultOpen={false}
              >
                <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                  Jogos que nunca custaram — free-to-play ou preço base zero. Ficam aqui embaixo para não competir com as ofertas por tempo limitado.
                </p>
                {mainPermanentes.length > 0 ? (
                  <DealsByPlatform
                    deals={
                      showFeaturedSections
                        ? excludePlatforms(gratisPermanentes, featuredPlatformsWithDeals)
                        : gratisPermanentes
                    }
                    platformFilter={platformFilter}
                  />
                ) : (
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <p className="text-muted-foreground text-sm">Nenhum jogo permanentemente grátis no momento.</p>
                  </div>
                )}
              </CollapsibleSection>

              <SourceFooter data={data} />
            </TabsContent>

            <TabsContent value="promocoes" className="space-y-4 mt-0">
              <div>
                <h2 className="font-display text-xl orbe-text-primary flex items-center gap-2">
                  <Tag className="h-5 w-5 text-[var(--orbe-accent-2)]" />
                  Melhores promoções
                  <span className="text-sm font-normal text-muted-foreground">
                    ({data.promocoes.length})
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                  Descontos ativos em lojas parceiras — ainda há preço, mas bem abaixo do normal.
                </p>
              </div>

              {data.promocoes.length > 0 ? (
                <DealsGrid deals={data.promocoes} priorityCount={0} />
              ) : (
                <div className="bg-card rounded-lg border border-border p-8 text-center">
                  <p className="text-muted-foreground text-sm">Nenhuma promoção destacada no momento.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : null}
      </main>
    </div>
  );
}
