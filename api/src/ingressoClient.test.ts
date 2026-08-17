/// <reference types="node" />
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildIngressoSlugCandidates,
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

  it('slugifica acentos como o ingresso.com', () => {
    assert.equal(slugify('Perdida no Ártico'), 'perdida-no-artico');
  });
});
