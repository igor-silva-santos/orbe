import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeMatch,
  gameMatchesPlay,
  matchUserMessage,
  parseMatchIds,
} from './matchScore';

const seed = (id: number, genres: string[], extra?: { modes?: string[]; popularity?: number }) => ({
  id,
  genres,
  modes: extra?.modes,
  popularity: extra?.popularity,
});

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

describe('computeMatch', () => {
  it('solo prioriza quem compartilha mais gêneros e exclui a semente', () => {
    const result = computeMatch({
      modo: 'solo',
      seeds: [seed(1, ['Ação', 'Drama'])],
      candidates: [
        seed(1, ['Ação', 'Drama'], { popularity: 100 }),
        seed(2, ['Ação'], { popularity: 10 }),
        seed(3, ['Ação', 'Drama'], { popularity: 5 }),
        seed(4, ['Comédia'], { popularity: 99 }),
      ],
    });

    assert.equal(result.reason, 'ok');
    assert.deepEqual(result.items.map((item) => item.id), [3, 2]);
    assert.deepEqual(result.items[0].shared, ['Ação', 'Drama']);
  });

  it('solo com vários títulos da base dá mais peso ao gênero repetido', () => {
    const result = computeMatch({
      modo: 'solo',
      seeds: [seed(1, ['Ação']), seed(2, ['Ação', 'Terror'])],
      candidates: [
        seed(3, ['Terror'], { popularity: 50 }),
        seed(4, ['Ação'], { popularity: 1 }),
      ],
    });

    assert.equal(result.items[0].id, 4);
    assert.equal(result.items[0].score, 2);
    assert.equal(result.items[1].score, 1);
  });

  it('empata pela popularidade', () => {
    const result = computeMatch({
      modo: 'solo',
      seeds: [seed(1, ['Drama'])],
      candidates: [
        seed(2, ['Drama'], { popularity: 3 }),
        seed(3, ['Drama'], { popularity: 9 }),
      ],
    });
    assert.deepEqual(result.items.map((item) => item.id), [3, 2]);
  });

  it('dupla só usa o gênero em comum', () => {
    const result = computeMatch({
      modo: 'dupla',
      seeds: [seed(1, ['Ação', 'Ficção']), seed(2, ['Romance', 'Ficção'])],
      candidates: [
        seed(3, ['Ação'], { popularity: 100 }),
        seed(4, ['Ficção'], { popularity: 1 }),
      ],
    });
    assert.deepEqual(result.items.map((item) => item.id), [4]);
    assert.deepEqual(result.items[0].shared, ['Ficção']);
  });

  it('dupla sem gênero em comum não inventa sugestão', () => {
    const result = computeMatch({
      modo: 'dupla',
      seeds: [seed(1, ['Ação']), seed(2, ['Romance'])],
      candidates: [seed(3, ['Ação', 'Romance'])],
    });
    assert.equal(result.reason, 'sem_paralelo');
    assert.deepEqual(result.items, []);
  });

  it('sem semente e sem afinidade ficam vazios', () => {
    assert.equal(computeMatch({ modo: 'solo', seeds: [], candidates: [] }).reason, 'sem_semente');
    assert.equal(
      computeMatch({
        modo: 'dupla',
        seeds: [seed(1, ['Ação'])],
        candidates: [],
      }).reason,
      'sem_semente',
    );
    assert.equal(
      computeMatch({
        modo: 'solo',
        seeds: [seed(1, ['Ação'])],
        candidates: [seed(2, ['Terror'])],
      }).reason,
      'sem_afinidade',
    );
  });

  it('jogo multijogador deixa de fora quem é só um jogador e aceita quem tem os dois', () => {
    const result = computeMatch({
      modo: 'solo',
      gamePlay: 'multiplayer',
      seeds: [seed(1, ['Tiro'], { modes: ['Multiplayer'] })],
      candidates: [
        seed(2, ['Tiro'], { modes: ['Single player'], popularity: 50 }),
        seed(3, ['Tiro'], { modes: ['Single player', 'Multiplayer'], popularity: 10 }),
        seed(4, ['Tiro'], { modes: ['Co-operative'], popularity: 8 }),
        seed(5, ['Tiro'], { modes: [], popularity: 80 }),
      ],
    });
    assert.equal(result.reason, 'ok');
    assert.deepEqual(result.items.map((item) => item.id), [3, 4]);
  });

  it('jogo um jogador deixa de fora quem é só multijogador', () => {
    const result = computeMatch({
      modo: 'solo',
      gamePlay: 'single',
      seeds: [seed(1, ['Aventura'], { modes: ['Single player'] })],
      candidates: [
        seed(2, ['Aventura'], { modes: ['Multiplayer'] }),
        seed(3, ['Aventura'], { modes: ['Um jogador', 'Cooperativo'] }),
      ],
    });
    assert.deepEqual(result.items.map((item) => item.id), [3]);
  });

  it('quando o modo zera a lista, avisa em vez de sugerir o outro modo', () => {
    const result = computeMatch({
      modo: 'solo',
      gamePlay: 'single',
      seeds: [seed(1, ['Luta'], { modes: ['Single player'] })],
      candidates: [seed(2, ['Luta'], { modes: ['Battle Royale'] })],
    });
    assert.equal(result.reason, 'sem_afinidade');
    assert.equal(result.bloqueadoPeloModo, true);
    assert.match(
      matchUserMessage({ reason: result.reason, tipo: 'jogo', gamePlay: 'single', bloqueadoPeloModo: true }),
      /um jogador/i,
    );
  });
});

describe('gameMatchesPlay', () => {
  it('reconhece os nomes do catálogo em português e em inglês', () => {
    assert.equal(gameMatchesPlay(['Massively Multiplayer Online (MMO)'], 'multiplayer'), true);
    assert.equal(gameMatchesPlay(['Massively Multiplayer Online (MMO)'], 'single'), false);
    assert.equal(gameMatchesPlay(['Single player', 'Split screen'], 'single'), true);
    assert.equal(gameMatchesPlay(['Single player', 'Split screen'], 'multiplayer'), true);
  });
});

describe('matchUserMessage', () => {
  it('explica base vazia e login', () => {
    assert.match(matchUserMessage({ reason: 'sem_base', tipo: 'anime' }), /anime/);
    assert.match(matchUserMessage({ reason: 'precisa_login', tipo: 'filme' }), /conta/);
    assert.match(matchUserMessage({ reason: 'sem_paralelo', tipo: 'serie' }), /gênero em comum/);
  });
});
