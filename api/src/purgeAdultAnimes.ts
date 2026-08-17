import './loadEnv';

import { prisma } from './clients';
import { logger } from './logger';
import { HENTAI_TAG_NAME } from './qualityFilters';
import type { Prisma } from '@prisma/client';

/**
 * Remove do banco animes hentai que entraram antes dessa correção (o campo
 * `isAdult` da AniList é inconsistente pra esse tipo de anime). Mesmo critério
 * usado agora no sync e nas rotas de exibição (`isAnimeAdultContent` em
 * qualityFilters.ts): `isAdult: true`, gênero "Hentai" ou tag "Hentai".
 * Não mexe em Ecchi/Yaoi/Yuri — esses continuam no site normalmente.
 *
 * Uso:
 *   npx ts-node src/purgeAdultAnimes.ts            (dry-run — só lista o que seria removido)
 *   npx ts-node src/purgeAdultAnimes.ts --confirm   (remove de verdade)
 */

const adultAnimeWhere: Prisma.AnimeWhereInput = {
  OR: [
    { isAdult: true },
    { genres: { some: { genero: { name: HENTAI_TAG_NAME } } } },
    { tags: { some: { tag: { name: HENTAI_TAG_NAME } } } },
  ],
};

async function purgeAdultAnimes(confirm: boolean) {
  const animes = await prisma.anime.findMany({
    where: adultAnimeWhere,
    select: { id: true, anilistId: true, titleRomaji: true, isAdult: true },
  });

  if (animes.length === 0) {
    logger.info('Nenhum anime adulto encontrado no banco. Nada para remover.');
    return;
  }

  logger.info(`Encontrados ${animes.length} anime(s) adulto(s):`);
  for (const anime of animes) {
    logger.info(`  - [${anime.anilistId}] "${anime.titleRomaji}" (isAdult=${anime.isAdult})`);
  }

  if (!confirm) {
    logger.info('Dry-run — nenhuma alteração feita. Rode com --confirm para remover de verdade.');
    return;
  }

  const animeIds = animes.map((a) => a.id);

  await prisma.$transaction(async (tx) => {
    const characterLinks = await tx.animeCharacter.findMany({
      where: { animeId: { in: animeIds } },
      select: { id: true },
    });
    const characterLinkIds = characterLinks.map((c) => c.id);

    await tx.animeCharacterVoiceActor.deleteMany({ where: { animeCharacterId: { in: characterLinkIds } } });
    await tx.animeCharacter.deleteMany({ where: { animeId: { in: animeIds } } });
    await tx.animeStaff.deleteMany({ where: { animeId: { in: animeIds } } });
    await tx.animeStreamingLink.deleteMany({ where: { animeId: { in: animeIds } } });
    await tx.animeExternalLink.deleteMany({ where: { animeId: { in: animeIds } } });
    await tx.animeRank.deleteMany({ where: { animeId: { in: animeIds } } });
    await tx.airingSchedule.deleteMany({ where: { animeId: { in: animeIds } } });
    await tx.animeOnTag.deleteMany({ where: { animeId: { in: animeIds } } });
    await tx.animeOnGenero.deleteMany({ where: { animeId: { in: animeIds } } });
    await tx.animeOnStudio.deleteMany({ where: { animeId: { in: animeIds } } });
    await tx.animeRelation.deleteMany({
      where: {
        OR: [{ sourceAnimeId: { in: animeIds } }, { relatedAnimeId: { in: animeIds } }],
      },
    });

    const { count } = await tx.anime.deleteMany({ where: { id: { in: animeIds } } });
    logger.info(`Removidos ${count} anime(s) adulto(s) e seus registros relacionados.`);
  });
}

const main = async () => {
  const confirm = process.argv.includes('--confirm');
  try {
    await purgeAdultAnimes(confirm);
  } catch (error) {
    logger.error(`Erro ao remover animes adultos: ${error}`);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

if (require.main === module) {
  main();
}
