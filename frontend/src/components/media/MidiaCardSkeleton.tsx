import React from 'react';

/** Espelha a estrutura e dimensões do MidiaCard para evitar layout shift no carregamento. */
const MidiaCardSkeleton = () => {
  return (
    <div className="relative group">
      <div className="relative bg-card rounded-[20px] overflow-hidden w-full max-w-[210px] mx-auto flex flex-col">
        <div className="relative w-full aspect-[206/290] rounded-lg overflow-hidden shrink-0 bg-skeleton orbe-shimmer" />
        <div className="p-3 flex flex-col shrink-0">
          <div className="flex justify-between items-start mb-1 min-h-[40px] max-h-[40px]">
            <div className="h-4 bg-skeleton rounded orbe-shimmer flex-grow pr-2" />
            <div className="h-4 w-10 bg-skeleton rounded orbe-shimmer shrink-0" />
          </div>
          <div className="h-[22px] mb-1.5 flex items-center overflow-hidden">
            <div className="h-3 bg-skeleton rounded orbe-shimmer w-3/4" />
          </div>
          <div className="flex flex-wrap items-center gap-1 mb-1 min-h-[22px] max-h-[22px] overflow-hidden">
            <div className="h-[18px] w-14 bg-skeleton rounded-full orbe-shimmer" />
            <div className="h-[18px] w-12 bg-skeleton rounded-full orbe-shimmer" />
          </div>
          <div className="h-[20px] mb-1 flex items-center" />
          <div className="h-6 flex flex-wrap items-center gap-1.5 shrink-0">
            <div className="h-6 w-6 bg-skeleton rounded-full orbe-shimmer" />
            <div className="h-6 w-6 bg-skeleton rounded-full orbe-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidiaCardSkeleton;
