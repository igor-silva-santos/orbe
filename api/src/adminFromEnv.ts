import type { PrismaClient } from '@prisma/client';
import { logger } from './logger';

export function parseAdminEmailsFromEnv(): Set<string> {
  const raw = process.env.ORBE_ADMIN_EMAILS ?? '';
  return new Set(
    raw
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isListedAdminEmail(email: string): boolean {
  const admins = parseAdminEmailsFromEnv();
  return admins.size > 0 && admins.has(email.trim().toLowerCase());
}

/** Promove para admin se o e-mail estiver em ORBE_ADMIN_EMAILS (sem rota pública de promoção). */
export async function ensureUserAdminFromEnv<T extends { id: number; email: string; role: string }>(
  prisma: PrismaClient,
  user: T,
): Promise<T> {
  if (!isListedAdminEmail(user.email)) return user;
  if (user.role === 'admin') return user;

  await prisma.user.update({
    where: { id: user.id },
    data: { role: 'admin' },
  });
  logger.info(`Papel admin concedido via ORBE_ADMIN_EMAILS para ${user.email}`);
  return { ...user, role: 'admin' };
}
