import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { postLoginRedirectFromSearch, safeRedirectPath } from './session';

describe('postLoginRedirectFromSearch', () => {
  it('prioriza next sobre redirect', () => {
    const params = new URLSearchParams('next=/extensao&redirect=/outro');
    assert.equal(postLoginRedirectFromSearch(params), '/extensao');
  });

  it('usa redirect quando next está ausente', () => {
    const params = new URLSearchParams('redirect=/minha-lista');
    assert.equal(postLoginRedirectFromSearch(params), '/minha-lista');
  });

  it('rejeita URLs protocol-relative', () => {
    assert.equal(safeRedirectPath('//evil.com'), '/');
  });
});
