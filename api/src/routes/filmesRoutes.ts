import { Router } from 'express';
import { prisma, tmdb } from '../clients';
import { Prisma } from '@prisma/client';
import { mapFilmeToMidia, mapFilmeToCarouselCard } from '../mappers';
import { fetchFilmeDetailsLive } from '../externalDetails';
import { filmeQualityFilter, getFilmeQualityFilterForYear } from '../qualityFilters';
import { logger } from '../logger';
import cacheMiddleware from '../cacheMiddleware';
import adminMiddleware from '../adminMiddleware';
import { invalidateMediaCaches } from '../cacheInvalidation';
import { translateTmdbStatus } from '../statusLabels';
import { detailsRateLimiter } from '../securityMiddleware';
import { mapFilmeAdminUpdate } from '../adminUpdateMappers';
import { sortFilmesByAntecipacaoScore } from '../filmeAntecipacao';
import { resolveFilmeDestaqueFields, loadMaisEsperadoTmdbIds } from '../filmeLancamentoTags';
import { yearOnlyFilmeWhere } from '../yearOnlyRelease';
import {
  TWELVE_HOURS,
  TWENTY_FOUR_HOURS,
  DETAILS_CACHE_SECONDS,
  CAROUSEL_ITEM_LIMIT,
  parsePagination,
  parsePositiveIntId,
  getDistinctYears,
  parseMonthQuery,
  getMonthDateRange,
  parseYearMonthQuery,
  parseCarouselYearQuery,
  fetchFilmesForCarousel,
  cardListInclude,
} from './mediaRoutesHelpers';

const router = Router();
const isProduction = process.env.NODE_ENV === 'production';

