import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const ADS_SUFFIX = /\s+(standard\s+)?with\s+ads$/i;
const CHANNEL_SUFFIX = /\s+(amazon|apple tv|roku|google play movies|youtube)\s+channel$/i;

function normalizeStreamingFamily(name: string): string {
  let family = name.trim();
  family = family.replace(ADS_SUFFIX, '');
  family = family.replace(CHANNEL_SUFFIX, '');
  return family.trim();
}

describe('normalizeStreamingFamily', () => {
  it('Netflix with Ads -> Netflix', () => {
    assert.equal(normalizeStreamingFamily('Netflix Standard with Ads'), 'Netflix');
  });

  it('HBO Max Amazon Channel -> HBO Max', () => {
    assert.equal(normalizeStreamingFamily('HBO Max Amazon Channel'), 'HBO Max');
  });
});
