import express, { Router, Response } from 'express';
import { access } from 'fs/promises';
import rateLimit from 'express-rate-limit';
import { Prisma } from '@prisma/client';
import { prisma } from './clients';
import { logger } from './logger';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import { isStringWithMaxLength } from './validation';
import { mergeHomeLayout, parseHomeLayout, readHomeLayout } from './homeLayout';
import {
  asAvatarBuffer,
  AvatarStorageError,
  localAvatarDirectory,
  MAX_AVATAR_BYTES,
  removeStoredAvatar,
  resolveAvatarUrl,
  resolveLocalAvatarFile,
  sniffImage,
  storeAvatar,
} from './avatarStorage';

const router = Router();

const MAX_NOME_LENGTH = 100;

const profileSelect = {
  id: true,
  email: true,
  nome: true,
  avatar: true,
  preferencias: true,
  role: true,
  data_criacao: true,
} as const;

type ProfileRow = {
  id: number;
  email: string;
  nome: string | null;
  avatar: string | null;
  preferencias: Prisma.JsonValue;
  role: string;
  data_criacao: Date;
};

function toProfileDto(user: ProfileRow) {
  return {
    id: user.id,
    email: user.email,
    nome: user.nome,
    avatar: user.avatar,
    avatarUrl: resolveAvatarUrl(user.avatar),
    homeLayout: readHomeLayout(user.preferencias),
    preferencias: user.preferencias,
    role: user.role,
    data_criacao: user.data_criacao,
  };
}

const avatarUploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas trocas de foto. Aguarde alguns minutos.' },
});

function readAvatarBody(req: AuthRequest, res: Response, next: () => void): void {
  express.raw({
    type: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    limit: MAX_AVATAR_BYTES,
  })(req, res, (err: unknown) => {
    if (!err) {
      next();
      return;
    }
    const tooLarge =
      typeof err === 'object' &&
      err !== null &&
      'type' in err &&
      (err as { type?: string }).type === 'entity.too.large';
    res.status(tooLarge ? 413 : 400).json({
      error: tooLarge
        ? 'Imagem maior que 200 KB. Escolha uma foto menor.'
        : 'Envie uma imagem JPG, PNG, WebP ou GIF.',
    });
  });
}

const MIME_BY_EXT: Record<string, string> = {
  webp: 'image/webp',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
};

router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: profileSelect,
    });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json(toProfileDto(user));
  } catch (error) {
    logger.error(`Erro ao buscar perfil ID ${userId}:`, error);
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
});

router.patch('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Token não fornecido.' });

  const body = (req.body ?? {}) as { nome?: unknown; homeLayout?: unknown };
  const { nome, homeLayout } = body;

  if (nome !== undefined && !isStringWithMaxLength(nome, MAX_NOME_LENGTH)) {
    return res.status(400).json({ error: `nome excede o limite de ${MAX_NOME_LENGTH} caracteres.` });
  }

  let parsedLayout: ReturnType<typeof parseHomeLayout> = null;
  if (homeLayout !== undefined) {
    parsedLayout = parseHomeLayout(homeLayout);
    if (parsedLayout === null) {
      return res.status(400).json({ error: 'A ordem dos carrosséis da tela inicial é inválida.' });
    }
  }

  try {
    const current = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferencias: true },
    });
    if (!current) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const data: Prisma.UserUpdateInput = {};
    if (nome !== undefined) data.nome = nome;
    // `[]` também entra: a pessoa tirou todos os carrosséis.
    if (parsedLayout !== null) {
      data.preferencias = mergeHomeLayout(current.preferencias, parsedLayout) as Prisma.InputJsonValue;
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: profileSelect,
    });
    res.json(toProfileDto(updated));
  } catch (error) {
    logger.error(`Erro ao atualizar perfil ID ${userId}:`, error);
    res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }
});

router.post('/me/avatar', authMiddleware, avatarUploadLimiter, readAvatarBody, async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Token não fornecido.' });

  const bytes = asAvatarBuffer(req.body);
  if (!bytes || bytes.length === 0) {
    return res.status(400).json({ error: 'Envie uma imagem JPG, PNG, WebP ou GIF.' });
  }
  const kind = sniffImage(bytes);
  if (!kind) {
    return res.status(400).json({ error: 'Envie uma imagem JPG, PNG, WebP ou GIF.' });
  }

  try {
    const current = await prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true },
    });
    if (!current) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const stored = await storeAvatar({
      userId,
      bytes,
      kind,
      previousRef: current.avatar,
    });
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { avatar: stored.ref },
      select: profileSelect,
    });
    res.json(toProfileDto(updated));
  } catch (error) {
    if (error instanceof AvatarStorageError) {
      return res.status(502).json({ error: error.message });
    }
    logger.error(`Erro ao guardar avatar do usuário ${userId}:`, error);
    res.status(500).json({ error: 'Não foi possível guardar a foto.' });
  }
});

router.delete('/me/avatar', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Token não fornecido.' });

  try {
    const current = await prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true },
    });
    if (!current) return res.status(404).json({ error: 'Usuário não encontrado.' });

    await removeStoredAvatar(current.avatar);
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { avatar: null },
      select: profileSelect,
    });
    res.json(toProfileDto(updated));
  } catch (error) {
    logger.error(`Erro ao remover avatar do usuário ${userId}:`, error);
    res.status(500).json({ error: 'Não foi possível remover a foto.' });
  }
});

router.get('/avatars/:file', async (req, res: Response) => {
  const file = String(req.params.file ?? '');
  const full = resolveLocalAvatarFile(localAvatarDirectory(), file);
  if (!full) return res.status(404).json({ error: 'Foto não encontrada.' });

  const userId = Number(file.split('.')[0]);
  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(404).json({ error: 'Foto não encontrada.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true },
    });
    if (!user || user.avatar !== `file:${file}`) {
      return res.status(404).json({ error: 'Foto não encontrada.' });
    }

    try {
      await access(full);
    } catch {
      return res.status(404).json({ error: 'Foto não encontrada.' });
    }

    const ext = file.slice(file.lastIndexOf('.') + 1);
    res.setHeader('Content-Type', MIME_BY_EXT[ext] ?? 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.sendFile(full);
  } catch (error) {
    logger.error(`Erro ao servir avatar ${file}:`, error);
    res.status(500).json({ error: 'Não foi possível abrir a foto.' });
  }
});

export default router;
