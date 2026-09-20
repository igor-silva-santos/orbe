'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import {
  getImageSrc,
  PLACEHOLDER_POSTER,
  BLUR_DATA_URL,
  TmdbImageSize,
  TMDB_CARD_SIZE,
  isIgdbOrProxyImageUrl,
} from '@/lib/image-utils';

interface SafeImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string | null | undefined;
  fallbackLabel?: string;
  imageSize?: TmdbImageSize;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackLabel = 'Sem imagem',
  className = '',
  imageSize = TMDB_CARD_SIZE,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = getImageSrc(src, imageSize);
  const isPlaceholder = resolvedSrc === PLACEHOLDER_POSTER;
  const isTmdbImage = resolvedSrc.includes('image.tmdb.org');
  const isIgdbOrProxyImage =
    isIgdbOrProxyImageUrl(resolvedSrc) ||
    isIgdbOrProxyImageUrl(src) ||
    resolvedSrc.startsWith('/api/images/igdb');

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
      draggable={false}
      src={resolvedSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      placeholder={isPlaceholder ? undefined : 'blur'}
      blurDataURL={isPlaceholder ? undefined : BLUR_DATA_URL}
      onError={() => setHasError(true)}
      unoptimized={isPlaceholder || isTmdbImage || isIgdbOrProxyImage}
    />
  );
};

export default SafeImage;
