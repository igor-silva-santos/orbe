import webpush from 'web-push';
import { prisma } from './clients';

export type CreateNotificationInput = {
  userId: number;
  message: string;
  type: string;
  relatedMediaId?: number;
  relatedMediaType?: string;
  sendPush?: boolean;
};

function configureWebPush(): boolean {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || 'mailto:contato@orbenerd.com';

  if (!publicKey || !privateKey) return false;

  webpush.setVapidDetails(subject, publicKey, privateKey);
  return true;
}

export async function createNotification(input: CreateNotificationInput) {
  const notification = await prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      message: input.message,
      relatedMediaId: input.relatedMediaId ?? null,
      relatedMediaType: input.relatedMediaType ?? null,
    },
  });

  if (input.sendPush && configureWebPush()) {
    const subscriptions = await prisma.pushSubscription.findMany({
      where: { userId: input.userId },
    });

    const payload = JSON.stringify({
      title: input.message,
      body: input.message,
      url: '/minha-lista/animes',
      notificationId: notification.id,
    });

    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          payload
        );
      } catch (error: unknown) {
        const status = (error as { statusCode?: number })?.statusCode;
        if (status === 404 || status === 410) {
          await prisma.pushSubscription.delete({ where: { id: sub.id } }).catch(() => undefined);
        }
      }
    }
  }

  return notification;
}

export function getVapidPublicKey(): string | null {
  return process.env.VAPID_PUBLIC_KEY?.trim() || null;
}
