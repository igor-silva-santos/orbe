/** Opções de conteúdo no sync — padrões seguros para não alterar fluxos existentes. */
export type SyncContentOptions = {
  /**
   * Quando true, persiste lançamentos só com ano (releaseYear, sem data de calendário).
   * Padrão false: comportamento anterior (ignora / pula sem data completa).
   */
  includeUndated?: boolean;
  limit?: number;
};

export const DEFAULT_SYNC_CONTENT_OPTIONS: Required<Pick<SyncContentOptions, 'includeUndated'>> = {
  includeUndated: false,
};

export function resolveSyncContentOptions(options?: SyncContentOptions): {
  includeUndated: boolean;
  limit?: number;
} {
  return {
    includeUndated: options?.includeUndated === true,
    limit: options?.limit,
  };
}
