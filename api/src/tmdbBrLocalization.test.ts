/// <reference types="node" />
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getBrTitleFromTranslations,
  resolveMovieTituloBr,
  type TmdbTranslationEntry,
} from './tmdbBrLocalization';

describe('tmdbBrLocalization tituloBr', () => {
  const translations: TmdbTranslationEntry[] = [
    {
      iso_3166_1: 'BR',
      iso_639_1: 'pt',
      data: {
        title: 'Perdida no Ártico',
        overview: 'Uma patinadora no gelo fica presa em um bloco de gelo no Mar Ártico.',
      },
    },
  ];

  it('extrai titulo da traducao BR', () => {
    assert.equal(getBrTitleFromTranslations(translations), 'Perdida no Ártico');
  });

  it('prioriza traducao BR sobre titulo em ingles', () => {
    assert.equal(
      resolveMovieTituloBr(
        { title: 'Ice Skater', original_title: 'Ice Skater' },
        translations,
      ),
      'Perdida no Ártico',
    );
  });

  it('usa titulo localizado quando nao ha entrada BR', () => {
    assert.equal(
      resolveMovieTituloBr(
        { title: 'Perdida no Ártico', original_title: 'Ice Skater' },
        [],
      ),
      'Perdida no Ártico',
    );
  });
});
