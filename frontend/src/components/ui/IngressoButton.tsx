'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

/** Azul marinho Ingresso.com (header/marca). O laranja é só do botão "Entrar", não da identidade. */
const INGRESSO_NAVY = '#1B2D5C';
const INGRESSO_NAVY_HOVER = '#243A70';

interface IngressoButtonProps {
  url: string;
  canBuy?: boolean;
}

const IngressoButton: React.FC<IngressoButtonProps> = ({ url, canBuy = false }) => (
  <Button
    asChild
    className="text-white border-0 hover:opacity-95"
    style={{ backgroundColor: INGRESSO_NAVY }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = INGRESSO_NAVY_HOVER;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = INGRESSO_NAVY;
    }}
  >
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5">
      <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1">
        <Image src="/icons/ingresso.svg" alt="" width={88} height={20} className="h-4 w-auto" aria-hidden />
      </span>
      <span>{canBuy ? 'Comprar ingresso' : 'Visitar ingresso.com'}</span>
    </a>
  </Button>
);

export default IngressoButton;
