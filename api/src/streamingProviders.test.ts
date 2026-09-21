import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  dedupeTmdbWatchProviders,
  normalizeStreamingProviderName,
} from './streamingProviders';

describe('normalizeStreamingProviderName', () => {
  it('agrupa variantes Netflix', () => {
    assert.equal(normalizeStreamingProviderName('Netflix'), 'Netflix');
    assert.equal(normalizeStreamingProviderName('Netflix basic with Ads'), 'Netflix');
  });

  it('agrupa variantes Prime Video', () => {
    assert.equal(normalizeStreamingProviderName('Amazon Prime Video'), 'Prime Video');
    assert.equal(normalizeStreamingProviderName('Prime Video with Ads'), 'Prime Video');
  });
});

describe('dedupeTmdbWatchProviders', () => {
  it('remove Netflix duplicado (com e sem ads)', () => {
    const result = dedupeTmdbWatchProviders([
      { provider_id: 1796, provider_name: 'Netflix basic with Ads', display_priority: 46 },
      { provider_id: 8, provider_name: 'Netflix', display_priority: 1 },
    ]);

    assert.equal(result.length, 1);
    assert.equal(result[0].provider_id, 8);
    assert.equal(result[0].provider_name, 'Netflix');
  });

  it('remove Prime Video duplicado (IDs 9 e 119)', () => {
    const result = dedupeTmdbWatchProviders([
      { provider_id: 9, provider_name: 'Amazon Prime Video', display_priority: 20 },
      { provider_id: 119, provider_name: 'Amazon Prime Video', display_priority: 1 },
    ]);

    assert.equal(result.length, 1);
    assert.equal(result[0].provider_id, 119);
  });

  it('mantém marcas distintas', () => {
    const result = dedupeTmdbWatchProviders([
      { provider_id: 8, provider_name: 'Netflix' },
      { provider_id: 119, provider_name: 'Amazon Prime Video' },
      { provider_id: 337, provider_name: 'Disney Plus' },
    ]);

    assert.equal(result.length, 3);
  });
});
