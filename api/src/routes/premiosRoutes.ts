import { Router } from 'express';
import { prisma } from '../clients';
import { Prisma } from '@prisma/client';
import { mapFilmeToMidia, mapSerieToMidia, mapAnimeToMidia, mapJogoToMidia } from '../mappers';
import { logger } from '../logger';
import cacheMiddleware from '../cacheMiddleware';
import { TWENTY_FOUR_HOURS, parsePagination } from './mediaRoutesHelpers';

const router = Router();

// Rota para Filtros de Premiações
router.get('/premios/filtros', async (req, res) => {
  try {
    // Busca nomes e anos únicos dos campos JSON de todas as tabelas de mídia
    const results: any[] = await prisma.$queryRaw`
      SELECT DISTINCT
        award->>'nome' as nome,
        (award->>'ano')::int as ano
      FROM (
        SELECT jsonb_array_elements(CASE WHEN jsonb_typeof(premiacoes) = 'array' THEN premiacoes ELSE '[]'::jsonb END) as award FROM "Filme"
        UNION ALL
        SELECT jsonb_array_elements(CASE WHEN jsonb_typeof(premiacoes) = 'array' THEN premiacoes ELSE '[]'::jsonb END) as award FROM "Serie"
        UNION ALL
        SELECT jsonb_array_elements(CASE WHEN jsonb_typeof(premiacoes) = 'array' THEN premiacoes ELSE '[]'::jsonb END) as award FROM "Anime"
        UNION ALL
        SELECT jsonb_array_elements(CASE WHEN jsonb_typeof(premiacoes) = 'array' THEN premiacoes ELSE '[]'::jsonb END) as award FROM "Jogo"
      ) sub
      WHERE award->>'nome' IS NOT NULL
        AND btrim(award->>'nome') <> ''
        AND award->>'ano' ~ '^[0-9]+$'
        AND (award->>'ano')::int > 0
      ORDER BY ano DESC, nome ASC
    `;

    const names = [...new Set(results.map((r) => r.nome).filter(Boolean))].sort();
    const years = [...new Set(results.map((r) => r.ano).filter((y) => y != null && y > 0))].sort(
      (a, b) => b - a,
    );

    res.json({ names, years });
  } catch (error) {
    logger.error(`Erro ao buscar filtros de premiações: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar filtros de premiações.' });
  }
});

// F-05: filtra e pagina premiacoes direto no Postgres via jsonb (mesmo padrao de
// /premios/filtros logo acima, com jsonb_array_elements) em vez de fazer 4 findMany
// sem `take`, hidratar o catalogo inteiro e paginar o array combinado em memoria.
type PremioTable = 'Filme' | 'Serie' | 'Anime' | 'Jogo';

// Escapa os curingas do LIKE/ILIKE pra que um awardName contendo '%' ou '_' seja
// tratado como texto literal, preservando a semantica de substring do
// `.includes()` original (nao um padrao arbitrario).
const escapeLikePattern = (value: string) => value.replace(/[\\%_]/g, (match) => `\\${match}`);

// Mesma logica de matchesPremiacaoFilters (mappers.ts), traduzida pra SQL: um
// registro so entra se tiver pelo menos um award "valido" — mesmo criterio de
// parsePremiacoes() (nome nao vazio, ano > 0) — cujo nome contenha `awardName`
// (case-insensitive, quando informado) e cujo ano seja exatamente `year` (quando
// informado). Os filtros dinamicos combinam com AND, igual ao `.some(...)` original.
const buildPremioAwardCondition = (awardName?: string, year?: number): Prisma.Sql => {
  const conditions: Prisma.Sql[] = [
    Prisma.sql`award->>'nome' IS NOT NULL AND btrim(award->>'nome') <> ''`,
    Prisma.sql`award->>'ano' ~ '^[0-9]+$' AND (award->>'ano')::int > 0`,
  ];
  if (awardName) {
    conditions.push(Prisma.sql`award->>'nome' ILIKE ${'%' + escapeLikePattern(awardName) + '%'} ESCAPE '\\'`);
  }
  if (year !== undefined && !Number.isNaN(year)) {
    conditions.push(Prisma.sql`(award->>'ano')::int = ${year}`);
  }
  return Prisma.join(conditions, ' AND ');
};

// `table` vem sempre de PremioTable (literal interno, nunca entrada do usuario),
// entao interpolar via Prisma.raw pra formar o identificador da tabela e seguro.
const countPremioMatches = async (table: PremioTable, condition: Prisma.Sql): Promise<number> => {
  const tbl = Prisma.raw(`"${table}"`);
  const rows = await prisma.$queryRaw<{ count: bigint }[]>(Prisma.sql`
    SELECT COUNT(DISTINCT t.id)::bigint as count
    FROM ${tbl} t
    CROSS JOIN LATERAL jsonb_array_elements(
      CASE WHEN jsonb_typeof(t.premiacoes) = 'array' THEN t.premiacoes ELSE '[]'::jsonb END
    ) as award
    WHERE ${condition}
  `);
  return Number(rows[0]?.count ?? 0);
};

const selectPremioIds = async (
  table: PremioTable,
  condition: Prisma.Sql,
  offset: number,
  take: number,
): Promise<number[]> => {
  if (take <= 0) return [];
  const tbl = Prisma.raw(`"${table}"`);
  const rows = await prisma.$queryRaw<{ id: number }[]>(Prisma.sql`
    SELECT DISTINCT t.id
    FROM ${tbl} t
    CROSS JOIN LATERAL jsonb_array_elements(
      CASE WHEN jsonb_typeof(t.premiacoes) = 'array' THEN t.premiacoes ELSE '[]'::jsonb END
    ) as award
    WHERE ${condition}
    ORDER BY t.id ASC
    OFFSET ${offset} LIMIT ${take}
  `);
  return rows.map((r) => r.id);
};

type MediaTypeFilter = 'filme' | 'serie' | 'anime' | 'jogo';

const parseMediaType = (value: unknown): MediaTypeFilter | undefined => {
  if (value === 'filme' || value === 'serie' || value === 'anime' || value === 'jogo') return value;
  return undefined;
};

const findLatestAwardForTable = async (table: PremioTable): Promise<{ nome: string; ano: number } | null> => {
  const tbl = Prisma.raw(`"${table}"`);
  const rows = await prisma.$queryRaw<{ nome: string; ano: number }[]>(Prisma.sql`
    SELECT award->>'nome' as nome, MAX((award->>'ano')::int) as ano
    FROM ${tbl} t
    CROSS JOIN LATERAL jsonb_array_elements(
      CASE WHEN jsonb_typeof(t.premiacoes) = 'array' THEN t.premiacoes ELSE '[]'::jsonb END
    ) as award
    WHERE award->>'nome' IS NOT NULL
      AND btrim(award->>'nome') <> ''
      AND award->>'ano' ~ '^[0-9]+$'
      AND (award->>'ano')::int > 0
    GROUP BY award->>'nome'
    ORDER BY ano DESC, nome ASC
    LIMIT 1
  `);
  const row = rows[0];
  if (!row?.nome || !row.ano) return null;
  return { nome: row.nome, ano: row.ano };
};

const fetchPremioResults = async (
  tables: PremioTable[],
  awardName?: string,
  year?: number,
  limit = 24,
): Promise<
  Array<
    | ReturnType<typeof mapFilmeToMidia>
    | ReturnType<typeof mapSerieToMidia>
    | ReturnType<typeof mapAnimeToMidia>
    | ReturnType<typeof mapJogoToMidia>
  >
> => {
  const premioInclude = {
    genres: { include: { genero: true } },
    streamingProviders: { include: { provider: true }, take: 3 },
  };
  const jogoPremioInclude = {
    genres: { include: { genero: true } },
    platforms: { include: { plataforma: true }, take: 4 },
  };
  const condition = buildPremioAwardCondition(awardName, year);
  const perTable = Math.max(6, Math.ceil(limit / tables.length));

  const idsByTable: Record<PremioTable, number[]> = { Filme: [], Serie: [], Anime: [], Jogo: [] };
  await Promise.all(
    tables.map((table) =>
      selectPremioIds(table, condition, 0, perTable).then((ids) => {
        idsByTable[table] = ids;
      }),
    ),
  );

  const [filmes, series, animes, jogos] = await Promise.all([
    idsByTable.Filme.length
      ? prisma.filme.findMany({ where: { id: { in: idsByTable.Filme } }, include: premioInclude, orderBy: { id: 'asc' } })
      : Promise.resolve([]),
    idsByTable.Serie.length
      ? prisma.serie.findMany({ where: { id: { in: idsByTable.Serie } }, include: premioInclude, orderBy: { id: 'asc' } })
      : Promise.resolve([]),
    idsByTable.Anime.length
      ? prisma.anime.findMany({
          where: { id: { in: idsByTable.Anime } },
          include: { genres: { include: { genero: true } } },
          orderBy: { id: 'asc' },
        })
      : Promise.resolve([]),
    idsByTable.Jogo.length
      ? prisma.jogo.findMany({ where: { id: { in: idsByTable.Jogo } }, include: jogoPremioInclude, orderBy: { id: 'asc' } })
      : Promise.resolve([]),
  ]);

  return [
    ...filmes.map(mapFilmeToMidia),
    ...series.map(mapSerieToMidia),
    ...animes.map(mapAnimeToMidia),
    ...jogos.map(mapJogoToMidia),
  ];
};

router.get('/premios/destaques', cacheMiddleware(TWENTY_FOUR_HOURS), async (_req, res) => {
  try {
    const [filmeAward, serieAward, animeAward, jogoAward] = await Promise.all([
      findLatestAwardForTable('Filme'),
      findLatestAwardForTable('Serie'),
      findLatestAwardForTable('Anime'),
      findLatestAwardForTable('Jogo'),
    ]);

    const [filmes, series, animes, jogos] = await Promise.all([
      filmeAward
        ? fetchPremioResults(['Filme'], filmeAward.nome, filmeAward.ano, 18)
        : Promise.resolve([]),
      serieAward
        ? fetchPremioResults(['Serie'], serieAward.nome, serieAward.ano, 18)
        : Promise.resolve([]),
      animeAward
        ? fetchPremioResults(['Anime'], animeAward.nome, animeAward.ano, 18)
        : Promise.resolve([]),
      jogoAward
        ? fetchPremioResults(['Jogo'], jogoAward.nome, jogoAward.ano, 18)
        : Promise.resolve([]),
    ]);

    res.json({
      filmes: { award: filmeAward, results: filmes },
      series: { award: serieAward, results: series },
      animes: { award: animeAward, results: animes },
      jogos: { award: jogoAward, results: jogos },
    });
  } catch (error) {
    logger.error(`Erro ao buscar destaques de premiações: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar destaques de premiações.' });
  }
});

// Rota para Premiações
router.get('/premios', cacheMiddleware(TWENTY_FOUR_HOURS), async (req, res) => {
  const awardName = typeof req.query.awardName === 'string' ? req.query.awardName : undefined;
  const yearParam = req.query.year;
  const year = yearParam !== undefined ? parseInt(String(yearParam), 10) : undefined;
  const mediaType = parseMediaType(req.query.mediaType);
  const { page, limit, skip } = parsePagination(req.query);

  const premioInclude = {
    genres: { include: { genero: true } },
    streamingProviders: { include: { provider: true }, take: 3 },
  };

  const jogoPremioInclude = {
    genres: { include: { genero: true } },
    platforms: { include: { plataforma: true }, take: 4 },
  };

  try {
    const condition = buildPremioAwardCondition(awardName, year);

    // Ordem fixa filmes -> series -> animes -> jogos, igual ao comportamento antigo de
    // concatenar os 4 arrays antes de fatiar. Cada tabela e contada e paginada no
    // banco (nao mais em memoria) e so buscamos, com include completo, os registros
    // que realmente caem dentro da janela [skip, skip+limit) pedida.
    const allTables: PremioTable[] = ['Filme', 'Serie', 'Anime', 'Jogo'];
    const tables: PremioTable[] = mediaType
      ? allTables.filter((table) => table.toLowerCase() === mediaType)
      : allTables;
    const counts = await Promise.all(tables.map((table) => countPremioMatches(table, condition)));
    const total = counts.reduce((sum, c) => sum + c, 0);

    const idsByTable: Record<PremioTable, number[]> = { Filme: [], Serie: [], Anime: [], Jogo: [] };
    let cursor = 0;
    const idFetches: Promise<void>[] = [];
    tables.forEach((table, i) => {
      const segStart = cursor;
      const segCount = counts[i];
      cursor += segCount;
      const localOffset = Math.max(skip, segStart) - segStart;
      const localEnd = Math.min(skip + limit, segStart + segCount) - segStart;
      const localTake = localEnd - localOffset;
      if (localTake > 0) {
        idFetches.push(
          selectPremioIds(table, condition, localOffset, localTake).then((ids) => {
            idsByTable[table] = ids;
          }),
        );
      }
    });
    await Promise.all(idFetches);

    const [filmes, series, animes, jogos] = await Promise.all([
      idsByTable.Filme.length
        ? prisma.filme.findMany({ where: { id: { in: idsByTable.Filme } }, include: premioInclude, orderBy: { id: 'asc' } })
        : Promise.resolve([]),
      idsByTable.Serie.length
        ? prisma.serie.findMany({ where: { id: { in: idsByTable.Serie } }, include: premioInclude, orderBy: { id: 'asc' } })
        : Promise.resolve([]),
      idsByTable.Anime.length
        ? prisma.anime.findMany({
            where: { id: { in: idsByTable.Anime } },
            include: { genres: { include: { genero: true } } },
            orderBy: { id: 'asc' },
          })
        : Promise.resolve([]),
      idsByTable.Jogo.length
        ? prisma.jogo.findMany({ where: { id: { in: idsByTable.Jogo } }, include: jogoPremioInclude, orderBy: { id: 'asc' } })
        : Promise.resolve([]),
    ]);

    const results = [
      ...filmes.map(mapFilmeToMidia),
      ...series.map(mapSerieToMidia),
      ...animes.map(mapAnimeToMidia),
      ...jogos.map(mapJogoToMidia),
    ];

    res.json({ results, total, page, limit });
  } catch (error) {
    logger.error(`Erro ao buscar premiações: ${error}`);
    res.status(500).json({ error: 'Erro ao buscar premiações.' });
  }
});

export default router;
