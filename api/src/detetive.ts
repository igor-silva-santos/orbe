import { prisma, tmdbApi } from './clients';
import { logger } from './logger';
import puppeteer, { Browser } from 'puppeteer';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function checkStreamingAvailability(tmdbId: number) {
  try {
    const response = await tmdbApi.get(`/movie/${tmdbId}/watch/providers`);
    const brProviders = response.data.results?.BR;
    const digitalRelease = brProviders?.rent || brProviders?.buy || brProviders?.flatrate;

    if (digitalRelease && digitalRelease.length > 0) {
      return {
        available: true,
        providers: digitalRelease.map((p: any) => p.provider_name),
      };
    }
    return { available: false, providers: [] as string[] };
  } catch (error) {
    logger.error(`Erro ao verificar streaming para TMDB ID ${tmdbId}:`, error);
    return { available: false, providers: [] as string[] };
  }
}

async function createDigitalReleaseNotification(filme: { tmdbId: number; title: string }, providers: string[]) {
  try {
    const interestedUsers = await prisma.preferencias_usuario_midia.findMany({
      where: {
        midia_id: filme.tmdbId,
        tipo_midia: 'filme',
        status: { in: ['favorito', 'quero_assistir'] },
      },
      select: { usuario_id: true },
    });

    const providerList = providers.slice(0, 3).join(', ');
    const message = `🎬 Boas notícias! "${filme.title}" já está disponível digitalmente (ex: ${providerList}).`;

    const notifications = interestedUsers.map((u) => ({
      userId: u.usuario_id,
      type: 'DIGITAL_RELEASE',
      message,
      relatedMediaId: filme.tmdbId,
      relatedMediaType: 'filme',
    }));

    if (notifications.length > 0) {
      await prisma.notification.createMany({ data: notifications });
      logger.info(`Notificações enviadas para ${notifications.length} usuários sobre o filme "${filme.title}".`);
    }
  } catch (error) {
    logger.error(`Erro ao criar notificações para "${filme.title}":`, error);
  }
}

function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function releaseDatePassed(releaseDate: Date | null | undefined, now: Date): boolean {
  if (!releaseDate) return false;
  return startOfDay(releaseDate).getTime() <= startOfDay(now).getTime();
}

function needsIngressoMonitoring(filme: {
  ingresso_sem_pagina: boolean;
  ingresso_link: string | null;
  em_prevenda: boolean | null;
  prevenda_confirmada: boolean;
  releaseDate: Date | null;
}, now: Date): boolean {
  if (filme.ingresso_sem_pagina) return false;
  if (releaseDatePassed(filme.releaseDate, now)) return false;

  const hasLink = Boolean(filme.ingresso_link);
  const preSaleConfirmed = filme.prevenda_confirmada;

  return !hasLink || !preSaleConfirmed;
}

async function scrapeIngressoPage(
  browser: Browser,
  url: string,
): Promise<{ pageExists: boolean; hasCinemaSessions: boolean; isPreSale: boolean }> {
  const page = await browser.newPage();
  try {
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    );
    const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    if (!response?.ok()) {
      return { pageExists: false, hasCinemaSessions: false, isPreSale: false };
    }
    const pageContent = await page.content();
    return {
      pageExists: true,
      hasCinemaSessions: !pageContent.includes('Não há sessões disponíveis no momento.'),
      isPreSale: /pré-?venda/i.test(pageContent),
    };
  } finally {
    await page.close();
  }
}

