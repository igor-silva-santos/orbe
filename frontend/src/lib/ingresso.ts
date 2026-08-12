/**
 * Pagina generica do ingresso.com usada quando nao ha `ingresso_link` verificado
 * pelo Detetive Digital (api/src/detetive.ts) para este filme especifico.
 *
 * Nao "chutamos" mais a URL do filme a partir do titulo (`/filme/slug-do-titulo`)
 * client-side: o slug do ingresso.com nao e previsivel a partir do titulo da TMDB
 * (multiplos filmes, acentuacao, ano no slug etc.), entao a maioria dos chutes
 * caia em pagina 404 -- o botao parecia real mas levava pra lugar nenhum.
 */
export const INGRESSO_FALLBACK_URL = 'https://www.ingresso.com/filmes';
