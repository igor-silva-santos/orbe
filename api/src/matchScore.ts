/**
 * Match de gosto entre títulos do mesmo tipo.
 *
 * Solo usa os gêneros da semente (um título, ou vários da base pessoal).
 * Dupla só sugere a partir do gênero que os dois títulos compartilham.
 * Jogo respeita o modo pedido: um título com os dois modos pode entrar em qualquer um.
 * Empate de pontuação desempata pela popularidade.
 */

export type MatchTipo = 'filme' | 'serie' | 'anime' | 'jogo';
export type MatchModo = 'solo' | 'dupla';
export type GamePlay = 'multiplayer' | 'single';

export type MatchTitle = {
  id: number;
  genres: string[];
  modes?: string[];
  popularity?: number | null;
};

export type MatchScoreReason = 'ok' | 'sem_semente' | 'sem_paralelo' | 'sem_afinidade';

export type MatchOutcomeReason =
  | MatchScoreReason
  | 'sem_base'
  | 'precisa_login'
  | 'titulo_ausente';

export type RankedMatch = {
  id: number;
  score: number;
  shared: string[];
};

export type MatchScoreResult = {
  reason: MatchScoreReason;
  items: RankedMatch[];
  bloqueadoPeloModo: boolean;
};

export const MATCH_RESULT_LIMIT = 8;

export const MULTIPLAYER_NAME_FRAGMENTS = [
  'multiplayer',
  'multijogador',
  'battle royale',
  'co-operative',
  'cooperative',
  'co-op',
  'cooperativo',
  'split screen',
  'tela dividida',
  'mmo',
];

export const SINGLE_NAME_FRAGMENTS = [
  'single player',
  'single-player',
  'singleplayer',
  'um jogador',
];

type GenreWeight = { weight: number; label: string };

