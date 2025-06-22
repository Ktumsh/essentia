"use client";

import {
  Accessibility,
  Bell,
  CreditCard,
  UserRoundPenIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import { useIsMobile } from "@/hooks/use-mobile";

import InfoField from "./info-field";

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
          {session?.user?.id && (
            <>
              <InfoField
                title="Cuenta y perfil"
                hasValue={false}
                icon={UserRoundPenIcon}
                isButton
                buttonAction={() => router.push("/settings/account-profile")}
              />
              <InfoField
                title="Suscripciones"
                hasValue={false}
                icon={CreditCard}
                isButton
                buttonAction={() => router.push("/settings/subscriptions")}
              />
            </>
          )}
          <InfoField
            title="Preferencias y accesibilidad"
            hasValue={false}
            icon={Accessibility}
            isButton
            buttonAction={() => router.push("/settings/accesibility")}
          />
          {session?.user?.id && (
            <InfoField
              title="Notificaciones y recordatorios"
              hasValue={false}
              icon={Bell}
              isButton
              buttonAction={() => router.push("/settings/notifications")}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default SettingsWrapper;
