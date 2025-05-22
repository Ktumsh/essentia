"use client";

import { AlarmClock, ArrowLeft, BellRing } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/kit/button";
import { Switch } from "@/components/kit/switch";
import { useNotification } from "@/hooks/use-notification";

import InfoField from "./info-field";
import SettingsOptsHeader from "./settings-opts-header";
import TaskList from "../../(chat)/_components/tools/task-list";

interface NotificationsStgProps {
  isMobile?: boolean;
}

function NotificationsStg({ isMobile = false }: NotificationsStgProps) {
  const router = useRouter();

  const [isOpenList, setIsOpenList] = useState(false);

  const {
    isSupported,
    isSubscribed,
    toggleSubscription,
    permission,
    openPermissionSettings,
  } = useNotification();

  if (!isSupported) {
    return (
      <div className="flex flex-col">
        <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
          <li>
            <div className="text-foreground inline-flex h-auto min-h-11 w-full items-center justify-between px-6 py-3 text-sm font-medium md:px-4 md:py-2">
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
    <div className="-mx-6 md:mx-0">
      {isMobile ? (
        <SettingsOptsHeader
          title="Notificaciones y recordatorios"
          className="px-4"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/settings")}
          >
            <ArrowLeft className="text-foreground" />
          </Button>
        </SettingsOptsHeader>
      ) : (
        <SettingsOptsHeader
          title="Notificaciones y recordatorios"
          description="Configura cómo recibes las notificaciones y recordatorios."
        />
      )}

      <div className="mt-1 flex flex-1 flex-col">
        <div className="flex flex-col">
          <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
            <li>
              <div className="text-foreground inline-flex h-auto min-h-11 w-full items-center justify-between gap-2 px-6 py-2 text-sm font-medium md:px-4">
                <div className="flex items-center gap-4">
                  <BellRing className="size-4 shrink-0" />
                  <div className="flex flex-col items-start">
                    <span>Notificaciones push</span>
                    <p className="text-muted-foreground">
                      Recibe notificaciones sobre novedades y actualizaciones
                      importantes.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isSubscribed}
                  onCheckedChange={() => {
                    if (permission === "denied") {
                      openPermissionSettings();
                    } else {
                      toggleSubscription();
                    }
                  }}
                />
              </div>
            </li>
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