// Rota para Filmes
router.get('/filmes', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { filtro, genero, ano, mes, status, plataforma, disponibilidade } = req.query;
  const { page, limit, skip } = parsePagination(req.query as { page?: string; limit?: string });
  try {
    const allConditions: Prisma.FilmeWhereInput[] = [];

    const monthRange = typeof mes === 'string' ? parseMonthQuery(mes, ano as string | undefined) : null;

    if (monthRange) {
      allConditions.push({ releaseDate: { gte: monthRange.startDate, lte: monthRange.endDate } });
      if (ano && ano !== 'todos') {
        allConditions.push(getFilmeQualityFilterForYear(parseInt(ano as string, 10)));
      } else {
        allConditions.push(filmeQualityFilter);
      }
    } else if (ano && ano !== 'todos') {
      const year = parseInt(ano as string);
      allConditions.push(getFilmeQualityFilterForYear(year));
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59);
      allConditions.push({ releaseDate: { gte: startDate, lte: endDate } });
    } else {
      allConditions.push(filmeQualityFilter);
    }

    if (genero && genero !== 'todos') {
      allConditions.push({ genres: { some: { genero: { name: genero as string } } } });
    }

    if (status && status !== 'todos') {
      allConditions.push({ status: status as string });
    }

    if (plataforma && plataforma !== 'todos') {
      allConditions.push({
        streamingProviders: { some: { provider: { name: plataforma as string } } },
      });
    }

    const now = new Date();
    if (filtro === 'em_cartaz') {
      allConditions.push({ emCartaz: true });
    } else if (filtro === 'em_breve') {
      allConditions.push({ emBreve: true });
    } else if (filtro === 'lancados') {
      allConditions.push({ releaseDate: { lte: now } });
    } else if (filtro === 'futuros') {
      allConditions.push({ releaseDate: { gte: now } });
    }

    // Sub-filtro de disponibilidade — usado pelo modo "Em Alta" de filmes
    // (cinema / streaming / ambos). "ambos" ou ausente não restringe nada,
    // mantendo o comportamento padrão já existente de "populares".
    if (disponibilidade === 'cinema') {
      allConditions.push({
        estreia_cinema: true,
        OR: [{ emCartaz: true }, { emBreve: true }, { tem_sessoes: true }, { em_prevenda: true }],
      });
    } else if (disponibilidade === 'streaming') {
      allConditions.push({
        OR: [{ estreia_streaming: true }, { streamingProviders: { some: {} } }],
      });
    }

    const where: Prisma.FilmeWhereInput = { AND: allConditions };

    const orderBy: Prisma.FilmeOrderByWithRelationInput = filtro === 'populares' ? { popularity: 'desc' } : { title: 'asc' };

    const [filmes, total] = await Promise.all([
      prisma.filme.findMany({
        where,
        include: cardListInclude,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.filme.count({ where }),
    ]);
    res.json({ results: filmes.map(mapFilmeToMidia), total, page, limit });
  } catch (error) {
    logger.error(`Erro ao buscar filmes: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filmes.' });
  }
});

// Rota de Detalhes do Filme (dados ao vivo do TMDB)
router.get('/filmes/:id/details', detailsRateLimiter, cacheMiddleware(DETAILS_CACHE_SECONDS), async (req, res) => {
  const tmdbId = parsePositiveIntId(req.params.id);
  if (!tmdbId) {
    return res.status(400).json({ error: 'ID de filme inválido.' });
  }
  logger.info(`Buscando detalhes ao vivo para o filme TMDB ID: ${tmdbId}`);
  try {
    const filme = await fetchFilmeDetailsLive(tmdbId);

    if (!filme) {
      return res.status(404).json({ error: 'Filme não encontrado.' });
    }

    const maisEsperadoIds = await loadMaisEsperadoTmdbIds();
    const destaques = resolveFilmeDestaqueFields(
      {
        tmdbId: (filme as { tmdbId?: number; id?: number }).tmdbId ?? (filme as { id: number }).id,
        releaseDate:
          (filme as { releaseDate?: string }).releaseDate ??
          (filme as { data_lancamento_api?: string }).data_lancamento_api,
      },
      { maisEsperadoIds, allowEstreiaSemana: true },
    );

    res.json({ ...filme, ...destaques });
  } catch (error) {
    logger.error(`Erro ao buscar detalhes do filme: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar detalhes do filme.' });
  }
});

// Filmografia de uma pessoa (elenco/equipe) — usada pela página /pessoa/[id]
// Nota da divisao: essa rota nao comeca com /filmes, mas retorna filmografia
// combinada de filmes+series de uma pessoa (TMDB) — mantida aqui (mesma
// posicao relativa que tinha no arquivo original, entre /filmes/:id/details
// e PUT /filmes/:id) por nao se encaixar em nenhum outro bucket de tipo unico.
router.get('/pessoas/:id/creditos', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const personId = parsePositiveIntId(req.params.id);
  if (!personId) {
    return res.status(400).json({ error: 'ID de pessoa inválido.' });
  }

  try {
    const [person, credits] = await Promise.all([
      tmdb.personInfo({ id: personId, language: 'pt-BR' }),
      tmdb.personCombinedCredits({ id: personId, language: 'pt-BR' }),
    ]);

    if (!person?.id) {
      return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }

    const seen = new Set<string>();
    const filmography = (credits?.cast ?? [])
      .filter((c: any) => c.media_type === 'movie' || c.media_type === 'tv')
      .filter((c: any) => {
        const key = `${c.media_type}-${c.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((c: any) => ({
        id: c.id,
        mediaType: c.media_type === 'movie' ? 'filme' : 'serie',
        title: c.title || c.name || 'Sem título',
        character: c.character || null,
        posterPath: c.poster_path || null,
        releaseDate: c.release_date || c.first_air_date || null,
      }))
      .sort((a, b) => {
        const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
        const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 60);

    res.json({
      id: person.id,
      name: person.name,
      profilePath: person.profile_path ?? null,
      biography: person.biography || null,
      filmography,
    });
  } catch (error: any) {
    if (error?.status === 404 || error?.response?.status === 404) {
      return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
    logger.error(`Erro ao buscar créditos da pessoa ${personId}: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar créditos da pessoa.' });
  }
});

// Rota de Edição do Filme (Admin)
router.put('/filmes/:id', adminMiddleware, async (req, res) => {
  const tmdbId = parsePositiveIntId(req.params.id);
  if (!tmdbId) {
    return res.status(400).json({ error: 'ID de filme inválido.' });
  }

  const data = mapFilmeAdminUpdate(req.body as Record<string, unknown>);
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'Nenhum campo editável fornecido.' });
  }

  try {
    const updatedFilme = await prisma.filme.update({
      where: { tmdbId },
      data,
    });

    await invalidateMediaCaches('filmes', String(tmdbId));
    res.json(mapFilmeToMidia(updatedFilme));
  } catch (error) {
    logger.error(`Erro ao editar o filme ID ${tmdbId}: ${error}`);
    res.status(500).json({ error: 'Erro ao editar o filme.' });
  }
});

// Rota para buscar opções de filtros de Filmes
router.get('/filmes/filtros', cacheMiddleware(TWENTY_FOUR_HOURS), async (req, res) => {
  try {
    const genres = await prisma.genero.findMany({
      where: { filmes: { some: {} } }, // Apenas gêneros que têm filmes
      orderBy: { name: 'asc' },
    });

    const distinctYears = await getDistinctYears('Filme', 'releaseDate');

    const statuses = await prisma.filme.findMany({
        where: { status: { not: null } },
        distinct: ['status'],
        select: { status: true },
    });

    const platforms = await prisma.streamingProvider.findMany({
      where: { filmes: { some: {} } },
      orderBy: { name: 'asc' },
      select: { name: true },
    });

    res.json({
      genres: genres.map(g => g.name),
      years: distinctYears,
      statuses: statuses.map(s => ({
        value: s.status!,
        label: translateTmdbStatus(s.status) ?? s.status!,
      })),
      platforms: platforms.map(p => p.name),
    });

  } catch (error) {
    logger.error('Erro ao buscar filtros de filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar opções de filtros.' });
  }
});

