import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CAST_LIMIT,
  computeMatch,
  FORMAT_BONUS,
  gameMatchesPlay,
  isTooGeneric,
  matchUserMessage,
  parseMatchIds,
  rarityMapKey,
  seedWeightFromPreference,
  type MatchAttr,
  type MatchPart,
  type MatchProfile,
  type RarityIndex,
} from './matchScore';

const attr = (name: string, ref?: string): MatchAttr => ({ key: name, label: name, ref });
const person = (id: number, name: string): MatchAttr => ({
  key: `pessoa:${id}`,
  label: name,
  ref: String(id),
});

function title(
  id: number,
  attrs: MatchProfile['attrs'],
  extra?: Partial<Omit<MatchProfile, 'id' | 'attrs'>>,
): MatchProfile {
  return { id, attrs, ...extra };
}

function catalog(n: number, entries: Array<[MatchPart, string, number]>): RarityIndex {
  const df: Record<string, number> = {};
  for (const [part, key, value] of entries) df[rarityMapKey(part, key)] = value;
  return { n, df };
}

const RARE = 'Raro';
const COMMON = 'Comum';

function filmCatalog(): RarityIndex {
  return catalog(100, [
    ['generos', RARE, 2],
    ['generos', COMMON, 10],
    ['generos', 'Drama', 50],
    ['generos', 'Ação', 40],
    ['generos', 'Romance', 8],
    ['generos', 'Documentário', 8],
    ['generos', 'Terror', 10],
    ['generos', 'Fantasia', 10],
    ['generos', 'Comédia', 10],
    ['diretor', 'pessoa:7', 2],
    ['decada', '1990', 12],
    ['decada', '2000', 12],
    ['elenco', 'pessoa:1', 3],
    ['elenco', 'pessoa:2', 3],
    ['elenco', 'pessoa:3', 3],
    ['elenco', 'pessoa:4', 3],
    ['elenco', 'pessoa:5', 3],
    ['elenco', 'pessoa:6', 3],
  ]);
}

describe('parseMatchIds', () => {
  it('aceita até dois ids positivos e distintos', () => {
    assert.deepEqual(parseMatchIds('550,680'), [550, 680]);
    assert.deepEqual(parseMatchIds(''), []);
    assert.deepEqual(parseMatchIds(undefined), []);
  });

  it('recusa id repetido, texto e lista longa', () => {
    assert.equal(parseMatchIds('10,10'), null);
    assert.equal(parseMatchIds('12,abc'), null);
    assert.equal(parseMatchIds('1,2,3'), null);
    assert.equal(parseMatchIds(12), null);
  });
});

