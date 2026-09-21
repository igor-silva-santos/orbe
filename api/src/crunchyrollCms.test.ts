import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildCatalogFromSeasonEpisodes, episodeHasPtBrDubAudio } from './crunchyrollCms';

describe('crunchyrollCms', () => {
  it('detecta áudio pt-BR nas versions', () => {
    assert.equal(
      episodeHasPtBrDubAudio({
        versions: [{ audio_locale: 'ja-JP' }, { audio_locale: 'pt-BR' }],
      }),
      true,
    );
    assert.equal(episodeHasPtBrDubAudio({ audio_locale: 'ja-JP' }), false);
  });

  it('conta fronteiras sub vs dub por temporada', () => {
    const snap = buildCatalogFromSeasonEpisodes([
      {
        season: { season_number: 1 },
        episodes: [
          { episode_number: 1, versions: [{ audio_locale: 'ja-JP' }, { audio_locale: 'pt-BR' }] },
          { episode_number: 2, versions: [{ audio_locale: 'ja-JP' }, { audio_locale: 'pt-BR' }] },
          { episode_number: 3, audio_locale: 'ja-JP' },
        ],
      },
      {
        season: { season_number: 2 },
        episodes: [
          { episode_number: 1, audio_locale: 'ja-JP' },
          { episode_number: 2, versions: [{ audio_locale: 'pt-BR' }] },
        ],
      },
    ]);
    assert.equal(snap.episodesSubCount, 5);
    assert.equal(snap.episodesDubPtBrCount, 3);
    assert.deepEqual(snap.dubPtBrFrontier, { season: 2, episode: 2 });
    assert.deepEqual(snap.subFrontier, { season: 2, episode: 2 });
  });
});
