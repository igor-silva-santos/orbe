import {
  AWARD_CEREMONIES,
  type AwardCeremonySource,
  type AwardMediaType,
  type AwardNominee,
} from './awardCeremoniesCatalog';

export type AwardCeremonyPhase = 'votacao_aberta' | 'aguardando' | 'encerrado';

export type PublicAwardCategory = {
  nome: string;
  indicados: AwardNominee[];
  vencedor: string | null;
};

export type PublicAwardCeremony = {
  id: string;
  nome: string;
  ano: number;
  tipos: AwardMediaType[];
  data: string;
  descricao: string;
  url: string | null;
  fase: AwardCeremonyPhase;
  votacaoAberta: boolean;
  avisoVotacao: string | null;
  urlVotacao: string | null;
  categorias: PublicAwardCategory[];
};

export type OpenFanVote = {
  id: string;
  nome: string;
  ano: number;
  aviso: string;
  url: string | null;
};

export type AwardEventsResponse = {
  names: string[];
  years: number[];
  votacoesAbertas: OpenFanVote[];
  eventos: PublicAwardCeremony[];
};

export type AwardEventFilters = {
  now?: Date;
  awardName?: string;
  year?: number;
  mediaType?: AwardMediaType;
};

const PHASE_RANK: Record<AwardCeremonyPhase, number> = {
  votacao_aberta: 0,
  aguardando: 1,
  encerrado: 2,
};

export const ceremonyPhase = (ceremony: AwardCeremonySource, now: Date): AwardCeremonyPhase => {
  if (now.getTime() >= Date.parse(ceremony.instanteCerimonia)) return 'encerrado';
  if (ceremony.votacao) {
    const t = now.getTime();
    const inicio = Date.parse(ceremony.votacao.inicio);
    const fim = Date.parse(ceremony.votacao.fim);
    if (t >= inicio && t < fim) return 'votacao_aberta';
  }
  return 'aguardando';
};

const toPublicCeremony = (ceremony: AwardCeremonySource, now: Date): PublicAwardCeremony => {
  const fase = ceremonyPhase(ceremony, now);
  const encerrado = fase === 'encerrado';
  const votacaoAberta = fase === 'votacao_aberta';

  return {
    id: ceremony.id,
    nome: ceremony.nome,
    ano: ceremony.ano,
    tipos: ceremony.tipos,
    data: ceremony.data,
    descricao: ceremony.descricao,
    url: ceremony.url,
    fase,
    votacaoAberta,
    avisoVotacao: votacaoAberta ? ceremony.votacao?.aviso ?? null : null,
    urlVotacao: votacaoAberta ? ceremony.votacao?.url ?? null : null,
    categorias: ceremony.categorias.map((category) => {
      const vencedor = encerrado ? category.vencedor : null;
      const indicados = [...category.indicados];
      if (vencedor) {
        indicados.sort((a, b) => {
          if (a.titulo === vencedor) return -1;
          if (b.titulo === vencedor) return 1;
          return 0;
        });
      }
      return { nome: category.nome, indicados, vencedor };
    }),
  };
};

export const awardCeremonyFilterOptions = () => {
  const names = [...new Set(AWARD_CEREMONIES.map((ceremony) => ceremony.nome))].sort((a, b) =>
    a.localeCompare(b, 'pt-BR'),
  );
  const years = [...new Set(AWARD_CEREMONIES.map((ceremony) => ceremony.ano))].sort((a, b) => b - a);
  return { names, years };
};

export const mergeAwardFilterOptions = (
  dbNames: string[],
  dbYears: Array<number | string>,
) => {
  const catalog = awardCeremonyFilterOptions();
  const names = [...new Set([...dbNames, ...catalog.names].filter((name) => Boolean(name)))].sort((a, b) =>
    a.localeCompare(b, 'pt-BR'),
  );
  const years = [
    ...new Set(
      [...dbYears, ...catalog.years]
        .map((year) => Number(year))
        .filter((year) => Number.isInteger(year) && year > 0),
    ),
  ].sort((a, b) => b - a);
  return { names, years };
};

const matchesFilters = (ceremony: AwardCeremonySource, filters: AwardEventFilters) => {
  if (filters.mediaType && !ceremony.tipos.includes(filters.mediaType)) return false;
  if (filters.awardName && ceremony.nome !== filters.awardName) return false;
  if (filters.year !== undefined && !Number.isNaN(filters.year) && ceremony.ano !== filters.year) return false;
  return true;
};

export const buildAwardEventsResponse = (filters: AwardEventFilters = {}): AwardEventsResponse => {
  const now = filters.now ?? new Date();
  const { names, years } = awardCeremonyFilterOptions();
  const eventos = AWARD_CEREMONIES.filter((ceremony) => matchesFilters(ceremony, filters))
    .map((ceremony) => toPublicCeremony(ceremony, now))
    .sort((a, b) => {
      const rank = PHASE_RANK[a.fase] - PHASE_RANK[b.fase];
      if (rank !== 0) return rank;
      const aTime = Date.parse(AWARD_CEREMONIES.find((item) => item.id === a.id)?.instanteCerimonia ?? '');
      const bTime = Date.parse(AWARD_CEREMONIES.find((item) => item.id === b.id)?.instanteCerimonia ?? '');
      if (a.fase === 'encerrado') return bTime - aTime;
      return aTime - bTime;
    });

  const votacoesAbertas = eventos
    .filter((evento) => evento.votacaoAberta && evento.avisoVotacao)
    .map((evento) => ({
      id: evento.id,
      nome: evento.nome,
      ano: evento.ano,
      aviso: evento.avisoVotacao as string,
      url: evento.urlVotacao,
    }));

  return { names, years, votacoesAbertas, eventos };
};

export { AWARD_CEREMONIES };
