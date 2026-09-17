'use client';

import { useEffect, useRef, useState } from 'react';

interface TrailerEmbedProps {
  trailerKey: string;
  title?: string;
  className?: string;
}

/**
 * Iframe do YouTube com carregamento tardio e cleanup ao desmontar.
 * Evita erros do observer interno do YouTube (startTime) quando o modal
 * fecha ou a rota muda enquanto o player ainda está ativo.
 */
export default function TrailerEmbed({
  trailerKey,
  title = 'YouTube video player',
  className = 'absolute top-0 left-0 w-full h-full',
}: TrailerEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShouldLoad(true));
    return () => {
      cancelAnimationFrame(frame);
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.src = 'about:blank';
      }
      setShouldLoad(false);
    };
  }, [trailerKey]);

  return (
    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
      {shouldLoad ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={className}
          loading="lazy"
        />
      ) : null}
    </div>
  );
}
