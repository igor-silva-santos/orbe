import express, { Router, Response } from 'express';
import { access } from 'fs/promises';
import rateLimit from 'express-rate-limit';
import { Prisma } from '@prisma/client';
import { prisma } from './clients';
import { logger } from './logger';
import { authMiddleware, type AuthRequest } from './authMiddleware';
import { isStringWithMaxLength, isValidHttpUrl } from './validation';
import { AccountDeletionError, deleteUserAccount } from './deleteUserAccount';
import { ensureUserAdminFromEnv } from './adminFromEnv';
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
const MAX_BIO_LENGTH = 1000;
const MAX_AVATAR_LENGTH = 2000;

const profileSelect = {
  id: true,
  email: true,
  nome: true,
  bio: true,
  avatar: true,
  preferencias: true,
  perfil_publico: true,
  role: true,
  data_criacao: true,
} as const;

type ProfileRow = {
  id: number;
  email: string;
  nome: string | null;
  bio: string | null;
  avatar: string | null;
  preferencias: Prisma.JsonValue;
  perfil_publico: boolean;
  role: string;
  data_criacao: Date;
};

function toProfileDto(user: ProfileRow) {
  return {
    id: user.id,
    email: user.email,
    nome: user.nome,
    bio: user.bio,
    avatar: user.avatar,
    avatarUrl: resolveAvatarUrl(user.avatar),
    homeLayout: readHomeLayout(user.preferencias),
    preferencias: user.preferencias,
    perfil_publico: user.perfil_publico,
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
    const effective = await ensureUserAdminFromEnv(prisma, user);
    res.json(toProfileDto(effective));
  } catch (error) {
    logger.error(`Erro ao buscar perfil ID ${userId}:`, error);
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
});

router.patch('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Token não fornecido.' });

  const body = (req.body ?? {}) as {
    nome?: unknown;
    bio?: unknown;
    avatar?: unknown;
    preferencias?: unknown;
    perfil_publico?: unknown;
    homeLayout?: unknown;
  };

  if (body.nome !== undefined && !isStringWithMaxLength(body.nome, MAX_NOME_LENGTH)) {
    return res.status(400).json({ error: `nome excede o limite de ${MAX_NOME_LENGTH} caracteres.` });
  }
  if (body.bio !== undefined && body.bio !== null && !isStringWithMaxLength(body.bio, MAX_BIO_LENGTH)) {
    return res.status(400).json({ error: `bio excede o limite de ${MAX_BIO_LENGTH} caracteres.` });
  }
  if (
    body.avatar !== undefined &&
    body.avatar !== null &&
    body.avatar !== '' &&
    (!isStringWithMaxLength(body.avatar, MAX_AVATAR_LENGTH) || !isValidHttpUrl(body.avatar))
  ) {
    return res.status(400).json({ error: 'avatar deve ser uma URL http(s) válida.' });
  }
  if (body.perfil_publico !== undefined && body.perfil_publico !== null && typeof body.perfil_publico !== 'boolean') {
    return res.status(400).json({ error: 'perfil_publico deve ser um booleano.' });
  }

  let parsedLayout: ReturnType<typeof parseHomeLayout> = null;
  if (body.homeLayout !== undefined) {
    parsedLayout = parseHomeLayout(body.homeLayout);
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
    if (body.nome !== undefined) data.nome = body.nome as string;
    if (body.bio !== undefined) data.bio = (body.bio as string | null) ?? null;
    if (body.avatar !== undefined) data.avatar = (body.avatar as string | null) ?? null;
    if (typeof body.perfil_publico === 'boolean') data.perfil_publico = body.perfil_publico;

    if (body.preferencias !== undefined && parsedLayout !== null) {
      data.preferencias = mergeHomeLayout(body.preferencias, parsedLayout) as Prisma.InputJsonValue;
    } else if (parsedLayout !== null) {
      data.preferencias = mergeHomeLayout(current.preferencias, parsedLayout) as Prisma.InputJsonValue;
    } else if (body.preferencias !== undefined) {
      data.preferencias = body.preferencias as Prisma.InputJsonValue;
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: profileSelect,
    });
    const effective = await ensureUserAdminFromEnv(prisma, updated);
    res.json(toProfileDto(effective));
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
    const effective = await ensureUserAdminFromEnv(prisma, updated);
    res.json(toProfileDto(effective));
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
    const effective = await ensureUserAdminFromEnv(prisma, updated);
    res.json(toProfileDto(effective));
  } catch (error) {
    logger.error(`Erro ao remover avatar do usuário ${userId}:`, error);
    res.status(500).json({ error: 'Não foi possível remover a foto.' });
  }
});

router.delete('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const { password } = req.body ?? {};

  if (!userId) {
    return res.status(401).json({ error: 'Não autenticado.' });
  }

  try {
    await deleteUserAccount(userId, password);
    return res.status(204).send();
  } catch (error) {
    if (error instanceof AccountDeletionError) {
      return res.status(error.status).json({ error: error.message });
    }
    logger.error(`Erro ao excluir conta ID ${userId}:`, error);
    return res.status(500).json({ error: 'Erro ao excluir conta.' });
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
