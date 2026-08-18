import React, { forwardRef, useCallback, useRef } from "react";
import MidiaCard from "./MidiaCard";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHorizontalDragScroll } from '@/hooks/useHorizontalDragScroll';

import { Filme, Serie, Anime, Jogo, TipoMidia, UserAction, UserInteraction } from "@/types";

interface CarouselProps {
  items: (Filme | Serie | Anime | Jogo)[];
  className?: string;
  type: TipoMidia;
  title: string;
  showNavigation?: boolean;
  onTitleClick?: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  userInteractions?: UserInteraction[];
  onInteraction?: (action: UserAction, midia: Filme | Serie | Anime | Jogo) => void;
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(({ 
  items,
  className = "",
  type,
  title,
  showNavigation = false,
  onTitleClick,
  onNavigate,
  userInteractions,
  onInteraction,
}, ref) => {

  const { scrollRef: attachScrollRef, dragging, handlers } = useHorizontalDragScroll();
  const localNodeRef = useRef<HTMLDivElement | null>(null);

  const setRefs = useCallback((node: HTMLDivElement | null) => {
    localNodeRef.current = node;
    attachScrollRef(node);
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  }, [attachScrollRef, ref]);

  const handleArrowScroll = (direction: 'left' | 'right') => {
    const el = localNodeRef.current;
    if (el) {
      const scrollAmount = el.offsetWidth * 0.8;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
    onNavigate?.(direction === 'left' ? 'prev' : 'next');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onTitleClick?.()}
          className="text-2xl font-bold hover:text-primary transition-colors cursor-pointer"
        >
          {title}
        </button>

        {showNavigation && (
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => handleArrowScroll('left')}
              className="p-2 rounded-full border border-border hover:bg-muted text-foreground transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleArrowScroll('right')}
              className="p-2 rounded-full border border-border hover:bg-muted text-foreground transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={setRefs}
        className={`carousel-horizontal-row flex overflow-x-auto overflow-y-hidden scrollbar-hide gap-4 px-4 py-2 select-none ${
          dragging ? 'carousel-dragging cursor-grabbing' : 'cursor-grab'
        } ${className}`}
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y pinch-zoom' }}
        {...handlers}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 snap-center flex justify-center items-center"
            style={{ willChange: "transform", minWidth: 200 }}
          >
            <MidiaCard midia={item} type={type} userInteractions={userInteractions} onInteraction={onInteraction} />
          </div>
        ))}
      </div>
    </div>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
