'use client';

import PlatformIcon from '@/components/ui/PlatformIcons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getGamePlatformLinks } from '@/lib/media-helpers';
import type { Jogo } from '@/types';

interface JogoPlatformLinksProps {
  jogo: Jogo;
  title?: string;
}

const JogoPlatformLinks: React.FC<JogoPlatformLinksProps> = ({
  jogo,
  title = 'Onde jogar',
}) => {
  const platformLinks = getGamePlatformLinks(jogo);

  if (platformLinks.length === 0) return null;

  return (
    <TooltipProvider delayDuration={200}>
      <section>
        <h2 className="text-xl font-bold mb-3 text-yellow-500 dark:text-blue-400">{title}</h2>
        <div className="flex flex-wrap gap-3">
          {platformLinks.map((store) => (
            <Tooltip key={store.name}>
              <TooltipTrigger asChild>
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-xl border border-border bg-muted p-3 transition-colors hover:bg-muted/70 hover:border-primary/40"
                  aria-label={`Abrir ${store.name}`}
                >
                  <PlatformIcon platform={store.icon} size={32} title={store.name} />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{store.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Ícones abrem a página do jogo na loja ou plataforma correspondente.
        </p>
      </section>
    </TooltipProvider>
  );
};

export default JogoPlatformLinks;
