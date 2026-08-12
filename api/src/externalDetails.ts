import { tmdb, igdbApi, anilistApi, getIgdbAccessToken } from './clients';
import { prisma } from './clients';
import { mapSerieToMidia, mapAnimeToMidia, mapJogoToMidia, withPortugueseTranslation, parsePremiacoes } from './mappers';
import { resolvePortugueseSynopsis, translateSynopsisForStorage, isLikelyEnglish } from './translation';
import { fetchTmdbPtOverview } from './tmdbOverview';
import { fetchSteamAppDetails } from './steamClient';
import { logger } from './logger';

const ANIME_DETAIL_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      idMal
      title { romaji english native }
      description(asHtml: false)
      episodes
      season
      seasonYear
      format
      status
      startDate { year month day }
      endDate { year month day }
      averageScore
      meanScore
      popularity
      duration
      source
      siteUrl
      bannerImage
      coverImage { extraLarge }
      isAdult
      genres
      tags { id name description category isAdult }
      studios(isMain: true) { nodes { id name } }
      characters(sort: [ROLE, RELEVANCE], perPage: 25) {
        edges {
          role
          node { id name { full } image { large } }
          voiceActors(sort: RELEVANCE) {
            id
            name { full }
            image { large }
            language: languageV2
          }
        }
      }
      staff(sort: RELEVANCE, perPage: 15) {
        edges {
          role
          node { id name { full } image { large } }
        }
      }
      streamingEpisodes { title thumbnail url site }
      trailer { id site }
      externalLinks { id url site }
      rankings { id rank type context year allTime }
      airingSchedule(notYetAired: true, perPage: 5) { nodes { airingAt episode } }
      relations {
        edges {
          relationType
          node { id title { romaji } }
        }
      }
    }
  }
