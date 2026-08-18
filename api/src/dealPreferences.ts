import { prisma } from './clients';
import { logger } from './logger';

export const VALID_DEAL_PREFERENCE_STATUSES = ['ja_tenho', 'sem_interesse', 'quero'] as const;
export type DealPreferenceStatus = (typeof VALID_DEAL_PREFERENCE_STATUSES)[number];

export function isValidDealPreferenceStatus(value: unknown): value is DealPreferenceStatus {
  return typeof value === 'string' && (VALID_DEAL_PREFERENCE_STATUSES as readonly string[]).includes(value);
}

type DealPreferenceInput = {
  deal_id: string;
  status: DealPreferenceStatus;
  steam_app_id?: number | null;
  platform?: string | null;
  title?: string | null;
};

/** Espelha na biblioteca de jogos quando o título existe no catálogo Orbe. */
export async function syncDealPreferenceToJogo(
  userId: number,
  input: DealPreferenceInput & { orbe_game_id?: number | null },
): Promise<void> {
  if (input.status === 'quero') return;

  let igdbId = input.orbe_game_id ?? null;
  if (igdbId == null && input.steam_app_id != null) {
    const jogo = await prisma.jogo.findFirst({
      where: { steamAppId: input.steam_app_id },
      select: { igdbId: true },
    });
    igdbId = jogo?.igdbId ?? null;
  }
  if (igdbId == null) return;

  const midiaStatus = input.status === 'ja_tenho' ? 'assistido' : 'oculto';

  try {
    await prisma.preferencias_usuario_midia.upsert({
      where: {
        usuario_midia_unique: {
          usuario_id: userId,
          midia_id: igdbId,
          tipo_midia: 'jogo',
        },
      },
      update: { status: midiaStatus },
      create: {
        usuario_id: userId,
        midia_id: igdbId,
        tipo_midia: 'jogo',
        status: midiaStatus,
      },
    });
  } catch (error) {
    logger.warn(`Sync preferência oferta → jogo falhou (user ${userId}, igdb ${igdbId}): ${error}`);
  }
}
