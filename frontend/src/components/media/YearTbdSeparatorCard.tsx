import React from 'react';

interface YearTbdSeparatorCardProps {
  year: number;
}

const YearTbdSeparatorCard: React.FC<YearTbdSeparatorCardProps> = ({ year }) => (
  <div className="w-full max-w-[210px] mx-auto h-full min-h-[290px] flex items-center justify-center px-2">
    <div className="text-center">
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {year}
      </p>
      <p className="text-base font-bold orbe-text-primary mt-1 leading-snug">
        Data a confirmar
      </p>
    </div>
  </div>
);

export default YearTbdSeparatorCard;
