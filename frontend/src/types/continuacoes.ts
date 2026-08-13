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

export type UniversoSummary = {
  id: string;
  nome: string;
  descricao: string;
  posterUrl: string | null;
  totalFilmes: number;
  totalSeries: number;
  totalTitulos: number;
  preview: ContinuacaoItem[];
  primeiraData: string | null;
  ultimaData: string | null;
};

export type UniversoPayload = {
  universo: {
    id: string;
    nome: string;
    descricao: string;
    posterUrl: string | null;
  };
  itens: ContinuacaoItem[];
};

export type UniversosListResponse = {
  universos: UniversoSummary[];
  total: number;
};
