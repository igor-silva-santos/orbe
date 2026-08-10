import { prisma } from './clients';
import { Prisma } from '@prisma/client';
import { logger } from './logger';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { AwardMediaType, cleanScrapedMediaTitle, findMediaByAwardTitle } from './awardMediaMatcher';

interface AwardEntry {
  nome: string;
  ano: number;
  categoria: string;
  status: 'vencedor' | 'indicado';
}

interface ScrapedAwardData {
  awardName: string;
  year: number;
  category: string;
  title: string;
  status: 'vencedor' | 'indicado';
  mediaType: AwardMediaType;
}

interface AwardSource {
  awardName: string;
  url: string;
  mediaType: AwardMediaType;
  kind: 'wikitable' | 'game-awards';
}

interface ScrapeStats {
  scraped: number;
  matched: number;
  updated: number;
  skippedDuplicate: number;
  notFound: number;
}

const AWARD_SOURCES: AwardSource[] = [
  {
    awardName: 'Oscar',
    url: 'https://pt.wikipedia.org/wiki/Lista_de_vencedores_e_indicados_ao_Oscar_de_melhor_filme',
    mediaType: 'filme',
    kind: 'wikitable',
  },
  {
    awardName: 'Globo de Ouro',
    url: 'https://pt.wikipedia.org/wiki/Globo_de_Ouro_de_melhor_filme_dramático',
    mediaType: 'filme',
    kind: 'wikitable',
  },
  {
    awardName: 'Globo de Ouro',
    url: 'https://pt.wikipedia.org/wiki/Globo_de_Ouro_de_melhor_série_dramática',
    mediaType: 'serie',
    kind: 'wikitable',
  },
  {
    awardName: 'The Game Awards',
    url: 'https://pt.wikipedia.org/wiki/The_Game_Awards',
    mediaType: 'jogo',
    kind: 'game-awards',
  },
];

const extractCellText = ($: cheerio.CheerioAPI, cell: any): string => {
  const clone = $(cell).clone();
  clone.find('sup').remove();
  return cleanScrapedMediaTitle(clone.text().replace(/\s+/g, ' ').trim());
};

const scrapeWikitableAwards = async (source: AwardSource): Promise<ScrapedAwardData[]> => {
  const scrapedAwards: ScrapedAwardData[] = [];

  try {
    const response = await axios.get(source.url, { timeout: 30000 });
    const $ = cheerio.load(response.data);

    let currentYear: number | null = null;
    let currentCategory: string | null = null;

    $('table.wikitable tbody tr').each((_i, row) => {
      const cells = $(row).find('td');
      if (cells.length < 3) return;

      const yearText = extractCellText($, cells[0]);
      if (yearText) {
        const yearMatch = yearText.match(/\d{4}/);
        if (yearMatch) currentYear = parseInt(yearMatch[0], 10);
      }

      const categoryText = extractCellText($, cells[1]);
      if (categoryText) currentCategory = categoryText;

      const mediaTitle = extractCellText($, cells[2]);
      const isWinner = $(cells[2]).find('b').length > 0;

      if (currentYear && currentCategory && mediaTitle) {
        scrapedAwards.push({
          awardName: source.awardName,
          year: currentYear,
          category: currentCategory,
          title: mediaTitle,
          status: isWinner ? 'vencedor' : 'indicado',
          mediaType: source.mediaType,
        });
      }
    });

    logger.info(`Scraping Wikipedia (${source.awardName}): ${scrapedAwards.length} entradas em ${source.url}`);
  } catch (error) {
    logger.error(`Erro ao fazer scraping da Wikipedia (${source.awardName}):`, error);
  }

  return scrapedAwards;
};

const parseGameTitleFromListItem = ($: cheerio.CheerioAPI, item: any): { title: string; isWinner: boolean } => {
  const clone = $(item).clone();
  clone.find('sup').remove();

  const bold = clone.find('b').first();
  const isWinner = bold.length > 0;
  const raw = (isWinner ? bold.text() : clone.text()).trim();
  const title = cleanScrapedMediaTitle(raw.split('–')[0].split('-')[0].trim());

  return { title, isWinner };
};

const scrapeGameAwardsYearPage = async (year: number): Promise<ScrapedAwardData[]> => {
  const scrapedAwards: ScrapedAwardData[] = [];
  const url = `https://pt.wikipedia.org/wiki/The_Game_Awards_${year}`;

  try {
    const response = await axios.get(url, { timeout: 30000 });
    const $ = cheerio.load(response.data);

    $('table.wikitable').each((_i, table) => {
      const headerText = $(table).find('th').first().text().trim();
      if (!/jogo do ano/i.test(headerText)) return;

      $(table)
        .find('td')
        .first()
        .find('li')
        .each((_j, item) => {
          const { title, isWinner } = parseGameTitleFromListItem($, item);
          if (!title) return;

          scrapedAwards.push({
            awardName: 'The Game Awards',
            year,
            category: 'Jogo do Ano',
            title,
            status: isWinner ? 'vencedor' : 'indicado',
            mediaType: 'jogo',
          });
        });
    });
  } catch (error) {
    logger.warn(`Não foi possível buscar indicados TGA ${year}: ${error}`);
  }

  return scrapedAwards;
};

