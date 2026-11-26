const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { parseSeasonEpisode, parseQueueStatus } = require('./queue-progress');

describe('progresso da fila Crunchyroll', () => {
  it('lê temporada e episódio no formato pt-BR', () => {
    assert.deepEqual(parseSeasonEpisode('Continuar: T2 E5'), { season: 2, episode: 5 });
    assert.deepEqual(parseSeasonEpisode('A seguir: T1E3'), { season: 1, episode: 3 });
    assert.deepEqual(parseSeasonEpisode('Começar a assistir: E1'), { season: 1, episode: 1 });
    assert.deepEqual(parseSeasonEpisode('Temporada 3 Episódio 4'), { season: 3, episode: 4 });
    assert.deepEqual(parseSeasonEpisode('S1 E12'), { season: 1, episode: 12 });
  });

  it('não trata minutos restantes como número do episódio', () => {
    assert.deepEqual(parseSeasonEpisode('12 min restante'), { season: 1, episode: 0 });
    assert.deepEqual(parseSeasonEpisode('Continuar: T2 E5 · 12 min restante'), {
      season: 2,
      episode: 5,
    });
  });

  it('reconhece o status da linha da Crunchyroll', () => {
    assert.equal(parseQueueStatus('Continuar: T2 E5'), 'continuar');
    assert.equal(parseQueueStatus('A seguir: E3'), 'seguir');
    assert.equal(parseQueueStatus('Começar a assistir: E1'), 'comecar');
    assert.equal(parseQueueStatus('Assistir de novo: E12'), 'novamente');
    assert.equal(parseQueueStatus('12 min restante'), null);
  });
});
