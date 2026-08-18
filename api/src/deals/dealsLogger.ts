import { prisma } from '../clients';
import { logger } from '../logger';

export type DealsUrlRejectReason = 'empty' | 'invalid_url' | 'blocked_aggregator' | 'unofficial_host';

export type DealsRejectedSample = {
  id: string;
  title: string;
  source: string;
  storeUrl: string;
  reason: DealsUrlRejectReason;
  hostname: string | null;
  section: 'gratis' | 'promocoes';
};

export type DealsFilterSummary = {
  rawBySource: Record<string, number>;
  afterDedupe: { gratis: number; promocoes: number };
  accepted: { gratis: number; promocoes: number };
  rejected: {
    total: number;
    byReason: Record<DealsUrlRejectReason, number>;
    bySource: Record<string, number>;
    samples: DealsRejectedSample[];
  };
  finalCounts: {
    gratis: number;
    gratisTemporarios: number;
    gratisPermanentes: number;
    promocoes: number;
    catalogoSteam: number;
  };
  usdBrlRate?: number | null;
};

const MAX_SAMPLES = 80;

export async function recordDealsRefreshRun(params: {
  trigger: string;
  status: 'completed' | 'failed';
  fingerprint?: string;
  summary: DealsFilterSummary;
  errorMessage?: string;
}): Promise<void> {
  const rejectedTotal = params.summary.rejected.total;
  const acceptedTotal =
    params.summary.accepted.gratis + params.summary.accepted.promocoes;

  logger.info(
    `[deals-filter] refresh (${params.trigger}): aceitos=${acceptedTotal} rejeitados=${rejectedTotal} ` +
      `grátis=${params.summary.finalCounts.gratis} promoções=${params.summary.finalCounts.promocoes}`,
  );

  if (rejectedTotal > 0) {
    const reasons = Object.entries(params.summary.rejected.byReason)
      .filter(([, count]) => count > 0)
      .map(([reason, count]) => `${reason}=${count}`)
      .join(', ');
    logger.warn(`[deals-filter] URLs rejeitadas (${params.trigger}): ${reasons}`);
  }

  try {
    await prisma.dealsLogRun.create({
      data: {
        trigger: params.trigger,
        status: params.status,
        finishedAt: new Date(),
        fingerprint: params.fingerprint ?? null,
        summary: {
          ...params.summary,
          errorMessage: params.errorMessage ?? null,
        },
      },
    });
  } catch (error) {
    logger.error(`[deals-filter] Falha ao gravar DealsLogRun: ${error}`);
  }
}

export function mergeRejectedSamples(
  existing: DealsRejectedSample[],
  newSamples: DealsRejectedSample[],
): DealsRejectedSample[] {
  const merged = [...existing, ...newSamples];
  return merged.slice(0, MAX_SAMPLES);
}
