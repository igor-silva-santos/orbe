'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface IngressoButtonProps {
  url: string;
  canBuy?: boolean;
}

const IngressoButton: React.FC<IngressoButtonProps> = ({ url, canBuy = false }) => (
  <Button asChild className="bg-[#FF6600] hover:bg-[#E55A00] text-white border-0">
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5">
      <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1">
        <Image src="/icons/ingresso.svg" alt="" width={88} height={20} className="h-4 w-auto" aria-hidden />
      </span>
      <span>{canBuy ? 'Comprar ingresso' : 'Visitar ingresso.com'}</span>
    </a>
  </Button>
);

export default IngressoButton;
