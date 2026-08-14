import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolveTmdbRelease, resolveIgdbRelease, isYearWithinRange } from './yearOnlyRelease';

describe('resolveTmdbRelease', () => {
  it('returns full date when release_date is complete', () => {
    const result = resolveTmdbRelease('2026-09-15', 'Released');
    assert.equal(result.isYearOnly, false);
    assert.ok(result.calendarDate);
    assert.equal(result.releaseYear, 2026);
  });

  it('returns year-only for Planned with Jan 1 placeholder', () => {
    const result = resolveTmdbRelease('2028-01-01', 'Planned');
    assert.equal(result.isYearOnly, true);
    assert.equal(result.calendarDate, null);
    assert.equal(result.releaseYear, 2028);
  });
});

describe('resolveIgdbRelease', () => {
  it('returns year-only from TBD release_dates category', () => {
    const result = resolveIgdbRelease({
      first_release_date: null,
      release_dates: [{ date: 1861910400, category: 7 }],
    });
    assert.equal(result.isYearOnly, true);
    assert.equal(result.calendarDate, null);
    assert.ok(result.releaseYear);
  });
});

describe('isYearWithinRange', () => {
  it('matches year inside period', () => {
    const start = new Date('2023-01-01');
    const end = new Date('2024-12-31');
    assert.equal(isYearWithinRange(2024, start, end), true);
    assert.equal(isYearWithinRange(2026, start, end), false);
  });
});
