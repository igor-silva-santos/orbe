import { Router, Request, Response } from 'express';
import { prisma } from './clients';
import { logger } from './logger';
import { contactRateLimiter } from './securityMiddleware';
import { isStringWithMaxLength } from './validation';

const router = Router();

const MAX_NOME_LENGTH = 150;
const MAX_ASSUNTO_LENGTH = 150;
const MAX_MENSAGEM_LENGTH = 5000;

export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

router.post('/contato', contactRateLimiter, async (req: Request, res: Response) => {
  const { nome, email, assunto, mensagem } = req.body ?? {};

  if (!isStringWithMaxLength(nome, MAX_NOME_LENGTH) || nome.trim().length === 0) {
    return res.status(400).json({ error: 'Nome inválido.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email inválido.' });
  }
  if (!isStringWithMaxLength(assunto, MAX_ASSUNTO_LENGTH) || assunto.trim().length === 0) {
    return res.status(400).json({ error: 'Assunto inválido.' });
  }
  if (!isStringWithMaxLength(mensagem, MAX_MENSAGEM_LENGTH) || mensagem.trim().length === 0) {
    return res.status(400).json({ error: `Mensagem inválida ou excede o limite de ${MAX_MENSAGEM_LENGTH} caracteres.` });
  }

  try {
    await prisma.contactMessage.create({
      data: { nome, email, assunto, mensagem },
    });
    res.status(201).json({ message: 'Mensagem enviada com sucesso.' });
  } catch (error) {
    logger.error('Erro ao registrar mensagem de contato:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem. Tente novamente mais tarde.' });
  }
});

export default router;
