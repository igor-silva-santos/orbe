import { logger } from './logger';
import { isSyncKeepAliveEnabled } from './renderEgressConfig';

/** Render free hiberna após ~15 min sem HTTP — ping a cada 10 min durante sync */
const DEFAULT_INTERVAL_MS = 10 * 60 * 1000;

let timer: ReturnType<typeof setInterval> | null = null;
let active = false;

function resolveKeepAliveUrl(): string {
  const base =
    process.env.SYNC_KEEPALIVE_URL?.replace(/\/$/, '') ||
    process.env.RENDER_EXTERNAL_URL?.replace(/\/$/, '') ||
    `http://127.0.0.1:${process.env.PORT || 3001}`;
  return `${base}/api/health`;
}

async function ping(): Promise<void> {
  const url = resolveKeepAliveUrl();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) {
      logger.warn(`[sync-keepalive] ${url} → HTTP ${response.status}`);
      return;
    }
    logger.info('[sync-keepalive] Ping OK — instância mantida acordada durante o sync.');
  } catch (error) {
    logger.warn(`[sync-keepalive] Falha no ping (${url}): ${error}`);
  }
}

/** Inicia pings periódicos enquanto o sync estiver ativo neste processo */
export function startSyncKeepAlive(): void {
  if (!isSyncKeepAliveEnabled()) {
    logger.info('[sync-keepalive] Desabilitado (DISABLE_SYNC_KEEPALIVE).');
    return;
  }
  if (active) return;
  active = true;

  const parsed = parseInt(process.env.SYNC_KEEPALIVE_INTERVAL_MS ?? '', 10);
  const intervalMs = Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_INTERVAL_MS;

  logger.info(`[sync-keepalive] Ativo — ping a cada ${Math.round(intervalMs / 60_000)} min.`);
  void ping();
  timer = setInterval(() => {
    void ping();
  }, intervalMs);
}

/** Para pings quando o sync termina ou é interrompido */
export function stopSyncKeepAlive(): void {
  if (!active) return;
  active = false;
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  logger.info('[sync-keepalive] Encerrado.');
}
