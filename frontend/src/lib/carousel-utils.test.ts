import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  addMonths,
  findMonthBounds,
  isCarouselOpenIndexReady,
  mergeMediaByDate,
  monthKeyFromItem,
  resolveCarouselOpenIndex,
  resolveCarouselOpenMonthKey,
  resolveDatedIndexForNavigation,
  clampCarouselOpenIndex,
  filterMidiaForCarouselTimeline,
  isCarouselBootstrapReady,
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

  it('returns next release >= today (not merely first item of that month)', () => {
    const items = [
      mockMidia(1, '2026-07-01'),
      mockMidia(2, '2026-07-15'),
      mockMidia(3, '2026-08-05'),
      mockMidia(4, '2026-08-20'),
      mockMidia(5, '2026-09-01'),
    ];
    assert.equal(resolveCarouselOpenIndex(items), 3);
    assert.equal(resolveCarouselOpenMonthKey(items), '2026-08');
    assert.equal(isCarouselOpenIndexReady(items, 3), true);
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

  it('when data ends before current month, title matches last available month', () => {
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
    assert.equal(resolveCarouselOpenMonthKey(items), `${y}-${m}`);
    assert.equal(isCarouselOpenIndexReady(items, 2), false);
  });

  it('does not show current month title when only past-month data is loaded', () => {
    const items = [
      mockMidia(1, '2026-05-22'),
      mockMidia(2, '2026-05-28'),
      mockMidia(3, '2026-05-31'),
    ];
    const index = resolveCarouselOpenIndex(items);
    const monthKey = monthKeyFromItem(items[index]);
    assert.equal(resolveCarouselOpenMonthKey(items), monthKey);
    assert.equal(monthKey, '2026-05');
  });

  it('does not open July when the next release is in August (July vs August bug)', () => {
    const items = [
      mockMidia(1, '2026-07-01'),
      mockMidia(2, '2026-07-31'),
      mockMidia(3, '2026-08-05'),
    ];
    assert.equal(resolveCarouselOpenMonthKey(items), '2026-08');
    assert.equal(resolveCarouselOpenIndex(items), 2);
    assert.equal(monthKeyFromItem(items[resolveCarouselOpenIndex(items)]), '2026-08');
  });

  it('ignores historical re-releases when opening the carousel', () => {
    const items = [
      mockMidia(1, '1943-09-17'),
      mockMidia(2, '1966-08-15'),
      mockMidia(3, '2026-07-01'),
      mockMidia(4, '2026-08-05'),
    ];
    assert.equal(resolveCarouselOpenIndex(items), 3);
    assert.equal(monthKeyFromItem(items[resolveCarouselOpenIndex(items)]), '2026-08');
  });

  it('does not jump to index 0 when target month is missing from polluted bootstrap data', () => {
    const items = [
      mockMidia(1, '1943-09-17'),
      mockMidia(2, '2026-07-01'),
      mockMidia(3, '2026-07-15'),
    ];
    const index = resolveCarouselOpenIndex(items);
    assert.notEqual(index, 0);
    assert.equal(monthKeyFromItem(items[index]), '2026-07');
  });
});

describe('mergeMediaByDate', () => {
  it('accumulates months when merging sequential fetches (parallel bootstrap pattern)', () => {
    const initial = [mockMidia(1, '2026-08-01'), mockMidia(2, '2026-08-20')];
    const september = [mockMidia(3, '2026-09-05'), mockMidia(4, '2026-09-15')];
    const october = [mockMidia(5, '2026-10-01')];

    let items = initial;
    items = mergeMediaByDate(items, september);
    items = mergeMediaByDate(items, october);

    assert.equal(items.length, 5);
    assert.equal(monthKeyFromItem(items[2]), '2026-09');
    assert.equal(monthKeyFromItem(items[4]), '2026-10');
  });
});

describe('addMonths', () => {
  it('advances to next month', () => {
    assert.deepEqual(addMonths(2026, 7, 1), { year: 2026, month: 8 });
  });

  it('retreats to previous month', () => {
    assert.deepEqual(addMonths(2026, 8, -1), { year: 2026, month: 7 });
  });

  it('rolls over year boundary forward', () => {
    assert.deepEqual(addMonths(2026, 12, 1), { year: 2027, month: 1 });
  });

  it('rolls over year boundary backward', () => {
    assert.deepEqual(addMonths(2026, 1, -1), { year: 2025, month: 12 });
  });
});

