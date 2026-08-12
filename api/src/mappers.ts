import { translateTmdbStatus } from './statusLabels';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_CAROUSEL_POSTER_URL = 'https://image.tmdb.org/t/p/w342';
const IGDB_IMAGE_BASE_URL = 'https://images.igdb.com/igdb/image/upload';

const gameGenreTranslations: Record<string, string> = {
  "Action": "Ação",
  "Adventure": "Aventura",
  "RPG": "RPG",
  "Role-playing (RPG)": "RPG",
  "Strategy": "Estratégia",
  "Simulation": "Simulação",
  "Simulator": "Simulação",
  "Sports": "Esportes",
  "Racing": "Corrida",
  "Fighting": "Luta",
  "Platformer": "Plataforma",
  "Puzzle": "Quebra-Cabeça",
  "Shooter": "Tiro",
  "Horror": "Terror",
  "Stealth": "Furtividade",
  "Survival": "Sobrevivência",
  "Open World": "Mundo Aberto",
  "Sandbox": "Sandbox",
  "MMORPG": "MMORPG",
  "MOBA": "MOBA",
  "Card & Board Game": "Cartas e Tabuleiro",
  "Family": "Família",
  "Comedy": "Comédia",
  "Drama": "Drama",
  "Sci-fi": "Ficção Científica",
  "Fantasy": "Fantasia",
  "Mystery": "Mistério",
  "Thriller": "Suspense",
  "Indie": "Indie",
  "Arcade": "Arcade",
  "Visual Novel": "Visual Novel",
  "Point-and-click": "Point-and-click",
  "Turn-based strategy (TBS)": "Estratégia por Turnos",
  "Real-time strategy (RTS)": "Estratégia em Tempo Real",
  "Hack and slash/Beat 'em up": "Hack and slash",
  "Tactical": "Tático",
};

const gameModeTranslations: Record<string, string> = {
  "Single player": "Um jogador",
  "Multiplayer": "Multijogador",
  "Co-operative": "Cooperativo",
  "Split screen": "Tela dividida",
  "Massively Multiplayer Online (MMO)": "MMO",
  "Battle Royale": "Battle Royale",
  "Local co-op": "Cooperativo local",
  "Online co-op": "Cooperativo online",
};

const translateGameMode = (mode: string) => gameModeTranslations[mode] || mode;

const gameThemeTranslations: Record<string, string> = {
  "Action": "Ação",
  "Adventure": "Aventura",
  "Fantasy": "Fantasia",
  "Science fiction": "Ficção Científica",
  "Horror": "Terror",
  "Mystery": "Mistério",
  "Thriller": "Suspense",
  "Comedy": "Comédia",
  "Drama": "Drama",
  "Romance": "Romance",
  "Stealth": "Furtividade",
  "Survival": "Sobrevivência",
  "Warfare": "Guerra",
  "Historical": "Histórico",
  "Open world": "Mundo Aberto",
  "Non-fiction": "Não-ficção",
  "Sandbox": "Sandbox",
  "Kids": "Infantil",
  "Party": "Festa",
  "4X (explore, expand, exploit, and exterminate)": "4X",
};

const animeStatusTranslations: Record<string, string> = {
  FINISHED: 'Finalizado',
  RELEASING: 'Em exibição',
  NOT_YET_RELEASED: 'Não lançado',
  CANCELLED: 'Cancelado',
  HIATUS: 'Em hiato',
};

const animeGenreTranslations: Record<string, string> = {
  Action: 'Ação',
  Adventure: 'Aventura',
  Comedy: 'Comédia',
  Drama: 'Drama',
  Ecchi: 'Ecchi',
  Fantasy: 'Fantasia',
  Horror: 'Terror',
  'Mahou Shoujo': 'Garota Mágica',
  Mecha: 'Mecha',
  Music: 'Música',
  Mystery: 'Mistério',
  Psychological: 'Psicológico',
  Romance: 'Romance',
  'Sci-Fi': 'Ficção Científica',
  'Slice of Life': 'Cotidiano',
  Sports: 'Esportes',
  Supernatural: 'Sobrenatural',
  Thriller: 'Suspense',
  Suspense: 'Suspense',
};

