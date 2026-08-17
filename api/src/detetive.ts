import { prisma, tmdb } from './clients';
import { logger } from './logger';
import puppeteer, { Browser } from 'puppeteer';
import type { Prisma } from '@prisma/client';
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
  IngressoFilmeRef,
} from './ingressoClient';
import { parseIngressoPageContent } from './ingressoPageParser';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const DETETIVE_DELAY_STREAMING_ONLY_MS = 300;
export const DETETIVE_DELAY_API_MS = 500;
export const DETETIVE_DELAY_PUPPETEER_MS = 1500;

export function getDetetiveInterFilmDelayMs(input: {
  ingressoMode: 'none' | 'link_only' | 'full';
  usedPuppeteer: boolean;
}): number {
  if (input.ingressoMode === 'none') return DETETIVE_DELAY_STREAMING_ONLY_MS;
  return input.usedPuppeteer ? DETETIVE_DELAY_PUPPETEER_MS : DETETIVE_DELAY_API_MS;
}

function filmNeedsPuppeteer(
  filme: {
    ingresso_sem_pagina: boolean;
    ingresso_link: string | null;
    prevenda_confirmada: boolean;
    releaseDate: Date | null;
  },
  now: Date,
): boolean {
  const mode = needsIngressoMonitoring(filme, now);
  return mode === 'full' || mode === 'link_only';
}

function toIngressoFilmeRef(filme: {
  title: string;
  originalTitle?: string | null;
  tituloBr?: string | null;
  releaseDate?: Date | null;
}): IngressoFilmeRef {
  return {
    title: filme.title,
    originalTitle: filme.originalTitle,
    tituloBr: filme.tituloBr,
    releaseDate: filme.releaseDate,
  };
}

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

export type CinemaFlagsInput = {
  filmeEmCartaz: boolean;
  filmeEmBreve: boolean;
  temSessoes: boolean;
  emPrevenda: boolean;
  ingressoLink: string | null;
  ingressoMode: 'none' | 'link_only' | 'full';
  estreiaCinema: boolean;
  releasePassed: boolean;
};

export type CinemaFlagsResult = {
  emCartaz: boolean;
  emBreve: boolean;
};

function hasIngressoEvidence(input: Pick<CinemaFlagsInput, 'temSessoes' | 'emPrevenda' | 'ingressoLink' | 'ingressoMode'>): boolean {
  return (
    input.temSessoes ||
    input.emPrevenda ||
    (Boolean(input.ingressoLink) && input.ingressoMode !== 'none')
  );
}

/** Resolve emCartaz/emBreve without letting TMDB estreia_cinema blindly wipe Ingresso/sync evidence. */
export function resolveCinemaFlags(input: CinemaFlagsInput): CinemaFlagsResult {
  const {
    filmeEmCartaz,
    filmeEmBreve,
    temSessoes,
    emPrevenda,
    ingressoLink,
    estreiaCinema,
    releasePassed,
  } = input;

  const ingressoEvidence = hasIngressoEvidence(input);
  const hasLink = Boolean(ingressoLink);

  let emCartaz: boolean;
  if (releasePassed && !temSessoes && !hasLink) {
    emCartaz = false;
  } else {
    emCartaz =
      temSessoes ||
      (filmeEmCartaz && (ingressoEvidence || hasLink)) ||
      (estreiaCinema && filmeEmCartaz);
  }

  const emBreve =
    emPrevenda ||
    (!releasePassed && filmeEmBreve) ||
    (estreiaCinema && filmeEmBreve && !releasePassed);

  return { emCartaz, emBreve };
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
  const hasLink = Boolean(filme.ingresso_link);
  const releasePassed = releaseDatePassed(filme.releaseDate, now);

  // Antes da estreia, reabre monitoramento mesmo se uma tentativa anterior falhou.
  if (filme.ingresso_sem_pagina && releasePassed) return 'none';

  if (releasePassed) {
    return hasLink ? 'none' : 'link_only';
  }

  // Antes da estreia: sempre revalidar link, pré-venda e sessões (dados do Ingresso mudam rápido).
  return 'full';
}

