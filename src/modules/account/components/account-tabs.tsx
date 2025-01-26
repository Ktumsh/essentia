"use client";

import { Tabs, Tab } from "@heroui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabListRef.current) {
      const activeTab = tabListRef.current.querySelector(
        `[data-key="${pathname}"]`,
      );
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [pathname]);

  return (
    <div className="flex flex-col">
      <Tabs
        ref={tabListRef}
        selectedKey={pathname}
        aria-label="Options"
        variant="underlined"
        fullWidth
        classNames={{
          base: "z-10 z-0",
          tabList:
            "p-0 mx-6 gap-0 rounded-none border-b border-gray-200 dark:border-dark",
          cursor: "w-full bg-danger",
          tab: "max-w-fit px-4 h-12",
          tabContent:
            "text-main-h dark:text-main-dark-h group-data-[selected=true]:text-bittersweet-400 dark:group-data-[selected=true]:text-cerise-red-600",
          panel: "w-full px-6 py-10 pb-16 md:pb-6",
        }}
      >
        <Tab
          key="/account"
          as={Link}
          href="/account"
          title={
            <div className="flex items-center space-x-2">
              <span>Mi cuenta</span>
            </div>
          }
        >
          <div className="flex flex-col gap-4 lg:flex-row">
            <AccountDetails user={user} courses={courses} />
          </div>
        </Tab>
        <Tab
          key="/profile"
          as={Link}
          href="/profile"
          title={
            <div className="flex items-center space-x-2">
              <span>Mi perfil</span>
            </div>
          }
        >
          <div className="flex flex-col gap-4 lg:flex-row">
            <ProfileInfo user={user} isOwnProfile={true} />
          </div>
        </Tab>
        <Tab
          key="/subscription"
          as={Link}
          href="/subscription"
          title={
            <div className="flex items-center space-x-2">
              <span>Mi suscripción</span>
            </div>
          }
        >
          <div className="flex flex-col gap-4 lg:flex-row">
            <SubscriptionDetails
              subscription={subscription}
              subscriptionDetails={susbscriptionDetails}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AccountTabs;
