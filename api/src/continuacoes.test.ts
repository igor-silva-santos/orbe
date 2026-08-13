import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parsePositiveIntId } from './routes/mediaRoutesHelpers';
import { parseSagasLimit, DEFAULT_SAGAS_LIMIT, MAX_SAGAS_LIMIT } from './continuacoesValidation';
import { relacaoPorData } from './continuacoesService';

describe('parsePositiveIntId', () => {
  it('aceita inteiros positivos', () => {
    assert.equal(parsePositiveIntId('1'), 1);
    assert.equal(parsePositiveIntId('99999'), 99999);
  });

  it('rejeita IDs inválidos', () => {
    assert.equal(parsePositiveIntId('0'), null);
    assert.equal(parsePositiveIntId('-1'), null);
    assert.equal(parsePositiveIntId('abc'), null);
    assert.equal(parsePositiveIntId('1.5'), null);
    assert.equal(parsePositiveIntId(''), null);
    assert.equal(parsePositiveIntId('1; DROP TABLE'), null);
  });
});

describe('parseSagasLimit', () => {
  it('usa default quando ausente ou inválido', () => {
    assert.equal(parseSagasLimit(undefined), DEFAULT_SAGAS_LIMIT);
    assert.equal(parseSagasLimit(null), DEFAULT_SAGAS_LIMIT);
    assert.equal(parseSagasLimit(''), DEFAULT_SAGAS_LIMIT);
    assert.equal(parseSagasLimit('abc'), DEFAULT_SAGAS_LIMIT);
    assert.equal(parseSagasLimit('-5'), DEFAULT_SAGAS_LIMIT);
    assert.equal(parseSagasLimit('0'), DEFAULT_SAGAS_LIMIT);
  });

  it('limita ao máximo permitido', () => {
    assert.equal(parseSagasLimit('10'), 10);
    assert.equal(parseSagasLimit('500'), MAX_SAGAS_LIMIT);
    assert.equal(parseSagasLimit(MAX_SAGAS_LIMIT + 1), MAX_SAGAS_LIMIT);
  });
});

describe('relacaoPorData', () => {
  const older = new Date('2020-01-01');
  const newer = new Date('2024-01-01');

  it('classifica sequência e prequela na mesma saga', () => {
    assert.equal(relacaoPorData(newer, older, true), 'precuela');
    assert.equal(relacaoPorData(newer, newer, true), 'sequencia');
    assert.equal(relacaoPorData(older, newer, true), 'sequencia');
  });

  it('retorna mesma_saga quando datas ausentes', () => {
    assert.equal(relacaoPorData(null, newer, true), 'mesma_saga');
    assert.equal(relacaoPorData(newer, null, true), 'mesma_saga');
  });

  it('fora da saga vira recomendado', () => {
    assert.equal(relacaoPorData(newer, older, false), 'recomendado');
  });
});
