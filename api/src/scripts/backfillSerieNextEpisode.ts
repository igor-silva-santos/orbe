/**
 * Atualiza next/last episode das séries já no banco via TMDB.
 * Uso: npx tsx src/scripts/backfillSerieNextEpisode.ts
 */
import '../loadEnv';
import { prisma } from '../clients';
import { tmdb } from '../clients';
import { mapTmdbEpisodeFields } from '../mappers';
import { logger } from '../logger';

const BATCH = 25;

async function main() {
  const series = await prisma.serie.findMany({
    where: {
      OR: [
        { nextEpisodeAirDate: null },
        { nextEpisodeNumber: null },
      ],
      status: { in: ['Returning Series', 'In Production', 'Pilot'] },
    },
    select: { tmdbId: true, name: true },
    take: 500,
  });

  logger.info(`Backfill episódio: ${series.length} séries candidatas.`);

  for (let i = 0; i < series.length; i += BATCH) {
    const chunk = series.slice(i, i + BATCH);
    await Promise.all(
      chunk.map(async (serie) => {
        try {
          const details = await tmdb.tvInfo({ id: serie.tmdbId, language: 'pt-BR' }) as any;
          const fields = mapTmdbEpisodeFields(
            details.next_episode_to_air,
            details.last_episode_to_air,
          );
          await prisma.serie.update({
            where: { tmdbId: serie.tmdbId },
            data: fields,
          });
        } catch (error) {
          logger.warn(`Falha backfill série ${serie.tmdbId} (${serie.name}): ${error}`);
        }
      }),
    );
    logger.info(`Progresso: ${Math.min(i + BATCH, series.length)}/${series.length}`);
  }

  logger.info('Backfill concluído.');
}

main()
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
