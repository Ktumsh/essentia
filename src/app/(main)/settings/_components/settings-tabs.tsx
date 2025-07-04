"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProfileMessage } from "@/hooks/use-profile-message";
import useSubscription from "@/hooks/use-subscription";
import { cn } from "@/utils";

import AccesibilityStg from "../accesibility/_components/accesibility-stg";
import AccountStg from "../account-profile/_components/account-stg";
import NotificationsStg from "../notifications/_components/notifications-stg";
import SubscriptionsStg from "../subscriptions/_components/subscriptions-stg";

import type { PaymentHistory } from "@/lib/types";
import type { Session } from "next-auth";

interface SettingsTabsProps {
  session: Session | null;
  paymentHistory: Array<PaymentHistory>;
}

const SettingsTabs = ({ session, paymentHistory }: SettingsTabsProps) => {
  const pathname = usePathname();

  const [tabValue, setTabValue] = useState<string>(pathname);

  const isMobile = useIsMobile();

  const { subscription, payment } = useSubscription();

  const { isDismissed } = useProfileMessage();

  useEffect(() => {
    if (!session?.user) {
      setTabValue("/settings/accesibility");
      return;
    }
    if (pathname === "/settings") {
      setTabValue("/settings/account-profile");
    } else {
      setTabValue(pathname);
    }
  }, [pathname, session?.user]);

  if (isMobile) return null;

  return (
    <Tabs
      orientation="vertical"
      value={tabValue}
      className={cn(
        "inset-y-0 flex h-full gap-0 md:min-h-[calc(100dvh-72px)]",
        {
          "md:min-h-[calc(100dvh-124px)]": !isDismissed,
        },
      )}
    >
      <TabsList className="bg-muted max-w-xs flex-1 shrink-0 rounded-none p-0 px-6 md:pb-6">
        <div className="w-full pt-8 pb-4">
          <h1 className="font-merriweather text-foreground text-xl font-semibold">
            Configuración
          </h1>
        </div>
        {session?.user && (
          <>
            <TabsTrigger
              asChild
              value="/settings/account-profile"
              className="text-foreground/80 data-[state=active]:bg-background h-10 w-full justify-between rounded-lg px-4 data-[state=active]:border"
            >
              <Link href="/settings/account-profile">
                <span>Cuenta y perfil</span>
                <ChevronRight className="text-muted-foreground size-4 shrink-0" />
              </Link>
            </TabsTrigger>
            <TabsTrigger
              asChild
              value="/settings/subscriptions"
              className="text-foreground/80 data-[state=active]:bg-background h-10 w-full justify-between rounded-lg px-4 data-[state=active]:border"
            >
              <Link href="/settings/subscriptions">
                <span>Suscripciones</span>
                <ChevronRight className="text-muted-foreground size-4 shrink-0" />
              </Link>
            </TabsTrigger>
          </>
        )}
        <TabsTrigger
          asChild
          value="/settings/accesibility"
          className="text-foreground/80 data-[state=active]:bg-background h-10 w-full justify-between rounded-lg px-4 data-[state=active]:border"
        >
          <Link href="/settings/accesibility">
            <span>Accesibilidad y pantalla</span>
            <ChevronRight className="text-muted-foreground size-4 shrink-0" />
          </Link>
        </TabsTrigger>
        {session?.user && (
          <TabsTrigger
            asChild
            value="/settings/notifications"
            className="text-foreground/80 data-[state=active]:bg-background h-10 w-full justify-between rounded-lg px-4 data-[state=active]:border"
          >
            <Link href="/settings/notifications">
              <span>Notificaciones y recordatorios</span>
              <ChevronRight className="text-muted-foreground size-4 shrink-0" />
            </Link>
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent
        value="/settings/account-profile"
        className="bg-background flex-1 px-6 pb-16 md:pb-6"
      >
        <AccountStg />
      </TabsContent>
      <TabsContent
        value="/settings/subscriptions"
        className="bg-background flex-1 px-6 pb-16 md:pb-6"
      >
        <SubscriptionsStg
          subscription={subscription}
          payment={payment}
          paymentHistory={paymentHistory}
        />
      </TabsContent>
      <TabsContent
        value="/settings/accesibility"
        className="bg-background flex-1 px-6 pb-16 md:pb-6"
      >
        <AccesibilityStg />
      </TabsContent>
      <TabsContent
        value="/settings/notifications"
        className="bg-background flex-1 px-6 pb-16 md:pb-6"
      >
        <NotificationsStg />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
