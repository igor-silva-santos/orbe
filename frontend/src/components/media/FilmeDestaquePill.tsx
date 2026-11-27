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
  const label = LABELS[pill];
  return (
    <span
      title={label}
      className={`inline-flex w-max min-w-0 max-w-full shrink-0 items-center overflow-hidden rounded-full border px-1.5 py-px text-[8px] font-semibold leading-none sm:text-[9px] ${STYLES[pill]} ${className}`}
    >
      <span className="min-w-0 truncate">{label}</span>
    </span>
  );
}