`;

function mapTmdbMovieToDetails(
  movie: any,
  dbExtras?: {
    em_prevenda?: boolean | null;
    ingresso_link?: string | null;
    tem_sessoes?: boolean | null;
    estreia_cinema?: boolean | null;
    estreia_streaming?: boolean | null;
  }
) {
  const brProviders = movie['watch/providers']?.results?.BR;

  return {
    id: movie.id,
    tmdbId: movie.id,
    title: movie.title,
    originalTitle: movie.original_title ?? null,
    releaseDate: movie.release_date ?? null,
    runtime: movie.runtime ?? null,
    overview: movie.overview ?? null,
    posterPath: movie.poster_path ?? null,
    backdropPath: movie.backdrop_path ?? null,
    status: movie.status ?? 'Unknown',
    popularity: movie.popularity ?? null,
    voteAverage: movie.vote_average ?? null,
    voteCount: movie.vote_count ?? null,
    em_prevenda: dbExtras?.em_prevenda ?? false,
    ingresso_link: dbExtras?.ingresso_link ?? null,
    tem_sessoes: dbExtras?.tem_sessoes ?? false,
    estreia_cinema: dbExtras?.estreia_cinema ?? false,
    estreia_streaming: dbExtras?.estreia_streaming ?? false,
    genres: (movie.genres ?? []).map((g: any) => ({
      genero: { id: g.id, name: g.name, tmdbId: g.id },
    })),
    crew: (movie.credits?.crew ?? [])
      .filter((p: any) => ['Director', 'Screenplay', 'Writer'].includes(p.job))
      .map((p: any) => ({
        job: p.job,
        department: p.department,
        pessoa: { id: p.id, name: p.name, profilePath: p.profile_path },
      })),
    cast: (movie.credits?.cast ?? []).slice(0, 20).map((p: any) => ({
      character: p.character,
      order: p.order,
      pessoa: { id: p.id, name: p.name, profilePath: p.profile_path },
    })),
    streamingProviders: (brProviders?.flatrate ?? []).map((provider: any) => ({
      url: brProviders?.link ?? null,
      provider: {
        id: provider.provider_id,
        name: provider.provider_name,
        logoPath: provider.logo_path,
      },
    })),
    videos: (movie.videos?.results ?? [])
      .filter((v: any) => v.site === 'YouTube')
      .map((v: any) => ({
        key: v.key,
        site: v.site,
        type: v.type,
        name: v.name,
        official: v.official,
      })),
  };
}

function mapTmdbSerieToPrismaLike(serie: any) {
  const brProviders = serie['watch/providers']?.results?.BR;

  return {
    tmdbId: serie.id,
    name: serie.name,
    originalName: serie.original_name,
    overview: serie.overview,
    firstAirDate: serie.first_air_date ? new Date(serie.first_air_date) : null,
    numberOfSeasons: serie.number_of_seasons,
    numberOfEpisodes: serie.number_of_episodes,
    status: serie.status,
    posterPath: serie.poster_path,
    backdropPath: serie.backdrop_path,
    voteAverage: serie.vote_average,
    voteCount: serie.vote_count,
    popularity: serie.popularity,
    genres: (serie.genres ?? []).map((g: any) => ({ genero: { name: g.name } })),
    cast: (serie.credits?.cast ?? []).slice(0, 20).map((p: any) => ({
      character: p.character,
      pessoa: { id: p.id, name: p.name, profilePath: p.profile_path },
    })),
    crew: (serie.credits?.crew ?? []).map((p: any) => ({
      job: p.job,
      pessoa: { id: p.id, name: p.name, profilePath: p.profile_path },
    })),
    createdBy: (serie.created_by ?? []).map((p: any) => ({
      pessoa: { id: p.id, name: p.name, profilePath: p.profile_path },
    })),
    videos: (serie.videos?.results ?? [])
      .filter((v: any) => v.site === 'YouTube')
      .map((v: any) => ({
        key: v.key,
        site: v.site,
        type: v.type,
        name: v.name,
        official: v.official,
      })),
    seasons: (serie.seasons ?? []).map((s: any) => ({
      seasonNumber: s.season_number,
      episodeCount: s.episode_count,
      name: s.name,
      posterPath: s.poster_path,
    })),
    streamingProviders: (brProviders?.flatrate ?? []).map((provider: any) => ({
      url: brProviders?.link ?? null,
      provider: {
        tmdbId: provider.provider_id,
        name: provider.provider_name,
        logoPath: provider.logo_path,
      },
    })),
  };
}

function mapAnilistToPrismaLike(anime: any) {
  const startDate = anime.startDate?.year
    ? new Date(anime.startDate.year, (anime.startDate.month || 1) - 1, anime.startDate.day || 1)
    : null;

  const externalLinks = [
    ...(anime.externalLinks ?? []),
    ...(anime.trailer?.site === 'youtube' && anime.trailer?.id
      ? [{ url: `https://www.youtube.com/watch?v=${anime.trailer.id}`, site: 'YouTube' }]
      : []),
  ];

  const relations = (anime.relations?.edges ?? []).map((edge: any) => ({
    relationType: edge.relationType,
    relatedAnime: {
      anilistId: edge.node.id,
      titleRomaji: edge.node.title?.romaji ?? `Anime #${edge.node.id}`,
    },
  }));

  return {
    anilistId: anime.id,
    malId: anime.idMal,
    titleRomaji: anime.title?.romaji,
    titleEnglish: anime.title?.english,
    titleNative: anime.title?.native,
    description: anime.description,
    episodes: anime.episodes,
    season: anime.season,
    seasonYear: anime.seasonYear,
    format: anime.format,
    status: anime.status,
    startDate,
    averageScore: anime.averageScore,
    popularity: anime.popularity,
    source: anime.source,
    siteUrl: anime.siteUrl,
    coverImage: anime.coverImage?.extraLarge,
    isAdult: anime.isAdult,
    genres: (anime.genres ?? []).map((name: string) => ({ genero: { name } })),
    tags: (anime.tags ?? []).map((tag: any) => ({ tag: { name: tag.name } })),
    studios: (anime.studios?.nodes ?? []).map((studio: any) => ({
      studio: { anilistId: studio.id, name: studio.name },
    })),
    characters: (anime.characters?.edges ?? []).map((edge: any) => ({
      character: {
        anilistId: edge.node.id,
        name: edge.node.name?.full,
        image: edge.node.image?.large,
      },
      voiceActors: (edge.voiceActors ?? []).map((va: any) => ({
        dublador: {
          anilistId: va.id,
          name: va.name?.full,
          image: va.image?.large,
          language: va.language,
        },
      })),
    })),
    staff: (anime.staff?.edges ?? []).map((edge: any) => ({
      role: edge.role,
      staff: {
        anilistId: edge.node.id,
        name: edge.node.name?.full,
        image: edge.node.image?.large,
      },
    })),
    streamingLinks: (anime.streamingEpisodes ?? []).map((link: any) => ({
      site: link.site,
      url: link.url,
    })),
    externalLinks,
    ranks: (anime.rankings ?? []).map((rank: any) => ({
      rank: rank.rank,
      type: rank.type,
      context: rank.context,
      year: rank.year,
      allTime: rank.allTime,
    })),
    airingSchedule: (anime.airingSchedule?.nodes ?? []).map((schedule: any) => ({
      airingAt: new Date(schedule.airingAt * 1000),
      episode: schedule.episode,
    })),
    sourceRelations: relations,
    relatedRelations: [],
  };
}