function buildDetetiveMovieWhere(
  now: Date,
  fullScan: boolean,
): {
  sixMonthsAgo: Date;
  threeMonthsAhead: Date;
  where: Prisma.FilmeWhereInput;
} {
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const threeMonthsAhead = new Date(now);
  threeMonthsAhead.setMonth(threeMonthsAhead.getMonth() + (fullScan ? 6 : 3));

  const cinemaInterestFilter = {
    OR: [
      { estreia_cinema: true },
      { emCartaz: true },
      { emBreve: true },
      { em_prevenda: true },
    ],
  };

  const releaseWindowFilter = fullScan
    ? { releaseDate: { gte: sixMonthsAgo, lte: threeMonthsAhead } }
    : {
        OR: [
          { releaseDate: { gte: sixMonthsAgo, lte: threeMonthsAhead } },
          {
            AND: [
              cinemaInterestFilter,
              { ingresso_sem_pagina: true },
              { ingresso_link: null },
              { releaseDate: { gte: now } },
            ],
          },
        ],
      };

  return {
    sixMonthsAgo,
    threeMonthsAhead,
    where: {
      AND: [cinemaInterestFilter, releaseWindowFilter],
    },
  };
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

    if (!response || statusCode === 404) {
      logger.info(`[detetive] Página não encontrada (${statusCode ?? 'sem status'}): ${url}`);
      return {
        pageExists: false,
        hasCinemaSessions: false,
        isPreSale: false,
        transientError: false,
        statusCode,
      };
    }

    const parsed = parseIngressoPageContent(pageContent);
    if (!parsed.pageExists) {
      logger.info(`[detetive] Página não encontrada (${statusCode ?? 'sem status'}): ${url}`);
      return {
        pageExists: false,
        hasCinemaSessions: false,
        isPreSale: false,
        transientError: false,
        statusCode,
      };
    }

    logger.info(
      `[detetive] Página OK (${statusCode}) — sessões: ${parsed.hasCinemaSessions}, pré-venda: ${parsed.isPreSale}`,
    );

    return {
      pageExists: true,
      hasCinemaSessions: parsed.hasCinemaSessions,
      isPreSale: parsed.isPreSale,
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
  filme: IngressoFilmeRef,
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
  filme: IngressoFilmeRef & { ingresso_link?: string | null },
  catalog: IngressoEvent[],
  browser?: Browser,
  options?: { verifyPreSaleInPage?: boolean },
): Promise<{
  match: IngressoMatch | null;
  puppeteerFallback: { link: string | null; pageExists: boolean; hasCinemaSessions: boolean; isPreSale: boolean; transientError: boolean } | null;
  usedPuppeteer: boolean;
}> {
  const ingressoFilme = toIngressoFilmeRef(filme);
  const displayTitle = filme.tituloBr ?? filme.title;
  logger.info(`[detetive] Resolvendo ingresso.com para "${displayTitle}"...`);

  let usedPuppeteer = false;

  const existingKey = extractIngressoUrlKey(filme.ingresso_link);
  if (existingKey) {
    const refreshed = await fetchIngressoByUrlKey(existingKey);
    if (refreshed) {
      logger.info(`[detetive] Atualizado via urlKey existente: ${refreshed.link}`);
      const verified = await maybeVerifyPreSaleInPage(refreshed, browser, options?.verifyPreSaleInPage);
      return { match: verified.match, puppeteerFallback: null, usedPuppeteer: verified.usedPuppeteer };
    }
  }

  const catalogMatch = await findIngressoMatchInCatalog(ingressoFilme, catalog);
  if (catalogMatch) {
    logger.info(`[detetive] Encontrado via API (catálogo): ${catalogMatch.link}`);
    const verified = await maybeVerifyPreSaleInPage(catalogMatch, browser, options?.verifyPreSaleInPage);
    return { match: verified.match, puppeteerFallback: null, usedPuppeteer: verified.usedPuppeteer };
  }

  const searchMatch = await findIngressoMatchViaSearch(ingressoFilme);
  if (searchMatch) {
    logger.info(`[detetive] Encontrado via API (busca): ${searchMatch.link}`);
    const verified = await maybeVerifyPreSaleInPage(searchMatch, browser, options?.verifyPreSaleInPage);
    return { match: verified.match, puppeteerFallback: null, usedPuppeteer: verified.usedPuppeteer };
  }

  if (!browser) {
    logger.warn(`[detetive] Sem match na API e Puppeteer indisponível para "${displayTitle}"`);
    return { match: null, puppeteerFallback: null, usedPuppeteer: false };
  }

  logger.info(`[detetive] API sem match — tentando Puppeteer para "${displayTitle}"`);
  usedPuppeteer = true;
  const puppeteerResult = await discoverIngressoViaPuppeteer(browser, ingressoFilme, filme.ingresso_link);
  if (puppeteerResult.pageExists && puppeteerResult.link) {
    return {
      match: {
        urlKey: puppeteerResult.link.split('/filme/')[1]?.split('?')[0] ?? '',
        title: displayTitle,
        link: puppeteerResult.link,
        inPreSale: puppeteerResult.isPreSale,
        isPlaying: puppeteerResult.hasCinemaSessions,
        hasCinemaSessions: puppeteerResult.hasCinemaSessions,
        source: 'url_key',
      },
      puppeteerFallback: puppeteerResult,
      usedPuppeteer,
    };
  }

  return { match: null, puppeteerFallback: puppeteerResult, usedPuppeteer };
}

/** API coming-soon às vezes retorna inPreSale=false com pré-venda visível na página — confirma no HTML. */
async function maybeVerifyPreSaleInPage(
  match: IngressoMatch,
  browser?: Browser,
  verify = true,
): Promise<{ match: IngressoMatch; usedPuppeteer: boolean }> {
  if (!verify || !browser || match.inPreSale) return { match, usedPuppeteer: false };

  const scraped = await scrapeIngressoPage(browser, match.link);
  if (!scraped.pageExists || scraped.transientError) return { match, usedPuppeteer: true };

  if (scraped.isPreSale) {
    logger.info(`[detetive] API dizia sem pré-venda, página confirma PRÉ-VENDA: ${match.link}`);
    return {
      match: {
        ...match,
        inPreSale: true,
        hasCinemaSessions: scraped.hasCinemaSessions || match.hasCinemaSessions,
        isPlaying: scraped.hasCinemaSessions || match.isPlaying,
      },
      usedPuppeteer: true,
    };
  }

  return { match, usedPuppeteer: true };
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
    const { where: movieWhere } = buildDetetiveMovieWhere(now, fullScan);

    if (fullScan) {
      const reopened = await prisma.filme.updateMany({
        where: {
          ingresso_sem_pagina: true,
          ingresso_link: null,
          OR: [
            { estreia_cinema: true },
            { emCartaz: true },
            { emBreve: true },
            { em_prevenda: true },
          ],
        },
        data: { ingresso_sem_pagina: false },
      });
      if (reopened.count > 0) {
        logger.info(`[detetive] Varredura completa reabriu ${reopened.count} filme(s) sem página no Ingresso.`);
      }
    }

    const targetMovies = await prisma.filme.findMany({
      where: movieWhere,
      include: { streamingProviders: true },
    });

    logger.info(`[detetive] ${targetMovies.length} filmes na janela de monitoramento.`);

    if (targetMovies.length === 0) return;

    const totalFilmes = targetMovies.length;
    let processedFilmes = 0;

    logger.info('[detetive] Carregando catálogo ingresso.com (API oficial)...');
    const ingressoCatalog = await fetchIngressoCatalog();
    logger.info(`[detetive] Catálogo ingresso.com: ${ingressoCatalog.length} filmes indexados.`);

    const needsPuppeteer = targetMovies.some((filme) =>
      filmNeedsPuppeteer(
        {
          ingresso_sem_pagina: filme.ingresso_sem_pagina,
          ingresso_link: filme.ingresso_link,
          prevenda_confirmada: filme.prevenda_confirmada,
          releaseDate: filme.releaseDate,
        },
        now,
      ),
    );

    if (needsPuppeteer) {
      browser = await puppeteer.launch(getPuppeteerLaunchOptions());
    } else {
      logger.info('[detetive] Nenhum filme precisa de fallback Puppeteer nesta execução.');
    }

    for (const filme of targetMovies) {
      let ingressoMode: 'none' | 'link_only' | 'full' = 'none';
      let usedPuppeteer = false;

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

        ingressoMode = needsIngressoMonitoring(
          {
            ingresso_sem_pagina: ingressoSemPagina,
            ingresso_link: ingressoLink,
            prevenda_confirmada: prevendaConfirmada,
            releaseDate: filme.releaseDate,
          },
          now,
        );
        usedPuppeteer = false;

        if (ingressoMode !== 'none') {
          logger.info(
            `[detetive] Verificando ingresso.com (${ingressoMode === 'link_only' ? 'só link' : 'link + pré-venda'}): "${filme.tituloBr ?? filme.title}"`,
          );
          const hadExistingLink = Boolean(filme.ingresso_link);
          const ingressoResult = await resolveIngressoForFilme(
            filme,
            ingressoCatalog,
            browser,
            { verifyPreSaleInPage: ingressoMode === 'full' },
          );
          const { match, puppeteerFallback } = ingressoResult;
          usedPuppeteer = ingressoResult.usedPuppeteer;

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
            usedPuppeteer = true;
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
            const canBlacklist = releasePassed && !puppeteerFallback?.transientError;
            if (canBlacklist) {
              ingressoSemPagina = true;
              ingressoLink = null;
              if (ingressoMode === 'full') {
                temSessoes = false;
              }
              logger.info(`[detetive] "${filme.title}" sem página no ingresso.com — monitoramento encerrado.`);
            } else {
              logger.info(
                `[detetive] "${filme.title}" ainda sem link no ingresso.com; nova tentativa na próxima execução.`,
              );
            }
          }
        } else if (ingressoSemPagina && releasePassed) {
          logger.info(`[detetive] "${filme.title}" — ingresso.com indisponível, pulando.`);
        } else if (releasePassed && ingressoLink) {
          logger.info(`[detetive] "${filme.title}" — já estreou e link existe, pulando.`);
        }

        const streaming = await checkStreamingAvailability(filme.tmdbId, filme.id);
        const isNowDigital = streaming.available && !filme.streamingProviders.length;
        const cinemaFlags = resolveCinemaFlags({
          filmeEmCartaz: Boolean(filme.emCartaz),
          filmeEmBreve: Boolean(filme.emBreve),
          temSessoes,
          emPrevenda,
          ingressoLink,
          ingressoMode,
          estreiaCinema: streaming.estreiaCinema,
          releasePassed,
        });

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
            emCartaz: cinemaFlags.emCartaz,
            emBreve: cinemaFlags.emBreve,
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
        await delay(
          getDetetiveInterFilmDelayMs({
            ingressoMode,
            usedPuppeteer,
          }),
        );
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
