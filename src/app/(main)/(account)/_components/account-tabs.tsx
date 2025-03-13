"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { UserProfileData } from "@/types/auth";
import { Courses } from "@/types/resource";

import AccountDetails from "./account/account-details";
import ProfileInfo from "./profile/profile-info";
import SubscriptionDetails from "./subscription/subscription-details";

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
      <Tabs value={pathname} aria-label="Options" className="flex flex-col">
        <TabsList className="border-border h-12 w-full justify-start rounded-none border-b bg-transparent! p-0">
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
