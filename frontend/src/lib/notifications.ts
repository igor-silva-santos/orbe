import type { Notification } from '@/types';

export type ApiNotification = {
  id: number;
  type: string;
  message: string;
  foi_visualizada: boolean;
  midia_id?: number | null;
  tipo_midia?: string | null;
  createdAt: string;
  /** Campos legados (se algum proxy antigo ainda enviar) */
  titulo?: string;
  tipo_notificacao?: string;
  data_criacao?: string;
};

/** Normaliza payload da API Express para o tipo usado no frontend. */
export function mapNotification(raw: ApiNotification): Notification {
  return {
    id: raw.id,
    midia_id: raw.midia_id ?? undefined,
    tipo_midia: raw.tipo_midia as Notification['tipo_midia'],
    message: raw.message ?? raw.titulo ?? '',
    type: raw.type ?? raw.tipo_notificacao ?? 'info',
    foi_visualizada: raw.foi_visualizada,
    createdAt: raw.createdAt ?? raw.data_criacao ?? new Date().toISOString(),
  };
}

export function mapNotifications(raw: ApiNotification[]): Notification[] {
  return raw.map(mapNotification);
}
