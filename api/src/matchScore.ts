/**
 * Match pelo que o título é: Dice ponderado pela raridade.
 *
 * Dice(A, B) = 2 × (soma da raridade dos atributos em comum)
 *            / (soma da raridade de A + soma da raridade de B)
 * Raridade = log(N / df). Parte vazia sai da conta. Dupla usa o mínimo.
 * Popularidade e gosto de outras pessoas não entram na nota nem na ordem.
 */

export type MatchTipo = 'filme' | 'serie' | 'anime' | 'jogo';
export type MatchModo = 'solo' | 'dupla';
export type GamePlay = 'multiplayer' | 'single';

export type MatchPart =
  | 'generos'
  | 'tags'
  | 'diretor'
  | 'criador'
  | 'elenco'
  | 'decada'
  | 'estudio'
  | 'temas'
  | 'perspectiva'
  | 'desenvolvedora';

export type MatchAttr = {
  key: string;
  label: string;
  ref?: string;
};

export type MatchProfile = {
  id: number;
  attrs: Partial<Record<MatchPart, MatchAttr[]>>;
  modes?: string[];
  adult?: boolean;
  collectionId?: number | null;
  seedWeight?: number;
  relatedIds?: number[];
  formato?: string | null;
  /** Presente só para o teste provar que a nota não lê este campo. */
  popularity?: number | null;
  /** Presente só para o teste provar que a nota não lê gosto de outras pessoas. */
  others?: number | null;
};

export type RarityIndex = {
  n: number;
  df: Record<string, number>;
};

export type MatchScoreReason = 'ok' | 'sem_semente' | 'sem_paralelo' | 'sem_afinidade' | 'sem_ficha';

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
  paralelo: string[];
};

export type GateAttr = {
  part: MatchPart;
  key: string;
  label: string;
  ref?: string;
};

export const GENERIC_DF_RATIO = 0.35;
export const MATCH_RESULT_LIMIT = 5;
export const FORMAT_BONUS = 0.05;
export const CAST_LIMIT = 5;

export const PART_WEIGHTS: Record<MatchTipo, Partial<Record<MatchPart, number>>> = {
  filme: { generos: 0.5, diretor: 0.25, elenco: 0.15, decada: 0.1 },
  serie: { generos: 0.5, criador: 0.25, elenco: 0.15, decada: 0.1 },
  anime: { tags: 0.55, generos: 0.25, estudio: 0.2 },
  jogo: { generos: 0.45, temas: 0.35, perspectiva: 0.1, desenvolvedora: 0.1 },
};

export const SINGLE_MODE_NAMES = ['Single player'];

export const MULTI_MODE_NAMES = [
  'Multiplayer',
  'Co-operative',
  'Split screen',
  'Massively Multiplayer Online (MMO)',
  'Battle Royale',
];

const CONTENT_PARTS: Record<MatchTipo, MatchPart[]> = {
  filme: ['generos'],
  serie: ['generos'],
  anime: ['tags', 'generos'],
  jogo: ['generos', 'temas'],
};

const FALLBACK_PARTS: Record<MatchTipo, MatchPart[]> = {
  filme: ['diretor'],
  serie: ['criador'],
  anime: ['estudio'],
  jogo: ['desenvolvedora'],
};

