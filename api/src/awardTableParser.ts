import axios from 'axios';
import * as cheerio from 'cheerio';

export type AwardMediaType = 'filme' | 'serie' | 'anime' | 'jogo';

export type ScrapedAward = {
  awardName: string;
  year: number;
  category: string;
  title: string;
  status: 'vencedor' | 'indicado';
  mediaType: AwardMediaType;
};

export type AwardScrapeSource = {
  awardName: string;
  url: string;
  mediaType: AwardMediaType;
  kind: 'wikitable' | 'game-awards';
  category: string;
};

// A Wikipédia responde 403 para o User-Agent padrão do axios. Sem um cliente
// identificável o scrape termina sem nenhuma linha e a página de premiações fica vazia.
export const WIKIPEDIA_REQUEST_HEADERS: Record<string, string> = {
  'User-Agent': 'OrbeNerd/1.0 (+https://orbe-seven.vercel.app; sincronizacao de premiacoes)',
  Accept: 'text/html,application/xhtml+xml',
  'Accept-Language': 'pt-BR,pt;q=0.9',
};

export type WikipediaGetter = (
  url: string,
  config: { timeout: number; headers: Record<string, string>; responseType: 'text' },
) => Promise<{ data: string }>;

const defaultWikipediaGet: WikipediaGetter = (url, config) => axios.get<string>(url, config);

export async function fetchWikipediaHtml(url: string, get: WikipediaGetter = defaultWikipediaGet): Promise<string> {
  const response = await get(url, {
    timeout: 30000,
    headers: WIKIPEDIA_REQUEST_HEADERS,
    responseType: 'text',
  });
  return response.data;
}

// Página antiga "Lista de vencedores..." não existe mais (a Wikipédia devolve
// noarticletext). A lista vigente é o artigo da categoria.
export const AWARD_SCRAPE_SOURCES: AwardScrapeSource[] = [
  {
    awardName: 'Oscar',
    url: 'https://pt.wikipedia.org/wiki/Oscar_de_melhor_filme',
    mediaType: 'filme',
    kind: 'wikitable',
    category: 'Melhor Filme',
  },
  {
    awardName: 'Globo de Ouro',
    url: 'https://pt.wikipedia.org/wiki/Globo_de_Ouro_de_melhor_filme_dramático',
    mediaType: 'filme',
    kind: 'wikitable',
    category: 'Melhor Filme Dramático',
  },
  {
    awardName: 'Globo de Ouro',
    url: 'https://pt.wikipedia.org/wiki/Globo_de_Ouro_de_melhor_série_dramática',
    mediaType: 'serie',
    kind: 'wikitable',
    category: 'Melhor Série Dramática',
  },
  {
    awardName: 'The Game Awards',
    url: 'https://pt.wikipedia.org/wiki/The_Game_Awards',
    mediaType: 'jogo',
    kind: 'game-awards',
    category: 'Jogo do Ano',
  },
];

const cleanTitle = (raw: string): string => {
  let title = raw.replace(/\s+/g, ' ').trim();
  title = title.replace(/\[[^\]]*\]/g, '').trim();
  title = title.split(/[–—]/)[0].trim();
  title = title.replace(/\s*\(\d{4}\)\s*$/, '').trim();
  return title;
};

const normalizeHeader = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const isPlaceholderTitle = (title: string): boolean =>
  /^(asa|tba|tbd|n\/a|a anunciar|a definir|em breve)$/i.test(title) || /milh(ao|oes|ões|ão|õ)/i.test(title);

const extractYear = (text: string): number | null => {
  const match = text.match(/\b(?:18|19|20)\d{2}\b/);
  if (!match) return null;
  return parseInt(match[0], 10);
};

const findYearColumn = (headers: string[]): number => {
  const norms = headers.map(normalizeHeader);
  for (const name of ['ano', 'data', 'cerimonia']) {
    const index = norms.indexOf(name);
    if (index >= 0) return index;
  }
  return -1;
};

const findTitleColumn = (headers: string[]): number => {
  const norms = headers.map(normalizeHeader);
  for (const name of ['titulo original', 'filme', 'programa']) {
    const index = norms.indexOf(name);
    if (index >= 0) return index;
  }
  return norms.findIndex((header) => header.startsWith('vencedor'));
};

