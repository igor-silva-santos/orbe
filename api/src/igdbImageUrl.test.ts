import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolveIgdbImageUrl } from './igdbImageUrl';

describe('resolveIgdbImageUrl', () => {
  it('keeps proxy paths unchanged', () => {
    assert.equal(
      resolveIgdbImageUrl('/api/images/igdb/t_cover_big/co68xr.jpg'),
      '/api/images/igdb/t_cover_big/co68xr.jpg',
    );
  });

  it('converts direct IGDB URLs to proxy paths', () => {
    assert.equal(
      resolveIgdbImageUrl('https://images.igdb.com/igdb/image/upload/t_cover_big/co68xr.jpg'),
      '/api/images/igdb/t_cover_big/co68xr.jpg',
    );
  });

  it('converts protocol-relative IGDB URLs to proxy paths', () => {
    assert.equal(
      resolveIgdbImageUrl('//images.igdb.com/igdb/image/upload/t_cover_big/co68xr.jpg'),
      '/api/images/igdb/t_cover_big/co68xr.jpg',
    );
  });
});
