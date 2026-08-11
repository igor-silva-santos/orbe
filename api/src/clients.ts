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

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: tmdbApiKey,
    language: 'pt-BR',
  },
});

const igdbApi = axios.create({
  baseURL: 'https://api.igdb.com/v4',
  headers: {
    'Client-ID': igdbClientId,
  },
});

const anilistApi = axios.create({
  baseURL: 'https://graphql.anilist.co',
});

let igdbAccessToken: string | null = null;

const getIgdbAccessToken = async () => {
  logger.info(
    `Tentando obter token IGDB (client configurado: ${igdbClientId && igdbClientSecret ? 'sim' : 'não'})`
  );
  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${igdbClientId}&client_secret=${igdbClientSecret}&grant_type=client_credentials`,
      null, // No data in the body
    );
    igdbAccessToken = response.data.access_token;
    igdbApi.defaults.headers['Authorization'] = `Bearer ${igdbAccessToken}`;
    logger.info('Token IGDB obtido com sucesso.');
    return igdbAccessToken;
  } catch (error) {
    logger.error('Erro ao obter token de acesso do IGDB:', error instanceof Error ? error.message : error);
    return null;
  }
};

export { tmdb, tmdbApi, igdbApi, anilistApi, getIgdbAccessToken };