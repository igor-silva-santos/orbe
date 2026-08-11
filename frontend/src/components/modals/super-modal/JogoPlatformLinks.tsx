'use client';

import PlatformIcon from '@/components/ui/PlatformIcons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getGamePlatformDisplayItems } from '@/lib/media-helpers';
import type { Jogo } from '@/types';

interface JogoPlatformLinksProps {
  jogo: Jogo;
  title?: string;
}

const ICON_SIZE = 44;

const JogoPlatformLinks: React.FC<JogoPlatformLinksProps> = ({
  jogo,
  title = 'Onde jogar',
}) => {
  const platformItems = getGamePlatformDisplayItems(jogo);

  if (platformItems.length === 0) return null;

  const tileClass =
    'flex items-center justify-center rounded-lg border border-border bg-white p-2 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white/90 hover:border-primary/40 dark:bg-white dark:ring-white/20';

  return (
    <TooltipProvider delayDuration={200}>
      <section>
        <h2 className="text-xl font-bold mb-3 text-yellow-500 dark:text-blue-400">{title}</h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {platformItems.map((item) => {
            const content = (
              <PlatformIcon platform={item.icon} size={ICON_SIZE} title={item.name} />
            );

            if (item.url) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={tileClass}
                      aria-label={`Abrir ${item.name}`}
                    >
                      {content}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <span className={`${tileClass} cursor-default opacity-90`} aria-label={item.name}>
                    {content}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Ícones com link abrem a página do jogo na loja. Outros indicam plataformas do título.
        </p>
      </section>
    </TooltipProvider>
  );
};

export default JogoPlatformLinks;
