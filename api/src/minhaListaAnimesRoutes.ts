import { Router, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import {
  isNonNegativeInt,
  isPositiveInt,
  isValidWatchlistStatus,
} from './validation';
import {
  serializeWatchlistAnime,
  validateCrunchyrollImportPayload,
  validateWatchlistAnimeUpdatePayload,
  buildWatchlistAnimeId,
  upsertWatchlistImport,
  replaceCrunchyrollExtensionItems,
} from './watchlistAnimeService';
import {
  enrichCrunchyrollId,
  findExistingWatchlistItem,
  mapLegacyWatchlistItem,
} from './watchlistMatcher';
import { watchlistImportRateLimit } from './watchlistRateLimit';
import { createNotification } from './notificationService';
import {
  clearSessionSyncedIds,
  getSessionSyncedIds,
  trackSessionCrunchyrollId,
} from './watchlistImportSessionTracker';

const router = Router();
const WATCHLIST_SYNC_MAX_ITEMS = 500;

function routeParam(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

async function assertImportSession(
  userId: number,
  sessionId: string
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const session = await prisma.watchlistImportSession.findFirst({
    where: {
      id: sessionId,
      userId,
      status: 'running',
    },
  });

  if (!session) {
    return {
      ok: false,
      status: 404,
      error: 'Sess├úo de importa├º├úo n├úo encontrada ou j├í finalizada.',
    };
  }

  return { ok: true };
}

router.get('/minha-lista/animes', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const items = await prisma.watchlistAnime.findMany({
      where: {
        userId: req.user!.userId,
        isRemoved: false,
      },
      orderBy: [{ updatedAt: 'desc' }],
    });

    res.json({
      results: items.map(serializeWatchlistAnime),
      total: items.length,
    });
  } catch (error) {
    logger.error(`Erro ao buscar minha-lista/animes: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar watchlist de animes.' });
  }
});

router.get('/minha-lista/animes/continuar', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const items = await prisma.watchlistAnime.findMany({
      where: {
        userId: req.user!.userId,
        isRemoved: false,
        status: { in: ['continuar', 'seguir'] },
      },
      orderBy: [{ updatedAt: 'desc' }],
    });

    res.json({
      results: items.map(serializeWatchlistAnime),
      total: items.length,
    });
  } catch (error) {
    logger.error(`Erro ao buscar continuar assistindo: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar animes em andamento.' });
  }
});

router.post('/minha-lista/animes/from-catalog', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { animeId, anilistId, status } = req.body ?? {};
  const userId = req.user!.userId;

  const internalId = isPositiveInt(animeId) ? Number(animeId) : null;
  const anilistIdNum = isPositiveInt(anilistId) ? Number(anilistId) : null;

  if (!internalId && !anilistIdNum) {
    return res.status(400).json({ error: 'Informe animeId ou anilistId.' });
  }

  if (status != null && !isValidWatchlistStatus(status)) {
    return res.status(400).json({ error: 'status inv├ílido.' });
  }

  try {
    const anime = internalId
      ? await prisma.anime.findUnique({ where: { id: internalId } })
      : await prisma.anime.findUnique({ where: { anilistId: anilistIdNum! } });
    if (!anime) {
      return res.status(404).json({ error: 'Anime n├úo encontrado no cat├ílogo.' });
    }

    const crunchyrollId = `catalog:${anime.id}`;
    const catalogTitle = anime.titleEnglish || anime.titleRomaji || anime.titleNative || 'Anime';
    const catalogPoster = anime.coverImage;
    const now = new Date();

    const existing = await findExistingWatchlistItem(userId, {
      crunchyrollId,
      animeId: anime.id,
      title: catalogTitle,
    });

    if (existing) {
      const preserveCrSource = existing.source === 'crunchyroll_extension';
      const item = await prisma.watchlistAnime.update({
        where: { id: existing.id },
        data: {
          animeId: anime.id,
          title: catalogTitle,
          posterUrl: catalogPoster ?? existing.posterUrl,
          crunchyrollId: preserveCrSource ? existing.crunchyrollId : (existing.crunchyrollId ?? crunchyrollId),
          source: preserveCrSource ? existing.source : 'catalog',
          status: status ?? existing.status,
          isRemoved: false,
          lastSyncedAt: now,
          updatedAt: now,
        },
      });

      return res.status(200).json(serializeWatchlistAnime(item));
    }

    const item = await prisma.watchlistAnime.create({
      data: {
        id: buildWatchlistAnimeId(crunchyrollId),
        userId,
        crunchyrollId,
        animeId: anime.id,
        title: catalogTitle,
        posterUrl: catalogPoster,
        status: status ?? 'comecar',
        lists: ['nc'],
        genres: [],
        source: 'catalog',
        isRemoved: false,
        lastSyncedAt: now,
        createdAt: now,
        updatedAt: now,
      },
    });

    res.status(201).json(serializeWatchlistAnime(item));
  } catch (error) {
    logger.error(`Erro ao adicionar anime do cat├ílogo: ${error}`);
    res.status(500).json({ error: 'Erro ao adicionar anime ├á lista.' });
  }
});

