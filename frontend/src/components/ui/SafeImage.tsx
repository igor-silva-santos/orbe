'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import {
  getImageSrc,
  getPosterBlurDataUrl,
  PLACEHOLDER_POSTER,
  TmdbImageSize,
  TMDB_CARD_SIZE,
  isIgdbOrProxyImageUrl,
} from '@/lib/image-utils';

interface SafeImageProps extends Omit<ImageProps, 'src' | 'onError' | 'onLoad'> {
  src: string | null | undefined;
  fallbackLabel?: string;
  imageSize?: TmdbImageSize;
  onLoad?: () => void;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackLabel = 'Sem imagem',
  className = '',
  imageSize = TMDB_CARD_SIZE,
  loading = 'lazy',
  decoding = 'async',
  priority = false,
  onLoad,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const resolvedSrc = getImageSrc(src, imageSize);
  const isPlaceholder = resolvedSrc === PLACEHOLDER_POSTER;
  const isTmdbImage = resolvedSrc.includes('image.tmdb.org');
  const isIgdbOrProxyImage =
    isIgdbOrProxyImageUrl(resolvedSrc) ||
    isIgdbOrProxyImageUrl(src) ||
    resolvedSrc.startsWith('/api/images/igdb');

  useEffect(() => {
    if (hasError || !src) {
      onLoad?.();
      return;
    }

    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      onLoad?.();
    }
  }, [hasError, onLoad, resolvedSrc, src]);

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-muted text-muted-foreground text-center ${className}`}
        style={{ width: props.width, height: props.height }}
        aria-label={alt}
      >
        <span className="text-xs font-medium px-2">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      ref={imageRef}
      src={resolvedSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={priority ? 'high' : undefined}
      placeholder={isPlaceholder ? undefined : 'blur'}
      blurDataURL={isPlaceholder ? undefined : getPosterBlurDataUrl(src)}
      onLoad={() => onLoad?.()}
      onError={() => setHasError(true)}
      unoptimized={isPlaceholder || isTmdbImage || isIgdbOrProxyImage}
    />
  );
};

export default SafeImage;
