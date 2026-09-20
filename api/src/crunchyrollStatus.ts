/**
 * Regras de progresso da fila Crunchyroll (pt-BR).
 * @see extension/REGRAS-CRUNCHYROLL.md
 */

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

export type RefineProgressInput = {
  kind: CrunchyrollLineKind;
  episode: number;
  season: number;
  /** Total de episódios no catálogo Orbe (Anilist), quando conhecido */
  catalogEpisodes?: number | null;
  /** Usuário sincroniza só trilha dublada PT-BR */
  trackPtBrDub?: boolean;
  /**
   * Episódios disponíveis em dublagem PT-BR (quando conhecido).
   * Se ausente, inferimos apenas pelo total do catálogo.
   */
  dubbedEpisodesAvailable?: number | null;
};

/**
 * Converte o texto da Crunchyroll + metadados do catálogo em status da fila Orbe.
 */
export function mapCrunchyrollToQueueStatus(input: RefineProgressInput): WatchlistQueueStatus {
  const { kind, episode, catalogEpisodes, trackPtBrDub, dubbedEpisodesAvailable } = input;

  if (kind === 'comecar') return 'comecar';
  if (kind === 'continuar') return 'continuar';
  if (kind === 'a_seguir') return 'a_seguir';

  // Assistir de Novo — pode ser “vi tudo” ou “vi tudo que tem dublado / disponível”
  const total = catalogEpisodes ?? null;
  const dubbed = dubbedEpisodesAvailable ?? null;

  if (trackPtBrDub && dubbed != null && dubbed > 0) {
    if (episode >= dubbed) {
      return total != null && dubbed >= total ? 'concluido' : 'esperando_dublagem';
    }
    return 'assistir_de_novo';
  }

  if (total != null && total > 0) {
    if (episode >= total) return 'concluido';
    return trackPtBrDub ? 'esperando_dublagem' : 'esperando_episodio';
  }

  return 'assistir_de_novo';
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
