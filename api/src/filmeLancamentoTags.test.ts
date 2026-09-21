import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getBrWeekRangeKeys,
  isFilmeEstreiaSemanaBr,
  resolveFilmeDestaqueFields,
} from './filmeLancamentoTags';

describe('filmeLancamentoTags', () => {
  it('semana BR domingo–sábado contém o dia de referência', () => {
    const now = new Date('2026-09-17T15:00:00-03:00');
    const { start, end } = getBrWeekRangeKeys(now);
    assert.ok(start <= '2026-09-17' && end >= '2026-09-17');
    assert.equal(isFilmeEstreiaSemanaBr(start, now), true);
    assert.equal(isFilmeEstreiaSemanaBr('2020-01-01', now), false);
  });

  it('pílula do card prioriza estreia na semana sobre mais esperado', () => {
    const now = new Date('2026-09-17T12:00:00-03:00');
    const { start } = getBrWeekRangeKeys(now);
    const fields = resolveFilmeDestaqueFields(
      { tmdbId: 1, releaseDate: start },
      {
        maisEsperadoIds: new Set([1]),
        allowEstreiaSemana: true,
        now,
      },
    );
    assert.equal(fields.estreia_semana, true);
    assert.equal(fields.mais_esperado, true);
    assert.equal(fields.destaque_pill, 'estreia_semana');
  });

  it('home não exibe estreia na semana no card quando desligado', () => {
    const now = new Date('2026-09-17T12:00:00-03:00');
    const { start } = getBrWeekRangeKeys(now);
    const fields = resolveFilmeDestaqueFields(
      { tmdbId: 2, releaseDate: start },
      {
        maisEsperadoIds: new Set([2]),
        allowEstreiaSemana: false,
        now,
      },
    );
    assert.equal(fields.estreia_semana, false);
    assert.equal(fields.destaque_pill, 'mais_esperado');
  });
});
