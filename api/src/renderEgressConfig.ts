/**
 * Flags de ambiente para reduzir egress no Render free (~5 GB/mês) sem quebrar UX.
 * Ver docs/RENDER-RECUPERAR-BANDA.md e render.yaml.
 */

function parseEnvBool(raw: string | undefined, defaultValue: boolean): boolean {
  if (raw === undefined || raw.trim() === '') return defaultValue;
  const v = raw.trim().toLowerCase();
  if (['0', 'false', 'no', 'off'].includes(v)) return false;
  if (['1', 'true', 'yes', 'on'].includes(v)) return true;
  return defaultValue;
}

function egressSaverDefault(): boolean {
  return parseEnvBool(process.env.ORBE_EGRESS_SAVER, false);
}

/** Modo conservador no Render — ativa defaults de economia (override por env explícita). */
export function isOrbeEgressSaverMode(): boolean {
  return egressSaverDefault();
}

/** Pula fase detetive (Puppeteer + ingresso) no run-sync-all / resume. */
export function shouldSkipDetetiveInFullSync(): boolean {
  if (process.env.SYNC_SKIP_DETETIVE_PHASE !== undefined) {
    return parseEnvBool(process.env.SYNC_SKIP_DETETIVE_PHASE, false);
  }
  return egressSaverDefault();
}

/** Cron diário 03:00 do Detetive Digital. */
export function isDetetiveCronEnabled(): boolean {
  if (process.env.DISABLE_DETETIVE_CRON !== undefined) {
    return !parseEnvBool(process.env.DISABLE_DETETIVE_CRON, true);
  }
  return !egressSaverDefault();
}

/** Warm-up de promoções (Epic/ITAD/etc.) via node-cron. */
export function isDealsWarmupCronEnabled(): boolean {
  return !parseEnvBool(process.env.DISABLE_DEALS_WARMUP_CRON, false);
}

/** Expressão cron para deals (padrão: a cada 15 min — evita * * * * *). */
export function dealsWarmupCronSchedule(): string {
  const custom = process.env.DEALS_CRON_SCHEDULE?.trim();
  return custom || '*/15 * * * *';
}

/** Refresh diário de preços Steam. */
export function isSteamPriceCronEnabled(): boolean {
  return !parseEnvBool(process.env.DISABLE_STEAM_PRICE_CRON, false);
}

/** POST /api/run-sync-backfill-step (GitHub Actions noturno). */
export function isBackfillStepEnabled(): boolean {
  if (process.env.DISABLE_BACKFILL_STEP !== undefined) {
    return !parseEnvBool(process.env.DISABLE_BACKFILL_STEP, true);
  }
  return !egressSaverDefault();
}

/** Ping interno durante sync (evita hibernação no free). */
export function isSyncKeepAliveEnabled(): boolean {
  return !parseEnvBool(process.env.DISABLE_SYNC_KEEPALIVE, false);
}
