/// <reference types="node" />
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildIngressoSlugCandidates,
  DEFAULT_CITY_IDS,
  INGRESSO_CITY_IDS,
  pickBestMatch,
  slugify,
  type IngressoEvent,
} from './ingressoClient';

const perdidaNoArtico: IngressoEvent = {
  id: '32826',
  title: 'Perdida No Ártico',
  originalTitle: 'Ice skater',
  type: 'Filme',
  urlKey: 'perdida-no-artico',
  inPreSale: false,
  isPlaying: false,
  countIsPlaying: 0,
};

describe('ingressoClient matching', () => {
  it('mantém lista de cidades do ingresso.com não vazia', () => {
    assert.ok(INGRESSO_CITY_IDS.length > 0);
    assert.ok(DEFAULT_CITY_IDS.length > 0);
    assert.deepEqual(DEFAULT_CITY_IDS, [...INGRESSO_CITY_IDS]);
    assert.ok(INGRESSO_CITY_IDS.includes(1));
    assert.ok(INGRESSO_CITY_IDS.includes(2));
    assert.ok(INGRESSO_CITY_IDS.includes(10));
  });

  it('gera slug brasileiro para titulo localizado', () => {
    const slugs = buildIngressoSlugCandidates({
      title: 'Perdida no Ártico',
      originalTitle: 'Ice Skater',
      releaseDate: new Date('2026-08-20'),
    });

    assert.ok(slugs.indexOf('perdida-no-artico') >= 0);
    assert.ok(slugs.indexOf('perdida-no-artico-2026') >= 0);
  });

  it('faz match por titulo original quando o TMDB ainda usa titulo em ingles', () => {
    const match = pickBestMatch(
      { title: 'Ice Skater', originalTitle: 'Ice Skater' },
      [perdidaNoArtico],
      'catalog',
    );

    assert.equal(match?.urlKey, 'perdida-no-artico');
  });

  it('faz match por titulo brasileiro no catalogo', () => {
    const match = pickBestMatch(
      { title: 'Perdida no Ártico', originalTitle: 'Ice Skater' },
      [perdidaNoArtico],
      'catalog',
    );

    assert.equal(match?.urlKey, 'perdida-no-artico');
  });

  it('usa tituloBr persistido para gerar slug do ingresso', () => {
    const slugs = buildIngressoSlugCandidates({
      title: 'Ice Skater',
      originalTitle: 'Ice Skater',
      tituloBr: 'Perdida no Ártico',
      releaseDate: new Date('2026-08-20'),
    });

    assert.ok(slugs.indexOf('perdida-no-artico') >= 0);
  });

  it('faz match via tituloBr quando title do TMDB esta em ingles', () => {
    const match = pickBestMatch(
      {
        title: 'Ice Skater',
        originalTitle: 'Ice Skater',
        tituloBr: 'Perdida no Ártico',
      },
      [perdidaNoArtico],
      'catalog',
    );

    assert.equal(match?.urlKey, 'perdida-no-artico');
  });

  it('slugifica acentos como o ingresso.com', () => {
    assert.equal(slugify('Perdida no Ártico'), 'perdida-no-artico');
  });
});
