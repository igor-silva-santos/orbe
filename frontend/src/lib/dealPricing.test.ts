import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getDealSalePriceValue, isBargainPromo, parsePriceNumberFromString } from './dealPricing';
import type { UnifiedDeal } from '@/types/deals';

const baseDeal = (overrides: Partial<UnifiedDeal>): UnifiedDeal => ({
  id: 't:1',
  source: 'cheapshark',
  kind: 'sale',
  title: 'Test',
  platform: 'steam',
  platforms: ['Steam'],
  storeUrl: 'https://example.com',
  ...overrides,
});

describe('parsePriceNumberFromString', () => {
  it('decimal US', () => {
    assert.equal(parsePriceNumberFromString('$34.50'), 34.5);
  });

  it('real BR', () => {
    assert.equal(parsePriceNumberFromString('R$ 34,50'), 34.5);
  });
});

describe('getDealSalePriceValue', () => {
  it('usa salePriceValue quando presente', () => {
    assert.equal(getDealSalePriceValue(baseDeal({ salePriceValue: 19.9, salePrice: 'R$ 3450,00' })), 19.9);
  });

  it('parseia string US sem inflar', () => {
    assert.equal(getDealSalePriceValue(baseDeal({ salePrice: '$34.50', salePriceValue: null })), 34.5);
  });
});

describe('isBargainPromo', () => {
  it('inclui promo até 30', () => {
    assert.equal(isBargainPromo(baseDeal({ salePriceValue: 29.99 })), true);
    assert.equal(isBargainPromo(baseDeal({ salePriceValue: 31 })), false);
  });
});
