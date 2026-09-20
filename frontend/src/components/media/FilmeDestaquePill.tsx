import type { FilmeDestaquePill as PillKind } from '@/lib/filme-destaque';

const STYLES: Record<PillKind, string> = {
  estreia_semana: 'bg-fuchsia-600/95 text-white border-fuchsia-300/40',
  mais_esperado: 'bg-indigo-600/95 text-white border-indigo-300/40',
};

const LABELS: Record<PillKind, string> = {
  estreia_semana: 'Estreia na semana',
  mais_esperado: 'Mais esperado',
};

type Props = {
  pill: PillKind;
  className?: string;
};

export default function FilmeDestaquePill({ pill, className = '' }: Props) {
  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide shadow-sm sm:text-[10px] ${STYLES[pill]} ${className}`}
    >
      {LABELS[pill]}
    </span>
  );
}