function mapIgdbToPrismaLike(game: any) {
  const coverUrl = game.cover?.url
    ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
    : null;

  const companies: { role: string; company: { name: string } }[] = [];
  (game.involved_companies ?? []).forEach((inv: any) => {
    if (!inv.company) return;
    if (inv.developer) companies.push({ role: 'developer', company: inv.company });
    if (inv.publisher) companies.push({ role: 'publisher', company: inv.company });
  });

  return {
    igdbId: game.id,
    name: game.name,
    summary: game.summary,
    cover: coverUrl,
    firstReleaseDate: game.first_release_date ? new Date(game.first_release_date * 1000) : null,
    rating: game.rating,
    genres: (game.genres ?? []).map((g: any) => ({ genero: { name: g.name } })),
    platforms: (game.platforms ?? []).map((p: any) => ({ plataforma: { name: p.name } })),
    companies,
    themes: (game.themes ?? []).map((t: any) => ({ theme: { name: t.name } })),
    playerPerspectives: (game.player_perspectives ?? []).map((p: any) => ({
      perspective: { name: p.name },
    })),
    gameModes: (game.game_modes ?? []).map((m: any) => ({ gameMode: { name: m.name } })),
    screenshots: (game.screenshots ?? []).map((ss: any) => ({
      url: `https:${ss.url.replace('t_thumb', 't_screenshot_huge')}`,
    })),
    artworks: (game.artworks ?? []).map((art: any) => ({
      url: `https:${art.url.replace('t_thumb', 't_1080p')}`,
    })),
    videos: (game.videos ?? []).map((v: any) => ({
      key: v.video_id,
      site: 'YouTube',
      type: 'Trailer',
      name: v.name,
      official: true,
    })),
    websites: (game.websites ?? [])
      .filter((w: any) => w?.url)
      .map((w: any) => ({ url: w.url, category: w.category ?? 0 })),
  };
}

function mergeJogoWebsites(
  live: { url: string; category: number }[] | undefined,
  db: { url: string; category: number }[] | undefined,
  steamAppId?: number | null,
): { url: string; category: number }[] {
  const byUrl = new Map<string, { url: string; category: number }>();

  for (const site of [...(live ?? []), ...(db ?? [])]) {
    if (!site?.url) continue;
    byUrl.set(site.url, { url: site.url, category: site.category ?? 0 });
  }

  if (steamAppId) {
    const steamUrl = `https://store.steampowered.com/app/${steamAppId}`;
    if (![...byUrl.keys()].some((url) => url.includes('steampowered.com'))) {
      byUrl.set(steamUrl, { url: steamUrl, category: 13 });
    }
  }

  return Array.from(byUrl.values());
}

export async function fetchFilmeDetailsLive(tmdbId: number) {
  try {
    const [movie, dbFilme, ptOverview] = await Promise.all([
      tmdb.movieInfo({
        id: tmdbId,
        language: 'pt-BR',
        append_to_response: 'credits,videos,watch/providers,release_dates',
      }),
      prisma.filme.findUnique({
        where: { tmdbId },
        select: {
          em_prevenda: true,
          ingresso_link: true,
          tem_sessoes: true,
          premiacoes: true,
          popularity: true,
          estreia_cinema: true,
          estreia_streaming: true,
        },
      }),
      fetchTmdbPtOverview('movie', tmdbId),
    ]);

    if (!movie?.id) return null;

    const details = mapTmdbMovieToDetails(movie, dbFilme ?? undefined);
    if (details.overview) {
      details.overview = (await resolvePortugueseSynopsis(details.overview, ptOverview)) ?? details.overview;
    }
    return {
      ...details,
      popularity: dbFilme?.popularity ?? details.popularity ?? null,
      premiacoes: parsePremiacoes(dbFilme?.premiacoes),
    };
  } catch (error: any) {
    if (error?.status === 404 || error?.response?.status === 404) return null;
    logger.error(`Erro ao buscar filme ${tmdbId} no TMDB: ${error}`);
    throw error;
  }
}

export async function fetchSerieDetailsLive(tmdbId: number) {
  try {
    const [serie, dbSerie] = await Promise.all([
      tmdb.tvInfo({
        id: tmdbId,
        language: 'pt-BR',
        append_to_response: 'credits,videos,watch/providers',
      }),
      prisma.serie.findUnique({
        where: { tmdbId },
        select: { premiacoes: true },
      }),
    ]);

    if (!serie?.id) return null;

    const mapped = await withPortugueseTranslation(mapSerieToMidia(mapTmdbSerieToPrismaLike(serie)));
    return {
      ...mapped,
      premiacoes: parsePremiacoes(dbSerie?.premiacoes),
    };
  } catch (error: any) {
    if (error?.status === 404 || error?.response?.status === 404) return null;
    logger.error(`Erro ao buscar série ${tmdbId} no TMDB: ${error}`);
    throw error;
  }
}

