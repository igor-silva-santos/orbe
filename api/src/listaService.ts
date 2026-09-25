import { prisma } from './clients';
import {
  mapFilmeToMidia,
  mapSerieToMidia,
  mapAnimeToMidia,
  mapJogoToMidia,
} from './mappers';
import { cardListInclude, animeCarouselInclude, serieCardListInclude } from './routes/mediaRoutesHelpers';

const jogoListInclude = {
  genres: { include: { genero: true } },
  platforms: { include: { plataforma: true }, take: 4 },
};

export type ListaMidia =
  | ReturnType<typeof mapFilmeToMidia>
  | ReturnType<typeof mapSerieToMidia>
  | ReturnType<typeof mapAnimeToMidia>
  | ReturnType<typeof mapJogoToMidia>;

export type ListaItemResponse = {
  id: number;
  midia_id: number;
  tipo_midia: string;
  status: string;
  avaliacao: string | null;
  data_interacao: string;
  midia: ListaMidia;
};

type ListaFilters = {
  status?: string;
  tipo?: string;
};

export async function getUserListaEnriched(
  userId: number,
  filters: ListaFilters = {},
): Promise<{ items: ListaItemResponse[]; missingCount: number }> {
  const where: {
    usuario_id: number;
    status?: string | { not: string };
    tipo_midia?: string;
  } = {
    usuario_id: userId,
    status: filters.status ?? { not: 'oculto' },
  };
  if (filters.tipo) {
    where.tipo_midia = filters.tipo;
  }

  const interactions = await prisma.preferencias_usuario_midia.findMany({
    where,
    orderBy: { data_interacao: 'desc' },
  });

  const idsByType = {
    filme: new Set<number>(),
    serie: new Set<number>(),
    anime: new Set<number>(),
    jogo: new Set<number>(),
  };

  for (const row of interactions) {
    const bucket = idsByType[row.tipo_midia as keyof typeof idsByType];
    if (bucket) bucket.add(row.midia_id);
  }

  const [filmes, series, animes, jogos] = await Promise.all([
    idsByType.filme.size
      ? prisma.filme.findMany({
          where: { tmdbId: { in: [...idsByType.filme] } },
          include: cardListInclude,
        })
      : [],
    idsByType.serie.size
      ? prisma.serie.findMany({
          where: { tmdbId: { in: [...idsByType.serie] } },
          include: serieCardListInclude,
        })
      : [],
    idsByType.anime.size
      ? prisma.anime.findMany({
          where: { anilistId: { in: [...idsByType.anime] } },
          include: animeCarouselInclude,
        })
      : [],
    idsByType.jogo.size
      ? prisma.jogo.findMany({
          where: { igdbId: { in: [...idsByType.jogo] } },
          include: jogoListInclude,
        })
      : [],
  ]);

  const midiaByKey = new Map<string, ListaMidia>();
  for (const filme of filmes) {
    midiaByKey.set(`filme:${filme.tmdbId}`, mapFilmeToMidia(filme));
  }
  for (const serie of series) {
    midiaByKey.set(`serie:${serie.tmdbId}`, mapSerieToMidia(serie));
  }
  for (const anime of animes) {
    midiaByKey.set(`anime:${anime.anilistId}`, mapAnimeToMidia(anime));
  }
  for (const jogo of jogos) {
    midiaByKey.set(`jogo:${jogo.igdbId}`, mapJogoToMidia(jogo));
  }

  let missingCount = 0;
  const items: ListaItemResponse[] = [];

  for (const row of interactions) {
    const midia = midiaByKey.get(`${row.tipo_midia}:${row.midia_id}`);
    if (!midia) {
      missingCount += 1;
      continue;
    }
    items.push({
      id: row.id,
      midia_id: row.midia_id,
      tipo_midia: row.tipo_midia,
      status: row.status,
      avaliacao: row.avaliacao,
      data_interacao: row.data_interacao.toISOString(),
      midia,
    });
  }

  return { items, missingCount };
}
