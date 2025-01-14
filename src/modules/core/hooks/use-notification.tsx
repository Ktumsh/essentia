"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");

  async function registerServiceWorker() {
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
    const registration = await navigator.serviceWorker.ready;

    const existingSubscription =
      await registration.pushManager.getSubscription();

    if (existingSubscription) {
      setSubscription(existingSubscription);

      const serializedSub = JSON.parse(JSON.stringify(existingSubscription));
      await subscribeUser(userId, serializedSub);
      return;
    }

    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    setSubscription(newSubscription);

    const serializedSub = JSON.parse(JSON.stringify(newSubscription));
    await subscribeUser(userId, serializedSub);
  }, [userId]);

  async function unsubscribeFromPush() {
    if (subscription) {
      await subscription.unsubscribe();
      await unsubscribeUser(subscription.endpoint);
      setSubscription(null);
    }
  }

  useEffect(() => {
    async function initializeSubscription() {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        setIsSupported(true);
        await registerServiceWorker();

        if (Notification.permission === "granted") {
          await subscribeToPush();
        } else if (Notification.permission === "default") {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            await subscribeToPush();
          }
        }
      }
    }

    initializeSubscription();
  }, [subscribeToPush]);

  async function notifyUser(title: string, message: string, url?: string) {
    await sendAndSaveNotification({ userId, title, message, url });
  }

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
