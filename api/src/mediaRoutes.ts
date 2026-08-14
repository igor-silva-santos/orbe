import { Router } from 'express';
import homeRoutes from './routes/homeRoutes';
import filmesRoutes from './routes/filmesRoutes';
import seriesRoutes from './routes/seriesRoutes';
import animesRoutes from './routes/animesRoutes';
import jogosRoutes from './routes/jogosRoutes';
import premiosRoutes from './routes/premiosRoutes';
import eventosRoutes from './routes/eventosRoutes';
import continuacoesRoutes from './routes/continuacoesRoutes';
import imagesRoutes from './routes/imagesRoutes';

// Agregador de rotas de midia. Cada tipo de midia (filmes, series, animes,
// jogos), as rotas cross-tipo (home, hoje, trending, busca) e as rotas de
// eventos/premiacoes vivem em arquivos separados dentro de ./routes — este
// arquivo so monta cada sub-router sob o mesmo Router() principal, mantendo
// exatamente os mesmos paths finais que index.ts ja espera em `app.use('/api', mediaRoutes)`.
const router = Router();

router.use(homeRoutes);
router.use(imagesRoutes);
router.use(filmesRoutes);
router.use(seriesRoutes);
router.use(animesRoutes);
router.use(jogosRoutes);
router.use(premiosRoutes);
router.use(eventosRoutes);
router.use(continuacoesRoutes);

export default router;