export async function runDetetive(fullScan = false, disconnectWhenDone = false) {
  let browser: Browser | undefined;
  try {
    logger.info(`--- Iniciando Detetive Digital 2.0 ${fullScan ? '(Varredura Completa)' : ''} ---`);

    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const threeMonthsAhead = new Date();
    threeMonthsAhead.setMonth(threeMonthsAhead.getMonth() + 3);

    const targetMovies = await prisma.filme.findMany({
      where: {
        tipo_midia: 'filme',
        OR: [{ voteCount: { gt: 25 } }, { popularity: { gt: 10 } }],
        releaseDate: { gte: sixMonthsAgo, lte: threeMonthsAhead },
      },
      include: { streamingProviders: true },
    });

    logger.info(`Encontrados ${targetMovies.length} filmes na janela de monitoramento.`);

    if (targetMovies.length === 0) return;

    browser = await puppeteer.launch({ headless: true });

    for (const filme of targetMovies) {
      try {
        const releasePassed = releaseDatePassed(filme.releaseDate, now);
        let ingressoSemPagina = filme.ingresso_sem_pagina;
        let ingressoLink = filme.ingresso_link;
        let temSessoes = filme.tem_sessoes ?? false;
        let emPrevenda = releasePassed ? false : Boolean(filme.em_prevenda);
        let prevendaConfirmada = filme.prevenda_confirmada;

        if (releasePassed && filme.em_prevenda) {
          logger.info(`📅 "${filme.title}" já estreou — removendo flag de pré-venda.`);
        }

        const shouldCheckIngresso = needsIngressoMonitoring(
          {
            ingresso_sem_pagina: ingressoSemPagina,
            ingresso_link: ingressoLink,
            em_prevenda: emPrevenda,
            prevenda_confirmada: prevendaConfirmada,
            releaseDate: filme.releaseDate,
          },
          now,
        );

        if (shouldCheckIngresso) {
          logger.info(`🕵️ Verificando ingresso.com: "${filme.title}"...`);
          const slug = slugify(filme.title);
          const directUrl = `https://www.ingresso.com/filme/${slug}`;
          const targetUrl = ingressoLink ?? directUrl;
          const ingresso = await scrapeIngressoPage(browser, targetUrl);

          if (!ingresso.pageExists) {
            ingressoSemPagina = true;
            ingressoLink = null;
            temSessoes = false;
            logger.info(`🚫 "${filme.title}" sem página no ingresso.com — monitoramento encerrado.`);
          } else {
            ingressoLink = targetUrl;
            temSessoes = ingresso.hasCinemaSessions;

            if (!prevendaConfirmada && ingresso.isPreSale) {
              emPrevenda = true;
              prevendaConfirmada = true;
              logger.info(`🎟️ "${filme.title}" em pré-venda confirmada.`);
            } else if (!prevendaConfirmada && !ingresso.isPreSale) {
              emPrevenda = false;
            }
          }
        } else if (ingressoSemPagina) {
          logger.info(`⏭️ "${filme.title}" — ingresso.com indisponível, pulando.`);
        } else if (prevendaConfirmada || emPrevenda) {
          logger.info(`⏭️ "${filme.title}" — pré-venda já confirmada, pulando consulta.`);
        } else if (releasePassed) {
          logger.info(`⏭️ "${filme.title}" — já estreou, pulando ingresso.com.`);
        }

        const streaming = await checkStreamingAvailability(filme.tmdbId);
        const isNowDigital = streaming.available && !filme.streamingProviders.length;

        await prisma.filme.update({
          where: { id: filme.id },
          data: {
            ingresso_link: ingressoLink,
            ingresso_sem_pagina: ingressoSemPagina,
            tem_sessoes: temSessoes,
            em_prevenda: emPrevenda,
            prevenda_confirmada: prevendaConfirmada,
            ultima_verificacao_ingresso: new Date(),
            status: streaming.available ? 'Released' : filme.status,
          },
        });

        if (isNowDigital) {
          logger.info(`✨ NOVIDADE: "${filme.title}" chegou ao streaming!`);
          await createDigitalReleaseNotification(filme, streaming.providers);
        }

        logger.info(
          `✅ "${filme.title}" — cinema: ${temSessoes}, pré-venda: ${emPrevenda}, digital: ${streaming.available}`,
        );
      } catch (error: any) {
        logger.error(`Erro ao verificar "${filme.title}":`, error.message);
      } finally {
        await delay(2000);
      }
    }
  } catch (e: any) {
    logger.error('Erro fatal no Detetive Digital 2.0:', e.message);
  } finally {
    if (browser) await browser.close();
    if (disconnectWhenDone) await prisma.$disconnect();
    logger.info('--- Detetive Digital finalizado ---');
  }
}

if (require.main === module) {
  const fullScan = process.argv.includes('--full-scan');
  logger.info(`Detetive Digital sendo executado diretamente... ${fullScan ? 'em modo Varredura Completa' : ''}`);
  runDetetive(fullScan, true);
}
