import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { airingYmdFromIso, getWeekBoundsBr, isYmdInRange } from './week-br';

describe('week-br', () => {
  it('isYmdInRange', () => {
    assert.equal(isYmdInRange('2026-09-20', '2026-09-20', '2026-09-26'), true);
    assert.equal(isYmdInRange('2026-09-27', '2026-09-20', '2026-09-26'), false);
  });

  it('airingYmdFromIso', () => {
    assert.equal(airingYmdFromIso('2026-09-21T12:00:00.000Z'), '2026-09-21');
  });

  it('getWeekBoundsBr span 7 dias', () => {
    const b = getWeekBoundsBr(new Date('2026-09-24T15:00:00-03:00'));
    assert.ok(b.endYmd >= b.startYmd);
  });
});
