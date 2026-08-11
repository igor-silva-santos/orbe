import { Router, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import { isValidMediaType, isPositiveInt, isStringWithMaxLength } from './validation';

const router = Router();

const VALID_EVENT_TYPES = ['release', 'episode', 'cinema'] as const;
const MAX_EVENTS_PER_REQUEST = 60; // cobre uma temporada recorrente inteira (ex: 52 episódios semanais)
const MAX_TITLE_LENGTH = 200;
const MAX_LOCATION_LENGTH = 200;

type EventInput = {
  title: string;
  date: string;
  type: (typeof VALID_EVENT_TYPES)[number];
  midiaId: number;
  mediaType: string;
  time?: string;
  location?: string;
};

function isValidEventInput(value: unknown): value is EventInput {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;

  if (!isStringWithMaxLength(v.title, MAX_TITLE_LENGTH) || (v.title as string).trim().length === 0) return false;
  if (typeof v.date !== 'string' || Number.isNaN(Date.parse(v.date))) return false;
  if (typeof v.type !== 'string' || !(VALID_EVENT_TYPES as readonly string[]).includes(v.type)) return false;
  if (!isPositiveInt(v.midiaId)) return false;
  if (!isValidMediaType(v.mediaType)) return false;
  if (v.time !== undefined && !isStringWithMaxLength(v.time, 20)) return false;
  if (v.location !== undefined && !isStringWithMaxLength(v.location, MAX_LOCATION_LENGTH)) return false;

  return true;
}

router.get('/calendar-events', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  try {
    const events = await prisma.userCalendarEvent.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });
    res.json(events);
  } catch (error) {
    logger.error(`Erro ao buscar eventos de calendário do usuário ${userId}:`, error);
    res.status(500).json({ error: 'Erro ao buscar eventos de calendário.' });
  }
});

router.post('/calendar-events', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const events = req.body?.events;

  if (!Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ error: 'Nenhum evento informado.' });
  }
  if (events.length > MAX_EVENTS_PER_REQUEST) {
    return res.status(400).json({ error: `Máximo de ${MAX_EVENTS_PER_REQUEST} eventos por requisição.` });
  }
  if (!events.every(isValidEventInput)) {
    return res.status(400).json({ error: 'Um ou mais eventos possuem dados inválidos.' });
  }

  try {
    const created = await prisma.$transaction(
      (events as EventInput[]).map((event) =>
        prisma.userCalendarEvent.create({
          data: {
            userId,
            midiaId: event.midiaId,
            tipoMidia: event.mediaType,
            title: event.title,
            eventType: event.type,
            date: new Date(event.date),
            time: event.time ?? null,
            location: event.location ?? null,
          },
        })
      )
    );
    res.status(201).json(created);
  } catch (error) {
    logger.error(`Erro ao criar eventos de calendário para o usuário ${userId}:`, error);
    res.status(500).json({ error: 'Erro ao salvar eventos de calendário.' });
  }
});

router.delete('/calendar-events/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID de evento inválido.' });
  }

  try {
    const event = await prisma.userCalendarEvent.findUnique({ where: { id } });
    if (!event || event.userId !== userId) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }

    await prisma.userCalendarEvent.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    logger.error(`Erro ao excluir evento de calendário ${id}:`, error);
    res.status(500).json({ error: 'Erro ao excluir evento de calendário.' });
  }
});

export default router;
