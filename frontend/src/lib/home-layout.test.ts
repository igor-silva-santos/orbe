import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  hideHomeCarousel,
  moveHomeCarousel,
  normalizeHomeLayout,
  showHomeCarousel,
} from './home-layout';

describe('home-layout', () => {
  it('mantém lista vazia e recusa duplicata', () => {
    assert.deepEqual(normalizeHomeLayout([]), []);
    assert.deepEqual(normalizeHomeLayout(['filmes', 'filmes']), ['filmes', 'series', 'animes', 'jogos']);
    assert.deepEqual(normalizeHomeLayout(['jogos', 'animes']), ['jogos', 'animes']);
  });

  it('sobe, desce, remove e devolve o carrossel', () => {
    const moved = moveHomeCarousel(['filmes', 'series', 'animes', 'jogos'], 'series', -1);
    assert.deepEqual(moved, ['series', 'filmes', 'animes', 'jogos']);
    const hidden = hideHomeCarousel(moved, 'filmes');
    assert.deepEqual(hidden, ['series', 'animes', 'jogos']);
    assert.deepEqual(showHomeCarousel(hidden, 'filmes'), ['series', 'animes', 'jogos', 'filmes']);
  });
});
