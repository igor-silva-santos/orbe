/**
 * Teste do ranking "Mais esperados" com dados fictícios (sem DB).
 * node --import ts-node/esm não — usar: npm test após adicionar ao package ou:
 * node --require ts-node/register --test scripts/test-mais-esperados.fixture.test.ts
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

type Row = {
  title: string;
  popularity: number;
  voteCount: number;
  voteAverage: number;
  daysUntilRelease: number;
  collection: boolean;
  emBreve: boolean;
};

const DISPLAY_MIN_POP = 30;
const DISPLAY_MIN_VOTES = 100;

function passesDisplay(f: Row): boolean {
  return f.popularity >= DISPLAY_MIN_POP || f.voteCount >= DISPLAY_MIN_VOTES;
}

function scoreAntecipacao(f: Row): number {
  let s = Math.log10(f.popularity + 1) * 42;
  if (f.daysUntilRelease <= 90) s += (90 - f.daysUntilRelease) * 0.15;
  if (f.collection) s += 12;
  if (f.emBreve) s += 8;
  return s;
}

function adaptiveFloor(pops: number[]): number {
  const sorted = [...pops].sort((a, b) => a - b);
  const p70 = sorted[Math.floor(sorted.length * 0.7)] ?? 0;
  return Math.max(8, Math.min(22, p70 * 0.45));
}

/** Fixture: mix blockbuster futuro, indie sem voto, e lixo */
const FIXTURE: Row[] = [
  { title: 'Vingadores: Doomsday', popularity: 180, voteCount: 0, voteAverage: 0, daysUntilRelease: 45, collection: true, emBreve: true },
  { title: 'Filme BR estreia', popularity: 28, voteCount: 2, voteAverage: 0, daysUntilRelease: 14, collection: false, emBreve: true },
  { title: 'Indie festival', popularity: 12, voteCount: 5, voteAverage: 7.2, daysUntilRelease: 30, collection: false, emBreve: false },
  { title: 'Sequência média', popularity: 55, voteCount: 8, voteAverage: 0, daysUntilRelease: 60, collection: true, emBreve: false },
  { title: 'Zumbi Z', popularity: 6, voteCount: 1, voteAverage: 0, daysUntilRelease: 20, collection: false, emBreve: false },
  { title: 'Zumbi Y', popularity: 9, voteCount: 2, voteAverage: 0, daysUntilRelease: 25, collection: false, emBreve: false },
  { title: 'Doc obscuro', popularity: 11, voteCount: 3, voteAverage: 6, daysUntilRelease: 40, collection: false, emBreve: false },
  { title: 'Blockbuster distante', popularity: 95, voteCount: 0, voteAverage: 0, daysUntilRelease: 110, collection: true, emBreve: false },
];

describe('mais esperados — limiar fixo vs adaptativo', () => {
  it('DISPLAY legado (pop ou votos) ainda perde estreias só com emBreve e pop baixa', () => {
    const display = FIXTURE.filter(passesDisplay);
    assert.ok(display.some((f) => f.title === 'Vingadores: Doomsday'));
    assert.ok(!display.some((f) => f.title === 'Filme BR estreia'));
    assert.ok(!display.some((f) => f.title === 'Indie festival'));
  });

  it('ranking adaptativo mantém hype sem vote_average e corta lixo', () => {
    const floor = adaptiveFloor(FIXTURE.map((f) => f.popularity));
    const ranked = FIXTURE
      .map((f) => ({ f, score: scoreAntecipacao(f) }))
      .filter((x) => x.f.popularity >= floor)
      .sort((a, b) => b.score - a.score);

    const titles = ranked.map((x) => x.f.title);
    assert.ok(titles.includes('Vingadores: Doomsday'));
    assert.ok(titles.includes('Filme BR estreia'));
    assert.ok(titles.includes('Sequência média'));
    assert.ok(!titles.includes('Zumbi Z'));
    assert.ok(!titles.includes('Zumbi Y'));
  });
});
