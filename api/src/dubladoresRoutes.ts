import { Router, Response } from 'express';
import { prisma, anilistApi } from './clients';
import { logger } from './logger';

const router = Router();

const STAFF_CREDITS_QUERY = `
  query ($id: Int) {
    Staff(id: $id) {
      id
      name { full }
      image { large }
      languageV2
      characters(perPage: 50, sort: ROLE) {
        edges {
          role
          node {
            name { full }
            media(perPage: 25, sort: POPULARITY_DESC, type: ANIME) {
              nodes {
                id
                type
                title { romaji english native }
                coverImage { large }
                startDate { year month day }
              }
            }
          }
        }
      }
    }
  }
`;

type DubCredit = {
  id: number;
  mediaType: 'anime';
  title: string;
  character: string | null;
  posterPath: string | null;
  releaseDate: string | null;
};

function buildFilmographyFromDb(
  personagens: Array<{
    animeCharacter: {
      character: { name: string } | null;
      anime: {
        anilistId: number;
        titleEnglish: string | null;
        titleRomaji: string | null;
        titleNative: string | null;
        coverImage: string | null;
        startDate: Date | null;
      };
    };
  }>,
): DubCredit[] {
  const seen = new Set<string>();
  const filmography: DubCredit[] = [];

  for (const entry of personagens) {
    const anime = entry.animeCharacter.anime;
    const character = entry.animeCharacter.character;
    const key = `${anime.anilistId}-${character?.name ?? ''}`;
    if (seen.has(key)) continue;
    seen.add(key);

    filmography.push({
      id: anime.anilistId,
      mediaType: 'anime',
      title: anime.titleEnglish || anime.titleRomaji || anime.titleNative || 'Anime',
      character: character?.name ?? null,
      posterPath: anime.coverImage,
      releaseDate: anime.startDate?.toISOString().slice(0, 10) ?? null,
    });
  }

  return filmography;
}

async function fetchStaffCreditsFromAnilist(anilistId: number) {
  const { data } = await anilistApi.post('', {
    query: STAFF_CREDITS_QUERY,
    variables: { id: anilistId },
  });

  const staff = data?.data?.Staff;
  if (!staff?.id) return null;

  const seen = new Set<string>();
  const filmography: DubCredit[] = [];

  for (const edge of staff.characters?.edges ?? []) {
    const characterName = edge?.node?.name?.full ?? null;
    for (const media of edge?.node?.media?.nodes ?? []) {
      if (media?.type !== 'ANIME' || !media.id) continue;
      const key = `${media.id}-${characterName ?? ''}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const title =
        media.title?.english ||
        media.title?.romaji ||
        media.title?.native ||
        'Anime';
      const start = media.startDate;
      const releaseDate =
        start?.year && start?.month && start?.day
          ? `${start.year}-${String(start.month).padStart(2, '0')}-${String(start.day).padStart(2, '0')}`
          : start?.year
            ? `${start.year}-01-01`
            : null;

      filmography.push({
        id: media.id,
        mediaType: 'anime',
        title,
        character: characterName,
        posterPath: media.coverImage?.large ?? null,
        releaseDate,
      });
    }
  }

  return {
    id: staff.id,
    name: staff.name?.full ?? 'Dublador(a)',
    language: staff.languageV2 ?? null,
    profilePath: staff.image?.large ?? null,
    filmography,
  };
}

router.get('/dubladores/:id/creditos', async (req, res: Response) => {
  const rawId = req.params.id;
  const idParam = Array.isArray(rawId) ? rawId[0] : rawId;
  const anilistId = Number(idParam);

  if (!Number.isInteger(anilistId) || anilistId <= 0) {
    return res.status(400).json({ error: 'ID de dublador inválido.' });
  }

  try {
    const dublador = await prisma.dublador.findUnique({
      where: { anilistId },
      include: {
        personagens_dublados: {
          include: {
            animeCharacter: {
              include: {
                character: true,
                anime: true,
              },
            },
          },
        },
      },
    });

    if (dublador) {
      return res.json({
        id: dublador.anilistId,
        name: dublador.name,
        language: dublador.language,
        profilePath: dublador.image,
        filmography: buildFilmographyFromDb(dublador.personagens_dublados),
      });
    }

    const fromAnilist = await fetchStaffCreditsFromAnilist(anilistId);
    if (!fromAnilist) {
      return res.status(404).json({ error: 'Dublador não encontrado.' });
    }

    res.json(fromAnilist);
  } catch (error) {
    logger.error(`Erro ao buscar créditos do dublador ${idParam}:`, error);
    res.status(500).json({ error: 'Erro ao buscar créditos do dublador.' });
  }
});

export default router;
