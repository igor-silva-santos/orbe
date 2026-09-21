import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeAdaptivePopularityFloor,
  filterFilmesAntecipacaoGate,
  passesHomeLaunchRuntime,
  scoreFilmeAntecipacao,
} from './filmeAntecipacao';

const future = new Date();
future.setDate(future.getDate() + 30);

describe('filmeAntecipacao', () => {
  it('score não depende de vote_average', () => {
    const a = scoreFilmeAntecipacao({
      title: 'Blockbuster',
      popularity: 40,
      voteCount: 0,
      releaseDate: future,
      collectionId: 1,
    });
    const b = scoreFilmeAntecipacao({
      title: 'Indie',
      popularity: 12,
      voteCount: 0,
      releaseDate: future,
    });
    assert.ok(a > b);
  });

  it('piso adaptativo remove zumbis e mantém hype sem voto', () => {
    const items = [
      { title: 'A', popularity: 180, releaseDate: future, overview: 'x'.repeat(50) },
      { title: 'B', popularity: 28, releaseDate: future, emBreve: true },
      { title: 'Z', popularity: 6, releaseDate: future, overview: 'x'.repeat(50) },
    ];
    const out = filterFilmesAntecipacaoGate(items);
    assert.ok(out.some((f) => f.title === 'A'));
    assert.ok(out.some((f) => f.title === 'B'));
    assert.ok(!out.some((f) => f.title === 'Z'));
  });

  it('runtime null passa no carrossel home', () => {
    assert.equal(passesHomeLaunchRuntime({ title: 'x', runtime: null }), true);
    assert.equal(passesHomeLaunchRuntime({ title: 'x', runtime: 39 }), false);
    assert.equal(passesHomeLaunchRuntime({ title: 'x', runtime: 40 }), true);
  });

  it('computeAdaptivePopularityFloor fica entre 8 e 22', () => {
    const floor = computeAdaptivePopularityFloor([5, 10, 20, 40, 80]);
    assert.ok(floor >= 8 && floor <= 22);
  });
});
