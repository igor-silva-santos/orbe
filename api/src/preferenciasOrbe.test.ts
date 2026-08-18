/// <reference types="node" />
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getDefaultPreferenciasOrbe,
  mergePreferenciasOrbe,
} from './preferenciasOrbe';

describe('preferencias Orbe', () => {
  it('getDefaultPreferenciasOrbe retorna shape completo', () => {
    const prefs = getDefaultPreferenciasOrbe(true);
    assert.equal(prefs.personalizacaoAtiva, false);
    assert.equal(prefs.onboardingCompleto, false);
    assert.equal(prefs.querAvaliar, true);
    assert.equal(prefs.carrosseis.length, 4);
    assert.deepEqual(
      prefs.carrosseis.map((c) => c.id),
      ['filmes', 'series', 'animes', 'jogos'],
    );
    assert.deepEqual(prefs.tasteProfile.tiposAtivos, []);
  });

  it('mergePreferenciasOrbe com null aplica defaults', () => {
    const merged = mergePreferenciasOrbe(null, { querAvaliar: false });
    assert.equal(merged.querAvaliar, false);
    assert.equal(merged.carrosseis.length, 4);
    assert.equal(merged.personalizacaoAtiva, false);
  });

  it('mergePreferenciasOrbe preserva campos legados no root', () => {
    const merged = mergePreferenciasOrbe({ tema: 'dark', personalizacaoAtiva: true });
    assert.equal(merged.tema, 'dark');
    assert.equal(merged.personalizacaoAtiva, true);
    assert.equal(merged.carrosseis.length, 4);
  });

  it('mergePreferenciasOrbe mescla carrossel parcial', () => {
    const merged = mergePreferenciasOrbe({
      carrosseis: [{ id: 'jogos', visivel: false, ordem: 0 }],
    });
    const jogos = merged.carrosseis.find((c) => c.id === 'jogos');
    assert.ok(jogos);
    assert.equal(jogos!.visivel, false);
    assert.equal(jogos!.ordem, 0);
    const filmes = merged.carrosseis.find((c) => c.id === 'filmes');
    assert.ok(filmes);
    assert.equal(filmes!.visivel, true);
  });

  it('mergePreferenciasOrbe usa querAvaliar da coluna User quando ausente no JSON', () => {
    const merged = mergePreferenciasOrbe({}, { querAvaliar: false });
    assert.equal(merged.querAvaliar, false);
  });

  it('mergePreferenciasOrbe JSON sobrescreve querAvaliar da coluna', () => {
    const merged = mergePreferenciasOrbe({ querAvaliar: true }, { querAvaliar: false });
    assert.equal(merged.querAvaliar, true);
  });
});
