import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isAllowedPosterUrl, resolveDealImageUrl, steamLibraryImageUrl } from './dealImages';

describe('resolveDealImageUrl', () => {
  it('usa a library da Steam em vez da capsule que o Fastly bloqueia', () => {
    const url = resolveDealImageUrl(
      'https://shared.fastly.steamstatic.com/steam/apps/292030/capsule_616x353.jpg',
      292030,
    );
    assert.equal(url, steamLibraryImageUrl(292030));
    assert.equal(url?.includes('capsule_616x353'), false);
    assert.match(url ?? '', /cdn\.cloudflare\.steamstatic\.com\/steam\/apps\/292030\/library_600x900\.jpg$/);
  });

  it('mantém a imagem original quando não há appId', () => {
    assert.equal(
      resolveDealImageUrl('https://www.gamerpower.com/offers/1b/6aff1d0e4942d.jpg', null),
      'https://www.gamerpower.com/offers/1b/6aff1d0e4942d.jpg',
    );
  });
});

describe('isAllowedPosterUrl', () => {
  it('aceita capas da GamerPower e da Steam', () => {
    assert.equal(isAllowedPosterUrl('https://www.gamerpower.com/offers/1b/6aff1d0e4942d.jpg'), true);
    assert.equal(isAllowedPosterUrl('https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg'), true);
    assert.equal(
      isAllowedPosterUrl(
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4108000/00ae7d0e0fd0ad72635bddb1dd80ee68cc94eed5/header.jpg',
      ),
      true,
    );
  });

  it('recusa hosts fora da allowlist e caminhos que não são imagem', () => {
    assert.equal(isAllowedPosterUrl('https://example.com/offers/1b/6aff1d0e4942d.jpg'), false);
    assert.equal(isAllowedPosterUrl('http://www.gamerpower.com/offers/1b/6aff1d0e4942d.jpg'), false);
    assert.equal(isAllowedPosterUrl('https://www.gamerpower.com/api/giveaways'), false);
    assert.equal(isAllowedPosterUrl('https://www.gamerpower.com/not-offers/6aff1d0e4942d.jpg'), false);
    assert.equal(isAllowedPosterUrl('not a url'), false);
  });
});
