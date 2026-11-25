import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseSearchResultsHtml } from './steamStoreSearch';

describe('parseSearchResultsHtml', () => {
  it('extrai appId, título e tags', () => {
    const html = `
    <a data-ds-appid="123" data-ds-tagids="[3859,3843]" class="search_result_row">
      <img src="https://cdn.example/capsule.jpg" />
      <span class="title">Test Game</span>
    </a>`;
    const rows = parseSearchResultsHtml(html);
    assert.equal(rows.length, 1);
    assert.equal(rows[0].appId, 123);
    assert.equal(rows[0].name, 'Test Game');
    assert.deepEqual(rows[0].tagIds, [3859, 3843]);
  });
});
