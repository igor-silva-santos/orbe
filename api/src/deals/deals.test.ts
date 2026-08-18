import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dedupeDeals, dealDedupeKey, mergeFreeDealsWithPrimary } from './dedupeDeals';
import { classifyFreeTier } from './freeTier';
import { mapItchBrowseGame, parseItchBrowseHtml } from './itchClient';
import { parseItchRssXml } from './itchRss';
import { mapItadListItem, ITAD_SHOP_EPIC, ITAD_SHOP_EA } from './itadClient';
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

  it('cruza Epic REST e CheapShark Epic pelo steamAppId', () => {
    const epicDeal = baseDeal({
      id: 'epic:ns:2025',
      source: 'epic',
      platform: 'epic',
      title: 'Caravan SandWitch',
      storeUrl: 'https://store.epicgames.com/pt-BR/p/caravan-sandwitch',
      currency: 'BRL',
      salePrice: 'Grátis',
    });
    const cheapsharkEpic = baseDeal({
      id: 'cheapshark:epic1',
      platform: 'epic',
      title: 'Caravan SandWitch',
      steamAppId: 1582650,
      dealRating: 10,
      imageUrl: 'https://cdn.example/caravan.jpg',
      storeUrl: 'https://store.steampowered.com/app/1582650',
    });
    const result = dedupeDeals([epicDeal, cheapsharkEpic]);
    assert.equal(result.length, 1);
    assert.equal(result[0].currency, 'BRL');
    assert.equal(result[0].steamAppId, 1582650);
    assert.equal(result[0].imageUrl, 'https://cdn.example/caravan.jpg');
    assert.match(result[0].storeUrl, /epicgames\.com/);
  });

  it('cruza Epic REST e CheapShark Epic pelo título quando não há steamAppId', () => {
    const epicDeal = baseDeal({
      id: 'epic:ns:sale',
      source: 'epic',
      platform: 'epic',
      title: 'Need for Speed Heat Deluxe Edition',
      storeUrl: 'https://store.epicgames.com/pt-BR/p/need-for-speed-heat',
      currency: 'BRL',
      salePrice: 'R$ 17,49',
    });
    const cheapsharkEpic = baseDeal({
      id: 'cheapshark:epic2',
      platform: 'epic',
      title: 'Need for Speed Heat Deluxe Edition',
      dealRating: 9,
      imageUrl: 'https://cdn.example/nfs.jpg',
      storeUrl: 'https://www.cheapshark.com/redirect?dealID=abc',
    });
    const result = dedupeDeals([epicDeal, cheapsharkEpic]);
    assert.equal(result.length, 1);
    assert.equal(result[0].currency, 'BRL');
    assert.equal(result[0].salePrice, 'R$ 17,49');
    assert.equal(result[0].imageUrl, 'https://cdn.example/nfs.jpg');
    assert.match(result[0].storeUrl, /epicgames\.com/);
  });

  it('mergeFreeDealsWithPrimary mantém Epic/Steam e enriquece com secundárias', () => {
    const epicDeal = baseDeal({
      id: 'epic:ns:2025',
      source: 'epic',
      platform: 'epic',
      kind: 'free',
      title: 'Caravan SandWitch',
      storeUrl: 'https://store.epicgames.com/pt-BR/p/caravan-sandwitch',
      currency: 'BRL',
      salePrice: 'Grátis',
    });
    const cheapsharkEpic = baseDeal({
      id: 'cheapshark:epic1',
      platform: 'epic',
      kind: 'free',
      title: 'Caravan SandWitch',
      steamAppId: 1582650,
      dealRating: 10,
      imageUrl: 'https://cdn.example/caravan.jpg',
      storeUrl: 'https://store.steampowered.com/app/1582650',
    });
    const result = mergeFreeDealsWithPrimary([epicDeal], [cheapsharkEpic]);
    assert.equal(result.length, 1);
    assert.equal(result[0].source, 'epic');
    assert.equal(result[0].steamAppId, 1582650);
    assert.equal(result[0].imageUrl, 'https://cdn.example/caravan.jpg');
    assert.match(result[0].storeUrl, /epicgames\.com/);
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
        itch: { ok: true, count: 1 },
        itad: { ok: true, count: 1 },
      },
    } as DealsOverview;
    assert.equal(sourcesHealth(overview), 'degraded');
  });
});

