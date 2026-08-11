import type { Prisma } from '@prisma/client';

/** Extrai path TMDB de URL completa ou path relativo */
function extractTmdbPosterPath(urlOrPath: string | undefined | null): string | undefined {
  if (!urlOrPath?.trim()) return undefined;
  const s = urlOrPath.trim();
  if (s.startsWith('/')) return s;
  const match = s.match(/\/t\/p\/[^/]+\/(.*)$/);
  return match ? `/${match[1]}` : undefined;
}

function str(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function int(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isInteger(value)) return value;
  if (typeof value === 'string' && /^\d+$/.test(value)) return parseInt(value, 10);
  return undefined;
}

export function mapFilmeAdminUpdate(body: Record<string, unknown>): Prisma.FilmeUpdateInput {
  const data: Prisma.FilmeUpdateInput = {};

  const title = str(body.titulo_curado) ?? str(body.title);
  if (title) data.title = title;

  const originalTitle = str(body.titulo_api) ?? str(body.originalTitle);
  if (originalTitle) data.originalTitle = originalTitle;

  const overview = str(body.sinopse_curada) ?? str(body.sinopse) ?? str(body.overview);
  if (overview) data.overview = overview;

  const poster = extractTmdbPosterPath(str(body.poster_curado) ?? str(body.posterPath));
  if (poster) data.posterPath = poster;

  const ingressoLink = str(body.ingresso_link);
  if (ingressoLink) data.ingresso_link = ingressoLink;

  if (typeof body.em_prevenda === 'boolean') data.em_prevenda = body.em_prevenda;

  return data;
}

export function mapSerieAdminUpdate(body: Record<string, unknown>): Prisma.SerieUpdateInput {
  const data: Prisma.SerieUpdateInput = {};

  const name = str(body.titulo_curado) ?? str(body.name);
  if (name) data.name = name;

  const originalName = str(body.titulo_api) ?? str(body.originalName);
  if (originalName) data.originalName = originalName;

  const overview = str(body.sinopse_curada) ?? str(body.sinopse) ?? str(body.overview);
  if (overview) data.overview = overview;

  const seasons = int(body.numero_temporadas) ?? int(body.numberOfSeasons);
  if (seasons !== undefined) data.numberOfSeasons = seasons;

  const episodes = int(body.numero_episodios) ?? int(body.numberOfEpisodes);
  if (episodes !== undefined) data.numberOfEpisodes = episodes;

  return data;
}

export function mapAnimeAdminUpdate(body: Record<string, unknown>): Prisma.AnimeUpdateInput {
  const data: Prisma.AnimeUpdateInput = {};

  const titleRomaji = str(body.titleRomaji) ?? str(body.titulo_curado);
  if (titleRomaji) data.titleRomaji = titleRomaji;

  const titleEnglish = str(body.titleEnglish) ?? str(body.titulo_api);
  if (titleEnglish) data.titleEnglish = titleEnglish;

  const description =
    str(body.sinopse_curada) ?? str(body.sinopse) ?? str(body.description);
  if (description) data.description = description;

  const episodes = int(body.numero_episodios) ?? int(body.episodes);
  if (episodes !== undefined) data.episodes = episodes;

  const source = str(body.fonte) ?? str(body.source);
  if (source) data.source = source;

  const coverImage = str(body.poster_curado) ?? str(body.coverImage);
  if (coverImage) data.coverImage = coverImage;

  return data;
}

export function mapJogoAdminUpdate(body: Record<string, unknown>): Prisma.JogoUpdateInput {
  const data: Prisma.JogoUpdateInput = {};

  const name = str(body.titulo_curado) ?? str(body.name);
  if (name) data.name = name;

  const summary = str(body.sinopse_curada) ?? str(body.sinopse) ?? str(body.summary);
  if (summary) data.summary = summary;

  const cover = str(body.poster_curado) ?? str(body.cover);
  if (cover) data.cover = cover;

  return data;
}
