import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getWeekdayInBrazil, getBrazilCalendarWeekBounds } from './brazil-timezone';
import {
  buildWeeklyAnimeAgendaItems,
  getCalendarWeekBounds,
} from './carousel-anime-agenda';
import type { Anime } from '@/types';

function mockAnime(id: number, nextAiringEpisode?: { episode: number; airingAt: string }): Anime {
  return {
    id,
    titulo_pt: `Anime ${id}`,
    titulo_original: `Anime ${id}`,
    poster_url_api: null,
    generos_api: [],
    nextAiringEpisode,
  } as Anime;
}

describe('getWeekdayInBrazil', () => {
  it('trata domingo à noite no BRT como domingo mesmo quando UTC já é segunda', () => {
    // Domingo 16/08/2026 21:00 BRT = Segunda 17/08/2026 00:00 UTC
    const sundayNightBrt = new Date('2026-08-17T00:00:00.000Z');
    assert.equal(getWeekdayInBrazil(sundayNightBrt), 0);
  });
});

describe('agenda semanal com fuso Brasil', () => {
  it('agrupa episódio de domingo à noite no separador Domingo', () => {
    const week = getCalendarWeekBounds(new Date('2026-08-16T12:00:00'));
    const items = buildWeeklyAnimeAgendaItems(
      [mockAnime(1, { episode: 5, airingAt: '2026-08-17T00:00:00.000Z' })],
      undefined,
      week,
    );

    const domingoSeparator = items.find(
      (item) => item.type === 'separator' && item.dayName === 'Domingo',
    );
    assert.ok(domingoSeparator);
    assert.equal(items.some((item) => item.type === 'media' && item.data.id === 1), true);
  });

  it('usa limites de semana no calendário brasileiro', () => {
    const week = getBrazilCalendarWeekBounds(new Date('2026-08-16T12:00:00'));
    assert.equal(getWeekdayInBrazil(week.start), 0);
    assert.equal(getWeekdayInBrazil(week.end), 6);
  });
});
