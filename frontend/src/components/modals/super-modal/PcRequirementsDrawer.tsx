'use client';

import { useState } from 'react';
import { ChevronDown, Cpu } from 'lucide-react';
import { stripHtml } from '@/lib/media-helpers';

interface PcRequirements {
  minimum?: string;
  recommended?: string;
}

interface PcRequirementsDrawerProps {
  requirements: PcRequirements;
  labelColor?: string;
}

const PcRequirementsDrawer: React.FC<PcRequirementsDrawerProps> = ({
  requirements,
  labelColor = 'text-yellow-500 dark:text-blue-400',
}) => {
  const [open, setOpen] = useState(false);
  const hasMinimum = Boolean(requirements.minimum?.trim());
  const hasRecommended = Boolean(requirements.recommended?.trim());

  if (!hasMinimum && !hasRecommended) return null;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-muted/40 hover:bg-muted/70 transition-colors text-left"
        aria-expanded={open}
      >
        <span className={`font-semibold flex items-center gap-2 ${labelColor}`}>
          <Cpu className="h-4 w-4 shrink-0" />
          Requisitos de sistema
        </span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-4 py-4 space-y-4 bg-card border-t border-border animate-in fade-in slide-in-from-top-1 duration-200">
          {hasMinimum && (
            <div>
              <h4 className={`text-sm font-semibold mb-2 ${labelColor}`}>Mínimos</h4>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {stripHtml(requirements.minimum!)}
              </p>
            </div>
          )}
          {hasRecommended && (
            <div>
              <h4 className={`text-sm font-semibold mb-2 ${labelColor}`}>Recomendados</h4>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {stripHtml(requirements.recommended!)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PcRequirementsDrawer;
