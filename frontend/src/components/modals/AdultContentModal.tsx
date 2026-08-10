'use client';

import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AdultConsent } from '@/lib/adultConsent';

interface AdultContentModalProps {
  onConfirm: (consent: AdultConsent) => void;
}

export default function AdultContentModal({ onConfirm }: AdultContentModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="adult-content-title"
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/15 text-destructive">
            <ShieldAlert className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <h2 id="adult-content-title" className="font-display text-xl orbe-text-primary">
              Conteúdo +18
            </h2>
            <p className="text-sm text-muted-foreground">Verificação de idade</p>
          </div>
        </div>

        <p className="mb-2 text-sm leading-relaxed orbe-text-primary">
          Esta página pode conter conteúdo sensível com nudez e temas adultos, proibido para menores de 18 anos.
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          Você tem 18 anos ou mais?
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="sm:min-w-[120px]"
            onClick={() => onConfirm('declined')}
          >
            Não
          </Button>
          <Button
            type="button"
            className="sm:min-w-[120px]"
            onClick={() => onConfirm('accepted')}
          >
            Sim, tenho 18+
          </Button>
        </div>
      </div>
    </div>
  );
}
