import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { pickCarouselAirings } from './animeCarouselAiring';

describe('pickCarouselAirings', () => {
  // Quinta 26/11/2026 15:00 BRT
  const now = new Date('2026-11-26T18:00:00.000Z');

  it('mantém o episódio já exibido na semana e o próximo futuro', () => {
    const picked = pickCarouselAirings(
      [
        { airingAt: '2026-11-23T15:00:00.000Z', episode: 8 },
        { airingAt: '2026-11-30T15:00:00.000Z', episode: 9 },
      ],
      now,
    );

    assert.equal(picked.weekAiringEpisodes.length, 1);
    assert.equal(picked.weekAiringEpisodes[0]?.episode, 8);
    assert.equal(picked.nextAiringEpisode?.episode, 9);
  });

  it('trata domingo à noite no Brasil como episódio desta semana', () => {
    // Domingo 22/11/2026 23:00 BRT = segunda 02:00 UTC
    const picked = pickCarouselAirings(
      [{ airingAt: '2026-11-23T02:00:00.000Z', episode: 3 }],
      now,
    );

    assert.equal(picked.weekAiringEpisodes.length, 1);
    assert.equal(picked.weekAiringEpisodes[0]?.episode, 3);
    assert.equal(picked.nextAiringEpisode, null);
  });

  it('recoloca o episódio já exibido quando o banco só tem o da próxima semana', () => {
    // Próxima segunda 30/11 12:00 BRT; o episódio 8 foi nesta segunda.
    const picked = pickCarouselAirings(
      [{ airingAt: '2026-11-30T15:00:00.000Z', episode: 9 }],
      now,
    );

    assert.equal(picked.weekAiringEpisodes.length, 1);
    assert.equal(picked.weekAiringEpisodes[0]?.episode, 8);
    assert.equal(picked.weekAiringEpisodes[0]?.airingAt, '2026-11-23T15:00:00.000Z');
    assert.equal(picked.nextAiringEpisode?.episode, 9);
  });

  it('não inventa episódio de estreia nem de quinzena', () => {
    const premiere = pickCarouselAirings(
      [{ airingAt: '2026-12-03T15:00:00.000Z', episode: 1 }],
      now,
    );
    assert.deepEqual(premiere.weekAiringEpisodes, []);

    const biweekly = pickCarouselAirings(
      [{ airingAt: '2026-12-10T15:00:00.000Z', episode: 6 }],
      now,
    );
    assert.deepEqual(biweekly.weekAiringEpisodes, []);
    assert.equal(biweekly.nextAiringEpisode?.episode, 6);
  });

  it('não duplica o dia quando o episódio desta semana já veio no horário', () => {
    const picked = pickCarouselAirings(
      [
        { airingAt: '2026-11-23T15:00:00.000Z', episode: 8 },
        { airingAt: '2026-11-30T15:00:00.000Z', episode: 9 },
      ],
      now,
    );

    assert.equal(picked.weekAiringEpisodes.length, 1);
    assert.equal(picked.weekAiringEpisodes[0]?.episode, 8);
  });
});