const translateAnimeGenre = (genre: string) => animeGenreTranslations[genre] || genre;
const translateGameGenre = (genre: string) => gameGenreTranslations[genre] || genre;
const translateGameTheme = (theme: string) => gameThemeTranslations[theme] || translateGameGenre(theme);
const translateAnimeStatus = (status: string | null | undefined) =>
  status ? (animeStatusTranslations[status] || status.replace(/_/g, ' ')) : null;

const resolveIgdbImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/api/images/igdb')) {
    return `${IGDB_IMAGE_BASE_URL}${url.replace('/api/images/igdb', '')}`;
  }
  if (url.startsWith('//')) return `https:${url}`;
  return url;
};

const extractYoutubeKey = (url: string | null | undefined): string | null => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

const findTrailerKey = (videos: any[] | undefined): string | null => {
  if (!videos?.length) return null;
  const trailer = videos.find((v) =>
    v.site === 'YouTube' && (v.type === 'Trailer' || v.name?.toLowerCase().includes('trailer'))
  ) || videos.find((v) => v.site === 'YouTube');
  return trailer?.key || null;
};

const mapVoiceActors = (voiceActors: any[] | undefined) => {
  const jp = voiceActors?.find((va) =>
    va.dublador?.language?.toUpperCase().includes('JAPANESE')
  )?.dublador;
  const pt = voiceActors?.find((va) =>
    va.dublador?.language?.toUpperCase().includes('PORTUGUESE')
  )?.dublador;

  return {
    jp: jp ? { id: jp.anilistId, nome: jp.name, foto_url: jp.image } : null,
    pt: pt ? { id: pt.anilistId, nome: pt.name, foto_url: pt.image } : null,
  };
};

