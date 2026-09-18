/**

 * Content script ÔÇö extrai animes da fila/watchlist/hist├│rico da Crunchyroll.

 * Responde a mensagens do service worker com { action: 'parseQueue' }.

 */



(function () {

  const CARD_SELECTORS = [

    '[class*="queue-card"]',

    '[class*="browse-card"]',

    '[class*="content-card"]',

    '[class*="up-next-card"]',

    '[class*="watchlist-card"]',

    '[class*="history-card"]',

    '[data-t*="queue"]',

    'li[class*="card"]',

    'article[class*="card"]',

  ];



  const SERIES_LINK_SELECTOR = 'a[href*="/series/"], a[href*="/watch/"]';



  function extractCrunchyrollId(url) {

    if (!url) return null;

    const seriesMatch = url.match(/\/series\/([A-Z0-9]+)/i);

    return seriesMatch ? seriesMatch[1].toUpperCase() : null;

  }



  function resolveUrl(href) {

    if (!href) return null;

    try {

      return new URL(href, window.location.origin).href;

    } catch {

      return null;

    }

  }



  function parseSeasonEpisode(text) {

    if (!text) return { season: 1, episode: 0 };



    const seasonEpisode =

      text.match(/(?:season|temporada|s)\s*(\d+)[^\d]*(?:ep(?:isode)?|\.?)\s*(\d+)/i) ||

      text.match(/s(\d+)\s*e(\d+)/i) ||

      text.match(/(\d+)\s*x\s*(\d+)/i);



    if (seasonEpisode) {

      return {

        season: parseInt(seasonEpisode[1], 10) || 1,

        episode: parseInt(seasonEpisode[2], 10) || 0,

      };

    }



    const epOnly =

      text.match(/(?:ep(?:isode)?|ep\.?)\s*(\d+)/i) ||

      text.match(/(\d+)\s*(?:\/\s*\d+)?\s*(?:min|mins|remaining|restante)/i);



    if (epOnly) {

      return { season: 1, episode: parseInt(epOnly[1], 10) || 0 };

    }



    return { season: 1, episode: 0 };

  }



  function parseDurationToSeconds(text) {

    if (!text) return null;



    const hms = text.match(/(\d+)\s*h(?:ours?)?\s*(\d+)\s*m/i);

    if (hms) return parseInt(hms[1], 10) * 3600 + parseInt(hms[2], 10) * 60;



    const minSec = text.match(/(\d+)\s*m(?:in(?:ute)?s?)?(?:\s*(\d+)\s*s(?:ec)?)?/i);

    if (minSec) {

      const mins = parseInt(minSec[1], 10) || 0;

      const secs = parseInt(minSec[2], 10) || 0;

      return mins * 60 + secs;

    }



    const secOnly = text.match(/(\d+)\s*s(?:ec(?:ond)?s?)?/i);

    if (secOnly) return parseInt(secOnly[1], 10);



    return null;

  }



  function parseProgressFromElement(el) {

    const textSources = [

      el.getAttribute('aria-label'),

      el.getAttribute('title'),

      el.textContent,

    ].filter(Boolean);



    const combined = textSources.join(' ');



    let remainingTimeSec = null;

    let episodeDurationSec = null;



    const remainingMatch = combined.match(

      /(\d+)\s*(?:min(?:ute)?s?|m)\s*(?:restante|left|remaining)/i

    );

    if (remainingMatch) {

      remainingTimeSec = parseInt(remainingMatch[1], 10) * 60;

    } else {

      remainingTimeSec = parseDurationToSeconds(

        combined.match(/(?:restante|left|remaining)[:\s]*([^|┬ÀÔÇó]+)/i)?.[1] ||

          combined.match(/(\d+\s*(?:h\s*)?\d*\s*m(?:\s*\d+\s*s)?)\s*(?:restante|left|remaining)/i)?.[1]

      );

    }



    const durationMatch = combined.match(

      /(?:dura├º├úo|duration|total)[:\s]*(\d+\s*(?:h\s*)?\d*\s*m(?:\s*\d+\s*s)?)/i

    );

    if (durationMatch) {

      episodeDurationSec = parseDurationToSeconds(durationMatch[1]);

    }



    const progressBar = el.querySelector(

      'progress, [role="progressbar"], [class*="progress"], meter'

    );

    if (progressBar) {

      const max =

        parseFloat(progressBar.getAttribute('max') || progressBar.getAttribute('aria-valuemax')) ||

        100;

      const value =

        parseFloat(progressBar.getAttribute('value') || progressBar.getAttribute('aria-valuenow')) ||

        0;



      if (max > 0 && value >= 0) {

        const ratio = Math.min(1, Math.max(0, value / max));

        if (episodeDurationSec && remainingTimeSec == null) {

          remainingTimeSec = Math.round(episodeDurationSec * (1 - ratio));

        }

      }



      const barLabel = progressBar.getAttribute('aria-label') || '';

      if (!remainingTimeSec) {

        remainingTimeSec = parseDurationToSeconds(

          barLabel.match(/(\d+\s*m(?:\s*\d+\s*s)?)\s*(?:restante|left|remaining)/i)?.[1]

        );

      }

    }



    const totalEpisodesMatch = combined.match(

      /(?:de|of|\/)\s*(\d+)\s*(?:ep(?:isode)?s?|eps)/i

    );

    const totalEpisodes = totalEpisodesMatch ? parseInt(totalEpisodesMatch[1], 10) : null;



    const { season, episode } = parseSeasonEpisode(combined);



    return {

      season,

      episode,

      totalEpisodes,

      episodeDurationSec,

      remainingTimeSec,

    };

  }



  function detectDub(el) {

    const text = (el.textContent || '').toUpperCase();

    if (/\bDUB\b/.test(text)) return true;

    if (el.querySelector('[class*="dub"], [aria-label*="dub" i], [data-audio="dub"]')) {

      return true;

    }

    return false;

  }



  function findSeriesLink(el) {

    const links = el.querySelectorAll(SERIES_LINK_SELECTOR);



    for (const link of links) {

      const href = link.getAttribute('href') || '';

      if (href.includes('/series/')) return link;

    }



    let parent = el.parentElement;

    for (let depth = 0; depth < 6 && parent; depth += 1) {

      const parentSeriesLink = parent.querySelector('a[href*="/series/"]');

      if (parentSeriesLink) return parentSeriesLink;



      const parentAnchor = parent.closest('a[href*="/series/"]');

      if (parentAnchor) return parentAnchor;



      parent = parent.parentElement;

    }



    return null;

  }



  function extractPosterUrl(el) {

    const img =

      el.querySelector('img[src*="crunchyroll"], img[src*="imgsrv"], picture img, img[alt]') ||

      el.querySelector('img');

    if (!img) return null;



    return (

      img.getAttribute('src') ||

      img.getAttribute('data-src') ||

      img.getAttribute('data-original') ||

      img.currentSrc ||

      null

    );

  }



  function extractTitle(el, seriesLink) {

    const titleEl =

      el.querySelector(

        '[class*="title"], h1, h2, h3, h4, [class*="series-title"], [class*="card-title"]'

      ) || seriesLink;



    const title =

      titleEl?.getAttribute('aria-label') ||

      titleEl?.getAttribute('title') ||

      titleEl?.textContent?.trim() ||

      seriesLink?.textContent?.trim();



    return title ? title.replace(/\s+/g, ' ').trim() : null;

  }



  function parseCard(el) {

    const seriesLink = findSeriesLink(el);

    if (!seriesLink) return null;



    const crunchyrollUrl = resolveUrl(seriesLink.getAttribute('href'));

    const crunchyrollId = extractCrunchyrollId(crunchyrollUrl);

    if (!crunchyrollId) return null;



    const title = extractTitle(el, seriesLink);

    if (!title) return null;



    const progress = parseProgressFromElement(el);



    return {

      crunchyrollId,

      title,

      posterUrl: extractPosterUrl(el),

      crunchyrollUrl,

      season: progress.season,

      episode: progress.episode,

      totalEpisodes: progress.totalEpisodes,

      episodeDurationSec: progress.episodeDurationSec,

      remainingTimeSec: progress.remainingTimeSec,

      hasDub: detectDub(el),

    };

  }



  function collectCardElements() {

    const found = new Set();



    for (const selector of CARD_SELECTORS) {

      document.querySelectorAll(selector).forEach((el) => found.add(el));

    }



    if (found.size === 0) {

      document.querySelectorAll(SERIES_LINK_SELECTOR).forEach((link) => {

        const card =

          link.closest('li, article, [class*="card"], [class*="item"], [class*="tile"]') || link;

        found.add(card);

      });

    }



    return Array.from(found);

  }



  async function scrollToLoadAll(maxScrolls = 30, delayMs = 400) {

    let lastHeight = 0;

    let stableCount = 0;



    for (let i = 0; i < maxScrolls; i++) {

      window.scrollTo(0, document.body.scrollHeight);

      await new Promise((r) => setTimeout(r, delayMs));



      const currentHeight = document.body.scrollHeight;

      if (currentHeight === lastHeight) {

        stableCount += 1;

        if (stableCount >= 2) break;

      } else {

        stableCount = 0;

        lastHeight = currentHeight;

      }

    }



    window.scrollTo(0, 0);

  }



  function dedupeById(items) {

    const map = new Map();

    for (const item of items) {

      if (!map.has(item.crunchyrollId)) {

        map.set(item.crunchyrollId, item);

      }

    }

    return Array.from(map.values());

  }



  async function parseQueue() {

    await scrollToLoadAll();



    const cards = collectCardElements();

    const items = [];



    for (const card of cards) {

      const parsed = parseCard(card);

      if (parsed) items.push(parsed);

    }



    return dedupeById(items);

  }



  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {

    if (message?.action === 'parseQueue') {

      parseQueue()

        .then((items) => sendResponse({ ok: true, items }))

        .catch((err) =>

          sendResponse({

            ok: false,

            error: err?.message || 'Erro ao analisar a fila da Crunchyroll.',

          })

        );

      return true;

    }

  });

})();


