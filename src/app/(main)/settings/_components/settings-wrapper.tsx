"use client";

import {
  Accessibility,
  Bell,
  ChevronRight,
  CreditCard,
  UserRoundPenIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SettingsWrapperProps {
  session: Session | null;
}

const SettingsWrapper = ({ session }: SettingsWrapperProps) => {
  const router = useRouter();

  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="-mx-6 flex h-full flex-1 flex-col md:mx-0">
      <div className="w-full px-6 pt-8 pb-4">
        <h1 className="font-merriweather text-xl font-semibold">
          Configuración
        </h1>
      </div>
      <div className="mt-1 flex flex-col gap-1">
        <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
          {session?.user && (
            <>
              <li>
                <Button
                  variant="ghost"
                  fullWidth
                  radius="none"
                  className="h-12 justify-between px-6 py-3 md:h-11 md:px-4 md:py-2"
                  onClick={() => router.push("/settings/account-profile")}
                >
                  <div className="flex items-center gap-4">
                    <UserRoundPenIcon className="size-4 shrink-0" />
                    <span>Cuenta y perfil</span>
                  </div>
                  <ChevronRight className="size-4 shrink-0" />
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  fullWidth
                  radius="none"
                  className="h-12 justify-between px-6 py-3 md:h-11 md:px-4 md:py-2"
                  onClick={() => router.push("/settings/subscriptions")}
                >
                  <div className="flex items-center gap-4">
                    <CreditCard className="size-4 shrink-0" />
                    <span>Suscripciones</span>
                  </div>
                  <ChevronRight className="size-4 shrink-0" />
                </Button>
              </li>
            </>
          )}
          <li>
            <Button
              variant="ghost"
              fullWidth
              radius="none"
              className="h-12 justify-between px-6 py-3 md:h-11 md:px-4 md:py-2"
              onClick={() => router.push("/settings/accesibility")}
            >
              <div className="flex items-center gap-4">
                <Accessibility className="size-4 shrink-0" />
                <span>Preferencias y accesibilidad</span>
              </div>
              <ChevronRight className="size-4 shrink-0" />
            </Button>
          </li>
          {session?.user && (
            <li>
              <Button
                variant="ghost"
                fullWidth
                radius="none"
                className="h-12 justify-between px-6 py-3 md:h-11 md:px-4 md:py-2"
                onClick={() => router.push("/settings/notifications")}
              >
                <div className="flex items-center gap-4">
                  <Bell className="size-4 shrink-0" />
                  <span>Notificaciones y recordatorios</span>
                </div>
                <ChevronRight className="size-4 shrink-0" />
              </Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SettingsWrapper;