router.get('/filmes/mais-esperados', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const limit = Math.min(parseInt(String(req.query.limit ?? '40'), 10) || 40, 100);
  const now = new Date();
  const horizon = new Date(now);
  horizon.setDate(horizon.getDate() + 120);

  try {
    const filmes = await fetchFilmesForCarousel(
      { releaseDate: { gte: now, lte: horizon } },
      { take: CAROUSEL_ITEM_LIMIT, homeLaunch: true },
    );
    const ranked = sortFilmesByAntecipacaoScore(filmes, now).slice(0, limit);
    res.json(
      ranked.map((filme) => ({
        ...mapFilmeToCarouselCard(filme),
        estreia_semana: false,
        mais_esperado: true,
        destaque_pill: 'mais_esperado' as const,
      })),
    );
  } catch (error) {
    logger.error(`Erro ao buscar filmes mais esperados: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filmes mais esperados.' });
  }
});

// Rota para o Carrossel da Homepage de Filmes
router.get('/filmes/homepage-carousel', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;

    const startDate = new Date(startYear, 0, 1);
    const endDate = new Date(endYear, 11, 31, 23, 59, 59);

    const filmes = await fetchFilmesForCarousel(
      { releaseDate: { gte: startDate, lte: endDate } },
      { orderBy: { releaseDate: 'asc' }, take: CAROUSEL_ITEM_LIMIT, year: currentYear, homeLaunch: true },
    );
    res.json(filmes.map(mapFilmeToMidia));
  } catch (error) {
    logger.error(`Erro ao buscar filmes para o carrossel da homepage: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filmes para o carrossel da homepage.' });
  }
});

// Rota para Filmes por Ano
router.get('/filmes/by-year', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const { year } = req.query;
  if (!year || isNaN(parseInt(year as string))) {
    return res.status(400).json({ error: 'Ano inválido fornecido.' });
  }
  const parsedYear = parseInt(year as string);
  const startDate = new Date(parsedYear, 0, 1);
  const endDate = new Date(parsedYear, 11, 31, 23, 59, 59);

  try {
    const filmes = await fetchFilmesForCarousel(
      { releaseDate: { gte: startDate, lte: endDate } },
      { orderBy: { releaseDate: 'asc' }, take: CAROUSEL_ITEM_LIMIT, year: parsedYear, homeLaunch: true },
    );
    res.json(filmes.map(mapFilmeToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar filmes por ano: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filmes por ano.' });
  }
});

router.get('/filmes/by-month', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const parsed = parseYearMonthQuery(req.query as { year?: string; month?: string });
  if (!parsed) {
    return res.status(400).json({ error: 'Ano ou mês inválido.' });
  }

  const { startDate, endDate } = getMonthDateRange(parsed.year, parsed.month);

  try {
    const filmes = await fetchFilmesForCarousel(
      { releaseDate: { gte: startDate, lte: endDate } },
      { orderBy: { releaseDate: 'asc' }, take: CAROUSEL_ITEM_LIMIT, year: parsed.year, homeLaunch: true },
    );
    res.json(filmes.map(mapFilmeToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar filmes por mês: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filmes por mês.' });
  }
});

/** Lançamentos só com ano (TBA) — isolado da timeline mensal do carrossel */
router.get('/filmes/year-tbd', cacheMiddleware(TWELVE_HOURS), async (req, res) => {
  const parsedYear = parseCarouselYearQuery(req.query as { year?: string });
  if (!parsedYear) {
    return res.status(400).json({ error: 'Ano inválido.' });
  }

  try {
    const filmes = await fetchFilmesForCarousel(
      yearOnlyFilmeWhere(parsedYear),
      { orderBy: { releaseYear: 'asc' }, take: CAROUSEL_ITEM_LIMIT, year: parsedYear },
    );
    res.json(filmes.map(mapFilmeToCarouselCard));
  } catch (error) {
    logger.error(`Erro ao buscar filmes year-tbd: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar lançamentos com data a confirmar.' });
  }
});

if (!isProduction) {
  router.get('/debug-search', async (req, res) => {
    try {
      const searchFilter = { contains: 'tron', mode: 'insensitive' as const };
      const filmes = await prisma.filme.findMany({
        where: { title: searchFilter },
        select: { title: true, popularity: true },
      });
      res.json(filmes);
    } catch (error) {
      logger.error(`Erro no endpoint de debug-search: ${error}`);
      res.status(500).json({ error: 'Erro ao buscar dados de debug-search.' });
    }
  });

  router.get('/debug-trending', async (req, res) => {
    try {
      const filmes = await prisma.filme.findMany({
        take: 20,
        orderBy: { popularity: 'desc' },
        select: { title: true, popularity: true, voteCount: true, releaseDate: true },
      });
      res.json(filmes);
    } catch (error) {
      logger.error(`Erro no endpoint de debug: ${error}`);
      res.status(500).json({ error: 'Erro ao buscar dados de debug.' });
    }
  });
}

export default router;