describe('Dice ponderado pela raridade', () => {
  it('a nota é a sobreposição ponderada e o atributo raro pesa mais', () => {
    const n = 100;
    const rare = Math.log(n / 2);
    const common = Math.log(n / 10);
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [title(1, { generos: [attr(RARE), attr(COMMON)] })],
      candidates: [
        title(2, { generos: [attr(COMMON)] }, { popularity: 1_000_000, others: 9_000 }),
        title(3, { generos: [attr(RARE)] }, { popularity: 0, others: 0 }),
      ],
    });

    const expectedRare = (2 * rare) / (rare + common + rare);
    const expectedCommon = (2 * common) / (rare + common + common);
    assert.equal(result.reason, 'ok');
    assert.deepEqual(result.items.map((item) => item.id), [3, 2]);
    assert.ok(Math.abs(result.items[0].score - expectedRare) < 1e-9);
    assert.ok(Math.abs(result.items[1].score - expectedCommon) < 1e-9);
    assert.ok(result.items[0].score > result.items[1].score);
    assert.deepEqual(result.items[0].shared, [RARE]);
  });

  it('parte vazia não entra como zero e o peso se redistribui', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [title(1, { generos: [attr(RARE)] })],
      candidates: [title(2, { generos: [attr(RARE)], diretor: [person(9, 'Outra')] })],
    });
    assert.equal(result.items[0].score, 1);
  });

  it('sem atributo em comum a nota é zero e a lista fica vazia', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [title(1, { generos: [attr(RARE)] })],
      candidates: [title(2, { generos: [attr('Romance')] }, { popularity: 500, others: 800 })],
    });
    assert.equal(result.reason, 'sem_afinidade');
    assert.deepEqual(result.items, []);
  });

  it('não usa popularidade nem gosto de outras pessoas para ordenar', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [title(1, { generos: [attr(RARE)] })],
      candidates: [
        title(9, { generos: [attr(RARE)] }, { popularity: 9_000, others: 4_000 }),
        title(3, { generos: [attr(RARE)] }, { popularity: 1, others: 0 }),
      ],
    });
    assert.equal(result.items[0].score, result.items[1].score);
    assert.deepEqual(result.items.map((item) => item.id), [3, 9]);
  });

  it('gênero genérico demais não segura o solo quando existe atributo específico', () => {
    assert.equal(isTooGeneric(100, 50), true);
    assert.equal(isTooGeneric(100, 35), false);
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [title(1, { generos: [attr(RARE), attr('Drama')] })],
      candidates: [title(2, { generos: [attr('Drama')] }, { popularity: 999 })],
    });
    assert.equal(result.reason, 'sem_afinidade');
    assert.deepEqual(result.items, []);
  });

  it('se o único atributo é genérico, a lista ainda sai por esse gênero', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [title(1, { generos: [attr('Drama')] })],
      candidates: [title(2, { generos: [attr('Drama')] })],
    });
    assert.equal(result.reason, 'ok');
    assert.deepEqual(result.items.map((item) => item.id), [2]);
    assert.deepEqual(result.items[0].shared, ['Drama']);
  });

  it('elenco além do quinto nome não pesa', () => {
    const cast = [1, 2, 3, 4, 5, 6].map((id) => person(id, `Pessoa ${id}`));
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [title(1, { elenco: cast, generos: [attr('Drama')] })],
      candidates: [title(2, { elenco: [person(6, 'Pessoa 6')], generos: [attr('Romance')] })],
    });
    assert.equal(CAST_LIMIT, 5);
    assert.deepEqual(result.items, []);
  });
});

