import React from 'react';

const MidiaCardSkeleton = () => {
  return (
    <div className="w-full max-w-[210px] mx-auto bg-card rounded-lg overflow-hidden">
      <div className="w-full aspect-[206/290] bg-skeleton orbe-shimmer" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-skeleton rounded w-3/4 orbe-shimmer" />
        <div className="h-3 bg-skeleton rounded w-1/2 orbe-shimmer" />
        <div className="h-3 bg-skeleton rounded w-2/3 orbe-shimmer" />
      </div>
    </div>
  );
};

export default MidiaCardSkeleton;
