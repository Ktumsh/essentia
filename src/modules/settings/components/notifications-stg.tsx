"use client";

import { AlarmClock, ArrowLeft, BellRing } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { sendAndSaveNotification } from "@/app/(main)/settings/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const { data: session } = useSession();

  const userId = session?.user?.id as string;

  const [isOpenList, setIsOpenList] = useState(false);
  const [message, setMessage] = useState("");

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
        <ul className="dark:border-dark flex flex-col overflow-hidden border-y border-gray-200 md:rounded-lg md:border">
          <li>
            <div className="text-main-h dark:text-main-dark inline-flex h-auto min-h-11 w-full items-center justify-between px-6 py-3 text-sm font-medium md:px-4 md:py-2">
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
            className="absolute inset-y-0 left-4 mt-auto mb-2 md:left-0"
            onClick={() => router.push("/settings")}
          >
            <ArrowLeft className="text-main-h dark:text-main-dark size-5!" />
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
          <ul className="dark:border-dark flex flex-col overflow-hidden border-y border-gray-200 md:rounded-lg md:border">
            <li>
              <div className="text-main-h dark:text-main-dark inline-flex h-auto min-h-11 w-full items-center justify-between gap-2 px-6 py-2 text-sm font-medium md:px-4">
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
            {isSubscribed &&
              userId === "3a25cc78-2d6b-4c83-8af2-7970e5849ae4" && (
                <li className="dark:border-dark border-t border-gray-200">
                  <div className="text-main-h dark:text-main-dark inline-flex h-auto min-h-11 w-full items-center justify-between px-6 py-3 text-sm font-medium md:px-4 md:py-2">
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
                          sendAndSaveNotification({
                            userId,
                            title: "Notificación de prueba",
                            message,
                          })
                        }
                      >
                        Enviar notificación de prueba
                      </Button>
                    </div>
                  </div>
                </li>
              )}
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
