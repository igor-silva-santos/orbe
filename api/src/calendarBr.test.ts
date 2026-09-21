import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calendarDateKeyFromValue, isCalendarDateTodayOrFutureBr } from './calendarBr';

describe('calendarBr — próximo episódio', () => {
  it('data TMDB meia-noite UTC conta como dia de calendário', () => {
    const key = calendarDateKeyFromValue('2026-09-21');
    assert.equal(key, '2026-09-21');
  });

  it('episódio de hoje (BR) não é descartado por fuso', () => {
    const todayBr = new Date('2026-09-20T15:00:00-03:00');
    assert.equal(
      isCalendarDateTodayOrFutureBr(new Date('2026-09-20T00:00:00.000Z'), todayBr),
      true,
    );
  });

  it('episódio de ontem é descartado', () => {
    const todayBr = new Date('2026-09-21T10:00:00-03:00');
    assert.equal(
      isCalendarDateTodayOrFutureBr(new Date('2026-09-20T00:00:00.000Z'), todayBr),
      false,
    );
  });
});
