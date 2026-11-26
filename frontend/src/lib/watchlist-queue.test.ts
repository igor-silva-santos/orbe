import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  episodeProgressPercent,
  filterWatchlistItems,
  isInPersonalQueue,
  sortWatchlistQueue,
} from './watchlist-queue';

const items = [
  { id: 'a', status: 'comecar', hasDub: false, updatedAt: '2026-11-01T00:00:00.000Z' },
  { id: 'b', status: 'terminado', hasDub: true, updatedAt: '2026-11-20T00:00:00.000Z' },
  { id: 'c', status: 'continuar', hasDub: true, updatedAt: '2026-11-10T00:00:00.000Z' },
  { id: 'd', status: 'seguir', hasDub: false, updatedAt: '2026-11-12T00:00:00.000Z' },
  { id: 'e', status: 'novamente', hasDub: false, updatedAt: '2026-11-11T00:00:00.000Z' },
];

describe('fila pessoal de animes', () => {
  it('ordena Continuar, Seguindo, De novo, Começar e Terminado', () => {
    assert.deepEqual(
      sortWatchlistQueue(items).map((item) => item.id),
      ['c', 'd', 'e', 'a', 'b']
    );
  });

  it('separa em andamento, começar, terminados e dublagem', () => {
    assert.deepEqual(filterWatchlistItems(items, 'andamento').map((item) => item.id), ['c', 'd', 'e']);
    assert.deepEqual(filterWatchlistItems(items, 'comecar').map((item) => item.id), ['a']);
    assert.deepEqual(filterWatchlistItems(items, 'terminado').map((item) => item.id), ['b']);
    assert.deepEqual(filterWatchlistItems(items, 'dub').map((item) => item.id), ['b', 'c']);
  });

  it('a fila do que assistir agora não inclui terminados', () => {
    assert.equal(isInPersonalQueue('continuar'), true);
    assert.equal(isInPersonalQueue('comecar'), true);
    assert.equal(isInPersonalQueue('terminado'), false);
  });

  it('calcula o progresso do episódio só quando há total', () => {
    assert.equal(episodeProgressPercent(3, 10), 30);
    assert.equal(episodeProgressPercent(12, 10), 100);
    assert.equal(episodeProgressPercent(0, 10), null);
    assert.equal(episodeProgressPercent(4, 0), null);
    assert.equal(episodeProgressPercent(4, null), null);
  });
});
