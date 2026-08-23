// Gservia Push & In-App Notification Manager

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, any>;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('[Gservia Notifications] Notifications are not supported in this environment');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('[Gservia Notifications] Failed to request permission:', error);
    return 'denied';
  }
}

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermissionStatus(): NotificationPermission {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
}

export async function sendLocalNotification(payload: NotificationPayload): Promise<boolean> {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }

  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icon-192.svg',
        badge: payload.badge || '/icon-192.svg',
        data: payload.data || {},
      });
      return true;
    } else {
      new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icon-192.svg',
      });
      return true;
    }
  } catch (error) {
    console.error('[Gservia Notifications] Failed to show notification:', error);
    return false;
  }
}
