/**
 * Regras de progresso da fila Crunchyroll (pt-BR).
 * @see extension/REGRAS-CRUNCHYROLL.md
 */

import { isAtOrPastPosition, subAheadOfDub, type SeasonEpisode } from './animeFrontier';
import type { CrunchyrollCatalogSnapshot } from './crunchyrollCms';

export type CrunchyrollLineKind =
  | 'comecar'
  | 'continuar'
  | 'a_seguir'
  | 'assistir_de_novo';

export type WatchlistQueueStatus =
  | 'comecar'
  | 'continuar'
  | 'a_seguir'
  | 'assistir_de_novo'
  | 'concluido'
  | 'esperando_dublagem'
  | 'esperando_episodio';

const LINE_PATTERNS: { kind: CrunchyrollLineKind; re: RegExp }[] = [
  { kind: 'comecar', re: /^começar a assistir:\s*(?:t(\d+)\s*)?e(\d+)/i },
  { kind: 'continuar', re: /^continuar:\s*(?:t(\d+)\s*)?e(\d+)/i },
  { kind: 'a_seguir', re: /^a seguir:\s*(?:t(\d+)\s*)?e(\d+)/i },
  { kind: 'assistir_de_novo', re: /^assistir de novo:\s*(?:t(\d+)\s*)?e(\d+)/i },
];

export function normalizeCrunchyrollStatusLine(raw: string): string {
  return raw.replace(/\s+/g, ' ').trim();
}

export function parseCrunchyrollStatusLine(raw: string): {
  kind: CrunchyrollLineKind;
  season: number;
  episode: number;
  label: string;
} | null {
  const label = normalizeCrunchyrollStatusLine(raw);
  if (!label) return null;

  for (const { kind, re } of LINE_PATTERNS) {
    const match = label.match(re);
    if (!match) continue;
    const season = match[1] ? parseInt(match[1], 10) : 1;
    const episode = parseInt(match[2], 10);
    if (!Number.isFinite(episode) || episode < 1) return null;
    return { kind, season: Number.isFinite(season) && season > 0 ? season : 1, episode, label };
  }
  return null;
}

export type PreferredAudio = 'sub' | 'pt-BR';

export type RefineProgressInput = {
  kind: CrunchyrollLineKind;
  season: number;
  episode: number;
  catalogEpisodes?: number | null;
  preferredAudio: PreferredAudio;
  catalog?: CrunchyrollCatalogSnapshot | null;
};

function resolveAssistirDeNovo(input: RefineProgressInput): WatchlistQueueStatus {
  const pos: SeasonEpisode = { season: input.season, episode: input.episode };
  const catalog = input.catalog;
  const catalogTotal = input.catalogEpisodes ?? null;
  const preferDub = input.preferredAudio === 'pt-BR';

  const subF = catalog?.subFrontier ?? null;
  const dubF = catalog?.dubPtBrFrontier ?? null;
  const subCount = catalog?.episodesSubCount ?? null;
  const dubCount = catalog?.episodesDubPtBrCount ?? null;

  if (catalog && preferDub && dubF) {
    if (!isAtOrPastPosition(pos, dubF)) {
      return 'assistir_de_novo';
    }
    if (subAheadOfDub(subF, dubF)) {
      return 'esperando_dublagem';
    }
    if (catalogTotal != null && subCount != null && subCount < catalogTotal) {
      return 'esperando_episodio';
    }
    if (catalogTotal != null && dubCount != null && dubCount >= catalogTotal) {
      return 'concluido';
    }
    return 'esperando_episodio';
  }

  if (catalog && subF) {
    if (!isAtOrPastPosition(pos, subF)) {
      return 'assistir_de_novo';
    }
    if (catalogTotal != null && subCount != null && subCount < catalogTotal) {
      return 'esperando_episodio';
    }
    if (preferDub && dubF && subAheadOfDub(subF, dubF)) {
      return 'esperando_dublagem';
    }
    return catalogTotal != null && subCount != null && subCount >= catalogTotal ? 'concluido' : 'esperando_episodio';
  }

  // Fallback sem CMS
  if (catalogTotal != null && catalogTotal > 0) {
    if (input.episode >= catalogTotal) return 'concluido';
    return preferDub ? 'esperando_dublagem' : 'esperando_episodio';
  }

  return 'assistir_de_novo';
}

/**
 * Converte o texto da Crunchyroll + catálogo CMS + Anilist em status da fila Orbe.
 */
export function mapCrunchyrollToQueueStatus(input: RefineProgressInput): WatchlistQueueStatus {
  const { kind } = input;

  if (kind === 'comecar') return 'comecar';
  if (kind === 'continuar') return 'continuar';
  if (kind === 'a_seguir') return 'a_seguir';

  return resolveAssistirDeNovo(input);
}

/** Ordem de prioridade na fila “o que assistir agora” */
export const QUEUE_STATUS_SORT: Record<WatchlistQueueStatus, number> = {
  continuar: 0,
  a_seguir: 1,
  comecar: 2,
  esperando_episodio: 3,
  esperando_dublagem: 4,
  assistir_de_novo: 5,
  concluido: 6,
};

export function compareQueueStatus(a: WatchlistQueueStatus, b: WatchlistQueueStatus): number {
  return QUEUE_STATUS_SORT[a] - QUEUE_STATUS_SORT[b];
}

export function formatSeasonEpisode(pos: SeasonEpisode | null | undefined): string | null {
  if (!pos) return null;
  return `T${pos.season}E${pos.episode}`;
}
