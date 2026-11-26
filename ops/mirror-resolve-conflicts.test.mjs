import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveConflict } from './mirror-resolve-conflicts.mjs';

const frontendPkg = `{
  "scripts": {
<<<<<<< HEAD
    "test": "tsx --test src/lib/carousel-loop.test.ts src/lib/carousel-utils.test.ts src/lib/carousel-anime-agenda.test.ts src/lib/brazil-timezone.test.ts src/lib/week-br.test.ts src/lib/image-utils.test.ts",
=======
    "test": "tsx --test src/lib/carousel-loop.test.ts src/lib/carousel-utils.test.ts src/lib/carousel-anime-agenda.test.ts src/lib/brazil-timezone.test.ts src/lib/image-utils.test.ts src/lib/session.test.ts src/lib/dealPricing.test.ts",
>>>>>>> refs/remotes/github/master
    "build": "next build"
  }
}
`;

test('frontend package.json une os testes do GitLab e do GitHub', () => {
  const result = resolveConflict('frontend/package.json', frontendPkg);
  assert.equal(result.ok, true);
  const testScript = JSON.parse(result.content).scripts.test;
  assert.equal(
    testScript,
    'tsx --test src/lib/carousel-loop.test.ts src/lib/carousel-utils.test.ts src/lib/carousel-anime-agenda.test.ts src/lib/brazil-timezone.test.ts src/lib/week-br.test.ts src/lib/image-utils.test.ts src/lib/session.test.ts src/lib/dealPricing.test.ts',
  );
});

test('api package.json mantém o teste da branch e o da master', () => {
  const content = `{
  "scripts": {
<<<<<<< HEAD
    "test": "node --require ts-node/register --test src/awardCeremonies.test.ts src/continuacoes.test.ts src/listaService.test.ts scripts/streaming-providers.test.ts",
=======
    "test": "node --require ts-node/register --test src/continuacoes.test.ts src/listaService.test.ts src/animeCarouselAiring.test.ts scripts/streaming-providers.test.ts",
>>>>>>> origin/master
    "start": "node dist/index.js"
  }
}
`;
  const result = resolveConflict('api/package.json', content);
  assert.equal(result.ok, true);
  assert.equal(
    JSON.parse(result.content).scripts.test,
    'node --require ts-node/register --test src/awardCeremonies.test.ts src/continuacoes.test.ts src/listaService.test.ts src/animeCarouselAiring.test.ts scripts/streaming-providers.test.ts',
  );
});

test('mantém o comando extra da branch depois do &&', () => {
  const content = `{
  "scripts": {
<<<<<<< HEAD
    "test": "node --require ts-node/register --test src/listaService.test.ts src/watchlistAnime.test.ts scripts/streaming-providers.test.ts && node --test ../extension/lib/queue-progress.test.js",
=======
    "test": "node --require ts-node/register --test src/listaService.test.ts src/animeCarouselAiring.test.ts scripts/streaming-providers.test.ts",
>>>>>>> origin/master
    "start": "node dist/index.js"
  }
}
`;
  const result = resolveConflict('api/package.json', content);
  assert.equal(result.ok, true);
  assert.equal(
    JSON.parse(result.content).scripts.test,
    'node --require ts-node/register --test src/listaService.test.ts src/watchlistAnime.test.ts src/animeCarouselAiring.test.ts scripts/streaming-providers.test.ts && node --test ../extension/lib/queue-progress.test.js',
  );
});

test('não chuta conflito que não é a linha de testes', () => {
  const content = `{
<<<<<<< HEAD
  "version": "2.0.0",
=======
  "version": "1.0.0",
>>>>>>> origin/master
  "scripts": { "test": "node --test a.test.ts" }
}
`;
  const result = resolveConflict('frontend/package.json', content);
  assert.equal(result.ok, false);
});

const helpers = `import { prisma } from '../clients';
<<<<<<< HEAD
import {
  filterFilmesHomeLaunchCarousel,
  HOME_LAUNCH_MIN_RUNTIME_MINUTES,
} from '../filmeAntecipacao';
import { getBrazilCalendarWeekBounds } from '../brazilTimezone';
=======
import { filterFilmesHomeLaunchCarousel } from '../filmeAntecipacao';
>>>>>>> refs/remotes/github/master

export function fetchFilmesForCarousel() {
  return filterFilmesHomeLaunchCarousel([]);
}

export function getAnimeCarouselInclude(now: Date = new Date()) {
  const { start } = getBrazilCalendarWeekBounds(now);
  return start;
}
`;

