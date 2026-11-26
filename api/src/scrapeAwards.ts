import { prisma } from './clients';
import { Prisma } from '@prisma/client';
import { logger } from './logger';
import { findMediaByAwardTitle } from './awardMediaMatcher';
import {
  AWARD_SCRAPE_SOURCES,
  fetchWikipediaHtml,
  parseGameAwardsYearHtml,
  parseWikitableAwardHtml,
  type AwardScrapeSource,
  type ScrapedAward,
} from './awardTableParser';

interface AwardEntry {
  nome: string;
  ano: number;
  categoria: string;
  status: 'vencedor' | 'indicado';
}

interface ScrapeStats {
  scraped: number;
  matched: number;
  updated: number;
  skippedDuplicate: number;
  notFound: number;
}

const scrapeWikitableAwards = async (source: AwardScrapeSource): Promise<ScrapedAward[]> => {
  try {
    const html = await fetchWikipediaHtml(source.url);
    const scrapedAwards = parseWikitableAwardHtml(html, source);
    logger.info(`Scraping Wikipedia (${source.awardName}): ${scrapedAwards.length} entradas em ${source.url}`);
    return scrapedAwards;
  } catch (error) {
    logger.error(`Erro ao fazer scraping da Wikipedia (${source.awardName}):`, error);
    return [];
  }
};

const scrapeGameAwardsYearPage = async (year: number): Promise<ScrapedAward[]> => {
  const url = `https://pt.wikipedia.org/wiki/The_Game_Awards_${year}`;
  try {
    const html = await fetchWikipediaHtml(url);
    return parseGameAwardsYearHtml(html, year);
  } catch (error) {
    logger.warn(`Não foi possível buscar indicados TGA ${year}: ${error}`);
    return [];
  }
};

const scrapeTheGameAwards = async (source: AwardScrapeSource): Promise<ScrapedAward[]> => {
  let winners: ScrapedAward[] = [];
  try {
    const html = await fetchWikipediaHtml(source.url);
    winners = parseWikitableAwardHtml(html, source);
    logger.info(`Scraping TGA (vencedores): ${winners.length} entradas.`);
  } catch (error) {
    logger.error('Erro ao fazer scraping da Wikipedia para The Game Awards:', error);
  }

  const yearsForNominees = [...new Set(winners.map((award) => award.year))]
    .filter((year) => year >= 2019)
    .sort((a, b) => b - a)
    .slice(0, 6);

  const scrapedAwards = [...winners];
  for (const year of yearsForNominees) {
    scrapedAwards.push(...(await scrapeGameAwardsYearPage(year)));
  }

  const deduped = new Map<string, ScrapedAward>();
  for (const entry of scrapedAwards) {
    const key = `${entry.year}|${entry.category}|${entry.title}|${entry.status}`;
    const previous = deduped.get(key);
    if (!previous || (previous.status !== 'vencedor' && entry.status === 'vencedor')) {
      deduped.set(key, entry);
    }
  }

  const result = [...deduped.values()];
  logger.info(`Scraping The Game Awards concluído: ${result.length} entradas únicas.`);
  return result;
};

const scrapeSource = async (source: AwardScrapeSource): Promise<ScrapedAward[]> => {
  if (source.kind === 'wikitable') return scrapeWikitableAwards(source);
  if (source.kind === 'game-awards') return scrapeTheGameAwards(source);
  return [];
};

const persistAward = async (awardData: ScrapedAward, stats: ScrapeStats): Promise<void> => {
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

  const allScrapedAwards: ScrapedAward[] = [];

  for (const source of AWARD_SCRAPE_SOURCES) {
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
