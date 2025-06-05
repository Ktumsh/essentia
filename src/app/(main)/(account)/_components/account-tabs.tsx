"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AccountDetails from "../account/_components/account-details";
import ProfileInfo from "../profile/_components/profile-info";
import SubscriptionDetails from "../subscription/_components/subscription-details";

import type { LearningRoutes } from "@/lib/types";

interface AccountTabsProps {
  routes: LearningRoutes;
}

const AccountTabs = ({ routes }: AccountTabsProps) => {
  const pathname = usePathname();

  const tabs = useMemo(() => {
    return [
      {
        value: "/account",
        label: "Mi cuenta",
        component: <AccountDetails routes={routes} />,
      },
      {
        value: "/profile",
        label: "Mi perfil",
        component: <ProfileInfo isOwnProfile={true} />,
      },
      {
        value: "/subscription",
        label: "Mi suscripción",
        component: <SubscriptionDetails />,
      },
    ];
  }, [routes]);

  return (
    <div className="flex flex-col">
      <Tabs value={pathname} aria-label="Options" className="flex flex-col">
        <TabsList className="h-12 w-full justify-start rounded-none border-b bg-transparent! p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:border-primary data-[state=active]:text-primary! h-full w-fit rounded-none border-b-2 border-transparent px-4 font-normal data-[state=active]:shadow-none"
            >
              <Link href={tab.value}>
                <div className="flex items-center space-x-2">
                  <span>{tab.label}</span>
                </div>
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="mt-10 flex flex-col gap-4 lg:flex-row">
              {tab.component}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AccountTabs;
