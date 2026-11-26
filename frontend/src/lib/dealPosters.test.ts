import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dealPosterCandidates } from './dealPosters';

describe('dealPosterCandidates', () => {
  it('não pede a capsule 616x353 que responde 403/404', () => {
    const urls = dealPosterCandidates(
      'https://shared.fastly.steamstatic.com/steam/apps/292030/capsule_616x353.jpg',
      292030,
    );
    assert.equal(urls.some((url) => url.includes('capsule_616x353')), false);
    assert.equal(urls[0], 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg');
    assert.ok(urls.includes('https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg'));
    assert.ok(urls.includes('/api/images/steam/292030'));
  });

  it('mantém a capa IGDB na frente quando ela já vem do proxy', () => {
    const igdb = '/api/images/igdb/t_cover_big/co7ace.jpg';
    const urls = dealPosterCandidates(igdb, 292030);
    assert.equal(urls[0], igdb);
    assert.ok(urls.includes('https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg'));
  });

  it('tenta a imagem da GamerPower e depois o proxy same-origin', () => {
    const direct = 'https://www.gamerpower.com/offers/1b/689aece93310e.jpg';
    const urls = dealPosterCandidates(direct, null);
    assert.deepEqual(urls, [direct, `/api/images/poster?url=${encodeURIComponent(direct)}&v=1`]);
  });

  it('mantém a capa de outra loja quando não é Steam nem GamerPower', () => {
    const epic = 'https://cdn1.epicgames.com/spt-assets/mark-of-the-deep.png';
    const urls = dealPosterCandidates(epic, null);
    assert.deepEqual(urls, [epic]);
  });
});
