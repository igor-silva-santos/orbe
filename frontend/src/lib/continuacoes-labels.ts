import type { ContinuacaoRelacao } from '@/types/continuacoes';

const LABELS: Record<ContinuacaoRelacao, string> = {
  precuela: 'Prequela',
  sequencia: 'Sequência',
  mesma_saga: 'Mesma saga',
  spin_off: 'Spin-off',
  recomendado: 'Relacionado',
};

export function labelContinuacaoRelacao(relacao: ContinuacaoRelacao): string {
  return LABELS[relacao] ?? 'Relacionado';
}
