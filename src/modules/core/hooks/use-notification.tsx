"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

import {
  subscribeUser,
  unsubscribeUser,
  sendAndSaveNotification,
} from "@/app/(main)/settings/actions";

import { urlBase64ToUint8Array } from "../lib/utils";

interface NotificationContextProps {
  isSupported: boolean;
  isSubscribed: boolean;
  message: string;
  setMessage: (message: string) => void;
  subscribeToPush: () => Promise<void>;
  unsubscribeFromPush: () => Promise<void>;
  notifyUser: (title: string, message: string, url?: string) => Promise<void>;
  permission: NotificationPermission;
  openPermissionSettings: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

export const NotificationProvider = ({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) => {
  const [isSupported, setIsSupported] = useState(true);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission,
  );

  async function registerServiceWorker() {
    if (process.env.NODE_ENV === "development") return;

    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });

    const existingSubscription =
      await registration.pushManager.getSubscription();
    if (existingSubscription) {
      setSubscription(existingSubscription);
    }
  }

  const subscribeToPush = useCallback(async () => {
    if (permission === "denied") {
      console.warn("Permiso de notificaciones denegado.");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const existingSubscription =
      await registration.pushManager.getSubscription();

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (existingSubscription) {
      const serializedSub = JSON.parse(JSON.stringify(existingSubscription));
      await subscribeUser(userId, serializedSub, timezone);
      setSubscription(existingSubscription);
      return;
    }

    try {
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        ),
      });

      const serializedSub = JSON.parse(JSON.stringify(newSubscription));
      await subscribeUser(userId, serializedSub, timezone);
      setSubscription(newSubscription);
    } catch (error) {
      console.error("Error al suscribirse a Push:", error);
      setPermission(Notification.permission);
    }
  }, [userId, permission]);

  const unsubscribeFromPush = useCallback(async () => {
    if (subscription) {
      try {
        const isUnsubscribed = await subscription.unsubscribe();
        if (isUnsubscribed) {
          console.log("Suscripción cancelada en el navegador.");

          const registration = await navigator.serviceWorker.ready;
          const existingSubscription =
            await registration.pushManager.getSubscription();

          if (!existingSubscription) {
            console.log("La suscripción ya no existe en el navegador.");
            await unsubscribeUser(subscription.endpoint);
            setSubscription(null);
          } else {
            console.error("La suscripción todavía existe en el navegador.");
          }
        }
      } catch (error) {
        console.error("Error al desuscribirse:", error);
      }
    }
  }, [subscription]);

  useEffect(() => {
    async function initializeSubscription() {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        setIsSupported(true);
        await registerServiceWorker();

        const ALREADY_ASKED_KEY = "N8ox7_4e3K";

        const alreadyAskedThisSession =
          sessionStorage.getItem(ALREADY_ASKED_KEY);

        if (Notification.permission === "granted") {
          await subscribeToPush();
        } else if (
          Notification.permission === "default" &&
          !alreadyAskedThisSession
        ) {
          sessionStorage.setItem(ALREADY_ASKED_KEY, "true");

          const permissionResult = await Notification.requestPermission();
          setPermission(permissionResult);

          if (permissionResult === "granted") {
            await subscribeToPush();
          }
        }
      } else {
        setIsSupported(false);
      }
    }

    initializeSubscription();
  }, [subscribeToPush]);

  useEffect(() => {
    const handlePermissionChange = () => {
      setPermission(Notification.permission);
      if (Notification.permission === "denied" && subscription) {
        unsubscribeFromPush();
      }
    };

    document.addEventListener("visibilitychange", handlePermissionChange);

    return () => {
      document.removeEventListener("visibilitychange", handlePermissionChange);
    };
  }, [subscription, unsubscribeFromPush]);

  useEffect(() => {
    async function checkPermissions() {
      if (Notification.permission !== "granted" && subscription) {
        await unsubscribeUser(subscription.endpoint);
        setSubscription(null);
      }
    }
    checkPermissions();
  }, [subscription]);

  async function notifyUser(title: string, message: string, url?: string) {
    await sendAndSaveNotification({ userId, title, message, url });
  }

  const openPermissionSettings = () => {
    toast.info(
      "Para habilitar las notificaciones, por favor ve a la configuración de tu navegador y permite las notificaciones para este sitio.",
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        isSupported,
        isSubscribed: !!subscription,
        message,
        setMessage,
        subscribeToPush,
        unsubscribeFromPush,
        notifyUser,
        permission,
        openPermissionSettings,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
