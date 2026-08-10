import { PrismaClient } from '@prisma/client';

/** Período ainda não concluído (inclui mês atual com lançamentos futuros) */
export function isOpenPeriod(endDate: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  return endDate >= today;
}

export function isFuturePeriodStart(startDate: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  return startDate > today;
}