const mockItchFreeHtml = `
<div class="game_cell has_cover lazy_images" data-game_id="4858861">
  <div class="game_thumb">
    <a class="thumb_link game_link" href="https://twistandscream.itch.io/foreborn">
      <img data-lazy_src="https://img.itch.zone/foreborn.png" />
    </a>
  </div>
  <div class="game_cell_data">
    <div class="game_title">
      <a class="title game_link" href="https://twistandscream.itch.io/foreborn">Foreborn</a>
    </div>
    <div class="game_text">When the unborn can decide whether they should be born...</div>
    <div class="game_platform">
      <span title="Download for Windows" class="icon icon-windows8"></span>
    </div>
  </div>
</div>
`;

const mockItchSaleHtml = `
<div class="game_cell has_cover lazy_images" data-game_id="3975980">
  <div class="game_thumb">
    <a class="thumb_link game_link" href="https://rustylake.itch.io/servant-of-the-lake">
      <img data-lazy_src="https://img.itch.zone/servant.png" />
    </a>
  </div>
  <div class="game_cell_data">
    <div class="game_title">
      <a class="title game_link" href="https://rustylake.itch.io/servant-of-the-lake">Servant of the Lake</a>
      <a class="price_tag meta_tag sale" href="/s/198347/servant-of-the-lake-launch-sale">
        <div class="price_value">$5.99</div>
        <div class="sale_tag">-25%</div>
      </a>
    </div>
    <div class="game_platform">
      <span title="Download for Windows" class="icon icon-windows8"></span>
      <span title="Download for macOS" class="icon icon-apple"></span>
    </div>
  </div>
</div>
<div class="game_cell has_cover lazy_images" data-game_id="310515">
  <div class="game_cell_data">
    <div class="game_title">
      <a class="title game_link" href="https://example.itch.io/free-for-now">Free For Now</a>
      <a class="price_tag meta_tag sale" href="/s/123/example-sale">
        <div class="price_value">$0.00</div>
        <div class="sale_tag">-100%</div>
      </a>
    </div>
  </div>
</div>
`;

describe('itchClient mapping', () => {
  it('mapeia jogo grátis permanente do HTML de browse', () => {
    const deals = parseItchBrowseHtml(mockItchFreeHtml, 'free');
    assert.equal(deals.length, 1);
    assert.equal(deals[0].id, 'itch:4858861');
    assert.equal(deals[0].source, 'itch');
    assert.equal(deals[0].platform, 'itch');
    assert.equal(deals[0].kind, 'free');
    assert.equal(deals[0].freeTier, 'permanent');
    assert.equal(deals[0].storeUrl, 'https://twistandscream.itch.io/foreborn');
    assert.equal(deals[0].platforms[0], 'Windows');
  });

  it('mapeia promoção com desconto parcial', () => {
    const deals = parseItchBrowseHtml(mockItchSaleHtml, 'sale');
    const sale = deals.find((deal) => deal.id === 'itch:3975980');
    assert.ok(sale);
    assert.equal(sale.kind, 'sale');
    assert.equal(sale.discountPercent, 25);
    assert.equal(sale.salePrice, '$5.99');
    assert.equal(sale.originalPrice, '$7.99');
    assert.equal(sale.currency, 'USD');
  });

  it('mapeia promoção 100% como grátis temporário', () => {
    const deal = mapItchBrowseGame(
      {
        gameId: '310515',
        title: 'Free For Now',
        storeUrl: 'https://example.itch.io/free-for-now',
        salePrice: '$0.00',
        discountPercent: 100,
        platforms: ['Windows'],
      },
      'sale',
    );
    assert.ok(deal);
    assert.equal(deal.kind, 'free');
    assert.equal(deal.freeTier, 'temporary');
    assert.equal(classifyFreeTier(deal), 'temporary');
  });
});

