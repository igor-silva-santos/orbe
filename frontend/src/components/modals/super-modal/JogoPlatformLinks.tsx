'use client';

import PlatformIcon from '@/components/ui/PlatformIcons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getGamePlatformDisplayItems } from '@/lib/media-helpers';
import { PLATFORM_ICON_SIZE_MODAL } from '@/lib/platform-icon-sizes';
import type { Jogo } from '@/types';

interface JogoPlatformLinksProps {
  jogo: Jogo;
  title?: string;
}

const ICON_SIZE = PLATFORM_ICON_SIZE_MODAL;

const JogoPlatformLinks: React.FC<JogoPlatformLinksProps> = ({
  jogo,
  title = 'Onde jogar',
}) => {
  const platformItems = getGamePlatformDisplayItems(jogo);

  if (platformItems.length === 0) return null;

  return (
    <TooltipProvider delayDuration={200}>
      <section>
        <h2 className="text-xl font-bold mb-3 text-yellow-500 dark:text-blue-400">{title}</h2>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          {platformItems.map((item) => {
            const icon = (
              <PlatformIcon platform={item.icon} size={ICON_SIZE} variant="circle" title={item.name} />
            );

            const trigger = item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 w-20 transition-opacity hover:opacity-90"
                aria-label={`Abrir ${item.name}`}
              >
                {icon}
                <span className="text-xs text-center text-muted-foreground leading-tight">{item.name}</span>
              </a>
            ) : (
              <div className="flex flex-col items-center gap-1.5 w-20" aria-label={item.name}>
                {icon}
                <span className="text-xs text-center text-muted-foreground leading-tight">{item.name}</span>
              </div>
            );

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>{trigger}</TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Ícones com link abrem a página do jogo na loja. Outros indicam plataformas do título.
        </p>
      </section>
    </TooltipProvider>
  );
};

export default JogoPlatformLinks;
