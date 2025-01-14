"use client";

import {
  Accessibility,
  Bell,
  ChevronRight,
  UserRoundPenIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface SettingsWrapperProps {
  session: Session | null;
}

const SettingsWrapper = ({ session }: SettingsWrapperProps) => {
  const router = useRouter();

  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="w-full px-6 pb-4 pt-8">
        <h1 className="text-xl font-semibold leading-none tracking-tight dark:text-white">
          Configuración
        </h1>
      </div>
      <div className="mt-1 flex flex-col gap-1">
        <ul className="flex flex-col overflow-hidden border-y border-gray-200 dark:border-dark md:rounded-lg md:border">
          {session?.user && (
            <li>
              <Button
                variant="ghost"
                fullWidth
                radius="none"
                className="h-12 justify-between px-6 py-3 text-main-h hover:text-main dark:text-main-dark dark:hover:text-white md:h-11 md:px-4 md:py-2"
                onClick={() => router.push("/settings/account-profile")}
              >
                <div className="flex items-center gap-4">
                  <UserRoundPenIcon className="size-4 shrink-0" />
                  <span>Cuenta y perfil</span>
                </div>
                <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
              </Button>
            </li>
          )}
          <li>
            <Button
              variant="ghost"
              fullWidth
              radius="none"
              className="h-12 justify-between px-6 py-3 text-main-h hover:text-main dark:text-main-dark dark:hover:text-white md:h-11 md:px-4 md:py-2"
              onClick={() => router.push("/settings/accesibility")}
            >
              <div className="flex items-center gap-4">
                <Accessibility className="size-4 shrink-0" />
                <span>Preferencias y accesibilidad</span>
              </div>
              <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              fullWidth
              radius="none"
              className="h-12 justify-between px-6 py-3 text-main-h hover:text-main dark:text-main-dark dark:hover:text-white md:h-11 md:px-4 md:py-2"
              onClick={() => router.push("/settings/notifications")}
            >
              <div className="flex items-center gap-4">
                <Bell className="size-4 shrink-0" />
                <span>Alertas y notificaciones</span>
              </div>
              <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
            </Button>
          </li>
          {/* <li>
            <Button
              variant="ghost"
              fullWidth
              radius="none"
              className="h-12 justify-between px-6 py-3 text-main-h hover:text-main dark:text-main-dark dark:hover:text-white md:h-11 md:px-4 md:py-2"
              onClick={() => router.push("/settings/support")}
            >
              <div className="flex items-center gap-4">
                <HelpCircle className="size-4 shrink-0" />
                <span>Ayuda y soporte</span>
              </div>
              <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
            </Button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default SettingsWrapper;
