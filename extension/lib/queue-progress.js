/**
 * Leitura de temporada, episódio e status da fila Crunchyroll (pt-BR e en).
 * Carregado antes de content/crunchyroll-queue.js e testado em Node.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.OrbeQueueProgress = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function parseSeasonEpisode(text) {
    if (!text || typeof text !== 'string') return { season: 1, episode: 0 };
    const normalized = text.replace(/\s+/g, ' ').trim();

    const seasonEpisode =
      normalized.match(/(?:temporada|season)\s*(\d+)\s*(?:epis[oó]dio|ep(?:isode)?|\.?)\s*(\d+)/i) ||
      normalized.match(/\b[st](\d+)\s*e(\d+)\b/i) ||
      normalized.match(/\b(\d+)\s*x\s*(\d+)\b/i);

    if (seasonEpisode) {
      return {
        season: parseInt(seasonEpisode[1], 10) || 1,
        episode: parseInt(seasonEpisode[2], 10) || 0,
      };
    }

    const epOnly = normalized.match(/\b(?:epis[oó]dio|ep(?:isode)?|e)\s*(\d+)\b/i);
    if (epOnly) {
      return { season: 1, episode: parseInt(epOnly[1], 10) || 0 };
    }

    return { season: 1, episode: 0 };
  }

  function parseQueueStatus(text) {
    if (!text || typeof text !== 'string') return null;
    const normalized = text.replace(/\s+/g, ' ').toLowerCase();
    if (normalized.includes('assistir de novo')) return 'novamente';
    if (normalized.includes('continuar')) return 'continuar';
    if (normalized.includes('a seguir')) return 'seguir';
    if (normalized.includes('começar') || normalized.includes('comecar')) return 'comecar';
    if (
      normalized.includes('terminado') ||
      normalized.includes('concluído') ||
      normalized.includes('concluido')
    ) {
      return 'terminado';
    }
    return null;
  }

  return { parseSeasonEpisode, parseQueueStatus };
});
