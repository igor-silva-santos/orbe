import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dedupeDeals, dealDedupeKey } from './dedupeDeals';
import { classifyFreeTier } from './freeTier';
import { normalizeDealToBrl } from './normalizeDeals';
import { paginateDeals, sourcesHealth } from './dealsService';
import type { DealsOverview, UnifiedDeal } from './types';

const baseDeal = (overrides: Partial<UnifiedDeal>): UnifiedDeal => ({
  id: 'test:1',
  source: 'cheapshark',
  kind: 'sale',
  title: 'Test Game',
  platform: 'steam',
  platforms: ['Steam'],
  storeUrl: 'https://example.com',
  ...overrides,
});

describe('dealDedupeKey', () => {
  it('prioriza steamAppId', () => {
    const key = dealDedupeKey(baseDeal({ steamAppId: 12345, title: 'Foo' }));
    assert.equal(key, 'steam:12345');
  });
});

describe('dedupeDeals', () => {
  it('mantém o deal com melhor qualidade para o mesmo steamAppId', () => {
    const worse = baseDeal({
      id: 'cheapshark:1',
      steamAppId: 570,
      title: 'Dota 2',
      imageUrl: null,
      dealRating: 1,
    });
    const better = baseDeal({
      id: 'steam:570',
      source: 'steam',
      steamAppId: 570,
      title: 'Dota 2',
      imageUrl: 'https://cdn.example/img.jpg',
      dealRating: 9,
    });
    const result = dedupeDeals([worse, better]);
    assert.equal(result.length, 1);
    assert.equal(result[0].source, 'steam');
  });
});

describe('classifyFreeTier', () => {
  it('classifica giveaway GamerPower ativo como temporário', () => {
    const tier = classifyFreeTier(
      baseDeal({
        source: 'gamerpower',
        kind: 'free',
        status: 'active',
      }),
    );
    assert.equal(tier, 'temporary');
  });

  it('classifica jogo com preço original como temporário', () => {
    const tier = classifyFreeTier(
      baseDeal({
        source: 'cheapshark',
        kind: 'free',
        originalPrice: '$19.99',
      }),
    );
    assert.equal(tier, 'temporary');
  });
});

describe('normalizeDealToBrl', () => {
  it('converte USD para BRL com taxa informada', () => {
    const deal = normalizeDealToBrl(
      baseDeal({
        currency: 'USD',
        salePrice: '$10.00',
        salePriceValue: 10,
        originalPriceValue: 20,
        originalPrice: '$20.00',
      }),
      5,
    );
    assert.equal(deal.salePriceValue, 50);
    assert.equal(deal.priceConverted, true);
    assert.equal(deal.currency, 'BRL');
  });
});

describe('paginateDeals', () => {
  it('retorna página e hasMore corretamente', () => {
    const items = Array.from({ length: 50 }, (_, i) => i);
    const page1 = paginateDeals(items, 1, 20);
    assert.equal(page1.items.length, 20);
    assert.equal(page1.hasMore, true);
    const page3 = paginateDeals(items, 3, 20);
    assert.equal(page3.items.length, 10);
    assert.equal(page3.hasMore, false);
  });
});

describe('sourcesHealth', () => {
  it('marca degraded quando uma fonte falha', () => {
    const overview = {
      sources: {
        epic: { ok: true, count: 1 },
        gamerpower: { ok: false, count: 0, error: 'fail' },
        cheapshark: { ok: true, count: 1 },
        steam: { ok: true, count: 1 },
        orbe: { ok: true, count: 1 },
      },
    } as DealsOverview;
    assert.equal(sourcesHealth(overview), 'degraded');
  });
});