router.get('/minha-lista/animes/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const item = await prisma.watchlistAnime.findFirst({
      where: {
        id: routeParam(req.params.id),
        userId: req.user!.userId,
        isRemoved: false,
      },
    });

    if (!item) {
      return res.status(404).json({ error: 'Anime n├úo encontrado na sua lista.' });
    }

    res.json(serializeWatchlistAnime(item));
  } catch (error) {
    logger.error(`Erro ao buscar item da watchlist: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar item da watchlist.' });
  }
});

router.post(
  '/minha-lista/animes/import/session',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const { totalExpected, source } = req.body ?? {};

    if (totalExpected != null && !isNonNegativeInt(totalExpected)) {
      return res.status(400).json({ error: 'totalExpected deve ser um inteiro >= 0.' });
    }

    try {
      const session = await prisma.watchlistImportSession.create({
        data: {
          userId: req.user!.userId,
          source: typeof source === 'string' ? source : 'crunchyroll_extension',
          totalExpected: totalExpected ?? null,
          status: 'running',
        },
      });

      res.status(201).json({
        sessionId: session.id,
        status: session.status,
        totalExpected: session.totalExpected,
        importedCount: session.importedCount,
        startedAt: session.startedAt,
      });
    } catch (error) {
      logger.error(`Erro ao iniciar sess├úo de importa├º├úo: ${error}`);
      res.status(500).json({ error: 'Erro ao iniciar sess├úo de importa├º├úo.' });
    }
  }
);

router.get(
  '/minha-lista/animes/import/session/:sessionId',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const session = await prisma.watchlistImportSession.findFirst({
        where: {
          id: routeParam(req.params.sessionId),
          userId: req.user!.userId,
        },
      });

      if (!session) {
        return res.status(404).json({ error: 'Sess├úo de importa├º├úo n├úo encontrada.' });
      }

      res.json({
        sessionId: session.id,
        status: session.status,
        source: session.source,
        totalExpected: session.totalExpected,
        importedCount: session.importedCount,
        errorMessage: session.errorMessage,
        startedAt: session.startedAt,
        finishedAt: session.finishedAt,
      });
    } catch (error) {
      logger.error(`Erro ao consultar sess├úo de importa├º├úo: ${error}`);
      res.status(500).json({ error: 'Erro ao consultar sess├úo de importa├º├úo.' });
    }
  }
);

router.post(
  '/minha-lista/animes/import/session/:sessionId/finish',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const { status, errorMessage, mode, crunchyrollIds } = req.body ?? {};
    const finalStatus = status === 'failed' ? 'failed' : 'completed';

    try {
      const session = await prisma.watchlistImportSession.findFirst({
        where: {
          id: routeParam(req.params.sessionId),
          userId: req.user!.userId,
        },
      });

      if (!session) {
        return res.status(404).json({ error: 'Sess├úo de importa├º├úo n├úo encontrada.' });
      }

      let removedCount = 0;
      if (finalStatus === 'completed' && mode === 'replace') {
        let syncedIds: string[] = [];

        if (Array.isArray(crunchyrollIds) && crunchyrollIds.length > 0) {
          syncedIds = crunchyrollIds.filter(
            (id): id is string => typeof id === 'string' && id.length > 0
          );
        } else {
          const tracked = getSessionSyncedIds(session.id);
          if (tracked.length > 0) {
            syncedIds = tracked;
          } else {
            const sessionItems = await prisma.watchlistAnime.findMany({
              where: {
                userId: req.user!.userId,
                importSessionId: session.id,
                isRemoved: false,
                crunchyrollId: { not: null },
              },
              select: { crunchyrollId: true },
            });
            syncedIds = sessionItems
              .map((item) => item.crunchyrollId)
              .filter((id): id is string => typeof id === 'string' && id.length > 0);
          }
        }

        if (syncedIds.length > 0) {
          removedCount = await replaceCrunchyrollExtensionItems(
            req.user!.userId,
            syncedIds
          );
        }
      }

      clearSessionSyncedIds(session.id);

      const updated = await prisma.watchlistImportSession.update({
        where: { id: session.id },
        data: {
          status: finalStatus,
          errorMessage: typeof errorMessage === 'string' ? errorMessage : null,
          finishedAt: new Date(),
        },
      });

      if (finalStatus === 'completed' && updated.importedCount > 0) {
        await createNotification({
          userId: req.user!.userId,
          message: `Sync concluída: ${updated.importedCount} anime(s) na sua lista`,
          type: 'NOVO_ITEM',
          relatedMediaType: 'anime',
          sendPush: true,
        }).catch((err) => logger.error(`Notificação pós-sync: ${err}`));
      }

      res.json({
        sessionId: updated.id,
        status: updated.status,
        importedCount: updated.importedCount,
        totalExpected: updated.totalExpected,
        finishedAt: updated.finishedAt,
        removedCount,
      });
    } catch (error) {
      logger.error(`Erro ao finalizar sess├úo de importa├º├úo: ${error}`);
      res.status(500).json({ error: 'Erro ao finalizar sess├úo de importa├º├úo.' });
    }
  }
);

router.post(
  '/minha-lista/animes/import',
  authMiddleware,
  watchlistImportRateLimit,
  async (req: AuthRequest, res: Response) => {
    if (!validateCrunchyrollImportPayload(req.body)) {
      return res.status(400).json({
        error: 'Payload inv├ílido. Informe crunchyrollId, title e progresso do epis├│dio.',
      });
    }

    const payload = req.body;
    const userId = req.user!.userId;

    if (payload.sessionId) {
      const sessionCheck = await assertImportSession(userId, payload.sessionId);
      if (!sessionCheck.ok) {
        return res.status(sessionCheck.status).json({ error: sessionCheck.error });
      }
    }

    try {
      const { item, action } = await upsertWatchlistImport(userId, payload);

      if (payload.sessionId) {
        trackSessionCrunchyrollId(payload.sessionId, payload.crunchyrollId);
        await prisma.watchlistImportSession.update({
          where: { id: payload.sessionId },
          data: { importedCount: { increment: 1 } },
        });
      }

      res.status(action === 'updated' ? 200 : 201).json({
        success: true,
        action,
        item: serializeWatchlistAnime(item),
      });
    } catch (error) {
      logger.error(`Erro ao importar anime da Crunchyroll: ${error}`);
      res.status(500).json({ error: 'Erro ao importar anime da Crunchyroll.' });
    }
  }
);

router.post('/minha-lista/animes/sync', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { items } = req.body ?? {};
  const userId = req.user!.userId;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items deve ser um array.' });
  }

  if (items.length > WATCHLIST_SYNC_MAX_ITEMS) {
    return res.status(400).json({
      error: `Limite de ${WATCHLIST_SYNC_MAX_ITEMS} itens por sincroniza├º├úo.`,
    });
  }

  let imported = 0;
  let updated = 0;
  let skipped = 0;

  try {
    for (const rawItem of items) {
      const legacyMapped = mapLegacyWatchlistItem(rawItem as Record<string, unknown>);
      const candidate = validateCrunchyrollImportPayload(rawItem)
        ? enrichCrunchyrollId(rawItem)
        : legacyMapped
          ? enrichCrunchyrollId(legacyMapped)
          : null;

      if (!candidate || !validateCrunchyrollImportPayload(candidate)) {
        skipped += 1;
        continue;
      }

      const { action } = await upsertWatchlistImport(userId, candidate, {
        source: 'backup_import',
      });

      if (action === 'updated') updated += 1;
      else imported += 1;
    }

    const totalChanged = imported + updated;
    if (totalChanged > 0) {
      await createNotification({
        userId,
        message: `Lista atualizada: ${totalChanged} anime(s) sincronizado(s)`,
        type: 'NOVO_ITEM',
        relatedMediaType: 'anime',
        sendPush: true,
      }).catch((err) => logger.error(`Notificação pós-sync batch: ${err}`));
    }

    res.json({
      success: true,
      imported,
      updated,
      skipped,
      total: items.length,
    });
  } catch (error) {
    logger.error(`Erro ao sincronizar watchlist de animes: ${error}`);
    res.status(500).json({ error: 'Erro ao sincronizar watchlist de animes.' });
  }
});

router.patch(
  '/minha-lista/animes/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    if (!validateWatchlistAnimeUpdatePayload(req.body)) {
      return res.status(400).json({ error: 'Payload de atualiza├º├úo inv├ílido.' });
    }

    const payload = req.body;

    try {
      const existing = await prisma.watchlistAnime.findFirst({
        where: {
          id: routeParam(req.params.id),
          userId: req.user!.userId,
          isRemoved: false,
        },
      });

      if (!existing) {
        return res.status(404).json({ error: 'Anime n├úo encontrado na sua lista.' });
      }

      const item = await prisma.watchlistAnime.update({
        where: { id: existing.id },
        data: {
          title: payload.title ?? existing.title,
          titleAlt: payload.titleAlt ?? existing.titleAlt,
          posterUrl: payload.posterUrl ?? existing.posterUrl,
          crunchyrollUrl: payload.crunchyrollUrl ?? existing.crunchyrollUrl,
          season: payload.season ?? existing.season,
          episode: payload.episode ?? existing.episode,
          totalEpisodes: payload.totalEpisodes ?? existing.totalEpisodes,
          episodeDurationSec: payload.episodeDurationSec ?? existing.episodeDurationSec,
          remainingTimeSec: payload.remainingTimeSec ?? existing.remainingTimeSec,
          hasDub: payload.hasDub ?? existing.hasDub,
          malId: payload.malId ?? existing.malId,
          animeId: payload.animeId ?? existing.animeId,
          genres: payload.genres ?? existing.genres,
          note: payload.note ?? existing.note,
          status: payload.status ?? existing.status,
          lists: payload.lists ?? existing.lists,
          lastSyncedAt: new Date(),
        },
      });

      res.json(serializeWatchlistAnime(item));
    } catch (error) {
      logger.error(`Erro ao atualizar item da watchlist: ${error}`);
      res.status(500).json({ error: 'Erro ao atualizar item da watchlist.' });
    }
  }
);

router.delete(
  '/minha-lista/animes/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const existing = await prisma.watchlistAnime.findFirst({
        where: {
          id: routeParam(req.params.id),
          userId: req.user!.userId,
          isRemoved: false,
        },
      });

      if (!existing) {
        return res.status(404).json({ error: 'Anime n├úo encontrado na sua lista.' });
      }

      await prisma.watchlistAnime.update({
        where: { id: existing.id },
        data: {
          isRemoved: true,
          updatedAt: new Date(),
        },
      });

      res.json({ success: true });
    } catch (error) {
      logger.error(`Erro ao remover item da watchlist: ${error}`);
      res.status(500).json({ error: 'Erro ao remover item da watchlist.' });
    }
  }
);

export default router;