const mockItchFreeRss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel>
<item>
  <guid>https://twistandscream.itch.io/foreborn</guid>
  <plainTitle>Foreborn</plainTitle>
  <imageurl>https://img.itch.zone/foreborn.png</imageurl>
  <price>$0.00</price>
  <link>https://twistandscream.itch.io/foreborn</link>
  <platforms><windows>yes</windows></platforms>
</item>
</channel></rss>`;

const mockItchSaleRss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel>
<item>
  <guid>https://rustylake.itch.io/servant-of-the-lake</guid>
  <plainTitle>Servant of the Lake</plainTitle>
  <imageurl>https://img.itch.zone/servant.png</imageurl>
  <price>$5.99</price>
  <fullPrice>$7.99</fullPrice>
  <discountpercent>25</discountpercent>
  <saleends>Fri, 21 Aug 2026 09:00:00 GMT</saleends>
  <link>https://rustylake.itch.io/servant-of-the-lake</link>
  <platforms><windows>yes</windows><osx>yes</osx></platforms>
</item>
</channel></rss>`;

describe('itchRss parsing', () => {
  it('mapeia feed RSS de jogos grátis', () => {
    const deals = parseItchRssXml(mockItchFreeRss, 'free');
    assert.equal(deals.length, 1);
    assert.equal(deals[0].id, 'itch:foreborn');
    assert.equal(deals[0].kind, 'free');
    assert.equal(deals[0].freeTier, 'permanent');
  });

  it('mapeia feed RSS de promoções com desconto e data de fim', () => {
    const deals = parseItchRssXml(mockItchSaleRss, 'sale');
    assert.equal(deals.length, 1);
    assert.equal(deals[0].kind, 'sale');
    assert.equal(deals[0].discountPercent, 25);
    assert.equal(deals[0].originalPriceValue, 7.99);
    assert.ok(deals[0].endsAt);
  });
});

describe('itadClient mapping', () => {
  it('mapeia promoção Epic em BRL', () => {
    const deal = mapItadListItem(
      {
        id: '018d937e-test-epic',
        title: 'Control Ultimate Edition',
        assets: { boxart: 'https://cdn.example/boxart.jpg' },
        deal: {
          shop: { id: ITAD_SHOP_EPIC, name: 'Epic Game Store' },
          price: { amount: 39.99, currency: 'BRL' },
          regular: { amount: 199.99, currency: 'BRL' },
          cut: 80,
          url: 'https://store.epicgames.com/pt-BR/p/control',
          expiry: '2026-12-31T23:59:59+00:00',
        },
      },
      ITAD_SHOP_EPIC,
    );
    assert.ok(deal);
    assert.equal(deal.source, 'itad');
    assert.equal(deal.platform, 'epic');
    assert.equal(deal.currency, 'BRL');
    assert.equal(deal.discountPercent, 80);
    assert.equal(deal.salePriceValue, 39.99);
  });

  it('mapeia promoção EA App', () => {
    const deal = mapItadListItem(
      {
        id: '018d937e-test-ea',
        title: 'Battlefield 2042',
        deal: {
          shop: { id: ITAD_SHOP_EA, name: 'EA Store' },
          price: { amount: 29.9, currency: 'BRL' },
          regular: { amount: 199.9, currency: 'BRL' },
          cut: 85,
          url: 'https://www.ea.com/games/battlefield/battlefield-2042',
        },
      },
      ITAD_SHOP_EA,
    );
    assert.ok(deal);
    assert.equal(deal.platform, 'origin');
    assert.equal(deal.kind, 'sale');
  });
});