export function normalizeMatchLabel(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function rarityMapKey(part: MatchPart, attrKey: string): string {
  return `${part}:${normalizeMatchLabel(attrKey)}`;
}

export function attributeRarity(n: number, df: number): number {
  if (!(n > 0) || !(df > 0) || df >= n) return 0;
  return Math.log(n / df);
}

export function isTooGeneric(n: number, df: number): boolean {
  if (!(n > 0) || !(df > 0)) return false;
  return df / n > GENERIC_DF_RATIO;
}

export function dfOf(rarity: RarityIndex, part: MatchPart, key: string): number {
  const known = rarity.df[rarityMapKey(part, key)];
  return known != null && known > 0 ? known : 1;
}

export function gameMatchesPlay(modes: string[], play: GamePlay): boolean {
  const present = new Set(modes.map((mode) => mode.trim().toLowerCase()));
  const allowed = (play === 'single' ? SINGLE_MODE_NAMES : MULTI_MODE_NAMES)
    .map((name) => name.toLowerCase());
  return allowed.some((name) => present.has(name));
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

/** gostei = 1, favorito ou amei = 2, os dois juntos continuam 2. nao_gostei e oculto não são semente. */
export function seedWeightFromPreference(
  status: string | null | undefined,
  avaliacao: string | null | undefined,
): number | null {
  if (status === 'oculto' || avaliacao === 'nao_gostei') return null;
  const favorito = status === 'favorito';
  const gostei = avaliacao === 'gostei';
  const amei = avaliacao === 'amei';
  if (!favorito && !gostei && !amei) return null;
  if (favorito || amei) return 2;
  return 1;
}

function uniqueAttrs(attrs: MatchAttr[], limit?: number): MatchAttr[] {
  const seen = new Set<string>();
  const out: MatchAttr[] = [];
  for (const attr of attrs) {
    const key = normalizeMatchLabel(attr.key);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push({ ...attr, key });
    if (limit && out.length >= limit) break;
  }
  return out;
}

function partList(profile: MatchProfile, part: MatchPart): MatchAttr[] {
  const raw = profile.attrs[part] ?? [];
  return uniqueAttrs(raw, part === 'elenco' ? CAST_LIMIT : undefined);
}

export function weightedDice(
  left: MatchAttr[],
  right: MatchAttr[],
  rarityOf: (attr: MatchAttr) => number,
): number | null {
  const a = uniqueAttrs(left);
  const b = uniqueAttrs(right);
  if (a.length === 0 || b.length === 0) return null;
  const rightKeys = new Set(b.map((attr) => attr.key));
  let sumA = 0;
  let sumInter = 0;
  for (const attr of a) {
    const rarity = rarityOf(attr);
    sumA += rarity;
    if (rightKeys.has(attr.key)) sumInter += rarity;
  }
  let sumB = 0;
  for (const attr of b) sumB += rarityOf(attr);
  const denom = sumA + sumB;
  if (denom <= 0) return 0;
  return (2 * sumInter) / denom;
}

type SharedHit = { part: MatchPart; key: string; label: string };

function diceSimilarity(
  tipo: MatchTipo,
  left: MatchProfile,
  right: MatchProfile,
  rarity: RarityIndex,
): { score: number; shared: SharedHit[] } {
  const weights = PART_WEIGHTS[tipo];
  const active: { weight: number; dice: number; shared: SharedHit[] }[] = [];

  for (const part of Object.keys(weights) as MatchPart[]) {
    const a = partList(left, part);
    const b = partList(right, part);
    const dice = weightedDice(a, b, (attr) => attributeRarity(rarity.n, dfOf(rarity, part, attr.key)));
    if (dice === null) continue;
    const rightKeys = new Set(b.map((attr) => attr.key));
    const shared = a
      .filter((attr) => rightKeys.has(attr.key))
      .map((attr) => ({ part, key: attr.key, label: attr.label }));
    active.push({ weight: weights[part] ?? 0, dice, shared });
  }

  if (active.length === 0) return { score: 0, shared: [] };
  const weightSum = active.reduce((sum, part) => sum + part.weight, 0);
  let score = weightSum <= 0
    ? 0
    : active.reduce((sum, part) => sum + (part.weight / weightSum) * part.dice, 0);

  if (
    tipo === 'anime'
    && score > 0
    && left.formato
    && right.formato
    && normalizeMatchLabel(left.formato) === normalizeMatchLabel(right.formato)
  ) {
    score = Math.min(1, score + FORMAT_BONUS);
  }

  return { score, shared: active.flatMap((part) => part.shared) };
}

function withPart(profile: MatchProfile, parts: MatchPart[]): GateAttr[] {
  const out: GateAttr[] = [];
  for (const part of parts) {
    for (const attr of partList(profile, part)) {
      out.push({ part, key: attr.key, label: attr.label, ref: attr.ref });
    }
  }
  return out;
}

function dedupeGate(attrs: GateAttr[]): GateAttr[] {
  const seen = new Set<string>();
  const out: GateAttr[] = [];
  for (const attr of attrs) {
    const id = `${attr.part}:${attr.key}`;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(attr);
  }
  return out;
}

export function hasComparableSignal(tipo: MatchTipo, profile: MatchProfile): boolean {
  const parts = tipo === 'anime' || tipo === 'jogo'
    ? [...CONTENT_PARTS[tipo], ...FALLBACK_PARTS[tipo]]
    : [...CONTENT_PARTS[tipo], ...FALLBACK_PARTS[tipo]];
  return parts.some((part) => partList(profile, part).length > 0);
}

export function strongParts(tipo: MatchTipo, left: MatchProfile, right: MatchProfile): MatchPart[] {
  if (tipo === 'filme') return ['generos', 'diretor'];
  if (tipo === 'serie') return ['generos', 'criador'];
  if (tipo === 'jogo') return ['generos', 'temas', 'desenvolvedora'];
  const bothHaveTags = partList(left, 'tags').length > 0 && partList(right, 'tags').length > 0;
  return bothHaveTags ? ['tags', 'estudio'] : ['generos', 'estudio'];
}

export function sharedStrong(tipo: MatchTipo, seeds: MatchProfile[], rarity: RarityIndex): GateAttr[] {
  if (seeds.length < 2) return [];
  const [left, right] = seeds;
  const parts = strongParts(tipo, left, right);
  const rightByPart = new Map<MatchPart, Map<string, MatchAttr>>();
  for (const part of parts) {
    rightByPart.set(part, new Map(partList(right, part).map((attr) => [attr.key, attr])));
  }
  const shared: GateAttr[] = [];
  for (const part of parts) {
    const other = rightByPart.get(part) ?? new Map();
    for (const attr of partList(left, part)) {
      if (!other.has(attr.key)) continue;
      if (isTooGeneric(rarity.n, dfOf(rarity, part, attr.key))) continue;
      shared.push({ part, key: attr.key, label: attr.label, ref: attr.ref });
    }
  }
  return dedupeGate(shared);
}

export function rarestAttr(attrs: GateAttr[], rarity: RarityIndex): GateAttr | null {
  let best: GateAttr | null = null;
  let bestRarity = -1;
  for (const attr of attrs) {
    const value = attributeRarity(rarity.n, dfOf(rarity, attr.part, attr.key));
    if (!best || value > bestRarity || (value === bestRarity && attr.key < best.key)) {
      best = attr;
      bestRarity = value;
    }
  }
  return best;
}

function nonGeneric(attrs: GateAttr[], rarity: RarityIndex): GateAttr[] {
  return attrs.filter((attr) => !isTooGeneric(rarity.n, dfOf(rarity, attr.part, attr.key)));
}

export function soloRetrievalAttrs(tipo: MatchTipo, seeds: MatchProfile[], rarity: RarityIndex): GateAttr[] {
  const chosen: GateAttr[] = [];
  for (const seed of seeds) {
    const content = withPart(seed, CONTENT_PARTS[tipo]);
    const specific = nonGeneric(content, rarity);
    const usable = specific.length > 0 ? specific : content;
    if (usable.length > 0) chosen.push(...usable);
    else chosen.push(...withPart(seed, FALLBACK_PARTS[tipo]));
  }
  return dedupeGate(chosen);
}

function hasAttr(profile: MatchProfile, attr: GateAttr): boolean {
  return partList(profile, attr.part).some((item) => item.key === attr.key);
}

function passesSoloGate(tipo: MatchTipo, seed: MatchProfile, candidate: MatchProfile, rarity: RarityIndex): boolean {
  const seedAttrs = withPart(seed, Object.keys(PART_WEIGHTS[tipo]) as MatchPart[]);
  const shared = seedAttrs.filter((attr) => hasAttr(candidate, attr));
  if (shared.length === 0) return false;
  if (nonGeneric(seedAttrs, rarity).length === 0) return true;
  return nonGeneric(shared, rarity).length > 0;
}

function allowsAdult(modo: MatchModo, seeds: MatchProfile[], candidate: MatchProfile): boolean {
  if (!candidate.adult) return true;
  const flags = seeds.map((seed) => Boolean(seed.adult));
  if (modo === 'dupla' && flags.length >= 2 && flags[0] !== flags[1]) return false;
  return flags.every(Boolean);
}

function weightOf(seed: MatchProfile): number {
  return seed.seedWeight != null && seed.seedWeight > 0 ? seed.seedWeight : 1;
}

function uniqueLabels(labels: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const label of labels) {
    const key = normalizeMatchLabel(label);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(label.trim());
  }
  return out;
}

function soloScore(
  tipo: MatchTipo,
  seeds: MatchProfile[],
  candidate: MatchProfile,
  rarity: RarityIndex,
): { score: number; shared: string[] } {
  if (seeds.length === 1) {
    if (!passesSoloGate(tipo, seeds[0], candidate, rarity)) return { score: 0, shared: [] };
    const sim = diceSimilarity(tipo, seeds[0], candidate, rarity);
    return { score: sim.score, shared: uniqueLabels(sim.shared.map((hit) => hit.label)) };
  }

  let weighted = 0;
  let weightSum = 0;
  const labels: string[] = [];
  for (const seed of seeds) {
    const weight = weightOf(seed);
    const sim = diceSimilarity(tipo, seed, candidate, rarity);
    weighted += weight * sim.score;
    weightSum += weight;
    if (sim.score > 0) labels.push(...sim.shared.map((hit) => hit.label));
  }
  return {
    score: weightSum > 0 ? weighted / weightSum : 0,
    shared: uniqueLabels(labels),
  };
}

function emptyResult(
  reason: MatchScoreReason,
  paralelo: string[] = [],
  bloqueadoPeloModo = false,
): MatchScoreResult {
  return { reason, items: [], bloqueadoPeloModo, paralelo };
}

export function computeMatch(input: {
  tipo: MatchTipo;
  modo: MatchModo;
  seeds: MatchProfile[];
  candidates: MatchProfile[];
  rarity: RarityIndex;
  gamePlay?: GamePlay | null;
  blockedIds?: number[];
  limit?: number;
}): MatchScoreResult {
  if (input.modo === 'dupla' && input.seeds.length !== 2) return emptyResult('sem_semente');
  if (input.modo === 'solo' && input.seeds.length === 0) return emptyResult('sem_semente');
  if (input.seeds.some((seed) => !hasComparableSignal(input.tipo, seed))) return emptyResult('sem_ficha');

  const strong = input.modo === 'dupla' ? sharedStrong(input.tipo, input.seeds, input.rarity) : [];
  const rarest = input.modo === 'dupla' ? rarestAttr(strong, input.rarity) : null;
  const paralelo = uniqueLabels(strong.map((attr) => attr.label));
  if (input.modo === 'dupla' && !rarest) return emptyResult('sem_paralelo');

  const blocked = new Set(input.blockedIds ?? []);
  for (const seed of input.seeds) {
    blocked.add(seed.id);
    for (const relatedId of seed.relatedIds ?? []) blocked.add(relatedId);
  }

  const ranked: Array<RankedMatch & { franchise: number }> = [];
  let modeDroppedGate = false;

  for (const candidate of input.candidates) {
    if (blocked.has(candidate.id)) continue;
    if (!allowsAdult(input.modo, input.seeds, candidate)) continue;

    const passesGate = input.modo === 'dupla'
      ? Boolean(rarest && hasAttr(candidate, rarest))
      : input.seeds.length === 1
        ? passesSoloGate(input.tipo, input.seeds[0], candidate, input.rarity)
        : soloScore(input.tipo, input.seeds, candidate, input.rarity).score > 0;

    const passesMode = !input.gamePlay || gameMatchesPlay(candidate.modes ?? [], input.gamePlay);
    if (!passesMode) {
      if (passesGate) modeDroppedGate = true;
      continue;
    }
    if (!passesGate) continue;

    const scored = input.modo === 'dupla' && input.seeds.length === 2
      ? (() => {
        const left = diceSimilarity(input.tipo, input.seeds[0], candidate, input.rarity);
        const right = diceSimilarity(input.tipo, input.seeds[1], candidate, input.rarity);
        const rightKeys = new Set(right.shared.map((hit) => `${hit.part}:${hit.key}`));
        const both = left.shared.filter((hit) => rightKeys.has(`${hit.part}:${hit.key}`));
        const labels = both.length > 0 ? both.map((hit) => hit.label) : paralelo;
        return { score: Math.min(left.score, right.score), shared: uniqueLabels(labels) };
      })()
      : soloScore(input.tipo, input.seeds, candidate, input.rarity);

    if (scored.score <= 0) continue;

    const sameCollection = input.modo === 'solo'
      && input.seeds.length === 1
      && input.seeds[0].collectionId != null
      && candidate.collectionId != null
      && input.seeds[0].collectionId === candidate.collectionId;

    ranked.push({
      id: candidate.id,
      score: scored.score,
      shared: scored.shared,
      franchise: sameCollection ? 1 : 0,
    });
  }

  if (ranked.length === 0) {
    return emptyResult('sem_afinidade', paralelo, modeDroppedGate);
  }

  ranked.sort((a, b) => b.score - a.score || b.franchise - a.franchise || a.id - b.id);
  const limit = input.limit ?? MATCH_RESULT_LIMIT;
  return {
    reason: 'ok',
    bloqueadoPeloModo: false,
    paralelo,
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
  paralelo?: string[];
}): string {
  const label = TIPO_LABEL[input.tipo];
  if (input.reason === 'ok') {
    return `Sugestões de ${label} pelos atributos em comum.`;
  }
  if (input.reason === 'sem_base') {
    return `Você ainda não marcou nenhum ${label} como favorito ou como gostei. Escolha um título para ver um match.`;
  }
  if (input.reason === 'precisa_login') {
    return 'Entre na sua conta para usar os títulos que você marcou como favorito ou gostei. Ou escolha um título agora.';
  }
  if (input.reason === 'sem_paralelo') {
    return 'Esses gostos não se encontram. Sem um atributo em comum que não seja genérico demais, não há um título dos dois.';
  }
  if (input.reason === 'sem_ficha') {
    if (input.tipo === 'anime') return 'Esse anime não tem gênero, tag nem estúdio para comparar.';
    if (input.tipo === 'jogo') return 'Esse jogo não tem gênero, tema nem desenvolvedora para comparar.';
    return `Esse ${label} não tem gênero nem equipe para comparar.`;
  }
  if (input.reason === 'titulo_ausente') {
    return 'Não encontrei um dos títulos escolhidos no catálogo.';
  }
  if (input.reason === 'sem_semente') {
    return 'Escolha um título para calcular o match.';
  }
  if (input.bloqueadoPeloModo && input.gamePlay === 'multiplayer') {
    return 'Não há jogo com o modo multijogador e esses atributos no catálogo. Jogo só de um jogador fica de fora, mesmo com o gênero igual.';
  }
  if (input.bloqueadoPeloModo && input.gamePlay === 'single') {
    return 'Não há jogo com o modo um jogador e esses atributos no catálogo. Jogo só multijogador fica de fora.';
  }
  if (input.paralelo && input.paralelo.length > 0) {
    const names = input.paralelo.join(', ');
    return `O paralelo é ${names}, e o catálogo não tem outro título com ele.`;
  }
  return `Nenhum ${label} do catálogo compartilha um atributo com essa escolha.`;
}
