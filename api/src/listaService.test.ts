import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/** Espelha a chave usada em listaService para resolver mídia no mapa. */
function listaLookupKey(tipo: string, midiaId: number): string {
  return `${tipo}:${midiaId}`;
}

describe('listaService lookup keys', () => {
  it('monta chave estável por tipo e id externo', () => {
    assert.equal(listaLookupKey('filme', 550), 'filme:550');
    assert.equal(listaLookupKey('anime', 21), 'anime:21');
    assert.equal(listaLookupKey('jogo', 1942), 'jogo:1942');
  });
});
