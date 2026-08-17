import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { Anime } from '@/types';
import {
  ANIME_AGENDA_UNSCHEDULED_LABEL,
  buildWeeklyAnimeAgendaItems,
  getCalendarWeekBounds,
  isDateWithinWeek,
  resolveWeeklyAgendaStartIndex,
} from './carousel-anime-agenda';

function mockAnime(
  id: number,
  options: {
    airingAt?: string;
    startDate?: { year: number; month: number; day: number };
  },
): Anime {
  return {
    id,
    titulo_curado: `Anime ${id}`,
    titulo_api: `Anime ${id}`,
    poster_url_api: '',
    sinopse_api: '',
    plataformas_api: [],
    generos_api: [],
    format: 'TV',
    fonte: 'test',
    estudio: 'test',
    dublagem_info: null,
    staff: [],
    personagens: [],
    relacionados: [],
    temporadas: [],
    episodios: [],
    trailers: [],
    startDate: options.startDate,
    nextAiringEpisode: options.airingAt
      ? { episode: 1, airingAt: options.airingAt }
      : undefined,
  } as Anime;
}

describe('buildWeeklyAnimeAgendaItems', () => {
  const week = getCalendarWeekBounds(new Date('2026-08-17T12:00:00')); // segunda

  it('agrupa episódios da semana corrente por dia', () => {
    const items = buildWeeklyAnimeAgendaItems(
      [
        mockAnime(1, { airingAt: '2026-08-17T21:00:00' }),
        mockAnime(2, { airingAt: '2026-08-19T21:00:00' }),
      ],
      undefined,
      week,
    );

    assert.equal(items.filter((item) => item.type === 'separator').length, 2);
    assert.equal(items.filter((item) => item.type === 'media').length, 2);
  });

  it('usa startDate apenas quando cai na semana corrente', () => {
    const items = buildWeeklyAnimeAgendaItems(
      [
        mockAnime(1, { startDate: { year: 2026, month: 8, day: 17 } }),
        mockAnime(2, { startDate: { year: 2025, month: 1, day: 5 } }),
      ],
      undefined,
      week,
    );

    assert.equal(items.filter((item) => item.type === 'media').length, 2);
    assert.ok(
      items.some(
        (item) => item.type === 'separator' && item.dayName === ANIME_AGENDA_UNSCHEDULED_LABEL,
      ),
    );
    assert.ok(
      items.some(
        (item) => item.type === 'separator' && item.dayName === 'Segunda',
      ),
    );
  });

  it('ignora nextAiringEpisode fora da semana', () => {
    const items = buildWeeklyAnimeAgendaItems(
      [mockAnime(1, { airingAt: '2026-09-01T21:00:00' })],
      undefined,
      week,
    );

    assert.equal(items.length, 0);
  });
});

describe('resolveWeeklyAgendaStartIndex', () => {
  it('prioriza o separador do dia atual', () => {
    const items = buildWeeklyAnimeAgendaItems(
      [mockAnime(1, { airingAt: '2026-08-17T21:00:00' })],
      undefined,
      getCalendarWeekBounds(new Date('2026-08-17T12:00:00')),
    );

    const startIndex = resolveWeeklyAgendaStartIndex(
      items,
      undefined,
      new Date('2026-08-17T12:00:00'),
    );

    assert.equal(items[startIndex]?.type, 'separator');
    assert.equal(
      items[startIndex]?.type === 'separator' ? items[startIndex].dayName : '',
      'Segunda',
    );
  });

  it('vai para o próximo dia com episódio quando hoje não tem agenda', () => {
    const week = getCalendarWeekBounds(new Date('2026-08-17T12:00:00'));
    const items = buildWeeklyAnimeAgendaItems(
      [mockAnime(1, { airingAt: '2026-08-19T21:00:00' })],
      undefined,
      week,
    );

    const startIndex = resolveWeeklyAgendaStartIndex(
      items,
      undefined,
      new Date('2026-08-17T12:00:00'),
    );

    assert.equal(items[startIndex]?.type, 'separator');
    assert.equal(
      items[startIndex]?.type === 'separator' ? items[startIndex].dayName : '',
      'Quarta',
    );
  });
});

describe('isDateWithinWeek', () => {
  it('valida limites da semana', () => {
    const week = getCalendarWeekBounds(new Date('2026-08-17T12:00:00'));
    assert.equal(isDateWithinWeek(new Date('2026-08-17T00:00:00'), week), true);
    assert.equal(isDateWithinWeek(new Date('2026-08-10T00:00:00'), week), false);
  });
});
