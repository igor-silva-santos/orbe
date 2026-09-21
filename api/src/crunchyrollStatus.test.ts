import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseCrunchyrollStatusLine,
  mapCrunchyrollToQueueStatus,
} from './crunchyrollStatus';

const catalog = {
  subFrontier: { season: 2, episode: 10 },
  dubPtBrFrontier: { season: 2, episode: 8 },
  episodesSubCount: 22,
  episodesDubPtBrCount: 20,
};

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
  it('sub à frente da dub → esperando_dublagem (trilha PT-BR)', () => {
    assert.equal(
      mapCrunchyrollToQueueStatus({
        kind: 'assistir_de_novo',
        season: 2,
        episode: 8,
        preferredAudio: 'pt-BR',
        catalogEpisodes: 24,
        catalog,
      }),
      'esperando_dublagem',
    );
  });

  it('sub e dub alinhados mas faltam eps no ar → esperando_episodio', () => {
    assert.equal(
      mapCrunchyrollToQueueStatus({
        kind: 'assistir_de_novo',
        season: 2,
        episode: 10,
        preferredAudio: 'sub',
        catalogEpisodes: 24,
        catalog: {
          subFrontier: { season: 2, episode: 10 },
          dubPtBrFrontier: { season: 2, episode: 10 },
          episodesSubCount: 22,
          episodesDubPtBrCount: 22,
        },
      }),
      'esperando_episodio',
    );
  });

  it('sub em dia e catálogo completo → concluido', () => {
    assert.equal(
      mapCrunchyrollToQueueStatus({
        kind: 'assistir_de_novo',
        season: 1,
        episode: 12,
        preferredAudio: 'sub',
        catalogEpisodes: 12,
        catalog: {
          subFrontier: { season: 1, episode: 12 },
          dubPtBrFrontier: { season: 1, episode: 12 },
          episodesSubCount: 12,
          episodesDubPtBrCount: 12,
        },
      }),
      'concluido',
    );
  });
});
