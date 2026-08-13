export type ContinuacaoRelacao =
  | 'precuela'
  | 'sequencia'
  | 'mesma_saga'
  | 'spin_off'
  | 'recomendado';

export type ContinuacaoItem = {
  tipo: 'filme' | 'serie';
  tmdbId: number;
  titulo: string;
  posterUrl: string | null;
  releaseDate: string | null;
  relacao: ContinuacaoRelacao;
  ordem: number;
  noOrbe: boolean;
};

export type SagaSummary = {
  id: number;
  nome: string;
  posterUrl: string | null;
  totalFilmes: number;
  preview: ContinuacaoItem[];
};

export type ContinuacoesPayload = {
  saga: {
    id: number;
    nome: string;
    posterUrl: string | null;
    overview?: string | null;
  } | null;
  itens: ContinuacaoItem[];
  filmeAtualTmdbId?: number;
  serieAtualTmdbId?: number;
};

export type SagasListResponse = {
  sagas: SagaSummary[];
  total: number;
};
