"use client";

import { AlarmClock, ArrowLeft, BellRing } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import TaskList from "@/modules/chatbot/components/tools/task-list";
import { useNotification } from "@/modules/core/hooks/use-notification";

import InfoField from "./info-field";
import SettingsOptsHeader from "./settings-opts-header";

interface NotificationsStgProps {
  isMobile?: boolean;
}

function NotificationsStg({ isMobile = false }: NotificationsStgProps) {
  const router = useRouter();

  const [isOpenList, setIsOpenList] = useState(false);

  const {
    isSupported,
    isSubscribed,
    subscribeToPush,
    unsubscribeFromPush,
    permission,
    openPermissionSettings,
  } = useNotification();

  if (!isSupported) {
    return (
      <div className="flex flex-col">
        <ul className="flex flex-col overflow-hidden border-y border-gray-200 dark:border-dark md:rounded-lg md:border">
          <li>
            <div className="inline-flex h-auto min-h-11 w-full items-center justify-between px-6 py-3 text-sm font-medium text-main-h dark:text-main-dark md:px-4 md:py-2">
              <div className="flex items-center gap-4">
                <p>
                  Las notificaciones push no están soportadas en este navegador.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="mb-5 pb-16 md:mb-0 md:pb-0">
      {isMobile ? (
        <div className="relative px-6">
          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="absolute inset-y-0 left-4 mb-2 mt-auto md:left-0"
            onClick={() => router.push("/settings")}
          >
            <ArrowLeft className="!size-5 text-main-h dark:text-main-dark" />
          </Button>
          <div className="ml-12">
            <SettingsOptsHeader title="Notificaciones y recordatorios" />
          </div>
        </div>
      ) : (
        <SettingsOptsHeader
          title="Notificaciones y recordatorios"
          description="Configura cómo recibes las notificaciones y recordatorios."
        />
      )}

      <div className="mt-1 flex flex-1 flex-col">
        <div className="flex flex-col">
          <ul className="flex flex-col overflow-hidden border-y border-gray-200 dark:border-dark md:rounded-lg md:border">
            <li>
              <div className="inline-flex h-auto min-h-11 w-full items-center justify-between gap-2 px-6 py-2 text-sm font-medium text-main-h dark:text-main-dark md:px-4">
                <div className="flex items-center gap-4">
                  <BellRing className="size-4 shrink-0" />
                  <div className="flex flex-col items-start">
                    <span>Notificaciones push</span>
                    <p className="text-main-m dark:text-main-dark-m">
                      Recibe notificaciones sobre novedades y actualizaciones
                      importantes.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isSubscribed}
                  onCheckedChange={
                    permission === "denied"
                      ? () => {
                          openPermissionSettings();
                        }
                      : isSubscribed
                        ? unsubscribeFromPush
                        : subscribeToPush
                  }
                />
              </div>
            </li>
            {/* {isSubscribed && (
              <li className="border-t border-gray-200 dark:border-dark">
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
                      onClick={() =>
                        notifyUser("Notificación de prueba", message)
                      }
                    >
                      Enviar notificación de prueba
                    </Button>
                  </div>
                </div>
              </li>
            )} */}
            <InfoField
              title="Tareas programadas"
              value="Recibe notificaciones sobre tareas programadas y recordatorios."
              icon={AlarmClock}
              isButton
              buttonAction={() => setIsOpenList(true)}
            />
            <TaskList isOpen={isOpenList} setIsOpen={setIsOpenList} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotificationsStg;
