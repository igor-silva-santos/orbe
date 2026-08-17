import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { BLUR_DATA_URL, getPosterBlurDataUrl } from './image-utils';

describe('getPosterBlurDataUrl', () => {
  it('returns default blur for empty src', () => {
    assert.equal(getPosterBlurDataUrl(null), BLUR_DATA_URL);
    assert.equal(getPosterBlurDataUrl(''), BLUR_DATA_URL);
  });

  it('returns deterministic blur per poster url', () => {
    const first = getPosterBlurDataUrl('/poster-a.jpg');
    const second = getPosterBlurDataUrl('/poster-b.jpg');
    const repeat = getPosterBlurDataUrl('/poster-a.jpg');

    assert.match(first, /^data:image\/svg\+xml;base64,/);
    assert.notEqual(first, second);
    assert.equal(first, repeat);
  });
});
