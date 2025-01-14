"use client";

import { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    setSubscription(sub);

    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(userId, serializedSub);
  }

  async function unsubscribeFromPush() {
    if (subscription) {
      await subscription.unsubscribe();
      await unsubscribeUser(subscription.endpoint);
      setSubscription(null);
    }
  }

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
