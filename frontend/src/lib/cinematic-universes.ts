import type { SagaSummary } from '@/types/continuacoes';

export type CinematicUniverse = {
  id: string;
  nome: string;
  descricao: string;
  /** Padrões no nome da saga/coleção TMDB */
  patterns: RegExp[];
};

export const CINEMATIC_UNIVERSES: CinematicUniverse[] = [
  {
    id: 'mcu',
    nome: 'Marvel (MCU)',
    descricao: 'Universo Cinematográfico Marvel — Vingadores, Homem-Aranha, X-Men e spin-offs.',
    patterns: [
      /marvel/i,
      /avengers|vingadores/i,
      /iron man|homem de ferro/i,
      /spider-?man|homem-?aranha/i,
      /thor/i,
      /captain america|capitão américa/i,
      /guardians of the galaxy|guardiões da galáxia/i,
      /black panther|pantera negra/i,
      /ant-?man|homem-?formiga/i,
      /doctor strange|doutor estranho/i,
      /deadpool/i,
      /x-men/i,
      /fantastic four|quarteto fantástico/i,
      /blade/i,
    ],
  },
  {
    id: 'dcu',
    nome: 'DC (DCU)',
    descricao: 'Universo DC — Batman, Superman, Liga da Justiça e animações.',
    patterns: [
      /\bdc\b/i,
      /batman/i,
      /superman/i,
      /wonder woman|mulher-?maravilha/i,
      /justice league|liga da justiça/i,
      /aquaman/i,
      /flash/i,
      /shazam/i,
      /suicide squad|esquadrão suicida/i,
      /joker|coringa/i,
      /harley quinn/i,
      /blue beetle|besouro azul/i,
      /teen titans|jovens titãs/i,
      /constantine/i,
    ],
  },
  {
    id: 'star-wars',
    nome: 'Star Wars',
    descricao: 'Saga espacial — trilogias, spin-offs e séries do universo Star Wars.',
    patterns: [/star wars|guerra nas estrelas/i],
  },
  {
    id: 'wizarding-world',
    nome: 'Mundo Bruxo',
    descricao: 'Harry Potter e Animais Fantásticos.',
    patterns: [/harry potter/i, /fantastic beasts|animais fantásticos/i],
  },
  {
    id: 'middle-earth',
    nome: 'Terra-Média',
    descricao: 'O Senhor dos Anéis e O Hobbit.',
    patterns: [/lord of the rings|senhor dos anéis/i, /hobbit/i],
  },
  {
    id: 'monsterverse',
    nome: 'Monsterverse',
    descricao: 'Godzilla, Kong e criaturas titãs.',
    patterns: [/godzilla/i, /kong/i, /monsterverse/i],
  },
  {
    id: 'conjuring',
    nome: 'Universo Invocação do Mal',
    descricao: 'Filmes de terror do universo Conjuring / Annabelle.',
    patterns: [/conjuring|invocação do mal/i, /annabelle/i, /nun|freira/i],
  },
];

export type UniverseGroup = CinematicUniverse & {
  sagas: SagaSummary[];
  totalFilmes: number;
};

export function matchSagaToUniverse(saga: SagaSummary): string | null {
  const text = saga.nome;
  for (const universe of CINEMATIC_UNIVERSES) {
    if (universe.patterns.some((pattern) => pattern.test(text))) {
      return universe.id;
    }
  }
  return null;
}

export function groupSagasByUniverse(sagas: SagaSummary[]): {
  universes: UniverseGroup[];
  outrasSagas: SagaSummary[];
} {
  const byId = new Map<string, SagaSummary[]>();
  const outrasSagas: SagaSummary[] = [];

  for (const saga of sagas) {
    const universeId = matchSagaToUniverse(saga);
    if (!universeId) {
      outrasSagas.push(saga);
      continue;
    }
    const list = byId.get(universeId) ?? [];
    list.push(saga);
    byId.set(universeId, list);
  }

  const universes = CINEMATIC_UNIVERSES.filter((u) => byId.has(u.id)).map((universe) => {
    const universeSagas = byId.get(universe.id) ?? [];
    return {
      ...universe,
      sagas: universeSagas.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')),
      totalFilmes: universeSagas.reduce((sum, s) => sum + s.totalFilmes, 0),
    };
  });

  return { universes, outrasSagas };
}
