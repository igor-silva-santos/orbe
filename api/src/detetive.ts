import { prisma, tmdb, tmdbApi } from './clients';
import { logger } from './logger';
import puppeteer, { Browser } from 'puppeteer';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função para buscar provedores de streaming no TMDB (Brasil)
async function checkStreamingAvailability(tmdbId: number) {
  try {
    const response = await tmdbApi.get(`/movie/${tmdbId}/watch/providers`);
    const brProviders = response.data.results?.BR;
    
    // Verificamos se está disponível para aluguel (rent) ou compra (buy)
    const digitalRelease = brProviders?.rent || brProviders?.buy || brProviders?.flatrate;
    
    if (digitalRelease && digitalRelease.length > 0) {
      return {
        available: true,
        providers: digitalRelease.map((p: any) => p.provider_name),
        link: brProviders.link
      };
    }
    return { available: false };
  } catch (error) {
    logger.error(`Erro ao verificar streaming para TMDB ID ${tmdbId}:`, error);
    return { available: false };
  }
}

// Função para criar notificação no sistema
async function createDigitalReleaseNotification(filme: any, providers: string[]) {
  try {
    // Busca todos os usuários que favoritaram este filme ou querem assistir
    const interestedUsers = await prisma.preferencias_usuario_midia.findMany({
      where: {
        midia_id: filme.tmdbId,
        tipo_midia: 'filme',
        status: { in: ['favorito', 'quero_assistir'] }
      },
      select: { usuario_id: true }
    });

    const providerList = providers.slice(0, 3).join(', ');
    const message = `🎬 Boas notícias! "${filme.title}" já está disponível digitalmente (ex: ${providerList}).`;

    const notifications = interestedUsers.map(u => ({
      userId: u.usuario_id,
      type: 'DIGITAL_RELEASE',
      message,
      relatedMediaId: filme.tmdbId,
      relatedMediaType: 'filme'
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
    .replace(/[\u0300-\u036f]/g, '') // Corrigido regex de normalização
    .replace(/[^a-z0-9 -]/g, '') // Simplificado
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function runDetetive(fullScan = false) {
  let browser: Browser | undefined;
  try {
    logger.info(`--- Iniciando Detetive Digital 2.0 ${fullScan ? '(Varredura Completa)' : ''} ---`);

    const now = new Date();
    const whereClause: any = {
      tipo_midia: 'filme', // Garantindo que pegamos apenas filmes
      OR: [
        { voteCount: { gt: 25 } },
        { popularity: { gt: 10 } }
      ]
    };

    // Focar em filmes lançados nos últimos 6 meses e próximos 3 meses
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const threeMonthsAhead = new Date();
    threeMonthsAhead.setMonth(threeMonthsAhead.getMonth() + 3);
    whereClause.releaseDate = {
      gte: sixMonthsAgo,
      lte: threeMonthsAhead
    };

    const targetMovies = await prisma.filme.findMany({ 
      where: whereClause,
      include: { streamingProviders: true } 
    });

    logger.info(`Encontrados ${targetMovies.length} filmes na janela de monitoramento.`);

    if (targetMovies.length === 0) return;

    browser = await puppeteer.launch({ headless: true });

    for (const filme of targetMovies) {
      try {
        logger.info(`🕵️ Verificando: "${filme.title}"...`);
        
        // 1. Verificar Cinema (ingresso.com)
        const slug = slugify(filme.title);
        const directUrl = `https://www.ingresso.com/filme/${slug}`;
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');
        
        const response = await page.goto(directUrl, { waitUntil: 'networkidle2', timeout: 15000 });
        let hasCinemaSessions = false;
        let isPreSale = false;
        let pageExists = false;

        if (response && response.ok()) {
          pageExists = true;
          const pageContent = await page.content();
          hasCinemaSessions = !pageContent.includes('Não há sessões disponíveis no momento.');
          // Página do ingresso.com sinaliza pré-venda com o rótulo "Pré-venda" perto do CTA de compra.
          isPreSale = /pré-?venda/i.test(pageContent);
        }
        await page.close();

        // 2. Verificar Streaming/Digital (TMDB)
        const streaming = await checkStreamingAvailability(filme.tmdbId);

        // 3. Lógica de Atualização
        const wasInCinema = filme.tem_sessoes;
        const isNowDigital = streaming.available && !filme.streamingProviders.length;

        await prisma.filme.update({
          where: { id: filme.id },
          data: {
            ingresso_link: pageExists ? directUrl : filme.ingresso_link,
            tem_sessoes: hasCinemaSessions,
            em_prevenda: pageExists ? isPreSale : filme.em_prevenda,
            ultima_verificacao_ingresso: new Date(),
            // Se o filme saiu do cinema e entrou no digital agora, notificamos
            status: streaming.available ? 'Released' : filme.status
          },
        });

        if (isNowDigital) {
          logger.info(`✨ NOVIDADE: "${filme.title}" chegou ao streaming!`);
          await createDigitalReleaseNotification(filme, streaming.providers);
          
          // Opcional: Aqui poderíamos disparar um sync específico para atualizar os streamingProviders no banco
          // mas a notificação já cumpre o papel de avisar o usuário.
        }

        logger.info(`✅ "${filme.title}" verificado. Cinema: ${hasCinemaSessions}, Digital: ${streaming.available}`);
      
      } catch (error: any) {
        logger.error(`Erro ao verificar "${filme.title}":`, error.message);
      } finally {
        await delay(2000);
      }
    }
  } catch (e: any) {
    logger.error("Erro fatal no Detetive Digital 2.0:", e.message);
  } finally {
    if (browser) await browser.close();
    await prisma.$disconnect();
    logger.info('--- Detetive Digital finalizado ---');
  }
}

if (require.main === module) {
  const fullScan = process.argv.includes('--full-scan');
  logger.info(`Detetive Digital sendo executado diretamente... ${fullScan ? 'em modo Varredura Completa' : ''}`);
  runDetetive(fullScan);
}