export function normalizeMatchLabel(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function textHasFragment(text: string, fragments: readonly string[]): boolean {
  const haystack = text.toLowerCase();
  return fragments.some((fragment) => haystack.includes(fragment));
}

export function gameModeFlags(modes: string[]): { multi: boolean; single: boolean } {
  const text = modes.join(' | ');
  return {
    multi: textHasFragment(text, MULTIPLAYER_NAME_FRAGMENTS),
    single: textHasFragment(text, SINGLE_NAME_FRAGMENTS),
  };
}

export function gameMatchesPlay(modes: string[], play: GamePlay): boolean {
  const flags = gameModeFlags(modes);
  if (play === 'multiplayer') return flags.multi;
  return flags.single;
}

export function parseMatchIds(raw: unknown): number[] | null {
  if (raw == null || raw === '') return [];
  if (typeof raw !== 'string') return null;
  const parts = raw.split(',').map((part) => part.trim()).filter(Boolean);
  if (parts.length > 2) return null;
  const ids: number[] = [];
  for (const part of parts) {
    if (!/^\d+$/.test(part)) return null;
    const id = Number(part);
    if (!Number.isInteger(id) || id <= 0) return null;
    ids.push(id);
  }
  if (new Set(ids).size !== ids.length) return null;
  return ids;
}

function genreWeightMap(seeds: MatchTitle[]): Map<string, GenreWeight> {
  const map = new Map<string, GenreWeight>();
  for (const seed of seeds) {
    const seen = new Set<string>();
    for (const genre of seed.genres) {
      const key = normalizeMatchLabel(genre);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const current = map.get(key);
      if (current) current.weight += 1;
      else map.set(key, { weight: 1, label: genre.trim() });
    }
  }
  return map;
}

function intersectionWeights(left: MatchTitle, right: MatchTitle): Map<string, GenreWeight> {
  const weights = genreWeightMap([left]);
  const other = new Set(right.genres.map((genre) => normalizeMatchLabel(genre)).filter(Boolean));
  const shared = new Map<string, GenreWeight>();
  for (const [key, value] of weights) {
    if (other.has(key)) shared.set(key, { weight: 1, label: value.label });
  }
  return shared;
}

function scoreCandidate(
  candidate: MatchTitle,
  weights: Map<string, GenreWeight>,
): { score: number; shared: string[] } {
  let score = 0;
  const shared: string[] = [];
  const seen = new Set<string>();
  for (const genre of candidate.genres) {
    const key = normalizeMatchLabel(genre);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const weight = weights.get(key);
    if (!weight) continue;
    score += weight.weight;
    shared.push(weight.label);
  }
  return { score, shared };
}

export function computeMatch(input: {
  modo: MatchModo;
  seeds: MatchTitle[];
  candidates: MatchTitle[];
  gamePlay?: GamePlay | null;
  limit?: number;
}): MatchScoreResult {
  const empty = (reason: MatchScoreReason, bloqueadoPeloModo = false): MatchScoreResult => ({
    reason,
    items: [],
    bloqueadoPeloModo,
  });

  if (input.modo === 'dupla' && input.seeds.length !== 2) return empty('sem_semente');
  if (input.modo === 'solo' && input.seeds.length === 0) return empty('sem_semente');

  const weights = input.modo === 'dupla'
    ? intersectionWeights(input.seeds[0], input.seeds[1])
    : genreWeightMap(input.seeds);

  if (input.modo === 'dupla' && weights.size === 0) return empty('sem_paralelo');
  if (weights.size === 0) return empty('sem_afinidade');

  const seedIds = new Set(input.seeds.map((seed) => seed.id));
  let genreHits = 0;
  const ranked: Array<RankedMatch & { popularity: number }> = [];

  for (const candidate of input.candidates) {
    if (seedIds.has(candidate.id)) continue;
    const scored = scoreCandidate(candidate, weights);
    if (scored.score <= 0) continue;
    genreHits += 1;
    if (input.gamePlay && !gameMatchesPlay(candidate.modes ?? [], input.gamePlay)) continue;
    ranked.push({
      id: candidate.id,
      score: scored.score,
      shared: scored.shared,
      popularity: candidate.popularity ?? 0,
    });
  }

  if (ranked.length === 0) {
    return empty('sem_afinidade', genreHits > 0 && Boolean(input.gamePlay));
  }

  ranked.sort((a, b) => b.score - a.score || b.popularity - a.popularity || a.id - b.id);
  const limit = input.limit ?? MATCH_RESULT_LIMIT;
  return {
    reason: 'ok',
    bloqueadoPeloModo: false,
    items: ranked.slice(0, limit).map(({ id, score, shared }) => ({ id, score, shared })),
  };
}

const TIPO_LABEL: Record<MatchTipo, string> = {
  filme: 'filme',
  serie: 'série',
  anime: 'anime',
  jogo: 'jogo',
};

export function matchUserMessage(input: {
  reason: MatchOutcomeReason;
  tipo: MatchTipo;
  gamePlay?: GamePlay | null;
  bloqueadoPeloModo?: boolean;
}): string {
  const label = TIPO_LABEL[input.tipo];
  if (input.reason === 'ok') {
    return `Sugestões de ${label} com gênero em comum.`;
  }
  if (input.reason === 'sem_base') {
    return `Você ainda não marcou nenhum ${label} como favorito ou como gostei. Escolha um título para ver um match.`;
  }
  if (input.reason === 'precisa_login') {
    return 'Entre na sua conta para usar os títulos que você marcou como favorito ou gostei. Ou escolha um título agora.';
  }
  if (input.reason === 'sem_paralelo') {
    return 'Esses dois títulos não compartilham gênero. O match precisa de um gênero em comum.';
  }
  if (input.reason === 'titulo_ausente') {
    return 'Não encontrei um dos títulos escolhidos no catálogo.';
  }
  if (input.reason === 'sem_semente') {
    return 'Escolha um título para calcular o match.';
  }
  if (input.bloqueadoPeloModo && input.gamePlay === 'multiplayer') {
    return 'Nenhum jogo com esse gosto está como multijogador. Jogo só de um jogador fica de fora. Jogo com os dois modos pode aparecer.';
  }
  if (input.bloqueadoPeloModo && input.gamePlay === 'single') {
    return 'Nenhum jogo com esse gosto está como um jogador. Jogo só multijogador fica de fora. Jogo com os dois modos pode aparecer.';
  }
  return `Nenhum ${label} do catálogo compartilha gênero com essa escolha.`;
}
