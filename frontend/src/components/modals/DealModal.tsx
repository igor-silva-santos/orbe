'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ExternalLink, Gift, Tag, Clock, Sparkles } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { apiClient } from '@/lib/api';
import SafeImage from '@/components/ui/SafeImage';
import PlatformIcon from '@/components/ui/PlatformIcons';
import { getPlatformLabel } from '@/lib/dealFilters';
import { sanitizeTranslatedText } from '@/lib/media-helpers';
import { PLATFORM_ICON_SIZE_MODAL } from '@/lib/platform-icon-sizes';
import { DealPriceBadge } from '@/components/deals/DealPriceBadge';
import DealPreferenceActions from '@/components/deals/DealPreferenceActions';
import type { Jogo } from '@/types';
import type { UnifiedDeal } from '@/types/deals';

const SOURCE_LABELS: Record<string, string> = {
  epic: 'Epic Games Store',
  gamerpower: 'GamerPower',
  cheapshark: 'CheapShark',
  steam: 'Steam',
  orbe: 'Catálogo Orbe',
  itch: 'itch.io',
  itad: 'IsThereAnyDeal',
};

function steamFallbackImage(appId: number): string {
  return `https://shared.fastly.steamstatic.com/steam/apps/${appId}/capsule_616x353.jpg`;
}

function formatEndsAt(endsAt: string | null | undefined): string | null {
  if (!endsAt) return null;
  const date = new Date(endsAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function DealModal() {
  const { isDealModalOpen, dealModalData, closeDealModal } = useAppStore();
  const deal = dealModalData.deal;
  const [jogoDetails, setJogoDetails] = useState<Jogo | null>(null);
  const [loadingJogo, setLoadingJogo] = useState(false);

  const handleClose = useCallback(() => {
    closeDealModal();
    setJogoDetails(null);
  }, [closeDealModal]);

  useEffect(() => {
    if (!isDealModalOpen || !deal?.orbeGameId) {
      setJogoDetails(null);
      return;
    }

    let cancelled = false;
    setLoadingJogo(true);
    void apiClient
      .get(`/jogos/${deal.orbeGameId}/details`)
      .then((data) => {
        if (!cancelled) setJogoDetails(data as Jogo);
      })
      .catch(() => {
        if (!cancelled) setJogoDetails(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingJogo(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isDealModalOpen, deal?.orbeGameId, deal?.id]);

  const posterUrl = useMemo(() => {
    if (!deal) return null;
    if (deal.imageUrl) return deal.imageUrl;
    if (deal.steamAppId) return steamFallbackImage(deal.steamAppId);
    if (jogoDetails?.poster_url_api || jogoDetails?.poster_curado) {
      return jogoDetails.poster_curado || jogoDetails.poster_url_api;
    }
    return null;
  }, [deal, jogoDetails]);

  if (!isDealModalOpen || !deal) return null;

  const platformLabel = getPlatformLabel(deal.platform) || deal.platforms[0] || 'Loja';
  const sourceLabel = SOURCE_LABELS[deal.source] ?? deal.source;
  const endsLabel = formatEndsAt(deal.endsAt);
  const isFree = deal.kind === 'free';

  const synopsis =
    jogoDetails?.sinopse
      ? sanitizeTranslatedText(jogoDetails.sinopse)
      : deal.description
        ? sanitizeTranslatedText(deal.description)
        : deal.instructions
          ? sanitizeTranslatedText(deal.instructions)
          : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto overflow-x-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="container mx-auto px-4 py-8 max-w-full">
        <div className="bg-background rounded-lg shadow-xl max-w-2xl mx-auto relative overflow-hidden">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-muted transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5 text-primary" />
          </button>

          <div className="p-4 md:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-44 shrink-0 mx-auto sm:mx-0">
                <div className="relative aspect-[206/290] rounded-xl overflow-hidden bg-muted border border-border">
                  {posterUrl ? (
                    <SafeImage
                      src={posterUrl}
                      alt={deal.title}
                      width={400}
                      height={580}
                      className="w-full h-full object-cover"
                      fallbackLabel="Sem capa"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <Gift className="h-12 w-12 opacity-40" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2">
                    <DealPriceBadge deal={deal} />
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-start gap-3 pr-10">
                  <PlatformIcon
                    platform={platformLabel}
                    size={PLATFORM_ICON_SIZE_MODAL}
                    variant="circle"
                    title={platformLabel}
                  />
                  <div className="min-w-0">
                    <h2 className="font-display text-xl md:text-2xl orbe-text-primary leading-tight">
                      {deal.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">{platformLabel}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {isFree ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
                      <Gift className="h-3 w-3" />
                      {deal.freeTier === 'permanent' ? 'Sempre grátis' : 'Grátis agora'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      <Tag className="h-3 w-3" />
                      -{deal.discountPercent ?? '?'}%
                    </span>
                  )}
                  {deal.worth && (
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                      Valor: {deal.worth}
                    </span>
                  )}
                </div>

                {endsLabel && (
                  <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <Clock className="h-4 w-4 shrink-0" />
                    Acaba em {endsLabel}
                  </p>
                )}

                {deal.dealRating != null && deal.dealRating > 0 && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    Destaque da oferta (score {deal.dealRating.toFixed(1)})
                  </p>
                )}

                <p className="text-[11px] text-muted-foreground">Fonte: {sourceLabel}</p>
              </div>
            </div>

            {loadingJogo && !synopsis && (
              <p className="text-sm text-muted-foreground">Carregando detalhes do jogo…</p>
            )}

            {synopsis && (
              <section>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Sobre o jogo</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{synopsis}</p>
              </section>
            )}

            {!synopsis && !loadingJogo && (
              <p className="text-sm text-muted-foreground">
                Abra a loja oficial para ver descrição, requisitos e avaliações antes de resgatar.
              </p>
            )}

            <DealPreferenceActions deal={deal} />

            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-border">
              <a
                href={deal.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm px-5 py-3 hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Abrir na loja oficial
              </a>
              {deal.orbeUrl && (
                <Link
                  href={deal.orbeUrl}
                  onClick={handleClose}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Ver no catálogo Orbe
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