describe('findMonthBounds', () => {
  const items = [
    mockMidia(1, '2026-07-01'),
    mockMidia(2, '2026-07-15'),
    mockMidia(3, '2026-08-05'),
    mockMidia(4, '2026-08-20'),
    mockMidia(5, '2026-09-01'),
  ];

  it('returns start/end indices for a month block', () => {
    assert.deepEqual(findMonthBounds(items, '2026-07'), { start: 0, end: 1 });
    assert.deepEqual(findMonthBounds(items, '2026-08'), { start: 2, end: 3 });
  });

  it('returns null when month is absent', () => {
    assert.equal(findMonthBounds(items, '2026-06'), null);
  });

  it('supports edge-prefetch buffer checks used by prefetchMonthEdges', () => {
    const monthEdgeBuffer = 4;
    const augustBounds = findMonthBounds(items, '2026-08');
    assert.ok(augustBounds);

    const nearAugustEnd = augustBounds.end - 1;
    assert.ok(nearAugustEnd >= augustBounds.end - monthEdgeBuffer);

    const nearJulyStart = 0;
    const julyBounds = findMonthBounds(items, '2026-07');
    assert.ok(julyBounds);
    assert.ok(nearJulyStart <= julyBounds.start + monthEdgeBuffer);
  });
});

describe('filterMidiaForCarouselTimeline', () => {
  it('removes historical re-releases outside the 90-day window', () => {
    const items = [
      mockMidia(1, '1943-09-17'),
      mockMidia(2, '2026-07-01'),
      mockMidia(3, '2026-08-05'),
    ];
    const filtered = filterMidiaForCarouselTimeline(items, new Date('2026-08-14'));
    assert.equal(filtered.length, 2);
    assert.equal(filtered[0].id, 2);
    assert.equal(filtered[1].id, 3);
  });
});

describe('isCarouselBootstrapReady', () => {
  it('returns false until current month data exists', () => {
    const items = [mockMidia(1, '2026-07-01'), mockMidia(2, '2026-07-15')];
    assert.equal(isCarouselBootstrapReady(items, new Date('2026-08-14')), false);
  });

  it('returns true when current month has a future release', () => {
    const items = [
      mockMidia(1, '2026-07-01'),
      mockMidia(2, '2026-08-05'),
      mockMidia(3, '2026-08-20'),
    ];
    assert.equal(isCarouselBootstrapReady(items, new Date('2026-08-14')), true);
  });
});

describe('resolveDatedIndexForNavigation', () => {
  it('returns datedIndex for dated slides', () => {
    assert.equal(resolveDatedIndexForNavigation({ kind: 'dated', datedIndex: 3 }, 10), 3);
  });

  it('returns last dated item when in year-tbd zone', () => {
    assert.equal(resolveDatedIndexForNavigation({ kind: 'year-tbd-media' }, 5), 4);
    assert.equal(resolveDatedIndexForNavigation({ kind: 'year-tbd-separator', year: 2028 }, 3), 2);
  });
});

describe('clampCarouselOpenIndex', () => {
  const items = [
    mockMidia(1, '2026-08-01'),
    mockMidia(2, '2026-08-20'),
    mockMidia(3, '2026-09-01'),
  ];

  it('keeps valid index', () => {
    assert.equal(clampCarouselOpenIndex(items, 1), 1);
  });

  it('falls back to open index when out of range', () => {
    assert.equal(clampCarouselOpenIndex(items, 99), resolveCarouselOpenIndex(items));
  });
});

describe('monthKeyFromItem year-only isolation', () => {
  it('returns null for year-only items (excluded from monthly timeline)', () => {
    const item = {
      id: 99,
      titulo_curado: 'Spider-Man 2028',
      titulo_api: 'Spider-Man 2028',
      poster_url_api: '',
      data_lancamento_api: null,
      ano_lancamento_api: 2028,
      data_lancamento_confirmada: false,
      sinopse_api: '',
      plataformas_api: [],
      generos_api: [],
    } as Midia;
    assert.equal(monthKeyFromItem(item), null);
  });
});