describe('dupla', () => {
  it('a nota é o mínimo, não a média', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'dupla',
      rarity: filmCatalog(),
      seeds: [
        title(1, { generos: [attr('Terror'), attr('Fantasia')] }),
        title(2, { generos: [attr('Terror'), attr('Comédia')] }),
      ],
      candidates: [
        title(3, { generos: [attr('Terror'), attr('Fantasia')] }, { popularity: 999, others: 100 }),
        title(4, { generos: [attr('Terror')] }, { popularity: 1, others: 0 }),
      ],
    });
    assert.equal(result.reason, 'ok');
    assert.deepEqual(result.items.map((item) => item.id), [4, 3]);
    assert.ok(Math.abs(result.items[0].score - (2 / 3)) < 1e-9);
    assert.ok(Math.abs(result.items[1].score - 0.5) < 1e-9);
    assert.deepEqual(result.items[0].shared, ['Terror']);
  });

  it('só um gênero genérico em comum deixa a lista vazia', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'dupla',
      rarity: filmCatalog(),
      seeds: [
        title(1, { generos: [attr('Drama'), attr('Romance')] }),
        title(2, { generos: [attr('Drama'), attr('Documentário')] }),
      ],
      candidates: [title(3, { generos: [attr('Drama'), attr('Romance'), attr('Documentário')] }, { popularity: 1_000 })],
    });
    assert.equal(result.reason, 'sem_paralelo');
    assert.deepEqual(result.items, []);
    assert.match(matchUserMessage({ reason: result.reason, tipo: 'filme' }), /não se encontram/);
  });

  it('diretor em comum salva a dupla sem gênero compartilhado', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'dupla',
      rarity: filmCatalog(),
      seeds: [
        title(1, { generos: [attr('Romance')], diretor: [person(7, 'Nolan')] }),
        title(2, { generos: [attr('Documentário')], diretor: [person(7, 'Nolan')] }),
      ],
      candidates: [
        title(3, { generos: [attr('Romance'), attr('Documentário')] }, { popularity: 800 }),
        title(4, { generos: [attr(COMMON)], diretor: [person(7, 'Nolan')] }),
      ],
    });
    assert.deepEqual(result.items.map((item) => item.id), [4]);
    assert.deepEqual(result.items[0].shared, ['Nolan']);
  });

  it('o corte de genérico é df/N maior que 0,35', () => {
    const below = catalog(100, [['generos', 'Quase', 35]]);
    const above = catalog(100, [['generos', 'Quase', 36]]);
    const seeds = [
      title(1, { generos: [attr('Quase')] }),
      title(2, { generos: [attr('Quase')] }),
    ];
    const candidates = [title(3, { generos: [attr('Quase')] })];
    assert.equal(computeMatch({
      tipo: 'filme', modo: 'dupla', rarity: below, seeds, candidates,
    }).reason, 'ok');
    assert.equal(computeMatch({
      tipo: 'filme', modo: 'dupla', rarity: above, seeds, candidates,
    }).reason, 'sem_paralelo');
  });

  it('sem o atributo mais raro da interseção não entra', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'dupla',
      rarity: filmCatalog(),
      seeds: [
        title(1, { generos: [attr(RARE), attr(COMMON)] }),
        title(2, { generos: [attr(RARE), attr(COMMON)] }),
      ],
      candidates: [title(3, { generos: [attr(COMMON)] })],
    });
    assert.equal(result.reason, 'sem_afinidade');
    assert.deepEqual(result.paralelo.includes(RARE), true);
    assert.match(
      matchUserMessage({ reason: result.reason, tipo: 'filme', paralelo: result.paralelo }),
      /paralelo é/,
    );
  });

  it('a franquia de um lado só não sobe a nota da dupla', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'dupla',
      rarity: filmCatalog(),
      seeds: [
        title(1, { generos: [attr(RARE)] }, { collectionId: 7 }),
        title(2, { generos: [attr(RARE)] }),
      ],
      candidates: [
        title(3, { generos: [attr(RARE)] }),
        title(8, { generos: [attr(RARE)] }, { collectionId: 7, popularity: 50 }),
      ],
    });
    assert.equal(result.items[0].score, result.items[1].score);
    assert.deepEqual(result.items.map((item) => item.id), [3, 8]);
  });
});

describe('base pessoal', () => {
  it('média ponderada: favorito ou amei pesa 2 e gostei pesa 1', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [
        title(1, { generos: [attr('Terror')] }, { seedWeight: 1 }),
        title(2, { generos: [attr('Fantasia')] }, { seedWeight: 2 }),
      ],
      candidates: [
        title(3, { generos: [attr('Terror')] }, { popularity: 100, others: 50 }),
        title(4, { generos: [attr('Fantasia')] }, { popularity: 1, others: 0 }),
      ],
    });
    assert.deepEqual(result.items.map((item) => item.id), [4, 3]);
    assert.ok(Math.abs(result.items[0].score - (2 / 3)) < 1e-9);
    assert.ok(Math.abs(result.items[1].score - (1 / 3)) < 1e-9);
  });

  it('peso da preferência ignora não gostei, oculto e fila sem avaliação', () => {
    assert.equal(seedWeightFromPreference('favorito', 'amei'), 2);
    assert.equal(seedWeightFromPreference('favorito', null), 2);
    assert.equal(seedWeightFromPreference('assistido', 'amei'), 2);
    assert.equal(seedWeightFromPreference('assistido', 'gostei'), 1);
    assert.equal(seedWeightFromPreference('quero_assistir', null), null);
    assert.equal(seedWeightFromPreference('assistido', null), null);
    assert.equal(seedWeightFromPreference('favorito', 'nao_gostei'), null);
    assert.equal(seedWeightFromPreference('oculto', 'amei'), null);
  });

  it('não gostei e a própria semente ficam fora da lista', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      blockedIds: [4],
      seeds: [title(1, { generos: [attr(RARE)] })],
      candidates: [
        title(1, { generos: [attr(RARE)] }),
        title(4, { generos: [attr(RARE)] }),
        title(5, { generos: [attr(RARE)] }),
      ],
    });
    assert.deepEqual(result.items.map((item) => item.id), [5]);
  });
});

