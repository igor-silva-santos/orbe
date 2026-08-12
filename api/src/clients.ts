import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { MovieDb } from 'moviedb-promise';
import { logger } from './logger';

export const prisma = new PrismaClient();

const tmdbApiKey = process.env.TMDB_API_KEY;
logger.info(`TMDB_API_KEY carregada: ${tmdbApiKey ? 'sim' : 'não definida'}`);
const igdbClientId = process.env.IGDB_CLIENT_ID;
const igdbClientSecret = process.env.IGDB_CLIENT_SECRET;

// Instantiate moviedb-promise client
const tmdb = new MovieDb(tmdbApiKey || '');

/** Sem timeout, axios espera para sempre — uma conexão travada com qualquer uma dessas APIs
 * congela o sync inteiro (o orquestrador roda as fases em sequência com await simples). */
const EXTERNAL_API_TIMEOUT_MS = 15_000;

// `moviedb-promise` (o client `tmdb` abaixo) usa a instância global do axios por baixo dos panos,
// sem expor um jeito de configurar timeout no construtor — só via default global.
axios.defaults.timeout = EXTERNAL_API_TIMEOUT_MS;

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: EXTERNAL_API_TIMEOUT_MS,
  params: {
    api_key: tmdbApiKey,
    language: 'pt-BR',
  },
});

const igdbApi = axios.create({
  baseURL: 'https://api.igdb.com/v4',
  timeout: EXTERNAL_API_TIMEOUT_MS,
  headers: {
    'Client-ID': igdbClientId,
  },
});

const anilistApi = axios.create({
  baseURL: 'https://graphql.anilist.co',
  timeout: EXTERNAL_API_TIMEOUT_MS,
});

let igdbAccessToken: string | null = null;
let igdbAccessTokenExpiresAt = 0;
let igdbAccessTokenPromise: Promise<string | null> | null = null;

/** Margem de segurança antes de considerar o token expirado, evita usar um token que vence no meio de uma requisição */
const IGDB_TOKEN_SAFETY_MARGIN_MS = 60_000;

const requestIgdbAccessToken = async (): Promise<string | null> => {
  logger.info(
    `Tentando obter token IGDB (client configurado: ${igdbClientId && igdbClientSecret ? 'sim' : 'não'})`
  );
  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${igdbClientId}&client_secret=${igdbClientSecret}&grant_type=client_credentials`,
      null, // No data in the body
    );
    igdbAccessToken = response.data.access_token;
    const expiresInMs = (response.data.expires_in ?? 0) * 1000;
    igdbAccessTokenExpiresAt = expiresInMs > 0 ? Date.now() + expiresInMs : 0;
    igdbApi.defaults.headers['Authorization'] = `Bearer ${igdbAccessToken}`;
    logger.info('Token IGDB obtido com sucesso.');
    return igdbAccessToken;
  } catch (error) {
    logger.error('Erro ao obter token de acesso do IGDB:', error instanceof Error ? error.message : error);
    return null;
  }
};

/** Reaproveita o token IGDB (válido por ~60 dias) em vez de buscar um novo a cada requisição. */
const getIgdbAccessToken = async (): Promise<string | null> => {
  const isValid = igdbAccessToken && Date.now() < igdbAccessTokenExpiresAt - IGDB_TOKEN_SAFETY_MARGIN_MS;
  if (isValid) return igdbAccessToken;

  if (!igdbAccessTokenPromise) {
    igdbAccessTokenPromise = requestIgdbAccessToken().finally(() => {
      igdbAccessTokenPromise = null;
    });
  }
  return igdbAccessTokenPromise;
};

export { tmdb, tmdbApi, igdbApi, anilistApi, getIgdbAccessToken };