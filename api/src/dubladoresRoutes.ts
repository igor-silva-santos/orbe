import { Router, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';

const router = Router();

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

    if (!dublador) {
      return res.status(404).json({ error: 'Dublador não encontrado.' });
    }

    const filmography = dublador.personagens_dublados.map((entry) => {
      const anime = entry.animeCharacter.anime;
      const character = entry.animeCharacter.character;
      return {
        id: anime.id,
        mediaType: 'anime' as const,
        title: anime.titleEnglish || anime.titleRomaji || anime.titleNative || 'Anime',
        character: character?.name ?? null,
        posterPath: anime.coverImage,
        releaseDate: anime.startDate?.toISOString().slice(0, 10) ?? null,
      };
    });

    res.json({
      id: dublador.anilistId,
      name: dublador.name,
      language: dublador.language,
      profilePath: dublador.image,
      filmography,
    });
  } catch (error) {
    logger.error(`Erro ao buscar créditos do dublador ${idParam}:`, error);
    res.status(500).json({ error: 'Erro ao buscar créditos do dublador.' });
  }
});

export default router;
