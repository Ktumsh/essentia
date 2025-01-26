"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfo from "@/modules/profile/components/profile-info";
import { Courses } from "@/types/resource";
import { UserProfileData } from "@/types/session";

import AccountDetails from "./account-details";
import SubscriptionDetails from "./subscription-details";

import type { Payment, Subscription } from "@/db/schema";

interface AccountTabsProps {
  user: UserProfileData | null;
  subscription: Subscription;
  susbscriptionDetails: Payment | null;
  courses: Courses;
}

const AccountTabs = ({
  subscription,
  susbscriptionDetails,
  user,
  courses,
}: AccountTabsProps) => {
  const pathname = usePathname();

  const tabs = useMemo(() => {
    return [
      {
        value: "/account",
        label: "Mi cuenta",
        component: <AccountDetails user={user} courses={courses} />,
      },
      {
        value: "/profile",
        label: "Mi perfil",
        component: <ProfileInfo user={user} isOwnProfile={true} />,
      },
      {
        value: "/subscription",
        label: "Mi suscripción",
        component: (
          <SubscriptionDetails
            subscription={subscription}
            subscriptionDetails={susbscriptionDetails}
          />
        ),
      },
    ];
  }, [user, courses, subscription, susbscriptionDetails]);

  return (
    <div className="flex flex-col">
      <Tabs
        value={pathname}
        aria-label="Options"
        className="flex flex-col space-y-10 px-6 pb-16 md:pb-6"
      >
        <TabsList className="h-12 w-full justify-start rounded-none border-b border-gray-200 !bg-transparent p-0 dark:border-dark">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-full w-fit rounded-none border-b-2 border-transparent px-4 font-normal data-[state=active]:border-danger data-[state=active]:!text-danger data-[state=active]:shadow-none"
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
            <div className="flex flex-col gap-4 lg:flex-row">
              {tab.component}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AccountTabs;
