'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { getImageSrc, PLACEHOLDER_POSTER } from '@/lib/image-utils';

interface SafeImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string | null | undefined;
  fallbackLabel?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackLabel = 'Sem imagem',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = getImageSrc(src);

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
      src={resolvedSrc}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      unoptimized={resolvedSrc === PLACEHOLDER_POSTER}
    />
  );
};

export default SafeImage;
