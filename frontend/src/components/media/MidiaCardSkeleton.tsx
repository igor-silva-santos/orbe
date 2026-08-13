import React from 'react';

/** Espelha a altura do MidiaCard real para evitar layout shift no carregamento. */
const MidiaCardSkeleton = () => {
  return (
    <div className="w-full max-w-[210px] mx-auto bg-card rounded-[20px] overflow-hidden flex flex-col">
      <div className="w-full aspect-[206/290] bg-skeleton orbe-shimmer shrink-0" />
      <div className="p-3 flex flex-col shrink-0">
        <div className="flex justify-between items-start mb-1 min-h-[40px] max-h-[40px] gap-2">
          <div className="h-4 bg-skeleton rounded orbe-shimmer flex-1" />
          <div className="h-4 w-10 bg-skeleton rounded orbe-shimmer shrink-0" />
        </div>
        <div className="h-[22px] mb-1.5 bg-skeleton rounded orbe-shimmer w-3/4" />
        <div className="h-[22px] mb-1 flex gap-1">
          <div className="h-[18px] w-14 bg-skeleton rounded-full orbe-shimmer" />
          <div className="h-[18px] w-12 bg-skeleton rounded-full orbe-shimmer" />
        </div>
        <div className="h-[20px] mb-1" />
        <div className="h-6 flex gap-1.5">
          <div className="h-6 w-6 bg-skeleton rounded-full orbe-shimmer" />
          <div className="h-6 w-6 bg-skeleton rounded-full orbe-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default MidiaCardSkeleton;
