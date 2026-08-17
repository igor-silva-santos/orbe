import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getMediaCarouselLoopBounds,
  getCarouselNavWrapIndex,
  wrapCarouselIndex,
} from './carousel-loop';

describe('getMediaCarouselLoopBounds', () => {
  it('loops within dated timeline when in dated zone', () => {
    assert.deepEqual(getMediaCarouselLoopBounds(5, 10, 15), { start: 0, end: 9 });
    assert.deepEqual(getMediaCarouselLoopBounds(0, 10, 15), { start: 0, end: 9 });
  });

  it('extends end to year-tbd zone when already in append area', () => {
    assert.deepEqual(getMediaCarouselLoopBounds(12, 10, 15), { start: 0, end: 14 });
  });

  it('handles empty dated list', () => {
    assert.deepEqual(getMediaCarouselLoopBounds(0, 0, 0), { start: 0, end: 0 });
    assert.deepEqual(getMediaCarouselLoopBounds(2, 0, 5), { start: 0, end: 4 });
  });
});

describe('wrapCarouselIndex', () => {
  const bounds = { start: 0, end: 4 };

  it('keeps in-range indices', () => {
    assert.equal(wrapCarouselIndex(2, bounds), 2);
  });

  it('wraps forward overflow', () => {
    assert.equal(wrapCarouselIndex(5, bounds), 0);
    assert.equal(wrapCarouselIndex(6, bounds), 1);
  });

  it('wraps backward underflow', () => {
    assert.equal(wrapCarouselIndex(-1, bounds), 4);
    assert.equal(wrapCarouselIndex(-2, bounds), 3);
  });
});

describe('getCarouselNavWrapIndex', () => {
  it('wraps forward to first item', () => {
    assert.equal(getCarouselNavWrapIndex('next', 10), 0);
  });

  it('wraps backward to last item', () => {
    assert.equal(getCarouselNavWrapIndex('prev', 10), 9);
  });

  it('handles empty list', () => {
    assert.equal(getCarouselNavWrapIndex('next', 0), 0);
    assert.equal(getCarouselNavWrapIndex('prev', 0), 0);
  });
});
