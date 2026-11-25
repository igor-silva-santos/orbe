import bcrypt from 'bcrypt';
import { prisma } from './clients';

export class AccountDeletionError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** Remove usuário e dados dependentes (LGPD / contas QA descartáveis). */
export async function deleteUserAccount(userId: number, password: string): Promise<void> {
  if (!password || typeof password !== 'string') {
    throw new AccountDeletionError(400, 'Senha é obrigatória para excluir a conta.');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, hashed_password: true },
  });

  if (!user) {
    throw new AccountDeletionError(404, 'Usuário não encontrado.');
  }

  if (user.role === 'admin') {
    throw new AccountDeletionError(403, 'Contas administrativas não podem ser excluídas por este fluxo.');
  }

  const passwordOk = await bcrypt.compare(password, user.hashed_password);
  if (!passwordOk) {
    throw new AccountDeletionError(400, 'Senha incorreta.');
  }

  await prisma.$transaction(async (tx) => {
    await tx.preferencias_usuario_midia.deleteMany({ where: { usuario_id: userId } });
    await tx.notification.deleteMany({ where: { userId } });
    await tx.watchlistItem.deleteMany({ where: { userId } });
    await tx.userCalendarEvent.deleteMany({ where: { userId } });
    // Demais relações (watchlist anime, push, pins, import sessions) têm onDelete: Cascade no User.
    await tx.user.delete({ where: { id: userId } });
  });
}
