import { igdbApi, getIgdbAccessToken } from './clients';
import { logger } from './logger';

type WebhookEndpoint = 'games';
type WebhookMethod = 'create' | 'update' | 'delete';

function getPublicApiUrl(): string | null {
  const url = process.env.PUBLIC_API_URL?.trim();
  return url ? url.replace(/\/$/, '') : null;
}

function getWebhookSecret(): string | null {
  return process.env.IGDB_WEBHOOK_SECRET?.trim() || null;
}

/**
 * Registra um webhook IGDB pra um endpoint+método. IGDB expira inscrições de tempos em
 * tempos, então isso é chamado no boot do servidor e também num cron diário. Reenviar o
 * mesmo url/secret/method quando já existe uma inscrição ativa é seguro — a IGDB atualiza
 * a inscrição existente em vez de duplicar.
 */
export async function registerIgdbWebhook(endpoint: WebhookEndpoint, method: WebhookMethod): Promise<void> {
  const publicApiUrl = getPublicApiUrl();
  const secret = getWebhookSecret();
  if (!publicApiUrl || !secret) {
    logger.warn('Webhook IGDB não registrado: configure PUBLIC_API_URL e IGDB_WEBHOOK_SECRET.');
    return;
  }

  await getIgdbAccessToken();
  const callbackUrl = `${publicApiUrl}/api/webhooks/igdb/${endpoint}`;

  try {
    const params = new URLSearchParams({ url: callbackUrl, secret, method });
    const response = await igdbApi.post(`/${endpoint}/webhooks`, params);
    logger.info(`Webhook IGDB registrado para ${endpoint}.${method} (${callbackUrl}): ${JSON.stringify(response.data)}`);
  } catch (error: any) {
    logger.error(
      `Falha ao registrar webhook IGDB para ${endpoint}.${method}: ` +
      `${error?.response?.status ?? ''} ${JSON.stringify(error?.response?.data ?? error?.message ?? error)}`
    );
  }
}

/** Registra todas as inscrições que o servidor mantém. Hoje: apenas atualização de jogos. */
export async function registerAllIgdbWebhooks(): Promise<void> {
  await registerIgdbWebhook('games', 'update');
}
