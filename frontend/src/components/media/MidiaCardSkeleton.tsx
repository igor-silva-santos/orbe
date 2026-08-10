import React from 'react';

const MidiaCardSkeleton = () => {
  return (
    <div className="w-full max-w-[210px] mx-auto bg-card rounded-[20px] overflow-hidden border-[3px] border-[var(--orbe-block-border)] shadow-[4px_4px_0_var(--orbe-block-border)]">
      <div className="w-full aspect-[206/290] bg-muted animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
        <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
};

export default MidiaCardSkeleton;
