import { prisma, tmdb } from './clients';
import { logger } from './logger';
import puppeteer, { Browser } from 'puppeteer';
import { refreshFilmeAvailabilityFromTmdb } from './filmeAvailability';
import {
  buildIngressoLink,
  buildIngressoSlugCandidates,
  extractIngressoUrlKey,
  fetchIngressoByUrlKey,
  fetchIngressoCatalog,
  findIngressoMatchInCatalog,
  findIngressoMatchViaSearch,
  IngressoEvent,
  IngressoMatch,
} from './ingressoClient';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type ScrapeResult = {
  pageExists: boolean;
  hasCinemaSessions: boolean;
  isPreSale: boolean;
  transientError: boolean;
  statusCode?: number;
  errorMessage?: string;
};

async function checkStreamingAvailability(tmdbId: number, filmeDbId: number) {
  try {
    const movieDetails = (await tmdb.movieInfo({
      id: tmdbId,
      language: 'pt-BR',
      append_to_response: 'watch/providers,release_dates',
    })) as any;
    const result = await refreshFilmeAvailabilityFromTmdb(prisma, { id: filmeDbId, tmdbId }, movieDetails);

    const brProviders = movieDetails['watch/providers']?.results?.BR;
    const digitalRelease = brProviders?.rent || brProviders?.buy || brProviders?.flatrate;
    const providerNames = digitalRelease?.map((p: any) => p.provider_name) ?? [];

    return {
      available: result.estreiaStreaming && result.providerCount > 0,
      providers: providerNames,
      estreiaStreaming: result.estreiaStreaming,
      estreiaCinema: result.estreiaCinema,
    };
  } catch (error) {
    logger.error(`Erro ao verificar streaming para TMDB ID ${tmdbId}:`, error);
    return {
      available: false,
      providers: [] as string[],
      estreiaStreaming: false,
      estreiaCinema: false,
    };
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

async function createPreSaleNotification(filme: { tmdbId: number; title: string }, ingressoLink: string | null) {
  try {
    const interestedUsers = await prisma.preferencias_usuario_midia.findMany({
      where: {
        midia_id: filme.tmdbId,
        tipo_midia: 'filme',
        status: { in: ['favorito', 'quero_assistir', 'acompanhando'] },
      },
      select: { usuario_id: true },
    });

    const linkHint = ingressoLink ? ' Ingressos no Ingresso.com.' : '';
    const message = `🎟️ "${filme.title}" entrou em pré-venda!${linkHint}`;

    const notifications = interestedUsers.map((u) => ({
      userId: u.usuario_id,
      type: 'PRE_SALE',
      message,
      relatedMediaId: filme.tmdbId,
      relatedMediaType: 'filme',
    }));

    if (notifications.length > 0) {
      await prisma.notification.createMany({ data: notifications });
      logger.info(`Notificações de pré-venda enviadas para ${notifications.length} usuários sobre "${filme.title}".`);
    }
  } catch (error) {
    logger.error(`Erro ao criar notificações de pré-venda para "${filme.title}":`, error);
  }
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

function needsIngressoMonitoring(
  filme: {
    ingresso_sem_pagina: boolean;
    ingresso_link: string | null;
    prevenda_confirmada: boolean;
    releaseDate: Date | null;
  },
  now: Date,
): 'none' | 'link_only' | 'full' {
  if (filme.ingresso_sem_pagina) return 'none';

  const hasLink = Boolean(filme.ingresso_link);
  const releasePassed = releaseDatePassed(filme.releaseDate, now);

  if (releasePassed) {
    return hasLink ? 'none' : 'link_only';
  }

  // Antes da estreia: sempre revalidar link, pré-venda e sessões (dados do Ingresso mudam rápido).
  return 'full';
}

function getPuppeteerLaunchOptions() {
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  logger.info(
    `[detetive] Puppeteer launch${executablePath ? ` com Chromium em ${executablePath}` : ' (bundled Chromium)'}`,
  );
  return {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    ...(executablePath ? { executablePath } : {}),
  };
}

function isIngressoNotFound(content: string): boolean {
  return content.includes('NEXT_HTTP_ERROR_FALLBACK') || /Ocorreu um erro/i.test(content);
}

function isTransientPuppeteerError(message: string): boolean {
  return /timeout|net::|ERR_|Navigation failed|Target closed|Protocol error/i.test(message);
}

async function scrapeIngressoPage(browser: Browser, url: string): Promise<ScrapeResult> {
  const page = await browser.newPage();
  try {
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    );
    logger.info(`[detetive] Puppeteer goto: ${url}`);
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    const statusCode = response?.status();

    await page.waitForSelector('body', { timeout: 5_000 }).catch(() => undefined);
    const pageContent = await page.content();

    if (!response || statusCode === 404 || isIngressoNotFound(pageContent)) {
      logger.info(`[detetive] Página não encontrada (${statusCode ?? 'sem status'}): ${url}`);
      return {
        pageExists: false,
        hasCinemaSessions: false,
        isPreSale: false,
        transientError: false,
        statusCode,
      };
    }

    const hasCinemaSessions = !pageContent.includes('Não há sessões disponíveis no momento.');
    const isPreSale =
      /pré-?venda/i.test(pageContent) ||
      /pre-?sale/i.test(pageContent) ||
      /"inPreSale"\s*:\s*true/i.test(pageContent);
    logger.info(
      `[detetive] Página OK (${statusCode}) — sessões: ${hasCinemaSessions}, pré-venda: ${isPreSale}`,
    );

    return {
      pageExists: true,
      hasCinemaSessions,
      isPreSale,
      transientError: false,
      statusCode,
    };
  } catch (error: any) {
    const message = error?.message ?? String(error);
    const transientError = isTransientPuppeteerError(message);
    logger.warn(`[detetive] Erro ao acessar ${url}: ${message}${transientError ? ' (transitório)' : ''}`);
    return {
      pageExists: false,
      hasCinemaSessions: false,
      isPreSale: false,
      transientError,
      errorMessage: message,
    };
  } finally {
    await page.close();
  }
}

async function discoverIngressoViaPuppeteer(
  browser: Browser,
  filme: { title: string; originalTitle?: string | null; releaseDate?: Date | null },
  existingLink?: string | null,
): Promise<{ link: string | null; pageExists: boolean; hasCinemaSessions: boolean; isPreSale: boolean; transientError: boolean }> {
  const urlsToTry = new Set<string>();
  if (existingLink) urlsToTry.add(existingLink);
  for (const slug of buildIngressoSlugCandidates(filme)) {
    urlsToTry.add(buildIngressoLink(slug));
  }

  logger.info(`[detetive] Fallback Puppeteer — ${urlsToTry.size} URL(s) para "${filme.title}"`);

  let sawTransientError = false;
  for (const url of urlsToTry) {
    const result = await scrapeIngressoPage(browser, url);
    if (result.transientError) {
      sawTransientError = true;
      continue;
    }
    if (result.pageExists) {
      return { link: url, ...result };
    }
  }

  return {
    link: null,
    pageExists: false,
    hasCinemaSessions: false,
    isPreSale: false,
    transientError: sawTransientError,
  };
}

async function resolveIngressoForFilme(
  filme: {
    title: string;
    originalTitle?: string | null;
    releaseDate?: Date | null;
    ingresso_link?: string | null;
  },
  catalog: IngressoEvent[],
  browser?: Browser,
  options?: { verifyPreSaleInPage?: boolean },
): Promise<{
  match: IngressoMatch | null;
  puppeteerFallback: { link: string | null; pageExists: boolean; hasCinemaSessions: boolean; isPreSale: boolean; transientError: boolean } | null;
}> {
  logger.info(`[detetive] Resolvendo ingresso.com para "${filme.title}"...`);

  const existingKey = extractIngressoUrlKey(filme.ingresso_link);
  if (existingKey) {
    const refreshed = await fetchIngressoByUrlKey(existingKey);
    if (refreshed) {
      logger.info(`[detetive] Atualizado via urlKey existente: ${refreshed.link}`);
      return { match: await maybeVerifyPreSaleInPage(refreshed, browser, options?.verifyPreSaleInPage), puppeteerFallback: null };
    }
  }

  const catalogMatch = await findIngressoMatchInCatalog(filme, catalog);
  if (catalogMatch) {
    logger.info(`[detetive] Encontrado via API (catálogo): ${catalogMatch.link}`);
    return { match: await maybeVerifyPreSaleInPage(catalogMatch, browser, options?.verifyPreSaleInPage), puppeteerFallback: null };
  }

  const searchMatch = await findIngressoMatchViaSearch(filme);
  if (searchMatch) {
    logger.info(`[detetive] Encontrado via API (busca): ${searchMatch.link}`);
    return { match: await maybeVerifyPreSaleInPage(searchMatch, browser, options?.verifyPreSaleInPage), puppeteerFallback: null };
  }

  if (!browser) {
    logger.warn(`[detetive] Sem match na API e Puppeteer indisponível para "${filme.title}"`);
    return { match: null, puppeteerFallback: null };
  }

  logger.info(`[detetive] API sem match — tentando Puppeteer para "${filme.title}"`);
  const puppeteerResult = await discoverIngressoViaPuppeteer(browser, filme, filme.ingresso_link);
  if (puppeteerResult.pageExists && puppeteerResult.link) {
    return {
      match: {
        urlKey: puppeteerResult.link.split('/filme/')[1]?.split('?')[0] ?? '',
        title: filme.title,
        link: puppeteerResult.link,
        inPreSale: puppeteerResult.isPreSale,
        isPlaying: puppeteerResult.hasCinemaSessions,
        hasCinemaSessions: puppeteerResult.hasCinemaSessions,
        source: 'url_key',
      },
      puppeteerFallback: puppeteerResult,
    };
  }

  return { match: null, puppeteerFallback: puppeteerResult };
}

/** API coming-soon às vezes retorna inPreSale=false com pré-venda visível na página — confirma no HTML. */
async function maybeVerifyPreSaleInPage(
  match: IngressoMatch,
  browser?: Browser,
  verify = true,
): Promise<IngressoMatch> {
  if (!verify || !browser || match.inPreSale) return match;

  const scraped = await scrapeIngressoPage(browser, match.link);
  if (!scraped.pageExists || scraped.transientError) return match;

  if (scraped.isPreSale) {
    logger.info(`[detetive] API dizia sem pré-venda, página confirma PRÉ-VENDA: ${match.link}`);
    return {
      ...match,
      inPreSale: true,
      hasCinemaSessions: scraped.hasCinemaSessions || match.hasCinemaSessions,
      isPlaying: scraped.hasCinemaSessions || match.isPlaying,
    };
  }

  return match;
}

export type DetetiveProgressCallback = (processed: number, total: number) => void | Promise<void>;

export async function runDetetive(
  fullScan = false,
  disconnectWhenDone = false,
  onProgress?: DetetiveProgressCallback,
) {
  let browser: Browser | undefined;
  try {
    logger.info(`--- Iniciando Detetive Digital 2.1 ${fullScan ? '(Varredura Completa)' : ''} ---`);

    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const threeMonthsAhead = new Date();
    threeMonthsAhead.setMonth(threeMonthsAhead.getMonth() + 3);

    const targetMovies = await prisma.filme.findMany({
      where: {
        AND: [
          {
            OR: [
              { estreia_cinema: true },
              { emCartaz: true },
              { emBreve: true },
              { em_prevenda: true },
            ],
          },
          { OR: [{ voteCount: { gt: 25 } }, { popularity: { gt: 10 } }] },
          { releaseDate: { gte: sixMonthsAgo, lte: threeMonthsAhead } },
        ],
      },
      include: { streamingProviders: true },
    });

    logger.info(`[detetive] ${targetMovies.length} filmes na janela de monitoramento.`);

    if (targetMovies.length === 0) return;

    const totalFilmes = targetMovies.length;
    let processedFilmes = 0;

    logger.info('[detetive] Carregando catálogo ingresso.com (API oficial)...');
    const ingressoCatalog = await fetchIngressoCatalog();
    logger.info(`[detetive] Catálogo ingresso.com: ${ingressoCatalog.length} filmes indexados.`);

    const needsPuppeteer = targetMovies.some((filme) => {
      if (filme.ingresso_sem_pagina) return false;
      return !releaseDatePassed(filme.releaseDate, now);
    });

    if (needsPuppeteer) {
      browser = await puppeteer.launch(getPuppeteerLaunchOptions());
    } else {
      logger.info('[detetive] Nenhum filme precisa de fallback Puppeteer nesta execução.');
    }

    for (const filme of targetMovies) {
      try {
        const releasePassed = releaseDatePassed(filme.releaseDate, now);
        const wasPrevenda = Boolean(filme.em_prevenda);
        let ingressoSemPagina = filme.ingresso_sem_pagina;
        let ingressoLink = filme.ingresso_link;
        let temSessoes = filme.tem_sessoes ?? false;
        let emPrevenda = releasePassed ? false : Boolean(filme.em_prevenda);
        let prevendaConfirmada = filme.prevenda_confirmada;

        if (releasePassed && filme.em_prevenda) {
          logger.info(`[detetive] "${filme.title}" já estreou — removendo flag de pré-venda.`);
        }

        const ingressoMode = needsIngressoMonitoring(
          {
            ingresso_sem_pagina: ingressoSemPagina,
            ingresso_link: ingressoLink,
            prevenda_confirmada: prevendaConfirmada,
            releaseDate: filme.releaseDate,
          },
          now,
        );

        if (ingressoMode !== 'none') {
          logger.info(
            `[detetive] Verificando ingresso.com (${ingressoMode === 'link_only' ? 'só link' : 'link + pré-venda'}): "${filme.title}"`,
          );
          const hadExistingLink = Boolean(filme.ingresso_link);
          const { match, puppeteerFallback } = await resolveIngressoForFilme(
            filme,
            ingressoCatalog,
            browser,
            { verifyPreSaleInPage: ingressoMode === 'full' },
          );

          if (match) {
            ingressoLink = match.link;
            ingressoSemPagina = false;

            if (ingressoMode === 'link_only') {
              logger.info(`[detetive] Link salvo (pós-estreia): ${ingressoLink}`);
            } else {
              temSessoes = match.hasCinemaSessions;

              if (match.inPreSale) {
                emPrevenda = true;
                if (!prevendaConfirmada) {
                  prevendaConfirmada = true;
                  logger.info(`[detetive] "${filme.title}" em pré-venda confirmada (fonte: ${match.source}).`);
                }
              } else if (!prevendaConfirmada) {
                emPrevenda = false;
              }
            }
          } else if (puppeteerFallback?.transientError) {
            logger.warn(
              `[detetive] "${filme.title}" — erro transitório no Puppeteer; mantendo estado atual (link=${ingressoLink ?? 'nenhum'}).`,
            );
          } else if (hadExistingLink && ingressoLink && browser) {
            const scraped = await scrapeIngressoPage(browser, ingressoLink);
            if (scraped.pageExists && !scraped.transientError) {
              temSessoes = scraped.hasCinemaSessions;
              if (scraped.isPreSale) {
                emPrevenda = true;
                if (!prevendaConfirmada) {
                  prevendaConfirmada = true;
                  logger.info(`[detetive] "${filme.title}" pré-venda confirmada via página (fallback).`);
                }
              }
            } else {
              logger.warn(
                `[detetive] "${filme.title}" — não revalidou link existente; mantendo ${ingressoLink}.`,
              );
            }
          } else if (hadExistingLink && ingressoLink) {
            logger.warn(
              `[detetive] "${filme.title}" — não revalidou link existente; mantendo ${ingressoLink}.`,
            );
          } else {
            ingressoSemPagina = true;
            ingressoLink = null;
            if (ingressoMode === 'full') {
              temSessoes = false;
            }
            logger.info(`[detetive] "${filme.title}" sem página no ingresso.com — monitoramento encerrado.`);
          }
        } else if (ingressoSemPagina) {
          logger.info(`[detetive] "${filme.title}" — ingresso.com indisponível, pulando.`);
        } else if (releasePassed && ingressoLink) {
          logger.info(`[detetive] "${filme.title}" — já estreou e link existe, pulando.`);
        }

        const streaming = await checkStreamingAvailability(filme.tmdbId, filme.id);
        const isNowDigital = streaming.available && !filme.streamingProviders.length;

        await prisma.filme.update({
          where: { id: filme.id },
          data: {
            ingresso_link: ingressoLink,
            ingresso_sem_pagina: ingressoSemPagina,
            tem_sessoes: temSessoes,
            em_prevenda: emPrevenda,
            prevenda_confirmada: prevendaConfirmada,
            ultima_verificacao_ingresso: ingressoMode !== 'none' ? new Date() : filme.ultima_verificacao_ingresso,
            estreia_streaming: streaming.estreiaStreaming,
            estreia_cinema: streaming.estreiaCinema,
            emCartaz: streaming.estreiaCinema ? filme.emCartaz : false,
            emBreve: streaming.estreiaCinema ? filme.emBreve : false,
            status: streaming.available ? 'Released' : filme.status,
          },
        });

        if (isNowDigital) {
          logger.info(`✨ NOVIDADE: "${filme.title}" chegou ao streaming!`);
          await createDigitalReleaseNotification(filme, streaming.providers);
        }

        if (!wasPrevenda && emPrevenda && prevendaConfirmada) {
          logger.info(`🎟️ NOVIDADE: "${filme.title}" em pré-venda!`);
          await createPreSaleNotification(filme, ingressoLink);
        }

        logger.info(
          `[detetive] "${filme.title}" — link: ${ingressoLink ? 'sim' : 'não'}, sessões: ${temSessoes}, pré-venda: ${emPrevenda}, digital: ${streaming.available}`,
        );
      } catch (error: any) {
        logger.error(`[detetive] Erro ao verificar "${filme.title}":`, error.message);
      } finally {
        processedFilmes++;
        await onProgress?.(processedFilmes, totalFilmes);
        await delay(1500);
      }
    }
  } catch (e: any) {
    logger.error('[detetive] Erro fatal:', e.message);
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
