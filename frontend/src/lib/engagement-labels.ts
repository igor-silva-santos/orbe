/** TMDB popularity — escala interna (não é nota nem número de espectadores). */
export function formatTmdbPopularityLabel(popularity: number): string {
  if (popularity >= 100) return 'Muito alto no TMDB';
  if (popularity >= 30) return 'Alto no TMDB';
  if (popularity >= 10) return 'Moderado no TMDB';
  return 'Emergente no TMDB';
}

export function formatTmdbPopularityHint(): string {
  return 'Índice de interesse do TMDB (buscas, listas e engajamento recente). Não é nota nem bilheteria.';
}

/** IGDB hypes — quantas pessoas marcaram o jogo como "quero jogar" antes do lançamento. */
export function formatIgdbHypesLabel(hypes: number): string {
  const count = hypes.toLocaleString('pt-BR');
  const noun = hypes === 1 ? 'pessoa' : 'pessoas';
  return `${count} ${noun} na lista de desejos (IGDB)`;
}

export function formatIgdbHypesHint(): string {
  return 'Contagem de usuários da IGDB que marcaram o jogo como "quero jogar" antes do lançamento.';
}
