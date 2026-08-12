'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface IngressoButtonProps {
  url: string;
  canBuy?: boolean;
  emPrevenda?: boolean;
}

const resolveLabel = (canBuy: boolean, emPrevenda: boolean): string => {
  if (emPrevenda) return 'Pré-venda em ingresso.com';
  if (canBuy) return 'Compre ingressos em ingresso.com';
  return 'Visite ingresso.com';
};

/** Azul marinho da marca Ingresso.com — o laranja do site deles é só o botão "Entrar". */
const IngressoButton: React.FC<IngressoButtonProps> = ({ url, canBuy = false, emPrevenda = false }) => (
  <Button asChild className="bg-[#1B2D5C] hover:bg-[#243A70] text-white border-0">
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5">
      <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1">
        <Image src="/icons/ingresso.svg" alt="" width={88} height={20} className="h-4 w-auto" aria-hidden />
      </span>
      <span>{resolveLabel(canBuy, emPrevenda)}</span>
    </a>
  </Button>
);

export default IngressoButton;
