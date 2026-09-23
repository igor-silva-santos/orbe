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
  filterMidiaForCarouselTimeline,
  indexOfYearTbdSeparator,
  isCarouselBootstrapReady,
  parseMidiaReleaseDate,
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
  const today = new Date(2026, 8, 15); // 15/09/2026

  it('returns 0 for empty list', () => {
    assert.equal(resolveCarouselOpenIndex([]), 0);
  });

  it('opens on the next upcoming title, not an older release', () => {
    const items = [
      mockMidia(1, '2026-07-01'),
      mockMidia(2, '2026-07-15'),
      mockMidia(3, '2026-08-05'),
      mockMidia(4, '2026-08-20'),
      mockMidia(5, '2026-09-01'),
      mockMidia(6, '2026-09-20'),
    ];
    assert.equal(resolveCarouselOpenIndex(items, today), 5);
    assert.equal(resolveCarouselOpenMonthKey(items, today), '2026-09');
    assert.equal(isCarouselOpenIndexReady(items, 5, today), true);
  });

  it('when all releases are past, opens on the most recent one', () => {
    const items = [
      mockMidia(1, '2026-08-01'),
      mockMidia(2, '2026-08-15'),
      mockMidia(3, '2026-09-05'),
      mockMidia(4, '2026-09-10'),
    ];
    assert.equal(resolveCarouselOpenIndex(items, today), 3);
  });

  it('opens on a title released today', () => {
    const items = [
      mockMidia(1, '2026-09-10'),
      mockMidia(2, '2026-09-15'),
      mockMidia(3, '2026-09-20'),
    ];
    assert.equal(resolveCarouselOpenIndex(items, today), 1);
  });

  it('when only future releases exist, opens on the next upcoming', () => {
    const items = [
      mockMidia(1, '2026-09-20'),
      mockMidia(2, '2026-10-05'),
    ];
    assert.equal(resolveCarouselOpenIndex(items, today), 0);
    assert.equal(isCarouselOpenIndexReady(items, 0, today), true);
  });

  it('when data ends before current month, still opens on last released', () => {
    const items = [
      mockMidia(1, '2026-07-01'),
      mockMidia(2, '2026-07-15'),
      mockMidia(3, '2026-07-28'),
    ];
    assert.equal(resolveCarouselOpenMonthKey(items, today), '2026-07');
    assert.equal(isCarouselOpenIndexReady(items, 2, today), true);
  });

  it('after prepending the previous month, still opens on the next upcoming', () => {
    const today = new Date(2026, 8, 16);
    const september = [
      mockMidia(10, '2026-09-03'),
      mockMidia(11, '2026-09-16'),
      mockMidia(12, '2026-09-17'),
    ];
    const august = [
      mockMidia(1, '2026-08-01'),
      mockMidia(2, '2026-08-05'),
      mockMidia(3, '2026-08-20'),
    ];
    const merged = mergeMediaByDate(september, august);
    const open = resolveCarouselOpenIndex(merged, today);
    assert.equal(merged[open].id, 11);
    assert.equal(monthKeyFromItem(merged[open]), '2026-09');
  });

  it('does not skip the next upcoming in favor of a past title', () => {
    const items = [
      mockMidia(1, '2026-08-31'),
      mockMidia(2, '2026-09-01'),
      mockMidia(3, '2026-09-20'),
    ];
    assert.equal(resolveCarouselOpenMonthKey(items, today), '2026-09');
    assert.equal(resolveCarouselOpenIndex(items, today), 2);
    assert.equal(monthKeyFromItem(items[resolveCarouselOpenIndex(items, today)]), '2026-09');
  });

  it('ignores historical re-releases when opening the carousel', () => {
    const items = [
      mockMidia(1, '1943-09-17'),
      mockMidia(2, '1966-08-15'),
      mockMidia(3, '2026-07-01'),
      mockMidia(4, '2026-08-05'),
    ];
    assert.equal(resolveCarouselOpenIndex(items, today), 3);
    assert.equal(monthKeyFromItem(items[resolveCarouselOpenIndex(items, today)]), '2026-08');
  });

  it('does not jump to index 0 when historical titles pollute the list', () => {
    const items = [
      mockMidia(1, '1943-09-17'),
      mockMidia(2, '2026-07-01'),
      mockMidia(3, '2026-07-15'),
    ];
    const index = resolveCarouselOpenIndex(items, today);
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

describe('indexOfYearTbdSeparator', () => {
  it('aponta para o separador após os cards datados', () => {
    const ref = new Date('2026-09-22');
    const slidesByYear: Record<number, unknown[]> = {
      2026: [{ kind: 'sep' }, { kind: 'media' }],
      2027: [{ kind: 'sep' }, { kind: 'media' }, { kind: 'media' }],
    };
    assert.equal(indexOfYearTbdSeparator(2027, 40, slidesByYear, ref), 42);
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
  it('returns true when last released is in a previous month', () => {
    const items = [mockMidia(1, '2026-07-01'), mockMidia(2, '2026-07-15')];
    assert.equal(isCarouselBootstrapReady(items, new Date(2026, 7, 14)), true);
  });

  it('returns true when current month has a last released title', () => {
    const items = [
      mockMidia(1, '2026-07-01'),
      mockMidia(2, '2026-08-05'),
      mockMidia(3, '2026-08-20'),
    ];
    assert.equal(isCarouselBootstrapReady(items, new Date(2026, 7, 14)), true);
  });
});

describe('parseMidiaReleaseDate', () => {
  it('prefers a future nextAiringEpisode over an older carousel date', () => {
    const item = {
      ...mockMidia(1, '2026-09-10'),
      nextAiringEpisode: {
        airingAt: '2026-10-15T12:00:00.000Z',
        episode: 5,
        season: 2,
      },
    };
    const date = parseMidiaReleaseDate(item);
    assert.equal(date?.getFullYear(), 2026);
    assert.equal(date?.getMonth(), 9);
    assert.equal(date?.getDate(), 15);
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
