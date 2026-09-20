import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseCrunchyrollStatusLine,
  mapCrunchyrollToQueueStatus,
} from './crunchyrollStatus';

describe('parseCrunchyrollStatusLine', () => {
  it('parseia exemplos da fila pt-BR', () => {
    assert.deepEqual(parseCrunchyrollStatusLine('Continuar: E5'), {
      kind: 'continuar',
      season: 1,
      episode: 5,
      label: 'Continuar: E5',
    });
    assert.deepEqual(parseCrunchyrollStatusLine('A Seguir: T2 E5')?.kind, 'a_seguir');
    assert.deepEqual(parseCrunchyrollStatusLine('Começar a Assistir: E1')?.kind, 'comecar');
    assert.deepEqual(parseCrunchyrollStatusLine('Assistir de Novo: E12')?.kind, 'assistir_de_novo');
  });
});

describe('mapCrunchyrollToQueueStatus', () => {
  it('assistir de novo com ep igual ao total vira concluido', () => {
    assert.equal(
      mapCrunchyrollToQueueStatus({
        kind: 'assistir_de_novo',
        episode: 12,
        season: 1,
        catalogEpisodes: 12,
      }),
      'concluido',
    );
  });

  it('assistir de novo com ep menor que total vira esperando episódio ou dublagem', () => {
    assert.equal(
      mapCrunchyrollToQueueStatus({
        kind: 'assistir_de_novo',
        episode: 7,
        season: 1,
        catalogEpisodes: 24,
        trackPtBrDub: false,
      }),
      'esperando_episodio',
    );
    assert.equal(
      mapCrunchyrollToQueueStatus({
        kind: 'assistir_de_novo',
        episode: 7,
        season: 1,
        catalogEpisodes: 24,
        trackPtBrDub: true,
      }),
      'esperando_dublagem',
    );
  });
});
