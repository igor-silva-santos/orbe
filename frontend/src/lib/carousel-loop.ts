/** Bounds for infinite wrap-around scrolling in launch carousels. */
export interface CarouselLoopBounds {
  start: number;
  end: number;
}

/**
 * Wraps a target snap index within loop bounds (inclusive).
 * Used by fast wheel scrolling to jump across the timeline edge.
 */
export function wrapCarouselIndex(
  targetIndex: number,
  bounds: CarouselLoopBounds,
): number {
  const { start, end } = bounds;
  if (end <= start) return start;

  const span = end - start + 1;
  if (targetIndex > end) {
    const overflow = targetIndex - end;
    return start + ((overflow - 1) % span);
  }
  if (targetIndex < start) {
    const underflow = start - targetIndex;
    return end - ((underflow - 1) % span);
  }
  return targetIndex;
}

/**
 * MediaCarousel loop rules:
 * - Dated timeline loops first ↔ last dated item.
 * - Year-tbd append zone: forward past the last slide wraps to the first dated item.
 */
export function getMediaCarouselLoopBounds(
  selectedIndex: number,
  datedSlideCount: number,
  totalSlideCount: number,
): CarouselLoopBounds {
  if (totalSlideCount <= 0) return { start: 0, end: 0 };
  if (datedSlideCount <= 0) {
    return { start: 0, end: totalSlideCount - 1 };
  }

  const lastDated = datedSlideCount - 1;
  if (selectedIndex >= datedSlideCount) {
    return { start: 0, end: totalSlideCount - 1 };
  }
  return { start: 0, end: lastDated };
}

/** Índice para wrap de navegação por setas quando não há mês na direção pedida. */
export function getCarouselNavWrapIndex(
  direction: 'next' | 'prev',
  itemsLength: number,
): number {
  if (itemsLength <= 0) return 0;
  return direction === 'next' ? 0 : itemsLength - 1;
}
