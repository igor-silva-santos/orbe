export type FilmeDestaquePill = 'estreia_semana' | 'mais_esperado';

export type FilmeDestaqueFields = {
  estreia_semana?: boolean;
  mais_esperado?: boolean;
  destaque_pill?: FilmeDestaquePill | null;
};

export function filmeDestaqueLabels(filme: FilmeDestaqueFields): string[] {
  const labels: string[] = [];
  if (filme.estreia_semana) labels.push('Estreia na semana');
  if (filme.mais_esperado) labels.push('Mais esperado');
  return labels;
}