type LogicalCell = { text: string; winner: boolean };

type GridRow = { header: boolean; cells: LogicalCell[] };

const readCell = ($: cheerio.CheerioAPI, el: any) => {
  const clone = $(el).clone();
  clone.find('sup, .reference').remove();
  const text = clone.text().replace(/\s+/g, ' ').trim();
  const winner = $(el).find('b, strong').length > 0;
  const rowspan = Math.max(1, parseInt($(el).attr('rowspan') || '1', 10) || 1);
  const colspan = Math.max(1, parseInt($(el).attr('colspan') || '1', 10) || 1);
  return { text, winner, rowspan, colspan };
};

const tableRowElements = ($: cheerio.CheerioAPI, table: any) => {
  const tbodyRows = $(table).children('tbody').children('tr');
  if (tbodyRows.length > 0) return tbodyRows.toArray();
  const sectionRows = $(table).children('thead, tbody').children('tr');
  if (sectionRows.length > 0) return sectionRows.toArray();
  return $(table).children('tr').toArray();
};

// As tabelas da Wikipédia usam rowspan no ano/data. A linha seguinte vem só com
// o título, e ler "a terceira célula" pega a referência ou o título traduzido.
const expandTable = ($: cheerio.CheerioAPI, table: any): GridRow[] => {
  const carries: Array<{ left: number; cell: LogicalCell } | undefined> = [];
  const grid: GridRow[] = [];

  for (const tr of tableRowElements($, table)) {
    const elements = $(tr).children('th, td').toArray();
    const header = elements.length > 0 && elements.every((el) => $(el).is('th'));
    const cells: LogicalCell[] = [];
    let col = 0;
    let index = 0;

    const takeCarry = () => {
      while (carries[col] && carries[col]!.left > 0) {
        const carry = carries[col]!;
        cells[col] = carry.cell;
        carry.left -= 1;
        if (carry.left <= 0) carries[col] = undefined;
        col += 1;
      }
    };

    while (index < elements.length) {
      takeCarry();
      const parsed = readCell($, elements[index]);
      index += 1;
      const logical: LogicalCell = { text: parsed.text, winner: parsed.winner };
      for (let span = 0; span < parsed.colspan; span += 1) {
        cells[col] = logical;
        carries[col] = parsed.rowspan > 1 ? { left: parsed.rowspan - 1, cell: logical } : undefined;
        col += 1;
      }
    }
    takeCarry();
    grid.push({ header, cells });
  }

  return grid;
};

const dedupeAwards = (awards: ScrapedAward[]): ScrapedAward[] => {
  const deduped = new Map<string, ScrapedAward>();
  for (const award of awards) {
    const key = `${award.mediaType}|${award.awardName}|${award.year}|${award.category}|${award.title.toLowerCase()}`;
    const previous = deduped.get(key);
    if (!previous || (previous.status !== 'vencedor' && award.status === 'vencedor')) {
      deduped.set(key, award);
    }
  }
  return [...deduped.values()];
};

const parseWikitableElement = (
  $: cheerio.CheerioAPI,
  table: any,
  source: Pick<AwardScrapeSource, 'awardName' | 'category' | 'mediaType'>,
): ScrapedAward[] => {
  const grid = expandTable($, table);
  const headerRow = grid.find((row) => row.header);
  if (!headerRow) return [];

  const headers = headerRow.cells.map((cell) => cell.text);
  const yearIdx = findYearColumn(headers);
  const titleIdx = findTitleColumn(headers);
  if (yearIdx < 0 || titleIdx < 0 || yearIdx === titleIdx) return [];

  const columnIsWinner = normalizeHeader(headers[titleIdx]).startsWith('vencedor');
  const categoryIdx = headers.findIndex((header) => normalizeHeader(header) === 'categoria');
  const awards: ScrapedAward[] = [];
  let seenHeader = false;

  for (const row of grid) {
    if (row.header && !seenHeader) {
      seenHeader = true;
      continue;
    }
    if (!seenHeader || row.header) continue;

    const year = extractYear(row.cells[yearIdx]?.text ?? '');
    const title = cleanTitle(row.cells[titleIdx]?.text ?? '');
    if (!year || !title || isPlaceholderTitle(title)) continue;

    const categoryFromColumn = categoryIdx >= 0 ? cleanTitle(row.cells[categoryIdx]?.text ?? '') : '';
    awards.push({
      awardName: source.awardName,
      year,
      category: categoryFromColumn || source.category,
      title,
      status: columnIsWinner || row.cells[titleIdx]?.winner ? 'vencedor' : 'indicado',
      mediaType: source.mediaType,
    });
  }

  return awards;
};

