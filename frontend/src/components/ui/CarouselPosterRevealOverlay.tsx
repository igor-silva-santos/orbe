'use client';

import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';

interface CarouselPosterRevealOverlayProps {
  visible: boolean;
}

export default function CarouselPosterRevealOverlay({
  visible,
}: CarouselPosterRevealOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background/35" />
      <div className="relative w-[170px] sm:w-[190px] md:w-[210px] px-3 sm:px-4">
        <MidiaCardSkeleton />
      </div>
    </div>
  );
}
