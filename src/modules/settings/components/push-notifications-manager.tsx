"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from "@/app/(main)/settings/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { urlBase64ToUint8Array } from "../lib/utils";

function PushNotificationManager() {
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
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification("Notificación de prueba", message);
      setMessage("");
    }
  }

  if (!isSupported) {
    return <p>Las notificaciones push no están soportadas en este navegador</p>;
  }

  return (
    <div className="flex flex-col">
      <ul className="flex flex-col overflow-hidden border-y border-gray-200 dark:border-dark md:rounded-lg md:border">
        <li>
          <Button
            variant="ghost"
            fullWidth
            radius="none"
            className="h-auto min-h-11 justify-between px-6 py-3 text-main-h hover:text-main dark:text-main-dark dark:hover:text-white md:px-4 md:py-2"
            onClick={subscription ? unsubscribeFromPush : subscribeToPush}
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-start">
                <span>
                  {subscription
                    ? "Estas suscrito a las notificaciones push"
                    : "No estás suscrito a las notificaciones push"}
                </span>
                <p className="text-main-m dark:text-main-dark-m">
                  {subscription
                    ? "Haz clic para desuscribirte"
                    : "Haz clic para suscribirte"}
                </p>
              </div>
            </div>
            <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
          </Button>
        </li>
        {subscription && (
          <li>
            <div className="inline-flex h-auto min-h-11 w-full items-center justify-between px-6 py-3 text-sm font-medium text-main-h dark:text-main-dark md:px-4 md:py-2">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-start">
                  <Input
                    type="text"
                    placeholder="Ingresa un mensaje de notificación"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <Button
                  variant="link"
                  className="text-main-m dark:text-main-dark-m"
                  onClick={sendTestNotification}
                >
                  Enviar notificación de prueba
                </Button>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default PushNotificationManager;
