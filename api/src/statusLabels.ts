/** TMDB movie/TV status labels in PT-BR */
const tmdbStatusLabels: Record<string, string> = {
  'Rumored': 'Rumores',
  'Planned': 'Planejado',
  'In Production': 'Em produção',
  'Post Production': 'Pós-produção',
  'Released': 'Lançado',
  'Canceled': 'Cancelado',
  'Cancelled': 'Cancelado',
  'Returning Series': 'Em exibição',
  'Ended': 'Finalizada',
  'Pilot': 'Piloto',
};

/** AniList anime status labels in PT-BR */
const animeStatusLabels: Record<string, string> = {
  FINISHED: 'Finalizado',
  RELEASING: 'Em exibição',
  NOT_YET_RELEASED: 'Não lançado',
  CANCELLED: 'Cancelado',
  HIATUS: 'Em hiato',
};

export const translateTmdbStatus = (status: string | null | undefined): string | null => {
  if (!status) return null;
  return tmdbStatusLabels[status] ?? status;
};

export const translateAnimeStatusLabel = (status: string | null | undefined): string | null => {
  if (!status) return null;
  return animeStatusLabels[status] ?? status.replace(/_/g, ' ');
};
