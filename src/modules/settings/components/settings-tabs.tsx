"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentHistory } from "@/types/common";
import { UserProfileData } from "@/types/session";

import AccesibilityStg from "./accesibility-stg";
import AccountStg from "./account-stg";
import NotificationsStg from "./notifications-stg";
import SettingsOptsHeader from "./settings-opts-header";
import SubscriptionsStg from "./subscriptions-stg";

import type { Payment, Subscription } from "@/db/schema";

interface SettingsTabsProps {
  user: UserProfileData | null;
  session: Session | null;
  subscription: Subscription;
  subscriptionDetails: Payment | null;
  paymentHistory: PaymentHistory[];
}

const SettingsTabs = ({
  user,
  session,
  subscription,
  subscriptionDetails,
  paymentHistory,
}: SettingsTabsProps) => {
  const pathname = usePathname();

  const [tabValue, setTabValue] = useState<string>(pathname);

  const isMobile = useIsMobile();

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
    <div className="flex h-full flex-1 flex-col px-6">
      <Tabs
        orientation="vertical"
        value={tabValue}
        className="inset-y-0 flex flex-1"
      >
        <TabsList className="max-w-xs flex-1 shrink-0 rounded-none border-r border-gray-200 !bg-transparent p-0 pb-16 pr-6 dark:border-dark md:pb-6">
          <div className="w-full pb-4 pt-8">
            <h1 className="text-xl font-semibold leading-none tracking-tight dark:text-white">
              Configuración
            </h1>
          </div>
          {session?.user && (
            <>
              <TabsTrigger
                asChild
                value="/settings/account-profile"
                className="h-10 !justify-between px-4 data-[state=active]:bg-gray-100 data-[state=active]:shadow-none dark:data-[state=active]:bg-dark"
              >
                <Link href="/settings/account-profile">
                  <span>Cuenta y perfil</span>
                  <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
                </Link>
              </TabsTrigger>
              <TabsTrigger
                asChild
                value="/settings/subscriptions"
                className="h-10 !justify-between px-4 data-[state=active]:bg-gray-100 data-[state=active]:shadow-none dark:data-[state=active]:bg-dark"
              >
                <Link href="/settings/subscriptions">
                  <span>Suscripciones</span>
                  <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
                </Link>
              </TabsTrigger>
            </>
          )}
          <TabsTrigger
            asChild
            value="/settings/accesibility"
            className="h-10 !justify-between px-4 data-[state=active]:bg-gray-100 data-[state=active]:shadow-none dark:data-[state=active]:bg-dark"
          >
            <Link href="/settings/accesibility">
              <span>Accesibilidad y pantalla</span>
              <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
            </Link>
          </TabsTrigger>
          {session?.user && (
            <TabsTrigger
              asChild
              value="/settings/notifications"
              className="h-10 !justify-between px-4 data-[state=active]:bg-gray-100 data-[state=active]:shadow-none dark:data-[state=active]:bg-dark"
            >
              <Link href="/settings/notifications">
                <span>Notificaciones</span>
                <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
              </Link>
            </TabsTrigger>
          )}
          {/* <TabsTrigger
            asChild
            value="/settings/support"
            className="h-10 !justify-between px-4 data-[state=active]:bg-gray-100 data-[state=active]:shadow-none dark:data-[state=active]:bg-dark"
          >
            <Link href="/settings/support">
              <span>Soporte</span>
              <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
            </Link>
          </TabsTrigger> */}
        </TabsList>
        <TabsContent
          value="/settings/account-profile"
          className="flex-1 pb-16 pl-6 md:pb-6"
        >
          <AccountStg user={user} />
        </TabsContent>
        <TabsContent
          value="/settings/subscriptions"
          className="flex-1 pb-16 pl-6 md:pb-6"
        >
          <SubscriptionsStg
            subscription={subscription}
            subscriptionDetails={subscriptionDetails}
            paymentHistory={paymentHistory}
          />
        </TabsContent>
        <TabsContent
          value="/settings/accesibility"
          className="flex-1 pb-16 pl-6 md:pb-6"
        >
          <AccesibilityStg />
        </TabsContent>
        <TabsContent
          value="/settings/notifications"
          className="flex-1 pb-16 pl-6 md:pb-6"
        >
          <NotificationsStg />
        </TabsContent>
        <TabsContent
          value="/settings/support"
          className="flex-1 pb-16 pl-6 md:pb-6"
        >
          <SettingsOptsHeader title="Soporte" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTabs;
