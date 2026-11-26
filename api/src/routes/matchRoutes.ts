import { Router } from 'express';
import { logger } from '../logger';
import { verifyBearerToken, MissingTokenError } from '../authMiddleware';
import { searchRateLimiter } from '../securityMiddleware';
import { isValidMediaType } from '../validation';
import { parseMatchIds, type GamePlay, type MatchTipo } from '../matchScore';
import { runMatch } from '../matchService';

const router = Router();

function readUserId(authorization: string | undefined): { userId: number | null; invalid: boolean } {
  if (!authorization) return { userId: null, invalid: false };
  try {
    return { userId: verifyBearerToken(authorization).userId, invalid: false };
  } catch (error) {
    if (error instanceof MissingTokenError) return { userId: null, invalid: false };
    return { userId: null, invalid: true };
  }
}

router.get('/match', searchRateLimiter, async (req, res) => {
  const tipo = req.query.tipo;
  const modo = req.query.modo;
  if (!isValidMediaType(tipo)) {
    return res.status(400).json({ error: 'tipo inválido. Use filme, serie, anime ou jogo.' });
  }
  if (modo !== 'solo' && modo !== 'dupla') {
    return res.status(400).json({ error: 'modo inválido. Use solo ou dupla.' });
  }

  const jogoRaw = req.query.jogo;
  let gamePlay: GamePlay | null = null;
  if (tipo === 'jogo') {
    if (jogoRaw !== 'multiplayer' && jogoRaw !== 'single') {
      return res.status(400).json({ error: 'Para jogo, informe jogo=multiplayer ou jogo=single.' });
    }
    gamePlay = jogoRaw;
  }

  const useBase = req.query.base === '1' || req.query.base === 'true';
  if (useBase && modo === 'dupla') {
    return res.status(400).json({ error: 'A base pessoal vale para o match solo. Na dupla, cada pessoa escolhe um título.' });
  }

  const ids = parseMatchIds(req.query.ids);
  if (!ids) {
    return res.status(400).json({ error: 'ids inválidos. Envie um ou dois números separados por vírgula.' });
  }
  if (!useBase && modo === 'solo' && ids.length !== 1) {
    return res.status(400).json({ error: 'No match solo, escolha um título.' });
  }
  if (modo === 'dupla' && ids.length !== 2) {
    return res.status(400).json({ error: 'No match em dupla, escolha dois títulos.' });
  }

  const auth = useBase ? readUserId(req.headers.authorization) : { userId: null, invalid: false };
  if (useBase && auth.invalid) {
    return res.status(401).json({ error: 'Token inválido.' });
  }

  try {
    const payload = await runMatch({
      tipo: tipo as MatchTipo,
      modo,
      ids: useBase ? [] : ids,
      useBase,
      gamePlay,
      userId: auth.userId,
    });
    return res.json(payload);
  } catch (error) {
    logger.error(`Erro ao calcular match: ${error}`);
    return res.status(500).json({ error: 'Erro ao calcular o match.' });
  }
});

export default router;