describe('modos e fichas', () => {
  const gameRarity = catalog(100, [
    ['generos', 'Soulslike', 5],
    ['generos', 'Tiro', 5],
    ['temas', 'Sobrevivência', 6],
    ['desenvolvedora', 'dev:3', 2],
  ]);

  it('filtra o modo antes da nota e não adivinha pelo nome em português', () => {
    const result = computeMatch({
      tipo: 'jogo',
      modo: 'solo',
      gamePlay: 'multiplayer',
      rarity: gameRarity,
      seeds: [title(1, { generos: [attr('Soulslike')] }, { modes: ['Single player'] })],
      candidates: [
        title(2, { generos: [attr('Soulslike')] }, { modes: ['Single player'], popularity: 9_000 }),
        title(3, { generos: [attr('Soulslike')] }, { modes: ['Co-operative'], popularity: 1 }),
        title(4, { generos: [attr('Soulslike')] }, { modes: ['Um jogador'], popularity: 8_000 }),
        title(5, { generos: [attr('Soulslike')] }, { modes: [], popularity: 7_000 }),
      ],
    });
    assert.equal(result.reason, 'ok');
    assert.deepEqual(result.items.map((item) => item.id), [3]);
  });

  it('jogo com os dois modos passa nos dois filtros', () => {
    const both = title(2, { generos: [attr('Tiro')] }, { modes: ['Single player', 'Split screen'] });
    const input = {
      tipo: 'jogo' as const,
      modo: 'solo' as const,
      rarity: gameRarity,
      seeds: [title(1, { generos: [attr('Tiro')] }, { modes: ['Multiplayer'] })],
      candidates: [both],
    };
    assert.deepEqual(computeMatch({ ...input, gamePlay: 'single' }).items.map((item) => item.id), [2]);
    assert.deepEqual(computeMatch({ ...input, gamePlay: 'multiplayer' }).items.map((item) => item.id), [2]);
  });

  it('lista vazia por modo avisa de catálogo, não de gosto', () => {
    const result = computeMatch({
      tipo: 'jogo',
      modo: 'solo',
      gamePlay: 'multiplayer',
      rarity: gameRarity,
      seeds: [title(1, { generos: [attr('Soulslike')] }, { modes: ['Single player'] })],
      candidates: [title(2, { generos: [attr('Soulslike')] }, { modes: ['Single player'] })],
    });
    assert.equal(result.reason, 'sem_afinidade');
    assert.equal(result.bloqueadoPeloModo, true);
    assert.match(
      matchUserMessage({
        reason: result.reason,
        tipo: 'jogo',
        gamePlay: 'multiplayer',
        bloqueadoPeloModo: true,
      }),
      /multijogador/,
    );
  });

  it('reconhece os nomes em inglês do catálogo e não o fragmento solto', () => {
    assert.equal(gameMatchesPlay(['Single player'], 'single'), true);
    assert.equal(gameMatchesPlay(['Single player'], 'multiplayer'), false);
    assert.equal(gameMatchesPlay(['Massively Multiplayer Online (MMO)'], 'multiplayer'), true);
    assert.equal(gameMatchesPlay(['Battle Royale'], 'multiplayer'), true);
    assert.equal(gameMatchesPlay(['Co-operative'], 'multiplayer'), true);
    assert.equal(gameMatchesPlay(['co-op'], 'multiplayer'), false);
    assert.equal(gameMatchesPlay(['Um jogador'], 'single'), false);
    assert.equal(gameMatchesPlay([], 'single'), false);
  });

  it('filme sem gênero nem diretor não inventa paralelo', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [title(1, { elenco: [person(1, 'Alguém')], decada: [attr('1990')] })],
      candidates: [title(2, { generos: [attr(RARE)] }, { popularity: 100 })],
    });
    assert.equal(result.reason, 'sem_ficha');
    assert.match(matchUserMessage({ reason: 'sem_ficha', tipo: 'filme' }), /gênero nem equipe/);
  });

  it('anime sem gênero ainda compara por tag e o formato é bônus, não filtro', () => {
    const rarity = catalog(100, [
      ['tags', 'Mecha', 10],
      ['tags', 'Escolar', 10],
    ]);
    const result = computeMatch({
      tipo: 'anime',
      modo: 'solo',
      rarity,
      seeds: [title(1, { tags: [attr('Mecha'), attr('Escolar')] }, { formato: 'TV' })],
      candidates: [
        title(2, { tags: [attr('Mecha')] }, { formato: 'MOVIE' }),
        title(3, { tags: [attr('Mecha')] }, { formato: 'TV' }),
      ],
    });
    assert.equal(result.reason, 'ok');
    assert.deepEqual(result.items.map((item) => item.id), [3, 2]);
    assert.ok(Math.abs(result.items[0].score - result.items[1].score - FORMAT_BONUS) < 1e-9);
  });

  it('relação direta de anime e candidato adulto da dupla mista ficam fora', () => {
    const rarity = catalog(80, [['tags', 'Terror', 4]]);
    const result = computeMatch({
      tipo: 'anime',
      modo: 'dupla',
      rarity,
      seeds: [
        title(1, { tags: [attr('Terror')] }, { adult: true, relatedIds: [9] }),
        title(2, { tags: [attr('Terror')] }, { adult: false }),
      ],
      candidates: [
        title(9, { tags: [attr('Terror')] }, { adult: false }),
        title(4, { tags: [attr('Terror')] }, { adult: true, popularity: 100 }),
        title(5, { tags: [attr('Terror')] }, { adult: false }),
      ],
    });
    assert.deepEqual(result.items.map((item) => item.id), [5]);
  });

  it('jogo sem gênero, tema e desenvolvedora fica vazio', () => {
    const result = computeMatch({
      tipo: 'jogo',
      modo: 'solo',
      gamePlay: 'single',
      rarity: gameRarity,
      seeds: [title(1, { perspectiva: [attr('Primeira pessoa')] }, { modes: ['Single player'] })],
      candidates: [title(2, { generos: [attr('Tiro')] }, { modes: ['Single player'] })],
    });
    assert.equal(result.reason, 'sem_ficha');
    assert.match(matchUserMessage({ reason: 'sem_ficha', tipo: 'jogo' }), /desenvolvedora/);
  });

  it('no solo a mesma franquia só desempata, sem subir a nota', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [title(1, { generos: [attr(RARE)] }, { collectionId: 7 })],
      candidates: [
        title(2, { generos: [attr(RARE)] }, { popularity: 100 }),
        title(8, { generos: [attr(RARE)] }, { collectionId: 7 }),
      ],
    });
    assert.equal(result.items[0].score, result.items[1].score);
    assert.deepEqual(result.items.map((item) => item.id), [8, 2]);
  });

  it('devolve no máximo cinco', () => {
    const result = computeMatch({
      tipo: 'filme',
      modo: 'solo',
      rarity: filmCatalog(),
      seeds: [title(1, { generos: [attr(RARE)] })],
      candidates: [2, 3, 4, 5, 6, 7].map((id) => title(id, { generos: [attr(RARE)] })),
    });
    assert.equal(result.items.length, 5);
    assert.deepEqual(result.items.map((item) => item.id), [2, 3, 4, 5, 6]);
  });
});

describe('matchUserMessage', () => {
  it('explica base vazia, login e ausência de paralelo', () => {
    assert.match(matchUserMessage({ reason: 'sem_base', tipo: 'anime' }), /anime/);
    assert.match(matchUserMessage({ reason: 'precisa_login', tipo: 'filme' }), /conta/);
    assert.match(matchUserMessage({ reason: 'sem_paralelo', tipo: 'serie' }), /não se encontram/);
    assert.equal(
      matchUserMessage({ reason: 'ok', tipo: 'jogo' }).toLowerCase().includes('em alta'),
      false,
    );
  });
});