export async function fetchAnimeDetailsLive(anilistId: number) {
  try {
    const [response, dbAnime] = await Promise.all([
      anilistApi.post('', {
        query: ANIME_DETAIL_QUERY,
        variables: { id: anilistId },
      }),
      prisma.anime.findUnique({
        where: { anilistId },
        select: { premiacoes: true },
      }),
    ]);

    if (response.data.errors?.length) {
      logger.error(`Erro AniList para anime ${anilistId}: ${response.data.errors[0].message}`);
      return null;
    }

    const anime = response.data.data?.Media;
    if (!anime) return null;

    const mapped = await withPortugueseTranslation(mapAnimeToMidia(mapAnilistToPrismaLike(anime)));
    return {
      ...mapped,
      premiacoes: parsePremiacoes(dbAnime?.premiacoes),
    };
  } catch (error) {
    logger.error(`Erro ao buscar anime ${anilistId} no AniList: ${error}`);
    throw error;
  }
}

export async function fetchJogoDetailsLive(igdbId: number) {
  if (!Number.isInteger(igdbId) || igdbId <= 0) {
    return null;
  }

  try {
    const query = `
      fields name, summary, cover.url, first_release_date, rating, hypes, follows,
             genres.name, genres.id,
             involved_companies.company.name, involved_companies.company.id, involved_companies.developer, involved_companies.publisher,
             platforms.name, platforms.id,
             themes.name, themes.id,
             player_perspectives.name, player_perspectives.id,
             screenshots.url, screenshots.id,
             artworks.url, artworks.id,
             websites.url, websites.category, websites.id,
             videos.name, videos.video_id,
             game_modes.name, game_modes.id;
      where id = ${igdbId};
      limit 1;
    `;

    const [, dbJogo] = await Promise.all([
      getIgdbAccessToken(),
      prisma.jogo.findUnique({
        where: { igdbId },
        select: {
          summary: true,
          premiacoes: true,
          steamAppId: true,
          steamPlayerCount: true,
          steamPriceCents: true,
          steamDiscountPercent: true,
          pcRequirements: true,
          steamSyncedAt: true,
          hypes: true,
          follows: true,
          websites: { select: { url: true, category: true } },
        },
      }),
    ]);

    const response = await igdbApi.post('/games', query, {
      headers: { 'Accept-Language': 'pt-BR' },
    });

    const game = response.data?.[0];
    if (!game) return null;

    const baseMapped = mapJogoToMidia(mapIgdbToPrismaLike(game));
    let synopsisText = dbJogo?.summary?.trim() || baseMapped.sinopse;

    if (dbJogo?.steamAppId) {
      const steamDetails = await fetchSteamAppDetails(dbJogo.steamAppId);
      if (steamDetails?.shortDescription?.trim()) {
        if (!isLikelyEnglish(steamDetails.shortDescription)) {
          synopsisText = steamDetails.shortDescription;
        } else if (!synopsisText?.trim() || isLikelyEnglish(synopsisText)) {
          synopsisText = steamDetails.shortDescription;
        }
      }

      if (!dbJogo.pcRequirements && steamDetails?.pcRequirements) {
        dbJogo.pcRequirements = steamDetails.pcRequirements;
      }
    }

    const mappedForTranslation = { ...baseMapped, sinopse: synopsisText };
    const translated = await withPortugueseTranslation(mappedForTranslation);

    if (translated.sinopse && isLikelyEnglish(translated.sinopse)) {
      const forced = await translateSynopsisForStorage(translated.sinopse);
      if (forced?.trim() && !isLikelyEnglish(forced)) {
        translated.sinopse = forced;
      } else {
        const resolved = await resolvePortugueseSynopsis(translated.sinopse);
        if (resolved?.trim() && !isLikelyEnglish(resolved)) {
          translated.sinopse = resolved;
        }
      }
    }

    return {
      ...translated,
      websites: mergeJogoWebsites(
        translated.websites as { url: string; category: number }[] | undefined,
        dbJogo?.websites,
        dbJogo?.steamAppId,
      ),
      pc_requirements: dbJogo?.pcRequirements ?? translated.pc_requirements ?? null,
      steam_app_id: dbJogo?.steamAppId ?? translated.steam_app_id ?? null,
      steam_player_count: dbJogo?.steamPlayerCount ?? translated.steam_player_count ?? null,
      steam_price_cents: dbJogo?.steamPriceCents ?? translated.steam_price_cents ?? null,
      steam_discount_percent: dbJogo?.steamDiscountPercent ?? translated.steam_discount_percent ?? null,
      hypes: dbJogo?.hypes ?? game.hypes ?? null,
      follows: dbJogo?.follows ?? game.follows ?? null,
      premiacoes: parsePremiacoes(dbJogo?.premiacoes),
    };
  } catch (error) {
    logger.error(`Erro ao buscar jogo ${igdbId} no IGDB: ${error}`);
    throw error;
  }
}
