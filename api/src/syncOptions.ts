/** Opções de conteúdo no sync — padrões seguros para não alterar fluxos existentes. */
export type SyncContentOptions = {
  /**
   * Quando true, persiste lançamentos só com ano (releaseYear, sem data de calendário).
   * Padrão false: comportamento anterior (ignora / pula sem data completa).
   */
  includeUndated?: boolean;
  /** Quando true, só busca listas curadas / TBA — não roda discover mensal por data. */
  undatedOnly?: boolean;
  limit?: number;
};

export const DEFAULT_SYNC_CONTENT_OPTIONS: Required<Pick<SyncContentOptions, 'includeUndated' | 'undatedOnly'>> = {
  includeUndated: false,
  undatedOnly: false,
};

export function resolveSyncContentOptions(options?: SyncContentOptions): {
  includeUndated: boolean;
  undatedOnly: boolean;
  limit?: number;
} {
  return {
    includeUndated: options?.includeUndated === true,
    undatedOnly: options?.undatedOnly === true,
    limit: options?.limit,
  };
}
