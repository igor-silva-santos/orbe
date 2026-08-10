'use client';

import AwardIcon from '@/components/ui/AwardIcons';
import type { Award } from '@/types';

interface AwardsBlockProps {
  awards?: Award[];
  className?: string;
  limit?: number;
}

const AwardsBlock: React.FC<AwardsBlockProps> = ({ awards = [], className = '', limit }) => {
  if (!awards.length) return null;

  const visible = limit ? awards.slice(0, limit) : awards;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visible.map((award, index) => (
        <AwardIcon
          key={`${award.nome}-${award.ano}-${award.categoria}-${index}`}
          award={award.nome}
          status={award.status}
          year={award.ano}
        />
      ))}
    </div>
  );
};

export default AwardsBlock;
