/// <reference types="node" />
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolveCinemaFlags, type CinemaFlagsInput } from './detetive';

function flags(overrides: Partial<CinemaFlagsInput> = {}): CinemaFlagsInput {
  return {
    filmeEmCartaz: false,
    filmeEmBreve: false,
    temSessoes: false,
    emPrevenda: false,
    ingressoLink: null,
    ingressoMode: 'none',
    estreiaCinema: false,
    releasePassed: false,
    ...overrides,
  };
}

describe('resolveCinemaFlags', () => {
  describe('emCartaz', () => {
    it('keeps emCartaz when tem_sessoes even if TMDB denies estreia_cinema', () => {
      const result = resolveCinemaFlags(
        flags({
          temSessoes: true,
          estreiaCinema: false,
        }),
      );
      assert.equal(result.emCartaz, true);
    });

    it('keeps emCartaz when sync flag and ingresso evidence despite TMDB', () => {
      const result = resolveCinemaFlags(
        flags({
          filmeEmCartaz: true,
          ingressoLink: 'https://www.ingresso.com/filme/foo',
          ingressoMode: 'full',
          estreiaCinema: false,
        }),
      );
      assert.equal(result.emCartaz, true);
    });

    it('keeps emCartaz when sync flag and TMDB estreia_cinema', () => {
      const result = resolveCinemaFlags(
        flags({
          filmeEmCartaz: true,
          estreiaCinema: true,
        }),
      );
      assert.equal(result.emCartaz, true);
    });

    it('preserves emCartaz with ingresso link after release when no sessions', () => {
      const result = resolveCinemaFlags(
        flags({
          filmeEmCartaz: true,
          ingressoLink: 'https://www.ingresso.com/filme/foo',
          releasePassed: true,
          estreiaCinema: false,
        }),
      );
      assert.equal(result.emCartaz, true);
    });

    it('clears emCartaz only when release passed with no sessions and no ingresso link', () => {
      const result = resolveCinemaFlags(
        flags({
          filmeEmCartaz: true,
          releasePassed: true,
          estreiaCinema: false,
        }),
      );
      assert.equal(result.emCartaz, false);
    });

    it('does not set emCartaz without prior flag or ingresso sessions', () => {
      const result = resolveCinemaFlags(
        flags({
          estreiaCinema: true,
        }),
      );
      assert.equal(result.emCartaz, false);
    });

    it('keeps emCartaz during pré-venda monitoring', () => {
      const result = resolveCinemaFlags(
        flags({
          filmeEmCartaz: true,
          emPrevenda: true,
          ingressoLink: 'https://www.ingresso.com/filme/foo',
          ingressoMode: 'full',
          estreiaCinema: false,
        }),
      );
      assert.equal(result.emCartaz, true);
    });
  });

  describe('emBreve', () => {
    it('keeps emBreve when em_prevenda despite TMDB', () => {
      const result = resolveCinemaFlags(
        flags({
          emPrevenda: true,
          estreiaCinema: false,
        }),
      );
      assert.equal(result.emBreve, true);
    });

    it('keeps emBreve from sync before release even if TMDB denies estreia_cinema', () => {
      const result = resolveCinemaFlags(
        flags({
          filmeEmBreve: true,
          estreiaCinema: false,
          releasePassed: false,
        }),
      );
      assert.equal(result.emBreve, true);
    });

    it('keeps emBreve when TMDB and sync agree before release', () => {
      const result = resolveCinemaFlags(
        flags({
          filmeEmBreve: true,
          estreiaCinema: true,
          releasePassed: false,
        }),
      );
      assert.equal(result.emBreve, true);
    });

    it('clears emBreve after release', () => {
      const result = resolveCinemaFlags(
        flags({
          filmeEmBreve: true,
          estreiaCinema: true,
          releasePassed: true,
        }),
      );
      assert.equal(result.emBreve, false);
    });

    it('does not set emBreve without prior flag or pré-venda', () => {
      const result = resolveCinemaFlags(
        flags({
          estreiaCinema: true,
          releasePassed: false,
        }),
      );
      assert.equal(result.emBreve, false);
    });
  });
});