const dedupeStreamingLinks = (links: { nome?: string; url?: string }[]) => {
  const seen = new Set<string>();
  return links
    .filter((link) => {
      const displayName = inferStreamingNameFromLink(link.nome, link.url) ?? link.nome?.trim();
      if (!displayName) return false;
      const key = displayName.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((link) => ({
      nome: inferStreamingNameFromLink(link.nome, link.url) ?? link.nome!.trim(),
      url: link.url,
    }));
};

const STREAMING_SITE_HINTS = [
  'crunchyroll',
  'netflix',
  'disney',
  'prime',
  'amazon',
  'hbo',
  'max.com',
  'apple tv',
  'globoplay',
  'globo play',
  'claro',
  'star+',
  'star plus',
  'hidive',
  'funimation',
  'paramount',
  'peacock',
];

const NON_STREAMING_SITE_HINTS = [
  'youtube',
  'twitter',
  'x.com',
  'facebook',
  'instagram',
  'tiktok',
  'wikipedia',
  'myanimelist',
  'anilist.co',
  '/anime/',
  'bangumi',
  'official',
  'syoboi',
  'livechart',
  'anidb',
  'wiki',
];

const inferStreamingNameFromLink = (site?: string | null, url?: string | null): string | null => {
  const text = `${site ?? ''} ${url ?? ''}`.toLowerCase();
  if (!text.trim()) return null;

  if (text.includes('crunchyroll')) return 'Crunchyroll';
  if (text.includes('netflix')) return 'Netflix';
  if (text.includes('disneyplus') || text.includes('disney.com')) return 'Disney+';
  if (text.includes('primevideo') || text.includes('amazon.')) return 'Prime Video';
  if (text.includes('hbomax') || text.includes('max.com')) return 'Max';
  if (text.includes('tv.apple') || text.includes('apple.com/tv')) return 'Apple TV+';
  if (text.includes('globoplay')) return 'Globoplay';
  if (text.includes('claro')) return 'Claro TV+';
  if (text.includes('starplus') || text.includes('star-plus')) return 'Star+';
  if (text.includes('hidive')) return 'HIDIVE';
  if (text.includes('funimation')) return 'Funimation';

  return null;
};

const isLikelyStreamingLink = (site?: string | null, url?: string | null): boolean => {
  const text = `${site ?? ''} ${url ?? ''}`.toLowerCase();
  if (!text.trim()) return false;
  if (NON_STREAMING_SITE_HINTS.some((hint) => text.includes(hint))) return false;
  if (inferStreamingNameFromLink(site, url)) return true;
  return STREAMING_SITE_HINTS.some((hint) => text.includes(hint));
};

const collectAnimeStreamingPlatforms = (anime: {
  streamingLinks?: { site?: string; url?: string }[];
  externalLinks?: { site?: string; url?: string }[];
}) => {
  const fromStreaming = (anime.streamingLinks ?? []).map((link) => ({
    nome: link.site,
    url: link.url,
  }));
  const fromExternal = (anime.externalLinks ?? [])
    .filter((link) => isLikelyStreamingLink(link.site, link.url))
    .map((link) => ({ nome: link.site, url: link.url }));

  return dedupeStreamingLinks([...fromStreaming, ...fromExternal]);
};

const getCrewMember = (crew: any[], job: string) => {
  const member = crew?.find((c: any) => c.job === job);
  return member ? member.pessoa.name : null;
};

const formatDuration = (minutes: number | null) => {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const mapStreamingProviders = (providers: any[] | undefined) =>
  providers?.map((p: any) => ({
    provider: { name: p.provider.name, logoPath: p.provider.logoPath },
    url: p.url,
  })) ?? [];

export type PremiacaoEntry = {
  nome: string;
  ano: number;
  categoria: string;
  status: 'vencedor' | 'indicado';
};

export const parsePremiacoes = (raw: unknown): PremiacaoEntry[] => {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => item !== null && typeof item === 'object')
    .map((item) => ({
      nome: String(item.nome ?? ''),
      ano: Number(item.ano ?? 0),
      categoria: String(item.categoria ?? ''),
      status: (item.status === 'vencedor' ? 'vencedor' : 'indicado') as PremiacaoEntry['status'],
    }))
    .filter((entry) => entry.nome && entry.ano > 0);
};

export const matchesPremiacaoFilters = (
  premiacoes: unknown,
  awardName?: string,
  year?: number
): boolean => {
  const awards = parsePremiacoes(premiacoes);
  if (awards.length === 0) return false;
  return awards.some((award) => {
    if (awardName && !award.nome.toLowerCase().includes(awardName.toLowerCase())) return false;
    if (year !== undefined && !Number.isNaN(year) && award.ano !== year) return false;
    return true;
  });
};

export const mapFilmeToMidia = (filme: any) => {
  return {
    type: 'filme',
    id: filme.tmdbId,
    avaliacao: filme.voteAverage ? filme.voteAverage * 10 : null,
    titulo_api: filme.title,
    titulo_original: filme.originalTitle,
    sinopse: filme.overview,
    poster_url_api: filme.posterPath ? `${TMDB_IMAGE_BASE_URL}${filme.posterPath}` : null,
    data_lancamento_api: filme.releaseDate,
    duracao: formatDuration(filme.runtime),
    diretor: getCrewMember(filme.crew, 'Director'),
    escritor: getCrewMember(filme.crew, 'Writer'),
    generos_api: filme.genres?.map((g: any) => g.genero.name) ?? [],
    plataformas_api: filme.streamingProviders?.map((p: any) => ({
      nome: p.provider.name,
      url: p.url,
      logo_path: p.provider.logoPath,
    })) ?? [],
    streamingProviders: mapStreamingProviders(filme.streamingProviders),
    elenco: filme.cast?.map((c: any) => ({
      id: c.pessoa.tmdbId,
      nome: c.pessoa.name,
      personagem: c.character,
      foto_url: c.pessoa.profilePath ? `${TMDB_IMAGE_BASE_URL}${c.pessoa.profilePath}` : null,
    })) ?? [],
    videos: filme.videos?.map((v: any) => ({ key: v.key, site: v.site, type: v.type, nome: v.name, official: v.official })) ?? [],
    homepage: filme.homepage,
    trailer_key: findTrailerKey(filme.videos),
    em_prevenda: filme.em_prevenda,
    ingresso_link: filme.ingresso_link,
    tem_sessoes: filme.tem_sessoes ?? false,
    status: filme.status,
    status_label: translateTmdbStatus(filme.status),
    budget: filme.budget ? filme.budget.toString() : null,
    revenue: filme.revenue ? filme.revenue.toString() : null,
    premiacoes: parsePremiacoes(filme.premiacoes),
  };
};

export const mapSerieToMidia = (serie: any) => {
  return {
    type: 'serie',
    id: serie.tmdbId,
    avaliacao: serie.voteAverage ? serie.voteAverage * 10 : null,
    titulo_api: serie.name,
    titulo_original: serie.originalName,
    sinopse: serie.overview,
    poster_url_api: serie.posterPath ? `${TMDB_IMAGE_BASE_URL}${serie.posterPath}` : null,
    data_lancamento_api: serie.firstAirDate,
    numero_temporadas: serie.numberOfSeasons,
    numero_episodios: serie.numberOfEpisodes,
    status: serie.status,
    status_label: translateTmdbStatus(serie.status),
    generos_api: serie.genres?.map((g: any) => g.genero.name) ?? [],
    plataformas_api: serie.streamingProviders?.map((p: any) => ({
      nome: p.provider.name,
      url: p.url,
      logo_path: p.provider.logoPath,
    })) ?? [],
    streamingProviders: mapStreamingProviders(serie.streamingProviders),
    criadores: serie.createdBy?.map((c: any) => ({
      id: c.pessoa.tmdbId,
      nome: c.pessoa.name,
      foto_url: c.pessoa.profilePath ? `${TMDB_IMAGE_BASE_URL}${c.pessoa.profilePath}` : null,
    })) ?? [],
    elenco: serie.cast?.map((c: any) => ({
      id: c.pessoa.tmdbId,
      nome: c.pessoa.name,
      personagem: c.character,
      foto_url: c.pessoa.profilePath ? `${TMDB_IMAGE_BASE_URL}${c.pessoa.profilePath}` : null,
    })) ?? [],
    videos: serie.videos?.map((v: any) => ({ key: v.key, site: v.site, type: v.type, nome: v.name, official: v.official })) ?? [],
    trailer_key: findTrailerKey(serie.videos),
    temporadas: serie.seasons?.map((s: any) => ({
      numero: s.seasonNumber,
      episodios: s.episodeCount,
      nome: s.name,
      poster_url: s.posterPath ? `${TMDB_IMAGE_BASE_URL}${s.posterPath}` : null,
    })) ?? [],
    premiacoes: parsePremiacoes(serie.premiacoes),
  };
};

export const mapAnimeToMidia = (anime: any) => {
  // `dublagemPtBr` é o campo persistido no sync (funciona mesmo quando a query não incluiu
  // a relação `characters`, como nas rotas de listagem); cai pro cálculo ao vivo só quando
  // o objeto veio direto da AniList sem passar pelo banco (fetch de detalhe on-demand).
  const hasPtBrDub = anime.dublagemPtBr ?? anime.characters?.some((c: any) =>
    c.voiceActors?.some((va: any) =>
      va.dublador?.language?.toUpperCase().includes('PORTUGUESE')
    )
  );

  const nextAiringEpisode = anime.airingSchedule
    ?.filter((schedule: any) => new Date(schedule.airingAt) > new Date())
    .sort((a: any, b: any) => a.episode - b.episode)[0];

  const director = anime.staff?.find((s: any) =>
    s.role?.toLowerCase().includes('director')
  );

  const streamingFromLinks = collectAnimeStreamingPlatforms(anime);

  const trailerFromTrailerField = anime.externalLinks
    ?.find((l: any) => l.site === 'YouTube' && l.url?.includes('youtube'))
    ?.url;

  const trailerFromExternal = trailerFromTrailerField
    ? extractYoutubeKey(trailerFromTrailerField)
    : anime.externalLinks?.map((l: any) => extractYoutubeKey(l.url)).find(Boolean);

  const trailerFromStreaming = anime.streamingLinks
    ?.map((l: any) => extractYoutubeKey(l.url))
    .find(Boolean);

  return {
    type: 'anime',
    id: anime.anilistId,
    avaliacao: anime.averageScore,
    titulo_api: anime.titleRomaji,
    titulo_ingles: anime.titleEnglish,
    titleRomaji: anime.titleRomaji,
    titleEnglish: anime.titleEnglish,
    titleNative: anime.titleNative,
    sinopse: anime.description,
    poster_url_api: anime.coverImage,
    data_lancamento_api: anime.startDate,
    startDate: anime.startDate ? {
      year: new Date(anime.startDate).getFullYear(),
      month: new Date(anime.startDate).getMonth() + 1,
      day: new Date(anime.startDate).getDate(),
    } : null,
    numero_episodios: anime.episodes,
    numero_temporadas: anime.seasonYear ? 1 : null,
    season: anime.season,
    seasonYear: anime.seasonYear,
    status: translateAnimeStatus(anime.status),
    status_raw: anime.status,
    estudio: anime.studios?.map((s: any) => s.studio.name).join(', ') || null,
    fonte: anime.source,
    dublagem_info: hasPtBrDub,
    diretor: director?.staff?.name || null,
    mal_link: anime.malId ? `https://myanimelist.net/anime/${anime.malId}` : null,
    anilist_link: anime.siteUrl || `https://anilist.co/anime/${anime.anilistId}`,
    trailer_key: trailerFromExternal || trailerFromStreaming || null,
    generos_api: anime.genres?.map((g: any) => translateAnimeGenre(g.genero.name)) ?? [],
    tags_api: anime.tags?.map((t: any) => t.tag.name) ?? [],
    rankings: anime.ranks?.map((r: any) => ({
      type: r.type,
      rank: r.rank,
      year: r.year,
      context: r.context,
      allTime: r.allTime,
    })) ?? [],
    plataformas_api: streamingFromLinks,
    proximo_episodio: nextAiringEpisode
      ? new Date(nextAiringEpisode.airingAt).toISOString()
      : null,
    numero_episodio_atual: nextAiringEpisode ? nextAiringEpisode.episode : null,
    nextAiringEpisode: nextAiringEpisode
      ? { airingAt: new Date(nextAiringEpisode.airingAt).toISOString(), episode: nextAiringEpisode.episode }
      : null,
    personagens: anime.characters?.map((c: any) => ({
      id: c.character.anilistId,
      nome: c.character.name,
      foto_url: c.character.image,
      dubladores: mapVoiceActors(c.voiceActors),
    })) ?? [],
    staff: anime.staff?.map((s: any) => ({
      id: s.staff.anilistId,
      nome: s.staff.name,
      funcao: s.role,
      foto_url: s.staff.image,
    })) ?? [],
    relations: [
      ...(anime.sourceRelations?.map((rel: any) => ({
        relationType: rel.relationType || rel.type,
        node: { id: rel.relatedAnime.anilistId, title: { romaji: rel.relatedAnime.titleRomaji } },
      })) ?? []),
      ...(anime.relatedRelations?.map((rel: any) => ({
        relationType: rel.relationType || rel.type,
        node: { id: rel.sourceAnime.anilistId, title: { romaji: rel.sourceAnime.titleRomaji } },
      })) ?? []),
    ],
    airingSchedule: anime.airingSchedule,
    format: anime.format,
    isAdult: anime.isAdult,
    premiacoes: parsePremiacoes(anime.premiacoes),
  };
};

export const mapJogoToMidia = (jogo: any) => {
  return {
    type: 'jogo',
    id: jogo.igdbId,
    titulo_api: jogo.name,
    sinopse: jogo.summary,
    poster_url_api: resolveIgdbImageUrl(jogo.cover),
    data_lancamento_api: jogo.firstReleaseDate,
    avaliacao: jogo.rating,
    trailer_key: findTrailerKey(jogo.videos),
    generos_api: jogo.genres?.map((g: any) => translateGameGenre(g.genero.name)) ?? [],
    plataformas_api: jogo.platforms?.map((p: any) => ({ nome: p.plataforma.name })) ?? [],
    desenvolvedores: jogo.companies?.filter((c: any) => c.role === 'developer').map((c: any) => c.company.name) ?? [],
    publicadoras: jogo.companies?.filter((c: any) => c.role === 'publisher').map((c: any) => c.company.name) ?? [],
    temas: jogo.themes?.map((t: any) => translateGameTheme(t.theme.name)) ?? [],
    modos_jogo: jogo.gameModes?.map((m: any) => translateGameMode(m.gameMode.name)) ?? [],
    perspectivas: jogo.playerPerspectives?.map((p: any) => p.perspective.name) ?? [],
    screenshots: jogo.screenshots?.map((s: any) => resolveIgdbImageUrl(s.url)) ?? [],
    artworks: jogo.artworks?.map((a: any) => resolveIgdbImageUrl(a.url)) ?? [],
    videos: jogo.videos?.map((v: any) => ({ key: v.key, site: v.site, type: v.type, nome: v.name, official: v.official })) ?? [],
    websites: jogo.websites?.map((w: any) => ({ category: w.category, url: w.url })) ?? [],
    steam_app_id: jogo.steamAppId ?? null,
    steam_player_count: jogo.steamPlayerCount ?? null,
    steam_price_cents: jogo.steamPriceCents ?? null,
    steam_discount_percent: jogo.steamDiscountPercent ?? null,
    pc_requirements: jogo.pcRequirements ?? null,
    premiacoes: parsePremiacoes(jogo.premiacoes),
  };
};

export const mapEventToResponse = (event: any) => ({
  id: event.igdbId,
  igdbId: event.igdbId,
  nome: event.name,
  descricao: event.description ?? null,
  data_inicio: event.start_time?.toISOString?.() ?? event.start_time ?? null,
  data_fim: event.end_time?.toISOString?.() ?? event.end_time ?? null,
  url: event.url ?? null,
  total_jogos: event.games?.length ?? event._count?.games ?? 0,
  jogos: (event.games ?? []).map(mapJogoToMidia),
});

/** Payload mínimo para cards de carrossel — sem elenco, vídeos ou sinopse */
export const mapFilmeToCarouselCard = (filme: any) => ({
  type: 'filme' as const,
  id: filme.tmdbId,
  titulo_api: filme.title,
  titulo_curado: filme.titulo_curado ?? null,
  poster_url_api: filme.posterPath ? `${TMDB_CAROUSEL_POSTER_URL}${filme.posterPath}` : null,
  data_lancamento_api: filme.releaseDate,
  avaliacao: filme.voteAverage ? filme.voteAverage * 10 : null,
  generos_api: filme.genres?.map((g: any) => g.genero.name).slice(0, 3) ?? [],
  plataformas_api: (filme.streamingProviders ?? []).slice(0, 4).map((p: any) => ({
    nome: p.provider.name,
    url: p.url,
    logo_path: p.provider.logoPath ?? null,
  })),
  em_prevenda: filme.em_prevenda ?? false,
  // Disponibilidade — usada pelo carrossel de lançamentos pra filtrar por padrão
  // filmes sem sessão de cinema nem streamer (ver filtro "mostrar todos" no front).
  em_cartaz: filme.emCartaz ?? false,
  tem_sessoes: filme.tem_sessoes ?? false,
});

export const mapSerieToCarouselCard = (serie: any) => ({
  type: 'serie' as const,
  id: serie.tmdbId,
  titulo_api: serie.name,
  titulo_curado: serie.titulo_curado ?? null,
  poster_url_api: serie.posterPath ? `${TMDB_CAROUSEL_POSTER_URL}${serie.posterPath}` : null,
  data_lancamento_api: serie.firstAirDate,
  avaliacao: serie.voteAverage ? serie.voteAverage * 10 : null,
  generos_api: serie.genres?.map((g: any) => g.genero.name).slice(0, 3) ?? [],
  plataformas_api: (serie.streamingProviders ?? []).slice(0, 4).map((p: any) => ({
    nome: p.provider.name,
    url: p.url,
    logo_path: p.provider.logoPath ?? null,
  })),
});

export const mapJogoToCarouselCard = (jogo: any) => ({
  type: 'jogo' as const,
  id: jogo.igdbId,
  titulo_api: jogo.name,
  titulo_curado: jogo.titulo_curado ?? null,
  poster_url_api: resolveIgdbImageUrl(jogo.cover),
  data_lancamento_api: jogo.firstReleaseDate,
  avaliacao: jogo.rating,
  generos_api: jogo.genres?.map((g: any) => translateGameGenre(g.genero.name)).slice(0, 3) ?? [],
  plataformas_api: (jogo.platforms ?? []).slice(0, 4).map((p: any) => ({ nome: p.plataforma.name })),
  steam_app_id: jogo.steamAppId ?? null,
  steam_price_cents: jogo.steamPriceCents ?? null,
  steam_discount_percent: jogo.steamDiscountPercent ?? null,
});

export const mapAnimeToCarouselCard = (anime: any) => {
  const nextAiring = anime.airingSchedule
    ?.filter((s: any) => new Date(s.airingAt) > new Date())
    .sort((a: any, b: any) => new Date(a.airingAt).getTime() - new Date(b.airingAt).getTime())[0];

  const streamingFromLinks = collectAnimeStreamingPlatforms(anime);

  return {
    type: 'anime' as const,
    id: anime.anilistId,
    titulo_api: anime.titleRomaji,
    titulo_curado: anime.titulo_curado ?? null,
    titleRomaji: anime.titleRomaji,
    titleEnglish: anime.titleEnglish,
    poster_url_api: anime.coverImage,
    data_lancamento_api: anime.startDate,
    startDate: anime.startDate ? {
      year: new Date(anime.startDate).getFullYear(),
      month: new Date(anime.startDate).getMonth() + 1,
      day: new Date(anime.startDate).getDate(),
    } : null,
    avaliacao: anime.averageScore,
    generos_api: anime.genres?.map((g: any) => translateAnimeGenre(g.genero.name)).slice(0, 3) ?? [],
    plataformas_api: streamingFromLinks.slice(0, 4),
    format: anime.format,
    isAdult: anime.isAdult,
    dublagem_info: anime.dublagemPtBr ?? false,
    nextAiringEpisode: nextAiring
      ? { airingAt: new Date(nextAiring.airingAt).toISOString(), episode: nextAiring.episode }
      : null,
    numero_episodio_atual: nextAiring?.episode ?? null,
  };
};

/** Remove acentos para busca insensível a diacríticos */
export const normalizeSearchText = (text: string): string =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export async function withPortugueseTranslation(mapped: Record<string, any>) {
  const { resolvePortugueseSynopsis } = await import('./translation');
  const { fetchTmdbPtOverview } = await import('./tmdbOverview');
  const result = { ...mapped };

  let tmdbPt: string | null = null;
  if (mapped.type === 'filme' && mapped.id) {
    tmdbPt = await fetchTmdbPtOverview('movie', mapped.id);
  } else if (mapped.type === 'serie' && mapped.id) {
    tmdbPt = await fetchTmdbPtOverview('tv', mapped.id);
  }

  if (typeof result.sinopse === 'string') {
    const translated = await resolvePortugueseSynopsis(result.sinopse, tmdbPt);
    if (translated && !translated.match(/MYMEMORY\s+WARNING/i)) {
      result.sinopse = translated;
    }
  }
  if (typeof result.overview === 'string') {
    const translated = await resolvePortugueseSynopsis(result.overview, tmdbPt);
    if (translated && !translated.match(/MYMEMORY\s+WARNING/i)) {
      result.overview = translated;
    }
  }
  if (Array.isArray(result.temas)) {
    const { translateToPortuguese, isTranslationError } = await import('./translation');
    result.temas = await Promise.all(
      result.temas.map(async (theme: string) => {
        const translated = await translateToPortuguese(theme);
        if (translated && !isTranslationError(translated)) return translated;
        return theme;
      })
    );
  }

  return result;
}
