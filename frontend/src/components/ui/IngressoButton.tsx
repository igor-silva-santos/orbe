'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface IngressoButtonProps {
  url: string;
  canBuy?: boolean;
}

const IngressoButton: React.FC<IngressoButtonProps> = ({ url, canBuy = false }) => (
  <Button asChild className="bg-[#E50914] hover:bg-[#c40812] text-white">
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
      <Image src="/icons/ingresso.svg" alt="" width={88} height={24} className="h-5 w-auto" aria-hidden />
      <span>{canBuy ? 'Comprar ingresso' : 'Visitar ingresso.com'}</span>
    </a>
  </Button>
);

export default IngressoButton;
