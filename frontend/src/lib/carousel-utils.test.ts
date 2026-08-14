import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  isCarouselOpenIndexReady,
  resolveCarouselOpenIndex,
  resolveCarouselOpenMonthKey,
} from './carousel-utils';
import type { Midia } from '@/types';

function mockMidia(id: number, date: string): Midia {
  return {
    id,
    titulo_curado: `Item ${id}`,
    titulo_api: `Item ${id}`,
    poster_url_api: '',
    data_lancamento_api: date,
    sinopse_api: '',
    plataformas_api: [],
    generos_api: [],
  };
}

describe('resolveCarouselOpenIndex', () => {
  it('returns 0 for empty list', () => {
    assert.equal(resolveCarouselOpenIndex([]), 0);
  });

  it('returns first item of month with next release >= today', () => {
    const items = [
      mockMidia(1, '2026-07-01'),
      mockMidia(2, '2026-07-15'),
      mockMidia(3, '2026-08-05'),
      mockMidia(4, '2026-08-20'),
      mockMidia(5, '2026-09-01'),
    ];
    assert.equal(resolveCarouselOpenIndex(items), 2);
    assert.equal(resolveCarouselOpenMonthKey(items), '2026-08');
    assert.equal(isCarouselOpenIndexReady(items, 2), true);
  });

  it('when all releases are past, returns first item of current month', () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const prevMonth = today.getMonth() === 0 ? 12 : today.getMonth();
    const prevYear = today.getMonth() === 0 ? year - 1 : year;
    const prevMonthStr = String(prevMonth).padStart(2, '0');

    const items = [
      mockMidia(1, `${prevYear}-${prevMonthStr}-01`),
      mockMidia(2, `${prevYear}-${prevMonthStr}-15`),
      mockMidia(3, `${year}-${month}-05`),
      mockMidia(4, `${year}-${month}-10`),
    ];
    assert.equal(resolveCarouselOpenIndex(items), 2);
  });

  it('when data ends before current month, targets current month key for forward load', () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const twoMonthsAgo = new Date(year, month - 3, 1);
    const y = twoMonthsAgo.getFullYear();
    const m = String(twoMonthsAgo.getMonth() + 1).padStart(2, '0');

    const items = [
      mockMidia(1, `${y}-${m}-01`),
      mockMidia(2, `${y}-${m}-15`),
      mockMidia(3, `${y}-${m}-28`),
    ];
    assert.equal(resolveCarouselOpenMonthKey(items), `${year}-${String(month).padStart(2, '0')}`);
    assert.equal(isCarouselOpenIndexReady(items, 2), false);
  });
});
