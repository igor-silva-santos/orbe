import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { posterForTitle } from './awardPosters';

describe('pôsteres das premiações', () => {
  it('acha o pôster pelo título, com ou sem acento', () => {
    const posters = new Map<string, string>([
      ['dune', 'https://image.tmdb.org/t/p/w342/dune.jpg'],
      ['ainda estou aqui', 'https://image.tmdb.org/t/p/w342/aqui.jpg'],
    ]);
    assert.equal(posterForTitle('Dune', posters), posters.get('dune'));
    assert.equal(posterForTitle('Ainda Estou Aqui', posters), posters.get('ainda estou aqui'));
    assert.equal(posterForTitle('Filme que não está no catálogo', posters), null);
  });
});