test('helpers fica com o import usado de cada lado e sem o símbolo órfão', () => {
  const result = resolveConflict('api/src/routes/mediaRoutesHelpers.ts', helpers);
  assert.equal(result.ok, true);
  assert.match(result.content, /import \{ filterFilmesHomeLaunchCarousel \} from '\.\.\/filmeAntecipacao';/);
  assert.match(result.content, /import \{ getBrazilCalendarWeekBounds \} from '\.\.\/brazilTimezone';/);
  assert.equal(result.content.includes('HOME_LAUNCH_MIN_RUNTIME_MINUTES'), false);
  assert.equal(result.content.includes('<<<<<<<'), false);
});

test('não chuta conflito no corpo do helper', () => {
  const content = `export function fetchFilmesForCarousel() {
<<<<<<< HEAD
  return 1;
=======
  return 2;
>>>>>>> refs/remotes/github/master
}
`;
  const result = resolveConflict('api/src/routes/mediaRoutesHelpers.ts', content);
  assert.equal(result.ok, false);
});

const carouselTest = `describe('parseMidiaReleaseDate', () => {
  it('prefers a future nextAiringEpisode over an older carousel date', () => {
    const future = new Date();
    const item = {
      nextAiringEpisode: {
<<<<<<< HEAD
        airingAt: future.toISOString(),
=======
        airingAt: '2026-10-15T12:00:00.000Z',
>>>>>>> refs/remotes/github/master
        episode: 5,
      },
    };
    const date = parseMidiaReleaseDate(item);
<<<<<<< HEAD
    assert.equal(date?.getFullYear(), future.getFullYear());
    assert.equal(date?.getMonth(), future.getMonth());
    assert.equal(date?.getDate(), future.getDate());
=======
    assert.equal(date?.getFullYear(), 2026);
    assert.equal(date?.getMonth(), 9);
    assert.equal(date?.getDate(), 15);
>>>>>>> refs/remotes/github/master
  });
});
`;

test('teste do carrossel fica com a data futura e com 15/10/2026', () => {
  const result = resolveConflict('frontend/src/lib/carousel-utils.test.ts', carouselTest);
  assert.equal(result.ok, true);
  assert.match(result.content, /airingAt: future\.toISOString\(\)/);
  assert.match(result.content, /airingAt: '2026-10-15T12:00:00\.000Z'/);
  assert.match(result.content, /future\.getDate\(\)/);
  assert.match(result.content, /getDate\(\), 15\)/);
  assert.match(result.content, /getDate\(\), 10\)/);
  assert.equal(result.content.includes('<<<<<<<'), false);
});

test('não chuta outro conflito no teste do carrossel', () => {
  const content = `describe('parseMidiaReleaseDate', () => {
<<<<<<< HEAD
  const a = 1;
=======
  const a = 2;
>>>>>>> refs/remotes/github/master
});
`;
  const result = resolveConflict('frontend/src/lib/carousel-utils.test.ts', content);
  assert.equal(result.ok, false);
});

const serviceWorker = `<<<<<<< HEAD
const DEAL_POSTER_HOSTS = new Set(['www.gamerpower.com']);
=======
class GracefulNetwork extends Strategy {}
>>>>>>> refs/remotes/github/master
`;

test('service worker não cacheia capa quebrada e não guarda erro de CDN', () => {
  const result = resolveConflict('frontend/src/app/sw.ts', serviceWorker);
  assert.equal(result.ok, true);
  assert.match(result.content, /DEAL_POSTER_HOSTS/);
  assert.match(result.content, /matcherSkipsDealPosters/);
  assert.match(result.content, /class GracefulNetwork/);
  assert.match(result.content, /status: 504/);
  assert.match(result.content, /isSameOriginApiGet/);
  assert.match(result.content, /navigationPreload: false/);
  assert.equal(result.content.includes('<<<<<<<'), false);
});

test('não chuta outro conflito no service worker', () => {
  const content = `<<<<<<< HEAD
const a = 1;
=======
const a = 2;
>>>>>>> refs/remotes/github/master
`;
  const result = resolveConflict('frontend/src/app/sw.ts', content);
  assert.equal(result.ok, false);
});
