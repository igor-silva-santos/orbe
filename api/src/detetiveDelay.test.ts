/// <reference types="node" />
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  DETETIVE_DELAY_API_MS,
  DETETIVE_DELAY_PUPPETEER_MS,
  DETETIVE_DELAY_STREAMING_ONLY_MS,
  getDetetiveInterFilmDelayMs,
} from './detetive';

describe('getDetetiveInterFilmDelayMs', () => {
  it('usa delay curto quando so verifica streaming', () => {
    assert.equal(
      getDetetiveInterFilmDelayMs({ ingressoMode: 'none', usedPuppeteer: false }),
      DETETIVE_DELAY_STREAMING_ONLY_MS,
    );
  });

  it('usa delay medio quando ingresso resolve via API', () => {
    assert.equal(
      getDetetiveInterFilmDelayMs({ ingressoMode: 'full', usedPuppeteer: false }),
      DETETIVE_DELAY_API_MS,
    );
    assert.equal(
      getDetetiveInterFilmDelayMs({ ingressoMode: 'link_only', usedPuppeteer: false }),
      DETETIVE_DELAY_API_MS,
    );
  });

  it('usa delay longo quando Puppeteer foi usado', () => {
    assert.equal(
      getDetetiveInterFilmDelayMs({ ingressoMode: 'full', usedPuppeteer: true }),
      DETETIVE_DELAY_PUPPETEER_MS,
    );
  });
});
