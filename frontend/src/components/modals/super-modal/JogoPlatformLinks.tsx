'use client';

import PlatformIcon from '@/components/ui/PlatformIcons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getGamePlatformDisplayItems } from '@/lib/media-helpers';
import type { Jogo } from '@/types';

interface JogoPlatformLinksProps {
  jogo: Jogo;
  title?: string;
}

const ICON_SIZE = 60;

const JogoPlatformLinks: React.FC<JogoPlatformLinksProps> = ({
  jogo,
  title = 'Onde jogar',
}) => {
  const platformItems = getGamePlatformDisplayItems(jogo);

  if (platformItems.length === 0) return null;

  const bubbleClass =
    'flex items-center justify-center rounded-full border border-border bg-white p-3 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white/90 hover:border-primary/40 dark:bg-white dark:ring-white/20';

  return (
    <TooltipProvider delayDuration={200}>
      <section>
        <h2 className="text-xl font-bold mb-3 text-yellow-500 dark:text-blue-400">{title}</h2>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          {platformItems.map((item) => {
            const content = (
              <PlatformIcon platform={item.icon} size={ICON_SIZE} variant="circle" title={item.name} />
            );

            const bubble = item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={bubbleClass}
                aria-label={`Abrir ${item.name}`}
              >
                {content}
              </a>
            ) : (
              <span className={`${bubbleClass} cursor-default opacity-90`} aria-label={item.name}>
                {content}
              </span>
            );

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center gap-1.5 w-20">
                    {bubble}
                    <span className="text-xs text-center text-muted-foreground leading-tight">{item.name}</span>
                  </div>
                </TooltipTrigger>
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
