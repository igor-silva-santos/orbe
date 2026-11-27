import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dealPosterCandidates } from './dealPosters';

function isBrowserBlocked(url: string): boolean {
  return url.startsWith('https://') && (url.includes('steamstatic.com') || url.includes('://www.gamerpower.com'));
}

describe('dealPosterCandidates', () => {
  it('não pede a capsule 616x353 nem a CDN da Steam', () => {
    const urls = dealPosterCandidates(
      'https://shared.fastly.steamstatic.com/steam/apps/292030/capsule_616x353.jpg',
      292030,
    );
    assert.deepEqual(urls, ['/api/images/steam/292030']);
    assert.equal(urls.some(isBrowserBlocked), false);
  });

  it('mantém a capa IGDB na frente e usa o proxy da Steam só como reserva', () => {
    const igdb = '/api/images/igdb/t_cover_big/co7ace.jpg';
    const urls = dealPosterCandidates(igdb, 292030);
    assert.deepEqual(urls, [igdb, '/api/images/steam/292030']);
  });

  it('GamerPower só passa pelo proxy same-origin', () => {
    const direct = 'https://www.gamerpower.com/offers/1b/689aece93310e.jpg';
    const urls = dealPosterCandidates(direct, null);
    assert.deepEqual(urls, [`/api/images/poster?url=${encodeURIComponent(direct)}&v=1`]);
    assert.equal(urls.some(isBrowserBlocked), false);
  });

  it('não pede library, header nem store_item_assets no navegador', () => {
    const library = 'https://cdn.cloudflare.steamstatic.com/steam/apps/1057090/library_600x900.jpg';
    const urls = dealPosterCandidates(library, 1057090);
    assert.deepEqual(urls, ['/api/images/steam/1057090']);
  });

  it('extrai o app id da URL da Steam quando o card não traz o id', () => {
    const header = 'https://cdn.akamai.steamstatic.com/steam/apps/4108000/header.jpg';
    const urls = dealPosterCandidates(header, null);
    assert.deepEqual(urls, ['/api/images/steam/4108000']);
  });

  it('mantém a capa de outra loja quando não é Steam nem GamerPower', () => {
    const epic = 'https://cdn1.epicgames.com/spt-assets/mark-of-the-deep.png';
    const urls = dealPosterCandidates(epic, null);
    assert.deepEqual(urls, [epic]);
  });
});
