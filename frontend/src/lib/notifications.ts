import type { Notification } from '@/types';

export type ApiNotification = {
  id: number;
  usuario_id?: number;
  midia_id?: number | null;
  tipo_midia?: string | null;
  titulo: string;
  tipo_notificacao: string;
  foi_visualizada: boolean;
  data_criacao: string;
};

/** Normaliza payload da API Express para o tipo usado no frontend. */
export function mapNotification(raw: ApiNotification): Notification {
  return {
    id: raw.id,
    midia_id: raw.midia_id ?? undefined,
    tipo_midia: raw.tipo_midia as Notification['tipo_midia'],
    message: raw.titulo,
    type: raw.tipo_notificacao,
    foi_visualizada: raw.foi_visualizada,
    createdAt: raw.data_criacao,
  };
}

export function mapNotifications(raw: ApiNotification[]): Notification[] {
  return raw.map(mapNotification);
}