// A partir dos anos 1980 a página de série do Globo de Ouro troca a wikitable por
// lista: o item em negrito é "2019: Succession – HBO" e os subitens são indicados.
const parseAwardBulletLists = (
  $: cheerio.CheerioAPI,
  source: Pick<AwardScrapeSource, 'awardName' | 'category' | 'mediaType'>,
): ScrapedAward[] => {
  const awards: ScrapedAward[] = [];

  $('li').each((_index, li) => {
    if ($(li).parents('table.wikitable, .reflist, ol.references, #toc, .vector-toc').length > 0) return;
    // Só a linha do vencedor vem em negrito e começa com o ano ("2019: Succession").
    // Listas do tipo "1929/30–1940: nome antigo da categoria" não entram.
    if ($(li).children('b, strong').length === 0) return;

    const own = $(li).clone();
    own.find('ul, ol, sup').remove();
    if (own.find('a').length === 0) return;

    const ownText = own.text().replace(/\s+/g, ' ').trim();
    const match = ownText.match(/^((?:18|19|20)\d{2})\s*:\s*(.+)$/);
    if (!match) return;

    const year = parseInt(match[1], 10);
    const title = cleanTitle(match[2]);
    if (!title || isPlaceholderTitle(title)) return;

    awards.push({
      awardName: source.awardName,
      year,
      category: source.category,
      title,
      status: 'vencedor',
      mediaType: source.mediaType,
    });

    $(li)
      .children('ul, ol')
      .children('li')
      .each((_nomineeIndex, nominee) => {
        const nomineeClone = $(nominee).clone();
        nomineeClone.find('ul, ol, sup').remove();
        const nomineeTitle = cleanTitle(nomineeClone.text());
        if (!nomineeTitle || isPlaceholderTitle(nomineeTitle)) return;
        awards.push({
          awardName: source.awardName,
          year,
          category: source.category,
          title: nomineeTitle,
          status: 'indicado',
          mediaType: source.mediaType,
        });
      });
  });

  return awards;
};

export function parseWikitableAwardHtml(
  html: string,
  source: Pick<AwardScrapeSource, 'awardName' | 'category' | 'mediaType'>,
): ScrapedAward[] {
  const $ = cheerio.load(html);
  const awards: ScrapedAward[] = [];
  $('table.wikitable').each((_index, table) => {
    awards.push(...parseWikitableElement($, table, source));
  });
  awards.push(...parseAwardBulletLists($, source));
  return dedupeAwards(awards);
}

const readListItem = ($: cheerio.CheerioAPI, item: any): { title: string; winner: boolean } => {
  const clone = $(item).clone();
  clone.find('ul, ol, sup').remove();
  const bold = clone.find('b, strong').first();
  const winner = bold.length > 0;
  const raw = (winner ? bold.text() : clone.text()).trim();
  return { title: cleanTitle(raw), winner };
};

export function parseGameAwardsYearHtml(html: string, year: number): ScrapedAward[] {
  const $ = cheerio.load(html);
  const awards: ScrapedAward[] = [];

  $('table.wikitable').each((_index, table) => {
    const firstHeader = normalizeHeader($(table).find('th').first().text());
    if (!firstHeader.includes('jogo do ano')) return;

    $(table)
      .children('tbody')
      .children('tr')
      .first()
      .next('tr')
      .children('td')
      .first()
      .find('li')
      .each((_itemIndex, item) => {
        const { title, winner } = readListItem($, item);
        if (!title || isPlaceholderTitle(title)) return;
        awards.push({
          awardName: 'The Game Awards',
          year,
          category: 'Jogo do Ano',
          title,
          status: winner ? 'vencedor' : 'indicado',
          mediaType: 'jogo',
        });
      });
  });

  return dedupeAwards(awards);
}
