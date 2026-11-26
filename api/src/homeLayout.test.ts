import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mergeHomeLayout, parseHomeLayout, readHomeLayout } from './homeLayout';

describe('homeLayout', () => {
  it('aceita ordem parcial e lista vazia', () => {
    assert.deepEqual(parseHomeLayout(['jogos', 'filmes']), ['jogos', 'filmes']);
    assert.deepEqual(parseHomeLayout([]), []);
  });

  it('recusa id desconhecido, duplicata e valor que não é lista', () => {
    assert.equal(parseHomeLayout(['filmes', 'filmes']), null);
    assert.equal(parseHomeLayout(['premios']), null);
    assert.equal(parseHomeLayout('filmes'), null);
  });

  it('sem preferência salva devolve a ordem padrão', () => {
    assert.deepEqual(readHomeLayout(null), ['filmes', 'series', 'animes', 'jogos']);
    assert.deepEqual(readHomeLayout({ tema: 'dark' }), ['filmes', 'series', 'animes', 'jogos']);
  });

  it('lista inválida já gravada cai no padrão; lista vazia permanece vazia', () => {
    assert.deepEqual(readHomeLayout({ homeLayout: ['filmes', 'filmes'] }), [
      'filmes',
      'series',
      'animes',
      'jogos',
    ]);
    assert.deepEqual(readHomeLayout({ homeLayout: [] }), []);
  });

  it('grava a ordem e preserva as outras preferências', () => {
    const merged = mergeHomeLayout({ tema: 'dark', homeLayout: ['filmes'] }, ['jogos']);
    assert.deepEqual(merged, { tema: 'dark', homeLayout: ['jogos'] });
  });
});
