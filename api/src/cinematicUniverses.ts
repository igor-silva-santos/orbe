export type CinematicUniverseConfig = {
  id: string;
  nome: string;
  descricao: string;
  /** Padrões no nome da coleção TMDB (sagas de filmes) */
  collectionPatterns: RegExp[];
  /** Padrões no título do filme ou série */
  titlePatterns: RegExp[];
  /** Palavras-chave para pré-filtrar no banco (contains, case-insensitive) */
  searchKeywords: string[];
};

export const CINEMATIC_UNIVERSES: CinematicUniverseConfig[] = [
  {
    id: 'mcu',
    nome: 'Marvel (MCU)',
    descricao: 'Universo Cinematográfico Marvel — filmes e séries em ordem cronológica.',
    collectionPatterns: [
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
    ],
    titlePatterns: [
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
      /wanda/i,
      /^loki$/i,
      /hawkeye|gavião arqueiro/i,
      /moon knight|cavaleiro da lua/i,
      /ms\.?\s*marvel/i,
      /she-?hulk/i,
      /secret invasion|invasão secreta/i,
      /falcon.*winter soldier|soldado invernal/i,
      /what if/i,
      /daredevil/i,
      /echo/i,
      /agatha/i,
      /ironheart/i,
      /agents of s\.?h\.?i\.?e\.?l\.?d/i,
    ],
    searchKeywords: [
      'marvel',
      'avengers',
      'vingadores',
      'iron man',
      'spider',
      'thor',
      'captain america',
      'guardians',
      'panther',
      'ant-man',
      'strange',
      'deadpool',
      'wanda',
      'loki',
      'hawkeye',
      'moon knight',
      'she-hulk',
      'daredevil',
      'falcon',
      'shield',
    ],
  },
  {
    id: 'dcu',
    nome: 'DC (DCU)',
    descricao: 'Universo DC — filmes e séries de Batman, Superman, Liga da Justiça e mais.',
    collectionPatterns: [
      /\bdc\b/i,
      /batman/i,
      /superman/i,
      /wonder woman|mulher-?maravilha/i,
      /justice league|liga da justiça/i,
      /aquaman/i,
      /suicide squad|esquadrão suicida/i,
      /joker|coringa/i,
      /harley quinn/i,
      /shazam/i,
      /teen titans|jovens titãs/i,
    ],
    titlePatterns: [
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
      /peacemaker/i,
      /titans/i,
      /doom patrol/i,
      /constantine/i,
      /arrow/i,
      /gotham/i,
    ],
    searchKeywords: ['batman', 'superman', 'wonder woman', 'justice league', 'aquaman', 'flash', 'shazam', 'joker', 'harley', 'peacemaker', 'gotham', 'arrow', 'titans'],
  },
  {
    id: 'star-wars',
    nome: 'Star Wars',
    descricao: 'Saga espacial — trilogias, spin-offs e séries em ordem cronológica.',
    collectionPatterns: [/star wars|guerra nas estrelas/i],
    titlePatterns: [
      /star wars|guerra nas estrelas/i,
      /mandalorian|mandaloriano/i,
      /ahsoka/i,
      /andor/i,
      /obi-?wan/i,
      /boba fett/i,
      /clone wars|guerras clônicas/i,
      /bad batch|esquadrão/i,
      /skeleton crew/i,
      /acolyte|acólito/i,
      /book of boba/i,
    ],
    searchKeywords: ['star wars', 'mandalorian', 'ahsoka', 'andor', 'obi-wan', 'clone wars', 'boba fett', 'bad batch', 'skeleton crew', 'acolyte'],
  },
  {
    id: 'wizarding-world',
    nome: 'Mundo Bruxo',
    descricao: 'Harry Potter, Animais Fantásticos e séries do mundo bruxo.',
    collectionPatterns: [/harry potter/i, /fantastic beasts|animais fantásticos/i, /wizarding world/i],
    titlePatterns: [/harry potter/i, /fantastic beasts|animais fantásticos/i, /hogwarts/i],
    searchKeywords: ['harry potter', 'fantastic beasts', 'hogwarts', 'animais fantásticos'],
  },
  {
    id: 'middle-earth',
    nome: 'Terra-Média',
    descricao: 'O Senhor dos Anéis, O Hobbit e Os Anéis do Poder.',
    collectionPatterns: [/lord of the rings|senhor dos anéis/i, /hobbit/i, /middle-?earth|terra-?média/i],
    titlePatterns: [
      /lord of the rings|senhor dos anéis/i,
      /hobbit/i,
      /rings of power|anéis do poder/i,
      /middle-?earth|terra-?média/i,
    ],
    searchKeywords: ['lord of the rings', 'senhor dos anéis', 'hobbit', 'rings of power', 'anéis do poder', 'middle-earth'],
  },
  {
    id: 'monsterverse',
    nome: 'Monsterverse',
    descricao: 'Godzilla, Kong e criaturas titãs.',
    collectionPatterns: [/godzilla/i, /kong/i, /monsterverse/i],
    titlePatterns: [/godzilla/i, /kong/i, /monsterverse/i, /skull island/i],
    searchKeywords: ['godzilla', 'kong', 'monsterverse', 'skull island'],
  },
  {
    id: 'conjuring',
    nome: 'Universo Invocação do Mal',
    descricao: 'Filmes de terror do universo Conjuring e spin-offs.',
    collectionPatterns: [/conjuring|invocação do mal/i, /annabelle/i, /the nun|a freira/i],
    titlePatterns: [/conjuring|invocação do mal/i, /annabelle/i, /\bnun\b|freira/i, /la llorona/i],
    searchKeywords: ['conjuring', 'invocação', 'annabelle', 'nun', 'freira'],
  },
];

export function getUniverseById(id: string): CinematicUniverseConfig | undefined {
  return CINEMATIC_UNIVERSES.find((u) => u.id === id);
}

export function findUniverseForTitles(
  ...texts: (string | null | undefined)[]
): CinematicUniverseConfig | undefined {
  for (const universe of CINEMATIC_UNIVERSES) {
    if (texts.some((text) => matchesUniversePatterns(text, universe.titlePatterns))) {
      return universe;
    }
  }
  return undefined;
}

export function matchesUniversePatterns(text: string | null | undefined, patterns: RegExp[]): boolean {
  if (!text) return false;
  return patterns.some((pattern) => pattern.test(text));
}

export function buildKeywordOrFilter(keywords: string[], fields: ('title' | 'originalTitle' | 'name' | 'originalName')[]) {
  const unique = [...new Set(keywords.map((k) => k.trim()).filter((k) => k.length >= 3))];
  if (unique.length === 0) return undefined;
  return {
    OR: unique.flatMap((keyword) =>
      fields.map((field) => ({
        [field]: { contains: keyword, mode: 'insensitive' as const },
      })),
    ),
  };
}
