import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

process.env.DATABASE_URL ||= 'postgresql://127.0.0.1:5432/orbe_test';

describe('minha lista de animes', () => {
  it('infere começar, continuar e seguir a partir do episódio', async () => {
    const { inferStatusFromProgress } = await import('./watchlistAnimeService');
    assert.equal(inferStatusFromProgress(0, null), 'comecar');
    assert.equal(inferStatusFromProgress(5, 720), 'continuar');
    assert.equal(inferStatusFromProgress(5, 0), 'seguir');
    assert.equal(inferStatusFromProgress(5, null), 'seguir');
  });

  it('aceita terminado e novamente no progresso manual', async () => {
    const { validateWatchlistAnimeUpdatePayload } = await import('./watchlistAnimeService');
    assert.equal(
      validateWatchlistAnimeUpdatePayload({
        season: 2,
        episode: 5,
        totalEpisodes: 0,
        remainingTimeSec: 0,
        status: 'terminado',
      }),
      true
    );
    assert.equal(validateWatchlistAnimeUpdatePayload({ status: 'novamente', episode: 3 }), true);
    assert.equal(validateWatchlistAnimeUpdatePayload({ status: 'inventado' }), false);
  });

  it('preserva dublagem, tempo restante e status no sync moderno', async () => {
    const { resolveWatchlistImportItem } = await import('./watchlistAnimeService');
    const item = resolveWatchlistImportItem({
      crunchyrollId: 'GRMG8KNRX',
      title: 'Demon Slayer',
      crunchyrollUrl: 'https://www.crunchyroll.com/pt-br/series/GRMG8KNRX/demon-slayer',
      season: 3,
      episode: 5,
      totalEpisodes: 0,
      episodeDurationSec: 1440,
      remainingTimeSec: 720,
      hasDub: true,
      status: 'continuar',
    });

    assert.ok(item);
    assert.equal(item?.crunchyrollId, 'GRMG8KNRX');
    assert.equal(item?.hasDub, true);
    assert.equal(item?.remainingTimeSec, 720);
    assert.equal(item?.episodeDurationSec, 1440);
    assert.equal(item?.status, 'continuar');
    assert.equal(item?.totalEpisodes, undefined);
    assert.match(item?.crunchyrollUrl || '', /pt-br\/series\/GRMG8KNRX/);
  });

  it('converte backup legado com URL pt-BR, dub e episódio', async () => {
    const { resolveWatchlistImportItem } = await import('./watchlistAnimeService');
    const item = resolveWatchlistImportItem({
      q: 'One Piece',
      malId: 21,
      ep: 1100,
      s: 1,
      tot: 0,
      dub: true,
      st: 'seguir',
      cr: 'https://www.crunchyroll.com/pt-br/series/GRMG8KNRX',
      note: 'Assistir com calma',
    });

    assert.ok(item);
    assert.equal(item?.crunchyrollId, 'GRMG8KNRX');
    assert.equal(item?.title, 'One Piece');
    assert.equal(item?.episode, 1100);
    assert.equal(item?.hasDub, true);
    assert.equal(item?.status, 'seguir');
    assert.equal(item?.malId, 21);
    assert.equal(item?.totalEpisodes, undefined);
    assert.equal(item?.note, 'Assistir com calma');
  });

  it('ignora item sem título', async () => {
    const { resolveWatchlistImportItem } = await import('./watchlistAnimeService');
    assert.equal(resolveWatchlistImportItem({ crunchyrollId: 'ABC', episode: 1 }), null);
  });
});
