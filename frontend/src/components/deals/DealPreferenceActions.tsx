'use client';

import { Check, Ban, Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDealPreference } from '@/lib/hooks/useDealPreference';
import { DEAL_PREFERENCE_LABELS } from '@/lib/dealPreferences';
import type { UnifiedDeal } from '@/types/deals';
import type { DealPreferenceStatus } from '@/types/deals';

type DealPreferenceActionsProps = {
  deal: UnifiedDeal;
  compact?: boolean;
};

const ACTIONS: {
  status: DealPreferenceStatus;
  icon: typeof Check;
  variant?: 'default' | 'outline' | 'ghost';
}[] = [
  { status: 'ja_tenho', icon: Check, variant: 'outline' },
  { status: 'sem_interesse', icon: Ban, variant: 'outline' },
  { status: 'quero', icon: Bell, variant: 'outline' },
];

export default function DealPreferenceActions({ deal, compact = false }: DealPreferenceActionsProps) {
  const { getPreference, setPreference, isAuthenticated } = useDealPreference();
  const current = getPreference(deal.id);

  if (!isAuthenticated) {
    return (
      <p className="text-xs text-muted-foreground">
        Faça login para marcar se já tem o jogo, se não tem interesse ou se quer ser avisado no futuro.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Sua relação com este jogo</p>
      <div className={`flex flex-wrap gap-2 ${compact ? '' : ''}`}>
        {ACTIONS.map(({ status, icon: Icon, variant }) => {
          const isActive = current?.status === status;
          return (
            <Button
              key={status}
              type="button"
              size="sm"
              variant={isActive ? 'default' : variant ?? 'outline'}
              className="gap-1.5 text-xs"
              onClick={() => void setPreference(deal, status)}
            >
              <Icon className="h-3.5 w-3.5" />
              {DEAL_PREFERENCE_LABELS[status]}
            </Button>
          );
        })}
        {current && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="gap-1 text-xs text-muted-foreground"
            onClick={() => void setPreference(deal, current.status)}
          >
            <X className="h-3.5 w-3.5" />
            Limpar
          </Button>
        )}
      </div>
      {current?.status === 'quero' && (
        <p className="text-[11px] text-muted-foreground">
          Alertas automáticos quando este jogo entrar em promoção ou ficar grátis estão planejados para uma atualização futura.
        </p>
      )}
    </div>
  );
}
