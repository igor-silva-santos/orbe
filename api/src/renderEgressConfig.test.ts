import { afterEach, describe, expect, it } from 'vitest';
import {
  isDetetiveCronEnabled,
  shouldSkipDetetiveInFullSync,
} from './renderEgressConfig';

const ENV_KEYS = [
  'ORBE_EGRESS_SAVER',
  'SYNC_SKIP_DETETIVE_PHASE',
  'DISABLE_DETETIVE_CRON',
] as const;

function clearEgressEnv(): void {
  for (const key of ENV_KEYS) {
    delete process.env[key];
  }
}

describe('renderEgressConfig', () => {
  afterEach(() => {
    clearEgressEnv();
  });

  it('desliga detetive no sync quando ORBE_EGRESS_SAVER=true', () => {
    process.env.ORBE_EGRESS_SAVER = 'true';
    expect(shouldSkipDetetiveInFullSync()).toBe(true);
    expect(isDetetiveCronEnabled()).toBe(false);
  });

  it('permite override explícito SYNC_SKIP_DETETIVE_PHASE=false', () => {
    process.env.ORBE_EGRESS_SAVER = 'true';
    process.env.SYNC_SKIP_DETETIVE_PHASE = 'false';
    expect(shouldSkipDetetiveInFullSync()).toBe(false);
  });
});