const scrapeTheGameAwards = async (source: AwardSource): Promise<ScrapedAwardData[]> => {
  const scrapedAwards: ScrapedAwardData[] = [];
  const yearsForNominees: number[] = [];

  try {
    const response = await axios.get(source.url, { timeout: 30000 });
    const $ = cheerio.load(response.data);

    $('table.wikitable tbody tr').each((_i, row) => {
      const cells = $(row).find('td');
      if (cells.length < 3) return;

      const ceremony = extractCellText($, cells[0]);
      const yearMatch = ceremony.match(/The Game Awards\s+(\d{4})/i);
      if (!yearMatch) return;

      const year = parseInt(yearMatch[1], 10);
      const winner = extractCellText($, cells[2]);
      if (!winner || winner.length < 2 || /milh/i.test(winner)) return;

      scrapedAwards.push({
        awardName: 'The Game Awards',
        year,
        category: 'Jogo do Ano',
        title: winner,
        status: 'vencedor',
        mediaType: 'jogo',
      });

      if (year >= 2019) yearsForNominees.push(year);
    });

    logger.info(`Scraping TGA (vencedores): ${scrapedAwards.length} entradas.`);
  } catch (error) {
    logger.error('Erro ao fazer scraping da Wikipedia para The Game Awards:', error);
  }

  const uniqueYears = [...new Set(yearsForNominees)].sort((a, b) => b - a).slice(0, 6);
  for (const year of uniqueYears) {
    const nominees = await scrapeGameAwardsYearPage(year);
    scrapedAwards.push(...nominees);
  }

  const deduped = new Map<string, ScrapedAwardData>();
  for (const entry of scrapedAwards) {
    const key = `${entry.year}|${entry.category}|${entry.title}|${entry.status}`;
    deduped.set(key, entry);
  }

  const result = [...deduped.values()];
  logger.info(`Scraping The Game Awards concluído: ${result.length} entradas únicas.`);
  return result;
};

const scrapeSource = async (source: AwardSource): Promise<ScrapedAwardData[]> => {
  if (source.kind === 'wikitable') return scrapeWikitableAwards(source);
  if (source.kind === 'game-awards') return scrapeTheGameAwards(source);
  return [];
};

const persistAward = async (awardData: ScrapedAwardData, stats: ScrapeStats): Promise<void> => {
  const { media, score } = await findMediaByAwardTitle(awardData.title, awardData.mediaType);

  if (!media) {
    stats.notFound++;
    logger.warn(
      `Mídia não encontrada: "${awardData.title}" (${awardData.mediaType}, ${awardData.year}, score=${score.toFixed(2)})`
    );
    return;
  }

  stats.matched++;

  const currentAwards = (Array.isArray(media.premiacoes) ? media.premiacoes : []) as AwardEntry[];
  const newAwardEntry: AwardEntry = {
    nome: awardData.awardName,
    ano: awardData.year,
    categoria: awardData.category,
    status: awardData.status,
  };

  const isDuplicate = currentAwards.some(
    (award) =>
      award.nome === newAwardEntry.nome &&
      award.ano === newAwardEntry.ano &&
      award.categoria === newAwardEntry.categoria &&
      award.status === newAwardEntry.status
  );

  if (isDuplicate) {
    stats.skippedDuplicate++;
    return;
  }

  currentAwards.push(newAwardEntry);
  const updateData = { premiacoes: currentAwards as unknown as Prisma.InputJsonValue };

  switch (awardData.mediaType) {
    case 'filme':
      await prisma.filme.update({ where: { id: media.id }, data: updateData });
      break;
    case 'serie':
      await prisma.serie.update({ where: { id: media.id }, data: updateData });
      break;
    case 'anime':
      await prisma.anime.update({ where: { id: media.id }, data: updateData });
      break;
    case 'jogo':
      await prisma.jogo.update({ where: { id: media.id }, data: updateData });
      break;
    default:
      return;
  }

  stats.updated++;
  logger.info(
    `Prêmio "${newAwardEntry.nome}" (${newAwardEntry.categoria}, ${newAwardEntry.status}) adicionado a "${awardData.title}" (score=${score.toFixed(2)}).`
  );
};

export async function runAwardScraper(): Promise<ScrapeStats> {
  logger.info('Iniciando Web Scraping para Premiações...');

  const stats: ScrapeStats = {
    scraped: 0,
    matched: 0,
    updated: 0,
    skippedDuplicate: 0,
    notFound: 0,
  };

  const allScrapedAwards: ScrapedAwardData[] = [];

  for (const source of AWARD_SOURCES) {
    const entries = await scrapeSource(source);
    allScrapedAwards.push(...entries);
  }

  stats.scraped = allScrapedAwards.length;

  for (const awardData of allScrapedAwards) {
    try {
      await persistAward(awardData, stats);
    } catch (error) {
      logger.error(`Erro ao processar prêmio para ${awardData.title} (${awardData.year}):`, error);
    }
  }

  logger.info(
    `Web Scraping para Premiações concluído. scraped=${stats.scraped}, matched=${stats.matched}, updated=${stats.updated}, duplicates=${stats.skippedDuplicate}, notFound=${stats.notFound}`
  );

  return stats;
}

if (require.main === module) {
  runAwardScraper()
    .then(() => prisma.$disconnect())
    .catch((err) => {
      logger.error(err);
      return prisma.$disconnect();
    });
}
